import useFinance from "./useFinance";

function useSummary() {
  const { transactions } = useFinance();

  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - expense;

  const saving = balance;

  return {
    income,
    expense,
    balance,
    saving,
  };
}

export default useSummary;