const UserLog = require("../models/userLog.model");
const { User } = require("../models/user.model");
require("dotenv").config({ path: ".env" });
const jwt = require("jsonwebtoken"); // Import the jwt library
const { getCookieValueByName } = require("../utils/getCookieValueByName");

/**
 * Logs user activity with minimal parameters, including optional error details.
 * @param {Object} req - The Express request object.
 * @param {String} userId - User ID associated with the log.
 * @param {String} activityType - The type or description of the activity.
 * @param {Error} [error] - Optional error object to include in the log.
 * @returns {Promise<void>} - Resolves when the log entry is saved.
 */
const logUserActivity = async (req, userId, activityType, error = null) => {
  try {
    // Construct base activity description
    let activityDescription = `${req.method} ${req.originalUrl}`;

    // Customize description based on HTTP method
    switch (req.method) {
      case "POST":
        activityDescription += " - Created Resource";
        break;
      case "PUT":
        activityDescription += " - Updated Resource";
        break;
      case "DELETE":
        activityDescription += " - Deleted Resource";
        break;
      case "GET":
        activityDescription += " - Retrieved Data";
        break;
      default:
        activityDescription += " - General Activity";
    }

    // Get the session token from the cookies
    const cookieToken = getCookieValueByName(
      req.cookies,
      process.env.SESSION_TOKEN
    );
    let id = userId;
    let username = "Unknown"; // Fallback username
    let email = "Unknown"; // Fallback email
    let userRole = "Unknown"; // Fallback role

    if (cookieToken) {
      // Decode the JWT to get the user data (e.g., userId)
      const decoded = jwt.verify(cookieToken, process.env.JWT_SECRET_KEY);
      if (decoded) {
        id = decoded.id; // Assuming the token contains the userId
        const user = await User.findById(id); // Retrieve the user details
        if (user) {
          username = user.username || "Unknown";
          email = user.email || "Unknown";
          userRole = user.roles ? user.roles.join(", ") : "Unknown";
        }
      }
    }

    // Create log entry with all relevant information
    const logEntry = new UserLog({
      userId: id || null, // User ID from the cookie or provided
      username, // Username from the user record
      email, // Email from the user record
      userRole, // User's role(s)
      activity: activityDescription,
      logType: activityType,
      ipAddress: req.ip || req.connection.remoteAddress, // IP address from the request
      userAgent: req.get("User-Agent"), // User-Agent from the request
      requestUrl: req.originalUrl, // The URL being requested
      method: req.method, // HTTP method
      headers: req.headers, // Request headers
      body: req.body, // Request body, in case relevant for the activity
      params: req.params, // Request URL parameters, if any
      query: req.query, // Query parameters
      errorDetails: error
        ? {
            errorCode: error.code || "UNKNOWN_ERROR",
            message: error.message || error.toString(),
          }
        : null, // Optional error details
      created_at: Date.now(), // Log creation time
      updated_at: Date.now(), // Log update time
    });

    // Save the log entry to the database
    const savedLogEntry = await logEntry.save();

    // Find the user and push the log entry's ID to the userLogs array
    await User.findByIdAndUpdate(id, {
      $push: { userLogs: savedLogEntry._id }, // Add the log ID to the userLogs array
    });
  } catch (loggingError) {
    console.error("Failed to log user activity:", loggingError);
  }
};

module.exports = logUserActivity;
