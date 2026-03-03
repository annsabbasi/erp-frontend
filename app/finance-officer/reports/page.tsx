"use client";

import { FileBarChart, Download, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { ChartCard, ERPAreaChart } from "@/components/shared/Charts";
import { useFinancialSummary, useIncomeStatement, useBalanceSheet, useCashFlow } from "@/lib/hooks/use-reports";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";

const now = new Date();
const startDate = `${now.getFullYear()}-01-01`;
const endDate = new Date().toISOString().split("T")[0];

const plData = [
  { month: "Sep", revenue: 185000, expenses: 142000, profit: 43000 },
  { month: "Oct", revenue: 192000, expenses: 148000, profit: 44000 },
  { month: "Nov", revenue: 205000, expenses: 158000, profit: 47000 },
  { month: "Dec", revenue: 220000, expenses: 168000, profit: 52000 },
  { month: "Jan", revenue: 215000, expenses: 162000, profit: 53000 },
  { month: "Feb", revenue: 228000, expenses: 170000, profit: 58000 },
];

export default function ReportsPage() {
  const { data: summary, isLoading: summaryLoading, error: summaryError, refetch: refetchSummary } = useFinancialSummary();
  const { data: incomeStatement, isLoading: isLoading2, error: error2 } = useIncomeStatement({ startDate, endDate });
  const { data: balanceSheet, isLoading: isLoading3, error: error3 } = useBalanceSheet();
  const { data: cashFlow, isLoading: isLoading4, error: error4 } = useCashFlow({ startDate, endDate });

  const isLoading = summaryLoading || isLoading2 || isLoading3 || isLoading4;
  const error = summaryError || error2 || error3 || error4;

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetchSummary} />;

  const reports = [
    {
      name: "Profit & Loss Statement",
      period: `${startDate} – ${endDate}`,
      type: "YTD",
      status: incomeStatement ? "ready" : "in-progress",
      icon: TrendingUp,
      summary: incomeStatement ? `Net Income: $${(incomeStatement.netIncome ?? 0).toLocaleString()}` : null,
    },
    {
      name: "Balance Sheet",
      period: endDate,
      type: "Current",
      status: balanceSheet ? "ready" : "in-progress",
      icon: DollarSign,
      summary: balanceSheet ? `Total Assets: $${(balanceSheet.totalAssets ?? 0).toLocaleString()}` : null,
    },
    {
      name: "Cash Flow Statement",
      period: `${startDate} – ${endDate}`,
      type: "YTD",
      status: cashFlow ? "ready" : "in-progress",
      icon: TrendingDown,
      summary: cashFlow ? `Net Cash Flow: $${(cashFlow.netCashFlow ?? 0).toLocaleString()}` : null,
    },
    {
      name: "Financial Summary",
      period: endDate,
      type: "Current",
      status: summary ? "ready" : "in-progress",
      icon: FileBarChart,
      summary: summary ? `Revenue: $${(summary.totalRevenue ?? 0).toLocaleString()}` : null,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Financial Reports"
        description="Generate and download management-level financial reports"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <FileBarChart className="w-4 h-4" /> Generate Custom Report
          </button>
        }
      />

      <ChartCard title="P&L Overview (6 Months)" description="Revenue, Expenses & Net Profit trend" className="mb-6">
        <ERPAreaChart
          data={plData}
          dataKeys={[
            { key: "revenue", name: "Revenue", color: "#10b981" },
            { key: "expenses", name: "Expenses", color: "#ef4444" },
            { key: "profit", name: "Net Profit", color: "#4f46e5" },
          ]}
          xKey="month"
          formatY={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
      </ChartCard>

      {summary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Revenue", value: summary.totalRevenue, color: "text-emerald-700" },
            { label: "Total Expenses", value: summary.totalExpenses, color: "text-red-700" },
            { label: "Net Income", value: summary.netIncome, color: "text-indigo-700" },
            { label: "Cash Balance", value: summary.cashBalance, color: "text-blue-700" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs text-slate-500">{label}</p>
              <p className={`text-xl font-bold mt-1 ${color}`}>${(value ?? 0).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {reports.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.name} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-800">{r.name}</h3>
                  <p className="text-xs text-slate-400">{r.period} · {r.type}</p>
                  {r.summary && <p className="text-xs text-indigo-600 mt-0.5 font-medium">{r.summary}</p>}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${r.status === "ready" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                  {r.status === "ready" ? "Ready to download" : "Generating..."}
                </span>
                {r.status === "ready" && (
                  <button className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
