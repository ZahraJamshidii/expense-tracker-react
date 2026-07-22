import useFinance from "../../hooks/useFinance";
import TransactionItem from "./TransactionItem";

function TransactionList() {
  const {
    transactions,
    searchText,
    selectedCategory,
    selectedType,
    fromDate,
    toDate,
  } = useFinance();

  const filteredTransactions = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .filter((transaction) => {

      const titleMatch =
        transaction.title
          .toLowerCase()
          .includes(searchText.toLowerCase());

      const amountMatch =
        transaction.amount
          .toString()
          .includes(searchText);

      const categoryMatch =
        selectedCategory === "All" ||
        transaction.category === selectedCategory;

      const typeMatch =
        selectedType === "All" ||
        transaction.type === selectedType;

      const transactionDate = new Date(transaction.date);

      const fromMatch =
        !fromDate ||
        transactionDate >= new Date(fromDate);

      const toMatch =
        !toDate ||
        transactionDate <= new Date(toDate);

      return (
        (titleMatch || amountMatch) &&
        categoryMatch &&
        typeMatch &&
        fromMatch &&
        toMatch
      );
    });

  return (
    <div className="mt-10">

      <div className="flex justify-between items-center mb-5">

        <h2 className="theme-title text-2xl font-bold">
          All Transactions
        </h2>

        <span className="theme-muted">
          {filteredTransactions.length} Transactions
        </span>

      </div>

      {filteredTransactions.length === 0 ? (

        <div className="theme-card rounded-xl shadow-md p-10 text-center">

          <p className="theme-muted text-lg">
            No transactions found
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {filteredTransactions.map((transaction) => (

            <TransactionItem
              key={transaction.id}
              transaction={transaction}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default TransactionList;