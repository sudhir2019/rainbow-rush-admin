const Wallet = require("../models/wallet.model");
const Prediction = require("../models/prediction.model");
const { Fee } = require("../models/fees.model");
const { encrypt, decrypt } = require("../utils/encryptionAndDecryption");
const UserTransaction = require("../models/userTransaction.model"); // Import Transaction model
const { v4: uuidv4 } = require("uuid"); // Use UUID for unique transaction IDs

// Helper function to validate and update balance
const updateBalance = async (currentBalance, amount, isDeposit = true) => {
  let balance = parseFloat(decrypt(currentBalance)); // Decrypt and parse balance
  let transactionAmount = parseFloat(amount); // Parse transaction amount

  if (isNaN(transactionAmount) || transactionAmount <= 0) {
    throw new Error("Invalid transaction amount");
  }

  if (isNaN(balance)) {
    throw new Error("Invalid balance data");
  }

  // Fetch GST and transaction fee details
  const gstCharges = await Fee.findOne({ name: "gst", active: true });
  const transactionCharges = await Fee.findOne({
    name: "transaction_fee",
    active: true,
  });

  if (!gstCharges || !transactionCharges) {
    throw new Error("Fee configuration not found");
  }

  // Calculate fees based on transaction type
  const gstPercentage = gstCharges.percentage || 0;
  const transactionFee = transactionCharges.flatAmount || 0;

  // Apply GST only for withdrawals
  const gstAmount = isDeposit ? 0 : (transactionAmount * gstPercentage) / 100;
  // Calculate updated balance
  const totalDeduction = isDeposit
    ? -transactionFee // Negative to subtract fee for deposits
    : transactionAmount + gstAmount + transactionFee; // Include GST and transaction fee for withdrawals

  const updatedBalance = balance - totalDeduction;

  if (updatedBalance < 0) {
    throw new Error("Insufficient balance");
  }
  return encrypt(updatedBalance.toString()); // Encrypt updated balance before returning
};

