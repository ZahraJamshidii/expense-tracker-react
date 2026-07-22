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
    <div className="theme-card rounded-2xl shadow-lg p-6 mt-8">

      <h2 className="theme-title text-2xl font-bold mb-6">
        Income & Expense Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart data={data}>

          <CartesianGrid
            stroke="rgba(148,163,184,.25)"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="date"
            tick={{
              fill: "var(--text)",
            }}
          />

          <YAxis
            tick={{
              fill: "var(--text)",
            }}
          />

          <Tooltip
            contentStyle={{
              background: "var(--card)",
              border: "1px solid rgba(148,163,184,.2)",
              color: "var(--text)",
            }}
            labelStyle={{
              color: "var(--text)",
            }}
          />

          <Legend
            wrapperStyle={{
              color: "var(--text)",
            }}
          />

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