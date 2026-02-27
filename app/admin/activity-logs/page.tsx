"use client";

import { useState } from "react";
import { Activity, Download, Filter } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import DataTable, { type Column } from "@/components/shared/DataTable";
import { formatDateTime } from "@/lib/utils";

type Log = {
  id: number;
  user: string;
  role: string;
  action: string;
  module: string;
  ip: string;
  timestamp: string;
  status: string;
};

const logs: Log[] = [
  { id: 1, user: "Sarah Johnson", role: "HR", action: "Added employee record", module: "HR", ip: "192.168.1.42", timestamp: "2026-02-27T10:32:00", status: "success" },
  { id: 2, user: "Mike Chen", role: "Accountant", action: "Generated monthly payroll", module: "Payroll", ip: "192.168.1.18", timestamp: "2026-02-27T10:15:00", status: "success" },
  { id: 3, user: "Emily Davis", role: "Finance Officer", action: "Updated Q1 budget", module: "Finance", ip: "192.168.1.31", timestamp: "2026-02-27T09:58:00", status: "success" },
  { id: 4, user: "Alex Thompson", role: "Revenue Manager", action: "Login from new device", module: "Auth", ip: "10.0.0.54", timestamp: "2026-02-27T09:40:00", status: "warning" },
  { id: 5, user: "James Wilson", role: "HR", action: "Failed login attempt", module: "Auth", ip: "192.168.1.77", timestamp: "2026-02-27T09:30:00", status: "danger" },
  { id: 6, user: "System", role: "System", action: "Automated database backup", module: "System", ip: "127.0.0.1", timestamp: "2026-02-27T09:00:00", status: "success" },
  { id: 7, user: "Sarah Johnson", role: "HR", action: "Updated employee salary", module: "Payroll", ip: "192.168.1.42", timestamp: "2026-02-27T08:55:00", status: "success" },
  { id: 8, user: "Admin", role: "Admin", action: "Created new user account", module: "Users", ip: "192.168.1.1", timestamp: "2026-02-27T08:40:00", status: "success" },
  { id: 9, user: "Mike Chen", role: "Accountant", action: "Exported financial report", module: "Reports", ip: "192.168.1.18", timestamp: "2026-02-27T08:22:00", status: "success" },
  { id: 10, user: "Alex Thompson", role: "Revenue Manager", action: "Updated pricing model", module: "Revenue", ip: "10.0.0.54", timestamp: "2026-02-27T08:10:00", status: "success" },
  { id: 11, user: "Emily Davis", role: "Finance Officer", action: "Approved department budget", module: "Finance", ip: "192.168.1.31", timestamp: "2026-02-27T07:55:00", status: "success" },
  { id: 12, user: "Unknown", role: "—", action: "Unauthorized access attempt", module: "Auth", ip: "203.0.113.44", timestamp: "2026-02-27T07:30:00", status: "danger" },
];

const columns: Column<Log>[] = [
  { key: "user", header: "User", sortable: true },
  {
    key: "role",
    header: "Role",
    render: (v) => <Badge variant={v === "System" || v === "—" ? "secondary" : "primary"}>{String(v)}</Badge>,
  },
  { key: "action", header: "Action", sortable: true },
  {
    key: "module",
    header: "Module",
    render: (v) => <span className="text-slate-500 text-xs">{String(v)}</span>,
  },
  {
    key: "ip",
    header: "IP Address",
    render: (v) => <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{String(v)}</code>,
  },
  {
    key: "timestamp",
    header: "Timestamp",
    sortable: true,
    render: (v) => <span className="text-slate-500 text-xs">{formatDateTime(String(v))}</span>,
  },
  {
    key: "status",
    header: "Status",
    render: (v) => (
      <Badge
        variant={v === "success" ? "success" : v === "warning" ? "warning" : "danger"}
        dot
      >
        {String(v)}
      </Badge>
    ),
  },
];

export default function ActivityLogsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? logs : logs.filter((l) => l.status === filter);

  return (
    <div>
      <PageHeader
        title="Activity Logs"
        description="Complete audit trail of all system actions and events"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        }
      />

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-4">
        {["all", "success", "warning", "danger"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
              filter === f
                ? "bg-indigo-600 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {f === "all" ? "All Events" : f}
          </button>
        ))}
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search logs..."
        pageSize={10}
      />
    </div>
  );
}
