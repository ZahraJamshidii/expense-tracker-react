function RecentTransactionItem({ transaction }) {

  const isIncome =
    transaction.type === "income";

  return (

    <div className="theme-card rounded-xl shadow-md p-5 flex justify-between items-center">

      <div>

        <h3 className="theme-title font-bold text-lg">
          {transaction.title}
        </h3>

        <p className="theme-muted">
          {transaction.category}
        </p>

        <p className="theme-soft text-sm">
          {transaction.date}
        </p>

      </div>

      <span
        className={`text-xl font-bold ${
          isIncome
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {isIncome ? "+" : "-"}$
        {transaction.amount.toLocaleString()}
      </span>

    </div>

  );
}

export default RecentTransactionItem;