"use client";

import { DollarSign, Users, TrendingUp, Calendar, Download, RefreshCw } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import StatCard from "@/components/shared/StatCard";
import Badge from "@/components/shared/Badge";
import Link from "next/link";
import { ChartCard, ERPAreaChart } from "@/components/shared/Charts";
import { usePayrollRuns } from "@/lib/hooks/use-payroll";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";

const payrollTrend = [
  { month: "Sep", gross: 270000, net: 225000, deductions: 45000 },
  { month: "Oct", gross: 272000, net: 226000, deductions: 46000 },
  { month: "Nov", gross: 275000, net: 228000, deductions: 47000 },
  { month: "Dec", gross: 282000, net: 235000, deductions: 47000 },
  { month: "Jan", gross: 280000, net: 233000, deductions: 47000 },
  { month: "Feb", gross: 284500, net: 236800, deductions: 47700 },
];

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function PayrollPage() {
  const { data, isLoading, error, refetch } = usePayrollRuns();

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const runs = data?.data ?? [];
  const latest = runs[0];

  return (
    <div>
      <PageHeader
        title="Payroll Overview"
        description="Manage salary processing, payslips, and compensation"
        actions={
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
            <Link href="/hr/payroll/generate" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" /> Run Payroll
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="This Month's Payroll" value={latest ? `$${(latest.totalGross ?? 0).toLocaleString()}` : "—"} icon={DollarSign} variant="primary" />
        <StatCard title="Net Payable" value={latest ? `$${(latest.totalNet ?? 0).toLocaleString()}` : "—"} icon={TrendingUp} variant="info" />
        <StatCard title="Total Deductions" value={latest ? `$${(latest.totalDeductions ?? 0).toLocaleString()}` : "—"} icon={Calendar} variant="warning" />
        <StatCard title="Payroll Runs" value={runs.length} icon={Users} variant="success" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <ChartCard title="Payroll Trend (6 Months)" className="xl:col-span-2" description="Gross vs Net vs Deductions">
          <ERPAreaChart
            data={payrollTrend}
            dataKeys={[
              { key: "gross", name: "Gross Pay", color: "#4f46e5" },
              { key: "net", name: "Net Pay", color: "#10b981" },
              { key: "deductions", name: "Deductions", color: "#ef4444" },
            ]}
            xKey="month"
            formatY={(v) => `$${(v / 1000).toFixed(0)}k`}
            formatTooltip={(v) => `$${v.toLocaleString()}`}
          />
        </ChartCard>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Quick Navigation</h3>
          <div className="space-y-2">
            {[
              { label: "Salary Structure", href: "/hr/payroll/salary-structure", desc: "Define pay grades" },
              { label: "Generate Payroll", href: "/hr/payroll/generate", desc: "Process monthly payroll" },
              { label: "View Payslips", href: "/hr/payroll/payslips", desc: "Browse payslips" },
              { label: "Deductions & Bonuses", href: "/hr/payroll/deductions-bonuses", desc: "Manage adjustments" },
            ].map(({ label, href, desc }) => (
              <Link key={href} href={href} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:border-indigo-200 hover:bg-indigo-50/50 transition-colors group">
                <div>
                  <p className="text-sm font-medium text-slate-700 group-hover:text-indigo-700">{label}</p>
                  <p className="text-xs text-slate-400">{desc}</p>
                </div>
                <span className="text-slate-300 group-hover:text-indigo-400 text-lg">›</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">Payroll History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Period", "Processed On", "Gross Pay", "Net Pay", "Deductions", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {runs.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800">{MONTH_NAMES[(p.month ?? 1) - 1]} {p.year}</td>
                  <td className="px-4 py-3 text-slate-500">{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—"}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">${(p.totalGross ?? 0).toLocaleString()}</td>
                  <td className="px-4 py-3 font-medium text-emerald-700">${(p.totalNet ?? 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-600">${(p.totalDeductions ?? 0).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <Badge dot variant={p.status === "PAID" ? "success" : p.status === "APPROVED" ? "info" : p.status === "SUBMITTED" ? "warning" : "secondary"}>{p.status}</Badge>
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
