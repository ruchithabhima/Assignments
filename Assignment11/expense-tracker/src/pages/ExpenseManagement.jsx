import React, { useState, useEffect } from "react";
import "../styles/ExpenseStyles.css";
import {
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaRupeeSign,
  FaFileInvoiceDollar,
} from "react-icons/fa";

const ExpenseManagement = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [notes, setNotes] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [expenseList, setExpenseList] = useState([]);
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    setExpenseList(storedExpenses);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      category === "" ||
      amount === "" ||
      date === "" ||
      paymentMode === ""
    ) {
      alert("Please fill all required fields");
      return;
    }

    const existingExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const newId =
      existingExpenses.length > 0
        ? Math.max(...existingExpenses.map((expense) => expense.id)) + 1
        : 1;

    const newExpense = {
      id: newId,
      name,
      category,
      amount,
      date,
      paymentMode,
      notes,
    };

    existingExpenses.push(newExpense);

    localStorage.setItem("expenses", JSON.stringify(existingExpenses));

    setExpenseList(existingExpenses);

    setExpenseName("");
    setCategory("");
    setAmount("");
    setDate("");
    setPaymentMode("");
    setNotes("");

    alert("Expense Added Successfully");
  };
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
            <form onSubmit={handleSubmit}>
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

              <button className="save-btn">+ Save Expense</button>
            </form>
          </div>
          <div className="expense-records-card">
            <div className="records-header ">
            
              <h2 className="welcome-card-head">Expense Records</h2>
                <div className="ms-auto">
              <div className="table-actions">
                <input type="text" placeholder="Search expenses..." className="search"/>
                <select
                  value={filterCategory}
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
                <select>
                  <option>Sort By</option>
                  <option>Date</option>
                  <option>Amount</option>
                  <option>Category</option>
                </select>
                </div>
              </div>
            </div>

            <table className="expense-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {expenseList.map((expense) => (
                  <tr key={expense.id}>
                    <td>
                      <span className="category-badge">{expense.category}</span>
                    </td>

                    <td>₹{expense.amount}</td>

                    <td>{expense.date}</td>

                    <td>{expense.paymentMode}</td>

                    <td>{expense.notes}</td>

                    <td>
                      <button className="edit-btn">
                        <FaEdit />
                      </button>

                      <button className="delete-btn">
                        <FaTrash />
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
