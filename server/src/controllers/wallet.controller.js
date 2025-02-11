const mongoose = require("mongoose");
const { User } = require("../models/user.model");
const Wallet = require("../models/wallet.model");
const UserTransaction = require("../models/userTransaction.model");
const bcrypt = require("bcryptjs");
const { SuperAdmin } = require("../models/superAdmin.model");
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
  const { userId, password, transferAmount, toUserId } = req.body;

  try {
    if (transferAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Transfer amount must be greater than zero.",
      });
    }

    // Fetch sender (User or SuperAdmin)
    let user = await User.findById(userId);
    let isSuperAdmin = false;

    if (!user) {
      user = await SuperAdmin.findById(userId);
      isSuperAdmin = true;
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Fetch receiver (User or SuperAdmin)
    let receiver = await User.findById(toUserId);
    if (!receiver) receiver = await SuperAdmin.findById(toUserId);

    if (!receiver) {
      return res
        .status(404)
        .json({ success: false, message: "Receiver not found" });
    }

    // Verify password
    let isPasswordValid = false;

    if (isSuperAdmin && typeof SuperAdmin.comparePassword === "function") {
      isPasswordValid = await SuperAdmin.comparePassword(
        password,
        user.password
      );
    } else if (!isSuperAdmin && typeof User.comparePassword === "function") {
      isPasswordValid = await User.comparePassword(password, user.password);
    }

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    // Fetch wallets
    const senderWallet = await Wallet.findOne({ userId });
    const receiverWallet = await Wallet.findOne({ userId: toUserId });

    if (!senderWallet || !receiverWallet) {
      return res.status(404).json({
        success: false,
        message: "Sender or receiver wallet not found",
      });
    }

    // Check balance
    if (senderWallet.individualCredit < transferAmount) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient balance" });
    }

    // Perform credit transfer without using transactions
    senderWallet.individualCredit -= transferAmount;
    receiverWallet.individualCredit += transferAmount;
    receiverWallet.hierarchyCredit += transferAmount;

    // Record transactions
    const senderTransaction = new UserTransaction({
      userId,
      toUserId,
      amount: -transferAmount,
      transactionType: "transfer",
      status: "completed",
      transactionMessage: `User ${user.username} transferred ${transferAmount} to User ${receiver.name}`,
    });

    const receiverTransaction = new UserTransaction({
      userId: toUserId,
      toUserId: userId,
      amount: transferAmount,
      transactionType: "transfer",
      status: "completed",
      transactionMessage: `User ${receiver.name} received ${transferAmount} from User ${user.username}`,
    });

    // Save everything
    await senderTransaction.save();
    await receiverTransaction.save();

    senderWallet.transactionId.push(senderTransaction._id);
    receiverWallet.transactionId.push(receiverTransaction._id);

    await senderWallet.save();
    await receiverWallet.save();
    const wallets = await Wallet.find().populate("transactionId");
    return res.status(200).json({
      success: true,
      message: `Successfully transferred ${transferAmount} to User ${receiver.name}`,
      data: {
        wallets,
        senderWallet,
        receiverWallet,
        senderTransaction,
        receiverTransaction,
      },
    });
  } catch (error) {
    console.error("Error during credit transfer:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
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

  try {
    // Fetch sender (either User or SuperAdmin)
    let sender = await User.findById(userId);
    let isSuperAdmin = false;

    if (!sender) {
      sender = await SuperAdmin.findById(userId);
      isSuperAdmin = true;
    }

    if (!sender) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Fetch receiver (either User or SuperAdmin)
    let receiver = await User.findById(toUserId);
    if (!receiver) receiver = await SuperAdmin.findById(toUserId);

    if (!receiver) {
      return res
        .status(404)
        .json({ success: false, message: "Receiver not found" });
    }

    const senderUsername = sender.username;
    const receiverName = receiver.name;

    // Validate sender's password (only if provided)
    if (password) {
      let isPasswordValid = false;
      if (isSuperAdmin && typeof SuperAdmin.comparePassword === "function") {
        isPasswordValid = await SuperAdmin.comparePassword(
          password,
          sender.password
        );
      } else if (!isSuperAdmin && typeof User.comparePassword === "function") {
        isPasswordValid = await User.comparePassword(password, sender.password);
      }

      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid password" });
      }
    }

    // Find wallets of sender and receiver
    const senderWallet = await Wallet.findOne({ userId: userId });
    const receiverWallet = await Wallet.findOne({ userId: toUserId });

    if (!senderWallet || !receiverWallet) {
      return res.status(404).json({
        success: false,
        message: "Sender or receiver wallet not found",
      });
    }

    // Validate transaction type and amounts
    if (transactionType === "debit") {
      if (senderWallet.individualCredit < adjustAmount) {
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
        return res.status(400).json({
          success: false,
          message: "Insufficient balance in receiver's wallet",
        });
      }
      senderWallet.individualCredit += adjustAmount;
      senderWallet.hierarchyCredit += adjustAmount;
      receiverWallet.individualCredit -= adjustAmount;
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid transaction type" });
    }

    // Save the updated wallets
    await senderWallet.save();
    await receiverWallet.save();

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

    await transaction.save();

    senderWallet.transactionId.push(transaction._id);
    receiverWallet.transactionId.push(transaction._id);

    await senderWallet.save();
    await receiverWallet.save();
    const wallets = await Wallet.find().populate("transactionId");
    // Return success response
    return res.status(200).json({
      success: true,
      message: `Successfully adjusted ${adjustAmount} from ${senderUsername} to ${receiverName}`,
      data: { wallets, senderWallet, receiverWallet, transaction },
    });
  } catch (error) {
    console.error("Error during credit adjustment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = {
  getAllWallets,
  getWalletByUserId,
  creditTransfer,
  creditAdjust,
};
