"use client";

import { Target, Plus, CheckCircle2, Clock, TrendingDown } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import StatCard from "@/components/shared/StatCard";
import Link from "next/link";
import { DollarSign } from "lucide-react";

const budgets = [
  { id: 1, name: "Q1 2026 – Human Resources", dept: "HR", total: 150000, spent: 98400, status: "active", approvedBy: "Finance Director", period: "Jan–Mar 2026" },
  { id: 2, name: "Q1 2026 – Finance & Accounting", dept: "Finance", total: 105000, spent: 116400, status: "over-budget", approvedBy: "Finance Director", period: "Jan–Mar 2026" },
  { id: 3, name: "Q1 2026 – Sales & Marketing", dept: "Sales", total: 135000, spent: 126300, status: "active", approvedBy: "Finance Director", period: "Jan–Mar 2026" },
  { id: 4, name: "Q1 2026 – IT Infrastructure", dept: "IT", total: 84000, spent: 76800, status: "active", approvedBy: "Finance Director", period: "Jan–Mar 2026" },
  { id: 5, name: "Q2 2026 – Human Resources", dept: "HR", total: 155000, spent: 0, status: "pending-approval", approvedBy: "—", period: "Apr–Jun 2026" },
  { id: 6, name: "Q2 2026 – Finance & Accounting", dept: "Finance", total: 108000, spent: 0, status: "pending-approval", approvedBy: "—", period: "Apr–Jun 2026" },
];

export default function BudgetManagementPage() {
  const totalBudgeted = budgets.filter((b) => b.status !== "pending-approval").reduce((s, b) => s + b.total, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const overBudget = budgets.filter((b) => b.status === "over-budget").length;
  const pendingApproval = budgets.filter((b) => b.status === "pending-approval").length;

  return (
    <div>
      <PageHeader
        title="Budget Management"
        description="Create, approve, and monitor departmental budgets"
        actions={
          <div className="flex gap-2">
            <Link href="/finance-officer/budget-management/approve" className="px-4 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors">
              Pending Approvals ({pendingApproval})
            </Link>
            <Link href="/finance-officer/budget-management/create" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
              <Plus className="w-4 h-4" /> Create Budget
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Budgeted (Q1)" value={`$${(totalBudgeted / 1000).toFixed(0)}k`} icon={Target} variant="primary" />
        <StatCard title="Total Spent" value={`$${(totalSpent / 1000).toFixed(0)}k`} icon={DollarSign} variant="info" />
        <StatCard title="Over Budget" value={overBudget} icon={TrendingDown} variant="danger" />
        <StatCard title="Pending Approval" value={pendingApproval} icon={Clock} variant="warning" />
      </div>

      <div className="space-y-4">
        {budgets.map((b) => {
          const pct = b.total > 0 ? Math.round((b.spent / b.total) * 100) : 0;
          const remaining = b.total - b.spent;
          return (
            <div key={b.id} className={`bg-white rounded-xl border shadow-sm p-5 ${b.status === "over-budget" ? "border-red-200" : "border-slate-200"}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">{b.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">{b.dept}</Badge>
                    <span className="text-xs text-slate-400">{b.period}</span>
                  </div>
                </div>
                <Badge
                  dot
                  variant={b.status === "over-budget" ? "danger" : b.status === "pending-approval" ? "warning" : "success"}
                >
                  {b.status === "over-budget" ? "Over Budget" : b.status === "pending-approval" ? "Pending Approval" : "Active"}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400">Total Budget</p>
                  <p className="text-base font-bold text-slate-800">${b.total.toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400">Spent</p>
                  <p className={`text-base font-bold ${b.status === "over-budget" ? "text-red-700" : "text-slate-800"}`}>${b.spent.toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400">Remaining</p>
                  <p className={`text-base font-bold ${remaining < 0 ? "text-red-700" : "text-emerald-700"}`}>
                    {remaining < 0 ? "-" : ""}${Math.abs(remaining).toLocaleString()}
                  </p>
                </div>
              </div>

              {b.status !== "pending-approval" && (
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Budget Utilization</span>
                    <span className={pct > 100 ? "text-red-600 font-semibold" : ""}>{pct}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${pct > 100 ? "bg-red-500" : pct > 85 ? "bg-amber-500" : "bg-indigo-500"}`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {b.status === "pending-approval" && (
                <div className="flex gap-2 pt-2">
                  <Link href="/finance-officer/budget-management/approve" className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-100 transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                  </Link>
                  <button className="px-3 py-1.5 bg-red-50 text-red-700 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors">
                    Reject
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
