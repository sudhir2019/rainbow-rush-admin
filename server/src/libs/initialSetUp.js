const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });
const { User } = require("../models/user.model");
const Wallet = require("../models/wallet.model");
const { Role } = require("../models/roles.model");

// Create Roles with Unique Enforcement
const createRoles = async () => {
  try {
    const roles = ["superdistributer", "distributer", "retailer", "admin", "user"];

    for (const roleName of roles) {
      const role = await Role.findOneAndUpdate(
        { name: roleName }, // Filter
        { name: roleName }, // Update
        { upsert: true, new: true, setDefaultsOnInsert: true } // Options
      );

      if (role.wasNew) {
        console.log(`Role created: ${roleName}`);
      } else {
        console.log(`Role already exists: ${roleName}`);
      }
    }
  } catch (err) {
    console.error("Error creating roles:", err.message);
  }
};

// Create a User if it doesn't exist
const createUserIfNotExists = async (userData) => {
  try {
    const user = await User.findOne({ username: userData.username });

    if (user) {
      console.log(`User ${userData.username} already exists.`);
      return;
    }

    // Find role
    const role = await Role.findOne({ name: userData.roles });
    if (!role) {
      console.error(`Role ${userData.roles} not found`);
      return;
    }

    // Create new user
    const newUser = new User({
      username: userData.username,
      password: await User.encryptPassword(userData.password),
      roles: [role._id],
      userStatus: true,
      note: "System generated user",
      Commission: 0,
    });

    // Create wallet for the user
    const wallet = await Wallet.create({
      userId: newUser._id,
    });

    // Link wallet to user
    newUser.wallet = [wallet._id];
    await newUser.save();

    console.log(`User ${newUser.username} created with role: ${userData.roles}`);
  } catch (err) {
    console.error(`Error creating user ${userData.username}:`, err.message);
  }
};

// Create Individual Users
const createSuperDistributer = async () => {
  try {
    const superDistributerData = {
      username: "superdistributer",
      roles: "superdistributer",
      password: "superdistributer123",
    };

    await createUserIfNotExists(superDistributerData);
  } catch (err) {
    console.error("Error creating superdistributer user:", err);
  }
};

const createDistributer = async () => {
  try {
    const distributerData = {
      username: "distributer",
      roles: "distributer",
      password: "distributer123",
    };

    await createUserIfNotExists(distributerData);
  } catch (err) {
    console.error("Error creating distributer user:", err);
  }
};

const createRetailer = async () => {
  try {
    const retailerData = {
      username: "retailer",
      roles: "retailer",
      password: "retailer123",
    };

    await createUserIfNotExists(retailerData);
  } catch (err) {
    console.error("Error creating retailer user:", err);
  }
};

const createAdmin = async () => {
  try {
    const adminData = {
      username: "admin",
      roles: "admin",
      password: "admin123",
    };

    await createUserIfNotExists(adminData);
  } catch (err) {
    console.error("Error creating admin user:", err);
  }
};

const createUser = async () => {
  try {
    const userData = {
      username: "user",
      roles: "user",
      password: "user123",
    };
    await createUserIfNotExists(userData);
  } catch (err) {
    console.error("Error creating user:", err);
  }
};

// Create All Users and Roles
const createAllUsers = async () => {
  try {
    console.log("Starting roles creation...");
    await createRoles();
    console.log("Roles created. Starting user creation...");

    await createSuperDistributer();
    await createDistributer();
    await createRetailer();
    await createAdmin();
    await createUser();

    console.log("All users and roles setup completed successfully.");
  } catch (err) {
    console.error("Error during setup:", err);
  }
};

module.exports = {
  createRoles,
  createAllUsers,
};
