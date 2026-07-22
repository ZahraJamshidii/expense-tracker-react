import WalletForm from "../../components/wallets/WalletForm";
import TransferForm from "../../components/wallets/TransferForm";

import { useDispatch, useSelector } from "react-redux";

import {
  deleteWallet,
  setEditingWallet,
} from "../../features/wallets/walletSlice";

function Wallets() {
  const dispatch = useDispatch();

  const wallets = useSelector(
    (state) => state.wallets.wallets
  );

  return (
    <div>
      <h1 className="theme-title text-4xl font-bold mb-8">
        Wallets
      </h1>

      <WalletForm />

      <TransferForm />

      <div className="space-y-4">
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            className="theme-card rounded-xl shadow-md p-5 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">

              <div>

                <h2 className="theme-title text-xl font-bold">
                  {wallet.name}
                </h2>

                <p className="theme-muted mt-1">
                  Balance
                </p>

                <p
                  className="theme-title text-2xl font-bold"
                  style={{
                    color: "var(--primary)",
                  }}
                >
                  ${wallet.balance.toLocaleString()}
                </p>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => {
                    dispatch(setEditingWallet(wallet));

                    document
                      .getElementById("wallet-form")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }}
                  className="text-white px-4 py-2 rounded-lg transition hover:brightness-90"
                  style={{
                    background: "#F59E0B",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    dispatch(deleteWallet(wallet.id))
                  }
                  className="text-white px-4 py-2 rounded-lg transition hover:brightness-90"
                  style={{
                    background: "#EF4444",
                  }}
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wallets;