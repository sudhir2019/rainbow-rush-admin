const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
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
    userStatus: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "banned"],
    },
    refId: {
      type: String,
      unique: true,
    },
    referredBy: {
      type: String,
    },
    wallet: [
      {
        type: Schema.Types.ObjectId,
        ref: "Wallet",
      },
    ],
    profileState: {
      type: String,
      enum: ["uncompleted", "completed"],
      default: "uncompleted",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Pre-save middleware to set username and refId
userSchema.pre("save", async function (next) {
  try {
    if (this.email && !this.username) {
      // Generate username from email (local part of Gmail)
      const emailLocalPart = this.email.split("@")[0];
      this.username = emailLocalPart.toLowerCase();
    }

    if (!this.refId) {
      // Generate a unique refId
      const generateRefId = () =>
        Math.random().toString(36).substring(2, 8).toUpperCase();
      let newRefId = generateRefId();
      // Ensure refId is unique
      while (await User.exists({ refId: newRefId })) {
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
userSchema.statics.encryptPassword = async (password) => {
  try {
    if (!password || password.length < 6) {
      throw new Error("Password is too weak. Must be at least 6 characters.");
    }
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Error encrypting password: " + error.message);
  }
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  try {
    if (!password || !receivedPassword) {
      throw new Error("Passwords cannot be null or undefined.");
    }
    return await bcrypt.compare(password, receivedPassword);
  } catch (error) {
    throw new Error("Error comparing passwords: " + error.message);
  }
};

// Create indexes for email, mobile and username

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ mobile: 1 }, { unique: true });

// Create User model
const User = mongoose.model("User", userSchema);

module.exports = { User };
