import { useState, useEffect } from "react";
import { Wallet, DollarSign, Calendar, Tag, FileText } from "lucide-react";
import { useFinance } from "../contexts/FinanceContext";

export default function TransactionForm() {
  const { addTransaction, categories } = useFinance();
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food",
    type: "Expense",
    date: today,
    notes: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return alert("Please enter a title.");
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      return alert("Please enter a valid amount.");
    }

    addTransaction({...formData, amount: Number(formData.amount)});

    setFormData({
      title: "",
      amount: "",
      category: "Food",
      type: "Expense",
      date: today,
      notes: "",
    });

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
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
       
        <h2 className="card-title text-2xl mb-4">
          <Wallet className="w-6 h-6 text-primary" />
          Add Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Title</span>
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <FileText size={18} />
              <input
                type="text"
                name="title"
                placeholder="Grocery Shoppping"
                className="grow"
                value={formData.title}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Amount */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Amount</span>
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <DollarSign size={18} />
              <input
                type="number"
                min="0"
                step="0.01"
                className="grow"
                name="amount"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Category */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Category</span>
            </label>

            <label className="select select-bordered flex items-center">
              <Tag size={18} className="mr-2" />
              <select
                className="grow"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Type */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Transaction Type</span>
            </label>

            <div className="flex gap-6">
              <label className="label cursor-pointer gap-2">
                <input
                  type="radio"
                  className="radio radio-success"
                  name="type"
                  value="Income"
                  checked={formData.type === "Income"}
                  onChange={handleChange}
                />

                <span>Income</span>
              </label>

              <label className="label cursor-pointer gap-2">
                <input
                  type="radio"
                  className="radio radio-error"
                  name="type"
                  value="Expense"
                  checked={formData.type === "Expense"}
                  onChange={handleChange}
                />
                <span>Expense</span>
              </label>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Date</span>
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <Calendar size={18} />

              <input
                type="date"
                className="grow"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Notes */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Notes</span>
            </label>

            <textarea
              className="textarea textarea-bordered w-full"
              rows={4}
              placeholder="Optional notes..."
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
                
          <button type="submit" className="btn btn-primary w-full">
            Add Transaction
          </button>

          {/* Transaction Success Message */}
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
              <span className="text-lg">Transaction successfully added!</span>
            </div>
          </div>
          )}

        </form>
      </div>
    </div>
  );
}
