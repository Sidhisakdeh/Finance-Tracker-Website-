import { Trash2, Pencil, Wallet } from "lucide-react";
import { useFinance } from "../contexts/FinanceContext";

export default function TransactionList() {
  const { filteredTransactions, deleteTransaction } = useFinance();

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  if (filteredTransactions.length === 0) {
    return (
      <div className="card bg-base-100 shadow-xl max-h-10">
        <div className="card-body flex flex-col items-center justify-center py-16">
          <Wallet className="w-16 h-16 text-gray-400 mb-4" />

          <h2 className="text-2xl font-semibold">No Transactions</h2>

          <p className="text-gray-500 mt-2">
            Start by adding your first income or expense.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block card bg-base-100 shadow-xl max-h-100 overflow-scroll">
        <div className="card-body p-0">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Category</th>
                <th>Type</th>
                <th className="text-right">Amount</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>

                  <td>
                    <div className="font-semibold">{transaction.title}</div>

                    {transaction.notes && (
                      <div className="text-xs opacity-60">
                        {transaction.notes}
                      </div>
                    )}
                  </td>

                  <td>
                    <span className="badge badge-outline">
                      {transaction.category}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge p-3 ${
                        transaction.type === "Income"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>

                  <td
                    className={`text-right font-bold ${
                      transaction.type === "Income"
                        ? "text-success"
                        : "text-error"
                    }`}
                  >
                    {transaction.type === "Income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        className="btn btn-sm btn-error btn-outline"
                        title="Delete"
                        onClick={() => deleteTransaction(transaction.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}

      <div className="grid gap-4 lg:hidden">
        {filteredTransactions.map((transaction) => (
          <div key={transaction.id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-lg">{transaction.title}</h2>

                  <p className="text-sm opacity-70">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`font-bold text-lg ${
                    transaction.type === "Income"
                      ? "text-success"
                      : "text-error"
                  }`}
                >
                  {transaction.type === "Income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </span>
              </div>

              <div className="flex gap-2 mt-2">
                <span className="badge badge-outline">
                  {transaction.category}
                </span>

                <span
                  className={`badge ${
                    transaction.type === "Income"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {transaction.type}
                </span>
              </div>

              {transaction.notes && (
                <p className="text-sm mt-3 opacity-70">{transaction.notes}</p>
              )}

              <div className="flex justify-end gap-2 mt-4">

                <button
                  className="btn btn-sm btn-error btn-outline"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
