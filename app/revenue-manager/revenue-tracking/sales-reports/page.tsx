"use client";

import { Download, TrendingUp } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import DataTable, { type Column } from "@/components/shared/DataTable";
import { ChartCard, ERPBarChart, ERPLineChart } from "@/components/shared/Charts";

type SalesRecord = { id: string; client: string; product: string; amount: number; date: string; rep: string; region: string; status: string; margin: string; };

const sales: SalesRecord[] = [
  { id: "SAL-001", client: "GlobalCorp Ltd.", product: "Enterprise Suite", amount: 48500, date: "Feb 27", rep: "Alex Thompson", region: "North America", status: "closed", margin: "42%" },
  { id: "SAL-002", client: "Innovation Labs", product: "Professional Plan", amount: 42000, date: "Feb 22", rep: "David Kim", region: "Europe", status: "closed", margin: "38%" },
  { id: "SAL-003", client: "TechVentures Inc.", product: "Custom Integration", amount: 38600, date: "Feb 18", rep: "Alex Thompson", region: "Asia Pacific", status: "closed", margin: "35%" },
  { id: "SAL-004", client: "StartupXYZ", product: "Starter Pack", amount: 24500, date: "Feb 15", rep: "Jennifer Lee", region: "North America", status: "invoiced", margin: "55%" },
  { id: "SAL-005", client: "Acme Corp.", product: "Professional Plan", amount: 18200, date: "Feb 12", rep: "David Kim", region: "Europe", status: "closed", margin: "40%" },
  { id: "SAL-006", client: "MegaBrand Co.", product: "Annual License", amount: 15800, date: "Mar 3", rep: "Alex Thompson", region: "North America", status: "pending", margin: "48%" },
  { id: "SAL-007", client: "BlueSky Inc.", product: "Add-on Package", amount: 8400, date: "Feb 20", rep: "Jennifer Lee", region: "North America", status: "closed", margin: "62%" },
];

const regionData = [
  { region: "North America", revenue: 115200 },
  { region: "Europe", revenue: 60200 },
  { region: "Asia Pacific", revenue: 38600 },
];

const columns: Column<SalesRecord>[] = [
  { key: "id", header: "Sale ID", render: (v) => <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{String(v)}</code> },
  { key: "client", header: "Client", sortable: true },
  { key: "product", header: "Product", sortable: true, render: (v) => <span className="text-xs text-slate-500">{String(v)}</span> },
  { key: "amount", header: "Amount", sortable: true, render: (v) => <span className="font-bold text-slate-800">${Number(v).toLocaleString()}</span> },
  { key: "rep", header: "Sales Rep", sortable: true },
  { key: "region", header: "Region" },
  { key: "margin", header: "Margin" },
  { key: "status", header: "Status", render: (v) => <Badge dot variant={v === "closed" ? "success" : v === "invoiced" ? "info" : "warning"}>{String(v)}</Badge> },
];

export default function SalesReportsPage() {
  return (
    <div>
      <PageHeader
        title="Sales Reports"
        description="Detailed analysis of sales performance and pipeline"
        actions={
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        }
      />

      <ChartCard title="Revenue by Region (Feb)" className="mb-6">
        <ERPBarChart data={regionData} dataKeys={[{ key: "revenue", name: "Revenue", color: "#4f46e5" }]} xKey="region" formatY={(v) => `$${(v / 1000).toFixed(0)}k`} />
      </ChartCard>

      <DataTable data={sales} columns={columns} searchPlaceholder="Search sales..." pageSize={10} />
    </div>
  );
}
