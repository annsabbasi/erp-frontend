"use client";

import { TrendingUp, DollarSign, ShoppingCart, RefreshCw, Receipt, Tag } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { ChartCard, ERPAreaChart, ERPBarChart, ERPPieChart } from "@/components/shared/Charts";
import Link from "next/link";

const revenueTrend = [
  { month: "Sep", services: 120000, products: 40000, subscriptions: 18000 },
  { month: "Oct", services: 128000, products: 44000, subscriptions: 20000 },
  { month: "Nov", services: 138000, products: 48000, subscriptions: 19000 },
  { month: "Dec", services: 145000, products: 52000, subscriptions: 23000 },
  { month: "Jan", services: 140000, products: 46000, subscriptions: 29000 },
  { month: "Feb", services: 152000, products: 48000, subscriptions: 28000 },
];

const topClients = [
  { client: "GlobalCorp Ltd.", revenue: 48500, growth: 12.4 },
  { client: "Innovation Labs", revenue: 42000, growth: 8.2 },
  { client: "TechVentures Inc.", revenue: 38600, growth: 22.1 },
  { client: "StartupXYZ", revenue: 24500, growth: -3.4 },
  { client: "Acme Corp.", revenue: 18200, growth: 5.8 },
];

const revenueBySource = [
  { name: "Service Revenue", value: 152000, color: "#4f46e5" },
  { name: "Product Sales", value: 48000, color: "#10b981" },
  { name: "Subscriptions", value: 28000, color: "#f59e0b" },
];

const recentInvoices = [
  { id: "INV-042", client: "GlobalCorp Ltd.", amount: 24500, date: "Feb 27", status: "paid" },
  { id: "INV-053", client: "StartupXYZ", amount: 15800, date: "Mar 3", status: "pending" },
  { id: "INV-056", client: "Innovation Labs", amount: 42000, date: "Mar 20", status: "sent" },
  { id: "INV-057", client: "Acme Corp.", amount: 9800, date: "Mar 25", status: "draft" },
];

export default function RevenueManagerDashboard() {
  const currentMonth = revenueTrend[revenueTrend.length - 1];
  const totalRevenue = currentMonth.services + currentMonth.products + currentMonth.subscriptions;
  const prevMonth = revenueTrend[revenueTrend.length - 2];
  const prevTotal = prevMonth.services + prevMonth.products + prevMonth.subscriptions;
  const growth = (((totalRevenue - prevTotal) / prevTotal) * 100).toFixed(1);

  return (
    <div>
      <PageHeader
        title="Revenue Manager Dashboard"
        description="Monitor revenue streams, billing, and sales performance"
        actions={
          <Link href="/revenue-manager/invoicing" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Receipt className="w-4 h-4" /> Create Invoice
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Revenue (Feb)" value={`$${(totalRevenue / 1000).toFixed(0)}k`} icon={DollarSign} change={parseFloat(growth)} variant="primary" />
        <StatCard title="Service Revenue" value="$152,000" icon={TrendingUp} change={8.6} variant="success" />
        <StatCard title="Subscriptions MRR" value="$28,000" icon={RefreshCw} change={-3.4} variant="warning" description="Monthly Recurring Revenue" />
        <StatCard title="Outstanding Invoices" value="$67,800" icon={ShoppingCart} change={12.1} variant="danger" description="3 invoices pending" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <ChartCard title="Revenue by Stream (6 Months)" className="xl:col-span-2" description="Service, Product & Subscription revenue">
          <ERPAreaChart
            data={revenueTrend}
            dataKeys={[
              { key: "services", name: "Services", color: "#4f46e5" },
              { key: "products", name: "Products", color: "#10b981" },
              { key: "subscriptions", name: "Subscriptions", color: "#f59e0b" },
            ]}
            xKey="month"
            formatY={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
        </ChartCard>

        <ChartCard title="Revenue Mix (Feb)" description="By source">
          <ERPPieChart data={revenueBySource} formatTooltip={(v) => `$${v.toLocaleString()}`} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Top Clients */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800">Top Clients (Feb)</h3>
            <Link href="/revenue-manager/revenue-tracking/sales-reports" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">Full Report</Link>
          </div>
          <div className="divide-y divide-slate-50">
            {topClients.map((c, i) => (
              <div key={c.client} className="flex items-center px-5 py-3">
                <span className="w-6 text-xs text-slate-400 font-medium">{i + 1}</span>
                <div className="flex-1 min-w-0 ml-2">
                  <p className="text-sm font-medium text-slate-700 truncate">{c.client}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="h-1.5 bg-slate-100 rounded-full w-24 overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(c.revenue / topClients[0].revenue) * 100}%` }} />
                    </div>
                  </div>
                </div>
                <div className="text-right ml-3">
                  <p className="text-sm font-bold text-slate-800">${c.revenue.toLocaleString()}</p>
                  <p className={`text-xs ${c.growth >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {c.growth >= 0 ? "+" : ""}{c.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800">Recent Invoices</h3>
            <Link href="/revenue-manager/invoicing" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">View all</Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentInvoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <Receipt className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{inv.client}</p>
                    <p className="text-xs text-slate-400">{inv.id} · {inv.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-800">${inv.amount.toLocaleString()}</span>
                  <Badge dot variant={inv.status === "paid" ? "success" : inv.status === "pending" ? "warning" : inv.status === "sent" ? "info" : "secondary"}>
                    {inv.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-slate-100">
            <Link href="/revenue-manager/invoicing" className="w-full flex items-center justify-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium py-1">
              <Receipt className="w-3.5 h-3.5" /> Create New Invoice
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
