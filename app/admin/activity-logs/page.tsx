"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import DataTable, { type Column } from "@/components/shared/DataTable";
import { formatDateTime } from "@/lib/utils";
import { useActivityLogs } from "@/lib/hooks/use-activity-logs";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";

type ActivityLog = {
  id: string;
  userId: string;
  entity: string;
  entityId?: string;
  action: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  user?: { firstName: string; lastName: string; role: string };
  createdAt: string;
};

const columns: Column<ActivityLog>[] = [
  {
    key: "user",
    header: "User",
    sortable: true,
    render: (v) => {
      const u = v as ActivityLog["user"];
      return <span>{u ? `${u.firstName} ${u.lastName}` : "Unknown"}</span>;
    },
  },
  {
    key: "user",
    header: "Role",
    render: (v) => {
      const u = v as ActivityLog["user"];
      const role = u?.role ?? "—";
      return <Badge variant={role === "ADMIN" ? "primary" : "secondary"}>{role}</Badge>;
    },
  },
  { key: "action", header: "Action", sortable: true },
  {
    key: "entity",
    header: "Entity",
    render: (v) => <span className="text-slate-500 text-xs">{String(v)}</span>,
  },
  {
    key: "ipAddress",
    header: "IP Address",
    render: (v) => <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{v ? String(v) : "—"}</code>,
  },
  {
    key: "createdAt",
    header: "Timestamp",
    sortable: true,
    render: (v) => <span className="text-slate-500 text-xs">{formatDateTime(String(v))}</span>,
  },
];

export default function ActivityLogsPage() {
  const [filter, setFilter] = useState("all");
  const { data, isLoading, error, refetch } = useActivityLogs();

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const logs = data?.data ?? [];
  const filtered = filter === "all" ? logs : logs.filter((l) => l.action?.toLowerCase() === filter);

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
        {["all", "CREATE", "UPDATE", "DELETE", "LOGIN"].map((f) => (
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
