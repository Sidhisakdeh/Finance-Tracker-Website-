import { useState } from "react";
import { Trash2, Pencil, Check, X } from "lucide-react";
import { useFinance } from "../contexts/FinanceContext";

export default function BudgetBar({ budget }) {
  const {
    getCategorySpent,
    getBudgetProgress,
    updateBudget,
    deleteBudget,
  } = useFinance();

  const [isEditing, setIsEditing] = useState(false);
  const [newLimit, setNewLimit] = useState(budget.limit);

  const spent = getCategorySpent(budget.category);
  const progress = getBudgetProgress(budget.category);
  const remaining = budget.limit - spent;

  function handleSave() {
    const value = Number(newLimit);

    if (value <= 0 || isNaN(value)) {
      return;
    }

    updateBudget(budget.category, value);
    setIsEditing(false);
  }

  function handleCancel() {
    setNewLimit(budget.limit);
    setIsEditing(false);
  }

  return (
    <div className="card bg-base-100 border border-base-300 shadow-xl w-full mx-auto">
      <div className="card-body">

        {/* Header */}
        <div className="mt-1 flex justify-between items-center">
          <span className="font-medium text-xl">
            {budget.category}
          </span>

          <div className="flex items-center gap-2">

            {/* Edit Button */}
            {!isEditing && (
              <button
                className="btn btn-info btn-circle btn-sm"
                onClick={() => setIsEditing(true)}
              >
                <Pencil size={16} />
              </button>
            )}

            {/* Delete Button */}
            <button
              className="btn btn-error btn-circle btn-sm"
              onClick={() => {
                if (window.confirm(`Delete "${budget.category}" budget?`)) {
                  deleteBudget(budget.category);
                }
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>


        {/* Radial Progress */}
        <div className="flex justify-center my-6">
          <div
            className={`radial-progress ${
              progress >= 100
                ? "text-error"
                : progress >= 80
                ? "text-warning"
                : progress >= 50
                ? "text-info"
                : "text-success"
            }`}
            style={{
              "--value": Math.min(progress, 100),
              "--size": "7rem",
              "--thickness": "10px",
            }}
            role="progressbar"
          >
            {progress.toFixed(0)}%
          </div>
        </div>


        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3">

          <div className="stat bg-base-200 rounded-lg p-3 text-center">
            <div className="stat-title text-xs">
              Spent
            </div>

            <div className="stat-value text-error text-lg">
              ${spent.toFixed(2)}
            </div>
          </div>


          <div className="stat bg-base-200 rounded-lg p-3 text-center">
            <div className="stat-title text-xs">
              Remaining
            </div>

            <div
              className={`stat-value text-lg ${
                remaining >= 0
                  ? "text-success"
                  : "text-error"
              }`}
            >
              {remaining >= 0 ? "$" : "-$"}
              {Math.abs(remaining).toFixed(2)}
            </div>
          </div>


          <div className="stat bg-base-200 rounded-lg p-3 text-center">
            <div className="stat-title text-xs">
              Budget
            </div>

            {isEditing ? (
              <div className="flex gap-1 justify-center">
                <input
                  type="number"
                  className="input input-bordered input-sm w-20"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                />

                <button
                  className="btn btn-success btn-sm btn-circle"
                  onClick={handleSave}
                >
                  <Check size={14} />
                </button>

                <button
                  className="btn btn-ghost btn-sm btn-circle z-99 bg-red-300 hover:bg-red-400"
                  onClick={handleCancel}
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="stat-value text-primary text-lg">
                ${budget.limit.toFixed(2)}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}