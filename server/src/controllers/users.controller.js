const { User } = require("../models/user.model");
const { Role } = require("../models/roles.model");
const Wallet = require("../models/wallet.model");
const UserLog = require("../models/userLog.model");
const ReferTransaction = require("../models/referTransaction.model");
const UserTransaction = require("../models/userTransaction.model");
const { cloudinary } = require("../configs/cloudinary");
const path = require("path");
// Get all users
async function getAllUsers(req, res) {
  const { search, profileState, page = 1, limit = 10, role } = req.query;

  try {
    let query = {};

    // Apply search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ];
    }

    // Apply profileState filter
    if (profileState) {
      query.profileState = profileState;
    }

    // Apply role-based filter
    if (role) {
      const roleDocument = await Role.findOne({ name: role });
      if (!roleDocument) {
        return res.status(404).json({
          success: false,
          message: `Role "${role}" not found.`,
        });
      }
      query.roles = roleDocument._id; // Filter users by role ID
    }

    // Apply pagination
    const skip = (page - 1) * limit;

    // Fetch users
    const users = await User.find()
      .populate("roles")
      .populate("wallet")
      .populate("userLogs")
      .exec();

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found for the given criteria.",
      });
    }

    // Get total count for pagination
    const totalCount = await User.countDocuments(query);

    return res.status(200).json({
      success: true,
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalCount,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Could not fetch users.",
    });
  }
}

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const id = req.params.id?.replace(/^:/, "");
    const user = await User.findById(id, { password: 0 })
      .populate("roles") // Populates the 'roles' field (Role model)
      .populate("wallet") // Populates the 'wallet' field (Wallet model)
      .populate("userLogs") // Populates the 'userLogs' field (UserLog model)
      .exec();

    return res.status(200).json({ successful: true, data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update user's role by ID
async function updateUserRoleById(req, res) {
  const { roles } = req.body;
  try {
    const id = req.params.id?.replace(/^:/, "");
    let roleFound = await Role.findOne({ name: roles });
    if (!roleFound)
      return res
        .status(404)
        .json({ success: false, message: "Role not provided" });

    let user = await User.findById(id);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    user = await User.findByIdAndUpdate(
      id,
      { $set: { roles: roleFound._id } },
      { new: true }
    );
    updatedUser = await user.save();

    return res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Create user
const createUser = async (req, res) => {
  try {
    const { username, firstName, lastName, email, mobile, password, roles } =
      req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });
    const user = new User({
      name: req.body.userFullName || `${firstName} ${lastName}`,
      email,
      mobile,
      password: await User.encryptPassword(password),
      roles: rolesFound.map((role) => role._id),
    });

    if (email && !username) {
      const emailLocalPart = email.split("@")[0];
      user.username = emailLocalPart.toLowerCase(); // Convert to lowercase for consistency
    }
    const wallet = await Wallet.create({
      userId: user._id,
    });

    // Save the new user to the database
    user.wallet = wallet._id;

    const savedUser = await user.save();
    // Fetch users
    const users = await User.find()
      .populate("roles")
      .populate("wallet")
      .populate("userLogs")
      .exec();
    return res.status(201).json({
      success: true,
      data: users,
      dataUser: {
        id: savedUser._id,
        username: savedUser.username,
        mobile: savedUser.mobile,
        email: savedUser.email,
        roles: savedUser.roles,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "something went wrong, fail to create user ",
    });
  }
};

// Function to update user profile and handle image upload
async function updateProfileById(req, res) {
  const { email, lastName, firstName, password, newPassword } = req.body;
  const mobile = req.body.mobile ? parseInt(req.body.mobile) : undefined; // Convert mobile if provided
  const fullName = `${firstName || ""} ${lastName || ""}`.trim();
  const id = req.params.id?.replace(/^:/, ""); // Remove ':' from ID, if present

  try {
    // Find the user by ID
    const userFound = await User.findById(id);
    if (!userFound) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    let encodedPassword;

    // Check and compare password if updating the password
    if (newPassword && password) {
      const matchPassword = await User.comparePassword(
        password,
        userFound.password
      );

      if (!matchPassword) {
        return res
          .status(401)
          .json({ success: false, message: "Current password is incorrect." });
      }

      encodedPassword = await User.encryptPassword(newPassword);
    }
    // Handle profile image upload if provided
    let profileImageUrl = userFound.profilePicture; // Default to existing profile picture
    if (req.file) {
      try {
        // Upload new image to Cloudinary
        const imageUploaded = await cloudinary.uploader.upload(req.file.path, {
          folder: "profile_pictures", // Optional: specify folder in Cloudinary
        });

        profileImageUrl = imageUploaded.secure_url;

        // Optionally delete the old image from Cloudinary
        if (userFound.profilePicture_id) {
          await cloudinary.uploader.destroy(userFound.profilePicture_id);
        }

        // Save the new image ID
        userFound.profilePicture_id = imageUploaded.public_id;
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Image upload failed.",
          error: uploadError.message,
        });
      }
    }

    // Prepare fields to update
    const updatedUserFields = {
      name: fullName || userFound.name,
      password: encodedPassword || userFound.password,
      email: email || userFound.email,
      mobile: mobile || userFound.mobile,
      profilePicture: profileImageUrl,
    };

    // Update user in the database
    const updatedUser = await User.findByIdAndUpdate(
      userFound.id,
      updatedUserFields,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "User updated successfully.",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error occurred." });
  }
}

// Update
const updateUserByIdDashboard = async (req, res) => {
  const userId = req.params.id?.replace(/^:/, "");
  const { Commission, note, userStatus } = req.body;
  try {
    // Find user by username (assuming username is unique)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Superdistributor user not found",
      });
    }

    // Update the fields (commission, note, status)
    user.Commission = Commission || user.Commission;
    user.note = note || user.note;
    user.userStatus = userStatus || user.userStatus;

    // Save the updated user
    await user.save();
    const users = await User.find()
      .populate("roles")
      .populate("wallet")
      .populate("userLogs")
      .exec();
    return res.status(200).json({
      success: true,
      message: "Superdistributor updated successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error updating Superdistributor:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Could not update Superdistributor.",
    });
  }
};

