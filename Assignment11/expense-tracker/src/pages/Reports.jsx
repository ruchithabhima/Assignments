import React from 'react'
import "../styles/ReportStyles.css"
import { useState,useEffect } from 'react';
import SummaryCards from '../components/SummaryCards';
import {
  MdTrendingUp,
  MdTrendingDown,
  MdAccountBalanceWallet,

} from "react-icons/md";
const Reports = () => {
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
const [reportIncome, setReportIncome] = useState(0);
const [reportExpense, setReportExpense] = useState(0);
const balance = reportIncome - reportExpense;
const [transactions, setTransactions] = useState([]);
useEffect(() => {
  if (!fromDate || !toDate) return;

  const incomeData =
    JSON.parse(localStorage.getItem("income")) || [];

  const expenseData =
    JSON.parse(localStorage.getItem("expenses")) || [];

  const filteredIncome = incomeData.filter(item => {
    const date = new Date(item.date);
    return (
      date >= new Date(fromDate) &&
      date <= new Date(toDate)
    );
  });

  const filteredExpense = expenseData.filter(item => {
    const date = new Date(item.date);
    return (
      date >= new Date(fromDate) &&
      date <= new Date(toDate)
    );
  });

  const totalIncome = filteredIncome.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const totalExpense = filteredExpense.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const allTransactions = [
    ...filteredIncome.map(item => ({
      ...item,
      type: "Income",
    })),
    ...filteredExpense.map(item => ({
      ...item,
      type: "Expense",
    })),
  ];

  setReportIncome(totalIncome);
  setReportExpense(totalExpense);
  const balance = reportIncome - reportExpense;
  setTransactions(allTransactions);

}, [fromDate, toDate]);
  
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
                  value={`₹${reportIncome}`}
                  color="#16a34a"
                  bgColor="#add8bc"
                  Icon={MdTrendingUp}
                />
              </div>
              <div className="col-12 col-sm-6 col-lg-4 mb-3">
                <SummaryCards
                  title="Total Expenses"
                  value={`₹${reportExpense}`}
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
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map(item => (
          <tr key={item.id}>
            <td>{item.date}</td>
            <td>{item.type}</td>
            <td>{item.category}</td>
            <td>{item.title}</td>
            <td>₹{item.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

        </div>
    </>
  )
}

export default Reports
