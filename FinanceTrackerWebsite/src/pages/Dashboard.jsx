import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Target,
  PlusCircle,
  MinusCircle,
  Sparkles,
} from "lucide-react";
import { useFinance } from "../contexts/FinanceContext";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    Number(amount) || 0
  );

export default function Dashboard() {
  const { transactions, totalIncome, totalExpense, balance, goals } = useFinance();
  const navigate = useNavigate();

  const recentTransactions = useMemo(
    () =>
      [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6),
    [transactions]
  );

  const hasGoals = goals && goals.length > 0;
  const totalSaved = goals.reduce((sum, g) => sum + Number(g.saved), 0);
  const totalTarget = goals.reduce((sum, g) => sum + Number(g.target), 0);
  const goalProgress = totalTarget > 0 ? Math.min((totalSaved / totalTarget) * 100, 100) : 0;

  const STAT_CARDS = [
    {
      label: "Total Balance",
      value: balance,
      icon: Wallet,
      tone: balance >= 0 ? "text-primary" : "text-error",
      bg: "bg-primary/10",
    },
    {
      label: "Income",
      value: totalIncome,
      icon: TrendingUp,
      tone: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Expenses",
      value: totalExpense,
      icon: TrendingDown,
      tone: "text-error",
      bg: "bg-error/10",
    },
    {
      label: hasGoals ? "Savings Goals" : "Savings",
      value: hasGoals ? totalSaved : balance,
      icon: Target,
      tone: "text-info",
      bg: "bg-info/10",
      suffix: hasGoals ? ` / ${formatCurrency(totalTarget)}` : "",
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Welcome back</h1>
          <p className="text-base-content/60 mt-1">Here's your financial overview.</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        {STAT_CARDS.map(({ label, value, icon: Icon, tone, bg, suffix }) => (
          <div key={label} className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <p className="text-sm opacity-60">{label}</p>
                <div className={`p-2 rounded-full ${bg}`}>
                  <Icon className={tone} size={20} />
                </div>
              </div>
              <h2 className={`text-2xl font-bold mt-1 ${tone}`}>
                {formatCurrency(value)}
                {suffix && <span className="text-sm font-normal opacity-60">{suffix}</span>}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <button className="btn btn-primary" onClick={() => navigate("/transactions")}>
          <PlusCircle size={18} />
          Add Income
        </button>
        <button className="btn btn-outline btn-error" onClick={() => navigate("/transactions")}>
          <MinusCircle size={18} />
          Add Expense
        </button>
        <button className="btn btn-outline" onClick={() => navigate("/goals")}>
          <Target size={18} />
          Set Goal
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between mb-2">
              <h2 className="card-title">Recent Transactions</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate("/transactions")}>
                View all
              </button>
            </div>

            {recentTransactions.length === 0 ? (
              <p className="text-sm opacity-60 py-8 text-center">
                No transactions yet — add your first one to see it here.
              </p>
            ) : (
              <ul className="divide-y divide-base-200">
                {recentTransactions.map((t) => (
                  <li key={t.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-semibold">{t.title}</p>
                      <p className="text-xs opacity-60">
                        {t.category} · {new Date(t.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`font-bold ${
                        t.type === "Income" ? "text-success" : "text-error"
                      }`}
                    >
                      {t.type === "Income" ? "+" : "-"}
                      {formatCurrency(t.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
            <h2 className="card-title">Savings Goals</h2>
            {hasGoals ? (
              <>
                <div className="flex justify-between text-sm mt-2 mb-1">
                  <span className="font-medium">
                    {goals.length} active goal{goals.length > 1 ? "s" : ""}
                  </span>
                  <span className="font-bold">{goalProgress.toFixed(0)}%</span>
                </div>
                <progress className="progress progress-primary w-full" value={goalProgress} max="100" />
                <p className="text-xs opacity-60 mt-2">
                  {formatCurrency(totalSaved)} of {formatCurrency(totalTarget)}
                </p>
              </>
            ) : (
                <p className="text-sm opacity-60">
                  You haven't set a savings goal yet.{" "}
                  <button className="link link-primary" onClick={() => navigate("/goals")}>
                    Set one now
                  </button>
                  .
                </p>
              )}
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">
                <Sparkles size={18} className="text-warning" />
                Recommendations
              </h2>
              <ul className="text-sm space-y-3 mt-2">
                <li>
                  <span className="font-semibold">Review subscriptions</span>
                  <p className="opacity-60">Check recurring charges you may not be using anymore.</p>
                </li>
                <li>
                  <span className="font-semibold">Automate savings</span>
                  <p className="opacity-60">Move a fixed amount toward your goal right after payday.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}