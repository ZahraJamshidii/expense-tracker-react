import { FaTrash, FaEdit } from "react-icons/fa";
import useFinance from "../../hooks/useFinance";

function TransactionItem({ transaction }) {
  const {
    deleteTransaction,
    setEditingTransaction,
  } = useFinance();

  const isIncome =
    transaction.type === "income";

  function handleEdit() {
    setEditingTransaction(transaction);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="theme-card rounded-xl shadow-md p-5 flex justify-between items-center transition hover:shadow-lg">

      {/* Left */}

      <div>

        <h3 className="theme-title text-lg font-bold">
          {transaction.title}
        </h3>

        <p className="theme-muted">
          {transaction.category}
        </p>

        <p className="theme-soft text-sm">
          {transaction.date}
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        <span
          className="text-xl font-bold"
          style={{
            color: isIncome
              ? "#22C55E"
              : "#EF4444",
          }}
        >
          {isIncome ? "+" : "-"}$
          {transaction.amount.toLocaleString()}
        </span>

        <button
          onClick={handleEdit}
          title="Edit Transaction"
          className="w-10 h-10 rounded-lg flex items-center justify-center transition hover:brightness-95"
          style={{
            background: "#F59E0B",
            color: "white",
          }}
        >
          <FaEdit />
        </button>

        <button
          onClick={() =>
            deleteTransaction(transaction.id)
          }
          title="Delete Transaction"
          className="w-10 h-10 rounded-lg flex items-center justify-center transition hover:brightness-95"
          style={{
            background: "#EF4444",
            color: "white",
          }}
        >
          <FaTrash />
        </button>

      </div>

    </div>
  );
}

export default TransactionItem;