const db = require("../config/db");
const getReport = async (req, res) => {
  const userId = req.user.id;
  const { from, to, page } = req.query;
  const limit = 5;
  const currentPage = Number(page) || 1;
  const offset = (currentPage - 1) * limit;
  const [incomeResult] = await db.query(
    `select COALESCE(sum(amount),0) as totalIncome
from income where user_id=? and income_date between ? and ?`,
    [userId, from, to],
  );
  const [expenseResult] = await db.query(
    `select coalesce(sum(amount),0) as totalExpense from expense
    where user_id=? and expense_date between? and ?`,
    [userId, from, to],
  );
  const totalIncome = Number(incomeResult[0].totalIncome);
  const totalExpense = Number(expenseResult[0].totalExpense);
  const balance = totalIncome - totalExpense;
  const [countRows] = await db.query(
    `
  SELECT COUNT(*) AS total
  FROM (
      SELECT id
      FROM income
      WHERE user_id = ? AND income_date BETWEEN ? AND ?

      UNION ALL

      SELECT id
      FROM expense
      WHERE user_id = ? AND expense_date BETWEEN ? AND ?
  ) AS transactions
  `,
    [userId, from, to, userId, from, to],
  );
  const totalRecords = countRows[0].total;
  const totalPages = Math.ceil(totalRecords / limit);
  const [transactionHistory] = await db.query(
    `select income_date as date,
    'income' as type,Null as category,amount from income where user_id=? and income_date between ? and ? union all select expense_date as
     date,'Expense' as type,category,amount from expense where user_id=? and expense_date between ? and ?  order by date desc limit ? offset ?`,
    [userId, from, to, userId, from, to, limit, offset],
  );
  /*console.log("userId:", userId);
console.log("from:", from);
console.log("to:", to);
console.log(expenseResult);*/
  return res.status(200).json({
    totalIncome,
    totalExpense,
    balance,
    transactionHistory,
    currentPage,
    totalPages,
    totalRecords
});
};
module.exports = { getReport };
