require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
const userRoutes=require("./routes/userRoutes");
app.use("/api",userRoutes);
const incomeRoutes = require("./routes/incomeRoutes");

const expenseRoutes = require("./routes/expenseRoutes");

app.use("/api/income", incomeRoutes);

app.use("/api/expense", expenseRoutes);
const reportRoutes=require("./routes/reportRoutes");
app.use("/api/report",reportRoutes);
const profileRoutes=require("./routes/profileRoutes");
app.use("/api/userprofile",profileRoutes);
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/dashboard", dashboardRoutes);



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
