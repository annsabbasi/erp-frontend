"use client";

import { useState } from "react";
import { RefreshCw, Check, AlertTriangle } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";

const employees = [
  { id: "EMP001", name: "Sarah Johnson", dept: "HR", baseSalary: 6200, allowances: 800, overtime: 0, deductions: 1020, bonus: 744, net: 6724, included: true },
  { id: "EMP002", name: "Mike Chen", dept: "Finance", baseSalary: 7800, allowances: 800, overtime: 350, deductions: 1280, bonus: 936, net: 8606, included: true },
  { id: "EMP003", name: "Emily Davis", dept: "Finance", baseSalary: 7200, allowances: 800, overtime: 0, deductions: 1180, bonus: 864, net: 7684, included: true },
  { id: "EMP004", name: "Alex Thompson", dept: "Sales", baseSalary: 8500, allowances: 1500, overtime: 0, deductions: 1400, bonus: 1700, net: 10300, included: true },
  { id: "EMP005", name: "James Wilson", dept: "HR", baseSalary: 4200, allowances: 500, overtime: 0, deductions: 690, bonus: 0, net: 4010, included: false },
  { id: "EMP006", name: "Linda Martinez", dept: "Finance", baseSalary: 4800, allowances: 500, overtime: 120, deductions: 790, bonus: 384, net: 5014, included: true },
];

const months = ["March 2026", "April 2026", "May 2026"];

export default function GeneratePayrollPage() {
  const [selectedMonth, setSelectedMonth] = useState("March 2026");
  const [step, setStep] = useState<"config" | "review" | "done">("config");
  const [items, setItems] = useState(employees);

  const included = items.filter((e) => e.included);
  const grossTotal = included.reduce((s, e) => s + e.baseSalary + e.allowances + e.overtime + e.bonus, 0);
  const deductionsTotal = included.reduce((s, e) => s + e.deductions, 0);
  const netTotal = included.reduce((s, e) => s + e.net, 0);

  function toggle(id: string) { setItems(items.map((e) => e.id === id ? { ...e, included: !e.included } : e)); }

  return (
    <div>
      <PageHeader title="Generate Payroll" description={`Process payroll for ${selectedMonth}`} />

      {step === "config" && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Payroll Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Payroll Period</label>
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  {months.map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Payroll Type</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Regular Monthly Payroll</option>
                  <option>Bonus Payroll</option>
                  <option>Final Settlement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Payment Date</label>
                <input type="date" defaultValue="2026-03-27" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700">James Wilson (EMP005) is currently on leave and will be excluded from this payroll by default.</p>
              </div>
            </div>
          </div>
          <button onClick={() => setStep("review")} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            Preview Payroll →
          </button>
        </div>
      )}

      {step === "review" && (
        <div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Gross Payable", value: `$${grossTotal.toLocaleString()}`, color: "text-slate-800" },
              { label: "Total Deductions", value: `$${deductionsTotal.toLocaleString()}`, color: "text-red-600" },
              { label: "Net Payable", value: `$${netTotal.toLocaleString()}`, color: "text-emerald-700" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <p className="text-xs text-slate-500">{label}</p>
                <p className={`text-xl font-bold mt-1 ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-4">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-800">Payroll Items – {selectedMonth}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Include</th>
                    {["Employee", "Base Salary", "Allowances", "Overtime", "Bonus", "Deductions", "Net Pay"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {items.map((e) => (
                    <tr key={e.id} className={`hover:bg-slate-50 transition-colors ${!e.included ? "opacity-50" : ""}`}>
                      <td className="px-4 py-3">
                        <input type="checkbox" checked={e.included} onChange={() => toggle(e.id)} className="w-4 h-4 rounded border-slate-300 text-indigo-600" />
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-800">{e.name}</p>
                        <p className="text-xs text-slate-400">{e.dept}</p>
                      </td>
                      <td className="px-4 py-3">${e.baseSalary.toLocaleString()}</td>
                      <td className="px-4 py-3">${e.allowances.toLocaleString()}</td>
                      <td className="px-4 py-3">{e.overtime > 0 ? `$${e.overtime}` : "—"}</td>
                      <td className="px-4 py-3 text-emerald-600">{e.bonus > 0 ? `$${e.bonus}` : "—"}</td>
                      <td className="px-4 py-3 text-red-600">-${e.deductions.toLocaleString()}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">${e.net.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setStep("config")} className="px-4 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors">← Back</button>
            <button onClick={() => setStep("done")} className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" /> Process Payroll
            </button>
          </div>
        </div>
      )}

      {step === "done" && (
        <div className="max-w-md mx-auto text-center py-16">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Payroll Processed!</h2>
          <p className="text-slate-500 text-sm mb-6">
            Payroll for {selectedMonth} has been successfully processed for {included.length} employees.
            Total net pay: <strong>${netTotal.toLocaleString()}</strong>
          </p>
          <div className="flex justify-center gap-3">
            <button onClick={() => setStep("config")} className="px-4 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50">New Payroll</button>
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700">View Payslips →</button>
          </div>
        </div>
      )}
    </div>
  );
}
