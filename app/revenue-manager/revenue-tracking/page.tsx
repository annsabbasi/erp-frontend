"use client";

import { TrendingUp, DollarSign, RefreshCw, Sliders } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import StatCard from "@/components/shared/StatCard";
import { ChartCard, ERPLineChart, ERPBarChart } from "@/components/shared/Charts";
import Link from "next/link";

const monthlyRevenue = [
  { month: "Sep", revenue: 178000, target: 175000 },
  { month: "Oct", revenue: 192000, target: 185000 },
  { month: "Nov", revenue: 205000, target: 195000 },
  { month: "Dec", revenue: 220000, target: 205000 },
  { month: "Jan", revenue: 215000, target: 210000 },
  { month: "Feb", revenue: 228000, target: 220000 },
];

const sourceBreakdown = [
  { source: "Services", q1: 450000, ytd: 450000 },
  { source: "Products", q1: 140000, ytd: 140000 },
  { source: "Subscriptions", q1: 75000, ytd: 75000 },
  { source: "Consulting", q1: 82000, ytd: 82000 },
];

const trackingLinks = [
  { label: "Income Sources", href: "/revenue-manager/revenue-tracking/income-sources", icon: DollarSign, desc: "Track all revenue sources" },
  { label: "Sales Reports", href: "/revenue-manager/revenue-tracking/sales-reports", icon: TrendingUp, desc: "Detailed sales analytics" },
  { label: "Recurring Income", href: "/revenue-manager/revenue-tracking/recurring-income", icon: RefreshCw, desc: "MRR & subscription tracking" },
  { label: "Adjustments", href: "/revenue-manager/revenue-tracking/adjustments", icon: Sliders, desc: "Revenue corrections" },
];

export default function RevenueTrackingPage() {
  return (
    <div>
      <PageHeader title="Revenue Tracking" description="Monitor and analyze all revenue streams" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="YTD Revenue" value="$747k" icon={DollarSign} change={9.2} variant="primary" />
        <StatCard title="Feb Revenue" value="$228k" icon={TrendingUp} change={6.0} variant="success" />
        <StatCard title="vs Target" value="+3.6%" icon={TrendingUp} change={3.6} variant="info" />
        <StatCard title="MRR" value="$28k" icon={RefreshCw} change={-3.4} variant="warning" description="Monthly Recurring" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Revenue vs Target (6 Months)" description="Actual performance vs targets">
          <ERPLineChart
            data={monthlyRevenue}
            dataKeys={[
              { key: "revenue", name: "Actual", color: "#4f46e5" },
              { key: "target", name: "Target", color: "#94a3b8" },
            ]}
            xKey="month"
            formatY={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
        </ChartCard>

        <ChartCard title="Revenue by Source (Q1 YTD)">
          <ERPBarChart
            data={sourceBreakdown}
            dataKeys={[{ key: "ytd", name: "YTD Revenue", color: "#4f46e5" }]}
            xKey="source"
            formatY={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trackingLinks.map(({ label, href, icon: Icon, desc }) => (
          <Link key={href} href={href} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:border-indigo-200 hover:shadow-md transition-all group">
            <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
              <Icon className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-sm font-semibold text-slate-800">{label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
