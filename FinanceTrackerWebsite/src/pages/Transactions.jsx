import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import CategoryFilter from "../components/CategoryFilter";
import { useFinance } from "../contexts/FinanceContext";
import { useEffect } from "react";

export default function Transactions() {
  const { totalIncome, totalExpense, balance, filteredTransactions } = useFinance();

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Transactions</h1>
        <p className="text-base-content/60 mt-2">
          Manage your income and expenses in one place.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-5 md:grid-cols-3 mb-8">
        {/* Income */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-success/10">
                <ArrowUpCircle className="text-success" />
              </div>

              <div>
                <p className="text-sm opacity-60">Total Income</p>

                <h2 className="text-2xl font-bold text-success">
                  {formatCurrency(totalIncome)}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Expense */}

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-error/10">
                <ArrowDownCircle className="text-error" />
              </div>

              <div>
                <p className="text-sm opacity-60">Total Expense</p>

                <h2 className="text-2xl font-bold text-error">
                  {formatCurrency(totalExpense)}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Balance */}

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Wallet className="text-primary" />
              </div>

              <div>
                <p className="text-sm opacity-60">Balance</p>

                <h2 className={`text-2xl font-bold 
                  ${balance >= 0 ? "text-primary" : "text-error"}`}
                >
                  {formatCurrency(balance)}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 xl:grid-cols-3">
        {/* Form */}
        <div className="xl:col-span-1">
          <TransactionForm />
        </div>

        {/* Transactions */}
        <div className="xl:col-span-2 space-y-6">
          <CategoryFilter />

          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Recent Transactions</h2>

            <span className="badge badge-primary p-3">
              {filteredTransactions.length} items
            </span>
          </div>

          <TransactionList />
        </div>
      </div>
    </div>
  );
}
