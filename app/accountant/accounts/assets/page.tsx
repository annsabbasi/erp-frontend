"use client";

import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { Plus } from "lucide-react";

const assets = [
  { code: "1001", name: "Cash – Main Account", type: "Current", balance: 145800, normal: "Dr", lastUpdated: "Feb 27, 2026" },
  { code: "1002", name: "Cash – Petty Cash", type: "Current", balance: 3200, normal: "Dr", lastUpdated: "Feb 25, 2026" },
  { code: "1003", name: "Savings Account", type: "Current", balance: 96800, normal: "Dr", lastUpdated: "Feb 25, 2026" },
  { code: "1010", name: "Accounts Receivable", type: "Current", balance: 184200, normal: "Dr", lastUpdated: "Feb 27, 2026" },
  { code: "1020", name: "Inventory", type: "Current", balance: 86400, normal: "Dr", lastUpdated: "Feb 20, 2026" },
  { code: "1030", name: "Prepaid Insurance", type: "Current", balance: 12000, normal: "Dr", lastUpdated: "Feb 1, 2026" },
  { code: "1040", name: "Prepaid Rent", type: "Current", balance: 12100, normal: "Dr", lastUpdated: "Feb 1, 2026" },
  { code: "1100", name: "Office Equipment", type: "Non-Current", balance: 280000, normal: "Dr", lastUpdated: "Jan 15, 2026" },
  { code: "1101", name: "Accumulated Depreciation – Equipment", type: "Non-Current", balance: -84000, normal: "Cr", lastUpdated: "Feb 28, 2026" },
  { code: "1110", name: "Vehicles", type: "Non-Current", balance: 320000, normal: "Dr", lastUpdated: "Sep 1, 2025" },
  { code: "1111", name: "Accumulated Depreciation – Vehicles", type: "Non-Current", balance: -96000, normal: "Cr", lastUpdated: "Feb 28, 2026" },
  { code: "1120", name: "Land & Buildings", type: "Non-Current", balance: 324000, normal: "Dr", lastUpdated: "Jan 1, 2025" },
];

const total = assets.reduce((s, a) => s + a.balance, 0);

export default function AssetsPage() {
  return (
    <div>
      <PageHeader
        title="Asset Accounts"
        description="All current and non-current asset accounts"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Add Account
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-4">
          <p className="text-xs text-indigo-600 font-medium">Total Assets</p>
          <p className="text-2xl font-bold text-indigo-800 mt-1">${total.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Total Accounts</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{assets.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Code", "Account Name", "Type", "Balance", "Normal Balance", "Last Updated", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {assets.map((a) => (
                <tr key={a.code} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{a.code}</code></td>
                  <td className="px-4 py-3 font-medium text-slate-700">{a.name}</td>
                  <td className="px-4 py-3"><Badge variant={a.type === "Current" ? "info" : "secondary"}>{a.type}</Badge></td>
                  <td className={`px-4 py-3 font-bold ${a.balance < 0 ? "text-red-700" : "text-slate-800"}`}>${a.balance.toLocaleString()}</td>
                  <td className="px-4 py-3"><Badge variant={a.normal === "Dr" ? "primary" : "danger"}>{a.normal}</Badge></td>
                  <td className="px-4 py-3 text-xs text-slate-400">{a.lastUpdated}</td>
                  <td className="px-4 py-3"><button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">Edit</button></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-indigo-50 border-t border-indigo-200">
                <td colSpan={3} className="px-4 py-3 text-sm font-bold text-indigo-800">Total Assets</td>
                <td className="px-4 py-3 text-sm font-bold text-indigo-800">${total.toLocaleString()}</td>
                <td colSpan={3} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