// Controller to delete a user by ID
async function deleteUserById(req, res) {
  const userId = req.params.id?.replace(/^:/, "");

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete associated images from Cloudinary
    const imageDeletionPromises = [];

    if (user.profilePicture_id) {
      imageDeletionPromises.push(
        deleteImageFromCloudinary(user.profilePicture_id)
      );
    }

    // Wait for all image deletions to complete
    await Promise.all(imageDeletionPromises);

    // Delete associated records
    const deletionPromises = [
      UserLog.deleteMany({ userId }), // Delete user logs
      Wallet.deleteOne({ userId }), // Delete wallet
      UserTransaction.deleteMany({ userId }), // Delete user transactions
      ReferTransaction.deleteMany({
        $or: [{ referredBy: userId }, { referredUser: userId }],
      }), // Delete referral transactions
    ];
    await Promise.all(deletionPromises);

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete user",
      });
    }
    const users = await User.find()
    .populate("roles")
    .populate("wallet")
    .populate("userLogs")
    .exec();
    // Return success response
    return res.status(200).json({
      success: true,
      message: "User and all associated data deleted successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error occurred during user deletion:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function deleteImageFromCloudinary(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result === "ok") {
      console.log(
        `Image with public ID ${publicId} deleted successfully from Cloudinary.`
      );
    } else {
      console.warn(
        `Failed to delete image with public ID ${publicId} from Cloudinary.`
      );
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
}

// Controller to activate or deactivate a user based on action
async function toggleUserStatus(req, res) {
  const userId = req.params.id?.replace(/^:/, "");
  const action = req.params.action; // Expecting "activate" or "deactivate" in the URL

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    // If user doesn't exist
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Handle the action (activate or deactivate)
    if (action === "activate") {
      user.userStatus = true; // Set user status to active
    } else if (action === "deactivate") {
      user.userStatus = false; // Set user status to inactive
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid action. Use 'activate' or 'deactivate'.",
      });
    }

    // Save the updated user
    await user.save();
    //Get All Usres
    // Populate roles and wallet data for all users
    const users = await User.find()
      .populate("roles")
      .populate("wallet")
      .populate("userLogs")
      .exec();
    // Filter users to include only active users
    const activeUsers = users.filter((user) => user.userStatus);

    // Get all user logs
    const userLogs = await UserLog.find({ userId: userId }).exec();

    // Return success response
    return res.status(200).json({
      success: true,
      message: `User ${action}d successfully`,
      dataUser: {
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.userStatus,
      },
      data: users,
      userLogs: userLogs,
      activeUsers: activeUsers,
    });
  } catch (error) {
    console.error(`Error occurred during user ${action}:`, error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserRoleById,
  updateProfileById,
  deleteUserById,
  toggleUserStatus,
  updateUserByIdDashboard,
};
