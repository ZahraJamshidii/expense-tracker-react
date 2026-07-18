import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import expenseChartData from "../../constants/expenseChartData";

const COLORS = [
  "#2563eb",
  "#22c55e",
  "#f97316",
  "#a855f7",
];


function ExpenseChart() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Expense by Category
      </h2>

      <div className="h-80">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={expenseChartData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
            >

              {expenseChartData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />

              ))}

            </Pie>

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ExpenseChart;