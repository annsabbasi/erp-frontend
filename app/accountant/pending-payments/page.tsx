"use client";

import { CreditCard, AlertCircle, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import StatCard from "@/components/shared/StatCard";
import { DollarSign, Clock, TrendingDown } from "lucide-react";
import { useState } from "react";

type Payment = { id: string; vendor: string; invoice: string; amount: number; dueDate: string; overdueDays: number; type: "payable" | "receivable"; status: "overdue" | "due-soon" | "upcoming"; };

const payments: Payment[] = [
  { id: "P001", vendor: "TechSupply Co.", invoice: "INV-2026-038", amount: 8400, dueDate: "Feb 12, 2026", overdueDays: 15, type: "payable", status: "overdue" },
  { id: "P002", vendor: "GlobalCorp Ltd.", invoice: "INV-2026-042", amount: 24500, dueDate: "Feb 20, 2026", overdueDays: 7, type: "receivable", status: "overdue" },
  { id: "P003", vendor: "OfficeMax Supplies", invoice: "INV-2026-051", amount: 3200, dueDate: "Mar 1, 2026", overdueDays: 0, type: "payable", status: "due-soon" },
  { id: "P004", vendor: "StartupXYZ", invoice: "INV-2026-053", amount: 15800, dueDate: "Mar 3, 2026", overdueDays: 0, type: "receivable", status: "due-soon" },
  { id: "P005", vendor: "Cloud Services Inc.", invoice: "INV-2026-055", amount: 2100, dueDate: "Mar 15, 2026", overdueDays: 0, type: "payable", status: "upcoming" },
  { id: "P006", vendor: "Innovation Labs", invoice: "INV-2026-056", amount: 42000, dueDate: "Mar 20, 2026", overdueDays: 0, type: "receivable", status: "upcoming" },
  { id: "P007", vendor: "Acme Corporation", invoice: "INV-2026-057", amount: 9800, dueDate: "Mar 25, 2026", overdueDays: 0, type: "receivable", status: "upcoming" },
];

export default function PendingPaymentsPage() {
  const [filter, setFilter] = useState<"all" | "payable" | "receivable">("all");
  const filtered = filter === "all" ? payments : payments.filter((p) => p.type === filter);
  const overdue = payments.filter((p) => p.status === "overdue");
  const totalOverdue = overdue.reduce((s, p) => s + p.amount, 0);
  const totalReceivable = payments.filter((p) => p.type === "receivable").reduce((s, p) => s + p.amount, 0);
  const totalPayable = payments.filter((p) => p.type === "payable").reduce((s, p) => s + p.amount, 0);

  return (
    <div>
      <PageHeader title="Pending Payments" description="Track outstanding receivables and payables" />

      {overdue.length > 0 && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl mb-6 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {overdue.length} payments overdue totaling ${totalOverdue.toLocaleString()}. Immediate action required.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Receivables" value={`$${totalReceivable.toLocaleString()}`} icon={TrendingDown} variant="success" />
        <StatCard title="Total Payables" value={`$${totalPayable.toLocaleString()}`} icon={DollarSign} variant="danger" />
        <StatCard title="Overdue" value={overdue.length} icon={Clock} variant="warning" description={`$${totalOverdue.toLocaleString()} outstanding`} />
      </div>

      <div className="flex gap-2 mb-4">
        {(["all", "receivable", "payable"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
              filter === f ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >{f === "all" ? "All Payments" : f === "receivable" ? "Receivables" : "Payables"}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Vendor / Client", "Invoice", "Type", "Amount", "Due Date", "Status", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((p) => (
                <tr key={p.id} className={`hover:bg-slate-50 transition-colors ${p.status === "overdue" ? "bg-red-50/30" : ""}`}>
                  <td className="px-4 py-3 font-medium text-slate-800">{p.vendor}</td>
                  <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{p.invoice}</code></td>
                  <td className="px-4 py-3"><Badge variant={p.type === "receivable" ? "success" : "danger"}>{p.type}</Badge></td>
                  <td className="px-4 py-3 font-bold text-slate-900">${p.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-500">{p.dueDate}</td>
                  <td className="px-4 py-3">
                    {p.status === "overdue" ? (
                      <div className="flex items-center gap-1">
                        <Badge variant="danger" dot>Overdue</Badge>
                        <span className="text-xs text-red-500">{p.overdueDays}d</span>
                      </div>
                    ) : p.status === "due-soon" ? (
                      <Badge variant="warning" dot>Due Soon</Badge>
                    ) : (
                      <Badge variant="info" dot>Upcoming</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">
                      <CheckCircle2 className="w-3 h-3" /> Mark Paid
                    </button>
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
