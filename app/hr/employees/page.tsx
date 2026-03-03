"use client";

import Link from "next/link";
import { UserPlus, Download } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import DataTable, { type Column } from "@/components/shared/DataTable";
import StatCard from "@/components/shared/StatCard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";
import { Users, UserCheck, Building2 } from "lucide-react";
import { useEmployees } from "@/lib/hooks/use-employees";
import type { Employee } from "@/lib/api/types";

function statusLabel(status: Employee["status"]): string {
  switch (status) {
    case "ACTIVE":
      return "active";
    case "ON_LEAVE":
      return "on leave";
    case "INACTIVE":
      return "inactive";
    case "TERMINATED":
      return "terminated";
  }
}

function statusVariant(status: Employee["status"]): "success" | "warning" | "danger" | "secondary" {
  switch (status) {
    case "ACTIVE":
      return "success";
    case "ON_LEAVE":
      return "warning";
    case "TERMINATED":
      return "danger";
    default:
      return "secondary";
  }
}

const columns: Column<Employee>[] = [
  {
    key: "firstName",
    header: "Employee",
    sortable: true,
    render: (_, row) => (
      <Link href="/hr/employees/manage" className="flex items-center gap-2.5 hover:text-indigo-600">
        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xs font-semibold">
          {`${row.firstName[0]}${row.lastName[0]}`.toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-800">{`${row.firstName} ${row.lastName}`}</p>
          <p className="text-xs text-slate-400">{row.employeeCode}</p>
        </div>
      </Link>
    ),
  },
  {
    key: "department",
    header: "Department",
    sortable: true,
    render: (_, row) => <span>{row.department?.name ?? "—"}</span>,
  },
  {
    key: "email",
    header: "Email",
    render: (v) => <span className="text-xs text-slate-500">{String(v)}</span>,
  },
  {
    key: "joinDate",
    header: "Join Date",
    sortable: true,
    render: (v) => <span className="text-xs text-slate-500">{String(v)}</span>,
  },
  {
    key: "status",
    header: "Status",
    render: (_, row) => (
      <Badge dot variant={statusVariant(row.status)}>
        {statusLabel(row.status)}
      </Badge>
    ),
  },
];

export default function EmployeesPage() {
  const { data, isLoading, error, refetch } = useEmployees();
  const items = data?.data ?? [];

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const active = items.filter((e) => e.status === "ACTIVE").length;
  const depts = new Set(items.map((e) => e.departmentId)).size;

  return (
    <div>
      <PageHeader
        title="Employee Management"
        description="View, manage, and track all employees"
        actions={
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
            <Link
              href="/hr/employees/add"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <UserPlus className="w-4 h-4" /> Add Employee
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Employees" value={data?.meta?.total ?? items.length} icon={Users} variant="primary" />
        <StatCard title="Active" value={active} icon={UserCheck} variant="success" />
        <StatCard title="Departments" value={depts} icon={Building2} variant="info" />
      </div>

      <DataTable data={items} columns={columns} searchPlaceholder="Search employees..." pageSize={10} />
    </div>
  );
}
