import React from "react";
import "../styles/ReportStyles.css";
import { useState, useEffect } from "react";
import SummaryCards from "../components/SummaryCards";
import { FaCalendarAlt } from "react-icons/fa";
import {
  MdTrendingUp,
  MdTrendingDown,
  MdAccountBalanceWallet,
} from "react-icons/md";
import { useSearchParams } from "react-router-dom";
const Reports = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const fetchReport = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("fetchReport called");
      console.log("from:", from);
      console.log("to:", to);
      const response = await fetch(
        `http://localhost:3000/api/report?from=${from}&to=${to}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        setTotalIncome(Number(data.totalIncome));
        setTotalExpense(Number(data.totalExpense));
        setBalance(Number(data.balance));
        setTransactionHistory(data.transactionHistory);
        setTotalPages(data.totalPages);
        setTotalRecords(data.totalRecords);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchReport();
  }, [from, to,page]);
  useEffect(() => {
    const currentFrom = searchParams.get("from") || "";
    const currentTo = searchParams.get("to") || "";

    if (currentFrom !== from || currentTo !== to) {
      const params = {};

      if (from) params.from = from;
      if (to) params.to = to;

      setSearchParams(params);
    }
  }, [from, to]);
  useEffect(() => {
    sessionStorage.setItem(
      "reportFilters",
      JSON.stringify({
        from,
        to,
      }),
    );
  }, [from, to]);
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
            <div className="input-wrapper1">
              <FaCalendarAlt className="input-icon" />

              <input
                className="padding"
                type="date"
                placeholder="From Date"
                value={from}
                onChange={(e) => {
                  const params = Object.fromEntries(searchParams);
                  params.from = e.target.value;
                  setSearchParams(params);
                }}
              />
            </div>
          </div>

          <div className="date-group">
            <label>To Date</label>
            <div className="input-wrapper1">
              <FaCalendarAlt className="input-icon" />

              <input
                className="padding"
                type="date"
                placeholder="To Date"
                value={to}
                onChange={(e) => {
                  const params = Object.fromEntries(searchParams);
                  params.to = e.target.value;
                  setSearchParams(params);
                }}
              />
            </div>
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
                <th >Category</th>

                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {transactionHistory.map((item, index) => (
                <tr key={index}>
                  <td>
                    {" "}
                    {new Date(item.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                  </td>
                  <td>{item.type}</td>
                  <td >{item.category || "-"}</td>

                  <td>₹{Number(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container">
                <div className="pagination ">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setPage(index + 1)}
                      className={page === index + 1 ? "active-page" : ""}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
