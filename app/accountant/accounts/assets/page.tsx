"use client";

import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { Plus } from "lucide-react";
import { useAccounts } from "@/lib/hooks/use-accounts";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";

export default function AssetsPage() {
  const { data, isLoading, error, refetch } = useAccounts({ type: "ASSET" });

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const assets = data ?? [];
  const total = assets.reduce((s, a) => s + (a.balance ?? 0), 0);

  return (
    <div>
      <PageHeader
        title="Asset Accounts"
        description="All current and non-current asset accounts"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Add Account
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-4">
          <p className="text-xs text-indigo-600 font-medium">Total Assets</p>
          <p className="text-2xl font-bold text-indigo-800 mt-1">${total.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Total Accounts</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{assets.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Code", "Account Name", "Category", "Balance", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {assets.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{a.code}</code></td>
                  <td className="px-4 py-3 font-medium text-slate-700">{a.name}</td>
                  <td className="px-4 py-3"><Badge variant="info">{a.category}</Badge></td>
                  <td className={`px-4 py-3 font-bold ${(a.balance ?? 0) < 0 ? "text-red-700" : "text-slate-800"}`}>${(a.balance ?? 0).toLocaleString()}</td>
                  <td className="px-4 py-3"><Badge variant={a.isActive ? "success" : "secondary"} dot>{a.isActive ? "Active" : "Inactive"}</Badge></td>
                  <td className="px-4 py-3"><button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">Edit</button></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-indigo-50 border-t border-indigo-200">
                <td colSpan={3} className="px-4 py-3 text-sm font-bold text-indigo-800">Total Assets</td>
                <td className="px-4 py-3 text-sm font-bold text-indigo-800">${total.toLocaleString()}</td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
