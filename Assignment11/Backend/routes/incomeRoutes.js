const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const {
  addIncome,
  getIncome,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomeController");
router.post("/", authenticateToken, addIncome);
router.get("/", authenticateToken, getIncome);
router.patch("/:id", authenticateToken, updateIncome);

router.delete("/:id", authenticateToken, deleteIncome);
console.log({
  authenticateToken,
  addIncome,
  getIncome,
  updateIncome,
  deleteIncome,
});
module.exports = router;
