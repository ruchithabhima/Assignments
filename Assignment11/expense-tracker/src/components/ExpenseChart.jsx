// ExpenseChart.jsx
import { expensedata } from "../data/expensedata";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "../styles/DashboardStyles.css";
function ExpenseChart() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const total = expensedata.reduce((sum, item) => sum + item.Value, 0);
  const handlePieClick = (data, index) => {
    console.log(data);
    console.log(expensedata[index]);

    setSelectedCategory(expensedata[index]);
  };
  const COLORS = [
    "#14b8a6",
    "#38bdf8",
    "#fbbf24",
    "#fb923c",
    "#a855f7",
    "#d1d5db",
  ];
  return (
    <>
      <div className="chart-container">
        <ResponsiveContainer width={300} height={250}>
          <PieChart>
            <text
              x="50%"
              y="48%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="20"
              fontWeight="bold"
            >
              ₹{total}
            </text>

            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="14"
            >
              Total
            </text>

            <Pie
              data={expensedata}
              dataKey="Value"
              innerRadius={60}
              outerRadius={90}
            >
              {expensedata.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                  onClick={() =>
                    setSelectedCategory((prev) =>
                      prev?.name === entry.name ? null : entry,
                    )
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="chart-side">
          <div className="legend">
            {" "}
            {expensedata.map((item, index) => (
              <div className="legend-item" key={index}>
                <span
                  className="dot"
                  style={{
                    backgroundColor: COLORS[index],
                  }}
                ></span>

                <span>{item.name}</span>

                <span>₹{item.value}</span>
              </div>
            ))}
          </div>
          {selectedCategory && (
            <div className="info-card">
              <div className="info-header">
                <span
                  className="info-dot"
                  style={{
                    backgroundColor:
                      COLORS[
                        expensedata.findIndex(
                          (item) => item.name === selectedCategory.name,
                        )
                      ],
                  }}
                ></span>
                <h4>{selectedCategory.name}</h4>
              </div>

              <div className="info-value">₹{selectedCategory.Value}</div>

              <div className="info-percentage">
                {((selectedCategory.Value / total) * 100).toFixed(1)}% of total
                expenses
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ExpenseChart;
