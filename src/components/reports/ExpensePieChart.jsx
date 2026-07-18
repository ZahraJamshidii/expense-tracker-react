import useFinance from "../../hooks/useFinance";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#EF4444",
  "#F59E0B",
  "#8B5CF6",
  "#06B6D4",
  "#EC4899",
];

function ExpensePieChart() {
  const { transactions } = useFinance();

  const expenses = transactions.filter(
    (item) => item.type === "expense"
  );

  const categoryTotals = {};

  expenses.forEach((item) => {
    if (categoryTotals[item.category]) {
      categoryTotals[item.category] += item.amount;
    } else {
      categoryTotals[item.category] = item.amount;
    }
  });

  const data = Object.entries(categoryTotals).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Expense By Category
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ExpensePieChart;