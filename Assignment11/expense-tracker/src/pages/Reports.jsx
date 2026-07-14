import React from "react";
import "../styles/ReportStyles.css";
import { useState, useEffect } from "react";
import SummaryCards from "../components/SummaryCards";
import {
  MdTrendingUp,
  MdTrendingDown,
  MdAccountBalanceWallet,
} from "react-icons/md";
const Reports = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
 
 
  const [transactions, setTransactions] = useState([]);
  const incomeData = JSON.parse(localStorage.getItem("income")) || [];
  const expenseData = JSON.parse(localStorage.getItem("expenses")) || [];
  const userIncomes = incomeData.filter(
    (income) => income.userId === currentUser.id,
  );

  const userExpenses = expenseData.filter(
    (expense) => expense.userId === currentUser.id,
  );
  const [fromDate, setFromDate] = useState(
  localStorage.getItem("fromDate") || ""
);

const [toDate, setToDate] = useState(
  localStorage.getItem("toDate") || ""
);
useEffect(() => {
  localStorage.setItem("fromDate", fromDate);
}, [fromDate]);

useEffect(() => {
  localStorage.setItem("toDate", toDate);
}, [toDate]);
 const filteredIncomes = userIncomes.filter((income) => {
  const incomeDate = new Date(income.date);

  const startDate = fromDate ? new Date(fromDate) : null;
  const endDate = toDate ? new Date(toDate) : null;

  if (endDate) {
    endDate.setHours(23, 59, 59, 999);
  }

  return (
    (!startDate || incomeDate >= startDate) &&
    (!endDate || incomeDate <= endDate)
  );
});
const filteredExpenses = userExpenses.filter((expense) => {
  const expenseDate = new Date(expense.date);

  const startDate = fromDate ? new Date(fromDate) : null;
  const endDate = toDate ? new Date(toDate) : null;

  if (endDate) {
    endDate.setHours(23, 59, 59, 999);
  }

  return (
    (!startDate || expenseDate >= startDate) &&
    (!endDate || expenseDate <= endDate)
  );
});
const totalIncome = filteredIncomes.reduce(
  (sum, item) => sum + Number(item.amount),
  0
);

const totalExpense = filteredExpenses.reduce(
  (sum, item) => sum + Number(item.amount),
  0
);
const allTransactions = [
  ...filteredIncomes.map((item) => ({
    ...item,
    type: "Income",
  })),
  ...filteredExpenses.map((item) => ({
    ...item,
    type: "Expense",
  })),
];
const balance = totalIncome - totalExpense;
  return (
    <>
      <div className="containercard d-flex flex-column gap-2">
        <div className="welcome-card shadow">
          <div>
            <h2 className="welcome-card-head">Get Your Monthly Reports </h2>
            <p>Here you can view the Monthly Reports</p>
          </div>
        </div>
        <div className="date-filter-card shadow">
          <div className="date-group">
            <label>From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="date-group">
            <label>To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
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
        </div>
        <div className="transactions-card shadow">
          <h3>Transaction History</h3>

          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>

                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {allTransactions.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.type}</td>
                  <td>{item.category}</td>

                  <td>₹{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Reports;
