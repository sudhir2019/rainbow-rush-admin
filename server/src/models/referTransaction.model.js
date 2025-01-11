const mongoose = require("mongoose");
const { encrypt, decrypt } = require("../utils/encryptionAndDecryption"); // Assuming these functions are defined in utils
const Schema = mongoose.Schema;

const referTransactionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    default: null, // Set a default null value for the userId (can be updated later)
  },
  referrerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    default: null, // Set a default null value for referrerId (can be updated later)
  },
  refUserType: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
      default: [], // Set an empty array as a default if no role is provided
    },
  ],
  refbonus: {
    type: String, // Store encrypted bonus amount as string
    default: encrypt("0.00"), // Encrypted default value
    set: (value) => encrypt(value), // Encrypt before saving
    get: (value) => decrypt(value), // Decrypt when retrieving
  },
  userbonus: {
    type: String, // Store encrypted bonus amount as string
    default: encrypt("0.00"), // Encrypted default value
    set: (value) => encrypt(value), // Encrypt before saving
    get: (value) => decrypt(value), // Decrypt when retrieving
  },
  currency: {
    type: String, // Store encrypted currency as string
    default: encrypt("INR"), // Encrypted default value (e.g., USD)
    set: (value) => encrypt(value), // Encrypt before saving
    get: (value) => decrypt(value), // Decrypt when retrieving
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending", // Default value for status
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default current timestamp for createdAt
  },
});

const ReferTransaction = mongoose.model(
  "ReferTransaction",
  referTransactionSchema
);

module.exports = { ReferTransaction };
