"use client";

import { Download, Eye, Printer } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { useState } from "react";

const payslips = [
  { id: "PS-2026-02-001", employee: "Sarah Johnson", empId: "EMP001", period: "February 2026", gross: 7744, deductions: 1020, net: 6724, date: "Feb 25, 2026", status: "paid" },
  { id: "PS-2026-02-002", employee: "Mike Chen", empId: "EMP002", period: "February 2026", gross: 9886, deductions: 1280, net: 8606, date: "Feb 25, 2026", status: "paid" },
  { id: "PS-2026-02-003", employee: "Emily Davis", empId: "EMP003", period: "February 2026", gross: 8864, deductions: 1180, net: 7684, date: "Feb 25, 2026", status: "paid" },
  { id: "PS-2026-02-004", employee: "Alex Thompson", empId: "EMP004", period: "February 2026", gross: 11700, deductions: 1400, net: 10300, date: "Feb 25, 2026", status: "paid" },
  { id: "PS-2026-01-001", employee: "Sarah Johnson", empId: "EMP001", period: "January 2026", gross: 7000, deductions: 980, net: 6020, date: "Jan 27, 2026", status: "paid" },
  { id: "PS-2026-01-002", employee: "Mike Chen", empId: "EMP002", period: "January 2026", gross: 8600, deductions: 1200, net: 7400, date: "Jan 27, 2026", status: "paid" },
];

export default function PayslipsPage() {
  const [selected, setSelected] = useState<typeof payslips[0] | null>(null);
  const [period, setPeriod] = useState("all");
  const filtered = period === "all" ? payslips : payslips.filter((p) => p.period === period);
  const periods = [...new Set(payslips.map((p) => p.period))];

  return (
    <div>
      <PageHeader title="Payslips" description="Browse and download employee payslips" />

      <div className="flex gap-2 mb-4">
        <select value={period} onChange={(e) => setPeriod(e.target.value)}
          className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Periods</option>
          {periods.map((p) => <option key={p}>{p}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800">Payslip List</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {filtered.map((ps) => (
              <button key={ps.id} onClick={() => setSelected(ps)}
                className={`w-full flex items-center justify-between px-5 py-3 text-left hover:bg-slate-50 transition-colors ${selected?.id === ps.id ? "bg-indigo-50" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xs font-semibold">
                    {ps.employee.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{ps.employee}</p>
                    <p className="text-xs text-slate-400">{ps.period} · {ps.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">${ps.net.toLocaleString()}</p>
                  <Badge dot variant="success">{ps.status}</Badge>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selected ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-800">Payslip Preview</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 text-xs bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6 pb-4 border-b border-slate-100">
                <div>
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-sm font-bold mb-2">ERP</div>
                  <p className="text-xs text-slate-500">FinanceERP Inc.</p>
                  <p className="text-xs text-slate-400">123 Business Ave, NY 10001</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">PAYSLIP</p>
                  <p className="text-xs text-slate-500">{selected.id}</p>
                  <p className="text-xs text-slate-400">{selected.date}</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <p className="text-sm font-bold text-slate-800">{selected.employee}</p>
                <p className="text-xs text-slate-500">{selected.empId} · Period: {selected.period}</p>
              </div>
              <div className="space-y-2 mb-4">
                {[
                  { label: "Basic Salary", amount: selected.gross - 800, type: "earning" },
                  { label: "Allowances", amount: 800, type: "earning" },
                  { label: "Tax (PAYE)", amount: -(selected.deductions * 0.7), type: "deduction" },
                  { label: "Social Security", amount: -(selected.deductions * 0.2), type: "deduction" },
                  { label: "Health Insurance", amount: -(selected.deductions * 0.1), type: "deduction" },
                ].map(({ label, amount, type }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-slate-600">{label}</span>
                    <span className={type === "deduction" ? "text-red-600" : "text-slate-800 font-medium"}>
                      {type === "deduction" ? "-" : ""}${Math.abs(amount).toLocaleString("en-US", { minimumFractionDigits: 0 })}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-800">Net Pay</span>
                <span className="text-lg font-bold text-emerald-700">${selected.net.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-64 flex items-center justify-center">
            <div className="text-center">
              <Eye className="w-10 h-10 text-slate-200 mx-auto mb-2" />
              <p className="text-sm text-slate-400">Select a payslip to preview</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
