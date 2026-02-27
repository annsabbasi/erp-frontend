"use client";

import { useState } from "react";
import { Check, X, Eye } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";

type Budget = {
  id: number; name: string; dept: string; submittedBy: string; period: string; total: number; submittedDate: string; status: "pending" | "approved" | "rejected"; justification: string;
};

const initialBudgets: Budget[] = [
  { id: 1, name: "Q2 2026 – Human Resources", dept: "HR", submittedBy: "Sarah Johnson", period: "Apr–Jun 2026", total: 155000, submittedDate: "Feb 25, 2026", status: "pending", justification: "Includes planned 3 new hires and updated benefits package for Q2. Also covers company-wide training program." },
  { id: 2, name: "Q2 2026 – Finance & Accounting", dept: "Finance", submittedBy: "Mike Chen", period: "Apr–Jun 2026", total: 108000, submittedDate: "Feb 26, 2026", status: "pending", justification: "Accounts for audit fees, accounting software renewal, and additional contractor hours for Q1 closeout." },
  { id: 3, name: "Q2 2026 – Sales & Marketing", dept: "Sales", submittedBy: "Alex Thompson", period: "Apr–Jun 2026", total: 142000, submittedDate: "Feb 24, 2026", status: "approved", justification: "Digital marketing campaigns, trade show participation, and CRM upgrade." },
];

export default function ApproveBudgetPage() {
  const [budgets, setBudgets] = useState(initialBudgets);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  function approve(id: number) { setBudgets(budgets.map((b) => b.id === id ? { ...b, status: "approved" } : b)); }
  function reject(id: number) { setBudgets(budgets.map((b) => b.id === id ? { ...b, status: "rejected" } : b)); }

  const pending = budgets.filter((b) => b.status === "pending");
  const reviewed = budgets.filter((b) => b.status !== "pending");

  return (
    <div>
      <PageHeader title="Approve Budgets" description="Review and approve submitted departmental budgets" />

      {pending.length === 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 text-sm text-emerald-700 flex items-center gap-2">
          <Check className="w-4 h-4" /> All pending budgets have been reviewed.
        </div>
      )}

      {pending.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Pending Review ({pending.length})</h3>
          <div className="space-y-3">
            {pending.map((b) => (
              <div key={b.id} className="bg-white rounded-xl border border-amber-200 bg-amber-50/30 shadow-sm p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">{b.name}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span>Submitted by {b.submittedBy}</span>
                      <span>·</span>
                      <span>{b.submittedDate}</span>
                      <span>·</span>
                      <span>{b.period}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-slate-900">${b.total.toLocaleString()}</p>
                    <Badge variant="warning" dot>Pending</Badge>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 mb-4 border border-slate-100">
                  <p className="text-xs font-medium text-slate-500 mb-1">Justification</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{b.justification}</p>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => approve(b.id)} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors">
                    <Check className="w-4 h-4" /> Approve Budget
                  </button>
                  <button onClick={() => reject(b.id)} className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 text-sm font-medium rounded-lg transition-colors">
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {reviewed.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Reviewed</h3>
          <div className="space-y-2">
            {reviewed.map((b) => (
              <div key={b.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-800">{b.name}</p>
                  <p className="text-xs text-slate-400">{b.period} · ${b.total.toLocaleString()}</p>
                </div>
                <Badge dot variant={b.status === "approved" ? "success" : "danger"}>{b.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
