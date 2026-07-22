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

  const [categoryName, setCategoryName] = useState("");

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

      <h1 className="theme-title text-4xl font-bold mb-8">
        Categories
      </h1>

      {/* Add Category */}

      <form
        onSubmit={handleSubmit}
        className="theme-card rounded-2xl shadow-md p-6 mb-8"
      >

        <h2 className="theme-title text-2xl font-semibold mb-5">
          {editingCategory ? "Edit Category" : "Add New Category"}
        </h2>

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="flex-1 rounded-lg p-3 theme-card theme-text border"
            style={{
              borderColor: "rgba(148,163,184,.25)",
            }}
          />

          <div className="flex gap-3">

            <button
              type="submit"
              className="text-white px-6 rounded-lg transition hover:brightness-90"
              style={{
                background: "var(--primary)",
              }}
            >
              {editingCategory ? "Update" : "Add"}
            </button>

            {editingCategory && (
              <button
                type="button"
                onClick={() => setEditingCategory(null)}
                className="theme-card theme-title px-6 rounded-lg border"
                style={{
                  borderColor: "rgba(148,163,184,.25)",
                }}
              >
                Cancel
              </button>
            )}

          </div>

        </div>

      </form>

      {/* Categories List */}

      <div className="theme-card rounded-2xl shadow-md p-6">

        <h2 className="theme-title text-2xl font-semibold mb-5">
          Categories List
        </h2>

        <div className="space-y-3">

          {categories.map((category) => (

            <div
              key={category.id}
              className="theme-card border rounded-lg p-4 flex justify-between items-center"
              style={{
                borderColor: "rgba(148,163,184,.25)",
              }}
            >

              <span className="theme-title font-medium">
                {category.name}
              </span>

              <div className="flex gap-3">

                <button
                  onClick={() => setEditingCategory(category)}
                  className="text-blue-500 hover:text-blue-700 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCategory(category.id)}
                  className="text-red-500 hover:text-red-700 transition"
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