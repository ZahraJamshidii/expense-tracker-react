import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/theme/themeSlice";
import { toast } from "react-toastify";
import useFinance from "../../hooks/useFinance";

function Settings() {
  const dispatch = useDispatch();

  const mode = useSelector(
    (state) => state.theme.mode
  );

  const { resetAllData } = useFinance();

  function handleReset() {

  const confirmed = window.confirm(
    "Are you sure you want to reset all application data?"
  );

  if (!confirmed) return;

  localStorage.removeItem("wallets");
  localStorage.removeItem("transactions");
  localStorage.removeItem("categories");

  toast.success("All data has been reset.");

  setTimeout(() => {
    window.location.reload();
  }, 1000);

}

  return (
    <div>
      <h1 className="theme-title text-4xl font-bold mb-8">
        Settings
      </h1>

      <div className="theme-card rounded-2xl shadow-xl p-10 max-w-4xl">

        <h2 className="theme-title text-2xl font-bold mb-8">
          Select Theme
        </h2>

        <div className="theme-card rounded-2xl shadow-md p-8 max-w-2xl">

          <h3 className="theme-title text-3xl font-bold mb-8">
            Appearance
          </h3>

          <div className="flex items-center justify-between gap-10">

            <div>

              <p className="theme-title text-xl font-semibold">
                Theme
              </p>

              <p
                style={{
                  color: "var(--text)",
                  opacity: 0.9,
                  marginTop: "10px",
                }}
              >
                Switch between Light and Dark mode
              </p>

            </div>

            <button
              onClick={() => dispatch(toggleTheme())}
              className="bg-blue-600 hover:bg-blue-700
                         text-white text-lg px-8 py-4 rounded-xl
                         transition whitespace-nowrap"
            >
              {mode === "light"
                ? "🌙 Dark Mode"
                : "☀️ Light Mode"}
            </button>

          </div>

        </div>

      </div>


        <div className="theme-card rounded-2xl shadow-xl p-10 max-w-4xl mt-8">

  <h3 className="theme-title text-3xl font-bold mb-8">
    Danger Zone
  </h3>

  <div className="flex items-center justify-between">

    <div>

      <p className="theme-title text-xl font-semibold">
        Reset All Data
      </p>

      <p className="theme-muted mt-2">
        Delete all transactions and categories.
      </p>

    </div>

    <button
      onClick={() => {
        if (
          window.confirm(
            "Are you sure? This action cannot be undone."
          )
        ) {
          resetAllData();
          toast.success("All data has been reset.");
        }
      }}
      className="bg-purple-600 hover:bg-purple-800 text-white text-lg px-8 py-3 rounded-xl transition"
    >
      Reset
    </button>

  </div>

</div>

    </div>



  );
}

export default Settings;