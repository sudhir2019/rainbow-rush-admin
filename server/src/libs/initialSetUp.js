const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });
const { User } = require("../models/user.model");
const Wallet = require("../models/wallet.model");
const { Role } = require("../models/roles.model");
const { SuperAdmin } = require("../models/superAdmin.model");
const Companie = require("../models/companie.model");
const Game = require("../models/game.model");

// Helper function to create roles
const createRoles = async () => {
  const roles = [
    "superdistributer",
    "distributer",
    "retailer",
    "superadmin",
    "admin",
    "user",
  ];

  // Fetch existing roles once to reduce DB queries
  const existingRoles = await Role.find({ name: { $in: roles } }).lean();
  const existingRoleNames = existingRoles.map((role) => role.name);

  for (const roleName of roles) {
    if (!existingRoleNames.includes(roleName)) {
      try {
        await Role.create({ name: roleName });
        console.log(`Role '${roleName}' created.`);
      } catch (err) {
        console.error(`Error creating role '${roleName}':`, err.message);
      }
    } else {
      console.log(`Role '${roleName}' already exists.`);
    }
  }
};

// Function to create a Game
const createGame = async () => {
  try {
    const existingGame = await Game.findOne({ gameName: "SuperGame 1" });

    if (existingGame) {
      console.log("Game already exists.");
      return existingGame;
    }

    const game = new Game({
      gameName: "SuperGame 1",
      nodigit: 10,
      description: "Description for SuperGame 1",
      releaseDate: new Date(),
      publisher: "superadmin",
    });

    await game.save();
    console.log("Game created successfully.");
    return game;
  } catch (err) {
    console.error("Error creating Game:", err.message);
  }
};

const createSuperAdmin = async () => {
  try {
    // Check if SuperAdmin already exists
    const existingSuperAdmin = await SuperAdmin.findOne({
      username: "superadmin",
    }).lean();
    if (existingSuperAdmin) {
      console.log("SuperAdmin already exists.");
      return existingSuperAdmin;
    }

    // Find the 'superadmin' role
    const role = await Role.findOne({ name: "superadmin" }).lean();
    if (!role) throw new Error("Role 'superadmin' not found");

    // Create new SuperAdmin
    const superAdmin = new SuperAdmin({
      username: "superadmin",
      password: await SuperAdmin.encryptPassword("superadmin123"),
      roles: [role._id],
      userStatus: true,
      note: "System generated SuperAdmin",
      Commission: 0,
    });

    // Create wallet and link it to SuperAdmin
    const wallet = await Wallet.create({ userId: superAdmin._id });
    superAdmin.wallet = [wallet._id];

    await superAdmin.save();
    console.log("SuperAdmin created successfully");
    return superAdmin;
  } catch (err) {
    console.error("Error creating SuperAdmin:", err.message);
  }
};

// Function to create a Company and associate it with SuperAdmin
const createCompany = async (superAdmin, game) => {
  try {
    // Ensure superAdmin is a Mongoose document
    superAdmin = await SuperAdmin.findById(superAdmin._id);
    if (!superAdmin) {
      throw new Error("SuperAdmin not found");
    }

    // Check if a company already exists for this SuperAdmin
    let companie = await Companie.findOne({ superAdmin: superAdmin._id });

    if (companie) {
      console.log(`Company already exists: ${companie.name}`);
      return companie;
    }

    // Check if a company with the same name already exists
    const existingCompany = await Companie.findOne({
      name: "SuperAdmin's Company",
    });
    if (existingCompany) {
      console.log(
        `A company with the name "SuperAdmin's Company" already exists.`
      );
      return existingCompany;
    }

    // Prepare the company data
    const companyData = {
      name: "SuperAdmin's Company",
      superAdmin: superAdmin._id,
      note: "System generated company",
      games: [game._id],
      createdBy: superAdmin._id, // Ensure SuperAdmin is also referenced
    };

    // Create new company if not found
    companie = new Companie(companyData);
    await companie.save();

    // Update SuperAdmin model to associate the new company
    superAdmin.companies = companie._id;
    await superAdmin.save();

    console.log(`Company created and game added: ${companie.name}`);
    return companie;
  } catch (err) {
    console.log(err);
    console.error("Error creating company:", err.message);
  }
};


