"use client";

import { CreditCard, AlertCircle, CheckCircle2, Clock, Download } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import StatCard from "@/components/shared/StatCard";
import { DollarSign } from "lucide-react";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";
import { useReceivables, useAgingReport, useSendReminder } from "@/lib/hooks/use-receivables";
import type { Receivable, ReceivableStatus } from "@/lib/api/types";

export default function ReceivablesPage() {
  const { data, isLoading, error, refetch } = useReceivables();
  const { data: agingReport, isLoading: agingLoading, error: agingError, refetch: refetchAging } = useAgingReport();
  const sendReminderMutation = useSendReminder();

  if (isLoading || agingLoading) return <LoadingSpinner fullPage />;
  if (error || agingError) return <ErrorState onRetry={() => { refetch(); refetchAging(); }} />;

  const receivables: Receivable[] = data?.data ?? [];
  const totalOutstanding = agingReport?.totalOutstanding ?? 0;

  const currentTotal = receivables
    .filter((r) => r.status === "CURRENT")
    .reduce((s, r) => s + r.balanceDue, 0);

  const overdueTotal = receivables
    .filter((r) => r.status === "OVERDUE")
    .reduce((s, r) => s + r.balanceDue, 0);

  function getStatusVariant(status: ReceivableStatus) {
    if (status === "CURRENT") return "success";
    if (status === "OVERDUE") return "danger";
    return "secondary";
  }

  function getStatusLabel(r: Receivable) {
    if (r.status === "CURRENT") return "Current";
    if (r.status === "OVERDUE") return `Overdue ${r.daysOverdue ?? 0}d`;
    return r.status.charAt(0) + r.status.slice(1).toLowerCase();
  }

  return (
    <div>
      <PageHeader
        title="Accounts Receivable"
        description="Track outstanding customer payments and collections"
        actions={
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" /> Export Aging Report
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Outstanding" value={`$${totalOutstanding.toLocaleString()}`} icon={DollarSign} variant="primary" />
        <StatCard title="Current" value={`$${currentTotal.toLocaleString()}`} icon={CheckCircle2} variant="success" />
        <StatCard title="Overdue" value={`$${overdueTotal.toLocaleString()}`} icon={Clock} variant="danger" />
      </div>

      {overdueTotal > 0 && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl mb-4 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          ${overdueTotal.toLocaleString()} in overdue receivables. Follow up required.
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Client", "Invoice", "Amount", "Due Date", "Aging (Days)", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {receivables.map((r) => (
                <tr key={r.id} className={`hover:bg-slate-50 transition-colors ${r.status === "OVERDUE" ? "bg-red-50/20" : ""}`}>
                  <td className="px-4 py-3 font-medium text-slate-800">{r.client?.name ?? "N/A"}</td>
                  <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{r.invoice?.invoiceNumber ?? r.invoiceId}</code></td>
                  <td className="px-4 py-3 font-bold text-slate-900">${r.balanceDue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{new Date(r.dueDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    {(r.daysOverdue ?? 0) > 0 ? (
                      <span className="text-red-600 font-bold">{r.daysOverdue} days</span>
                    ) : <span className="text-slate-400">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <Badge dot variant={getStatusVariant(r.status)}>
                      {getStatusLabel(r)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => sendReminderMutation.mutate(r.id)}
                      disabled={sendReminderMutation.isPending}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-medium disabled:opacity-50"
                    >
                      Send Reminder
                    </button>
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
