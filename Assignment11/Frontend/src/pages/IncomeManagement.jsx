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
  FaEdit,
  FaTrash,
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
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const fetchIncome = async () => {
    try {
      console.log("fetchIncome called");
      const token = localStorage.getItem("token");
      const params = new URLSearchParams();
      console.log("search state:", search);
      if (search) {
        params.append("search", search);
      }
      if (fromDate) {
        params.append("fromDate", fromDate);
      }
      if (toDate) {
        params.append("toDate", toDate);
      }
      if (sort) {
        params.append("sort", sort);
      }
      params.append("page", page);

      console.log(params.toString());
      const response = await fetch(
        `http://localhost:3000/api/income?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      console.log("Income API:", data);

      if (response.ok) {
        setIncomeList(data.data);
        setTotalPages(data.totalPages);
        setTotalRecords(data.totalRecords);
      }
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, [search, fromDate, toDate, sort, page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (source.trim() === "" || amount.trim() === "" || date === "") {
      setError("Please Fill all required fields");

      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    if (editingId) {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/income/${editingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            source,
            amount,
            income_date: date,
            remarks,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to update income");
        return;
      }
      setSuccess("Income updated successfully");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
      setEditingId(null);
      setSource("");
      setAmount("");
      setDate("");
      setRemarks("");

      await fetchIncome();

      return;
    }
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/income", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          source,
          amount,
          income_date: date,
          remarks,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to add income");
        return;
      }

      await fetchIncome();
      setSource("");
      setAmount("");
      setDate("");
      setRemarks("");
      setSuccess("Income Added Successfully");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
  };
  const handleEdit = (id) => {
    const incomeToEdit = incomeList.find((income) => income.id === id);

    if (!incomeToEdit) return;

    setSource(incomeToEdit.source);
    setAmount(incomeToEdit.amount);

    setDate(incomeToEdit.income_date.split("T")[0]);

    setRemarks(incomeToEdit.remarks || "");

    setEditingId(id);
  };
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:3000/api/income/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to delete income");

        setTimeout(() => {
          setError("");
        }, 3000);

        return;
      }

      setSuccess("Income deleted successfully");

      setTimeout(() => {
        setSuccess("");
      }, 3000);

      await fetchIncome();
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
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
                  <div className="pr"></div>
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
                  <div className="pr"></div>
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
                    <FaCalendarAlt className="input-icon" />
                  </div>
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
                  <div className="pr"></div>
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
              <h2>
                Income Records
                <span className="record-count">({incomeList.length})</span>
              </h2>
            </div>
            <div className=" ms-auto table-actions mb-3">
              <input
                type="text"
                placeholder="Search Incomes..."
                className="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="input-wrapper1">
                <FaCalendarAlt className="input-icon" />

                <input
                  type="date"
                  className="date-filter"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className="input-wrapper1">
                <FaCalendarAlt className="input-icon" />

                <input
                  type="date"
                  className="date-filter"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Sort By</option>
                <option value="">Newest</option>
                <option value="date_asc">Oldest</option>
                <option value="amount_asc">Lowest</option>
                <option value="amount_desc"> Highest</option>
              </select>
            </div>
            <table className="income-table">
              <thead>
                <tr>
                  <th className="text-center">Source</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">Date</th>

                  <th className="text-center">Actions</th>
                  <th className="remarks-column">Remarks</th>
                </tr>
              </thead>

              <tbody>
                {incomeList.map((income) => (
                  <tr key={income.id}>
                    <td className="text-center">{income.source}</td>

                    <td className="text-center">₹{Number(income.amount)}</td>

                    <td className="text-center">
                      {new Date(income.income_date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        },
                      )}
                    </td>
                    <td>
                      <div className="d-flex flex-column flex-md-row justify-content-center align-items-centerr  gap-2">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(income.id)}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(income.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                    <td className="remarks-column">{income.remarks}</td>
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
      </div>
    </>
  );
};

export default IncomeManagement;
