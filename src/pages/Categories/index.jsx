import { useEffect, useState } from "react";
import useFinance from "../../hooks/useFinance";

function Categories() {
  const {
  categories,
  addCategory,
  deleteCategory,
  updateCategory,
  editingCategory,
  setEditingCategory,
} = useFinance();

  const [categoryName, setCategoryName] =
    useState("");

  useEffect(() => {
    if (editingCategory) {
      setCategoryName(editingCategory.name);
    } else {
      setCategoryName("");
    }
  }, [editingCategory]);

function handleSubmit(e) {
  e.preventDefault();

  const trimmed = categoryName.trim();

  if (!trimmed) return;

  if (editingCategory) {
    updateCategory({
      id: editingCategory.id,
      name: trimmed,
    });
  } else {
  const result = addCategory(trimmed);

  if (!result.success) {
    alert(result.message);
    return;
  }
  }

  setCategoryName("");
}

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Categories
      </h1>

      {/* Add Category */}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-6 mb-8"
      >

        <h2 className="text-2xl font-semibold mb-5">
          Add New Category
        </h2>

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) =>
              setCategoryName(e.target.value)
            }
            className="flex-1 border rounded-lg p-3"
          />

<div className="flex gap-3">

  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
  >
    {editingCategory ? "Update" : "Add"}
  </button>

  {editingCategory && (
    <button
      type="button"
      onClick={() =>
        setEditingCategory(null)
      }
      className="bg-gray-300 px-6 rounded-lg"
    >
      Cancel
    </button>
  )}

</div>

        </div>

      </form>

      {/* Categories List */}

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-2xl font-semibold mb-5">
          Categories List
        </h2>

        <div className="space-y-3">

          {categories.map((category) => (

<div
  key={category.id}
  className="border rounded-lg p-4 flex justify-between items-center"
>

  <span className="font-medium">
    {category.name}
  </span>

  <div className="flex gap-3">

    <button
      onClick={() =>
        setEditingCategory(category)
      }
      className="text-blue-600 hover:text-blue-800"
    >
      Edit
    </button>

    <button
      onClick={() =>
        deleteCategory(category.id)
      }
      className="text-red-600 hover:text-red-800"
    >
      Delete
    </button>

  </div>

</div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Categories;