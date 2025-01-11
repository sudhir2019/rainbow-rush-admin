const UserLog = require("../models/userLog.model");
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
    if (cookieToken) {
      // Decode the JWT to get the user data (e.g., userId)
      const decoded = jwt.verify(cookieToken, process.env.JWT_SECRET_KEY); // Ensure the JWT_SECRET_KEY is correct
      if (decoded) {
        id = decoded.id; // Assuming the token contains the userId
      }
    }
    // Create log entry
    const logEntry = new UserLog({
      userId: id || null, // Use null if no userId provided
      activity: activityDescription,
      logType: activityType,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent"),
      errorDetails: error
        ? {
            errorCode: error.code || "UNKNOWN_ERROR",
            message: error.message || error.toString(),
          }
        : null,
    });

    // Save the log entry to the database
    await logEntry.save();
  } catch (loggingError) {
    console.error("Failed to log user activity:", loggingError);
  }
};

module.exports = logUserActivity;
