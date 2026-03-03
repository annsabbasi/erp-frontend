"use client";

import PageHeader from "@/components/shared/PageHeader";
import { ChartCard, ERPBarChart } from "@/components/shared/Charts";
import { useAccounts } from "@/lib/hooks/use-accounts";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";

export default function ExpenseAccountsPage() {
  const { data, isLoading, error, refetch } = useAccounts({ type: "EXPENSE" });

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const expenseAccounts = data ?? [];
  const total = expenseAccounts.reduce((s, e) => s + (e.balance ?? 0), 0);
  const chartData = expenseAccounts.slice(0, 6).map((e) => ({
    name: e.name.split(" ")[0],
    amount: e.balance ?? 0,
  }));

  return (
    <div>
      <PageHeader title="Expense Accounts" description="Track all operational and overhead expenses" />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-red-50 rounded-xl border border-red-200 p-4">
          <p className="text-xs text-red-600 font-medium">Total Expenses</p>
          <p className="text-2xl font-bold text-red-800 mt-1">${total.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Expense Accounts</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{expenseAccounts.length}</p>
        </div>
      </div>

      <ChartCard title="Top Expenses" className="mb-6">
        <ERPBarChart data={chartData} dataKeys={[{ key: "amount", name: "Expenses", color: "#ef4444" }]} xKey="name" formatY={(v) => `$${(v / 1000).toFixed(0)}k`} />
      </ChartCard>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {["Code", "Account Name", "Category", "Balance", "Status"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {expenseAccounts.map((e) => (
              <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{e.code}</code></td>
                <td className="px-4 py-3 font-medium text-slate-800">{e.name}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{e.category}</td>
                <td className="px-4 py-3 font-bold text-red-700">${(e.balance ?? 0).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold ${e.isActive ? "text-emerald-600" : "text-slate-400"}`}>
                    {e.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-red-50 border-t border-red-200">
              <td colSpan={3} className="px-4 py-3 text-sm font-bold text-red-800">Total Expenses</td>
              <td className="px-4 py-3 text-sm font-bold text-red-800">${total.toLocaleString()}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
