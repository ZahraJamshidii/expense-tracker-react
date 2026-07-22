import {
  FaFileCsv,
  FaFilePdf,
  FaFileImport,
} from "react-icons/fa";

import useFinance from "../../hooks/useFinance";
import { exportTransactionsToCSV } from "../../utils/exportCSV";
import { exportTransactionsToPDF } from "../../utils/exportPDF";
import { importTransactionsFromCSV } from "../../utils/importCSV";


function ExportButtons() {
const {
  transactions,
  totalIncome,
  totalExpense,
  balance,
  addTransactions,
} = useFinance();

function handleImport(event) {
  const file = event.target.files[0];

  if (!file) return;

  importTransactionsFromCSV(
    file,
    addTransactions
  );
}

  return (
    <div className="flex flex-wrap items-center gap-3">

    <>
    <label
        htmlFor="csv-import"
        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg cursor-pointer transition"
    >
        <FaFileImport />
        Import CSV
    </label>

    <input
        id="csv-import"
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleImport}
    />
    </>

      <button
        onClick={() =>
          exportTransactionsToCSV(transactions)
        }
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
      >
        <FaFileCsv />
        Export CSV
      </button>

        <button
        onClick={() =>
            exportTransactionsToPDF(
            transactions,
            totalIncome,
            totalExpense,
            balance
            )
        }
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
        >
        <FaFilePdf />
        Export PDF
        </button>

    </div>
  );
}

export default ExportButtons;