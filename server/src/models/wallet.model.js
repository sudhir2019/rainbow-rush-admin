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
  isDeleted: {
    type: Boolean,
    default: false,
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

// Middleware to update `updated_at` on save
WalletSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});
// Method to perform soft delete
WalletSchema.methods.softDelete = async function () {
  this.isDeleted = true;
  this.deletedAt = new Date();
  await this.save();
};

// Static method to find non-deleted Wallete by default
WalletSchema.statics.findNonDeleted = function () {
  return this.find({ isDeleted: { $ne: true } });
};
const Wallet = mongoose.model("Wallet", WalletSchema);

module.exports = Wallet;
