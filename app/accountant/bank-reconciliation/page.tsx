"use client";

import { GitBranch, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import StatCard from "@/components/shared/StatCard";
import { DollarSign } from "lucide-react";

const reconciliationItems = [
  { id: 1, date: "Feb 27, 2026", description: "Client Payment – GlobalCorp Ltd.", bankAmount: 24500, bookAmount: 24500, matched: true, ref: "INV-042" },
  { id: 2, date: "Feb 25, 2026", description: "Payroll Disbursement Feb 2026", bankAmount: 236800, bookAmount: 236800, matched: true, ref: "PR-002" },
  { id: 3, date: "Feb 25, 2026", description: "Office Rent Payment", bankAmount: 12000, bookAmount: 12000, matched: true, ref: "RENT-02" },
  { id: 4, date: "Feb 22, 2026", description: "AWS Services – Auto Charge", bankAmount: 2100, bookAmount: 0, matched: false, ref: "BANK-0291" },
  { id: 5, date: "Feb 20, 2026", description: "Client Payment – Acme Corp.", bankAmount: 9800, bookAmount: 9800, matched: true, ref: "INV-038" },
  { id: 6, date: "Feb 18, 2026", description: "Bank Interest Income", bankAmount: 480, bookAmount: 0, matched: false, ref: "INT-0218" },
];

const bankBalance = 245800;
const bookBalance = 243220;

export default function BankReconciliationPage() {
  const unmatched = reconciliationItems.filter(i => !i.matched).length;
  const difference = bankBalance - bookBalance;

  return (
    <div>
      <PageHeader
        title="Bank Reconciliation"
        description="Match bank statements with accounting records"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" /> Import Bank Statement
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs text-slate-500">Bank Balance</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">${bankBalance.toLocaleString()}</p>
          <p className="text-xs text-slate-400 mt-0.5">As of Feb 27, 2026</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs text-slate-500">Book Balance</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">${bookBalance.toLocaleString()}</p>
          <p className="text-xs text-slate-400 mt-0.5">General Ledger balance</p>
        </div>
        <div className={`rounded-xl border p-4 shadow-sm ${difference === 0 ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
          <p className="text-xs text-slate-500">Difference</p>
          <p className={`text-2xl font-bold mt-1 ${difference === 0 ? "text-emerald-700" : "text-amber-700"}`}>${Math.abs(difference).toLocaleString()}</p>
          <p className="text-xs text-slate-400 mt-0.5">{unmatched} unmatched items</p>
        </div>
      </div>

      {unmatched > 0 && (
        <div className="flex items-center gap-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl mb-4 text-sm text-amber-700">
          <AlertCircle className="w-4 h-4" />
          {unmatched} unmatched transactions require attention.
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Date", "Description", "Bank Amount", "Book Amount", "Difference", "Status", "Ref"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {reconciliationItems.map((item) => (
                <tr key={item.id} className={`hover:bg-slate-50 transition-colors ${!item.matched ? "bg-amber-50/30" : ""}`}>
                  <td className="px-4 py-3 text-xs text-slate-500">{item.date}</td>
                  <td className="px-4 py-3 text-slate-700">{item.description}</td>
                  <td className="px-4 py-3 font-medium">${item.bankAmount.toLocaleString()}</td>
                  <td className="px-4 py-3 font-medium">{item.bookAmount > 0 ? `$${item.bookAmount.toLocaleString()}` : "—"}</td>
                  <td className="px-4 py-3">
                    {item.bankAmount !== item.bookAmount ? (
                      <span className="text-amber-600 font-bold">${(item.bankAmount - item.bookAmount).toLocaleString()}</span>
                    ) : <span className="text-emerald-600">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    {item.matched ? (
                      <span className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Matched
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-600 text-xs font-medium">
                        <AlertCircle className="w-3.5 h-3.5" /> Unmatched
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{item.ref}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
