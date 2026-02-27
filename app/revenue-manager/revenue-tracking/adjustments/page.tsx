"use client";

import { Plus, Sliders } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { useState } from "react";

const adjustments = [
  { id: 1, ref: "ADJ-2026-001", type: "Revenue Reversal", amount: -4800, reason: "Service delivery cancellation – MegaBrand Co.", date: "Feb 25, 2026", approvedBy: "Finance Officer", status: "approved" },
  { id: 2, ref: "ADJ-2026-002", type: "Revenue Correction", amount: 2200, reason: "Invoice undercharge correction – StartupXYZ", date: "Feb 22, 2026", approvedBy: "Finance Officer", status: "approved" },
  { id: 3, ref: "ADJ-2026-003", type: "Discount Applied", amount: -1500, reason: "Late payment penalty waiver – BlueSky Inc.", date: "Feb 20, 2026", approvedBy: "Revenue Manager", status: "approved" },
  { id: 4, ref: "ADJ-2026-004", type: "Credit Note", amount: -3200, reason: "Service quality credit – Innovation Labs", date: "Feb 18, 2026", approvedBy: "Pending", status: "pending" },
  { id: 5, ref: "ADJ-2026-005", type: "Revenue Correction", amount: 800, reason: "Currency conversion adjustment", date: "Feb 15, 2026", approvedBy: "Finance Officer", status: "approved" },
];

export default function AdjustmentsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <PageHeader
        title="Revenue Adjustments"
        description="Manage revenue corrections, reversals, and credit notes"
        actions={
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> New Adjustment
          </button>
        }
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Adjustments (Feb)", value: adjustments.length, color: "primary" as const },
          { label: "Net Adjustment", value: `$${adjustments.reduce((s, a) => s + a.amount, 0).toLocaleString()}`, color: "warning" as const },
          { label: "Pending Approval", value: adjustments.filter(a => a.status === "pending").length, color: "danger" as const },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {["Reference", "Type", "Amount", "Reason", "Date", "Approved By", "Status"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {adjustments.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{a.ref}</code></td>
                <td className="px-4 py-3"><Badge variant={a.type.includes("Reversal") || a.type.includes("Credit") ? "danger" : "primary"}>{a.type}</Badge></td>
                <td className={`px-4 py-3 font-bold ${a.amount < 0 ? "text-red-700" : "text-emerald-700"}`}>
                  {a.amount >= 0 ? "+" : ""}${a.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs max-w-xs truncate">{a.reason}</td>
                <td className="px-4 py-3 text-xs text-slate-400">{a.date}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{a.approvedBy}</td>
                <td className="px-4 py-3"><Badge dot variant={a.status === "approved" ? "success" : "warning"}>{a.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
