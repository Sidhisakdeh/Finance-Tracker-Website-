import { useState } from "react";
import { Target, Plus, Trophy, Wallet, Trash2 } from "lucide-react";
import { useFinance } from "../contexts/FinanceContext";

export default function GoalCard({ goal }) {
  const { addSavingsToGoal, deleteGoal } = useFinance();
  const [amount, setAmount] = useState("");
  const progress = Math.min((goal.saved / goal.target) * 100, 100);
  const remaining = goal.target - goal.saved;

  const handleAddSavings = () => {
    if (!amount || Number(amount) <= 0) return;
    addSavingsToGoal(goal.id, Number(amount));
    setAmount("");
  };

  const handleDelete = () => {
    if (confirm(`Delete "${goal.title}"? This can't be undone.`)) {
      deleteGoal(goal.id);
    }
  };

  return (
    <div className="goal-card">
      <div className="goal-card-body">
        {/* Header */}
        <div className="goal-card-header">
          <div className="goal-card-identity">
            <div className="goal-icon-badge">
              <Target className="text-primary" size={24} />
            </div>
            <div>
              <h2 className="goal-card-title">{goal.title}</h2>
              <p className="goal-card-subtitle">Savings Goal</p>
            </div>
          </div>

          <div className="goal-card-actions">
            {progress >= 100 && <Trophy className="text-warning" size={28} />}
            <button
              className="goal-delete-btn"
              onClick={handleDelete}
              aria-label={`Delete ${goal.title}`}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Amount */}
        <div className="goal-amounts">
          <div className="goal-amounts-row">
            <div>
              <p className="goal-amount-label">Saved</p>
              <p className="goal-amount-saved">${goal.saved.toFixed(2)}</p>
            </div>
            <div className="goal-amount-target-wrap">
              <p className="goal-amount-label">Target</p>
              <p className="goal-amount-target">${goal.target.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="goal-progress-block">
          <div className="goal-progress-row">
            <span className="text-sm">Progress</span>
            <span className="font-bold">{progress.toFixed(0)}%</span>
          </div>
          <progress className="goal-progress-bar" value={progress} max="100" />
        </div>

        {/* Remaining */}
        <div className="goal-remaining">
          <Wallet size={18} />
          {remaining > 0 ? (
            <p>
              <span className="font-semibold">${remaining.toFixed(2)}</span>{" "}
              remaining to reach your goal
            </p>
          ) : (
            <p className="text-success font-semibold">🎉 Goal completed!</p>
          )}
        </div>

        {/* Add Savings */}
        {progress < 100 && (
          <div className="goal-add-savings-row">
            <input
              type="number"
              placeholder="Add savings"
              className="goal-add-savings-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button className="goal-add-savings-btn" onClick={handleAddSavings}>
              <Plus size={18} />
              Add
            </button>
          </div>
        )}

        {/* Completed */}
        {progress >= 100 && (
          <div className="goal-completed-alert">
            <span>Congratulations! You achieved your savings goal.</span>
          </div>
        )}
      </div>
    </div>
  );
}