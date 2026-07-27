const db = require("../config/db");
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.query(
      `select id ,name,monthly_budget,preferred_currency,joined_date from users where id=?`,
      [userId],
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, monthly_budget, preferred_currency } = req.body;
    const fields = [];
    const values= [];
    if (name !== undefined) {
      fields.push("name = ?");
      values.push(name);
    }

    if (monthly_budget !== undefined) {
      fields.push("monthly_budget = ?");
      values.push(monthly_budget);
    }

    if (preferred_currency !== undefined) {
      fields.push("preferred_currency = ?");
      values.push(preferred_currency);
    }

    if (fields.length === 0) {
      return res.status(400).json({
        message: "No fields provided to update",
      });
    }

    const query = `
            UPDATE users
            SET ${fields.join(", ")}
            WHERE id = ?
        `;

    values.push(userId);

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
module.exports = { getUserProfile, updateUserProfile };
