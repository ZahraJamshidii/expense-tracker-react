import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaPiggyBank,
} from "react-icons/fa";

import SummaryCard from "./SummaryCard";
import useFinance from "../../hooks/useFinance";

function SummarySection() {
  const {
    balance,
    totalIncome,
    totalExpense,
  } = useFinance();

  const saving = balance > 0 ? balance : 0;

  const dashboardCards = [
    {
      title: "Balance",
      amount: `$${balance.toLocaleString()}`,
      icon: FaWallet,
      color: "bg-blue-500",
      change: "Live",
    },
    {
      title: "Income",
      amount: `$${totalIncome.toLocaleString()}`,
      icon: FaArrowUp,
      color: "bg-green-500",
      change: "Live",
    },
    {
      title: "Expense",
      amount: `$${totalExpense.toLocaleString()}`,
      icon: FaArrowDown,
      color: "bg-red-500",
      change: "Live",
    },
    {
      title: "Saving",
      amount: `$${saving.toLocaleString()}`,
      icon: FaPiggyBank,
      color: "bg-purple-500",
      change: "Live",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {dashboardCards.map((card) => (
        <SummaryCard
          key={card.title}
          {...card}
        />
      ))}
    </div>
  );
}

export default SummarySection;