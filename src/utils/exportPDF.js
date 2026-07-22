import jsPDF from "jspdf";

export function exportTransactionsToPDF(
  transactions,
  totalIncome,
  totalExpense,
  balance
) {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Expense Tracker Report", 20, 20);

  doc.setFontSize(12);

  let y = 40;

  transactions.forEach((transaction) => {
    doc.text(
      `${transaction.title} | ${transaction.type} | $${transaction.amount}`,
      20,
      y
    );

    y += 10;

    doc.text(
      `${transaction.category} | ${transaction.date}`,
      25,
      y
    );

    y += 12;

    // اگر صفحه پر شد
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  y += 10;

  doc.setFontSize(14);

  doc.text(
    `Total Income : $${totalIncome}`,
    20,
    y
  );

  y += 10;

  doc.text(
    `Total Expense : $${totalExpense}`,
    20,
    y
  );

  y += 10;

  doc.text(
    `Balance : $${balance}`,
    20,
    y
  );

  doc.save("Expense_Report.pdf");
}