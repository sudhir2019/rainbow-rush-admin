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
  const { search, page = 1, limit = 10, role } = req.query;

  try {
    let query = { isDeleted: { $ne: true } };

    if (search) {
      query.username = { $regex: search, $options: "i" };
    }

    if (role) {
      const roleDocument = await Role.findOne({ name: role });
      if (!roleDocument) {
        return res.status(404).json({
          success: false,
          message: `Role "${role}" not found.`,
        });
      }
      query.roles = roleDocument._id;
    }

    const skip = (page - 1) * limit;

    const users = await User.find(query)
      .skip(skip)
      .limit(parseInt(limit))
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
    const user = await User.findOne(
      { _id: id, isDeleted: { $ne: true } },
      { password: 0 }
    )
      .populate("roles")
      .populate("wallet")
      .populate("userLogs")
      .exec();

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: user });
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
    const roleFound = await Role.findOne({ name: roles });
    if (!roleFound) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }

    const user = await User.findOneAndUpdate(
      { _id: id, isDeleted: { $ne: true } },
      { $set: { roles: roleFound._id } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Create user
const createUser = async (req, res) => {
  try {
    const { username, refId, commissionAmount, note, password, roles } =
      req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });
    const user = new User({
      username,
      password: await User.encryptPassword(password),
      roles: rolesFound.map((role) => role._id),
      referredBy: refId,
      note,
      Commission: commissionAmount,
    });

    if (refId) {
      const referrer = await User.findOne({
        refId: refId,
        isDeleted: { $ne: true },
      });
      if (!referrer) {
        return res.status(404).json({
          success: false,
          message: "Referrer not found. Please check the referral code.",
        });
      }

      const referralTransaction = new ReferTransaction({
        referredUser: user._id,
        referredBy: referrer._id,
        refUserType: roles,
        commissionAmount: commissionAmount,
        status: "paid",
      });

      user.referredBy = referrer.username;
      const savedTransaction = await referralTransaction.save();
      user.referralTransaction.push(savedTransaction._id);
      referrer.referralTransaction.push(savedTransaction._id);
      await referrer.save();
    }

    const wallet = await Wallet.create({
      userId: user._id,
    });

    user.wallet = wallet._id;
    const savedUser = await user.save();

    const users = await User.find({ isDeleted: { $ne: true } })
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
        roles: savedUser.roles,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, failed to create user",
    });
  }
};

// Update user profile
async function updateProfileById(req, res) {
  const { username, password, newPassword } = req.body;
  const id = req.params.id?.replace(/^:/, "");

  try {
    const userFound = await User.findOne({ _id: id, isDeleted: { $ne: true } });
    if (!userFound) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    let encodedPassword;
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

    let profileImageUrl = userFound.profilePicture;
    let profilePicture_id = userFound.profilePicture_id;
    if (req.file) {
      try {
        const imageUploaded = await cloudinary.uploader.upload(req.file.path, {
          folder: "profile_pictures",
        });
        profileImageUrl = imageUploaded.secure_url;
        if (userFound.profilePicture_id) {
          await cloudinary.uploader.destroy(userFound.profilePicture_id);
        }
        profilePicture_id = imageUploaded.public_id;
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Image upload failed.",
          error: uploadError.message,
        });
      }
    }

    const updatedUserFields = {
      username: username || userFound.username,
      password: encodedPassword || userFound.password,
      profilePicture: profileImageUrl,
      profilePicture_id: profilePicture_id,
    };

    const updatedUser = await User.findByIdAndUpdate(id, updatedUserFields, {
      new: true,
    });

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

// Update user (Dashboard)
const updateUserByIdDashboard = async (req, res) => {
  const userId = req.params.id?.replace(/^:/, "");
  const { refId, Commission, note, userStatus } = req.body;

  try {
    if (!Commission && !note && !userStatus) {
      return res.status(400).json({
        success: false,
        message:
          "At least one field (Commission, note, or userStatus) is required for update.",
      });
    }

    const user = await User.findOne({ _id: userId, isDeleted: { $ne: true } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (refId) {
      const referrer = await User.findOne({
        refId: refId,
        isDeleted: { $ne: true },
      });
      if (!referrer) {
        return res.status(404).json({
          success: false,
          message: "Referrer not found. Invalid referral ID.",
        });
      }

      if (user.referredBy === referrer.username) {
        return res.status(400).json({
          success: false,
          message: "This user has already been referred by this referrer.",
        });
      }

      user.referredBy = referrer.username;

      const referralTransaction = new ReferTransaction({
        referredUser: user._id,
        referredBy: referrer._id,
        refUserType: user.roles,
        commissionAmount: 0,
        status: "paid",
      });

      const savedTransaction = await referralTransaction.save();
      user.referralTransaction.push(savedTransaction._id);
      referrer.referralTransaction.push(savedTransaction._id);
      await referrer.save();
    }

    user.Commission = Commission || user.Commission;
    user.note = note || user.note;
    user.userStatus = userStatus ?? user.userStatus;

    await user.save();

    const users = await User.find({ isDeleted: { $ne: true } })
      .populate("roles")
      .populate("wallet")
      .populate("userLogs")
      .exec();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Could not update user.",
    });
  }
};

// Delete user
async function deleteUserById(req, res) {
  const userId = req.params.id?.replace(/^:/, "");

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Perform soft delete
    await user.softDelete();

    const users = await User.findNonDeleted()
      .populate("roles")
      .populate("wallet")
      .populate("userLogs")
      .exec();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Toggle user status
async function toggleUserStatus(req, res) {
  const userId = req.params.id?.replace(/^:/, "");
  const action = req.params.action;

  try {
    const user = await User.findOne({ _id: userId, isDeleted: { $ne: true } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (action === "activate") {
      user.userStatus = true;
    } else if (action === "deactivate") {
      user.userStatus = false;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid action. Use 'activate' or 'deactivate'.",
      });
    }

    await user.save();

    const users = await User.findNonDeleted()
      .populate("roles")
      .populate("wallet")
      .populate("userLogs")
      .exec();

    return res.status(200).json({
      success: true,
      message: `User ${action}d successfully`,
      data: users,
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
