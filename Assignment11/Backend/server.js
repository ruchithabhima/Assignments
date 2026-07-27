require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const app = express();
app.use(express.json())
const userRoutes=require("./routes/userRoutes");
app.use(userRoutes);
const incomeRoutes = require("./routes/incomeRoutes");

const expenseRoutes = require("./routes/expenseRoutes");

app.use("/income", incomeRoutes);

app.use("/expense", expenseRoutes);
const reportRoutes=require("./routes/reportRoutes");
app.use("/report",reportRoutes);
const profileRoutes=require("./routes/profileRoutes");
app.use("/userprofile",profileRoutes);
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/dashboard", dashboardRoutes);
async function startserver() {
  try {
    const connection = await db.getConnection();
    connection.release();

    console.log("Database Connected Successfully");
    app.listen(3000, () => {
      console.log("Server Running on port 3000");
    });
  } catch (e) {
    console.error("Database Connection Failed", e.message);
  }
}

startserver();
