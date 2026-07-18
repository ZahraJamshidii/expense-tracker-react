import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import useFinance from "../../hooks/useFinance";

function TransactionForm() {
  const {
    addTransaction,
    categories,
    updateTransaction,
    editingTransaction,
    cancelEditing,
  } = useFinance();
  

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {
      errors,
      isValid,
    },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (editingTransaction) {
      setValue("title", editingTransaction.title);
      setValue("amount", editingTransaction.amount);
      setValue("type", editingTransaction.type);
      setValue("category", editingTransaction.category);
      setValue("date", editingTransaction.date);
    } else {
      reset();
    }
  }, [editingTransaction, setValue, reset]);

function onSubmit(data) {
  console.log("FORM SUBMITTED");
  console.log("Editing Transaction:", editingTransaction);
  console.log("Form Data:", data);

  const transaction = {
    ...data,
    amount: Number(data.amount),
  };

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
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold mb-6">
        {editingTransaction
          ? "Edit Transaction"
          : "Add Transaction"}
      </h2>

      {/* Title */}

      <div className="mb-4">
        <label className="block mb-2">
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
          className="w-full border rounded-lg p-3"
        />

        {errors.title && (
          <p className="text-red-500 text-sm mt-2">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Amount */}

      <div className="mb-4">
        <label className="block mb-2">
          Amount
        </label>

        <input
          type="number"
          {...register("amount", {
            required: "Amount is required",
            min: 1,
          })}
          className="w-full border rounded-lg p-3"
        />

        {errors.amount && (
          <p className="text-red-500 text-sm mt-2">
            {errors.amount.message}
          </p>
        )}
      </div>

      {/* Type */}

      <div className="mb-4">
        <label className="block mb-2">
          Type
        </label>

        <select
          {...register("type", {
            required: true,
          })}
          className="w-full border rounded-lg p-3"
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
        <label className="block mb-2">
          Category
        </label>

        <select
  {...register("category", {
    required: "Category is required",
  })}
  className="w-full border rounded-lg p-3"
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

      {/* Date */}

      <div className="mb-6">
        <label className="block mb-2">
          Date
        </label>

        <input
          type="date"
          {...register("date", {
            required: true,
          })}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="flex gap-3">

        <button
          type="submit"
          
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
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
            className="bg-gray-300 px-6 rounded-lg"
          >
            Cancel
          </button>
        )}

      </div>

    </form>
  );
}

export default TransactionForm;