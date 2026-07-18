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

      <div className="flex items-center gap-5">

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

        <button
          onClick={handleEdit}
          className="text-blue-500 hover:text-blue-700 transition"
          title="Edit Transaction"
        >
          <FaEdit />
        </button>

        <button
          onClick={() =>
            deleteTransaction(transaction.id)
          }
          className="text-red-500 hover:text-red-700 transition"
          title="Delete Transaction"
        >
          <FaTrash />
        </button>

      </div>

    </div>
  );
}

export default TransactionItem;