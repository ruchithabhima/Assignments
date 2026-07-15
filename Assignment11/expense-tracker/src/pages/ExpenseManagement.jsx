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
  console.log("ExpenseManagement Rendered");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [notes, setNotes] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [expenseList, setExpenseList] = useState([]);
  const [searchExpense, setSearchExpense] = useState("");
  const [editId, setEditId] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const userExpenses = expenseList.filter(
  expense => expense.userId === currentUser.id
);
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    setExpenseList(storedExpenses);
  }, []);
  useEffect(() => {
    console.log("Expense List State:", expenseList);
  }, [expenseList]);
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

    if (editId !== null) {
      const updatedExpenses = existingExpenses.map((expense) =>
        expense.id === editId
          ? {
              ...expense,
              
              name,
              category,
              amount,
              date,
              paymentMode,
              notes,
            }
          : expense,
      );

      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      setExpenseList(updatedExpenses);

      setEditId(null);
      alert("Expense updated Successfully");
    } else {
      console.log("Current User:", currentUser);
      console.log(currentUser.id);
      const newExpense = {
        id: newId,
        userId:currentUser.id,
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
      alert("Expense added Successfully");
    }
    setName("");
    setCategory("");
    setAmount("");
    setDate("");
    setPaymentMode("");
    setNotes("");
  };
  const handleEdit = (id) => {
    const selectedExpense = userExpenses.find((expense) => expense.id === id);

    setName(selectedExpense.name);
    setCategory(selectedExpense.category);
    setAmount(selectedExpense.amount);
    setDate(selectedExpense.date);
    setPaymentMode(selectedExpense.paymentMode);
    setNotes(selectedExpense.notes);

    setEditId(id);
  };
  const handleDelete = (id) => {
    const updatedExpenses = expenseList.filter((expense) => expense.id !== id);

    setExpenseList(updatedExpenses);

    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    alert("Expense deleted Successfully");
  };
  const searchedExpenses = userExpenses.filter(
    (expense) =>
      expense.name.toLowerCase().includes(searchExpense.toLowerCase()) ||
      expense.amount.toLowerCase().includes(searchExpense.toLowerCase()) ||
      expense.paymentMode.toLowerCase().includes(searchExpense.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchExpense.toLowerCase()),
  );
  const filteredExpenses =
    filterCategory === ""
      ? searchedExpenses
      : searchedExpenses.filter(
          (expense) => expense.category === filterCategory,
        );
  const dateFilteredExpenses = filteredExpenses.filter((expense) => {
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
 let sortedExpenses = [...dateFilteredExpenses];
  if (sortBy === "lowtohigh") {
    sortedExpenses.sort((a, b) => Number(a.amount) - Number(b.amount));
  }
  if (sortBy === "hightolow") {
    sortedExpenses.sort((a, b) => Number(b.amount) - Number(a.amount));
  }
  if (sortBy === "date") {
    sortedExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  
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
              <h2 className="records-title">
                Expense Records
                <span className="record-count">({sortedExpenses.length})</span>
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
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="date-filter"
                />

                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="date-filter"
                />
               
                
                  
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
                
                <select
                  value={sortBy}
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
                  <th className="payment-column">Expense Name</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th className="payment-column">Payment</th>
                  <th className="notes-column">Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {sortedExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="payment-column">{expense.name}</td>
                    <td>
                      <span className="category-badge">{expense.category}</span>
                    </td>

                    <td>₹{expense.amount}</td>

                    <td>{expense.date}</td>

                    <td className="payment-column">{expense.paymentMode}</td>

                    <td className="notes-column">{expense.notes}</td>

                    <td className="d-flex flex-column justify-content-center align-item-center gap-2">
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
