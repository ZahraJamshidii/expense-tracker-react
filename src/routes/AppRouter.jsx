import {
  createBrowserRouter,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Wallets from "../pages/Wallets";
import Reports from "../pages/Reports";
import Categories from "../pages/Categories";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const router = createBrowserRouter([
  {
  path: "/",
  element: (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  ),

    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "transactions",
        element: <Transactions />,
      },

      {
        path: "wallets",
        element: <Wallets />,
      },

      {
        path: "reports",
        element: <Reports />,
      },

      {
        path: "categories",
        element: <Categories />,
      },

      {
        path: "profile",
        element: <Profile />,
      },

      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;