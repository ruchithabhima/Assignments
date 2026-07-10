import React, { useState, useEffect } from "react";
import "../styles/IncomeStyles.css";
import SummaryCards from "../components/SummaryCards";

import {
  FaWallet,
  FaUsers,
  FaPlusCircle,
  FaUser,
  FaRupeeSign,
  FaCalendarAlt,
  FaRegStickyNote,
} from "react-icons/fa";
import { BsWallet2 } from "react-icons/bs";
const IncomeManagement = () => {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [incomeList, setIncomeList] = useState([]);
  useEffect(() => {
    const storedIncome = JSON.parse(localStorage.getItem("income")) || [];

    setIncomeList(storedIncome);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (source.trim() === "" || amount.trim() === "" || date === "") {
      setError("Please Fill all required fields");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    const existingIncome = JSON.parse(localStorage.getItem("income")) || [];
    const newId =
      existingIncome.length > 0
        ? existingIncome[existingIncome.length - 1].id + 1
        : 1;
    const newIncome = { id: newId, source, amount, date, remarks };
    existingIncome.push(newIncome);
    localStorage.setItem("income", JSON.stringify(existingIncome));

    setSuccess("Income updated successfully");
    setTimeout(() => {
      setSuccess("");
    }, 3000);

    setIncomeList(existingIncome);
    setSource("");
    setAmount("");
    setDate("");
    setRemarks("");
  };
  return (
    <>
      <div className="containercard d-flex flex-column gap-3">
        <div className="welcome-card shadow">
          <div>
            <h2 className="welcome-card-head">Manage Your Income</h2>
            <p>Here you can track and Manage your Income</p>
          </div>
        </div>
       
        <div className="income-page  align-items-start">
          <div className="income-form-card">
            <div className="card-header">
              <FaPlusCircle className="header-icon" />
              <h2>Add New Income</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  Income Source <span>*</span>
                </label>

                <div className="input-wrapper1">
                    <div className="pr">
                  <FaUser className="input-icon " /></div>
                  <input
                    type="text"
                    placeholder="Enter income source"
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Amount <span>*</span>
                </label>

                <div className="input-wrapper1">
                    <div className="pr">
                  <FaRupeeSign className="input-icon" /></div>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Date <span>*</span>
                </label>

                <div className="input-wrapper1">
                    <div className="pr">
                  <FaCalendarAlt className="input-icon" /></div>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Remarks (Optional)</label>

                <div className="input-wrapper1">
                    <div className="pr">
                  <FaRegStickyNote className="input-icon" /></div>
                  <input
                    type="text"
                    placeholder="Enter remarks (optional)"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </div>
              </div>

              <div className="button-group">
                <button className="save-btn" type="submit">
                  + Save Income
                </button>
              </div>
              {success && <p className="success-message">{success}</p>}
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>

          <div className="income-records-card">
            <div className="card-header">
              <h2>Income Records</h2>
            </div>

            <table className="income-table">
              <thead>
                <tr>
                  
                  <th>Source</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Remarks</th>
                </tr>
              </thead>

              <tbody>
                {incomeList.map((income) => (
                  <tr key={income.id}>
                    

                    <td>{income.source}</td>

                    <td>₹{income.amount}</td>

                    <td>{income.date}</td>

                    <td>{income.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncomeManagement;
