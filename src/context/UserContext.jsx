import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
  // لیست کاربران
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");

    return saved ? JSON.parse(saved) : [];
  });

  // کاربر لاگین شده
  const [currentUser, setCurrentUser] =
    useState(() => {
      const saved =
        localStorage.getItem("currentUser");

      return saved
        ? JSON.parse(saved)
        : null;
    });

  // ذخیره کاربران
  useEffect(() => {
    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );
  }, [users]);

  // ذخیره کاربر فعال
  useEffect(() => {
    localStorage.setItem(
      "currentUser",
      JSON.stringify(currentUser)
    );
  }, [currentUser]);

  // ثبت نام
  function register(user) {
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

  // ورود
  function login(email, password) {
    const user = users.find(
      (item) =>
        item.email === email &&
        item.password === password
    );

    if (!user) {
      return {
        success: false,
        message: "Wrong email or password",
      };
    }

    setCurrentUser(user);

    return {
      success: true,
    };
  }

function updateProfile(updatedUser) {
  setUsers((prev) =>
    prev.map((user) =>
      user.id === updatedUser.id
        ? updatedUser
        : user
    )
  );

  setCurrentUser(updatedUser);
}

  // خروج
  function logout() {
    setCurrentUser(null);
  }

  function updateProfile(updatedUser) {

  setUsers((prev) =>
    prev.map((user) =>
      user.id === updatedUser.id
        ? updatedUser
        : user
    )
  );

  setCurrentUser(updatedUser);

}

const value = useMemo(
  () => ({
    users,
    currentUser,

    register,
    login,
    logout,
    updateProfile,
  }),
    [users, currentUser]
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;