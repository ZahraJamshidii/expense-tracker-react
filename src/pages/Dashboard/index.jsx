import SummarySection from "../../components/dashboard/SummarySection";
import RecentTransactions from "../../components/dashboard/RecentTransactions";

function Dashboard() {
  return (
    <section className="space-y-10">

      <header>

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's your financial overview.
        </p>

      </header>

      <SummarySection />

      <RecentTransactions />

    </section>
  );
}

export default Dashboard;