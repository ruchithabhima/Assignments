const db = require("../config/db");
const addIncome = async (req, res) => {
  try {
    const { amount, source, income_date,remarks } = req.body;
    if (!amount || !source || !income_date) {
      return res.status(400).json({ message: "All Feilds are required" });
    }
    const userId = req.user.id;
    const query = `insert into income(user_id,amount,source,income_date,remarks) values(?,?,?,?,?)`;
    await db.query(query, [userId, amount, source, income_date,remarks]);
    return res.status(201).json({ message: "Income added Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const query = `select * from income where user_id=? order by income_date desc`;
    const [rows] = await db.query(query, [userId]);
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, source, income_date } = req.body;
    const userId = req.user.id;
    const query = `update income set amount=?,source=?,income_date=? where id=? and user_id=?`;
    const [result] = await db.query(query, [
      amount,
      source,
      income_date,
      id,
      userId,
    ]);
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Incomem not found" });
    }
    return res.status(200).json({ message: "Income updated Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server Error" });
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
