const Game = require("../models/game.model");
const { validationResult } = require("express-validator"); // To handle validation errors

// GET: Get all games with filtering, pagination and search
const getAllGames = async (req, res) => {
  try {
    const {
      search,
      page = 1,
      limit = 10,
      status,
      publisher,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build query object
    let query = {};

    // Add search functionality
    if (search) {
      query.$or = [
        { gameName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { publisher: { $regex: search, $options: "i" } },
      ];
    }

    // Add status filter
    if (status) {
      query.status = status;
    }

    // Add publisher filter
    if (publisher) {
      query.publisher = publisher;
    }

    // Calculate skip value for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Get total count for pagination
    const totalCount = await Game.countDocuments(query);

    // Get games with pagination and sorting
    const games = await Game.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    // If no games found
    if (games.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No games found for the given criteria.",
      });
    }

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Return success response
    return res.status(200).json({
      success: true,
      data: games,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalGames: totalCount,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit),
      },
      filters: {
        search: search || null,
        status: status || null,
        publisher: publisher || null,
      },
      sorting: {
        sortBy,
        sortOrder,
      },
    });
  } catch (error) {
    console.error("Error fetching games:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching games",
      error: error.message,
    });
  }
};

// GET: Get a game by gameId
const getGameById = async (req, res) => {
  try {
    const id = req.params.id?.replace(/^:/, "");
    const game = await Game.findById(id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: game,
    });
  } catch (error) {
    console.error("Error fetching game:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching game",
      error: error.message,
    });
  }
};

// POST: Create a new game
const createGame = async (req, res) => {
  try {
    // Validate incoming request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // Extract data from request
    const {nodigit, gameName, description, releaseDate, publisher, status, logo } =
      req.body;

    // Create new game instance
    const newGame = new Game({
      nodigit,
      gameName,
      description,
      releaseDate,
      publisher,
      status: status || "active",
      logo:
        logo || "https://platopedia.com/docs/assets/images/logos/default.png",
    });

    // Save the game
    await newGame.save();
   // get all game
   const games = await Game.find({});

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Game created successfully",
      data: games,
    });
  } catch (error) {
    console.error("Error creating game:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating game",
      error: error.message,
    });
  }
};

// PUT: Update a game by gameId
const updateGame = async (req, res) => {
  try {
    const id = req.params.id?.replace(/^:/, "");
    // 1. Validate incoming request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 2. Find and update the game by gameId
    const updatedGame = await Game.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    // 3. If game not found, return 404
    if (!updatedGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    // 4. Return the updated game data
    return res.status(200).json({
      message: "Game updated successfully",
      game: updatedGame,
    });
  } catch (error) {
    // 5. Handle errors during update
    console.error("Error updating game:", error);
    return res.status(500).json({
      message: "Error updating game",
      error: error.message,
    });
  }
};

// DELETE: Delete a game by gameId
const deleteGame = async (req, res) => {
  try {
    // 1. Find and delete the game by gameId
    const id = req.params.id?.replace(/^:/, "");
    const deletedGame = await Game.findOneAndDelete({
      _id: id,
    });

    // 2. If game not found, return 404
    if (!deletedGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    // 3. Return success message
    return res.status(200).json({
      message: "Game deleted successfully",
      game: deletedGame,
    });
  } catch (error) {
    // 4. Handle errors during deletion
    console.error("Error deleting game:", error);
    return res.status(500).json({
      message: "Error deleting game",
      error: error.message,
    });
  }
};

// Toggle game status (active/inactive)
const toggleGameStatus = async (req, res) => {
  const gameId = req.params.id?.replace(/^:/, "");
  const action = req.params.action;

  try {
    const game = await Game.findOne({ _id: gameId});
    if (!game) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }

    // Validate and update status
    if (action === "activate") {
      if (game.status === "active") {
        return res.status(400).json({
          success: false,
          message: "Game is already active",
        });
      }
      game.status = "active";
    } else if (action === "deactivate") {
      if (game.status === "inactive") {
        return res.status(400).json({
          success: false,
          message: "Game is already inactive",
        });
      }
      game.status = "inactive";
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid action. Use 'activate' or 'deactivate'.",
      });
    }

    await game.save();

    // Fetch updated games list with pagination and sorting
    const games = await Game.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).json({
      success: true,
      message: `Game ${action}d successfully`,
      data: games,
    });
  } catch (error) {
    console.error(`Error occurred during game ${action}:`, error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  toggleGameStatus
};
