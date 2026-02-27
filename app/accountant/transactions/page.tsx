"use client";

import { Plus, Download } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import DataTable, { type Column } from "@/components/shared/DataTable";
import { useState } from "react";

type Transaction = {
  id: string; date: string; description: string; account: string; type: string; debit: string; credit: string; balance: string; status: string; ref: string;
};

const transactions: Transaction[] = [
  { id: "TXN-001", date: "2026-02-27", description: "Client Invoice – GlobalCorp", account: "Accounts Receivable", type: "Revenue", debit: "$24,500", credit: "—", balance: "$208,700", status: "cleared", ref: "INV-2026-042" },
  { id: "TXN-002", date: "2026-02-27", description: "Vendor Payment – TechSupply", account: "Accounts Payable", type: "Expense", debit: "—", credit: "$8,400", balance: "$200,300", status: "cleared", ref: "PO-2026-018" },
  { id: "TXN-003", date: "2026-02-25", description: "Monthly Payroll – Feb 2026", account: "Salary & Wages", type: "Expense", debit: "—", credit: "$236,800", balance: "$208,700", status: "cleared", ref: "PR-2026-002" },
  { id: "TXN-004", date: "2026-02-25", description: "Office Rent – February", account: "Rent Expense", type: "Expense", debit: "—", credit: "$12,000", balance: "$445,500", status: "cleared", ref: "RENT-2026-02" },
  { id: "TXN-005", date: "2026-02-24", description: "Client Invoice – StartupXYZ", account: "Accounts Receivable", type: "Revenue", debit: "$15,800", credit: "—", balance: "$457,500", status: "pending", ref: "INV-2026-053" },
  { id: "TXN-006", date: "2026-02-22", description: "Subscription Payment – AWS", account: "IT Expenses", type: "Expense", debit: "—", credit: "$2,100", balance: "$441,700", status: "cleared", ref: "AWS-2026-02" },
  { id: "TXN-007", date: "2026-02-20", description: "Marketing Campaign – Google Ads", account: "Marketing", type: "Expense", debit: "—", credit: "$5,500", balance: "$443,800", status: "cleared", ref: "MKT-2026-01" },
  { id: "TXN-008", date: "2026-02-18", description: "Service Revenue – Project Alpha", account: "Service Revenue", type: "Revenue", debit: "$48,000", credit: "—", balance: "$449,300", status: "cleared", ref: "INV-2026-048" },
];

const columns: Column<Transaction>[] = [
  { key: "id", header: "ID", render: (v) => <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{String(v)}</code> },
  { key: "date", header: "Date", sortable: true, render: (v) => <span className="text-slate-500 text-xs">{String(v)}</span> },
  { key: "description", header: "Description", sortable: true },
  { key: "account", header: "Account", render: (v) => <span className="text-xs text-slate-500">{String(v)}</span> },
  { key: "type", header: "Type", render: (v) => <Badge variant={v === "Revenue" ? "success" : "danger"}>{String(v)}</Badge> },
  { key: "debit", header: "Debit", render: (v) => <span className="text-emerald-700 font-medium">{String(v)}</span> },
  { key: "credit", header: "Credit", render: (v) => <span className="text-red-700 font-medium">{String(v)}</span> },
  { key: "status", header: "Status", render: (v) => <Badge dot variant={v === "cleared" ? "success" : "warning"}>{String(v)}</Badge> },
];

export default function TransactionsPage() {
  return (
    <div>
      <PageHeader
        title="Transactions"
        description="Complete ledger of all financial transactions"
        actions={
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
              <Plus className="w-4 h-4" /> New Entry
            </button>
          </div>
        }
      />
      <DataTable data={transactions} columns={columns} searchPlaceholder="Search transactions..." pageSize={10} />
    </div>
  );
}
