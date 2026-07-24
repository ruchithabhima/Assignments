const express = require("express");

const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {
    addExpense,
    getExpense,updateExpense,deleteExpense
} = require("../controllers/expenseController");

router.post("/", authenticateToken, addExpense);

router.get("/", authenticateToken, getExpense);
router.patch("/:id",authenticateToken,updateExpense);
router.delete("/:id",authenticateToken,deleteExpense);

module.exports = router;