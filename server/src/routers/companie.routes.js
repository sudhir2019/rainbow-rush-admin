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
  toggleCompanieStatus,
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
router.post("/", [verifyToken, ...validateCompanie], createCompanie);

// Get all companies (public route)
router.get("/", getAllCompanies);

// Get company by ID (public route)
router.get("/:id", getCompanieById);

// Update company
router.put("/:id", [verifyToken, ...validateCompanie], updateCompanie);

// Delete company
router.delete("/:id", [verifyToken], deleteCompanie);

// Game management routes
router.post(
  "/:companieId/games/:gameId",
  [
    verifyToken,
    check("companieId").isMongoId().withMessage("Invalid company ID"),
    check("gameId").isMongoId().withMessage("Invalid game ID"),
  ],
  addGameToCompanie
);

router.delete(
  "/:companieId/games/:gameId",
  [
    verifyToken,
    check("companieId").isMongoId().withMessage("Invalid company ID"),
    check("gameId").isMongoId().withMessage("Invalid game ID"),
  ],
  removeGameFromCompanie
);
// PUT: Status toggle a game by gameId
router.put("/:companieId/:action", toggleCompanieStatus);

module.exports = router;
