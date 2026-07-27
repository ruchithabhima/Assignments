const express = require("express");
const router = express.Router();
const {
  getUsers,
  signup,
  login,
  getProfile,
  updateUser,
  deleteUser,changePassword
} = require("../controllers/userControllers");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/authorizeAdmin");
router.get("/users", authenticateToken, authorizeAdmin, getUsers);
router.patch("/users/:id", authenticateToken, authorizeAdmin, updateUser);
router.delete("/users/:id", authenticateToken, authorizeAdmin, deleteUser);
router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authenticateToken, authorizeAdmin, getProfile);
router.patch("/change-password", authenticateToken, changePassword);
module.exports = router;
