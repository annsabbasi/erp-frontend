"use client";

import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { ChartCard, ERPPieChart } from "@/components/shared/Charts";
import { useIncomeSources } from "@/lib/hooks/use-revenue";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#3b82f6", "#8b5cf6", "#ef4444"];

export default function IncomeSourcesPage() {
  const { data, isLoading, error, refetch } = useIncomeSources();

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const sources = data ?? [];
  const pieData = sources.map((s, i) => ({ name: s.name, value: 1, color: COLORS[i % COLORS.length] }));

  return (
    <div>
      <PageHeader title="Income Sources" description="Track and analyze all revenue sources" />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Income Sources Distribution" description="All active income sources">
          <ERPPieChart data={pieData} formatValue={(v) => String(v)} />
        </ChartCard>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Source Breakdown</h3>
          <div className="space-y-4">
            {sources.map((s, i) => (
              <div key={s.id}>
                <div className="flex justify-between items-center text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="font-medium text-slate-700">{s.name}</span>
                    <Badge variant="secondary">{s.code}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={s.isActive ? "success" : "secondary"} dot>{s.isActive ? "Active" : "Inactive"}</Badge>
                  </div>
                </div>
                {s.description && (
                  <p className="text-xs text-slate-400 ml-4.5">{s.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {["Source", "Code", "Description", "Status", "Created"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sources.map((s, i) => (
              <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="font-medium text-slate-800">{s.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3"><Badge variant="secondary">{s.code}</Badge></td>
                <td className="px-4 py-3 text-slate-500 text-xs max-w-xs truncate">{s.description ?? "—"}</td>
                <td className="px-4 py-3"><Badge dot variant={s.isActive ? "success" : "secondary"}>{s.isActive ? "Active" : "Inactive"}</Badge></td>
                <td className="px-4 py-3 text-xs text-slate-500">{new Date(s.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
