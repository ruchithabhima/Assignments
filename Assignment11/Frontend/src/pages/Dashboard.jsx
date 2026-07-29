import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/DashboardStyles.css";
import SummaryCards from "../components/SummaryCards";
import Transactions from "../components/Transactions";
import ExpenseChart from "../components/ExpenseChart";
import { FaWallet } from "react-icons/fa";
import {
  MdTrendingUp,
  MdTrendingDown,
  MdAccountBalanceWallet,
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

  const [userName, setUserName] = useState("");
const [dashboardData, setDashboardData] = useState({});

const fetchProfile = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/userprofile", {

        headers: {
            Authorization: `Bearer ${token}`,
        }

    });

    const data = await response.json();

    if(response.ok){
        setUserName(data.name);
    }

}
const fetchDashboard = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3000/api/dashboard?month=${selectedMonth}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (response.ok) {
        setDashboardData(data);
    }
};


const [selectedMonth, setSelectedMonth] = useState(
  new Date().getMonth().toString()
);
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

 
  const currentDate = new Date();
 useEffect(() => {
    localStorage.setItem("selectedMonth", selectedMonth);
  }, [selectedMonth]);
  useEffect(() => {
    localStorage.setItem("selectedMonth", selectedMonth);
  }, [selectedMonth]);
useEffect(() => {
   fetchDashboard();
}, [selectedMonth]);
useEffect(() => {
  fetchProfile();
}, []);
  return (
    <>
      <div className="dashboard">
        <div className="containercard d-flex flex-column gap-3">
          <div className="welcome-card shadow">
            <div>
              <h2 className="welcome-card-head">
                Welcome Back,{userName} 👋
              </h2>
              <p>Here's what's happening today.</p>
            </div>
          </div>
          <div className="month-filter-container">
            <div className="month-info">
              <h4>
                {selectedMonth === "all"
                  ? "Year 2026"
                  : `${monthNames[selectedMonth]} 2026`}
              </h4>
              <p>Track your income and expenses for the selected month</p>
            </div>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="all">All</option>

              {monthNames.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="row ">
            <div className="col-12 col-sm-6 col-lg-4 mb-3">
              <SummaryCards
                title="Total Income"
                value={`₹${dashboardData.totalIncome}`}
                color="#16a34a"
                bgColor="#add8bc"
                Icon={MdTrendingUp}
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mb-3">
              <SummaryCards
                title="Total Expenses"
                value={`₹${dashboardData.totalExpense}`}
                color="#ef4444"
                bgColor="#fee2e2"
                Icon={MdTrendingDown}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-4 mb-3">
              <SummaryCards
                title="Balance"
                value={`₹${dashboardData.balance}`}
                color="#2563eb"
                bgColor="#dbeafe"
                Icon={MdAccountBalanceWallet}
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mb-3">
              <SummaryCards
                title="savings/month"
                value={`₹${dashboardData.savings}`}
                color="#b91091"
                bgColor="#ead1fa"
                Icon={FaPiggyBank}
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <SummaryCards
                title="No.of Transactions"
                value={dashboardData.transactionCount}
                color="#f59e0b"
                bgColor="#fef3c7"
                Icon={MdReceiptLong}
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <SummaryCards
                title="Monthly Budget"
                
                value={dashboardData.monthlyBudget}
                color="#a855f7"
                bgColor="#d1d5db"
                Icon={FaWallet}
              />
            </div>
          </div>
          <div className="grid-con ">
            <Transactions  transactions={dashboardData.recentTransactions || []} />

            <div className=" expense-card shadow">
              <h4>Expense Chart</h4>
              <div className="chart-content">
                <ExpenseChart userExpenses={dashboardData.expenseChart || []} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
