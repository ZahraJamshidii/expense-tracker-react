import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import UserProvider from "./context/UserContext";

import "./index.css";

import router from "./routes/AppRouter";
import FinanceProvider from "./context/FinanceContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>

      <FinanceProvider>

        <RouterProvider router={router} />

      </FinanceProvider>

    </UserProvider>
  </StrictMode>
);