const db = require("../config/db");

const getDashboard = async (req, res) => {
  const userId = req.user.id;
  const { month } = req.query;

console.log("Selected month:", month);
  const today = new Date();
  const year = today.getFullYear();
  let firstDay;
let lastDay;

if (month === "all") {
  firstDay = `${year}-01-01`;
  lastDay = `${year}-12-31`;
} else {
  const selectedMonth = Number(month) + 1;

  firstDay = `${year}-${String(selectedMonth).padStart(2, "0")}-01`;

  lastDay = `${year}-${String(selectedMonth).padStart(2, "0")}-${new Date(
    year,
    selectedMonth,
    0
  ).getDate()}`;
}
  const [incomeResult] = await db.query(
`
SELECT COALESCE(SUM(amount),0) AS totalIncome
FROM income
WHERE user_id=?
AND income_date BETWEEN ? AND ?
`,
[userId, firstDay, lastDay]
);
const [expenseResult] = await db.query(
`
SELECT COALESCE(SUM(amount),0) AS totalExpense
FROM expense
WHERE user_id = ?
AND expense_date BETWEEN ? AND ?
`,
[userId, firstDay, lastDay]
);
const totalIncome = Number(incomeResult[0].totalIncome);
const totalExpense = Number(expenseResult[0].totalExpense);

const balance = totalIncome - totalExpense;
const [budgetResult] = await db.query(
`
SELECT monthly_budget
FROM users
WHERE id = ?
`,
[userId]
);

const monthlyBudget = Number(
    budgetResult[0].monthly_budget
);

const savings = monthlyBudget - totalExpense;
const [incomeCountResult] = await db.query(
`
SELECT COUNT(*) AS incomeCount
FROM income
WHERE user_id = ?
AND income_date BETWEEN ? AND ?
`,
[userId, firstDay, lastDay]
);
const [expenseCountResult] = await db.query(
`
SELECT COUNT(*) AS expenseCount
FROM expense
WHERE user_id = ?
AND expense_date BETWEEN ? AND ?
`,
[userId, firstDay, lastDay]
);
const transactionCount =
    Number(incomeCountResult[0].incomeCount) +
    Number(expenseCountResult[0].expenseCount);
const [recentTransactions] = await db.query(
`
SELECT
    income_date AS date,
    source AS title,
    amount,
    'Income' AS type
FROM income
WHERE user_id = ?
AND income_date BETWEEN ? AND ?

UNION ALL

SELECT
    expense_date AS date,
    category AS title,
    amount,
    'Expense' AS type
FROM expense
WHERE user_id = ?
AND expense_date BETWEEN ? AND ?

ORDER BY date DESC
LIMIT 5
`,
[
    userId,
    firstDay,
    lastDay,
    userId,
    firstDay,
    lastDay
]
);
const [expenseChart] = await db.query(
`
SELECT
    category,
    SUM(amount) AS total
FROM expense
WHERE user_id = ?
AND expense_date BETWEEN ? AND ?
GROUP BY category
`,
[userId, firstDay, lastDay]
);
return res.status(200).json({
    totalIncome: incomeResult[0].totalIncome,totalExpense: Number(expenseResult[0].totalExpense),balance,monthlyBudget,
    savings,monthlyBudget,transactionCount,recentTransactions,expenseChart
});


};
module.exports = { getDashboard };
