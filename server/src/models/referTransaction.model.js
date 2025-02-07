const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReferTransactionSchema = new Schema({
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model who referred
    required: true,
  },
  referredUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user being referred
    required: true,
  },
  commissionAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "paid", "cancelled"],
    default: "pending",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updated_at` on save
ReferTransactionSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});
// Method to perform soft delete
ReferTransactionSchema.methods.softDelete = async function () {
  this.isDeleted = true;
  this.deletedAt = new Date();
  await this.save();
};

// Static method to find non-deleted ReferTransaction by default
ReferTransactionSchema.statics.findNonDeleted = function () {
  return this.find({ isDeleted: { $ne: true } });
};
const ReferTransaction = mongoose.model("ReferTransaction", ReferTransactionSchema);

module.exports = ReferTransaction;
