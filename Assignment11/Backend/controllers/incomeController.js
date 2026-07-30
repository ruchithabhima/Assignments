const db = require("../config/db");
const addIncome = async (req, res) => {
  try {
    const { amount, source, income_date, remarks } = req.body;
    if (!amount || !source || !income_date) {
      return res.status(400).json({ message: "All Feilds are required" });
    }
    const userId = req.user.id;
    const query = `insert into income(user_id,amount,source,income_date,remarks) values(?,?,?,?,?)`;
    await db.query(query, [userId, amount, source, income_date, remarks]);
    return res.status(201).json({ message: "Income added Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const { search, fromDate, toDate, sort, page } = req.query;
    const currentPage = Number(page) || 1;
    const limit = 5;
    const offset = (currentPage - 1) * limit;
    let countQuery = `SELECT COUNT(*) AS total FROM income WHERE user_id = ?`;

    let countValues = [userId];
    if (search) {
      countQuery += " AND source LIKE ?";
      countValues.push(`%${search}%`);
    }
    if (fromDate) {
      countQuery += " AND income_date >= ?";
      countValues.push(fromDate);
    }
    if (toDate) {
      countQuery += " AND income_date <= ?";
      countValues.push(toDate);
    }

    let query = `select * from income where user_id=? `;
    let values = [userId];
    if (search) {
      query += " AND source LIKE ?";
      values.push(`%${search}%`);
    }

    if (fromDate) {
      query += " AND income_date >= ?";
      values.push(fromDate);
    }

    if (toDate) {
      query += " AND income_date <= ?";
      values.push(toDate);
    }
    switch (sort) {
      case "amount_asc":
        query += " ORDER BY amount ASC";
        break;

      case "amount_desc":
        query += " ORDER BY amount DESC";
        break;

      case "date_asc":
        query += " ORDER BY income_date ASC";
        break;

      default:
        query += " ORDER BY income_date DESC";
    }
    query += " LIMIT ? OFFSET ?";
    values.push(limit);
    values.push(offset);
    console.log(req.query);
    const [countRows] = await db.query(countQuery, countValues);
    const totalRecords = countRows[0].total;
    const totalPages = Math.ceil(totalRecords / limit);
    const [rows] = await db.query(query, values);
   return res.status(200).json({
    data: rows,
    currentPage,
    totalPages,
    totalRecords
});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const updateIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { source, amount, income_date, remarks } = req.body;

    const [result] = await db.query(
      `UPDATE income
       SET
         source = COALESCE(?, source),
         amount = COALESCE(?, amount),
         income_date = COALESCE(?, income_date),
         remarks = COALESCE(?, remarks)
       WHERE id = ? AND user_id = ?`,
      [
        source ?? null,
        amount ?? null,
        income_date ?? null,
        remarks ?? null,
        id,
        userId,
      ],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Income not found",
      });
    }

    return res.status(200).json({
      message: "Income updated successfully",
    });
  } catch (error) {
    console.error("Update income error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.user.id;

    const query = `
            DELETE FROM income
            WHERE id=? AND user_id=?
        `;

    const [result] = await db.query(query, [id, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Income not found",
      });
    }

    return res.status(200).json({
      message: "Income deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addIncome,
  getIncome,
  updateIncome,
  deleteIncome,
};
