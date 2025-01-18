const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserLogSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    required: true, // Store user's roles
  },
  activity: {
    type: String,
    required: true, // Store description of the activity
  },
  logType: {
    type: String,
    required: true, // Store type of log (e.g., "info", "error", etc.)
  },
  requestUrl: {
    type: String,
    required: true, // Store the URL of the request
  },
  method: {
    type: String,
    required: true, // Store HTTP method (GET, POST, PUT, DELETE)
  },
  headers: {
    type: Object,
    default: {},
  },
  body: {
    type: Object,
    default: {},
  },
  params: {
    type: Object,
    default: {},
  },
  query: {
    type: Object,
    default: {},
  },
  ipAddress: {
    type: String,
    required: true, // Store IP address of the request
  },
  userAgent: {
    type: String,
    required: true, // Store User-Agent information
  },
  errorDetails: {
    errorCode: {
      type: String,
      default: "UNKNOWN_ERROR", // Default error code
    },
    message: {
      type: String,
      default: "No error message", // Default error message
    },
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically set current timestamp
  },
  updated_at: {
    type: Date,
    default: Date.now, // Automatically set current timestamp on save
  },
});

// Create User model
const UserLog = mongoose.model("UserLog", UserLogSchema);

module.exports = UserLog;
