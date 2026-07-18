import TransactionForm from "../../components/transactions/TransactionForm";
import TransactionList from "../../components/transactions/TransactionList";
import TransactionFilter from "../../components/transactions/TransactionFilter";

function Transactions() {
  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Transactions
      </h1>

      <TransactionForm />
      <TransactionFilter />
      <TransactionList />

    </div>
  );
}

export default Transactions;