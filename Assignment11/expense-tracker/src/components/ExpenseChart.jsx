// ExpenseChart.jsx
import {expensedata} from "../data/expensedata";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

function ExpenseChart() {
    const total = expensedata.reduce(
  (sum, item) => sum + item.value,
  0
);
const COLORS = [
  "#14b8a6",
  "#38bdf8",
  "#fbbf24",
  "#fb923c",
  "#a855f7",
  "#d1d5db"
];
  return (
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
          dataKey="value"
          innerRadius={60}
          outerRadius={90}
        >
          {expensedata.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

      </PieChart>
    </ResponsiveContainer>
  );
}

export default ExpenseChart;