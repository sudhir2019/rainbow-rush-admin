const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { verifyToken, isAdmin } = require("../middlewares/authJwt");
const {
  createCompanie,
  getAllCompanies,
  getCompanieById,
  updateCompanie,
  deleteCompanie,
  addGameToCompanie,
  removeGameFromCompanie,
} = require("../controllers/companie.controller");

// Validation middleware
const validateCompanie = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Company name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Company name must be between 2 and 100 characters"),
];

// Routes with authentication and validation
router.post(
  "/", 
  [
    verifyToken,
    isAdmin,
    ...validateCompanie
  ],
  createCompanie
);

// Get all companies (public route)
router.get("/", getAllCompanies);

// Get company by ID (public route)
router.get("/:id", getCompanieById);

// Update company
router.put(
  "/:id",
  [
    verifyToken,
    isAdmin,
    ...validateCompanie
  ],
  updateCompanie
);

// Delete company
router.delete(
  "/:id",
  [
    verifyToken,
    isAdmin
  ],
  deleteCompanie
);

// Game management routes
router.post(
  "/:companieId/games/:gameId",
  [
    verifyToken,
    isAdmin,
    check("companieId").isMongoId().withMessage("Invalid company ID"),
    check("gameId").isMongoId().withMessage("Invalid game ID")
  ],
  addGameToCompanie
);

router.delete(
  "/:companieId/games/:gameId",
  [
    verifyToken,
    isAdmin,
    check("companieId").isMongoId().withMessage("Invalid company ID"),
    check("gameId").isMongoId().withMessage("Invalid game ID")
  ],
  removeGameFromCompanie
);

module.exports = router;