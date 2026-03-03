"use client";

import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { ChartCard, ERPBarChart } from "@/components/shared/Charts";
import { Download } from "lucide-react";
import { useBudgets } from "@/lib/hooks/use-budgets";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";

export default function VarianceAnalysisPage() {
  const { data, isLoading, error, refetch } = useBudgets();

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const budgets = data?.data ?? [];

  const variances = budgets.map((b) => {
    const budgeted = b.totalBudgeted ?? 0;
    const actual = b.totalActual ?? 0;
    const variance = actual - budgeted;
    const variancePct = budgeted !== 0 ? ((variance / budgeted) * 100) : 0;
    const favorable = variance < 0;
    return {
      dept: b.department?.name ?? b.name,
      budgeted,
      actual,
      variance,
      variancePct,
      favorable,
    };
  });

  const categoryVariances = variances.map((v) => ({
    dept: v.dept,
    budgeted: v.budgeted,
    actual: v.actual,
  }));

  const totalBudgeted = variances.reduce((s, v) => s + v.budgeted, 0);
  const totalActual = variances.reduce((s, v) => s + v.actual, 0);
  const totalVariance = totalActual - totalBudgeted;

  return (
    <div>
      <PageHeader
        title="Budget Variance Analysis"
        description="Compare actual spending against budgeted allocations"
        actions={
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" /> Export Report
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs text-slate-500">Total Budgeted</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">${totalBudgeted.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs text-slate-500">Total Actual</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">${totalActual.toLocaleString()}</p>
        </div>
        <div className={`rounded-xl border p-4 shadow-sm ${totalVariance < 0 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
          <p className="text-xs text-slate-500">Net Variance</p>
          <p className={`text-2xl font-bold mt-1 ${totalVariance < 0 ? "text-emerald-700" : "text-red-700"}`}>
            {totalVariance < 0 ? "+" : "-"}${Math.abs(totalVariance).toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">{totalVariance < 0 ? "Favorable" : "Unfavorable"} variance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Budget vs Actual by Department/Budget">
          <ERPBarChart
            data={categoryVariances}
            dataKeys={[
              { key: "budgeted", name: "Budgeted", color: "#94a3b8" },
              { key: "actual", name: "Actual", color: "#4f46e5" },
            ]}
            xKey="dept"
            formatY={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
        </ChartCard>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800">Variance Summary</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {["Budget", "Budgeted", "Actual", "Variance", "Type"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {variances.map((v, i) => (
                  <tr key={i} className={`hover:bg-slate-50 transition-colors ${!v.favorable ? "bg-red-50/30" : ""}`}>
                    <td className="px-4 py-3 font-medium text-slate-800">{v.dept}</td>
                    <td className="px-4 py-3 text-slate-600">${v.budgeted.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-600">${v.actual.toLocaleString()}</td>
                    <td className={`px-4 py-3 font-semibold ${v.favorable ? "text-emerald-700" : "text-red-700"}`}>
                      {v.favorable ? "+" : ""}{v.variancePct.toFixed(1)}% (${Math.abs(v.variance).toLocaleString()})
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={v.favorable ? "success" : "danger"}>{v.favorable ? "Favorable" : "Unfavorable"}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
