import useFinance from "../../hooks/useFinance";
import RecentTransactionItem from "./RecentTransactionItem";

function RecentTransactions() {
  const { transactions } = useFinance();

  const recentTransactions = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .slice(0, 5);

  return (
    <div className="mt-10">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Recent Transactions
        </h2>

        <span className="text-gray-500 text-sm">
          Last 5 records
        </span>

      </div>

      {recentTransactions.length === 0 ? (

        <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
          No transactions found
        </div>

      ) : (

        <div className="space-y-4">

          {recentTransactions.map((transaction) => (

            <RecentTransactionItem
              key={transaction.id}
              transaction={transaction}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default RecentTransactions;