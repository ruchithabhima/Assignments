// ExpenseChart.jsx

import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "../styles/DashboardStyles.css";
function ExpenseChart({ expenseList }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoryTotals = {};

  expenseList.forEach((expense) => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += Number(expense.amount);
    } else {
      categoryTotals[expense.category] = Number(expense.amount);
    }
  });

  const chartData = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));
  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const handlePieClick = (data, index) => {
    console.log(data);
    console.log(chartData[index]);

    setSelectedCategory(chartData[index]);
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
              data={chartData}
              dataKey="value"
              innerRadius={60}
              outerRadius={90}
            >
              {chartData.map((entry, index) => (
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
            {chartData.map((item, index) => (
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
                        chartData.findIndex(
                          (item) => item.name === selectedCategory.name,
                        )
                      ],
                  }}
                ></span>
                <h4>{selectedCategory.name}</h4>
              </div>

              <div className="info-value">₹{selectedCategory.value}</div>

              <div className="info-percentage">
                {((selectedCategory.value / total) * 100).toFixed(1)}% of total
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
