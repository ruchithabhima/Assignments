import React, { useState,useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/DashboardStyles.css";
import SummaryCards from "../components/SummaryCards";
import Transactions from "../components/Transactions";
import ExpenseChart from "../components/ExpenseChart";


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
  const user = JSON.parse(localStorage.getItem("user"));
  const incomeList = JSON.parse(localStorage.getItem("income")) || [];

  const expenseList = JSON.parse(localStorage.getItem("expenses")) || [];
  

  const transactions = [
    ...incomeList.map((item) => ({
      id: item.id,
      title: item.source,
      category: "Income",
      date: item.date,
      amount: item.amount,
      type: "income",
    })),

    ...expenseList.map((item) => ({
      id: item.id,
      title: item.name,
      category: item.category,
      date: item.date,
      amount: item.amount,
      type: "expense",
    })),
  ];
 

  
const [selectedMonth, setSelectedMonth] = useState(
  localStorage.getItem("selectedMonth") || new Date().getMonth().toString()
);
  const filteredExpenses =
  selectedMonth === "all"
    ? expenseList
    : expenseList.filter(
        item =>
          new Date(item.date).getMonth() === Number(selectedMonth)
      );
      const filteredIncome =
  selectedMonth === "all"
    ? incomeList
    : incomeList.filter(
        item =>
          new Date(item.date).getMonth() === Number(selectedMonth)
      );
      const totalIncome = filteredIncome.reduce(
  (sum, item) => sum + Number(item.amount),
  0
);

const totalExpense = filteredExpenses.reduce(
  (sum, item) => sum + Number(item.amount),
  0
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


const totalTransactions =
  filteredIncome.length + filteredExpenses.length;
   const currentDate = new Date();

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyIncome = incomeList
    .filter((income) => {
      const incomeDate = new Date(income.date);

      return (
        incomeDate.getMonth() === currentMonth &&
        incomeDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, income) => sum + Number(income.amount), 0);

  const monthlyExpense = expenseList
    .filter((expense) => {
      const expenseDate = new Date(expense.date);

      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, expense) => sum + Number(expense.amount), 0);
    const balance =totalIncome - totalExpense;
   
    const filteredTransactions =
  selectedMonth === "all"
    ? transactions
    : transactions.filter(
        item =>
          new Date(item.date).getMonth() === Number(selectedMonth)
      );
const transactionCount=filteredExpenses.length+filteredIncome.length;

useEffect(() => {
  localStorage.setItem("selectedMonth", selectedMonth);
}, [selectedMonth]);
  console.log(incomeList);
  console.log(expenseList);
  console.log(transactions);
  return (
    <>
      <div className="dashboard">
        <div className="containercard d-flex flex-column gap-3">
          <div className="welcome-card shadow">
            <div>
              <h2 className="welcome-card-head">
                Welcome Back,{user?.name} 👋
              </h2>
              <p>Here's what's happening today.</p>
            </div>
          </div>
          <div className="month-filter-container">
  <div className="month-info">
    <h4>{monthNames[selectedMonth]} 2026</h4>
    <p>Track your income and expenses for the selected month</p>
  </div>

  <select
    value={selectedMonth}
    onChange={(e) => setSelectedMonth(e.target.value)}
  >
    {monthNames.map((month, index) => (
      <option key={index} value={index}>
        {month}
      </option>
    ))}
  </select>
</div>
            
              <div class="row ">
              <div className="col-12 col-sm-6 col-lg-4 mb-3">
                <SummaryCards
                  title="Total Income"
                  value={`₹${totalIncome}`}
                  color="#16a34a"
                  bgColor="#add8bc"
                  Icon={MdTrendingUp}
                />
              </div>
              <div className="col-12 col-sm-6 col-lg-4 mb-3">
                <SummaryCards
                  title="Total Expenses"
                  value={`₹${totalExpense}`}
                  color="#ef4444"
                  bgColor="#fee2e2"
                  Icon={MdTrendingDown}
                
                />
              </div>
              <div className="col-12 col-sm-6 col-md-4 mb-3">
                <SummaryCards
                  title="Balance"
                  value={`₹${balance}`}
                  color="#2563eb"
                  bgColor="#dbeafe"
                  Icon={MdAccountBalanceWallet}
                 
                />
              </div>
              <div className="col-12 col-sm-6 col-lg-4 ">
                <SummaryCards
                  title="savings/month"
                  value={`₹${balance}`}
                  color="#b91091"
                  bgColor="#ead1fa"
                  Icon={FaPiggyBank}
                 
                />
              </div>
              <div className="col-12 col-sm-6 col-lg-4">
                <SummaryCards
                  title="No.of Transactions"
                  value={transactionCount}
                  color="#f59e0b"
                  bgColor="#fef3c7"
                  Icon={MdReceiptLong}
                 
                />
              </div>
            
          </div>
          <div className="grid-con ">
            <Transactions transactions={filteredTransactions} />

            <div className=" expense-card shadow">
              <h4>Expense Chart</h4>
              <div className="chart-content">
                <ExpenseChart expenseList={filteredExpenses} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
