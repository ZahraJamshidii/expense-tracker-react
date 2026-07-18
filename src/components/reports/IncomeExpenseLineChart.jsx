import useFinance from "../../hooks/useFinance";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function IncomeExpenseLineChart() {
  const { transactions } = useFinance();

  const groupedData = {};

  transactions.forEach((transaction) => {
    if (!groupedData[transaction.date]) {
      groupedData[transaction.date] = {
        date: transaction.date,
        income: 0,
        expense: 0,
      };
    }

    if (transaction.type === "income") {
      groupedData[transaction.date].income +=
        transaction.amount;
    } else {
      groupedData[transaction.date].expense +=
        transaction.amount;
    }
  });

  const data = Object.values(groupedData).sort(
    (a, b) =>
      new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Income & Expense Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#10B981"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#EF4444"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default IncomeExpenseLineChart;