const createAdmin = async (superAdmin, companie) => {
  try {
    if (!companie) throw new Error("Company not found. Cannot create Admin.");

    const existingAdmin = await User.findOne({
      username: "admin",
      companie: companie._id, // Ensure correct reference
    }).lean();

    if (existingAdmin) {
      console.log("Admin already exists for this company.");
      return existingAdmin;
    }
    const existingAdmins = await User.findOne({
      username: "admin",
    });
    if (existingAdmins) {
      console.log(`A admin with the name "admin" already exists.`);
      return existingAdmins;
    }
    const role = await Role.findOne({ name: "admin" });
    if (!role) throw new Error("Role 'admin' not found");

    const admin = new User({
      username: "admin",
      password: await User.encryptPassword("admin123"),
      roles: [role._id],
      userStatus: true,
      note: "System generated admin",
      Commission: 0,
      companie: [companie._id],
    });

    // Check if admin already has a wallet
    let wallet = await Wallet.findOne({ userId: admin._id });
    if (!wallet) {
      wallet = await Wallet.create({ userId: admin._id });
    }

    admin.wallet = [wallet._id];
    await admin.save();

    if (!companie.admin.includes(admin._id)) {
      companie.admin.push(admin._id);
      await companie.save();
    }

    console.log("Admin created and added to company.");
    return admin;
  } catch (err) {
    console.error("Error creating Admin:", err.message);
  }
};

const createRolesForCompany = async (companie) => {
  try {
    if (!companie) throw new Error("Company not found. Cannot create roles.");

    const roleNames = ["superdistributer", "distributer", "retailer", "user"];

    for (const roleName of roleNames) {
      const role = await Role.findOne({ name: roleName });
      if (!role) throw new Error(`Role '${roleName}' not found`);

      const existingUser = await User.findOne({
        username: roleName,
      }).lean();

      if (existingUser) {
        console.log(`${roleName} already exists for this company.`);
        continue;
      }

      const newUser = new User({
        username: roleName,
        password: await User.encryptPassword(`${roleName}123`),
        roles: [role._id],
        userStatus: true,
        note: `System generated ${roleName}`,
        Commission: 0,
        companie: companie._id,
      });

      let wallet = await Wallet.findOne({ userId: newUser._id });
      if (!wallet) {
        wallet = await Wallet.create({ userId: newUser._id });
      }

      newUser.wallet = [wallet._id];
      await newUser.save();

      if (!Array.isArray(companie[roleName])) {
        companie[roleName] = [];
      }

      if (!companie[roleName].includes(newUser._id)) {
        companie[roleName].push(newUser._id);
        await companie.save();
      }

      console.log(`${roleName} created and added to company.`);
    }

    console.log("Roles setup completed.");
  } catch (err) {
    console.error("Error creating roles for company:", err.message);
  }
};

// Full system setup function
const setupSystem = async () => {
  try {
    console.log("Starting system setup...");

    await createRoles();
    console.log("Roles created successfully.");

    const game = await createGame();
    const superAdmin = await createSuperAdmin();

    if (!superAdmin || !game) {
      throw new Error("SuperAdmin or Game creation failed. Aborting setup.");
    }

    const companie = await createCompany(superAdmin, game);
    if (!companie) throw new Error("Company creation failed. Aborting setup.");

    const admin = await createAdmin(superAdmin, companie);
    if (!admin) throw new Error("Admin creation failed. Aborting setup.");

    await createRolesForCompany(companie);

    console.log("System setup completed.");
  } catch (err) {
    console.error("Error during system setup:", err.message);
  }
};

module.exports = { setupSystem };
