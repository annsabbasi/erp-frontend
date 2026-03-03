"use client";

import { Plus } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import StatCard from "@/components/shared/StatCard";
import { DollarSign, TrendingDown, Users, RefreshCw } from "lucide-react";
import { useRecurringIncome } from "@/lib/hooks/use-revenue";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";

export default function RecurringIncomePage() {
  const { data, isLoading, error, refetch } = useRecurringIncome();

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const subscriptions = data ?? [];
  const activeCount = subscriptions.filter((s) => s.isActive).length;
  const totalAmount = subscriptions.filter((s) => s.isActive).reduce((sum, s) => sum + (s.amount ?? 0), 0);

  return (
    <div>
      <PageHeader
        title="Recurring Income"
        description="Track Monthly Recurring Revenue and subscription health"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Add Subscription
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Recurring Amount" value={`$${totalAmount.toLocaleString()}`} icon={RefreshCw} variant="primary" description="Active subscriptions total" />
        <StatCard title="Active Subscriptions" value={activeCount} icon={Users} variant="info" />
        <StatCard title="Total Records" value={subscriptions.length} icon={DollarSign} variant="success" />
        <StatCard title="Inactive" value={subscriptions.length - activeCount} icon={TrendingDown} variant="danger" description="Inactive subscriptions" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Name", "Client", "Amount", "Frequency", "Next Billing", "Income Source", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {subscriptions.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800">{s.name}</td>
                  <td className="px-4 py-3 text-slate-600">{s.client?.name ?? "—"}</td>
                  <td className="px-4 py-3 font-bold text-slate-800">${(s.amount ?? 0).toLocaleString()}</td>
                  <td className="px-4 py-3"><Badge variant="info">{s.frequency}</Badge></td>
                  <td className="px-4 py-3 text-xs text-slate-500">{s.nextBillingDate ? new Date(s.nextBillingDate).toLocaleDateString() : "—"}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{s.incomeSource?.name ?? "—"}</td>
                  <td className="px-4 py-3"><Badge dot variant={s.isActive ? "success" : "secondary"}>{s.isActive ? "Active" : "Inactive"}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
