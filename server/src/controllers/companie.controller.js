const Companie = require("../models/companie.model");
const Game = require("../models/game.model");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

// Create a new company
const createCompanie = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, games = [], note } = req.body;

    // Check if company already exists
    const existingCompanie = await Companie.findOne({ name });
    if (existingCompanie) {
      return res.status(409).json({
        success: false,
        message: "Company with this name already exists",
      });
    }

    // Validate game IDs if provided
    if (games.length > 0) {
      // Check if all game IDs are valid MongoDB ObjectIds
      const invalidGameIds = games.filter(
        (id) => !mongoose.Types.ObjectId.isValid(id)
      );
      if (invalidGameIds.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid game ID(s) provided",
          invalidIds: invalidGameIds,
        });
      }

      // Check if all games exist
      const existingGames = await Game.find({ _id: { $in: games } });
      if (existingGames.length !== games.length) {
        return res.status(404).json({
          success: false,
          message: "Some games not found",
          foundGames: existingGames.map((game) => game._id),
        });
      }
    }

    // Create new company with games
    const newCompanie = new Companie({
      name,
      games,
      note,
    });

    await newCompanie.save();

    // Populate games before sending response
    const populatedCompany = await Companie.findById(newCompanie._id).populate(
      "games"
    );

    return res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: populatedCompany,
    });
  } catch (error) {
    console.error("Error creating company:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating company",
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
    const id = req.params.id?.replace(/^:/, "");
    const { name } = req.body;

    // Check if company exists
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

    // Check if new name already exists (if name is being updated)
    if (name && name !== company.name) {
      const existingCompanie = await Companie.findOne({ name });
      if (existingCompanie) {
        return res.status(409).json({
          success: false,
          message: "Company with this name already exists",
        });
      }
    }

    // Update company
    const updatedCompany = await Companie.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    ).populate("games");

    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
      data: updatedCompany,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating company",
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
