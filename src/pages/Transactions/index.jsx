import TransactionForm from "../../components/transactions/TransactionForm";
import TransactionList from "../../components/transactions/TransactionList";
import TransactionFilter from "../../components/transactions/TransactionFilter";
import ExportButtons from "../../components/Export/ExportButtons";

function Transactions() {
  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="theme-title text-4xl font-bold">
          Transactions
        </h1>

        <ExportButtons />

      </div>

      <TransactionForm />

      <TransactionFilter />

      <TransactionList />

    </div>
  );
}

export default Transactions;