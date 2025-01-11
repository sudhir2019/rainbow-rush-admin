const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserLogSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  activity: {
    type: String,
  },
  logType: {
    type: String,
  },
  ipAddress: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  errorDetails: {
    errorCode: {
      type: String,
    },
    message: {
      type: String,
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

module.exports = mongoose.model("UserLog", UserLogSchema);
