export function exportTransactionsToCSV(transactions) {
  if (!transactions.length) {
    alert("No transactions to export.");
    return;
  }

  const headers = [
    "Title",
    "Amount",
    "Type",
    "Category",
    "Date",
  ];

  const rows = transactions.map((item) => [
    item.title,
    item.amount,
    item.type,
    item.category,
    item.date,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "transactions.csv";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}