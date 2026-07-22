import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import useFinance from "../../hooks/useFinance";

import {
  increaseBalance,
  decreaseBalance,
} from "../../features/wallets/walletSlice";

function TransactionForm() {
  const {
    addTransaction,
    categories,
    updateTransaction,
    editingTransaction,
    cancelEditing,
  } = useFinance();

  const dispatch = useDispatch();

  const wallets = useSelector(
    (state) => state.wallets.wallets
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (editingTransaction) {
      setValue("title", editingTransaction.title);
      setValue("amount", editingTransaction.amount);
      setValue("type", editingTransaction.type);
      setValue("category", editingTransaction.category);
      setValue("walletId", editingTransaction.walletId);
      setValue("date", editingTransaction.date);
    } else {
      reset();
    }
  }, [editingTransaction, setValue, reset]);

  function onSubmit(data) {
    const transaction = {
      ...data,
      amount: Number(data.amount),
      walletId: Number(data.walletId),
    };

    const selectedWallet = wallets.find(
      (wallet) => wallet.id === transaction.walletId
    );

    if (transaction.type === "expense") {
      if (selectedWallet.balance < transaction.amount) {
        toast.error(
          "Insufficient balance in selected wallet."
        );
        return;
      }

      dispatch(
        decreaseBalance({
          walletId: transaction.walletId,
          amount: transaction.amount,
        })
      );
    }

    if (transaction.type === "income") {
      dispatch(
        increaseBalance({
          walletId: transaction.walletId,
          amount: transaction.amount,
        })
      );
    }

    if (editingTransaction) {
      updateTransaction({
        ...transaction,
        id: editingTransaction.id,
      });
    } else {
      addTransaction({
        id: uuid(),
        ...transaction,
      });
    }

    reset();
    cancelEditing();
  }

  const inputClass =
    "w-full rounded-lg p-3 border theme-card theme-text";

  const inputStyle = {
    borderColor: "rgba(148,163,184,.25)",
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="theme-card rounded-2xl shadow-lg p-8 mb-8"
    >
      <h2 className="theme-title text-2xl font-bold mb-6">
        {editingTransaction
          ? "Edit Transaction"
          : "Add Transaction"}
      </h2>

      {/* Title */}

      <div className="mb-4">
        <label className="theme-title block mb-2">
          Title
        </label>

        <input
          type="text"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Minimum 3 characters",
            },
          })}
          className={inputClass}
          style={inputStyle}
        />

        {errors.title && (
          <p className="text-red-500 text-sm mt-2">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Amount */}

      <div className="mb-4">
        <label className="theme-title block mb-2">
          Amount
        </label>

        <input
          type="number"
          {...register("amount", {
            required: "Amount is required",
            min: 1,
          })}
          className={inputClass}
          style={inputStyle}
        />

        {errors.amount && (
          <p className="text-red-500 text-sm mt-2">
            {errors.amount.message}
          </p>
        )}
      </div>

      {/* Type */}

      <div className="mb-4">
        <label className="theme-title block mb-2">
          Type
        </label>

        <select
          {...register("type", {
            required: true,
          })}
          className={inputClass}
          style={inputStyle}
        >
          <option value="">
            Select Type
          </option>

          <option value="income">
            Income
          </option>

          <option value="expense">
            Expense
          </option>
        </select>
      </div>

      {/* Category */}

      <div className="mb-4">
        <label className="theme-title block mb-2">
          Category
        </label>

        <select
          {...register("category", {
            required: "Category is required",
          })}
          className={inputClass}
          style={inputStyle}
        >
          <option value="">
            Select Category
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.name}
            >
              {category.name}
            </option>
          ))}
        </select>

        {errors.category && (
          <p className="text-red-500 text-sm mt-2">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Wallet */}

      <div className="mb-4">
        <label className="theme-title block mb-2">
          Wallet
        </label>

        <select
          {...register("walletId", {
            required: "Wallet is required",
          })}
          className={inputClass}
          style={inputStyle}
        >
          <option value="">
            Select Wallet
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

        {errors.walletId && (
          <p className="text-red-500 text-sm mt-2">
            {errors.walletId.message}
          </p>
        )}
      </div>

      {/* Date */}

      <div className="mb-6">
        <label className="theme-title block mb-2">
          Date
        </label>

        <input
          type="date"
          {...register("date", {
            required: true,
          })}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div className="flex gap-3">

        <button
          type="submit"
          className="theme-button flex-1 py-3 rounded-lg transition hover:brightness-95"
        >
          {editingTransaction
            ? "Update Transaction"
            : "Add Transaction"}
        </button>

        {editingTransaction && (
          <button
            type="button"
            onClick={() => {
              cancelEditing();
              reset();
            }}
            className="px-6 rounded-lg transition hover:brightness-95"
            style={{
              background: "#64748B",
              color: "white",
            }}
          >
            Cancel
          </button>
        )}

      </div>

    </form>
  );
}

export default TransactionForm;