// Deposit to wallet
const deposit = async (req, res) => {
  try {
    const userId = req.params.userId?.replace(/^:/, "");
    const { amount, narration } = req.body;

    if (!userId || !amount) {
      return res
        .status(400)
        .json({ message: "User ID and deposit amount are required" });
    }

    const wallet = await Wallet.findOne({ userId }).exec();
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    const txId = uuidv4(); // Generate unique transaction ID
    wallet.balance = await updateBalance(wallet.balance, amount, true);
    wallet.updated_at = Date.now();
    // Save the transaction
    const transaction = new UserTransaction({
      userId,
      txId,
      narration,
      amount: encrypt(amount),
      txnType: "credit",
      currency: encrypt(wallet.currency), // Ensure it's encrypted in the schema
      txnStatus: "success",
    });
    wallet.transactionId.push(transaction._id);
    await transaction.save();
    await wallet.save();

    res.status(200).json({
      message: "Deposit successful",
      transactionId: txId,
      balance: decrypt(wallet.balance),
      bonus: decrypt(wallet.bonus),
      currency: decrypt(wallet.currency),
    });
  } catch (error) {
    console.error("Error during deposit:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Withdraw from wallet
const withdraw = async (req, res) => {
  try {
    const userId = req.params.userId?.replace(/^:/, "");
    const { amount, narration } = req.body;

    if (!userId || !amount) {
      return res
        .status(400)
        .json({ message: "User ID and withdrawal amount are required" });
    }

    const wallet = await Wallet.findOne({ userId }).exec();
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // Check if the wallet has enough balance
    if (parseFloat(decrypt(wallet.balance)) < parseFloat(amount)) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const txId = uuidv4(); // Generate unique transaction ID
    wallet.balance = await updateBalance(wallet.balance, amount, false);
    wallet.updated_at = Date.now();

    // Save the transaction
    const transaction = new UserTransaction({
      userId,
      txId,
      narration,
      amount: encrypt(amount),
      txnType: "debit",
      currency: encrypt(wallet.currency), // Ensure it's encrypted in the schema
      txnStatus: "success",
    });

    wallet.transactionId.push(transaction._id);
    await transaction.save();
    await wallet.save();

    res.status(200).json({
      message: "Withdrawal successful",
      transactionId: txId,
      balance: decrypt(wallet.balance),
      bonus: decrypt(wallet.bonus),
      currency: decrypt(wallet.currency),
    });
  } catch (error) {
    console.error("Error during withdrawal:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
// Place a prediction
const placePrediction = async (req, res) => {
  try {
    const { userId, matchId, type, strikePrice, amount, narration } = req.body;

    if (!userId || !matchId || !type || !strikePrice || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user has enough balance
    const userWallet = await Wallet.findOne({ userId });
    if (!userWallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    const currentBalance = decrypt(userWallet.balance);
    if (parseFloat(currentBalance) < parseFloat(amount)) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    // Deduct the amount from the user's wallet
    userWallet.balance = updateBalance(userWallet.balance, amount, false); // False for deduction
    userWallet.updated_at = Date.now();
    await userWallet.save();

    // Create a unique transaction ID for the bet
    const txId = uuidv4();

    // Save the bet (prediction)
    const prediction = new Prediction({
      userId,
      matchId,
      type,
      strikePrice,
      premium: calculatePremium(strikePrice, amount), // Assuming a function to calculate premium
      quantity: amount,
      status: "open", // Status when the bet is placed
      txId,
    });

    await prediction.save();

    // Record the transaction in the UserTransaction model
    const transaction = new UserTransaction({
      userId,
      txId,
      narration,
      amount: encrypt(amount),
      txnType: "Prediction", // debit as funds are being deducted
      txnStatus: "success",
    });

    await transaction.save();

    res.status(200).json({
      message: "Bet placed successfully",
      transactionId: txId,
      balance: decrypt(userWallet.balance),
    });
  } catch (error) {
    console.error("Error placing bet:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Settle bets and calculate payouts
const settlePayouts = async (req, res) => {
  try {
    const { matchId, finalMPI } = req.body;

    if (!matchId || !finalMPI) {
      return res
        .status(400)
        .json({ message: "Match ID and final MPI are required" });
    }

    const predictions = await Prediction.find({ matchId, status: "open" });
    if (!predictions || predictions.length === 0) {
      return res.status(404).json({ message: "No open bets found" });
    }

    const updatedPredictions = [];

    // Iterate over each prediction and calculate profit/loss
    for (const prediction of predictions) {
      let profitLoss = 0;

      if (prediction.type === "call") {
        // Calculate profit if MPI > strikePrice for call bet
        profitLoss =
          finalMPI > prediction.strikePrice
            ? (finalMPI - prediction.strikePrice) * prediction.quantity
            : -prediction.quantity; // Loss if MPI <= strikePrice
      } else {
        // Calculate profit if MPI < strikePrice for put bet
        profitLoss =
          finalMPI < prediction.strikePrice
            ? (prediction.strikePrice - finalMPI) * prediction.quantity
            : -prediction.quantity; // Loss if MPI >= strikePrice
      }

      // Update prediction status and profit/loss
      prediction.status = "closed";
      prediction.profitLoss = profitLoss;

      // Find user wallet to update balance
      const userWallet = await Wallet.findOne({ userId: prediction.userId });
      if (userWallet) {
        userWallet.balance = updateBalance(
          userWallet.balance,
          profitLoss.toString(),
          true
        ); // True for adding payout
        userWallet.updated_at = Date.now();
        await userWallet.save();
      }

      // Create a new transaction record for payout
      const transaction = new UserTransaction({
        userId: prediction.userId,
        txId: prediction.txId,
        narration: `Payout for match ${matchId}`,
        amount: encrypt(profitLoss.toString()),
        txnType: "payout", // Credit for payout
        txnStatus: "success",
      });

      await transaction.save();
      updatedPredictions.push(await prediction.save());
    }

    res.status(200).json({
      message: "Payouts settled successfully",
      updatedPredictions,
    });
  } catch (error) {
    console.error("Error during payout settlement:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get wallet details by userId
const getWalletByUserId = async (req, res) => {
  try {
    const userId = req.params.userId?.replace(/^:/, "");
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const wallet = await Wallet.findOne({ userId }).exec();
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    res.status(200).json({
      userId: wallet.userId,
      balance: decrypt(wallet.balance).toString(),
      bonus: decrypt(wallet.bonus).toString(),
      currency: decrypt(wallet.currency).toString(),
    });
  } catch (error) {
    console.error("Error fetching wallet:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const transfer = async (req, res) => {
  try {
    const { senderId, receiverId, amount } = req.body;

    if (!senderId || !receiverId || !amount) {
      return res
        .status(400)
        .json({ message: "Sender ID, Receiver ID, and amount are required" });
    }

    if (senderId === receiverId) {
      return res
        .status(400)
        .json({ message: "Sender and Receiver cannot be the same" });
    }

    const senderWallet = await Wallet.findOne({ userId: senderId });
    const receiverWallet = await Wallet.findOne({ userId: receiverId });

    if (!senderWallet || !receiverWallet) {
      return res
        .status(404)
        .json({ message: "Wallet not found for one of the users" });
    }

    senderWallet.balance = updateBalance(senderWallet.balance, amount, false);
    receiverWallet.balance = updateBalance(
      receiverWallet.balance,
      amount,
      true
    );

    senderWallet.updated_at = Date.now();
    receiverWallet.updated_at = Date.now();

    await senderWallet.save();
    await receiverWallet.save();

    res.status(200).json({
      message: "Transfer successful",
      senderBalance: decrypt(senderWallet.balance),
      receiverBalance: decrypt(receiverWallet.balance),
    });
  } catch (error) {
    console.error("Error during transfer:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get wallet transaction history (requires transaction model)
const getTransactionHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Assuming Transaction is linked to Wallet
    const transactions = await Transaction.find({ userId })
      .sort({ date: -1 })
      .exec();

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transaction history:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  deposit,
  withdraw,
  transfer,
  getWalletByUserId,
  getTransactionHistory,
};
