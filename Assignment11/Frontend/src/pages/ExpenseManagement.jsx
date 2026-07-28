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
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [expenseList, setExpenseList] = useState([]);
  const fetchExpenses = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:3000/api/expense",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
useEffect(() => {
  fetchExpenses();
}, []);
return (
    <>
      <div className="containercard d-flex flex-column gap-2">
        <div className="welcome-card shadow">
          <div>
            <h2 className="welcome-card-head">Manage Your Income</h2>
            <p>Here you can track and Manage your Income</p>
          </div>
        </div>
        <div className="expense-page align-items-start gap-2">
          <div className="expense-form-card">
            <div className="card-header">
              <FaPlusCircle className="header-icon" />
              <h2>Add New Expense</h2>
            </div>
            <form /*onSubmit={handleSubmit}*/>
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
                
                onChange={(e) => setSearchExpense(e.target.value)}
              />
              <div className="input-wrapper1">
                <FaCalendarAlt className="input-icon" />

                <input
                  type="date"
                 
                  onChange={(e) => setFromDate(e.target.value)}
                  className="date-filter"
                />
              </div>
              <div className="input-wrapper1">
                <FaCalendarAlt className="input-icon" />

                <input
                  type="date"
                 
                  onChange={(e) => setToDate(e.target.value)}
                  className="date-filter"
                />
              </div>
              <select
              
                onChange={(e) => setFilterCategory(e.target.value)}
              >
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

              <select
          
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="date">Date</option>
                <option value="lowtohigh">Low to High</option>
                <option value="hightolow"> High to Low</option>
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
                    <td className="payment-column text-center">{expense.name}</td>
                    <td>
                      <span className="category-badge text-center">{expense.category}</span>
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

                    <td className="payment-column text-center">{expense.payment_mode}</td>

                    <td className="notes-column textx-center">{expense.notes}</td>

                    <td className="d-flex flex-column justify-content-center  gap-2">
                      <button className="edit-btn">
                        <FaEdit onClick={() => handleEdit(expense.id)} />
                      </button>

                      <button className="delete-btn">
                        <FaTrash onClick={() => handleDelete(expense.id)} />
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
