import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/DashboardStyles.css";
import SummaryCards from "../components/SummaryCards";
import Transactions from "../components/Transactions";
import ExpenseChart from "../components/ExpenseChart";
import { expensedata } from "../data/expensedata";

import {
  MdTrendingUp,
  MdTrendingDown,
  MdAccountBalanceWallet,
  MdPieChart,
  MdReceiptLong,
} from "react-icons/md";
import { FaPiggyBank } from "react-icons/fa";
const Dashboard = () => {
  const COLORS = [
    "#14b8a6",
    "#38bdf8",
    "#fbbf24",
    "#fb923c",
    "#a855f7",
    "#d1d5db",
  ];
const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="dashboard">
        <div className="containercard d-flex flex-column gap-3">
          <div className="welcome-card shadow">
            <div>
              <h2 className="welcome-card-head">Welcome Back,{user?.name} 👋</h2>
              <p>Here's what's happening today.</p>
            </div>
          </div>

          <div className="cards">
            <SummaryCards
              title="Income"
              value="₹45,000"
              color="#16a34a"
              bgColor="#add8bc"
              Icon={MdTrendingUp}
            />

            <SummaryCards
              title="Expenses"
              value="₹28,350"
              color="#ef4444"
              bgColor="#fee2e2"
              Icon={MdTrendingDown}
            />

            <SummaryCards
              title="Balance"
              value="₹16,650"
              color="#2563eb"
              bgColor="#dbeafe"
              Icon={MdAccountBalanceWallet}
            />

            <SummaryCards
              title="savings/month"
              value="₹50,000"
              color="#b91091"
              bgColor="#ead1fa"
              Icon={FaPiggyBank}
            />
            <SummaryCards
              title="Budget Used"
              value="₹60,000"
              color="#9333ea"
              bgColor="#f3e8ff"
              Icon={MdPieChart}
            />
            <SummaryCards
              title="No.of Transactions"
              value="3"
              color="#f59e0b"
              bgColor="#fef3c7"
              Icon={MdReceiptLong}
            />
          </div>
          <div className="grid-con ">
            <Transactions />

            <div className=" expense-card shadow">
              <h4>Expense Chart</h4>
              <div className="chart-content">
                <ExpenseChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
