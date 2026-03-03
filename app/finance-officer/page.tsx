"use client";

import { TrendingUp, TrendingDown, Target, AlertCircle, DollarSign, FileBarChart } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import PageHeader from "@/components/shared/PageHeader";
import { ChartCard, ERPAreaChart, ERPBarChart, ERPPieChart } from "@/components/shared/Charts";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";
import Link from "next/link";
import { useFinancialSummary } from "@/lib/hooks/use-reports";
import { useBudgets } from "@/lib/hooks/use-budgets";

const revExpTrend = [
  { month: "Sep", revenue: 185000, expenses: 142000, budget: 180000 },
  { month: "Oct", revenue: 192000, expenses: 148000, budget: 190000 },
  { month: "Nov", revenue: 205000, expenses: 158000, budget: 200000 },
  { month: "Dec", revenue: 220000, expenses: 168000, budget: 210000 },
  { month: "Jan", revenue: 215000, expenses: 162000, budget: 215000 },
  { month: "Feb", revenue: 228000, expenses: 170000, budget: 220000 },
];

const expenseCategories = [
  { name: "Salaries", value: 284500, color: "#4f46e5" },
  { name: "Operations", value: 48000, color: "#10b981" },
  { name: "Marketing", value: 32000, color: "#f59e0b" },
  { name: "IT/Tech", value: 18000, color: "#3b82f6" },
  { name: "Other", value: 20000, color: "#8b5cf6" },
];

export default function FinanceOfficerDashboard() {
  const { data: financialSummary, isLoading: summaryLoading, error: summaryError, refetch: refetchSummary } = useFinancialSummary();
  const { data: budgetsData, isLoading: budgetsLoading, error: budgetsError, refetch: refetchBudgets } = useBudgets();

  const isLoading = summaryLoading || budgetsLoading;
  const error = summaryError || budgetsError;

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={() => { refetchSummary(); refetchBudgets(); }} />;

  const totalRevenue = financialSummary?.totalRevenue ?? 0;
  const totalExpenses = financialSummary?.totalExpenses ?? 0;
  const netIncome = financialSummary?.netIncome ?? 0;

  // Derive budget status from real budget data
  const budgets = budgetsData?.data ?? [];
  const budgetStatus = budgets.slice(0, 5).map((b) => ({
    dept: b.department?.name ?? b.name,
    budgeted: b.totalBudgeted ?? 0,
    actual: b.totalActual ?? 0,
  }));

  const totalBudget = budgetStatus.reduce((s, b) => s + b.budgeted, 0);
  const totalActual = budgetStatus.reduce((s, b) => s + b.actual, 0);
  const budgetUtilizationPct = totalBudget > 0 ? Math.round((totalActual / totalBudget) * 100) : 0;

  // Budget chart data
  const budgetChartData = budgetStatus.map((b) => ({
    dept: b.dept,
    budgeted: b.budgeted,
    actual: b.actual,
  }));

  // Budget alerts: departments over budget
  const budgetAlerts = budgetStatus
    .filter((b) => b.budgeted > 0 && b.actual / b.budgeted > 1)
    .map((b) => ({
      dept: b.dept,
      message: `${Math.round(((b.actual - b.budgeted) / b.budgeted) * 100)}% over budget — review required`,
      type: "danger" as const,
    }));

  const marginPct = totalRevenue > 0 ? ((netIncome / totalRevenue) * 100).toFixed(1) : "0.0";

  return (
    <div>
      <PageHeader
        title="Finance Officer Dashboard"
        description="Financial planning, budgeting, and performance overview"
        actions={
          <Link href="/finance-officer/reports" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <FileBarChart className="w-4 h-4" /> Generate Report
          </Link>
        }
      />

      {/* Budget Alerts */}
      {budgetAlerts.map((a, i) => (
        <div key={i} className={`flex items-center gap-2 px-4 py-3 rounded-xl border mb-3 text-sm ${
          a.type === "danger" ? "bg-red-50 border-red-200 text-red-700" : "bg-amber-50 border-amber-200 text-amber-700"
        }`}>
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span><strong>{a.dept}:</strong> {a.message}</span>
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
          title="Net Profit"
          value={`$${(netIncome / 1000).toFixed(0)}k`}
          icon={DollarSign}
          change={9.2}
          variant="primary"
          description={`${marginPct}% margin`}
        />
        <StatCard
          title="Budget Utilization"
          value={`${budgetUtilizationPct}%`}
          icon={Target}
          change={-2.1}
          variant="info"
          description={totalBudget > 0 ? `$${totalActual.toLocaleString()} / $${totalBudget.toLocaleString()}` : "No budgets"}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <ChartCard title="Revenue vs Expenses vs Budget" className="xl:col-span-2" description="Monthly financial performance">
          <ERPAreaChart
            data={revExpTrend}
            dataKeys={[
              { key: "revenue", name: "Revenue", color: "#10b981" },
              { key: "expenses", name: "Expenses", color: "#ef4444" },
              { key: "budget", name: "Budget Target", color: "#4f46e5" },
            ]}
            xKey="month"
            formatY={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
        </ChartCard>

        <ChartCard title="Expense Distribution" description="By category (YTD)">
          <ERPPieChart data={expenseCategories} formatValue={(v) => `$${v.toLocaleString()}`} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <ChartCard title="Budget vs Actual by Department" description="Current period">
          <ERPBarChart
            data={budgetChartData.length > 0 ? budgetChartData : [{ dept: "No data", budgeted: 0, actual: 0 }]}
            dataKeys={[
              { key: "budgeted", name: "Budgeted", color: "#94a3b8" },
              { key: "actual", name: "Actual", color: "#4f46e5" },
            ]}
            xKey="dept"
            formatY={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
        </ChartCard>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Department Budget Status</h3>
          <div className="space-y-4">
            {budgetStatus.length > 0 ? budgetStatus.map((dept) => {
              const pct = dept.budgeted > 0 ? Math.round((dept.actual / dept.budgeted) * 100) : 0;
              const over = pct > 100;
              return (
                <div key={dept.dept}>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span className="font-medium">{dept.dept}</span>
                    <span className={over ? "text-red-600 font-semibold" : "text-slate-500"}>
                      ${dept.actual.toLocaleString()} / ${dept.budgeted.toLocaleString()} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${over ? "bg-red-500" : pct > 85 ? "bg-amber-500" : "bg-indigo-500"}`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
              );
            }) : (
              <p className="text-sm text-slate-400 text-center py-4">No budget data available</p>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
            <Link href="/finance-officer/budget-management/create" className="px-3 py-2 text-xs text-center text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg font-medium transition-colors">
              Create Budget
            </Link>
            <Link href="/finance-officer/budget-management/approve" className="px-3 py-2 text-xs text-center text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors">
              Approve Budgets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
