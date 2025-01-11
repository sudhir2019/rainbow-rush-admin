const { encrypt, decrypt } = require("../utils/encryptionAndDecryption");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Helper functions to encrypt the default values
const defaultBalance = encrypt("0.00"); // Encrypted default value for balance
const defaultBonus = encrypt("0.00"); // Encrypted default value for bonus
const defaultCurrency = encrypt("INR"); // Encrypted default value for currency

const WalletSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: String, // Store encrypted balance as a string
    required: true,
    default: defaultBalance, // Default encrypted balance
    set: (value) => encrypt(value.toString()), // Encrypt balance before saving
    get: (value) => decrypt(value), // Decrypt balance when retrieving
  },
  currency: {
    type: String, // Store encrypted currency as a string
    required: true,
    default: defaultCurrency, // Default encrypted currency (e.g., USD)
    set: (value) => encrypt(value), // Encrypt currency before saving
    get: (value) => decrypt(value), // Decrypt currency when retrieving
  },
  bonus: {
    type: String, // Store encrypted bonus as a string
    required: true,
    default: defaultBonus, // Default encrypted bonus
    set: (value) => encrypt(value.toString()), // Encrypt bonus before saving
    get: (value) => decrypt(value), // Decrypt bonus when retrieving
  },
  bonusExpiry: {
    type: Date,
  },
  transactionId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserTransaction",
      default: [],
    },
  ],
  referTransactionId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReferTransaction",
      default: [],
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Wallet = mongoose.model("Wallet", WalletSchema);

module.exports = Wallet;
