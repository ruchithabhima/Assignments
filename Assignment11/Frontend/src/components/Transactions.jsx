import React from "react";
import { MdAccountBalanceWallet, MdShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Transactions = ({ transactions }) => {
  console.log(transactions);
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
const navigate = useNavigate();
  return (
    <>
      <div className="transactions-card shadow">
        <h4>Recent Transactions</h4>
        {recentTransactions.length === 0 ? (
          <div className="empty-title">
            <p>No recent transactions found.</p>
            <p className="empty-text">
              Add your first income or expense to see transactions here.
            </p>
            <div className="quick-actions">
              <h3>🚀 Get Started</h3>

              <div className="quick-buttons">
                <button onClick={() => navigate("/income")}>
                  + Add Income
                </button>

                <button onClick={() => navigate("/expense")}>
                  + Add Expense
                </button>

                <button onClick={() => navigate("/report")}>
                  View Reports
                </button>
              </div>
            </div>
          </div>
        ) : (
          recentTransactions.map((item) => {
            console.log("transaction:", item);
            console.log("type:", item.type);
            const Icon = item.icon;
            return (
              <div className="transaction-row" key={item.id}>
                <div className="left-section">
                  <div className="transaction-icon">
                    {item.type === "Income" ? (
                      <MdAccountBalanceWallet />
                    ) : (
                      <MdShoppingCart />
                    )}
                  </div>
                  <div className="transaction-info">
                    <h4>{item.title}</h4>
                    <p>{item.category}</p>
                    <p>{item.type}</p>
                  </div>
                </div>
                <div className="transaction-date">
                  {new Date(item.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </div>
                <div
                  className={
                    item.type === "Income"
                      ? "transaction-income"
                      : "transaction-expense"
                  }
                >
                  {item.type === "Income" ? "+" : "-"}₹
                  {Number(item.amount).toFixed(2)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Transactions;
