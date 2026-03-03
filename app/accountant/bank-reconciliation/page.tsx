"use client";

import { CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { useBankAccounts } from "@/lib/hooks/use-bank-reconciliation";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";

export default function BankReconciliationPage() {
  const { data, isLoading, error, refetch } = useBankAccounts();

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const accounts = data ?? [];
  const totalBalance = accounts.reduce((s, a) => s + (a.currentBalance ?? 0), 0);
  const activeCount = accounts.filter((a) => a.isActive).length;

  return (
    <div>
      <PageHeader
        title="Bank Reconciliation"
        description="Match bank statements with accounting records"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" /> Import Bank Statement
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs text-slate-500">Total Bank Balance</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">${totalBalance.toLocaleString()}</p>
          <p className="text-xs text-slate-400 mt-0.5">Across all accounts</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs text-slate-500">Active Accounts</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{activeCount}</p>
          <p className="text-xs text-slate-400 mt-0.5">of {accounts.length} total</p>
        </div>
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 shadow-sm">
          <p className="text-xs text-slate-500">Status</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">Ready</p>
          <p className="text-xs text-slate-400 mt-0.5">All accounts listed</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Account Name", "Account Number", "Bank Name", "Currency", "Current Balance", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {accounts.map((account) => (
                <tr key={account.id} className={`hover:bg-slate-50 transition-colors ${!account.isActive ? "opacity-60" : ""}`}>
                  <td className="px-4 py-3 text-slate-700 font-medium">{account.name}</td>
                  <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{account.accountNumber}</code></td>
                  <td className="px-4 py-3 text-slate-500">{account.bankName}</td>
                  <td className="px-4 py-3 text-slate-500">{account.currency}</td>
                  <td className="px-4 py-3 font-medium">${(account.currentBalance ?? 0).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {account.isActive ? (
                      <span className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-600 text-xs font-medium">
                        <AlertCircle className="w-3.5 h-3.5" /> Inactive
                      </span>
                    )}
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
