import ExpensePieChart from "../../components/reports/ExpensePieChart";
import IncomeExpenseLineChart from "../../components/reports/IncomeExpenseLineChart";

function Reports() {
  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Reports
      </h1>

      <ExpensePieChart />

      <IncomeExpenseLineChart />

    </div>
  );
}

export default Reports;