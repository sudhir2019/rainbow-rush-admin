const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserTransactionSchema = new Schema(
  {
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
      },
    ],
    toUserId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["transfer", "credit", "debit", "deposit", "withdrawal"], // Example types
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    transactionMessage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    strict: true, // Ensures only fields defined in the schema are stored
  }
);

// Add indexes for performance
UserTransactionSchema.index({ userId: 1 });
UserTransactionSchema.index({ status: 1 });
UserTransactionSchema.index({ transactionType: 1 });

const UserTransaction = mongoose.model(
  "UserTransaction",
  UserTransactionSchema
);

module.exports = UserTransaction;
