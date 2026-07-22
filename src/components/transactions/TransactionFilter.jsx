import useFinance from "../../hooks/useFinance";

function TransactionFilter() {
  const {
    searchText,
    setSearchText,

    categories,

    selectedCategory,
    setSelectedCategory,

    selectedType,
    setSelectedType,

    fromDate,
    setFromDate,

    toDate,
    setToDate,
  } = useFinance();

  const inputClass =
    "w-full rounded-lg p-3 border theme-card theme-text";

  const inputStyle = {
    borderColor: "rgba(148,163,184,.25)",
  };

  return (
    <div className="theme-card rounded-xl shadow-md p-5 mb-6">

      {/* Search */}

      <input
        type="text"
        placeholder="Search by title or amount..."
        value={searchText}
        onChange={(e) =>
          setSearchText(e.target.value)
        }
        className={inputClass}
        style={inputStyle}
      />

      {/* Category */}

      <div className="mt-4">

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
          className={inputClass}
          style={inputStyle}
        >
          <option value="All">
            All Categories
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

      </div>

      {/* Type */}

      <div className="mt-4">

        <select
          value={selectedType}
          onChange={(e) =>
            setSelectedType(e.target.value)
          }
          className={inputClass}
          style={inputStyle}
        >
          <option value="All">
            All Types
          </option>

          <option value="income">
            Income
          </option>

          <option value="expense">
            Expense
          </option>

        </select>

      </div>

      {/* From Date */}

      <div className="mt-4">

        <label className="theme-title block mb-2">
          From Date
        </label>

        <input
          type="date"
          value={fromDate}
          onChange={(e) =>
            setFromDate(e.target.value)
          }
          className={inputClass}
          style={inputStyle}
        />

      </div>

      {/* To Date */}

      <div className="mt-4">

        <label className="theme-title block mb-2">
          To Date
        </label>

        <input
          type="date"
          value={toDate}
          onChange={(e) =>
            setToDate(e.target.value)
          }
          className={inputClass}
          style={inputStyle}
        />

      </div>

    </div>
  );
}

export default TransactionFilter;