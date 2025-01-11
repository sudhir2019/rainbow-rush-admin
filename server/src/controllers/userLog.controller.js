const mongoose = require("mongoose");
const UserLog = require("../models/userLog.model");
const { User } = require("../models/user.model");

/**
 * Controller to get all user logs
 */
async function getAllUserLogs(req, res) {
  const {
    search,
    logType,
    ipAddress,
    userAgent,
    startDate,
    endDate,
    page = 1,
    limit = 10,
  } = req.query;

  try {
    // Base query object
    let query = {};

    // Apply search functionality (search by activity, logType, ipAddress, or userAgent)
    if (search) {
      query.$or = [
        { activity: { $regex: search, $options: "i" } }, // Case-insensitive search by activity
        { logType: { $regex: search, $options: "i" } }, // Case-insensitive search by logType
        { ipAddress: { $regex: search, $options: "i" } }, // Case-insensitive search by ipAddress
        { userAgent: { $regex: search, $options: "i" } }, // Case-insensitive search by userAgent
      ];
    }

    // Apply filtering for logType, ipAddress, userAgent if provided
    if (logType) {
      query.logType = logType;
    }
    if (ipAddress) {
      query.ipAddress = ipAddress;
    }
    if (userAgent) {
      query.userAgent = userAgent;
    }

    // Apply date range filtering for created_at if provided
    if (startDate || endDate) {
      query.created_at = {};
      if (startDate) {
        query.created_at.$gte = new Date(startDate); // Greater than or equal to startDate
      }
      if (endDate) {
        query.created_at.$lte = new Date(endDate); // Less than or equal to endDate
      }
    }

    // Pagination setup
    const skip = (page - 1) * limit;

    // Fetch logs with population, search, filter, and pagination
    const logs = await UserLog.find(query)
      .populate("userId", "name email") // Populate user details
      .sort({ created_at: -1 }) // Sort by latest logs first
      .skip(skip)
      .limit(parseInt(limit));

    // Handle case where no logs are found
    if (logs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No user logs found.",
      });
    }

    // Get total count of logs matching the query (for pagination)
    const totalCount = await UserLog.countDocuments(query);

    return res.status(200).json({
      success: true,
      data: logs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalCount,
      },
    });
  } catch (error) {
    console.error("Error fetching user logs:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching user logs.",
    });
  }
}

/**
 * Controller to log user activity
 */
async function logUserActivity(req, res) {
  const { userId, activity, logType, errorDetails } = req.body;

  try {
    // Validate input
    if (!activity || !logType) {
      return res.status(400).json({
        success: false,
        message: "Activity and logType are required.",
      });
    }

    // Optional: Validate user existence if userId is provided
    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId format.",
      });
    }

    if (userId) {
      const userExists = await User.exists({ _id: userId });
      if (!userExists) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
    }

    // Create and save the log entry
    const logEntry = new UserLog({
      userId: userId || null,
      activity,
      logType,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent"),
      errorDetails: errorDetails || null,
    });

    await logEntry.save();

    return res.status(201).json({
      success: true,
      message: "User activity logged successfully.",
      data: logEntry,
    });
  } catch (error) {
    console.error("Error logging user activity:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while logging user activity.",
    });
  }
}

/**
 * Controller to get user logs by userId
 */
async function getUserLogsByUserId(req, res) {
  const userId = req.params.userId?.replace(/^:/, "");

  try {
    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId format.",
      });
    }

    const logs = await UserLog.find({ userId })
      .populate("userId", "name email")
      .sort({ created_at: -1 });

    if (!logs.length) {
      return res.status(404).json({
        success: false,
        message: "No logs found for the specified user.",
      });
    }

    return res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    console.error("Error fetching user logs for userId:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching user logs.",
    });
  }
}

/**
 * Controller to get user log by logId
 */
async function getUserLogById(req, res) {
  const logId = req.params.logId?.replace(/^:/, "");
  try {
    // Validate logId format
    if (!mongoose.Types.ObjectId.isValid(logId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid logId format.",
      });
    }

    const log = await UserLog.findById(logId).populate("userId", "name email");

    if (!log) {
      return res.status(404).json({
        success: false,
        message: "Log not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: log,
    });
  } catch (error) {
    console.error("Error fetching user log by logId:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the user log.",
    });
  }
}

module.exports = {
  logUserActivity,
  getAllUserLogs,
  getUserLogsByUserId,
  getUserLogById,
};
