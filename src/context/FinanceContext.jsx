import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const FinanceContext = createContext();

const DEFAULT_TRANSACTIONS = [
  {
    id: 1,
    title: "Salary",
    amount: 2000,
    type: "income",
    category: "Job",
    date: "2026-07-01",
  },
  {
    id: 2,
    title: "Groceries",
    amount: 120,
    type: "expense",
    category: "Food",
    date: "2026-07-02",
  },
  {
    id: 3,
    title: "Internet",
    amount: 40,
    type: "expense",
    category: "Bills",
    date: "2026-07-03",
  },
];

const DEFAULT_CATEGORIES = [
  {
    id: 1,
    name: "Food",
  },
  {
    id: 2,
    name: "Shopping",
  },
  {
    id: 3,
    name: "Bills",
  },
  {
    id: 4,
    name: "Transport",
  },
];

function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");

    return saved
      ? JSON.parse(saved)
      : DEFAULT_TRANSACTIONS;
  });

  const [categories, setCategories] =
  useState(() => {
    const saved = localStorage.getItem(
      "categories"
    );

    return saved
      ? JSON.parse(saved)
      : DEFAULT_CATEGORIES;
  });

  const [users, setUsers] = useState(() => {
  const saved = localStorage.getItem("users");

  return saved ? JSON.parse(saved) : [];
});

const [currentUser, setCurrentUser] = useState(() => {
  const saved = localStorage.getItem("currentUser");

  return saved ? JSON.parse(saved) : null;
});

const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return !!localStorage.getItem("currentUser");
});

  const [editingTransaction, setEditingTransaction] =
    useState(null);

    const [editingCategory, setEditingCategory] =
      useState(null);

    const [searchText, setSearchText] =
      useState("");

    const [selectedCategory, setSelectedCategory] =
      useState("All");

    const [selectedType, setSelectedType] =
      useState("All");

    const [fromDate, setFromDate] =
      useState("");

    const [toDate, setToDate] =
      useState("");

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  useEffect(() => {
  localStorage.setItem(
    "categories",
    JSON.stringify(categories)
  );
}, [categories]);

useEffect(() => {
  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );
}, [users]);

useEffect(() => {
  if (currentUser) {
    localStorage.setItem(
      "currentUser",
      JSON.stringify(currentUser)
    );
  } else {
    localStorage.removeItem("currentUser");
  }
}, [currentUser]);

  function addTransaction(transaction) {
    setTransactions((prev) => [
      transaction,
      ...prev,
    ]);
  }

  function addTransactions(newTransactions) {
  setTransactions((prev) => [
    ...newTransactions,
    ...prev,
  ]);
}

function addCategory(categoryName) {

  const exists = categories.some(
    (category) =>
      category.name.toLowerCase() ===
      categoryName.toLowerCase()
  );

  if (exists) {
    return {
      success: false,
      message: "Category already exists.",
    };
  }

  const newCategory = {
    id: Date.now(),
    name: categoryName,
  };

  setCategories((prev) => [
    ...prev,
    newCategory,
  ]);

  return {
    success: true,
  };
}

function registerUser(user) {
  const exists = users.some(
    (item) =>
      item.email.toLowerCase() ===
      user.email.toLowerCase()
  );

  if (exists) {
    return {
      success: false,
      message: "Email already exists",
    };
  }

  const newUser = {
    id: Date.now(),
    ...user,
  };

  setUsers((prev) => [
    ...prev,
    newUser,
  ]);

  return {
    success: true,
  };
}

function loginUser(email, password) {
  const user = users.find(
    (item) =>
      item.email === email &&
      item.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  setCurrentUser(user);
  setIsLoggedIn(true);

  return {
    success: true,
  };
}

function logoutUser() {
  setCurrentUser(null);
  setIsLoggedIn(false);
}

function deleteCategory(id) {
  setCategories((prev) =>
    prev.filter((category) => category.id !== id)
  );

  if (editingCategory?.id === id) {
    setEditingCategory(null);
  }
}

function updateCategory(updatedCategory) {
  setCategories((prev) =>
    prev.map((category) =>
      category.id === updatedCategory.id
        ? updatedCategory
        : category
    )
  );

  setEditingCategory(null);
}

  function deleteTransaction(id) {
    setTransactions((prev) =>
      prev.filter((item) => item.id !== id)
    );

    if (editingTransaction?.id === id) {
      setEditingTransaction(null);
    }
  }

  function updateTransaction(updatedTransaction) {
    setTransactions((prev) =>
      prev.map((item) =>
        item.id === updatedTransaction.id
          ? updatedTransaction
          : item
      )
    );

    setEditingTransaction(null);
  }

  function cancelEditing() {
    setEditingTransaction(null);
  }

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance =
    totalIncome - totalExpense;


function resetAllData() {
  // برگرداندن اطلاعات به حالت اولیه
  setTransactions(DEFAULT_TRANSACTIONS);

  setCategories(DEFAULT_CATEGORIES);

  setEditingTransaction(null);
  setEditingCategory(null);

  setSearchText("");
  setSelectedCategory("All");
  setSelectedType("All");
  setFromDate("");
  setToDate("");

  // پاک کردن اطلاعات ذخیره شده
  localStorage.removeItem("transactions");
  localStorage.removeItem("categories");

  // اگر خواستی Wallet ها هم ریست شوند
  localStorage.removeItem("wallets");
}


  const value = useMemo(
    () => ({
      transactions,
      searchText,
      setSearchText,
      selectedCategory,
      setSelectedCategory,
      selectedType,
      setSelectedType,
      fromDate,
      setFromDate,
      toDate,
      setToDate,
      categories,
      users,
      currentUser,
      isLoggedIn,

      registerUser,
      loginUser,
      logoutUser,
      setCategories,
      addCategory,
      deleteCategory,
      updateCategory,

      editingCategory,
      setEditingCategory,
    

      addTransaction,
      addTransactions,
      deleteTransaction,
      updateTransaction,

      editingTransaction,
      setEditingTransaction,
      cancelEditing,

      totalIncome,
      totalExpense,
      balance,

      resetAllData,
    }),
    [
    transactions,
    categories,
    users,
    currentUser,
    isLoggedIn,
    editingCategory,
    searchText,
    selectedCategory,
    selectedType,
    editingTransaction,
    totalIncome,
    totalExpense,
    balance,
    fromDate,
    toDate,
  ] 
  );

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export default FinanceProvider;