"use client";

import { DollarSign, Users, TrendingUp, Calendar, Download, RefreshCw } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import StatCard from "@/components/shared/StatCard";
import Badge from "@/components/shared/Badge";
import Link from "next/link";
import { ChartCard, ERPAreaChart } from "@/components/shared/Charts";

const payrollTrend = [
  { month: "Sep", gross: 270000, net: 225000, deductions: 45000 },
  { month: "Oct", gross: 272000, net: 226000, deductions: 46000 },
  { month: "Nov", gross: 275000, net: 228000, deductions: 47000 },
  { month: "Dec", gross: 282000, net: 235000, deductions: 47000 },
  { month: "Jan", gross: 280000, net: 233000, deductions: 47000 },
  { month: "Feb", gross: 284500, net: 236800, deductions: 47700 },
];

const recentPayroll = [
  { period: "February 2026", processed: "Feb 25, 2026", employees: 62, gross: "$284,500", net: "$236,800", status: "processed" },
  { period: "January 2026", processed: "Jan 27, 2026", employees: 60, gross: "$280,000", net: "$233,200", status: "processed" },
  { period: "December 2025", processed: "Dec 27, 2025", employees: 60, gross: "$282,000", net: "$234,900", status: "processed" },
  { period: "March 2026", processed: "—", employees: 62, gross: "~$285,000", net: "~$237,500", status: "pending" },
];

export default function PayrollPage() {
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
        <StatCard title="This Month's Payroll" value="$284,500" icon={DollarSign} change={1.6} variant="primary" />
        <StatCard title="Employees Paid" value="62" icon={Users} change={3.3} variant="success" />
        <StatCard title="Net Payable" value="$236,800" icon={TrendingUp} change={1.5} variant="info" />
        <StatCard title="Total Deductions" value="$47,700" icon={Calendar} change={1.5} variant="warning" />
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
                {["Period", "Processed On", "Employees", "Gross Pay", "Net Pay", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentPayroll.map((p) => (
                <tr key={p.period} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800">{p.period}</td>
                  <td className="px-4 py-3 text-slate-500">{p.processed}</td>
                  <td className="px-4 py-3 text-slate-600">{p.employees}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{p.gross}</td>
                  <td className="px-4 py-3 font-medium text-emerald-700">{p.net}</td>
                  <td className="px-4 py-3">
                    <Badge dot variant={p.status === "processed" ? "success" : "warning"}>{p.status}</Badge>
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
