"use client";

import { TrendingUp, DollarSign, ShoppingCart, RefreshCw, Receipt } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { ChartCard, ERPAreaChart, ERPPieChart } from "@/components/shared/Charts";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";
import Link from "next/link";
import { useRevenueStats } from "@/lib/hooks/use-revenue";
import { useInvoiceStats, useInvoices } from "@/lib/hooks/use-invoices";

export default function RevenueManagerDashboard() {
  const { data: revenueStats, isLoading: revenueLoading, error: revenueError, refetch: refetchRevenue } = useRevenueStats();
  const { data: invoiceStats, isLoading: invoiceStatsLoading, error: invoiceStatsError, refetch: refetchInvoiceStats } = useInvoiceStats();
  const { data: invoicesData, isLoading: invoicesLoading, error: invoicesError, refetch: refetchInvoices } = useInvoices();

  const isLoading = revenueLoading || invoiceStatsLoading || invoicesLoading;
  const error = revenueError || invoiceStatsError || invoicesError;

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={() => { refetchRevenue(); refetchInvoiceStats(); refetchInvoices(); }} />;

  const totalRevenue = revenueStats?.totalRevenue ?? 0;
  const monthlyRevenue = revenueStats?.monthlyRevenue ?? 0;
  const growth = revenueStats?.growth ?? 0;
  const outstanding = invoiceStats?.outstanding ?? 0;
  const overdueAmount = invoiceStats?.overdueAmount ?? 0;

  // Build monthly trend chart data from revenueStats.monthlyTrend
  const monthlyTrend = revenueStats?.monthlyTrend ?? [];
  const trendChartData = monthlyTrend.map((t) => ({
    month: t.month,
    revenue: t.amount,
  }));

  // Build pie chart from bySource
  const bySource = revenueStats?.bySource ?? {};
  const sourceColors = ["#4f46e5", "#10b981", "#f59e0b", "#3b82f6", "#8b5cf6", "#ef4444"];
  const revenueBySource = Object.entries(bySource).map(([name, value], i) => ({
    name,
    value: value as number,
    color: sourceColors[i % sourceColors.length],
  }));

  // Recent invoices: last 4
  const recentInvoices = (invoicesData?.data ?? [])
    .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
    .slice(0, 4);

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
        <StatCard
          title="Total Revenue"
          value={`$${(totalRevenue / 1000).toFixed(0)}k`}
          icon={DollarSign}
          change={growth}
          variant="primary"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${(monthlyRevenue / 1000).toFixed(0)}k`}
          icon={TrendingUp}
          change={growth}
          variant="success"
        />
        <StatCard
          title="Outstanding Invoices"
          value={`$${(outstanding / 1000).toFixed(0)}k`}
          icon={ShoppingCart}
          change={12.1}
          variant="warning"
          description={`${invoiceStats?.sent ?? 0} invoices sent`}
        />
        <StatCard
          title="Overdue Amount"
          value={`$${(overdueAmount / 1000).toFixed(0)}k`}
          icon={RefreshCw}
          change={-3.4}
          variant="danger"
          description={`${invoiceStats?.overdue ?? 0} overdue`}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <ChartCard title="Monthly Revenue Trend" className="xl:col-span-2" description="Revenue over time by month">
          <ERPAreaChart
            data={trendChartData.length > 0 ? trendChartData : [{ month: "No data", revenue: 0 }]}
            dataKeys={[
              { key: "revenue", name: "Revenue", color: "#4f46e5" },
            ]}
            xKey="month"
            formatY={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
        </ChartCard>

        <ChartCard title="Revenue by Source" description="Breakdown by income source">
          <ERPPieChart
            data={revenueBySource.length > 0 ? revenueBySource : [{ name: "No data", value: 1, color: "#e2e8f0" }]}
            formatValue={(v) => `$${v.toLocaleString()}`}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Invoice Summary */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800">Invoice Summary</h3>
            <Link href="/revenue-manager/invoicing" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">View all</Link>
          </div>
          <div className="p-5 grid grid-cols-2 gap-4">
            {[
              { label: "Total Invoices", value: invoiceStats?.total ?? 0, color: "text-slate-800" },
              { label: "Draft", value: invoiceStats?.draft ?? 0, color: "text-slate-500" },
              { label: "Sent", value: invoiceStats?.sent ?? 0, color: "text-blue-600" },
              { label: "Paid", value: invoiceStats?.paid ?? 0, color: "text-emerald-600" },
              { label: "Overdue", value: invoiceStats?.overdue ?? 0, color: "text-red-600" },
              { label: "Total Billed", value: `$${((invoiceStats?.totalRevenue ?? 0) / 1000).toFixed(0)}k`, color: "text-indigo-600" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-500 mb-1">{label}</p>
                <p className={`text-lg font-bold ${color}`}>{value}</p>
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
            {recentInvoices.length > 0 ? recentInvoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <Receipt className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{inv.client?.name ?? "—"}</p>
                    <p className="text-xs text-slate-400">
                      {inv.invoiceNumber} ·{" "}
                      {new Date(inv.issueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-800">${inv.totalAmount.toLocaleString()}</span>
                  <Badge
                    dot
                    variant={
                      inv.status === "PAID" ? "success" :
                      inv.status === "OVERDUE" ? "danger" :
                      inv.status === "SENT" ? "info" : "secondary"
                    }
                  >
                    {inv.status.toLowerCase()}
                  </Badge>
                </div>
              </div>
            )) : (
              <div className="px-5 py-8 text-center text-sm text-slate-400">No invoices found</div>
            )}
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
