const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WalletSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  individualCredit: {
    type: Number,
    default: 0,
  },
  hierarchyCredit: {
    type: Number,
    default: 0,
  },
  transactionId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserTransaction",
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

// Middleware to update `updated_at` on save
WalletSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Wallet = mongoose.model("Wallet", WalletSchema);

module.exports = Wallet;
