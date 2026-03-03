"use client";

import { Plus, Download } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import DataTable, { type Column } from "@/components/shared/DataTable";
import { useJournalEntries } from "@/lib/hooks/use-journal-entries";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";
import type { JournalEntry } from "@/lib/api/types";

const columns: Column<JournalEntry>[] = [
  { key: "id", header: "ID", render: (v) => <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{String(v)}</code> },
  { key: "date", header: "Date", sortable: true, render: (v) => <span className="text-slate-500 text-xs">{String(v)}</span> },
  { key: "description", header: "Description", sortable: true },
  { key: "reference", header: "Reference", render: (v) => <span className="text-xs text-slate-500">{String(v)}</span> },
  { key: "type", header: "Type", render: (v) => <Badge variant={v === "REVENUE" ? "success" : "danger"}>{String(v)}</Badge> },
  { key: "totalDebit", header: "Debit", render: (v) => <span className="text-emerald-700 font-medium">${Number(v).toLocaleString()}</span> },
  { key: "totalCredit", header: "Credit", render: (v) => <span className="text-red-700 font-medium">${Number(v).toLocaleString()}</span> },
  { key: "status", header: "Status", render: (v) => <Badge dot variant={v === "POSTED" ? "success" : "warning"}>{String(v)}</Badge> },
];

export default function TransactionsPage() {
  const { data, isLoading, error, refetch } = useJournalEntries();

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const entries = data?.data ?? [];

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
      <DataTable data={entries} columns={columns} searchPlaceholder="Search transactions..." pageSize={10} />
    </div>
  );
}
