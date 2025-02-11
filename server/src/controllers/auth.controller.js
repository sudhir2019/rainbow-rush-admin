const { User } = require("../models/user.model");
const TemporalUser = require("../models/temporalUser.model");
const { Role } = require("../models/roles.model");
const UserLog = require("../models/userLog.model");
const bcrypt = require("bcryptjs");
const Wallet = require("../models/wallet.model");
const { encrypt, decrypt } = require("../utils/encryptionAndDecryption");
require("dotenv").config({ path: ".env" });
const jwt = require("jsonwebtoken");
const { ReferTransaction } = require("../models/referTransaction.model");
const sendConfirmationEmailFunction = require("../libs/sendConfirmationEmail");
const sendResetPasswordEmailFunction = require("../libs/sendResetPasswordEmail");
const { getCookieValueByName } = require("../utils/getCookieValueByName");
const logUserActivity = require("../libs/userActivity");
const { SuperAdmin } = require("../models/superAdmin.model");

// Signup function for user registration
async function signUp(req, res) {
  try {
    const { username, password, roles, referredBy, isSuperAdmin } = req.body;

    // Check if user already exists
    let existingUser = await User.findOne({ username });
    let existingSuperAdmin = await SuperAdmin.findOne({ username });
    if (existingUser || existingSuperAdmin) {
      return res.status(409).json({
        successful: false,
        message: "Username already exists.",
      });
    }

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({
        successful: false,
        message: "Username and password are required.",
      });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    if (isSuperAdmin) {
      newUser = new SuperAdmin({
        username,
        password: hashedPassword,
        referredBy,
      });
    } else {
      newUser = new User({
        username,
        password: hashedPassword,
        referredBy,
      });
    }

    // Assign roles
    if (roles && roles.length) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      if (!foundRoles.length) {
        return res.status(400).json({
          successful: false,
          message: "Invalid roles provided.",
        });
      }
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const defaultRole = await Role.findOne({ name: "user" });
      newUser.roles = [defaultRole._id];
    }

    // Generate email confirmation token
    const token = jwt.sign(
      { id: newUser.id },
      process.env.JWT_EMAIL_CONFIRMATION_KEY,
      { expiresIn: "1h" }
    );
    newUser.emailToken = token;

    // Generate confirmation URL
    const url = `${
      process.env.HOST || "http://localhost:3000"
    }/authentication/confirmation/${token}`;

    // Handle referral bonus
    if (referredBy) {
      const referrer =
        (await User.findOne({ refId: referredBy })) ||
        (await SuperAdmin.findOne({ refId: referredBy }));
      if (!referrer) {
        return res.status(404).json({
          successful: false,
          message: "Referrer not found. Please check the referral code.",
        });
      }

      const referralTransaction = new ReferTransaction({
        userId: newUser._id,
        referrerId: referrer._id,
        refUserType: roles,
        bonusAmount: 10,
        status: "pending",
      });

      const savedTransaction = await referralTransaction.save();
      newUser.referralTransactionId = savedTransaction._id;
    }

    // Send confirmation email
    await sendConfirmationEmailFunction(url, username);

    // Save the user
    await newUser.save();

    return res.status(201).json({
      successful: true,
      message: "User created successfully. Please check your email to confirm.",
      username: newUser.username,
    });
  } catch (error) {
    return res.status(500).json({
      successful: false,
      message: "Something went wrong during sign-up.",
      error: error.message,
    });
  }
}
// Send confirmation email
async function sendConfirmationEmail(req, res) {
  try {
    const userFound = await User.findOne({
      username: req.body.username,
      isDeleted: { $ne: true },
    });

    if (!userFound) {
      await logUserActivity(
        req,
        req.body.userId,
        "Email Confirmation Failed",
        "User not found"
      );
      return res.status(404).json({ message: "User not found" });
    }

    const token = userFound.emailToken;
    const url = `${
      process.env.HOST || "localhost:7000"
    }/api/auth/verification/${token}`;

    await sendConfirmationEmailFunction(url, userFound.username);
    await logUserActivity(req, userFound._id, "Email Confirmation Sent");

    return res.status(200).json({
      success: true,
      message: "Account confirmation email has been sent successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

// Get session
async function getSession(req, res) {
  try {
    // Get the session token from cookies
    let cookieToken = getCookieValueByName(
      req.cookies,
      process.env.SESSION_TOKEN || "session-token"
    );

    if (!cookieToken) {
      return res.status(404).json({
        successful: false,
        message: "No session token was found",
      });
    }

    // Decode the JWT
    const decoded = jwt.verify(cookieToken, process.env.JWT_SECRET_KEY);

    // Find user (excluding deleted users and excluding password field)
    const user = await User.findOne(
      { _id: decoded.id, isDeleted: { $ne: true } },
      { password: 0 }
    )
      .populate("roles")
      .populate("wallet")
      .populate("userLogs")
      .exec();

    // Find super admin (excluding deleted users and excluding password field)
    const superAdmin = await SuperAdmin.findOne(
      { _id: decoded.id, isDeleted: { $ne: true } },
      { password: 0 }
    )
      .populate("roles")
      .populate("wallet")
      .populate("userLogs")
      .exec();

    // Determine the logged-in user
    let onlineUser = user || superAdmin;

    // If neither user nor superAdmin is found, return an error
    if (!onlineUser) {
      return res
        .status(404)
        .json({ successful: false, message: "No user found" });
    }

    // Log user activity (only if a valid user exists)
    await logUserActivity(
      req,
      onlineUser._id,
      "Session Retrieved Successfully"
    );

    // Return the user session data
    return res
      .status(200)
      .json({ successful: true, user: onlineUser, token: cookieToken });
  } catch (error) {
    console.error("Session retrieval error:", error);
    return res.status(401).json({ successful: false, message: "Unauthorized" });
  }
}

// Validate Email Token and Create User
async function validateEmailToken(req, res) {
  const token = req.params.token?.replace(/^:/, "");

  if (!token) {
    return res.status(400).json({ error: "Token is missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_EMAIL_CONFIRMATION_KEY);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token." });
    }

    const tempUser = await TemporalUser.findById(decoded.id);
    if (!tempUser) {
      return res.status(404).json({ error: "Temporary user not found." });
    }

    const hashedPassword = await User.encryptPassword(tempUser.password);

    // Create a new user with data from `tempUser`
    const newUser = new User({
      username: tempUser.username,
      password: hashedPassword,
      roles: tempUser.roles,
    });

    // Create a wallet for the new user
    const wallet = await createWallet(newUser, tempUser);
    if (!wallet) {
      return res.status(401).json({
        successful: false,
        message: "Wallet not created!!",
      });
    }

    // Save the new user and link the wallet
    newUser.wallet = wallet._id;
    await newUser.save();

    // Handle referral logic
    await handleReferralLogic(newUser, tempUser, wallet);

    // Remove temporary user
    await TemporalUser.findByIdAndDelete(tempUser._id);

    // Log user creation activity
    await logUserActivity(req, newUser._id, "User Account Created");

    return res.status(201).json({
      successful: true,
      refId: newUser.refId,
      message: "User created successfully. You can now log in.",
      redirect: `/login`,
    });
  } catch (error) {
    console.error("Error during validateEmailToken:", error);
    return res.status(500).json({
      successful: false,
      message: "Something went wrong during validate Email Token",
    });
  }
}

// Create Wallet Function
async function createWallet(user, tempUser) {
  const walletData = {
    userId: user._id,
    balance: encrypt("0"),
    currency: encrypt("INR"),
    bonus: encrypt("0"),
  };

  if (tempUser.referralTransactionId) {
    const referralTransaction = await ReferTransaction.findById(
      tempUser.referralTransactionId
    );
    if (referralTransaction) {
      walletData.referTransactionId = referralTransaction._id;
    }
  }

  return Wallet.create(walletData);
}

// Handle Referral Logic
async function handleReferralLogic(newUser, tempUser, wallet) {
  if (!tempUser.referredBy) return;

  try {
    const referredBy = tempUser.referredBy;
    const referUser = await User.findOne({
      refId: referredBy,
      isDeleted: { $ne: true },
    }).populate("wallet");

    if (referUser && referUser.wallet) {
      const referUserWallet = await Wallet.findById(referUser.wallet);
      if (referUserWallet) {
        referUserWallet.bonus = encrypt(
          (parseFloat(decrypt(referUserWallet.balance)) + 5).toString()
        );

        const referralTransaction = await ReferTransaction.findById(
          tempUser.referralTransactionId
        );
        referUserWallet.referTransactionId.push(referralTransaction._id);
        await referUserWallet.save();
      }
    }

    wallet.bonus = encrypt("10");
    await wallet.save();

    if (tempUser.referralTransactionId) {
      const referralTransaction = await ReferTransaction.findById(
        tempUser.referralTransactionId
      );
      if (referralTransaction) {
        referralTransaction.refUserType = newUser.roles;
        referralTransaction.userbonus = "10";
        referralTransaction.refbonus = "10";
        referralTransaction.status = "completed";
        referralTransaction.userId = newUser._id;
        referralTransaction.walletId = wallet._id;
        await referralTransaction.save();
      }
    }

    newUser.referredBy = referredBy;
  } catch (error) {
    console.error("Error in handleReferralLogic:", error);
    throw error;
  }
}

// User login function
async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Check if the user is a temporal user
    let temporalUser = await TemporalUser.findOne({ username });
    if (temporalUser) {
      return res.status(409).json({
        successful: false,
        message: "Please check your email to confirm.",
      });
    }

    // Check if the user exists in User or SuperAdmin
    let userFound = await User.findOne({ username, isDeleted: { $ne: true } })
      .populate("roles")
      .populate("wallet")
      .populate("userLogs")
      .exec();

    if (!userFound) {
      userFound = await SuperAdmin.findOne({
        username,
        isDeleted: { $ne: true },
      })
        .populate("roles")
        .populate("wallet")
        .populate("userLogs")
        .exec();
    }

    if (!userFound) {
      return res.status(400).json({ message: "User Not Found" });
    }

    // Check password
    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );
    if (!matchPassword) {
      await logUserActivity(
        req,
        userFound._id,
        "Login Attempt Failed",
        "Invalid Password"
      );
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });
    }

    // Update login status and time
    await userFound.login();

    // Log successful login
    await logUserActivity(req, userFound._id, "Login Successful", null);

    const twoDaysInSeconds = 86400 * 2;

    // Generate JWT token
    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: twoDaysInSeconds,
    });

    // Set cookie
    res.cookie(process.env.SESSION_TOKEN || "session-token", token, {
      maxAge: twoDaysInSeconds * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({
      token: token,
      roles: userFound.roles,
      user: userFound,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

// User logout function
async function logout(req, res) {
  try {
    const sessionToken = req.cookies[process.env.SESSION_TOKEN];

    if (!sessionToken) {
      return res.status(400).json({
        success: false,
        message: "No session token found. User is not logged in.",
      });
    }

    const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not found in the session token.",
      });
    }

    const user = await User.findOne({ _id: userId, isDeleted: { $ne: true } });
    if (user) {
      user.isLoggedIn = false;
      await user.save();
    }

    await logUserActivity(req, userId, "Logout Successful", null);

    res.clearCookie(process.env.SESSION_TOKEN);

    return res.status(200).json({
      success: true,
      message: "User has logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during logout.",
      error: error.message,
    });
  }
}

// Send reset password email
async function sendResetPasswordEmail(req, res) {
  try {
    const userFound = await User.findOne({
      username: req.body.username,
      isDeleted: { $ne: true },
    });
    if (!userFound) {
      return res.status(422).json({
        successful: false,
        message: "No account linked with that username",
      });
    }

    const token = jwt.sign(
      {
        id: userFound._id,
        expiration: Date.now() + 10 * 60 * 1000,
      },
      process.env.JWT_RESET_FORGOTTEN_PASSWORD_KEY
    );

    await logUserActivity(
      req,
      userFound._id,
      "Reset Password Token Generated",
      null
    );

    const url = `${
      process.env.HOST || "localhost:3000"
    }/authentication/resetPassword/${token}`;
    await sendResetPasswordEmailFunction(url, userFound.username);
    await logUserActivity(
      req,
      userFound._id,
      "Reset Password Email Sent",
      null
    );

    return res.status(200).json({
      success: true,
      message: "Reset password email has been sent successfully",
    });
  } catch (err) {
    return res.status(500).json({
      successful: false,
      message: "Something went wrong, failed to send reset password email",
    });
  }
}

// Reset password
async function resetPassword(req, res) {
  try {
    const { newPassword, confirmPassword } = req.body;
    const token = req.params.token;

    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_RESET_FORGOTTEN_PASSWORD_KEY
    );
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (Date.now() > decoded.expiration) {
      await logUserActivity(
        req,
        decoded.id,
        "Password Reset Failed",
        "Token expired"
      );
      return res.status(422).json({
        successful: false,
        message: "Time to reset password exceeded",
      });
    }

    const userFound = await User.findOne({
      _id: decoded.id,
      isDeleted: { $ne: true },
    });
    if (!userFound) {
      await logUserActivity(
        req,
        decoded.id,
        "Password Reset Failed",
        "User not found"
      );
      return res.status(404).json({ message: "User not found" });
    }

    if (newPassword !== confirmPassword) {
      await logUserActivity(
        req,
        decoded.id,
        "Password Reset Failed",
        "Passwords do not match"
      );
      return res
        .status(400)
        .json({ successful: false, message: "Passwords don't match" });
    }

    if (newPassword.length < 5) {
      await logUserActivity(
        req,
        decoded.id,
        "Password Reset Failed",
        "Password length less than 5 characters"
      );
      return res
        .status(400)
        .json({ successful: false, message: "Password min length is 5" });
    }

    userFound.password = await User.encryptPassword(newPassword);
    await userFound.save();

    await logUserActivity(req, decoded.id, "Password Reset Successful", null);

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    return res.status(500).json({
      successful: false,
      message: "Something went wrong, failed to update password",
    });
  }
}

module.exports = {
  signUp,
  login,
  sendConfirmationEmail,
  validateEmailToken,
  sendResetPasswordEmail,
  resetPassword,
  getSession,
  logout,
};
