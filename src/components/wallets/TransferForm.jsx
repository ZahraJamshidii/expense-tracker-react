import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transferMoney } from "../../features/wallets/walletSlice";

function TransferForm() {
  const dispatch = useDispatch();

  const wallets = useSelector(
    (state) => state.wallets.wallets
  );

  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!fromId || !toId || !amount) return;

    if (fromId === toId) {
      alert("Source and destination wallets must be different.");
      return;
    }

    dispatch(
      transferMoney({
        fromId: Number(fromId),
        toId: Number(toId),
        amount: Number(amount),
      })
    );

    setFromId("");
    setToId("");
    setAmount("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="theme-card rounded-xl shadow-md p-6 mb-8"
    >
      <h2 className="theme-title text-2xl font-bold mb-6">
        Transfer Money
      </h2>

      {/* From Wallet */}

      <select
        value={fromId}
        onChange={(e) => setFromId(e.target.value)}
        className="w-full rounded-lg p-3 mb-4 border theme-card theme-text"
        style={{
          borderColor: "rgba(148,163,184,.25)",
        }}
      >
        <option value="">
          From Wallet
        </option>

        {wallets.map((wallet) => (
          <option
            key={wallet.id}
            value={wallet.id}
          >
            {wallet.name}
          </option>
        ))}
      </select>

      {/* To Wallet */}

      <select
        value={toId}
        onChange={(e) => setToId(e.target.value)}
        className="w-full rounded-lg p-3 mb-4 border theme-card theme-text"
        style={{
          borderColor: "rgba(148,163,184,.25)",
        }}
      >
        <option value="">
          To Wallet
        </option>

        {wallets.map((wallet) => (
          <option
            key={wallet.id}
            value={wallet.id}
          >
            {wallet.name}
          </option>
        ))}
      </select>

      {/* Amount */}

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full rounded-lg p-3 mb-5 border theme-card theme-text"
        style={{
          borderColor: "rgba(148,163,184,.25)",
        }}
      />

      <button
        className="theme-button px-6 py-3 rounded-lg transition hover:brightness-95"
      >
        Transfer
      </button>
    </form>
  );
}

export default TransferForm;