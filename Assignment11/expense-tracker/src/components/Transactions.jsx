import React from "react";
import { MdAccountBalanceWallet, MdShoppingCart } from "react-icons/md";

const Transactions = ({transactions}) => {
 console.log(transactions);
  const recentTransactions = [...transactions]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 5);
  
  return (
    <>
      <div className="transactions-card shadow">
        <h4>Recent Transactions</h4>

        {recentTransactions.map((item) => {
          const Icon = item.icon;
          return (
            <div className="transaction-row" key={item.id}>
              <div className="left-section">
                <div className="transaction-icon">
                  {item.type === "income" ? (
                    <MdAccountBalanceWallet />
                  ) : (
                    <MdShoppingCart />
                  )}
                </div>

                <div className="transaction-info">
                  <h4>{item.title}</h4>
                  <p>{item.category}</p>
                </div>
              </div>

              <div className="transaction-date">{item.date}</div>

              <div className={item.amount > 0 ? "income" : "expense"}>
                ₹{Math.abs(item.amount)}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Transactions;
