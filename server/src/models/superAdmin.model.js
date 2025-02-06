const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const superAdminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    profilePicture_id: {
      type: String,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    lastLoginTime: {
      type: Date,
    },
    userStatus: {
      type: Boolean,
      default: true,
    },
    refId: {
      type: String,
      unique: true,
    },
    referredBy: {
      type: String,
    },
    note: {
      type: String,
      default: "Initial State",
    },
    Commission: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],

    wallet: [
      {
        type: Schema.Types.ObjectId,
        ref: "Wallet",
      },
    ],
    referralTransaction: [
      {
        type: Schema.Types.ObjectId,
        ref: "ReferTransaction",
      },
    ],
    userLogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserLog",
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    companies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Companie",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

// Pre-save middleware to set username and refId
superAdminSchema.pre("save", async function (next) {
  try {
    if (!this.refId) {
      const generateRefId = () =>
        Math.random().toString(36).substring(2, 8).toUpperCase();
      let newRefId = generateRefId();
      while (await SuperAdmin.exists({ refId: newRefId })) {
        newRefId = generateRefId();
      }
      this.refId = newRefId;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Static Methods for password encryption and comparison
superAdminSchema.statics.encryptPassword = async (password) => {
  try {
    if (!password || password.length < 3) {
      throw new Error("Password is too weak. Must be at least 6 characters.");
    }
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Error encrypting password: " + error.message);
  }
};

superAdminSchema.statics.comparePassword = async (
  password,
  receivedPassword
) => {
  try {
    if (!password || !receivedPassword) {
      throw new Error("Passwords cannot be null or undefined.");
    }
    return await bcrypt.compare(password, receivedPassword);
  } catch (error) {
    throw new Error("Error comparing passwords: " + error.message);
  }
};

// Method to handle login logic and check the last login time
superAdminSchema.methods.login = async function () {
  const now = new Date();

  if (this.lastLoginTime && now - this.lastLoginTime > 24 * 60 * 60 * 1000) {
    this.isLoggedIn = false;
  }

  this.lastLoginTime = now;
  this.isLoggedIn = true;

  await this.save();
};

// Method to perform soft delete
superAdminSchema.methods.softDelete = async function () {
  this.isDeleted = true;
  this.deletedAt = new Date();
  await this.save();
};

// Static method to find non-deleted users by default
superAdminSchema.statics.findNonDeleted = function () {
  return this.find({ isDeleted: { $ne: true } });
};

// Create indexes for email, mobile and username
superAdminSchema.index({ username: 1 }, { unique: true });

const SuperAdmin = mongoose.model("SuperAdmin", superAdminSchema);

module.exports = { SuperAdmin };
