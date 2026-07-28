import React from "react";
import { MdAccountBalanceWallet, MdShoppingCart } from "react-icons/md";

const Transactions = ({ transactions }) => {
  console.log(transactions);
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <>
      <div className="transactions-card shadow">
        <h4>Recent Transactions</h4>

        {recentTransactions.map((item) => {
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
               {new Date(item.date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        },
                      )}
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
        })}
      </div>
    </>
  );
};

export default Transactions;
