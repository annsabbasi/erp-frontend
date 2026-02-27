"use client";

import { PieChart, TrendingUp, TrendingDown, DollarSign, BarChart2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import StatCard from "@/components/shared/StatCard";
import Badge from "@/components/shared/Badge";
import { ChartCard, ERPAreaChart, ERPPieChart, ERPBarChart } from "@/components/shared/Charts";

const plTrend = [
  { month: "Sep", revenue: 185000, expenses: 142000, profit: 43000 },
  { month: "Oct", revenue: 192000, expenses: 148000, profit: 44000 },
  { month: "Nov", revenue: 205000, expenses: 158000, profit: 47000 },
  { month: "Dec", revenue: 220000, expenses: 168000, profit: 52000 },
  { month: "Jan", revenue: 215000, expenses: 162000, profit: 53000 },
  { month: "Feb", revenue: 228000, expenses: 170000, profit: 58000 },
];

const assetBreakdown = [
  { name: "Current Assets", value: 384500, color: "#4f46e5" },
  { name: "Fixed Assets", value: 215000, color: "#06b6d4" },
  { name: "Intangible Assets", value: 48000, color: "#f59e0b" },
  { name: "Other Assets", value: 22500, color: "#8b5cf6" },
];

const balanceSheet = [
  { category: "Total Assets", amount: 670000, type: "asset" as const },
  { category: "Total Liabilities", amount: 285000, type: "liability" as const },
  { category: "Equity", amount: 385000, type: "equity" as const },
];

const keyMetrics = [
  { label: "Current Ratio", value: "2.4x", status: "good", note: "Current Assets / Current Liabilities" },
  { label: "Debt-to-Equity", value: "0.74x", status: "good", note: "Total Debt / Total Equity" },
  { label: "Gross Profit Margin", value: "25.4%", status: "good", note: "Gross Profit / Revenue" },
  { label: "Net Profit Margin", value: "18.3%", status: "good", note: "Net Profit / Revenue" },
  { label: "Return on Assets", value: "8.7%", status: "moderate", note: "Net Income / Total Assets" },
  { label: "Operating Cash Flow", value: "$54,200", status: "good", note: "Feb 2026" },
];

export default function FinancialSummaryPage() {
  const netProfit = 58000;
  const revenue = 228000;
  const expenses = 170000;

  return (
    <div>
      <PageHeader
        title="Financial Summary"
        description="Consolidated financial position — Balance Sheet, P&L, and key ratios"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            <BarChart2 className="w-4 h-4" /> Export Summary
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="Revenue (Feb)" value={`$${revenue.toLocaleString()}`} icon={TrendingUp} variant="success" change={6.0} />
        <StatCard title="Expenses (Feb)" value={`$${expenses.toLocaleString()}`} icon={TrendingDown} variant="danger" change={4.9} />
        <StatCard title="Net Profit" value={`$${netProfit.toLocaleString()}`} icon={DollarSign} variant="primary" change={9.4} />
        <StatCard title="Total Assets" value="$670,000" icon={PieChart} variant="info" description="Balance Sheet" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <ChartCard title="P&L Trend (6 Months)" description="Revenue, Expenses & Net Profit">
          <ERPAreaChart
            data={plTrend}
            dataKeys={[
              { key: "revenue", name: "Revenue", color: "#10b981" },
              { key: "expenses", name: "Expenses", color: "#ef4444" },
              { key: "profit", name: "Net Profit", color: "#4f46e5" },
            ]}
            xKey="month"
            formatY={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
        </ChartCard>

        <ChartCard title="Asset Composition" description="Feb 2026 balance sheet breakdown">
          <ERPPieChart
            data={assetBreakdown}
            formatValue={(v) => `$${v.toLocaleString()}`}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Balance Sheet Summary */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800">Balance Sheet Summary</h3>
            <p className="text-xs text-slate-400 mt-0.5">As of Feb 28, 2026</p>
          </div>
          <div className="p-5 space-y-4">
            {balanceSheet.map((b) => (
              <div key={b.category} className={`flex items-center justify-between p-3 rounded-lg ${b.type === "asset" ? "bg-emerald-50" : b.type === "liability" ? "bg-red-50" : "bg-indigo-50"}`}>
                <div>
                  <p className="text-sm font-medium text-slate-700">{b.category}</p>
                  <p className="text-xs text-slate-400 capitalize">{b.type}</p>
                </div>
                <p className={`text-lg font-bold ${b.type === "asset" ? "text-emerald-700" : b.type === "liability" ? "text-red-700" : "text-indigo-700"}`}>
                  ${b.amount.toLocaleString()}
                </p>
              </div>
            ))}
            <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
              <p className="text-xs text-slate-500">Liabilities + Equity</p>
              <p className="text-sm font-bold text-slate-900">
                ${(285000 + 385000).toLocaleString()}
                <span className="ml-2 text-xs font-normal text-emerald-600">= Assets ✓</span>
              </p>
            </div>
          </div>
        </div>

        {/* Key Financial Ratios */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Key Financial Ratios</h3>
          <div className="space-y-3">
            {keyMetrics.map((m) => (
              <div key={m.label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-700">{m.label}</p>
                  <p className="text-xs text-slate-400">{m.note}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{m.value}</span>
                  <Badge variant={m.status === "good" ? "success" : "warning"}>
                    {m.status === "good" ? "Good" : "Moderate"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
