"use client";

import { Check, X } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";
import { useBudgets, useApproveBudget, useRejectBudget } from "@/lib/hooks/use-budgets";
import type { Budget } from "@/lib/api/types";

export default function ApproveBudgetPage() {
  const { data, isLoading, error, refetch } = useBudgets({ status: "SUBMITTED" });
  const { data: activeData, isLoading: activeLoading, error: activeError, refetch: refetchActive } = useBudgets({ status: "ACTIVE" });
  const { data: rejectedData, isLoading: rejectedLoading, error: rejectedError, refetch: refetchRejected } = useBudgets({ status: "REJECTED" });
  const approveBudgetMutation = useApproveBudget();
  const rejectBudgetMutation = useRejectBudget();

  if (isLoading || activeLoading || rejectedLoading) return <LoadingSpinner fullPage />;
  if (error || activeError || rejectedError) return <ErrorState onRetry={() => { refetch(); refetchActive(); refetchRejected(); }} />;

  const pending: Budget[] = data?.data ?? [];
  const reviewed: Budget[] = [...(activeData?.data ?? []), ...(rejectedData?.data ?? [])];

  return (
    <div>
      <PageHeader title="Approve Budgets" description="Review and approve submitted departmental budgets" />

      {pending.length === 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 text-sm text-emerald-700 flex items-center gap-2">
          <Check className="w-4 h-4" /> All pending budgets have been reviewed.
        </div>
      )}

      {pending.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Pending Review ({pending.length})</h3>
          <div className="space-y-3">
            {pending.map((b) => (
              <div key={b.id} className="bg-white rounded-xl border border-amber-200 bg-amber-50/30 shadow-sm p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">{b.name}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span>{b.department?.name ?? b.departmentId}</span>
                      <span>·</span>
                      <span>{new Date(b.startDate).toLocaleDateString()} – {new Date(b.endDate).toLocaleDateString()}</span>
                      <span>·</span>
                      <span>{b.periodLabel}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-slate-900">${(b.totalBudgeted ?? 0).toLocaleString()}</p>
                    <Badge variant="warning" dot>Pending</Badge>
                  </div>
                </div>

                {b.notes && (
                  <div className="bg-white rounded-lg p-3 mb-4 border border-slate-100">
                    <p className="text-xs font-medium text-slate-500 mb-1">Notes</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{b.notes}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => approveBudgetMutation.mutate({ id: b.id, dto: { action: "ACTIVE" } })}
                    disabled={approveBudgetMutation.isPending}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" /> Approve Budget
                  </button>
                  <button
                    onClick={() => rejectBudgetMutation.mutate({ id: b.id })}
                    disabled={rejectBudgetMutation.isPending}
                    className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {reviewed.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Reviewed</h3>
          <div className="space-y-2">
            {reviewed.map((b) => (
              <div key={b.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-800">{b.name}</p>
                  <p className="text-xs text-slate-400">{b.periodLabel} · ${(b.totalBudgeted ?? 0).toLocaleString()}</p>
                </div>
                <Badge dot variant={b.status === "ACTIVE" ? "success" : "danger"}>
                  {b.status === "ACTIVE" ? "Approved" : "Rejected"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
