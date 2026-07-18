import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

function Navbar() {
  const navigate = useNavigate();

  const {
    currentUser,
    logout,
  } = useUser();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4">

      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-5">

        <div className="text-right">

          <p className="font-semibold">
            {currentUser?.name}
          </p>

          <p className="text-sm text-gray-500">
            {currentUser?.email}
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;