const Companie = require("../models/companie.model");
const Game = require("../models/game.model");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const { SuperAdmin } = require("../models/superAdmin.model");
const { User } = require("../models/user.model");
const { Role } = require("../models/roles.model");
const Wallet = require("../models/wallet.model");
const ReferTransaction = require("../models/referTransaction.model");

// Create a new company

const createCompanie = async (req, res) => {
  try {
    const {
      name,
      username,
      password,
      refId,
      commissionAmount,
      games = [],
      note,
    } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "Company name, username, and password are required.",
      });
    }

    // Set role to only "admin"
    const userRoles = ["admin"];

    // Check for existing company
    const existingCompanie = await Companie.findOne({ name });
    if (existingCompanie) {
      return res.status(409).json({
        success: false,
        message: "Company with this name already exists.",
      });
    }

    // Validate "admin" role
    const adminRole = await Role.findOne({ name: "admin" });
    if (!adminRole) {
      return res.status(400).json({
        success: false,
        message: "Admin role not found in the system.",
      });
    }
    const roleIds = [adminRole._id];

    // Validate games
    if (games.length > 0) {
      const invalidGameIds = games.filter(
        (id) => !mongoose.Types.ObjectId.isValid(id)
      );
      if (invalidGameIds.length) {
        return res.status(400).json({
          success: false,
          message: "Invalid game ID(s) provided.",
          invalidIds: invalidGameIds,
        });
      }

      const existingGames = await Game.find({ _id: { $in: games } });
      if (existingGames.length !== games.length) {
        return res.status(404).json({
          success: false,
          message: "Some games not found.",
          foundGames: existingGames.map((game) => game._id),
        });
      }
    }

    // Encrypt the password
    const hashedPassword = await User.encryptPassword(password);
    if (!hashedPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid password.",
      });
    }

    let referrer = null;
    if (refId) {
      const referrerQuery = { refId, isDeleted: { $ne: true } };
      referrer = await SuperAdmin.findOne(referrerQuery);
      if (!referrer) {
        return res.status(404).json({
          success: false,
          message:
            "SuperAdmin referrer not found. Please check the referral ID.",
        });
      }
    }

    // Create new company
    const newCompanie = new Companie({ name, games, note });
    await newCompanie.save();

    // Create new admin user for the company
    const newAdmin = new User({
      username,
      password: hashedPassword,
      roles: roleIds,
      referredBy: refId,
      Commission: commissionAmount,
      companie: newCompanie._id,
    });

    const savedAdmin = await newAdmin.save();

    // Create wallet for admin
    const wallet = await Wallet.create({ userId: savedAdmin._id });
    savedAdmin.wallet = wallet._id;
    await savedAdmin.save();

    // Assign admin to company
    newCompanie.admin.push(savedAdmin._id);
    await newCompanie.save();

    // Handle referral logic
    if (refId) {
      const referralTransaction = await ReferTransaction.create({
        referredUser: savedAdmin._id,
        referredBy: referrer._id,
        refUserType: userRoles,
        commissionAmount,
        status: "paid",
      });

      referrer.referralTransaction.push(referralTransaction._id);
      referrer.users.push(savedAdmin._id);
      await referrer.save();

      savedAdmin.referralTransaction.push(referralTransaction._id);
      await savedAdmin.save();
    }

    // Populate games before sending response
    const populatedCompany = await Companie.findById(newCompanie._id).populate(
      "games"
    );

    const companies = await Companie.find();
    return res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: populatedCompany,
      dataCompanies: companies,
      dataUser: {
        id: savedAdmin._id,
        username: savedAdmin.username,
        roles: ["admin"],
        company: newCompanie.name,
      },
    });
  } catch (error) {
    console.error("Error creating company:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, failed to create company.",
      error: error.message,
    });
  }
};

// Get all companies with pagination and filters
const getAllCompanies = async (req, res) => {
  try {
    const {
      search,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build query
    let query = { isDeleted: { $ne: true } };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { uniqueId: { $regex: search, $options: "i" } },
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Calculate skip for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get total count
    const totalCount = await Companie.countDocuments(query);

    // Get companies
    const companies = await Companie.find(query)
      .populate("games")
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    if (companies.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No companies found",
      });
    }

    return res.status(200).json({
      success: true,
      data: companies,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / parseInt(limit)),
        totalCompanies: totalCount,
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching companies",
      error: error.message,
    });
  }
};

// Get company by ID
const getCompanieById = async (req, res) => {
  try {
    const id = req.params.id?.replace(/^:/, "");

    const company = await Companie.findOne({
      _id: id,
      isDeleted: { $ne: true },
    }).populate("games");

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.error("Error fetching company:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching company",
      error: error.message,
    });
  }
};

