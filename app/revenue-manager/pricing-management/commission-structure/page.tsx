"use client";

import { Plus, Award } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { useCommissions } from "@/lib/hooks/use-pricing";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";

export default function CommissionStructurePage() {
  const { data, isLoading, error, refetch } = useCommissions();

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const structures = data ?? [];

  return (
    <div>
      <PageHeader
        title="Commission Structure"
        description="Define sales commission tiers and track rep earnings"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> New Structure
          </button>
        }
      />

      <div className="space-y-4 mb-6">
        {structures.map((s) => (
          <div key={s.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Award className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{s.name}</h3>
                  <p className="text-xs text-slate-400">Type: {s.type} · Currency: {s.currency}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-emerald-700">Base Rate: {s.baseRate}%</span>
                <Badge dot variant={s.isActive ? "success" : "secondary"}>{s.isActive ? "Active" : "Inactive"}</Badge>
              </div>
            </div>

            {s.tiers && s.tiers.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {s.tiers.map((tier) => (
                  <div key={tier.id} className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-0.5">
                      ${tier.minRevenue.toLocaleString()} – {tier.maxRevenue ? `$${tier.maxRevenue.toLocaleString()}` : "∞"}
                    </p>
                    <p className="text-xs font-medium text-slate-700">{tier.rate}% commission</p>
                  </div>
                ))}
              </div>
            )}

            {s.description && (
              <p className="text-xs text-slate-500 mt-3">{s.description}</p>
            )}
          </div>
        ))}
      </div>

      {structures.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 text-center">
          <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500">No commission structures found. Create one to get started.</p>
        </div>
      )}
    </div>
  );
}
