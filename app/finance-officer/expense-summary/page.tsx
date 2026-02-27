"use client";

import { TrendingDown, AlertCircle, Download } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import StatCard from "@/components/shared/StatCard";
import Badge from "@/components/shared/Badge";
import { ChartCard, ERPBarChart, ERPPieChart } from "@/components/shared/Charts";
import { DollarSign, TrendingUp } from "lucide-react";

const monthlyExpenses = [
  { month: "Sep", actual: 142000, budget: 145000 },
  { month: "Oct", actual: 148000, budget: 150000 },
  { month: "Nov", actual: 158000, budget: 155000 },
  { month: "Dec", actual: 168000, budget: 165000 },
  { month: "Jan", actual: 162000, budget: 165000 },
  { month: "Feb", actual: 170000, budget: 175000 },
];

const expenseCategories = [
  { name: "Payroll", amount: 82000, budget: 85000, pct: 48.2, color: "#4f46e5" },
  { name: "Operations", amount: 24500, budget: 25000, pct: 14.4, color: "#06b6d4" },
  { name: "Marketing", amount: 18200, budget: 20000, pct: 10.7, color: "#f59e0b" },
  { name: "IT & Infrastructure", amount: 16800, budget: 15000, pct: 9.9, color: "#ef4444" },
  { name: "Office & Admin", amount: 12000, budget: 12000, pct: 7.1, color: "#8b5cf6" },
  { name: "Travel & Entertainment", amount: 9800, budget: 10000, pct: 5.8, color: "#10b981" },
  { name: "Professional Fees", amount: 6700, budget: 8000, pct: 3.9, color: "#f97316" },
];

const deptExpenses = [
  { dept: "Engineering", amount: 62000, budget: 65000, variance: -3000, status: "under" },
  { dept: "Sales", amount: 38500, budget: 35000, variance: 3500, status: "over" },
  { dept: "Marketing", amount: 22800, budget: 22000, variance: 800, status: "over" },
  { dept: "Operations", amount: 28200, budget: 30000, variance: -1800, status: "under" },
  { dept: "Finance & Admin", amount: 18500, budget: 23000, variance: -4500, status: "under" },
];

const totalExpenses = 170000;
const totalBudget = 175000;
const utilizationRate = ((totalExpenses / totalBudget) * 100).toFixed(1);

export default function ExpenseSummaryPage() {
  const overBudget = expenseCategories.filter((e) => e.amount > e.budget).length;

  return (
    <div>
      <PageHeader
        title="Expense Summary"
        description="Monitor spending against budget across all departments"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Expenses (Feb)" value={`$${totalExpenses.toLocaleString()}`} icon={DollarSign} variant="danger" change={4.9} changeLabel="vs last month" />
        <StatCard title="Monthly Budget" value={`$${totalBudget.toLocaleString()}`} icon={TrendingDown} variant="info" description="Feb 2026 allocation" />
        <StatCard title="Budget Utilization" value={`${utilizationRate}%`} icon={TrendingUp} variant="success" description="Within budget" />
        <StatCard title="Over-Budget Items" value={overBudget} icon={AlertCircle} variant="warning" description="Require attention" />
      </div>

      {overBudget > 0 && (
        <div className="flex items-center gap-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl mb-4 text-sm text-amber-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {overBudget} expense categories have exceeded their allocated budget this month.
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Monthly Expenses vs Budget" description="Actual spending compared to budget (6 months)">
          <ERPBarChart
            data={monthlyExpenses}
            dataKeys={[
              { key: "actual", name: "Actual", color: "#ef4444" },
              { key: "budget", name: "Budget", color: "#cbd5e1" },
            ]}
            xKey="month"
            formatY={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
        </ChartCard>

        <ChartCard title="Expense Distribution" description="Feb 2026 by category">
          <ERPPieChart
            data={expenseCategories.map((e) => ({ name: e.name, value: e.amount, color: e.color }))}
            formatValue={(v) => `$${v.toLocaleString()}`}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Category Budget Utilization</h3>
          <div className="space-y-4">
            {expenseCategories.map((cat) => {
              const util = (cat.amount / cat.budget) * 100;
              const over = cat.amount > cat.budget;
              return (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-700">{cat.name}</span>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium ${over ? "text-red-600" : "text-slate-500"}`}>
                        ${cat.amount.toLocaleString()} / ${cat.budget.toLocaleString()}
                      </span>
                      {over && <Badge variant="danger">Over</Badge>}
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${over ? "bg-red-500" : "bg-indigo-500"}`}
                      style={{ width: `${Math.min(util, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{util.toFixed(1)}% utilized</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Department Expenses */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800">Department Expense Variance</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Department", "Actual", "Budget", "Variance", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {deptExpenses.map((d) => (
                <tr key={d.dept} className={`hover:bg-slate-50 transition-colors ${d.status === "over" ? "bg-red-50/20" : ""}`}>
                  <td className="px-4 py-3 font-medium text-slate-800">{d.dept}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">${d.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-500">${d.budget.toLocaleString()}</td>
                  <td className={`px-4 py-3 font-medium ${d.variance > 0 ? "text-red-600" : "text-emerald-600"}`}>
                    {d.variance > 0 ? "+" : ""}${d.variance.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={d.status === "under" ? "success" : "danger"} dot>
                      {d.status === "under" ? "Under Budget" : "Over Budget"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
