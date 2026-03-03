"use client";

import { Target, Plus, CheckCircle2, Clock, TrendingDown } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import StatCard from "@/components/shared/StatCard";
import Link from "next/link";
import { DollarSign } from "lucide-react";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";
import { useBudgets, useApproveBudget, useRejectBudget } from "@/lib/hooks/use-budgets";
import type { Budget, BudgetStatus } from "@/lib/api/types";

export default function BudgetManagementPage() {
  const { data, isLoading, error, refetch } = useBudgets();
  const approveBudgetMutation = useApproveBudget();
  const rejectBudgetMutation = useRejectBudget();

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const budgets: Budget[] = data?.data ?? [];

  const totalBudgeted = budgets
    .filter((b) => b.status === "ACTIVE")
    .reduce((s, b) => s + (b.totalBudgeted ?? 0), 0);

  const totalSpent = budgets.reduce((s, b) => s + (b.totalActual ?? 0), 0);

  const overBudget = budgets.filter(
    (b) => b.status === "ACTIVE" && (b.totalActual ?? 0) > (b.totalBudgeted ?? 0)
  ).length;

  const pendingApproval = budgets.filter((b) => b.status === "SUBMITTED").length;

  function getStatusVariant(status: BudgetStatus, totalBudgeted: number, totalActual: number) {
    if (status === "SUBMITTED") return "warning";
    if (status === "REJECTED") return "danger";
    if (status === "ACTIVE" && totalActual > totalBudgeted) return "danger";
    if (status === "ACTIVE") return "success";
    return "secondary";
  }

  function getStatusLabel(status: BudgetStatus, totalBudgeted: number, totalActual: number) {
    if (status === "SUBMITTED") return "Pending Approval";
    if (status === "REJECTED") return "Rejected";
    if (status === "ACTIVE" && totalActual > totalBudgeted) return "Over Budget";
    if (status === "ACTIVE") return "Active";
    return status.charAt(0) + status.slice(1).toLowerCase();
  }

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
        <StatCard title="Total Budgeted (Active)" value={`$${(totalBudgeted / 1000).toFixed(0)}k`} icon={Target} variant="primary" />
        <StatCard title="Total Spent" value={`$${(totalSpent / 1000).toFixed(0)}k`} icon={DollarSign} variant="info" />
        <StatCard title="Over Budget" value={overBudget} icon={TrendingDown} variant="danger" />
        <StatCard title="Pending Approval" value={pendingApproval} icon={Clock} variant="warning" />
      </div>

      <div className="space-y-4">
        {budgets.map((b) => {
          const budgeted = b.totalBudgeted ?? 0;
          const actual = b.totalActual ?? 0;
          const pct = budgeted > 0 ? Math.round((actual / budgeted) * 100) : 0;
          const remaining = budgeted - actual;
          const isOverBudget = b.status === "ACTIVE" && actual > budgeted;

          return (
            <div key={b.id} className={`bg-white rounded-xl border shadow-sm p-5 ${isOverBudget ? "border-red-200" : "border-slate-200"}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">{b.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">{b.department?.name ?? b.departmentId}</Badge>
                    <span className="text-xs text-slate-400">{b.periodLabel}</span>
                  </div>
                </div>
                <Badge
                  dot
                  variant={getStatusVariant(b.status, budgeted, actual)}
                >
                  {getStatusLabel(b.status, budgeted, actual)}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400">Total Budget</p>
                  <p className="text-base font-bold text-slate-800">${budgeted.toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400">Spent</p>
                  <p className={`text-base font-bold ${isOverBudget ? "text-red-700" : "text-slate-800"}`}>${actual.toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400">Remaining</p>
                  <p className={`text-base font-bold ${remaining < 0 ? "text-red-700" : "text-emerald-700"}`}>
                    {remaining < 0 ? "-" : ""}${Math.abs(remaining).toLocaleString()}
                  </p>
                </div>
              </div>

              {b.status === "ACTIVE" && (
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

              {b.status === "SUBMITTED" && (
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => approveBudgetMutation.mutate({ id: b.id, dto: { action: "ACTIVE" } })}
                    disabled={approveBudgetMutation.isPending}
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button
                    onClick={() => rejectBudgetMutation.mutate({ id: b.id })}
                    disabled={rejectBudgetMutation.isPending}
                    className="px-3 py-1.5 bg-red-50 text-red-700 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                  >
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
