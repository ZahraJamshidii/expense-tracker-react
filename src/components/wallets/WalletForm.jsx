import { useEffect, useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  addWallet,
  updateWallet,
  clearEditingWallet,
} from "../../features/wallets/walletSlice";

function WalletForm() {
  const dispatch = useDispatch();

  const editingWallet = useSelector(
    (state) => state.wallets.editingWallet
  );

  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    if (editingWallet) {
      setName(editingWallet.name);
      setBalance(editingWallet.balance);
    } else {
      setName("");
      setBalance("");
    }
  }, [editingWallet]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !balance) return;

    if (editingWallet) {
      dispatch(
        updateWallet({
          id: editingWallet.id,
          name,
          balance: Number(balance),
        })
      );

      dispatch(clearEditingWallet());
    } else {
      dispatch(
        addWallet({
          id: Date.now(),
          name,
          balance: Number(balance),
        })
      );
    }

    setName("");
    setBalance("");
  }

  return (
    <form
      id="wallet-form"
      onSubmit={handleSubmit}
      className="theme-card rounded-xl shadow-md p-6 mb-8"
    >
      <h2 className="theme-title text-2xl font-bold mb-5">
        {editingWallet
          ? "Update Wallet"
          : "Add Wallet"}
      </h2>

      <input
        type="text"
        placeholder="Wallet Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 p-3 rounded-lg border theme-card theme-text"
        style={{
          borderColor: "rgba(148,163,184,.25)",
        }}
      />

      <input
        type="number"
        placeholder="Initial Balance"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
        className="w-full mb-5 p-3 rounded-lg border theme-card theme-text"
        style={{
          borderColor: "rgba(148,163,184,.25)",
        }}
      />

      <button
        className="theme-button px-6 py-3 rounded-lg transition hover:brightness-95"
      >
        {editingWallet
          ? "Update Wallet"
          : "Add Wallet"}
      </button>
    </form>
  );
}

export default WalletForm;