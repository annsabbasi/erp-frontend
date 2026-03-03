"use client";

import PageHeader from "@/components/shared/PageHeader";
import { ChartCard, ERPBarChart } from "@/components/shared/Charts";
import { useAccounts } from "@/lib/hooks/use-accounts";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";

export default function RevenueAccountsPage() {
  const { data, isLoading, error, refetch } = useAccounts({ type: "REVENUE" });

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const revenueAccounts = data ?? [];
  const total = revenueAccounts.reduce((s, r) => s + (r.balance ?? 0), 0);
  const chartData = revenueAccounts.map((r) => ({
    name: r.name.replace(" Revenue", "").replace(" Income", ""),
    amount: r.balance ?? 0,
  }));

  return (
    <div>
      <PageHeader title="Revenue Accounts" description="Track all income and revenue streams" />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
          <p className="text-xs text-emerald-600 font-medium">Total Revenue</p>
          <p className="text-2xl font-bold text-emerald-800 mt-1">${total.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Revenue Accounts</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{revenueAccounts.length}</p>
        </div>
      </div>

      <ChartCard title="Revenue by Account" className="mb-6">
        <ERPBarChart data={chartData} dataKeys={[{ key: "amount", name: "Revenue", color: "#10b981" }]} xKey="name" formatY={(v) => `$${(v / 1000).toFixed(0)}k`} />
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
            {revenueAccounts.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{a.code}</code></td>
                <td className="px-4 py-3 font-medium text-slate-800">{a.name}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{a.category}</td>
                <td className="px-4 py-3 font-bold text-emerald-700">${(a.balance ?? 0).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold ${a.isActive ? "text-emerald-600" : "text-slate-400"}`}>
                    {a.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-emerald-50 border-t border-emerald-200">
              <td colSpan={3} className="px-4 py-3 text-sm font-bold text-emerald-800">Total Revenue</td>
              <td className="px-4 py-3 text-sm font-bold text-emerald-800">${total.toLocaleString()}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
