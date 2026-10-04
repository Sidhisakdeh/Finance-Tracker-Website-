import { useMemo } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { useFinance } from "../contexts/FinanceContext";

const COLORS = [
  "#6366f1", "#22c55e", "#f97316", "#ef4444", "#06b6d4",
  "#eab308", "#a855f7", "#ec4899", "#14b8a6",
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    Number(amount) || 0
  );

export default function Analytics() {
  const { transactions, categories } = useFinance();

  const categoryData = useMemo(() => {
    return categories
      .map((category) => {
        const total = transactions
          .filter((t) => t.category === category && t.type === "Expense")
          .reduce((sum, t) => sum + Number(t.amount), 0);
        return { name: category, value: total };
      })
      .filter((entry) => entry.value > 0);
  }, [transactions, categories]);

  const monthlyData = useMemo(() => {
    const grouped = {};

    transactions.forEach((t) => {
      const monthKey = new Date(t.date).toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      });

      if (!grouped[monthKey]) {
        grouped[monthKey] = { month: monthKey, income: 0, expense: 0, sortDate: new Date(t.date) };
      }

      if (t.type === "Income") {
        grouped[monthKey].income += Number(t.amount);
      } else {
        grouped[monthKey].expense += Number(t.amount);
      }
    });

    return Object.values(grouped).sort((a, b) => a.sortDate - b.sortDate);
  }, [transactions]);

  const hasData = transactions.length > 0;

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1 className="analytics-title">Analytics</h1>
        <p className="analytics-subtitle">
          A visual breakdown of your income and spending.
        </p>
      </div>

      {!hasData ? (
        <div className="chart-card">
          <div className="chart-empty-state">
            <p>Add some transactions to see your analytics here.</p>
          </div>
        </div>
      ) : (
        <div className="analytics-grid">
          <div className="chart-card">
            <h2 className="chart-card-title">Spending by Category</h2>
            {categoryData.length === 0 ? (
              <p className="chart-empty-state">No expenses recorded yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={2}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="chart-card">
            <h2 className="chart-card-title">Income vs Expenses</h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="income" fill="#22c55e" name="Income" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="#ef4444" name="Expense" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}