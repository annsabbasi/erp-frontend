"use client";

import { Target, TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import StatCard from "@/components/shared/StatCard";
import Badge from "@/components/shared/Badge";
import { ChartCard, ERPBarChart } from "@/components/shared/Charts";
import { DollarSign } from "lucide-react";

const budgetItems = [
  { id: 1, department: "Engineering", allocated: 65000, spent: 62000, committed: 2400, available: 600, status: "healthy" },
  { id: 2, department: "Sales & Marketing", allocated: 57000, spent: 61300, committed: 1200, available: -5500, status: "exceeded" },
  { id: 3, department: "Operations", allocated: 30000, spent: 28200, committed: 800, available: 1000, status: "healthy" },
  { id: 4, department: "Finance & Admin", allocated: 23000, spent: 18500, committed: 1500, available: 3000, status: "under-utilized" },
  { id: 5, department: "Customer Success", allocated: 15000, spent: 13800, committed: 500, available: 700, status: "healthy" },
  { id: 6, department: "HR & People", allocated: 12000, spent: 11200, committed: 400, available: 400, status: "healthy" },
];

const quarterlyBudget = [
  { quarter: "Q3 2025", allocated: 450000, spent: 428000 },
  { quarter: "Q4 2025", allocated: 480000, spent: 462000 },
  { quarter: "Q1 2026", allocated: 510000, spent: 170000 },
];

const totalAllocated = budgetItems.reduce((s, b) => s + b.allocated, 0);
const totalSpent = budgetItems.reduce((s, b) => s + b.spent, 0);
const totalAvailable = totalAllocated - totalSpent;
const utilizationRate = ((totalSpent / totalAllocated) * 100).toFixed(1);

const statusConfig: Record<string, { label: string; variant: "success" | "danger" | "warning" | "info" }> = {
  healthy: { label: "Healthy", variant: "success" },
  exceeded: { label: "Exceeded", variant: "danger" },
  "under-utilized": { label: "Under-utilized", variant: "info" },
};

export default function BudgetStatusPage() {
  const exceeded = budgetItems.filter((b) => b.status === "exceeded").length;

  return (
    <div>
      <PageHeader
        title="Budget Status"
        description="Real-time overview of budget allocation and consumption"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Budget (Feb)" value={`$${totalAllocated.toLocaleString()}`} icon={Target} variant="primary" description="Monthly allocation" />
        <StatCard title="Total Spent" value={`$${totalSpent.toLocaleString()}`} icon={DollarSign} variant="danger" description="Feb 2026 actual" />
        <StatCard title="Remaining" value={`$${totalAvailable.toLocaleString()}`} icon={TrendingUp} variant="success" description="Available balance" />
        <StatCard title="Utilization Rate" value={`${utilizationRate}%`} icon={TrendingDown} variant={parseFloat(utilizationRate) > 95 ? "warning" : "info"} />
      </div>

      {exceeded > 0 && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl mb-4 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {exceeded} department{exceeded > 1 ? "s have" : " has"} exceeded the allocated budget. Review required.
        </div>
      )}

      <ChartCard title="Quarterly Budget vs Spend" description="Allocated vs actual expenditure by quarter" className="mb-6">
        <ERPBarChart
          data={quarterlyBudget}
          dataKeys={[
            { key: "allocated", name: "Budget", color: "#cbd5e1" },
            { key: "spent", name: "Spent", color: "#4f46e5" },
          ]}
          xKey="quarter"
          formatY={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
      </ChartCard>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Department Budget Breakdown</h3>
          <span className="text-xs text-slate-400">Feb 2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Department", "Allocated", "Spent", "Committed", "Available", "Utilization", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {budgetItems.map((b) => {
                const util = ((b.spent / b.allocated) * 100).toFixed(1);
                const cfg = statusConfig[b.status];
                return (
                  <tr key={b.id} className={`hover:bg-slate-50 transition-colors ${b.status === "exceeded" ? "bg-red-50/20" : ""}`}>
                    <td className="px-4 py-3 font-medium text-slate-800">{b.department}</td>
                    <td className="px-4 py-3 text-slate-700">${b.allocated.toLocaleString()}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">${b.spent.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-500">${b.committed.toLocaleString()}</td>
                    <td className={`px-4 py-3 font-medium ${b.available < 0 ? "text-red-600" : "text-emerald-600"}`}>
                      {b.available < 0 ? "-" : ""}${Math.abs(b.available).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${parseFloat(util) > 100 ? "bg-red-500" : parseFloat(util) > 85 ? "bg-amber-500" : "bg-emerald-500"}`}
                            style={{ width: `${Math.min(parseFloat(util), 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">{util}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={cfg.variant} dot>{cfg.label}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 border-t border-slate-200">
                <td className="px-4 py-3 font-semibold text-slate-800">Total</td>
                <td className="px-4 py-3 font-bold text-slate-900">${totalAllocated.toLocaleString()}</td>
                <td className="px-4 py-3 font-bold text-slate-900">${totalSpent.toLocaleString()}</td>
                <td className="px-4 py-3 text-slate-500">${budgetItems.reduce((s, b) => s + b.committed, 0).toLocaleString()}</td>
                <td className={`px-4 py-3 font-bold ${totalAvailable < 0 ? "text-red-600" : "text-emerald-600"}`}>
                  ${totalAvailable.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-slate-700">{utilizationRate}%</td>
                <td className="px-4 py-3">
                  <Badge variant={totalAvailable >= 0 ? "success" : "danger"}>
                    {totalAvailable >= 0 ? "On Track" : "Over Budget"}
                  </Badge>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
