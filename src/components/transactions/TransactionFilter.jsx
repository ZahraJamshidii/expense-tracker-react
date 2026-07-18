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

  return (

    <div className="bg-white rounded-xl shadow-md p-5 mb-6">

      <input
        type="text"
        placeholder="Search by title or amount..."
        value={searchText}
        onChange={(e) =>
          setSearchText(e.target.value)
        }
        className="w-full border rounded-lg p-3"
      />

        <div className="mt-4">

            <select
                        value={selectedCategory}
                        onChange={(e) =>
                        setSelectedCategory(e.target.value)
                        }
                        className="w-full border rounded-lg p-3"
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

                    <div className="mt-4">

            <select
                value={selectedType}
                onChange={(e) =>
                setSelectedType(e.target.value)
                }
                className="w-full border rounded-lg p-3"
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

        <div className="mt-4">

      <label className="block mb-2">
        From Date
      </label>

      <input
        type="date"
        value={fromDate}
        onChange={(e) =>
          setFromDate(e.target.value)
        }
        className="w-full border rounded-lg p-3"
      />

    </div>

    <div className="mt-4">

      <label className="block mb-2">
        To Date
      </label>

      <input
        type="date"
        value={toDate}
        onChange={(e) =>
          setToDate(e.target.value)
        }
        className="w-full border rounded-lg p-3"
      />

    </div>
    </div>

  );

}

export default TransactionFilter;