const db = require("../config/db");
const addExpense = async (req, res) => {
  try {
    const { name, category, amount, expense_date, payment_mode, notes } =
      req.body;
    if (!amount || !category || !name || !expense_date || !payment_mode) {
      return res.status(400).json({ message: "All Feilds are required" });
    }
    const userId = req.user.id;
    const query = `insert into expense (user_id,name,amount,category,expense_date,payment_mode,notes) values(?,?,?,?,?,?,?)`;
    await db.query(query, [
      userId,
      name,
      amount,
      category,
      expense_date,
      payment_mode,
      notes,
    ]);
    return res.status(201).json({ message: "Expense Added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getExpense = async (req, res) => {
    try {
        const userId = req.user.id;

        const { search, category, from, to, sort } = req.query;

        let query = `
        SELECT *
        FROM expense
        WHERE user_id = ?
        `;

        let values = [userId];

        // Search
        if (search) {
            query += `
            AND (
                name LIKE ?
                OR category LIKE ?
                OR notes LIKE ?
            )
            `;

            values.push(
                `%${search}%`,
                `%${search}%`,
                `%${search}%`
            );
        }

        // Category
        if (category) {
            query += `
            AND category = ?
            `;

            values.push(category);
        }

        // Date
        if (from && to) {
            query += `
            AND expense_date BETWEEN ? AND ?
            `;

            values.push(from, to);
        }

        // Sort
        if (sort === "highest") {
            query += " ORDER BY amount DESC";
        }
        else if (sort === "lowest") {
            query += " ORDER BY amount ASC";
        }
        else {
            query += " ORDER BY expense_date DESC";
        }

        const [expenses] = await db.query(query, values);

        return res.status(200).json({
            expenses
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, amount, category, expense_date, payment_mode, notes } =
      req.body;

    const userId = req.user.id;
    const fields = [];
    const values = [];
    if (name !== undefined) {
      fields.push("name=?");
      values.push(name);
    }
    if (amount !== undefined) {
      fields.push("amount=?");
      values.push(amount);
    }
    if (category !== undefined) {
      fields.push("category=?");
      values.push(category);
    }
    if (expense_date !== undefined) {
      fields.push("expense_date=?");
      values.push(expense_date);
    }
    if (payment_mode !== undefined) {
      fields.push("payment_mode=?");
      values.push(payment_mode);
    }
    if (notes !== undefined) {
      fields.push("notes=?");
      values.push(notes);
    }
    if (fields.length === 0) {
      return res.status(400).json({
        message: "No fields provided to update",
      });
    }
    const query = `
            UPDATE expense
            SET ${fields.join(", ")}
            WHERE id = ? AND user_id = ?
        `;

    values.push(id);
    values.push(userId);

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    return res.status(200).json({
      message: "Expense updated successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.user.id;

    const query = `
            DELETE FROM expense
            WHERE id=? AND user_id=?
        `;

    const [result] = await db.query(query, [id, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    return res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
 
};
module.exports = { addExpense, getExpense, updateExpense, deleteExpense };
