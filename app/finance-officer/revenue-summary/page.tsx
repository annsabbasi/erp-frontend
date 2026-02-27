"use client";

import { TrendingUp, TrendingDown, DollarSign, BarChart2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import StatCard from "@/components/shared/StatCard";
import Badge from "@/components/shared/Badge";
import { ChartCard, ERPAreaChart, ERPBarChart } from "@/components/shared/Charts";

const monthlyRevenue = [
  { month: "Sep", revenue: 185000, target: 180000, growth: 2.8 },
  { month: "Oct", revenue: 192000, target: 185000, growth: 3.8 },
  { month: "Nov", revenue: 205000, target: 195000, growth: 5.1 },
  { month: "Dec", revenue: 220000, target: 210000, growth: 4.8 },
  { month: "Jan", revenue: 215000, target: 220000, growth: -2.3 },
  { month: "Feb", revenue: 228000, target: 225000, growth: 6.0 },
];

const revenueStreams = [
  { name: "Software Licenses", amount: 98500, share: 43.2, change: 8.1, trend: "up" as const },
  { name: "Professional Services", amount: 62000, share: 27.2, change: 4.3, trend: "up" as const },
  { name: "Support & Maintenance", amount: 34800, share: 15.3, change: -1.2, trend: "down" as const },
  { name: "Training & Consulting", amount: 22400, share: 9.8, change: 12.5, trend: "up" as const },
  { name: "Implementation Fees", amount: 10300, share: 4.5, change: 6.7, trend: "up" as const },
];

const topClients = [
  { client: "GlobalCorp Ltd.", revenue: 48500, yoy: 12.4, status: "active" },
  { client: "Innovation Labs", revenue: 38200, yoy: 8.7, status: "active" },
  { client: "TechVentures Inc.", revenue: 31600, yoy: -3.1, status: "at-risk" },
  { client: "BlueSky Inc.", revenue: 22800, yoy: 21.5, status: "growing" },
  { client: "Acme Corp.", revenue: 18900, yoy: 5.2, status: "active" },
];

const totalRevenue = 228000;
const targetRevenue = 225000;
const achievementRate = ((totalRevenue / targetRevenue) * 100).toFixed(1);
const yoyGrowth = 6.0;

export default function RevenueSummaryPage() {
  return (
    <div>
      <PageHeader
        title="Revenue Summary"
        description="Comprehensive view of revenue performance and trends"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            <BarChart2 className="w-4 h-4" /> Export Report
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Revenue (Feb)" value={`$${totalRevenue.toLocaleString()}`} icon={DollarSign} variant="primary" change={yoyGrowth} changeLabel="vs last month" />
        <StatCard title="Revenue Target" value={`$${targetRevenue.toLocaleString()}`} icon={TrendingUp} variant="info" description="Feb 2026 target" />
        <StatCard title="Achievement Rate" value={`${achievementRate}%`} icon={BarChart2} variant="success" description="Target attainment" />
        <StatCard title="YoY Growth" value={`${yoyGrowth}%`} icon={TrendingUp} variant="success" change={yoyGrowth} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Revenue vs Target (6 Months)" description="Actual revenue compared to monthly targets">
          <ERPAreaChart
            data={monthlyRevenue}
            dataKeys={[
              { key: "revenue", name: "Actual Revenue", color: "#4f46e5" },
              { key: "target", name: "Target", color: "#94a3b8" },
            ]}
            xKey="month"
            formatY={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
        </ChartCard>

        <ChartCard title="Revenue by Stream" description="Feb 2026 breakdown by source">
          <ERPBarChart
            data={revenueStreams}
            dataKeys={[{ key: "amount", name: "Revenue", color: "#4f46e5" }]}
            xKey="name"
            formatY={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Revenue Streams Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Revenue Stream Breakdown</h3>
          <div className="space-y-4">
            {revenueStreams.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-700">{s.name}</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium flex items-center gap-0.5 ${s.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                      {s.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {s.change > 0 ? "+" : ""}{s.change}%
                    </span>
                    <span className="text-sm font-bold text-slate-900">${s.amount.toLocaleString()}</span>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${s.share}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{s.share}% of total revenue</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clients */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800">Top Revenue Clients</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Client", "Revenue", "YoY", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {topClients.map((c) => (
                <tr key={c.client} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800">{c.client}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">${c.revenue.toLocaleString()}</td>
                  <td className={`px-4 py-3 text-xs font-medium ${c.yoy >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {c.yoy >= 0 ? "+" : ""}{c.yoy}%
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={c.status === "growing" ? "success" : c.status === "at-risk" ? "danger" : "primary"} dot>
                      {c.status}
                    </Badge>
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
