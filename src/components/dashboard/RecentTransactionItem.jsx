function RecentTransactionItem({ transaction }) {
  const isIncome =
    transaction.type === "income";

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center">

      <div>

        <h3 className="font-bold text-lg">
          {transaction.title}
        </h3>

        <p className="text-gray-500">
          {transaction.category}
        </p>

        <p className="text-gray-400 text-sm">
          {transaction.date}
        </p>

      </div>

      <span
        className={`text-xl font-bold ${
          isIncome
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {isIncome ? "+" : "-"}$
        {transaction.amount.toLocaleString()}
      </span>

    </div>
  );
}

export default RecentTransactionItem;