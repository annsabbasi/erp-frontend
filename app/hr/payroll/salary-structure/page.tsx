"use client";

import { Plus, Edit2, Trash2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { useState } from "react";

const grades = [
  { id: 1, grade: "Grade 1 – Entry Level", positions: ["Intern", "Associate", "Junior"], baseSalary: 3000, maxSalary: 4500, allowances: 300, bonus: "5%", employees: 15 },
  { id: 2, grade: "Grade 2 – Mid Level", positions: ["Analyst", "Executive", "Specialist"], baseSalary: 4500, maxSalary: 6500, allowances: 500, bonus: "8%", employees: 22 },
  { id: 3, grade: "Grade 3 – Senior Level", positions: ["Senior Analyst", "Manager", "Officer"], baseSalary: 6500, maxSalary: 9000, allowances: 800, bonus: "12%", employees: 18 },
  { id: 4, grade: "Grade 4 – Leadership", positions: ["Director", "Head", "Chief"], baseSalary: 9000, maxSalary: 15000, allowances: 1500, bonus: "20%", employees: 7 },
];

export default function SalaryStructurePage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <PageHeader
        title="Salary Structure"
        description="Define salary grades, bands, and compensation packages"
        actions={
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Add Grade
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4">
        {grades.map((g) => (
          <div key={g.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800">{g.grade}</h3>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {g.positions.map((p) => (
                    <span key={p} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full">{p}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[
                { label: "Base Salary (Min)", value: `$${g.baseSalary.toLocaleString()}` },
                { label: "Max Salary", value: `$${g.maxSalary.toLocaleString()}` },
                { label: "Allowances", value: `$${g.allowances.toLocaleString()}` },
                { label: "Performance Bonus", value: g.bonus },
                { label: "Employees", value: g.employees },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                  <p className="text-sm font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
