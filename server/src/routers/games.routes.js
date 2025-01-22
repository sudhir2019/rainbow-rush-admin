const express = require("express");
const gameController = require("../controllers/game.controller");
const gameValidation = require("../middlewares/gameValidation");

const router = express.Router();

// POST: Create a new game with validation
router.post("/", gameValidation, gameController.createGame);

// GET: Get a game by gameId
router.get("/:id", gameController.getGameById);

// PUT: Update a game by gameId
router.put("/:id", gameValidation, gameController.updateGame);

// DELETE: Delete a game by gameId
router.delete("/:id", gameController.deleteGame);

module.exports = router;
