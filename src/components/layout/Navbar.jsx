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
      <header
        className="flex items-center justify-between px-6 py-4 transition-all duration-300 shadow-sm"
          style={{
            background: "var(--card)",
            color: "var(--text)",
            borderBottom: "1px solid rgba(148,163,184,.15)",
            boxShadow: "0 2px 10px rgba(0,0,0,.08)",
          }}
      >

      <h2 className="theme-title text-xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-5">

        <div className="text-right">

          <p
                className="font-semibold"
                style={{
                  color: "var(--text)",
                }}
              >
            {currentUser?.name}
          </p>

          <p
            style={{
              color: "var(--text)",
              opacity: .82,
              fontSize: "14px",
            }}
          >
            {currentUser?.email}
          </p>

        </div>

<button
  onClick={handleLogout}
  className="
    text-white
    px-5
    py-2
    rounded-lg
    transition-all
    duration-300
    hover:scale-105
  "
  style={{
    backgroundColor: "#f97316", // نارنجی
    boxShadow: "0 6px 18px rgba(249,115,22,.35)",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c2410c")}
  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f97316")}
>
  Logout
</button>

      </div>

    </header>
  );
}

export default Navbar;