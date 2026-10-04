import { useState } from "react";
import { Plus } from "lucide-react";
import { useFinance } from "../contexts/FinanceContext";
import GoalCard from "../components/GoalCard";

export default function Goals() {
  const { goals, addGoal } = useFinance();
  const [form, setForm] = useState({ title: "", target: "", saved: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || Number(form.target) <= 0) return;

    addGoal({
      title: form.title,
      target: Number(form.target),
      saved: Number(form.saved) || 0,
    });

    setForm({ title: "", target: "", saved: "" });
  }

  return (
    <div className="goals-page">
      <div className="goals-header">
        <h1 className="goals-title">Savings Goals</h1>
        <p className="goals-subtitle">Set targets and track your progress toward each one.</p>
      </div>

      <div className="goals-layout">
        {goals.length > 0 && (
          <div className="goals-grid">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        )}

        <div className="goal-form-card">
          <h2 className="goal-form-title">
            {goals.length === 0 ? "Set your first goal" : "Add another goal"}
          </h2>
          <form onSubmit={handleSubmit} className="goal-form">
            <input
              name="title"
              className="goal-input"
              placeholder="Goal name (e.g. Emergency Fund)"
              value={form.title}
              onChange={handleChange}
              required
            />
            <input
              name="target"
              type="number"
              min="1"
              step="0.01"
              className="goal-input"
              placeholder="Target amount"
              value={form.target}
              onChange={handleChange}
              required
            />
            <input
              name="saved"
              type="number"
              min="0"
              step="0.01"
              className="goal-input"
              placeholder="Already saved (optional)"
              value={form.saved}
              onChange={handleChange}
            />
            <button type="submit" className="goal-submit-btn">
              <Plus size={18} />
              Create goal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}