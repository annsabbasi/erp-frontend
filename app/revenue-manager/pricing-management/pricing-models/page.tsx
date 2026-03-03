"use client";

import { Plus, Edit2, Trash2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { usePricingModels } from "@/lib/hooks/use-pricing";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";

export default function PricingModelsPage() {
  const { data, isLoading, error, refetch } = usePricingModels();

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const models = data ?? [];

  return (
    <div>
      <PageHeader
        title="Pricing Models"
        description="Define and manage pricing plans and packages"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> New Model
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map((m) => (
          <div key={m.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800">{m.name}</h3>
                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary">{m.code}</Badge>
                  <Badge dot variant={m.isActive ? "success" : "secondary"}>{m.isActive ? "Active" : "Inactive"}</Badge>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-indigo-50 rounded-lg p-3">
                <p className="text-xs text-slate-400">Base Price</p>
                <p className="text-base font-bold text-indigo-800">${(m.basePrice ?? 0).toLocaleString()}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-400">Currency</p>
                <p className="text-base font-bold text-slate-800">{m.currency}</p>
              </div>
            </div>

            {m.tiers && m.tiers.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-slate-400 mb-1">Pricing Tiers</p>
                <div className="flex flex-wrap gap-1">
                  {m.tiers.map((tier) => (
                    <span key={tier.id} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">{tier.name}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
              <span>{m.tiers?.length ?? 0} pricing tiers</span>
              <span className="text-slate-400">Created {new Date(m.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
