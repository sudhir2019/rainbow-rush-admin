// Import required modules and middleware
const multer = require("multer");
const router = require("express").Router();

const {
  getAllWallets,
  getWalletByUserId,
  creditTransfer,
  creditAdjust,
} = require("../controllers/wallet.controller");

const { verifyToken, isAdmin } = require("../middlewares/authJwt");
const {
  checkDuplicatedEmail,
  checkRolesExisted,
} = require("../middlewares/verifySignUp");
const {
  checkIsValidUser,
  checkIsValidUpdate,
} = require("../middlewares/userValidator");

// Route to get wallet by userId
router.get("/", [verifyToken], getAllWallets);

// Route to get wallet by userId
router.get("/:userId", [verifyToken], getWalletByUserId);

// creditTransfer route
router.post("/creditTransfer", [verifyToken], creditTransfer);

// creditAdjust route
router.post("/creditAdjust", [verifyToken], creditAdjust);

module.exports = router;
