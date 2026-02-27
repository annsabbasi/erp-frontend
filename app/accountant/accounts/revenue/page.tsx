"use client";

import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { ChartCard, ERPBarChart } from "@/components/shared/Charts";

const revenueAccounts = [
  { code: "4001", name: "Service Revenue", balance: 168000, ytd: 450000, trend: 8.6 },
  { code: "4002", name: "Product Sales Revenue", balance: 42000, ytd: 140000, trend: 5.2 },
  { code: "4003", name: "Subscription Revenue", balance: 18000, ytd: 75000, trend: -3.4 },
  { code: "4004", name: "Consulting Revenue", balance: 28000, ytd: 82000, trend: 12.1 },
  { code: "4900", name: "Other Income", balance: 2000, ytd: 8200, trend: 0 },
];

const chartData = revenueAccounts.map((r) => ({ name: r.name.replace(" Revenue", "").replace(" Income", ""), amount: r.balance }));
const total = revenueAccounts.reduce((s, r) => s + r.balance, 0);

export default function RevenueAccountsPage() {
  return (
    <div>
      <PageHeader title="Revenue Accounts" description="Track all income and revenue streams" />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
          <p className="text-xs text-emerald-600 font-medium">Total Revenue (Feb)</p>
          <p className="text-2xl font-bold text-emerald-800 mt-1">${total.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Revenue Accounts</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{revenueAccounts.length}</p>
        </div>
      </div>

      <ChartCard title="Revenue by Account (February)" className="mb-6">
        <ERPBarChart data={chartData} dataKeys={[{ key: "amount", name: "Revenue", color: "#10b981" }]} xKey="name" formatY={(v) => `$${(v / 1000).toFixed(0)}k`} />
      </ChartCard>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {["Code", "Account Name", "Feb Balance", "YTD Balance", "Growth"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {revenueAccounts.map((a) => (
              <tr key={a.code} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{a.code}</code></td>
                <td className="px-4 py-3 font-medium text-slate-800">{a.name}</td>
                <td className="px-4 py-3 font-bold text-emerald-700">${a.balance.toLocaleString()}</td>
                <td className="px-4 py-3 text-slate-600">${a.ytd.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold ${a.trend >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {a.trend >= 0 ? "+" : ""}{a.trend}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-emerald-50 border-t border-emerald-200">
              <td colSpan={2} className="px-4 py-3 text-sm font-bold text-emerald-800">Total Revenue</td>
              <td className="px-4 py-3 text-sm font-bold text-emerald-800">${total.toLocaleString()}</td>
              <td colSpan={2} />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
