export function importTransactionsFromCSV(
  file,
  addTransactions
) {
  const reader = new FileReader();

  reader.onload = (event) => {
    const csv = event.target.result;

    const rows = csv.split("\n");

    // حذف Header
    rows.shift();

    const transactions = rows
      .filter((row) => row.trim() !== "")
      .map((row) => {
        const [
          title,
          amount,
          type,
          category,
          date,
        ] = row.split(",");

            return {
            id: Date.now() + Math.random(),
            title: title.replace(/"/g, "").trim(),
            amount: Number(amount.replace(/"/g, "").trim()),
            type: type.replace(/"/g, "").trim(),
            category: category.replace(/"/g, "").trim(),
            date: date.replace(/"/g, "").trim(),
            };
      });

    addTransactions(transactions);
  };

  reader.readAsText(file);
}