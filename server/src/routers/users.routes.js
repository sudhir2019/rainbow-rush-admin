// Import required modules and middleware
const multer = require("multer");
const router = require("express").Router();

const {
  getUsersByCompanieId,
  getAllUsers,
  getUserById,
  createUser,
  updateUserRoleById,
  updateProfileById,
  updateUserByIdDashboard,
  deleteUserById,
  toggleUserStatus,
} = require("../controllers/users.controller");

const { verifyToken } = require("../middlewares/authJwt");
const {
  checkDuplicatedEmail,
  checkRolesExisted,
} = require("../middlewares/verifySignUp");
const { checkIsValidUser } = require("../middlewares/userValidator");

// Multer configuration for handling file uploads
const storageProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/storage/upload/image/profilePicture");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter for allowing only images
const fileFilter = (req, file, cb) => {
  if (!file) {
    cb(null, false);
  } else {
    // Check for image files only
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  }
};

// Set up multer upload middleware
const uploadProduct = multer({
  storage: storageProduct,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max size
  fileFilter: fileFilter,
});

// Define routes
router.get("/companie/:companieId", [verifyToken], getUsersByCompanieId);

router.get("/", [verifyToken], getAllUsers);

router.get("/:id", [verifyToken], getUserById);

router.put(
  "/me",
  [verifyToken, uploadProduct.single("img")],
  updateProfileById
);
router.put("/admin/:id", [verifyToken], updateUserByIdDashboard);

router.put("/role/:id", [verifyToken, checkRolesExisted], updateUserRoleById);

router.post(
  "/",
  [verifyToken, checkDuplicatedEmail, checkRolesExisted, checkIsValidUser],
  createUser
);

router.delete("/:id", [verifyToken], deleteUserById);

router.put("/:id/:action", [verifyToken], toggleUserStatus);

module.exports = router;
