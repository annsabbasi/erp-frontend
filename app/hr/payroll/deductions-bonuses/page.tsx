"use client";

import { Plus, Trash2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { useState } from "react";

const deductions = [
  { id: 1, name: "PAYE Tax", type: "Tax", basis: "% of Gross", rate: "16%", applied: "All Employees", mandatory: true },
  { id: 2, name: "Social Security (NSSF)", type: "Social", basis: "% of Basic", rate: "6%", applied: "All Employees", mandatory: true },
  { id: 3, name: "Health Insurance (NHIF)", type: "Insurance", basis: "Fixed Amount", rate: "$150", applied: "All Employees", mandatory: true },
  { id: 4, name: "Pension Fund", type: "Pension", basis: "% of Basic", rate: "5%", applied: "Grade 2+", mandatory: false },
  { id: 5, name: "Loan Repayment", type: "Loan", basis: "Fixed Amount", rate: "Varies", applied: "Individual", mandatory: false },
];

const bonuses = [
  { id: 1, name: "Performance Bonus", basis: "% of Net Salary", rate: "5–20%", timing: "Annual", description: "Based on performance review score" },
  { id: 2, name: "13th Month Pay", basis: "1 Month Salary", rate: "100% of Base", timing: "December", description: "Annual year-end bonus" },
  { id: 3, name: "Transport Allowance", basis: "Fixed Amount", rate: "$300/month", timing: "Monthly", description: "For employees without company vehicle" },
  { id: 4, name: "Meal Allowance", basis: "Per Diem", rate: "$15/day", timing: "Daily", description: "For on-site work days only" },
  { id: 5, name: "Overtime Pay", basis: "Hourly Rate × 1.5", rate: "150% of hourly", timing: "Monthly", description: "For hours worked beyond contract hours" },
];

export default function DeductionsBonusesPage() {
  const [tab, setTab] = useState<"deductions" | "bonuses">("deductions");

  return (
    <div>
      <PageHeader
        title="Deductions & Bonuses"
        description="Configure salary deductions, allowances, and bonus structures"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Add Rule
          </button>
        }
      />

      <div className="flex gap-2 mb-6">
        {(["deductions", "bonuses"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${
              tab === t ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >{t}</button>
        ))}
      </div>

      {tab === "deductions" && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Name", "Type", "Basis", "Rate", "Applies To", "Mandatory", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {deductions.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800">{d.name}</td>
                  <td className="px-4 py-3"><Badge variant="secondary">{d.type}</Badge></td>
                  <td className="px-4 py-3 text-slate-500">{d.basis}</td>
                  <td className="px-4 py-3 font-mono text-slate-700">{d.rate}</td>
                  <td className="px-4 py-3 text-slate-500">{d.applied}</td>
                  <td className="px-4 py-3"><Badge variant={d.mandatory ? "danger" : "secondary"}>{d.mandatory ? "Yes" : "No"}</Badge></td>
                  <td className="px-4 py-3">
                    {!d.mandatory && <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "bonuses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bonuses.map((b) => (
            <div key={b.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-slate-800">{b.name}</h3>
                <Badge variant="success">{b.timing}</Badge>
              </div>
              <p className="text-xs text-slate-500 mb-3">{b.description}</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 rounded-lg p-2">
                  <p className="text-xs text-slate-400">Basis</p>
                  <p className="text-xs font-medium text-slate-700">{b.basis}</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-2">
                  <p className="text-xs text-slate-400">Rate</p>
                  <p className="text-xs font-medium text-emerald-700">{b.rate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
