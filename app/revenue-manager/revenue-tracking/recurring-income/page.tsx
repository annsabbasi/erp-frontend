"use client";

import { RefreshCw, Plus } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import StatCard from "@/components/shared/StatCard";
import { DollarSign, TrendingUp, TrendingDown, Users } from "lucide-react";

const subscriptions = [
  { id: 1, client: "GlobalCorp Ltd.", plan: "Enterprise", mrr: 5200, arr: 62400, seats: 120, startDate: "Jan 2025", nextRenewal: "Jan 2027", status: "active", churnRisk: "low" },
  { id: 2, client: "Innovation Labs", plan: "Professional", mrr: 3200, arr: 38400, seats: 45, startDate: "Mar 2025", nextRenewal: "Mar 2026", status: "active", churnRisk: "low" },
  { id: 3, client: "TechVentures Inc.", plan: "Professional", mrr: 2800, arr: 33600, seats: 38, startDate: "Jun 2025", nextRenewal: "Jun 2026", status: "active", churnRisk: "medium" },
  { id: 4, client: "BlueSky Inc.", plan: "Starter", mrr: 1200, arr: 14400, seats: 15, startDate: "Sep 2025", nextRenewal: "Sep 2026", status: "active", churnRisk: "high" },
  { id: 5, client: "MegaBrand Co.", plan: "Starter", mrr: 800, arr: 9600, seats: 8, startDate: "Nov 2025", nextRenewal: "Nov 2026", status: "trial", churnRisk: "medium" },
];

export default function RecurringIncomePage() {
  const totalMRR = subscriptions.filter(s => s.status === "active").reduce((s, sub) => s + sub.mrr, 0);
  const totalARR = subscriptions.filter(s => s.status === "active").reduce((s, sub) => s + sub.arr, 0);
  const highRisk = subscriptions.filter(s => s.churnRisk === "high").length;

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
        <StatCard title="Total MRR" value={`$${totalMRR.toLocaleString()}`} icon={RefreshCw} change={5.2} variant="primary" description="Monthly Recurring Revenue" />
        <StatCard title="Annual ARR" value={`$${(totalARR / 1000).toFixed(0)}k`} icon={DollarSign} change={5.2} variant="success" />
        <StatCard title="Active Subscriptions" value={subscriptions.filter(s => s.status === "active").length} icon={Users} variant="info" />
        <StatCard title="At-Risk Accounts" value={highRisk} icon={TrendingDown} variant="danger" description="High churn risk" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Client", "Plan", "MRR", "ARR", "Seats", "Start Date", "Renewal", "Status", "Churn Risk"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {subscriptions.map((s) => (
                <tr key={s.id} className={`hover:bg-slate-50 transition-colors ${s.churnRisk === "high" ? "bg-red-50/20" : ""}`}>
                  <td className="px-4 py-3 font-medium text-slate-800">{s.client}</td>
                  <td className="px-4 py-3"><Badge variant={s.plan === "Enterprise" ? "primary" : s.plan === "Professional" ? "info" : "secondary"}>{s.plan}</Badge></td>
                  <td className="px-4 py-3 font-bold text-slate-800">${s.mrr.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-600">${s.arr.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-500">{s.seats}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{s.startDate}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{s.nextRenewal}</td>
                  <td className="px-4 py-3"><Badge dot variant={s.status === "active" ? "success" : "warning"}>{s.status}</Badge></td>
                  <td className="px-4 py-3">
                    <Badge variant={s.churnRisk === "low" ? "success" : s.churnRisk === "medium" ? "warning" : "danger"}>{s.churnRisk}</Badge>
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
