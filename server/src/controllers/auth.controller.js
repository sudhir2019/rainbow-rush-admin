const { User } = require("../models/user.model");
const TemporalUser = require("../models/temporalUser.model");
const { Role } = require("../models/roles.model");
const UserLog = require("../models/userLog.model");
const bcrypt = require("bcryptjs");
const Wallet = require("../models/wallet.model");
const { encrypt, decrypt } = require("../utils/encryptionAndDecryption");
require("dotenv").config({ path: ".env" });
const jwt = require("jsonwebtoken"); // Import the jwt library
const { ReferTransaction } = require("../models/referTransaction.model");
const sendConfirmationEmailFunction = require("../libs/sendConfirmationEmail");
const sendResetPasswordEmailFunction = require("../libs/sendResetPasswordEmail");
const { getCookieValueByName } = require("../utils/getCookieValueByName");
const logUserActivity = require("../libs/userActivity");

// Signup function for user registration
async function signUp(req, res) {
  try {
    const { email, firstName, lastName, mobile, password, roles, referredBy } =
      req.body;

    // Check if the email already exists
    let userEmail = await User.findOne({ email: email });
    if (userEmail) {
      return res.status(409).json({
        successful: false,
        message: "Email already exists.",
      });
    }

    // Check if the mobile number already exists
    let userMobile = await User.findOne({ mobile: mobile });
    if (userMobile) {
      return res.status(409).json({
        successful: false,
        message: "Mobile number already exists.",
      });
    }

    // Validate required fields
    if (!firstName || !lastName || !email || !mobile || !password) {
      return res.status(400).json({
        successful: false,
        message:
          "First Name, Last Name, Email, mobile, and password are required.",
      });
    }

    // Check if a temporal user exists
    let temporalUser = await TemporalUser.findOne({ email });
    if (temporalUser) {
      return res.status(409).json({
        successful: false,
        message: "Please check your email to confirm.",
      });
    }

    // Create a new temporal user
    if (!temporalUser) {
      temporalUser = new TemporalUser({
        name: req.body.userName || `${firstName} ${lastName}`,
        email,
        password,
        mobile,
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
      temporalUser.roles = foundRoles.map((role) => role._id);
    } else {
      const defaultRole = await Role.findOne({ name: "user" });
      temporalUser.roles = [defaultRole._id];
    }

    // Generate email confirmation token
    const token = jwt.sign(
      { id: temporalUser.id },
      process.env.JWT_EMAIL_CONFIRMATION_KEY,
      { expiresIn: "1h" } // Token expires in 1 hour
    );
    temporalUser.emailToken = token;

    // Generate confirmation URL
    const url = `${
      process.env.HOST || "http://localhost:3000"
    }/authentication/confirmation/:${token}`;

    // Handle referral bonus (set status as pending)
    if (referredBy) {
      const referrer = await User.findOne({ refId: referredBy });
      if (!referrer) {
        return res.status(404).json({
          successful: false,
          message: "Referrer not found. Please check the referral code.",
        });
      }
      if (referrer) {
        const referralTransaction = new ReferTransaction({
          userId: temporalUser._id, // Temporary user ID
          referrerId: referrer._id, // Referrer's ID
          refUserType: roles, // Assuming user type is temporal
          bonusAmount: "10", // Example bonus amount
          status: "pending", // Explicitly setting the status to pending
        });

        // Save the referral transaction and store its ID in temporalUser
        const savedTransaction = await referralTransaction.save();
        temporalUser.referralTransactionId = savedTransaction._id;
      }
    }

    // Send confirmation email
    await sendConfirmationEmailFunction(url, email);

    // Log successful activity
    await logUserActivity(req, temporalUser._id, "Resource Creation");
    // Save the user
    await temporalUser.save();

    return res.status(201).json({
      successful: true,
      message: "User created successfully. Please check your email to confirm.",
      email: temporalUser.email,
    });
  } catch (error) {
    return res.status(500).json({
      successful: false,
      message: "Something went wrong during sign-up.",
    });
  }
}

// Send a confirmation email to the user
async function sendConfirmationEmail(req, res) {
  try {
    // Find the user by email
    const userFound = await User.findOne({ email: req.body.email });

    if (!userFound) {
      // Log activity when user is not found
      await logUserActivity(
        req,
        req.body.userId,
        "Email Confirmation Failed",
        "User not found"
      );

      return res.status(404).json({ message: "User not found" });
    }

    const token = userFound.emailToken;

    // Construct the confirmation URL
    const url = `${
      process.env.HOST || "localhost:7000"
    }/api/auth/verification/${token}`;

    // Send the confirmation email
    await sendConfirmationEmailFunction(url, userFound.email);

    // Log activity for successful email sent
    await logUserActivity(req, userFound._id, "Email Confirmation Sent");

    // Respond with success message
    return res.status(200).json({
      success: true,
      message: "Account confirmation email has been sent successfully",
    });
  } catch (error) {
    // Respond with an error message
    return res.status(500).json({ message: "Something went wrong" });
  }
}

// Get user session information
async function getSession(req, res) {
  try {
    let cookieToken;
    cookieToken = getCookieValueByName(
      req.cookies,
      process.env.SESSION_TOKEN || "session-token" // Fallback to default if undefined
    );
    if (!cookieToken) {
      // Log activity when no session token is found
      return res
        .status(404)
        .json({ successful: false, message: "No session token was found" });
    }

    // Verify the session token
    const decoded = jwt.verify(cookieToken, process.env.JWT_SECRET_KEY);
    // Find user by ID
    const user = await User.findById(decoded.id, { password: 0 })
      .populate("roles") // Populates the 'roles' field (Role model)
      .populate("wallet") // Populates the 'wallet' field (Wallet model)
      .populate("userLogs") // Populates the 'userLogs' field (UserLog model)
      .exec();

    if (!user) {
      // Log activity when no user is found
      return res.status(404).json({ message: "No user found" });
    }

    // Log successful session retrieval
    await logUserActivity(req, user._id, "Session Retrieved Successfully");

    // Respond with user information and token
    return res.status(200).json({ successful: true, user, token: cookieToken });
  } catch (error) {
    // Respond with an error message
    return res.status(401).json({ successful: false, message: "Unauthorized" });
  }
}

// Validate Email Token and Create User
async function validateEmailToken(req, res) {
  const token = req.params.token?.replace(/^:/, ""); // Ensure token is extracted properly

  if (!token) {
    return res.status(400).json({ error: "Token is missing." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_EMAIL_CONFIRMATION_KEY);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token." });
    }

    // Fetch the temporary user
    const tempUser = await TemporalUser.findById(decoded.id);
    if (!tempUser) {
      return res.status(404).json({ error: "Temporary user not found." });
    }
    const hashedPassword = await bcrypt.hash(tempUser.password, 10);

    // Create a new user with data from `tempUser`
    const newUser = new User({
      name: tempUser.name,
      email: tempUser.email,
      mobile: tempUser.mobile,
      password: hashedPassword,
      roles: tempUser.roles,
      username: tempUser.username || tempUser.email.split("@")[0].toLowerCase(), // Generate username from email if not already set
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

  // Handle referral transaction
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
    const referUser = await User.findOne({ refId: referredBy }).populate(
      "wallet"
    );

    if (referUser && referUser.wallet) {
      const referUserWallet = await Wallet.findById(referUser.wallet);
      if (referUserWallet) {
        // Add referral bonus to the referUser wallet
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

    // Add bonus to the new user wallet
    wallet.bonus = encrypt("10");
    await wallet.save();

    // Update referral transaction
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
    return res.status(500).json({
      successful: false,
      message: "Something went wrong during validate Email Token",
    });
  }
}

// User login function
async function login(req, res) {
  try {
    // Check if the user is a temporal user (email not confirmed yet)
    let temporalUser = await TemporalUser.findOne({ email: req.body.email });
    if (temporalUser) {
      // Log activity for attempting to log in while the email is unconfirmed
      await logUserActivity(
        req,
        req.temporalUser._id,
        "Login Attempt Failed",
        "Please check your email to confirm."
      );

      return res.status(409).json({
        successful: true,
        message: "Please check your email to confirm.",
      });
    }

    // Check if the user exists in the main User collection
    const userFound = await User.findOne({ email: req.body.email })
      .populate("roles") // Populates the 'roles' field (Role model)
      .populate("wallet") // Populates the 'wallet' field (Wallet model)
      .populate("userLogs") // Populates the 'userLogs' field (UserLog model)
      .exec();

    if (!userFound) {
      // Log activity for not finding the user
      return res.status(400).json({ message: "User Not Found" });
    }

    // Check if the provided password matches the stored password
    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword) {
      // Log activity for invalid password attempt
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

    // Log successful login
    await logUserActivity(req, userFound._id, "Login Successful", null);
    // Set the user as logged in
    userFound.isLoggedIn = true;

    await userFound.save(); // Save the user's login status

    const twoDaysInSeconds = 86400 * 2; // 1 day in seconds

    // Generate a JWT token for the user's session
    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: twoDaysInSeconds, // Token expiration (2 days)
    });

    // Set the token as a cookie
    res.cookie(process.env.SESSION_TOKEN || "session-token", token, {
      maxAge: twoDaysInSeconds * 1000, // Cookie expiration in milliseconds (2 days)
      httpOnly: true, // Prevent client-side access
      secure: process.env.NODE_ENV === "production", // Send only over HTTPS in production
      sameSite: "Strict", // Protect against CSRF
    });

    // Respond with user information, roles, and token
    return res.status(200).json({
      token: token,
      roles: userFound.roles,
      user: userFound,
    });
  } catch (error) {
    // Respond with an error message
    console.log(error);
    return res.status(500).json({ message: error });
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

    // Decode the session token (JWT) to get the user ID
    const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not found in the session token.",
      });
    }

    // Find the user in the database
    const user = await User.findById(userId);

    if (user) {
      // Set the user as logged out in the database
      user.isLoggedIn = false;
      await user.save(); // Save the updated login status
    }

    // Log the successful logout (You can customize logUserActivity)
    await logUserActivity(req, userId, "Logout Successful", null);

    // Clear the session token cookie
    res.clearCookie(process.env.SESSION_TOKEN);

    // Respond with a success message
    return res.status(200).json({
      success: true,
      message: "User has logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error); // Log error for debugging
    // Respond with an error message
    return res.status(500).json({
      success: false,
      message: "An error occurred during logout.",
      error: error.message,
    });
  }
}

// Send a reset password email to the user
async function sendResetPasswordEmail(req, res) {
  try {
    const userFound = await User.findOne({ email: req.body.email });
    if (!userFound) {
      // Log activity for email not found
      return res.status(422).json({
        successful: false,
        message: "No account linked with that email",
      });
    }
    const id = userFound._id;
    // Generate a reset password token
    const token = jwt.sign(
      {
        id,
        expiration: Date.now() + 10 * 60 * 1000, // Token expiration time (10 minutes)
      },
      process.env.JWT_RESET_FORGOTTEN_PASSWORD_KEY
    );

    // Log token generation activity
    await logUserActivity(
      req,
      userFound._id,
      "Reset Password Token Generated",
      null
    );

    // Construct the reset password URL
    const url = `${
      process.env.HOST || "localhost:3000"
    }/authentication/resetPassword/${token}`;

    // Send the reset password email
    await sendResetPasswordEmailFunction(url, req.body.email);

    // Log email sent successfully
    await logUserActivity(
      req,
      userFound._id,
      "Reset Password Email Sent",
      null
    );

    // Respond with a success message
    return res.status(200).json({
      success: true,
      message: "Reset password email has been sent successfully",
    });
  } catch (err) {
    // Respond with an error message
    return res.status(500).json({
      successful: false,
      message: "Something went wrong, failed to send reset password email",
    });
  }
}

// Reset the user's password
async function resetPassword(req, res) {
  try {
    const { newPassword, confirmPassword } = req.body;
    const token = req.params.token;
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "No token provided" });
    }

    // Verify the token using the correct secret key
    const decoded = jwt.verify(
      token,
      process.env.JWT_RESET_FORGOTTEN_PASSWORD_KEY
    );

    // Check if the token is valid
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Check the token expiration
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

    const id = decoded.id;

    // Check if the user exists
    const userFound = await User.findById(id);

    if (!userFound) {
      await logUserActivity(req, id, "Password Reset Failed", "User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Check password match and length
    if (newPassword !== confirmPassword) {
      await logUserActivity(
        req,
        id,
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
        id,
        "Password Reset Failed",
        "Password length less than 5 characters"
      );
      return res
        .status(400)
        .json({ successful: false, message: "Passwords min length is 5" });
    }

    // Encrypt and update the user's password
    const encodedPassword = await User.encryptPassword(newPassword);
    userFound.password = encodedPassword;
    await userFound.save();

    // Log successful password reset
    await logUserActivity(req, id, "Password Reset Successful", null);

    // Respond with a success message
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    // Respond with an error message
    return res.status(500).json({
      successful: false,
      message: "Something went wrong, failed to update password",
    });
  }
}

module.exports = {
  signUp, //com
  login, //com

  sendConfirmationEmail, //panding
  validateEmailToken, //com

  sendResetPasswordEmail, //com
  resetPassword, //com

  getSession, //psnding
  logout, //com
};
