const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Function to generate a random gameId with only letters (no digits)
const generateGameId = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let gameId = "";
  for (let i = 0; i < 8; i++) {
    // Generate an 8-character string
    gameId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return gameId;
};

// Define the Game schema
const gameSchema = new Schema(
  {
    gameId: {
      type: String,
      unique: true, // Ensure gameId is unique
      match: /^[a-zA-Z]+$/, // gameId only contains letters (no digits)
    },
    gameName: {
      type: String,
      required: true,
      trim: true, // Remove leading and trailing spaces
    },
    logo: {
      type: String,
      default: "https://platopedia.com/docs/assets/images/logos/default.png",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "coming-soon", "archived"], // Possible status values
      default: "active", // Default status is "active"
    },
    description: {
      type: String,
      required: true, // Provide a brief description of the game
    },
    releaseDate: {
      type: Date, // Date when the game was or will be released
      required: true,
    },
    publisher: {
      type: String, // Name of the publisher (e.g., 'EA Games')
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    versionKey: false, // Disable versioning (__v field)
  }
);

// Pre-save hook to automatically generate gameId
gameSchema.pre("save", async function (next) {
  if (!this.gameId) {
    this.gameId = generateGameId(); // Auto-generate gameId if not provided
  }
  next();
});

// Create the Game model
const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
