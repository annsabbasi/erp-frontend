"use client";

import { useState } from "react";
import { Plus, Download, Eye, Send, X, Trash2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import StatCard from "@/components/shared/StatCard";
import { DollarSign, CreditCard, Clock, CheckCircle2 } from "lucide-react";

type Invoice = {
  id: string; client: string; amount: number; tax: number; total: number; date: string; due: string; status: "paid" | "sent" | "draft" | "overdue";
};

const invoices: Invoice[] = [
  { id: "INV-2026-042", client: "GlobalCorp Ltd.", amount: 22000, tax: 2500, total: 24500, date: "Feb 20, 2026", due: "Mar 20, 2026", status: "paid" },
  { id: "INV-2026-053", client: "StartupXYZ", amount: 14500, tax: 1300, total: 15800, date: "Feb 25, 2026", due: "Mar 25, 2026", status: "sent" },
  { id: "INV-2026-056", client: "Innovation Labs", amount: 38000, tax: 4000, total: 42000, date: "Feb 27, 2026", due: "Mar 27, 2026", status: "sent" },
  { id: "INV-2026-057", client: "Acme Corp.", amount: 8900, tax: 900, total: 9800, date: "Feb 27, 2026", due: "Mar 27, 2026", status: "draft" },
  { id: "INV-2026-038", client: "BlueSky Inc.", amount: 7600, tax: 800, total: 8400, date: "Feb 5, 2026", due: "Feb 20, 2026", status: "overdue" },
];

export default function InvoicingPage() {
  const [showForm, setShowForm] = useState(false);

  const paid = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.total, 0);
  const outstanding = invoices.filter((i) => i.status !== "paid").reduce((s, i) => s + i.total, 0);
  const overdue = invoices.filter((i) => i.status === "overdue").length;

  return (
    <div>
      <PageHeader
        title="Invoicing"
        description="Create, send, and track client invoices"
        actions={
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Create Invoice
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Invoiced (Feb)" value={`$${(invoices.reduce((s, i) => s + i.total, 0) / 1000).toFixed(1)}k`} icon={DollarSign} variant="primary" />
        <StatCard title="Collected" value={`$${(paid / 1000).toFixed(1)}k`} icon={CheckCircle2} variant="success" />
        <StatCard title="Outstanding" value={`$${(outstanding / 1000).toFixed(1)}k`} icon={CreditCard} variant="warning" />
        <StatCard title="Overdue" value={overdue} icon={Clock} variant="danger" />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-800">New Invoice</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Client Name</label>
                  <input placeholder="Client..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Due Date</label>
                  <input type="date" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                <input placeholder="Service description..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount (USD)</label>
                  <input type="number" placeholder="0.00" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Tax %</label>
                  <input type="number" placeholder="10" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
                <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors">Save Draft</button>
                <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">Send Invoice</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Invoice ID", "Client", "Amount", "Tax", "Total", "Issue Date", "Due Date", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {invoices.map((inv) => (
                <tr key={inv.id} className={`hover:bg-slate-50 transition-colors ${inv.status === "overdue" ? "bg-red-50/30" : ""}`}>
                  <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{inv.id}</code></td>
                  <td className="px-4 py-3 font-medium text-slate-800">{inv.client}</td>
                  <td className="px-4 py-3 text-slate-600">${inv.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-500">${inv.tax.toLocaleString()}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">${inv.total.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{inv.date}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{inv.due}</td>
                  <td className="px-4 py-3">
                    <Badge dot variant={inv.status === "paid" ? "success" : inv.status === "sent" ? "info" : inv.status === "overdue" ? "danger" : "secondary"}>
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Send className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"><Download className="w-3.5 h-3.5" /></button>
                    </div>
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
