import { useFinance } from "../contexts/FinanceContext";
import BudgetBar from "../components/BudgetBar";
import AddBudget from "../components/AddBudget";

export default function Budgets() {
  const { budgets } = useFinance();

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 gap-6 w-full lg:grid-cols-2 mt-10">

        {/* Add Budget Card */}
        <AddBudget />

        {/* Existing Budgets */}
        {budgets.map((budget) => (
          <BudgetBar
            key={budget.category}
            budget={budget}
          />
        ))}
      </div>
    </div>
  );
}
