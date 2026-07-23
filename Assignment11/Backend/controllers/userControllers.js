const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query("select * from users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const signup = async (req, res) => {
  try {
    const { name, password } = req.body;
    const joinedDate = new Date();
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "insert into users (name,password,joined_date) values(?,?,?)",
      [name, hashedPassword, joinedDate],
    );
    res
      .status(201)
      .json({ message: "User resource created in DB successfully" });
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
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(401).json({ message: "user unauthorized" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      process.env.jwt_secret_key,
      { expiresIn: "1h" },
    );
    res.status(200).json({ message: "Login successful",token:token });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getUsers, signup, login };
