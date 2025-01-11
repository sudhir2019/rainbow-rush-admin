const { User } = require("../models/user.model");
const { Role } = require("../models/roles.model");
const { cloudinary } = require("../configs/cloudinary");
const path = require("path");
// Get all users
async function getAllUsers(req, res) {
  const { search, profileState, page = 1, limit = 10 } = req.query;

  try {
    // Base query object
    let query = {};

    // Apply search functionality (search by name, email, or mobile)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } }, // Case-insensitive search by name
        { email: { $regex: search, $options: "i" } }, // Case-insensitive search by email
        { mobile: { $regex: search, $options: "i" } }, // Case-insensitive search by mobile
      ];
    }

    // If profileState is provided in the query, add it to the filter
    if (profileState) {
      query.profileState = profileState;
    }

    // Apply pagination
    const skip = (page - 1) * limit;

    // Fetch users with population, search, and pagination
    const users = await User.find(query)
      .populate("roles") // Populate the roles field
      .skip(skip)
      .limit(parseInt(limit));

    // Handle case where no users are found
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found.",
      });
    }

    // Get total count of users matching the query (for pagination)
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
    const user = await User.findById(id, { password: 0 }).populate("roles");

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
    const { firstName, lastName, email, mobile, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });
    const user = new User({
      name: req.body.userName || `${firstName} ${lastName}`,
      email,
      mobile,
      password: await User.encryptPassword(password),
      roles: rolesFound.map((role) => role._id),
    });

    const savedUser = await user.save();

    return res.status(201).json({
      success: true,
      data: {
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

// Function to upload Aadhaar and PAN verification details
async function uploadVerificationDetails(req, res) {
  const { aadharNo, panNo } = req.body;
  const userId = req.params.id?.replace(/^:/, "");

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Ensure both Aadhaar and PAN images are provided
    if (!req.files || !req.files.aadharImage || !req.files.panImage) {
      return res.status(400).json({
        success: false,
        message: "Both Aadhaar and PAN images are required",
      });
    }

    // Upload Aadhaar image to Cloudinary
    const aadharImageUpload = await cloudinary.uploader.upload(
      req.files.aadharImage[0].path
    );

    // Upload PAN image to Cloudinary
    const panImageUpload = await cloudinary.uploader.upload(
      req.files.panImage[0].path
    );

    // Update the user's details with the uploaded images and numbers
    user.aadharImage = aadharImageUpload.secure_url;
    user.aadharImage_id = aadharImageUpload.public_id;
    user.panImage = panImageUpload.secure_url;
    user.panImage_id = panImageUpload.public_id;
    user.aadharNo = aadharNo || null;
    user.panNo = panNo || null;

    // Set the initial verification status to "pending" for both Aadhaar and PAN
    user.aadharVerify = "pending";
    user.panVerify = "pending";

    // Profile state remains "uncompleted" until both verifications are completed
    user.profileState = "uncompleted";

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Aadhaar and PAN details uploaded successfully",
      data: {
        aadharImage: user.aadharImage,
        panImage: user.panImage,
        aadharNo: user.aadharNo,
        panNo: user.panNo,
        aadharVerify: user.aadharVerify,
        panVerify: user.panVerify,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error uploading details" });
  }
}

// Verification function - Admin only
async function verifyDetails(req, res) {
  const { userId, aadharVerify, panVerify } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Handle Aadhaar verification status and image upload
    if (aadharVerify !== undefined) {
      if (aadharVerify === "accepted") {
        // Accept Aadhaar verification: Set verification status to accepted
        user.aadharVerify = "accepted";
      } else if (aadharVerify === "rejected") {
        // Reject Aadhaar verification: Set verification status to filed and remove image
        user.aadharVerify = "filed";
        user.aadharImage = null; // Remove the image if rejected
      }
    }

    // Handle PAN verification status and image upload
    if (panVerify !== undefined) {
      if (panVerify === "accepted") {
        // Accept PAN verification: Set verification status to accepted
        user.panVerify = "accepted";
      } else if (panVerify === "rejected") {
        // Reject PAN verification: Set verification status to filed and remove image
        user.panVerify = "filed";
        user.panImage = null; // Remove the image if rejected
      }
    }

    // Determine profile state based on Aadhaar and PAN verification status
    let profileState = "uncompleted";
    if (user.aadharVerify === "accepted" && user.panVerify === "accepted") {
      profileState = "completed";
    }
    user.profileState = profileState;

    // Save the updated user data
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Verification statuses updated successfully",
      data: {
        aadharVerify: user.aadharVerify,
        panVerify: user.panVerify,
        aadharImage: user.aadharImage,
        panImage: user.panImage,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error verifying details" });
  }
}
// Function to update user status (active, inactive, banned)
async function updateUserStatus(req, res) {
  const { userId, userStatus } = req.body;

  // Input validation
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing userId.",
    });
  }

  if (!["active", "inactive", "banned"].includes(userStatus)) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid user status. Valid values are 'active', 'inactive', or 'banned'.",
    });
  }

  try {
    // Find user by ID and update status
    const user = await User.findByIdAndUpdate(
      userId,
      { userStatus },
      { new: true, runValidators: true } // Ensure we return the updated document and validate the change
    );

    // If user is not found, return 404
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `User status updated to ${userStatus}`,
      data: {
        userId: user._id,
        userStatus: user.userStatus,
      },
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating user status",
      error: error.message || "Internal server error",
    });
  }
}
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

    // Delete profile image from Cloudinary if it exists
    if (user.profilePicture_id) {
      imageDeletionPromises.push(
        deleteImageFromCloudinary(user.profilePicture_id)
      );
    }

    // Delete Aadhaar image from Cloudinary if it exists
    if (user.aadharImage_id) {
      imageDeletionPromises.push(
        deleteImageFromCloudinary(user.aadharImage_id)
      );
    }

    // Delete PAN image from Cloudinary if it exists
    if (user.panImage_id) {
      imageDeletionPromises.push(deleteImageFromCloudinary(user.panImage_id));
    }

    // Wait for all image deletions to complete
    await Promise.all(imageDeletionPromises);

    // Perform the user deletion
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete user",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "User and associated data deleted successfully",
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

module.exports = {
  verifyDetails,
  uploadVerificationDetails,
  getAllUsers,
  getUserById,
  createUser,
  updateUserRoleById,
  updateProfileById,
  updateUserStatus,
  deleteUserById,
};
