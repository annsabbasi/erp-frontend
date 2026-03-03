"use client";

import { useState } from "react";
import { Plus, Download, Eye, Send, X } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import StatCard from "@/components/shared/StatCard";
import { DollarSign, CreditCard, Clock, CheckCircle2 } from "lucide-react";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";
import { useInvoices, useInvoiceStats, useCreateInvoice, useSendInvoice } from "@/lib/hooks/use-invoices";
import type { Invoice, InvoiceStatus } from "@/lib/api/types";

export default function InvoicingPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ clientId: "", dueDate: "", description: "", amount: "", taxRate: "" });

  const { data, isLoading, error, refetch } = useInvoices();
  const { data: stats, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useInvoiceStats();
  const createInvoiceMutation = useCreateInvoice();
  const sendInvoiceMutation = useSendInvoice();

  if (isLoading || statsLoading) return <LoadingSpinner fullPage />;
  if (error || statsError) return <ErrorState onRetry={() => { refetch(); refetchStats(); }} />;

  const invoices: Invoice[] = data?.data ?? [];

  function getStatusVariant(status: InvoiceStatus) {
    if (status === "PAID") return "success";
    if (status === "SENT") return "info";
    if (status === "OVERDUE") return "danger";
    return "secondary";
  }

  function handleSaveDraft() {
    createInvoiceMutation.mutate({
      clientId: formData.clientId,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: formData.dueDate,
      items: [
        {
          description: formData.description || "Service",
          quantity: 1,
          unitPrice: parseFloat(formData.amount) || 0,
          taxRate: parseFloat(formData.taxRate) || 0,
        },
      ],
    }, { onSuccess: () => setShowForm(false) });
  }

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
        <StatCard title="Total Revenue" value={`$${((stats?.totalRevenue ?? 0) / 1000).toFixed(1)}k`} icon={DollarSign} variant="primary" />
        <StatCard title="Collected" value={`$${(((stats?.totalRevenue ?? 0) - (stats?.outstanding ?? 0)) / 1000).toFixed(1)}k`} icon={CheckCircle2} variant="success" />
        <StatCard title="Outstanding" value={`$${((stats?.outstanding ?? 0) / 1000).toFixed(1)}k`} icon={CreditCard} variant="warning" />
        <StatCard title="Overdue" value={stats?.overdue ?? 0} icon={Clock} variant="danger" />
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
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Client ID</label>
                  <input
                    placeholder="Client ID..."
                    value={formData.clientId}
                    onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                <input
                  placeholder="Service description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount (USD)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Tax %</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={formData.taxRate}
                    onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
                <button
                  onClick={handleSaveDraft}
                  disabled={createInvoiceMutation.isPending}
                  className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  {createInvoiceMutation.isPending ? "Saving..." : "Save Draft"}
                </button>
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
                {["Invoice #", "Client", "Subtotal", "Tax", "Total", "Issue Date", "Due Date", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {invoices.map((inv) => (
                <tr key={inv.id} className={`hover:bg-slate-50 transition-colors ${inv.status === "OVERDUE" ? "bg-red-50/30" : ""}`}>
                  <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{inv.invoiceNumber}</code></td>
                  <td className="px-4 py-3 font-medium text-slate-800">{inv.client?.name ?? "N/A"}</td>
                  <td className="px-4 py-3 text-slate-600">${inv.subtotal.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-500">${inv.taxAmount.toLocaleString()}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">${inv.totalAmount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{new Date(inv.issueDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{new Date(inv.dueDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <Badge dot variant={getStatusVariant(inv.status)}>
                      {inv.status.charAt(0) + inv.status.slice(1).toLowerCase()}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                      <button
                        onClick={() => sendInvoiceMutation.mutate(inv.id)}
                        disabled={sendInvoiceMutation.isPending || inv.status === "PAID" || inv.status === "CANCELLED"}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-40"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
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
