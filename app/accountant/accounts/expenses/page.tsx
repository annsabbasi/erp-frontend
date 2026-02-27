"use client";

import PageHeader from "@/components/shared/PageHeader";
import { ChartCard, ERPBarChart } from "@/components/shared/Charts";

const expenseAccounts = [
  { code: "5001", name: "Salary & Wages", balance: 284500, ytd: 564000, budget: 285000, budgetPct: 99.8 },
  { code: "5002", name: "Office Rent", balance: 12000, ytd: 24000, budget: 12000, budgetPct: 100 },
  { code: "5003", name: "Utilities", balance: 3800, ytd: 7400, budget: 4000, budgetPct: 95 },
  { code: "5010", name: "Marketing & Advertising", balance: 32000, ytd: 58000, budget: 35000, budgetPct: 91.4 },
  { code: "5020", name: "IT & Software Subscriptions", balance: 18000, ytd: 32000, budget: 20000, budgetPct: 90 },
  { code: "5030", name: "Travel & Accommodation", balance: 8400, ytd: 14200, budget: 10000, budgetPct: 84 },
  { code: "5040", name: "Training & Development", balance: 4200, ytd: 6800, budget: 5000, budgetPct: 84 },
  { code: "5050", name: "Depreciation", balance: 12000, ytd: 24000, budget: 12000, budgetPct: 100 },
  { code: "5900", name: "Miscellaneous Expenses", balance: 2100, ytd: 3800, budget: 3000, budgetPct: 70 },
];

const chartData = expenseAccounts.slice(0, 6).map((e) => ({
  name: e.name.split(" ")[0],
  amount: e.balance,
}));

const total = expenseAccounts.reduce((s, e) => s + e.balance, 0);

export default function ExpenseAccountsPage() {
  return (
    <div>
      <PageHeader title="Expense Accounts" description="Track all operational and overhead expenses" />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-red-50 rounded-xl border border-red-200 p-4">
          <p className="text-xs text-red-600 font-medium">Total Expenses (Feb)</p>
          <p className="text-2xl font-bold text-red-800 mt-1">${total.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Expense Accounts</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{expenseAccounts.length}</p>
        </div>
      </div>

      <ChartCard title="Top Expenses (February)" className="mb-6">
        <ERPBarChart data={chartData} dataKeys={[{ key: "amount", name: "Expenses", color: "#ef4444" }]} xKey="name" formatY={(v) => `$${(v / 1000).toFixed(0)}k`} />
      </ChartCard>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {["Code", "Account Name", "Feb Actual", "YTD Actual", "Budget (Monthly)", "Utilized"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {expenseAccounts.map((e) => (
              <tr key={e.code} className={`hover:bg-slate-50 transition-colors ${e.budgetPct > 100 ? "bg-red-50/30" : ""}`}>
                <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{e.code}</code></td>
                <td className="px-4 py-3 font-medium text-slate-800">{e.name}</td>
                <td className="px-4 py-3 font-bold text-red-700">${e.balance.toLocaleString()}</td>
                <td className="px-4 py-3 text-slate-600">${e.ytd.toLocaleString()}</td>
                <td className="px-4 py-3 text-slate-600">${e.budget.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${e.budgetPct >= 100 ? "bg-red-500" : e.budgetPct >= 85 ? "bg-amber-500" : "bg-emerald-500"}`}
                        style={{ width: `${Math.min(e.budgetPct, 100)}%` }} />
                    </div>
                    <span className={`text-xs font-medium ${e.budgetPct >= 100 ? "text-red-600" : "text-slate-600"}`}>{e.budgetPct}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-red-50 border-t border-red-200">
              <td colSpan={2} className="px-4 py-3 text-sm font-bold text-red-800">Total Expenses</td>
              <td className="px-4 py-3 text-sm font-bold text-red-800">${total.toLocaleString()}</td>
              <td colSpan={3} />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
