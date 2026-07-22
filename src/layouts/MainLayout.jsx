import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function MainLayout() {

    const mode = useSelector(
      (state) => state.theme.mode
    );

    useEffect(() => {
      document.body.className = mode;
    }, [mode]);

  return (
    <div className="theme-page flex min-h-screen">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Navbar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default MainLayout;