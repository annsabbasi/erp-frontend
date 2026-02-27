"use client";

import { BookOpen, ChevronRight } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import Link from "next/link";

const accountGroups = [
  {
    type: "Assets",
    href: "/accountant/accounts/assets",
    color: "indigo",
    bg: "bg-indigo-50",
    icon: "bg-indigo-600",
    total: "$1,284,500",
    accounts: [
      { code: "1001", name: "Cash & Cash Equivalents", balance: "$245,800", normal: "Dr" },
      { code: "1002", name: "Accounts Receivable", balance: "$184,200", normal: "Dr" },
      { code: "1010", name: "Inventory", balance: "$86,400", normal: "Dr" },
      { code: "1050", name: "Prepaid Expenses", balance: "$24,100", normal: "Dr" },
      { code: "1100", name: "Property, Plant & Equipment", balance: "$744,000", normal: "Dr" },
    ],
  },
  {
    type: "Revenue",
    href: "/accountant/accounts/revenue",
    color: "emerald",
    bg: "bg-emerald-50",
    icon: "bg-emerald-600",
    total: "$228,000",
    accounts: [
      { code: "4001", name: "Service Revenue", balance: "$168,000", normal: "Cr" },
      { code: "4002", name: "Product Sales Revenue", balance: "$42,000", normal: "Cr" },
      { code: "4003", name: "Subscription Revenue", balance: "$18,000", normal: "Cr" },
    ],
  },
  {
    type: "Expenses",
    href: "/accountant/accounts/expenses",
    color: "red",
    bg: "bg-red-50",
    icon: "bg-red-600",
    total: "$170,000",
    accounts: [
      { code: "5001", name: "Salary & Wages", balance: "$114,000", normal: "Dr" },
      { code: "5002", name: "Rent & Utilities", balance: "$24,000", normal: "Dr" },
      { code: "5003", name: "Marketing Expenses", balance: "$18,000", normal: "Dr" },
      { code: "5004", name: "Cost of Goods Sold", balance: "$14,000", normal: "Dr" },
    ],
  },
];

export default function AccountsPage() {
  return (
    <div>
      <PageHeader title="Chart of Accounts" description="Overview of all financial accounts and balances" />

      <div className="grid grid-cols-1 gap-4">
        {accountGroups.map((group) => (
          <div key={group.type} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className={`flex items-center justify-between px-5 py-4 ${group.bg} border-b border-slate-100`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 ${group.icon} rounded-lg flex items-center justify-center`}>
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{group.type} Accounts</h3>
                  <p className="text-xs text-slate-500">{group.accounts.length} accounts</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-slate-500">Total Balance</p>
                  <p className="text-base font-bold text-slate-900">{group.total}</p>
                </div>
                <Link href={group.href} className="flex items-center gap-1 px-3 py-1.5 bg-white text-slate-600 text-xs rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  View All <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {["Code", "Account Name", "Balance", "Normal Balance"].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {group.accounts.map((acc) => (
                    <tr key={acc.code} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{acc.code}</code></td>
                      <td className="px-4 py-3 font-medium text-slate-700">{acc.name}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">{acc.balance}</td>
                      <td className="px-4 py-3">
                        <Badge variant={acc.normal === "Dr" ? "primary" : "success"}>{acc.normal}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
