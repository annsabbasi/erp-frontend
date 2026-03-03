"use client";

import { Download } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import DataTable, { type Column } from "@/components/shared/DataTable";
import { ChartCard, ERPBarChart } from "@/components/shared/Charts";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";
import { useInvoices } from "@/lib/hooks/use-invoices";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Invoice } from "@/lib/api/types";

const columns: Column<Invoice>[] = [
  {
    key: "invoiceNumber",
    header: "Invoice #",
    render: (v) => <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{String(v)}</code>,
  },
  {
    key: "client",
    header: "Client",
    sortable: true,
    render: (_, row) => <span>{row.client?.name ?? row.clientId}</span>,
  },
  {
    key: "issueDate",
    header: "Date",
    sortable: true,
    render: (v) => <span className="text-xs text-slate-500">{formatDate(String(v))}</span>,
  },
  {
    key: "totalAmount",
    header: "Amount",
    sortable: true,
    render: (v) => <span className="font-bold text-slate-800">{formatCurrency(Number(v))}</span>,
  },
  {
    key: "dueDate",
    header: "Due Date",
    render: (v) => <span className="text-xs text-slate-500">{formatDate(String(v))}</span>,
  },
  {
    key: "status",
    header: "Status",
    render: (v) => (
      <Badge
        dot
        variant={
          v === "PAID" ? "success" : v === "SENT" ? "info" : v === "OVERDUE" ? "danger" : "warning"
        }
      >
        {String(v).toLowerCase()}
      </Badge>
    ),
  },
];

export default function SalesReportsPage() {
  const { data, isLoading, error, refetch } = useInvoices();
  const items = data?.data ?? [];

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  // Aggregate by currency/totals for chart
  const statusTotals = items.reduce<Record<string, number>>((acc, inv) => {
    const key = inv.status;
    acc[key] = (acc[key] ?? 0) + inv.totalAmount;
    return acc;
  }, {});

  const chartData = Object.entries(statusTotals).map(([status, revenue]) => ({
    status,
    revenue,
  }));

  return (
    <div>
      <PageHeader
        title="Sales Reports"
        description="Detailed analysis of invoice and revenue performance"
        actions={
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        }
      />

      <ChartCard title="Revenue by Invoice Status" className="mb-6">
        <ERPBarChart
          data={chartData}
          dataKeys={[{ key: "revenue", name: "Revenue", color: "#4f46e5" }]}
          xKey="status"
          formatY={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
      </ChartCard>

      <DataTable data={items} columns={columns} searchPlaceholder="Search invoices..." pageSize={10} />
    </div>
  );
}
