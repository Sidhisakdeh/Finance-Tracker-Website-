import { Search, Filter, RotateCcw } from "lucide-react";
import { useFinance } from "../contexts/FinanceContext";

const categories = [
  "All",
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills",
  "Salary",
  "Investment",
  "Healthcare",
  "Other",
];

export default function CategoryFilter() {
  const { filters, setFilters } = useFinance();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "All",
      type: "All",
      sort: "Newest",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title mb-4">
          <Filter className="w-5 h-5 text-primary" />
          Filters
        </h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* Search */}

          <div>
            <label className="label">
              <span className="label-text">Search</span>
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <Search size={18} />

              <input
                type="text"
                className="grow"
                placeholder="Search title..."
                name="search"
                value={filters.search}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Category */}

          <div>
            <label className="label">
              <span className="label-text">Category</span>
            </label>

            <select
              className="select select-bordered w-full"
              name="category"
              value={filters.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Type */}

          <div>
            <label className="label">
              <span className="label-text">Type</span>
            </label>

            <select
              className="select select-bordered w-full"
              name="type"
              value={filters.type}
              onChange={handleChange}
            >
              <option value="All">All</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          {/* Sort */}

          <div>
            <label className="label">
              <span className="label-text">Sort</span>
            </label>

            <select
              className="select select-bordered w-full"
              name="sort"
              value={filters.sort}
              onChange={handleChange}
            >
              <option value="Newest">Newest First</option>

              <option value="Oldest">Oldest First</option>
            </select>
          </div>
          {/* Date range */}
          <div>
            <label className="label">
              <span className="label-text">From</span>
            </label>

            <input
              type="date"
              className="input input-bordered w-full"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">To</span>
            </label>

            <input
              type="date"
              className="input input-bordered w-full"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Footer */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
          <div className="text-sm opacity-70">
            Filters update the transaction list instantly.
          </div>

          <button onClick={resetFilters} className="btn btn-outline btn-sm">
            <RotateCcw size={16} />
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
