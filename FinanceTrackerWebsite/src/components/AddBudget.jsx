import { useState, useEffect } from "react";
import { useFinance } from "../contexts/FinanceContext";

export default function AddBudget() {
  const { addBudget, categories } = useFinance();
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddBudget = (e) => {
    e.preventDefault();

    if (!category || Number(limit) <= 0)
      return alert("Please fill in the required field.");

    const success = addBudget({
      category,
      limit: Number(limit),
    });

    if (!success) {
      alert("A budget for this category already exists.");
      return;
    }
    setCategory("");
    setLimit("");
    setShowSuccess(true);
  };

  useEffect(() => {
    if (!showSuccess) return;

    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showSuccess]);

  return (
    <div className="card bg-base-100 border border-base-300 shadow-xl w-full max-w-lg mx-auto">
      <div className="card-body flex justify-center">
        <h2 className="card-title mb-2">Add New Budget</h2>
        <form onSubmit={handleAddBudget} className="flex flex-col gap-5">
          <select
            className="select select-bordered w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select Category
            </option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="input input-bordered w-full"
            placeholder="Budget Limit"
            min="1"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />

          <button type="submit" className="btn btn-primary">
            Add Budget
          </button>

          {/* Add Budget Success Message */}
          {showSuccess && (
            <div className="toast toast-end toast-bottom z-999">
              <div className="alert alert-success shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-lg">Budget successfully added!</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
