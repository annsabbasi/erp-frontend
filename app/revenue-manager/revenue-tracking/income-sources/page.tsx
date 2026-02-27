"use client";

import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { ChartCard, ERPPieChart } from "@/components/shared/Charts";

const sources = [
  { id: 1, name: "Service Revenue", category: "Core", ytd: 450000, feb: 152000, growth: 8.6, color: "#4f46e5" },
  { id: 2, name: "Product Sales", category: "Core", ytd: 140000, feb: 48000, growth: 5.2, color: "#10b981" },
  { id: 3, name: "Subscription Revenue", category: "Recurring", ytd: 75000, feb: 28000, growth: -3.4, color: "#f59e0b" },
  { id: 4, name: "Consulting & Advisory", category: "Professional", ytd: 82000, feb: 28000, growth: 12.1, color: "#3b82f6" },
  { id: 5, name: "License Fees", category: "Recurring", ytd: 24000, feb: 8000, growth: 0, color: "#8b5cf6" },
];

const pieData = sources.map((s) => ({ name: s.name, value: s.feb, color: s.color }));

export default function IncomeSourcesPage() {
  const totalFeb = sources.reduce((s, src) => s + src.feb, 0);

  return (
    <div>
      <PageHeader title="Income Sources" description="Track and analyze all revenue sources" />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Revenue Mix (February)" description="Distribution by income source">
          <ERPPieChart data={pieData} formatValue={(v) => `$${v.toLocaleString()}`} />
        </ChartCard>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Source Breakdown</h3>
          <div className="space-y-4">
            {sources.map((s) => (
              <div key={s.id}>
                <div className="flex justify-between items-center text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="font-medium text-slate-700">{s.name}</span>
                    <Badge variant="secondary">{s.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={s.growth >= 0 ? "text-emerald-600" : "text-red-600"}>{s.growth >= 0 ? "+" : ""}{s.growth}%</span>
                    <span className="font-bold text-slate-800">${s.feb.toLocaleString()}</span>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(s.feb / totalFeb) * 100}%`, backgroundColor: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {["Source", "Category", "Feb Revenue", "YTD Revenue", "MoM Growth", "% of Total"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sources.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="font-medium text-slate-800">{s.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3"><Badge variant="secondary">{s.category}</Badge></td>
                <td className="px-4 py-3 font-bold text-slate-800">${s.feb.toLocaleString()}</td>
                <td className="px-4 py-3 text-slate-600">${s.ytd.toLocaleString()}</td>
                <td className="px-4 py-3"><span className={`text-xs font-bold ${s.growth >= 0 ? "text-emerald-600" : "text-red-600"}`}>{s.growth >= 0 ? "+" : ""}{s.growth}%</span></td>
                <td className="px-4 py-3 text-slate-500">{((s.feb / totalFeb) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