// Update company
const updateCompanie = async (req, res) => {
  try {
    const companyId = req.params.id?.replace(/^:/, "");
    const { name, games = [], note } = req.body;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID.",
      });
    }

    // Check if name is provided
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Company name is required.",
      });
    }

    // Check if company exists
    const company = await Companie.findOne({
      _id: companyId,
      isDeleted: { $ne: true },
    });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    // Check for duplicate name if name is being updated
    if (name !== company.name) {
      const existingCompany = await Companie.findOne({ name });
      if (existingCompany) {
        return res.status(409).json({
          success: false,
          message: "A company with this name already exists.",
        });
      }
    }

    // Validate game IDs
    if (games.length > 0) {
      const invalidGameIds = games.filter(
        (id) => !mongoose.Types.ObjectId.isValid(id)
      );
      if (invalidGameIds.length) {
        return res.status(400).json({
          success: false,
          message: "Invalid game ID(s) provided.",
          invalidIds: invalidGameIds,
        });
      }

      // Check if all games exist
      const existingGames = await Game.find({ _id: { $in: games } });
      if (existingGames.length !== games.length) {
        return res.status(404).json({
          success: false,
          message: "Some games not found.",
          foundGames: existingGames.map((game) => game._id),
        });
      }
    }

    // Update company
    const updatedCompany = await Companie.findByIdAndUpdate(
      companyId,
      { name, games, note },
      { new: true }
    ).populate("games");
    const companies = await Companie.find();
    return res.status(200).json({
      success: true,
      message: "Company updated successfully.",
      data: updatedCompany,
      companies: companies,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the company.",
      error: error.message,
    });
  }
};

// Delete company (soft delete)
const deleteCompanie = async (req, res) => {
  try {
    const id = req.params.id?.replace(/^:/, "");

    const company = await Companie.findOne({
      _id: id,
      isDeleted: { $ne: true },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Perform soft delete
    await company.softDelete();
    // Fetch updated games list with pagination and sorting
    const Compan = await Companie.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .exec();
    return res.status(200).json({
      success: true,
      message: "Company deleted successfully",
      data: Compan,
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting company",
      error: error.message,
    });
  }
};

// Add game to company
const addGameToCompanie = async (req, res) => {
  try {
    const companieId = req.params.companieId?.replace(/^:/, "");
    const gameId = req.params.gameId?.replace(/^:/, "");

    const company = await Companie.findOne({
      _id: companieId,
      isDeleted: { $ne: true },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Check if game already exists in company
    if (company.games.includes(gameId)) {
      return res.status(409).json({
        success: false,
        message: "Game already exists in company",
      });
    }

    // Add game to company
    company.games.push(gameId);
    await company.save();

    const updatedCompany = await Companie.findById(companieId).populate(
      "games"
    );

    return res.status(200).json({
      success: true,
      message: "Game added to company successfully",
      data: updatedCompany,
    });
  } catch (error) {
    console.error("Error adding game to company:", error);
    return res.status(500).json({
      success: false,
      message: "Error adding game to company",
      error: error.message,
    });
  }
};

// Remove game from company
const removeGameFromCompanie = async (req, res) => {
  try {
    const companieId = req.params.companieId?.replace(/^:/, "");
    const gameId = req.params.gameId?.replace(/^:/, "");

    const company = await Companie.findOne({
      _id: companieId,
      isDeleted: { $ne: true },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Remove game from company
    company.games = company.games.filter((game) => game.toString() !== gameId);
    await company.save();

    const updatedCompany = await Companie.findById(companieId).populate(
      "games"
    );

    return res.status(200).json({
      success: true,
      message: "Game removed from company successfully",
      data: updatedCompany,
    });
  } catch (error) {
    console.error("Error removing game from company:", error);
    return res.status(500).json({
      success: false,
      message: "Error removing game from company",
      error: error.message,
    });
  }
};
// Toggle company status (active/inactive)
const toggleCompanieStatus = async (req, res) => {
  const companiId = req.params.companieId?.replace(/^:/, "");
  const action = req.params.action;

  try {
    const Compani = await Companie.findOne({ _id: companiId });
    if (!Compani) {
      return res.status(404).json({
        success: false,
        message: "Companie not found",
      });
    }

    // Validate and update status
    if (action === "activate") {
      if (Compani.status === "active") {
        return res.status(400).json({
          success: false,
          message: "Companie is already active",
        });
      }
      Compani.status = "active";
    } else if (action === "deactivate") {
      if (Compani.status === "inactive") {
        return res.status(400).json({
          success: false,
          message: "Companie is already inactive",
        });
      }
      Compani.status = "inactive";
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid action. Use 'activate' or 'deactivate'.",
      });
    }

    await Compani.save();

    // Fetch updated games list with pagination and sorting
    const Compan = await Companie.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).json({
      success: true,
      message: `Companie ${action}d successfully`,
      data: Compan,
    });
  } catch (error) {
    console.error(`Error occurred during Companie ${action}:`, error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
module.exports = {
  createCompanie,
  getAllCompanies,
  getCompanieById,
  updateCompanie,
  deleteCompanie,
  addGameToCompanie,
  removeGameFromCompanie,
  toggleCompanieStatus,
};
