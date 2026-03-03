"use client";

import { DollarSign, TrendingUp, TrendingDown, AlertCircle, CreditCard, BarChart3 } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { ChartCard, ERPAreaChart, ERPBarChart } from "@/components/shared/Charts";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";
import Link from "next/link";
import { useFinancialSummary } from "@/lib/hooks/use-reports";
import { useJournalEntries } from "@/lib/hooks/use-journal-entries";

const plTrend = [
  { month: "Sep", income: 185000, expenses: 142000 },
  { month: "Oct", income: 192000, expenses: 148000 },
  { month: "Nov", income: 205000, expenses: 158000 },
  { month: "Dec", income: 220000, expenses: 168000 },
  { month: "Jan", income: 215000, expenses: 162000 },
  { month: "Feb", income: 228000, expenses: 170000 },
];

const expenseBreakdown = [
  { category: "Salaries", amount: 284500 },
  { category: "Operations", amount: 48000 },
  { category: "Marketing", amount: 32000 },
  { category: "IT/Tech", amount: 18000 },
  { category: "Utilities", amount: 12000 },
  { category: "Other", amount: 8000 },
];

const alerts = [
  { msg: "Invoice INV-2026-042 overdue by 15 days", type: "danger" },
  { msg: "Bank statement reconciliation pending for Feb", type: "warning" },
  { msg: "2 expense reports awaiting approval", type: "warning" },
];

export default function AccountantDashboard() {
  const { data: financialSummary, isLoading: summaryLoading, error: summaryError, refetch: refetchSummary } = useFinancialSummary();
  const { data: journalData, isLoading: journalLoading, error: journalError, refetch: refetchJournal } = useJournalEntries();

  const isLoading = summaryLoading || journalLoading;
  const error = summaryError || journalError;

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={() => { refetchSummary(); refetchJournal(); }} />;

  const totalRevenue = financialSummary?.totalRevenue ?? 0;
  const totalExpenses = financialSummary?.totalExpenses ?? 0;
  const netIncome = financialSummary?.netIncome ?? 0;
  const accountsReceivable = financialSummary?.accountsReceivable ?? 0;

  // Recent journal entries as "transactions"
  const recentEntries = (journalData?.data ?? []).slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Accountant Dashboard"
        description="Financial overview, transactions, and reconciliation status"
        actions={
          <Link href="/accountant/transactions" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <BarChart3 className="w-4 h-4" /> View Transactions
          </Link>
        }
      />

      {/* Alerts */}
      {alerts.map((a, i) => (
        <div key={i} className={`flex items-center gap-2 px-4 py-3 rounded-xl border mb-3 text-sm ${
          a.type === "danger" ? "bg-red-50 border-red-200 text-red-700" : "bg-amber-50 border-amber-200 text-amber-700"
        }`}>
          <AlertCircle className="w-4 h-4 shrink-0" />
          {a.msg}
        </div>
      ))}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Revenue"
          value={`$${(totalRevenue / 1000).toFixed(0)}k`}
          icon={TrendingUp}
          change={financialSummary?.revenueGrowth ?? 6.0}
          variant="success"
        />
        <StatCard
          title="Total Expenses"
          value={`$${(totalExpenses / 1000).toFixed(0)}k`}
          icon={TrendingDown}
          change={financialSummary?.expenseGrowth ?? 4.9}
          variant="danger"
        />
        <StatCard
          title="Net Income"
          value={`$${(netIncome / 1000).toFixed(0)}k`}
          icon={DollarSign}
          change={9.2}
          variant="primary"
        />
        <StatCard
          title="Accounts Receivable"
          value={`$${(accountsReceivable / 1000).toFixed(0)}k`}
          icon={CreditCard}
          change={-12.5}
          variant="warning"
          description="Outstanding balance"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Income vs Expenses (6 Months)" description="Monthly P&L trend">
          <ERPAreaChart
            data={plTrend}
            dataKeys={[
              { key: "income", name: "Revenue", color: "#10b981" },
              { key: "expenses", name: "Expenses", color: "#ef4444" },
            ]}
            xKey="month"
            formatY={(v) => `$${(v / 1000).toFixed(0)}k`}
            formatTooltip={(v) => `$${v.toLocaleString()}`}
          />
        </ChartCard>

        <ChartCard title="Expense Breakdown (YTD)" description="By category">
          <ERPBarChart
            data={expenseBreakdown}
            dataKeys={[{ key: "amount", name: "Amount ($)", color: "#4f46e5" }]}
            xKey="category"
            formatY={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
        </ChartCard>
      </div>

      {/* Recent Journal Entries */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">Recent Journal Entries</h3>
          <Link href="/accountant/transactions" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Entry ID", "Description", "Type", "Total Debit", "Date", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentEntries.length > 0 ? recentEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{entry.id.slice(0, 8)}…</code></td>
                  <td className="px-4 py-3 text-slate-700 max-w-xs truncate">{entry.description}</td>
                  <td className="px-4 py-3">
                    <Badge variant={entry.type === "INVOICING" ? "success" : entry.type === "PAYROLL" ? "warning" : "primary"}>
                      {entry.type}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800">
                    ${(entry.totalDebit ?? 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </td>
                  <td className="px-4 py-3">
                    <Badge dot variant={entry.status === "POSTED" ? "success" : entry.status === "DRAFT" ? "warning" : "secondary"}>
                      {entry.status}
                    </Badge>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-400">No journal entries found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
