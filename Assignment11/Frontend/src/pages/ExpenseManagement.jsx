import React, { useState, useEffect } from "react";
import "../styles/ExpenseStyles.css";
import {
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaRupeeSign,
  FaFileInvoiceDollar,
  FaCalendarAlt,
} from "react-icons/fa";

const ExpenseManagement = () => {
  console.log("ExpenseManagement Rendered");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [expenseList, setExpenseList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchExpense, setSearchExpense] = useState("");
const [filterCategory, setFilterCategory] = useState("");
const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");
const [sortBy, setSortBy] = useState("");
  const editExpense = (expense) => {
    setEditingId(expense.id);
    setName(expense.name);
    setCategory(expense.category);
    setAmount(expense.amount);
    setDate(expense.expense_date.split("T")[0]);
    setPaymentMode(expense.payment_mode);
    setNotes(expense.notes || "");
  };
  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams();

      if (searchExpense.trim()) {
        params.append("search", searchExpense);
      }

      if (filterCategory) {
        params.append("category", filterCategory);
      }

      if (fromDate) {
        params.append("from", fromDate);
      }

      if (toDate) {
        params.append("to", toDate);
      }

      if (sortBy) {
        params.append("sort", sortBy);
      }
      console.log(sortBy);
      const response = await fetch(
        `http://localhost:3000/api/expense?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      console.log("Expense data:", data);

      if (response.ok) {
        setExpenseList(data);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };
  const addExpense = async (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      amount === "" ||
      category === "" ||
      date === "" ||
      paymentMode === ""
    ) {
      setError("Please fill all required fields");

      setTimeout(() => {
        setError("");
      }, 3000);

      return;
    }

    try {
      const token = localStorage.getItem("token");
      const url = editingId
        ? `http://localhost:3000/api/expense/${editingId}`
        : "http://localhost:3000/api/expense";

      const method = editingId ? "PATCH" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          category,
          amount,
          expense_date: date,
          payment_mode: paymentMode,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to add expense");

        setTimeout(() => {
          setError("");
        }, 3000);

        return;
      }

      setSuccess(
        editingId
          ? "Expense updated successfully"
          : "Expense added successfully",
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);

      await fetchExpenses();

      setName("");
      setCategory("");
      setAmount("");
      setDate("");
      setPaymentMode("");
      setNotes("");
      setEditingId(null);
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
  };
  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:3000/api/expense/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to delete expense");

        setTimeout(() => {
          setError("");
        }, 3000);

        return;
      }

      setSuccess("Expense deleted successfully");

      setTimeout(() => {
        setSuccess("");
      }, 3000);

      await fetchExpenses();
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, [searchExpense, filterCategory, fromDate, toDate, sortBy]);
  return (
    <>
      <div className="containercard d-flex flex-column gap-2">
        <div className="welcome-card shadow">
          <div>
            <h2 className="welcome-card-head">Manage Your Income</h2>
            <p className="p">Here you can track and Manage your Income</p>
          </div>
        </div>
        <div className="expense-page align-items-start gap-2">
          <div className="expense-form-card">
            <div className="card-header">
              <FaPlusCircle className="header-icon" />
              <h2>Add New Expense</h2>
            </div>
            <form onSubmit={addExpense}>
              <div className="form-group">
                <label>
                  Expense Name <span>*</span>
                </label>

                <div className="input-wrapper">
                  <FaFileInvoiceDollar className="input-icon" />

                  <input
                    type="text"
                    placeholder="Enter expense name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}

              <div className="form-group">
                <label>
                  Category <span>*</span>
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  <option>Food</option>
                  <option>Fuel</option>
                  <option>Shopping</option>
                  <option>Medical</option>
                  <option>Bills</option>
                  <option>Entertainment</option>
                  <option>Travel</option>
                  <option>Others</option>
                </select>
              </div>

              {/* Amount */}

              <div className="form-group">
                <label>
                  Amount <span>*</span>
                </label>

                <div className="input-wrapper">
                  <FaRupeeSign className="input-icon" />

                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              {/* Date */}

              <div className="form-group">
                <label>
                  Date <span>*</span>
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* Payment Mode */}

              <div className="form-group">
                <label>
                  Payment Mode <span>*</span>
                </label>

                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                >
                  <option value="">Select payment mode</option>
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>Net Banking</option>
                </select>
              </div>

              {/* Notes */}

              <div className="form-group">
                <label>Notes</label>

                <textarea
                  rows="3"
                  placeholder="Enter notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}
              <button className="save-btn">+ Save Expense</button>
            </form>
          </div>
          <div className="expense-records-card">
            <div className="records-header ">
              <h2 className="records-title">
                Expense Records
                <span className="record-count">({expenseList.length})</span>
              </h2>
            </div>
            <div className=" ms-auto table-actions mb-3">
              <input
                type="text"
                placeholder="Search expenses..."
                className="search"
                value={searchExpense}
                onChange={(e) => setSearchExpense(e.target.value)}
              />
              <div className="input-wrapper1">
                <FaCalendarAlt className="input-icon" />

                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="date-filter"
                />
              </div>
              <div className="input-wrapper1">
                <FaCalendarAlt className="input-icon" />

                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="date-filter"
                />
              </div>
              <select  value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Food">Food</option>
                <option value="Fuel">Fuel</option>
                <option value="Shopping">Shopping</option>
                <option value="Medical">Medical</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Travel">Travel</option>
                <option value="Others">Others</option>
              </select>

              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="">Sort By</option>
                <option value="date">Date</option>
                <option value="lowest">Low to High</option>
                <option value="highest"> High to Low</option>
              </select>
            </div>

            <table className="expense-table">
              <thead>
                <tr>
                  <th className="payment-column text-center">Expense Name</th>
                  <th className="text-center">Category</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">Date</th>
                  <th className="payment-column text-center">Payment</th>
                  <th className="notes-column text-center">Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {expenseList.map((expense) => (
                  <tr key={expense.id}>
                    <td className="payment-column text-center">
                      {expense.name}
                    </td>
                    <td>
                      <span className="category-badge text-center">
                        {expense.category}
                      </span>
                    </td>

                    <td className="text-center">₹{Number(expense.amount)}</td>

                    <td className="text-center">
                      {new Date(expense.expense_date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        },
                      )}
                    </td>

                    <td className="payment-column text-center">
                      {expense.payment_mode}
                    </td>

                    <td className="notes-column textx-center">
                      {expense.notes}
                    </td>

                    <td className="d-flex flex-column justify-content-center  gap-2">
                      <button className="edit-btn">
                        <FaEdit onClick={() => editExpense(expense)} />
                      </button>

                      <button className="delete-btn">
                        <FaTrash
                          onClick={() => deleteExpense(expense.id)}
                          style={{ cursor: "pointer" }}
                        />
                      </button>
                    </td>
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

export default ExpenseManagement;
