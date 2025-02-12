const express = require("express");
const app = express();

const cors = require("cors");

const path = require("path");

const morgan = require("morgan");

const cookieParser = require("cookie-parser");

require("dotenv").config({ path: ".env" });

// Importing and using various routes
const authRouter = require("./routers/auth.routes.js");
const usersRouter = require("./routers/users.routes.js");
const walletRouter = require("./routers/wallet.routes.js");
const gameRouter = require("./routers/games.routes.js");
const companieRoutes = require("./routers/companie.routes");

// Middleware for parsing URL-encoded and JSON request bodies
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());

// Enable CORS for all origins in development mode
// Configure CORS middleware to allow access from all origins
const isDevelopment = process.env.NODE_ENV === "development";

// Define allowed origins
// const allowedOrigins = isDevelopment
//   ? [process.env.ACCESS_CONTROL_ALLOW_ORIGIN || "http://localhost:5173"]
//   : ["http://localhost:8080"]; // Replace with your production domain

// Configure CORS middleware
// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   exposedHeaders: ["Cookie", "Authorization"],
//   credentials: true,
// };
// Configure CORS middleware
const corsOptions = {
  origin: "http://82.118.230.97",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Cookie", "Authorization"],
  credentials: true, // Allow credentials (cookies, Authorization headers, etc.)
};



app.use("*", cors(corsOptions));
// HTTP request logger middleware (Morgan) with "tiny" format
app.use(morgan("tiny"));

// Serve static files from the "media" directory
app.use("/media", express.static(path.join(__dirname, "storage", "upload")));

// Serve frontend build in production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client", "build", "index.html"));
  });
} else {
  // Serve frontend in development mode
  app.use(express.static(path.join(__dirname, "/client")));
}

// Define routes with tags
app.use("/api/auth", authRouter);

app.use("/api/users", usersRouter);

app.use("/api/wallet", walletRouter);

app.use("/api/game", gameRouter);

app.use("/api/companies", companieRoutes);

module.exports = app;
