import React from "react";
import { transactions } from "../data/transactiondata";

const Transactions = () => {
  return (
    <>
      <div className="transactions-card shadow">
        <h4>Recent Transactions</h4>

        {transactions.map((item) => {
          const Icon = item.icon;
          return (
            <div className="transaction-row" key={item.id}>
  
  <div className="left-section">
    <div className="transaction-icon">
      <Icon />
    </div>

    <div className="transaction-info">
      <h4>{item.title}</h4>
      <p>{item.category}</p>
    </div>
  </div>

  <div className="transaction-date">
    {item.date}
  </div>

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
