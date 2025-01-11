const mongoose = require("mongoose");
const { encrypt, decrypt } = require("../utils/encryptionAndDecryption"); // Assuming these functions are defined in utils
const Schema = mongoose.Schema;

// Helper functions to encrypt the default values
const defaultAmount = encrypt("0.00"); // Encrypted default value for amount
const defaultCurrency = encrypt("INR"); // Encrypted default value for currency
const defaultTxStatus = "pending"; // Default value for txnStatus

const UserTransactionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  txId: {
    type: String,
    required: true,
    unique: true,
  },
  narration: {
    type: String,
  },
  amount: {
    type: String, // Store encrypted amount as a string
    required: true,
    default: defaultAmount, // Default encrypted amount
    set: (value) => encrypt(value), // Encrypt before saving
    get: (value) => decrypt(value), // Decrypt when retrieving
  },
  balanceAfter: {
    type: Number,
    // required: true,
  },
  txnType: {
    type: String,
    required: true,
  },
  currency: {
    type: String, // Store encrypted currency as a string
    required: true,
    default: defaultCurrency, // Default encrypted currency (e.g., USD)
    set: (value) => encrypt(value), // Encrypt before saving
    get: (value) => decrypt(value), // Decrypt when retrieving
  },
  txnStatus: {
    type: String,
    default: defaultTxStatus, // Default transaction status
  },
  txCategory: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  paymentDetails: {
    upiId: {
      type: String,
    },
    transactionReference: {
      type: String,
    },
  },
  subscriptionDetails: {
    plan: {
      type: String,
    },
    duration: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  membershipDetails: {
    type: {
      type: String,
    },
    validity: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const UserTransaction = mongoose.model(
  "UserTransaction",
  UserTransactionSchema
);

module.exports = UserTransaction;
