"use client";

import { Plus } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { useRevenueAdjustments } from "@/lib/hooks/use-revenue";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";

export default function AdjustmentsPage() {
  const { data, isLoading, error, refetch } = useRevenueAdjustments();

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const adjustments = data?.data ?? [];
  const netAdjustment = adjustments.reduce((s, a) => s + (a.amount ?? 0), 0);

  return (
    <div>
      <PageHeader
        title="Revenue Adjustments"
        description="Manage revenue corrections, reversals, and credit notes"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> New Adjustment
          </button>
        }
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Adjustments", value: adjustments.length, color: "primary" as const },
          { label: "Net Adjustment", value: `$${netAdjustment.toLocaleString()}`, color: "warning" as const },
          { label: "Total Records", value: adjustments.length, color: "danger" as const },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {["Reference", "Type", "Amount", "Description", "Client", "Date", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {adjustments.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{a.reference ?? a.id}</code></td>
                <td className="px-4 py-3"><Badge variant={a.type?.includes("CREDIT") || a.type?.includes("WRITE") ? "danger" : "primary"}>{a.type}</Badge></td>
                <td className={`px-4 py-3 font-bold ${(a.amount ?? 0) < 0 ? "text-red-700" : "text-emerald-700"}`}>
                  {(a.amount ?? 0) >= 0 ? "+" : ""}${(a.amount ?? 0).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs max-w-xs truncate">{a.description}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{a.client?.name ?? "—"}</td>
                <td className="px-4 py-3 text-xs text-slate-400">{a.date ? new Date(a.date).toLocaleDateString() : "—"}</td>
                <td className="px-4 py-3 text-xs text-slate-400">{a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
