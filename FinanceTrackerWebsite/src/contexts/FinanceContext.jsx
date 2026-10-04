import { createContext, useContext, useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export function FinanceProvider({ children }) {
    
    // Data
    const [transactions, setTransactions] = useLocalStorage("transactions", []);
    const [budgets, setBudgets] = useLocalStorage("budgets", []);
    const [goals, setGoals] = useLocalStorage("goals", []);

    const categories = [
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

    // Filters
    const [filters, setFilters] = useState({
        category: "All",
        type: "All",
        search: "",
        sort: "Newest",
        startDate: "",
        endDate: "",
    });

    // Transaction CRUD
    const addTransaction = (transaction) => {
        const newTransaction = {
            id: crypto.randomUUID(),
            ...transaction,
        };

        setTransactions((prev) => [newTransaction, ...prev]);
    };

    const deleteTransaction = (id) => {
        setTransactions((prev) =>
            prev.filter((transaction) => transaction.id !== id)
        );
    };

    const updateTransaction = (id, updatedData) => {
        setTransactions((prev) =>
            prev.map((transaction) =>
                transaction.id === id
                    ? { ...transaction, ...updatedData }
                    : transaction
            )
        );
    };

    // Budget
    const updateBudget = (category, limit) => {
        setBudgets((prev) =>
            prev.map((budget) =>
                budget.category === category
                    ? { ...budget, limit: Number(limit) }
                    : budget
            )
        );
    };

    const addBudget = (budget) => {
        const exists = budgets.some(
            (b) => b.category.toLowerCase() === budget.category.toLowerCase()
        );

        if (exists) return false;
        setBudgets((prev) => [...prev, budget]);
        return true;
    };

    const deleteBudget = (category) => {
        setBudgets((prev) =>
            prev.filter((budget) => budget.category !== category)
        );
    };

    // Goals
    const addGoal = (goal) => {
        const newGoal = {
            id: crypto.randomUUID(),
            title: goal.title,
            target: Number(goal.target),
            saved: Number(goal.saved) || 0,
        };
        setGoals((prev) => [...prev, newGoal]);
    };

    const deleteGoal = (id) => {
        setGoals((prev) => prev.filter((g) => g.id !== id));
    };

    const addSavingsToGoal = (id, amount) => {
        setGoals((prev) =>
            prev.map((g) =>
                g.id === id ? { ...g, saved: g.saved + Number(amount) } : g
            )
        );
    };

    // Reset everything back to a fresh app state
    const resetAll = () => {
        setTransactions([]);
        setBudgets([]);
        setGoals([]);
    };

    // Dashboard Calculations
    const totalIncome = useMemo(() => {
        return transactions
            .filter((transaction) => transaction.type === "Income")
            .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
    }, [transactions]);

    const totalExpense = useMemo(() => {
        return transactions
            .filter((transaction) => transaction.type === "Expense")
            .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
    }, [transactions]);

    const balance = totalIncome - totalExpense;

    // Filtered Transactions
    const filteredTransactions = useMemo(() => {
        let data = [...transactions];

        if (filters.category !== "All") {
            data = data.filter(
                (transaction) => transaction.category === filters.category
            );
        }

        if (filters.type !== "All") {
            data = data.filter(
                (transaction) => transaction.type === filters.type
            );
        }

        if (filters.search.trim()) {
            data = data.filter((transaction) =>
                transaction.title
                    .toLowerCase()
                    .includes(filters.search.toLowerCase())
            );
        }

        if (filters.startDate) {
            data = data.filter(
                (transaction) => new Date(transaction.date) >= new Date(filters.startDate)
            );
        }

        if (filters.endDate) {
            data = data.filter(
                (transaction) => new Date(transaction.date) <= new Date(filters.endDate)
            );
        }

        data.sort((a, b) => {
            if (filters.sort === "Newest") {
                return new Date(b.date) - new Date(a.date);
            }
            return new Date(a.date) - new Date(b.date);
        });

        return data;
    }, [transactions, filters]);

    // Budget Helpers
    const getCategorySpent = (category) => {
        return transactions
            .filter(
                (transaction) =>
                    transaction.category === category &&
                    transaction.type === "Expense"
            )
            .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
    };

    const getBudgetProgress = (category) => {
        const budget = budgets.find(
            (budget) => budget.category === category
        );
        if (!budget) return 0;
        return (getCategorySpent(category) / budget.limit) * 100;
    };

    // Value for ContextProvider
    const value = {
        transactions,
        budgets,
        goals,
        categories,

        filters,
        setFilters,

        filteredTransactions,

        addTransaction,
        deleteTransaction,
        updateTransaction,

        addBudget,
        updateBudget,
        deleteBudget,

        addGoal,
        deleteGoal,
        addSavingsToGoal,
        resetAll,

        totalIncome,
        totalExpense,
        balance,

        getCategorySpent,
        getBudgetProgress,
    };

    return (
        <FinanceContext.Provider value={value}>
            {children}
        </FinanceContext.Provider>
    );
}