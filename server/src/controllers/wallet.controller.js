const mongoose = require("mongoose");
const { User } = require("../models/user.model");
const Wallet = require("../models/wallet.model");
const UserTransaction = require("../models/userTransaction.model");
const bcrypt = require("bcryptjs");

// Get all wallets
const getAllWallets = async (req, res) => {
  try {
    // Retrieve all wallets, optionally populate transactionId
    const wallets = await Wallet.find().populate("transactionId");

    if (!wallets.length) {
      return res.status(404).json({ message: "No wallets found" });
    }

    res.status(200).json(wallets);
  } catch (error) {
    console.error("Error fetching wallets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get wallet by userId
const getWalletByUserId = async (req, res) => {
  try {
    const userId = req.params.userId?.replace(/^:/, "");

    // Find the wallet associated with the userId
    const wallet = await Wallet.findOne({ userId }).populate("transactionId");

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    res.status(200).json(wallet);
  } catch (error) {
    console.error("Error fetching wallet:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function creditTransfer(req, res) {
  const { userId, password, transferAmount, toUserId, transactionMessage } =
    req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Ensure transferAmount is positive
    if (transferAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Transfer amount must be greater than zero.",
      });
    }

    // Verify that user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Fetch the receiver's user data to get the receiver's name
    const receiver = await User.findById(toUserId);
    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Receiver not found",
      });
    }

    // Get the username of the sender (for the transaction message)
    const senderUsername = user.username;
    const receiverName = receiver.name;

    // Verify password
    const isPasswordValid = await User.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Find the wallets of both the sender and receiver
    const senderWallet = await Wallet.findOne({ userId: userId }).session(
      session
    );
    const receiverWallet = await Wallet.findOne({ userId: toUserId }).session(
      session
    );

    if (!senderWallet) {
      return res.status(404).json({
        success: false,
        message: "Sender wallet not found",
      });
    }

    if (!receiverWallet) {
      return res.status(404).json({
        success: false,
        message: "Receiver wallet not found",
      });
    }

    // Check if sender has sufficient funds
    if (senderWallet.individualCredit < transferAmount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
      });
    }

    // Perform the credit transfer
    senderWallet.individualCredit -= transferAmount;
    receiverWallet.individualCredit += transferAmount;

    // Adjust hierarchyCredit if needed
    // senderWallet.hierarchyCredit -= transferAmount;
    receiverWallet.hierarchyCredit += transferAmount;
    // Create a new transaction for the sender
    const senderTransaction = new UserTransaction({
      userId: userId,
      toUserId: toUserId,
      amount: -transferAmount,
      transactionType: "transfer",
      status: "completed",
      transactionMessage: `User ${senderUsername} transferred ${transferAmount} to User ${receiverName}`, // Corrected message format
    });

    // Create a new transaction for the receiver
    const receiverTransaction = new UserTransaction({
      userId: toUserId,
      toUserId: userId,
      amount: transferAmount,
      transactionType: "transfer",
      status: "completed",
      transactionMessage: `User ${senderUsername} received ${transferAmount} from User ${receiverName}`, // Corrected message format
    });

    // Save both transactions and update wallets within the transaction session
    await senderTransaction.save({ session });
    await receiverTransaction.save({ session });

    senderWallet.transactionId.push(senderTransaction._id);
    receiverWallet.transactionId.push(receiverTransaction._id);
    await senderWallet.save({ session });
    await receiverWallet.save({ session });
    // Commit the transaction if everything goes well
    await session.commitTransaction();
    session.endSession();
    // Find all wallets
    const wallets = await Wallet.find().populate("transactionId");

    if (!wallets.length) {
      return res.status(404).json({ message: "No wallets found" });
    }
    // Return success response
    return res.status(200).json({
      success: true,
      message: `Successfully transferred ${transferAmount} to User ${receiverName}`,
      data: {
        wallets,
        senderWallet,
        receiverWallet,
        senderTransaction,
        receiverTransaction,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error during credit transfer:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
async function creditAdjust(req, res) {
  const {
    userId,
    toUserId,
    password,
    adjustAmount,
    transactionType,
    transactionMessage,
  } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch sender and receiver user details
    const sender = await User.findById(userId);
    const receiver = await User.findById(toUserId);

    if (!sender || !receiver) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: "Sender or receiver not found",
      });
    }

    const senderUsername = sender.username;
    const receiverName = receiver.name;

    // Validate sender's password
    if (password) {
      const isPasswordValid = await User.comparePassword(
        password,
        sender.password
      );
      if (!isPasswordValid) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: "Invalid password",
        });
      }
    }

    // Find wallets of sender and receiver
    const senderWallet = await Wallet.findOne({ userId: userId }).session(
      session
    );
    const receiverWallet = await Wallet.findOne({ userId: toUserId }).session(
      session
    );

    if (!senderWallet || !receiverWallet) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: "Sender or receiver wallet not found",
      });
    }

    // Validate transaction type and amounts
    if (transactionType === "debit") {
      if (senderWallet.individualCredit < adjustAmount) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: "Insufficient balance in sender's wallet",
        });
      }
      senderWallet.individualCredit -= adjustAmount;
      receiverWallet.individualCredit += adjustAmount;
      receiverWallet.hierarchyCredit += adjustAmount;
    } else if (transactionType === "credit") {
      if (receiverWallet.individualCredit < adjustAmount) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: "Insufficient balance in receiver's wallet",
        });
      }
      senderWallet.individualCredit += adjustAmount;
      senderWallet.hierarchyCredit += adjustAmount;
      receiverWallet.individualCredit -= adjustAmount;
    } else {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Invalid transaction type",
      });
    }

    // Create a new transaction record
    const transaction = new UserTransaction({
      userId: userId,
      toUserId: toUserId,
      amount: adjustAmount,
      transactionType: transactionType,
      status: "completed",
      transactionMessage:
        transactionMessage ||
        `Transferred ${adjustAmount} ${transactionType} from ${senderUsername} to ${receiverName}`,
    });

    await transaction.save({ session });
    senderWallet.transactionId.push(transaction._id);
    receiverWallet.transactionId.push(transaction._id);

    await senderWallet.save({ session });
    await receiverWallet.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Return success response
    return res.status(200).json({
      success: true,
      message: `Successfully adjusted ${adjustAmount} from ${senderUsername} to ${receiverName}`,
      data: {
        senderWallet,
        receiverWallet,
        transaction,
      },
    });
  } catch (error) {
    // Roll back the transaction if it hasn't been committed yet
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    console.error("Error during credit adjustment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  getAllWallets,
  getWalletByUserId,
  creditTransfer,
  creditAdjust,
};
