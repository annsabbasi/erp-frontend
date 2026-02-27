"use client";

import { CreditCard, AlertCircle, CheckCircle2, Clock, Download } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import StatCard from "@/components/shared/StatCard";
import { DollarSign } from "lucide-react";

const receivables = [
  { id: "REC-001", client: "GlobalCorp Ltd.", invoice: "INV-2026-042", amount: 24500, dueDate: "Mar 20, 2026", agingDays: 0, status: "current", contact: "john.doe@globalcorp.com" },
  { id: "REC-002", client: "StartupXYZ", invoice: "INV-2026-053", amount: 15800, dueDate: "Mar 25, 2026", agingDays: 0, status: "current", contact: "billing@startupxyz.io" },
  { id: "REC-003", client: "Innovation Labs", invoice: "INV-2026-056", amount: 42000, dueDate: "Mar 27, 2026", agingDays: 0, status: "current", contact: "finance@innovlabs.com" },
  { id: "REC-004", client: "Acme Corp.", invoice: "INV-2026-057", amount: 9800, dueDate: "Mar 27, 2026", agingDays: 0, status: "draft", contact: "ap@acmecorp.com" },
  { id: "REC-005", client: "BlueSky Inc.", invoice: "INV-2026-038", amount: 8400, dueDate: "Feb 20, 2026", agingDays: 7, status: "overdue-7", contact: "billing@bluesky.co" },
];

const total = receivables.reduce((s, r) => s + r.amount, 0);
const overdue = receivables.filter(r => r.status.startsWith("overdue")).reduce((s, r) => s + r.amount, 0);
const current = receivables.filter(r => r.status === "current").reduce((s, r) => s + r.amount, 0);

export default function ReceivablesPage() {
  return (
    <div>
      <PageHeader
        title="Accounts Receivable"
        description="Track outstanding customer payments and collections"
        actions={
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" /> Export Aging Report
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Outstanding" value={`$${total.toLocaleString()}`} icon={DollarSign} variant="primary" />
        <StatCard title="Current" value={`$${current.toLocaleString()}`} icon={CheckCircle2} variant="success" />
        <StatCard title="Overdue" value={`$${overdue.toLocaleString()}`} icon={Clock} variant="danger" />
      </div>

      {overdue > 0 && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl mb-4 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          ${overdue.toLocaleString()} in overdue receivables. Follow up required.
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Client", "Invoice", "Amount", "Due Date", "Aging (Days)", "Contact", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {receivables.map((r) => (
                <tr key={r.id} className={`hover:bg-slate-50 transition-colors ${r.status.startsWith("overdue") ? "bg-red-50/20" : ""}`}>
                  <td className="px-4 py-3 font-medium text-slate-800">{r.client}</td>
                  <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{r.invoice}</code></td>
                  <td className="px-4 py-3 font-bold text-slate-900">${r.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{r.dueDate}</td>
                  <td className="px-4 py-3">
                    {r.agingDays > 0 ? (
                      <span className="text-red-600 font-bold">{r.agingDays} days</span>
                    ) : <span className="text-slate-400">—</span>}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{r.contact}</td>
                  <td className="px-4 py-3">
                    <Badge dot variant={r.status === "current" ? "success" : r.status.startsWith("overdue") ? "danger" : "secondary"}>
                      {r.status === "current" ? "Current" : r.status.startsWith("overdue") ? `Overdue ${r.agingDays}d` : r.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">Send Reminder</button>
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
