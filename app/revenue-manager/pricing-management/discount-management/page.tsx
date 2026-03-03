"use client";

import { Plus, Tag } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { useDiscounts } from "@/lib/hooks/use-pricing";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";

export default function DiscountManagementPage() {
  const { data, isLoading, error, refetch } = useDiscounts();

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const discounts = data ?? [];

  return (
    <div>
      <PageHeader
        title="Discount Management"
        description="Create and manage discount codes and promotional offers"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> New Discount
          </button>
        }
      />

      <div className="space-y-3">
        {discounts.map((d) => (
          <div key={d.id} className={`bg-white rounded-xl border shadow-sm p-4 ${!d.isActive ? "opacity-60 border-slate-100" : "border-slate-200"}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                  <Tag className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-sm font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{d.code}</code>
                    <span className="text-sm text-slate-600">{d.name}</span>
                    <Badge variant={d.isActive ? "success" : "secondary"} dot>{d.isActive ? "active" : "inactive"}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                    <span><span className="font-medium">Value:</span> {d.type === "PERCENTAGE" ? `${d.value}%` : `$${d.value}`}</span>
                    <span><span className="font-medium">Type:</span> {d.type}</span>
                    {d.minPurchase && <span><span className="font-medium">Min Purchase:</span> ${d.minPurchase.toLocaleString()}</span>}
                    <span><span className="font-medium">Uses:</span> {d.usedCount} / {d.maxUses ?? "Unlimited"}</span>
                    {d.endDate && <span><span className="font-medium">Expires:</span> {new Date(d.endDate).toLocaleDateString()}</span>}
                  </div>
                  {d.maxUses && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-1.5 bg-slate-100 rounded-full w-32 overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min((d.usedCount / d.maxUses) * 100, 100)}%` }} />
                      </div>
                      <span className="text-xs text-slate-400">{Math.round((d.usedCount / d.maxUses) * 100)}% used</span>
                    </div>
                  )}
                </div>
              </div>
              {d.isActive && (
                <button className="text-xs text-red-600 hover:text-red-700 font-medium shrink-0">Deactivate</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
