const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query(`select
    id,
    name,
    joined_date,
    monthly_budget,
    preferred_currency,
    role
FROM users`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const signup = async (req, res) => {
  try {
    const { name, password } = req.body;
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE name = ?",
      [name],
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const joinedDate = new Date();
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (name,password,joined_date) VALUES (?,?,?)",
      [name, hashedPassword, joinedDate],
    );
    const role = "user";

    const token = jwt.sign(
      {
        id: result.insertId,
        name,
        role,
      },
      process.env.jwt_secret_key,
      { expiresIn: "1d" },
    );
    res.status(201).json({
      message: "Signup successful",
      token,
      role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const [rows] = await db.query("select * from users where name=?", [name]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    const user = rows[0];
    console.log("Entered Password:", password);
    console.log("Stored Password:", user.password);

    const ismatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", ismatch);
    if (!ismatch) {
      return res.status(401).json({ message: "user unauthorized" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        role: user.role,
      },
      process.env.jwt_secret_key,
      { expiresIn: "1d" },
    );
    res
      .status(200)
      .json({ message: "Login successful", token: token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, password, role, monthly_budget, preferred_currency } =
      req.body;

    // Check whether user exists
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let fields = [];
    let values = [];

    if (name !== undefined) {
      fields.push("name = ?");
      values.push(name);
    }

    if (password !== undefined && password !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      fields.push("password = ?");
      values.push(hashedPassword);
    }

    if (role !== undefined) {
      fields.push("role = ?");
      values.push(role);
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
        message: "No fields provided",
      });
    }

    values.push(id);

    const query = `
      UPDATE users
      SET ${fields.join(", ")}
      WHERE id = ?
    `;

    await db.query(query, values);

    return res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await db.query("DELETE FROM users WHERE id = ?", [id]);

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;

    const { currentPassword, newPassword } = req.body;
    const [rows] = await db.query("SELECT * FROM users WHERE id=?", [userId]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const user = rows[0];
    console.log("Current Password:", currentPassword);
    console.log("User:", user);
    console.log("Stored Password:", user.password);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query(
      `
    UPDATE users
    SET password=?
    WHERE id=?
    `,
      [hashedPassword, userId],
    );
    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getUsers,
  signup,
  login,
  updateUser,
  deleteUser,
  changePassword,
};
