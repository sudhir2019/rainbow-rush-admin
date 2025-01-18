const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });
const { User } = require("../models/user.model");
const Wallet = require("../models/wallet.model");
const { Role } = require("../models/roles.model");

const createRoles = async () => {
  try {
    const existingRoles = await Role.find().select("name").lean();
    const existingRoleNames = existingRoles.map((role) => role.name);

    const rolesToCreate = [
      "superdistributer",
      "distributer",
      "retailer",
      "admin",
      "user",
    ]
      .filter((roleName) => !existingRoleNames.includes(roleName)) // Only add roles that don't exist
      .map((name) => ({ name }));

    if (rolesToCreate.length > 0) {
      await Role.insertMany(rolesToCreate);
      console.log(
        "Roles created:",
        rolesToCreate.map((role) => role.name)
      );
    } else {
      console.log("All roles already exist. No roles created.");
    }
  } catch (err) {
    console.error("Error creating roles:", err);
  }
};

const createUserIfNotExists = async (userData) => {
  try {
    const user = await User.findOne({ email: userData.email });

    if (user) {
      // User already exists, skipping creation.
      return; // Exit if the user already exists
    }

    // If email exists but username is not set, generate the username
    if (userData.email && !userData.username) {
      const emailLocalPart = userData.email.split("@")[0];
      userData.username = emailLocalPart.toLowerCase(); // Convert to lowercase for consistency
    }

    // Find roles or create if they don't exist
    let roles = await Role.find({ name: userData.roles });
    if (roles.length === 0) {
      const newRole = await Role.create({ name: userData.roles });
      roles = [newRole]; // Add the newly created role
      // console.log(`Role ${userData.roles} created.`);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Generate email confirmation token
    const token = jwt.sign(
      { id: userData.email },
      process.env.JWT_EMAIL_CONFIRMATION_KEY
    );

    // Create the user instance
    const newUser = new User({
      ...userData,
      password: hashedPassword,
      emailToken: token,
      roles: roles.map((role) => role.id),
    });
    const wallet = await Wallet.create({
      userId: newUser._id,
    });

    // Save the new user to the database
    newUser.wallet = wallet._id;
    await newUser.save();

    // console.log(`User ${newUser.name} created with role(s): ${userData.roles}`);
  } catch (err) {
    console.error(`Error creating user ${userData.name}:`, err.message);
  }
};

const createSuperDistributer = async () => {
  try {
    const superDistributerData = {
      name: "superdistributer",
      email: "superdistributer@localhost.com",
      roles: "superdistributer",
      mobile: "1945514230",
      password: "superdistributer123", // Change this to a secure password.
    };

    await createUserIfNotExists(superDistributerData);
  } catch (err) {
    console.error("Error creating superdistributer user:", err);
  }
};
const createDistributer = async () => {
  try {
    const distributerData = {
      name: "distributer",
      email: "distributer@localhost.com",
      roles: "distributer",
      mobile: "1945514231",
      password: "distributer123", // Change this to a secure password.
    };

    await createUserIfNotExists(distributerData);
  } catch (err) {
    console.error("Error creating distributer user:", err);
  }
};
const createRetailer = async () => {
  try {
    const RetailerData = {
      name: "retailer",
      email: "retailer@localhost.com",
      roles: "retailer",
      mobile: "1945514232",
      password: "retailer123", // Change this to a secure password.
    };

    await createUserIfNotExists(RetailerData);
  } catch (err) {
    console.error("Error creating retailer user:", err);
  }
};
const createAdmin = async () => {
  try {
    const adminData = {
      name: "admin",
      email: "admin@localhost.com",
      roles: "admin",
      mobile: "1945514233",
      password: "admin123", // Change this to a secure password.
    };

    await createUserIfNotExists(adminData);
  } catch (err) {
    console.error("Error creating admin user:", err);
  }
};

const createUser = async () => {
  try {
    const userData = {
      name: "user",
      email: "user@localhost.com",
      roles: "user",
      mobile: "1945514234",
      password: "user123", // Change this to a secure password.
    };
    await createUserIfNotExists(userData);
  } catch (err) {
    console.error("Error creating user:", err);
  }
};

// Create all users
const createAllUsers = async () => {
  await createSuperDistributer();
  await createDistributer();
  await createRetailer();
  await createAdmin();
  await createUser();
};
module.exports = {
  createRoles,
  createAllUsers,
};
