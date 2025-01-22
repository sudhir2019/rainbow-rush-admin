const Game = require("../models/game.model");
const { validationResult } = require("express-validator"); // To handle validation errors

// POST: Create a new game
const createGame = async (req, res) => {
  try {
    // 1. Validate incoming request data
    const errors = validationResult(req); // Check if there are validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 2. Extract data from request
    const { gameName, description, releaseDate, publisher, status, logo } =
      req.body;
    // Do not manually pass gameId; it's automatically generated in the pre-save hook
    const newGame = new Game({
      gameName,
      description,
      releaseDate,
      publisher,
      status: status || "active", // Default status is "active"
      logo:
        logo || "https://platopedia.com/docs/assets/images/logos/default.png", // Default logo if none provided
    });

    await newGame.save();

    // 5. Return success response
    return res.status(201).json({
      message: "Game created successfully",
      game: newGame,
    });
  } catch (error) {
    // 6. Handle unexpected errors and provide a detailed error message
    console.error("Error creating game:", error); // Log the error for internal tracking

    return res.status(500).json({
      message: "Error creating game",
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
      res.status(404).json({ message: "Game not found" });
    } else {
      res.status(200).json({ game });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching game", error: error.message });
  }
};

// PUT: Update a game by gameId
const updateGame = async (req, res) => {
  try {
    // 1. Validate incoming request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 2. Find and update the game by gameId
    const updatedGame = await Game.findOneAndUpdate(
      { gameId: req.params.gameId },
      req.body,
      { new: true, runValidators: true }
    );

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
    const deletedGame = await Game.findOneAndDelete({
      gameId: req.params.gameId,
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

module.exports = {
  createGame,
  getGameById,
  updateGame,
  deleteGame,
};
