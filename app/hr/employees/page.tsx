"use client";

import Link from "next/link";
import { UserPlus, Download } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import DataTable, { type Column } from "@/components/shared/DataTable";
import StatCard from "@/components/shared/StatCard";
import { Users, UserCheck, Building2 } from "lucide-react";

type Employee = {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  joinDate: string;
  salary: string;
  status: "active" | "on-leave" | "terminated";
};

const employees: Employee[] = [
  { id: "1", name: "Sarah Johnson", employeeId: "EMP001", department: "Human Resources", position: "HR Manager", email: "sarah.johnson@erp.com", phone: "+1 555-0101", joinDate: "2022-01-15", salary: "$6,200", status: "active" },
  { id: "2", name: "Mike Chen", employeeId: "EMP002", department: "Finance", position: "Chief Accountant", email: "mike.chen@erp.com", phone: "+1 555-0102", joinDate: "2021-08-22", salary: "$7,800", status: "active" },
  { id: "3", name: "Emily Davis", employeeId: "EMP003", department: "Finance", position: "Finance Officer", email: "emily.davis@erp.com", phone: "+1 555-0103", joinDate: "2022-03-10", salary: "$7,200", status: "active" },
  { id: "4", name: "Alex Thompson", employeeId: "EMP004", department: "Sales", position: "Revenue Manager", email: "alex.t@erp.com", phone: "+1 555-0104", joinDate: "2021-11-05", salary: "$8,500", status: "active" },
  { id: "5", name: "James Wilson", employeeId: "EMP005", department: "Human Resources", position: "HR Associate", email: "james.w@erp.com", phone: "+1 555-0105", joinDate: "2023-04-18", salary: "$4,200", status: "on-leave" },
  { id: "6", name: "Linda Martinez", employeeId: "EMP006", department: "Finance", position: "Junior Accountant", email: "linda.m@erp.com", phone: "+1 555-0106", joinDate: "2023-07-20", salary: "$4,800", status: "active" },
  { id: "7", name: "Robert Brown", employeeId: "EMP007", department: "Finance", position: "Finance Analyst", email: "robert.b@erp.com", phone: "+1 555-0107", joinDate: "2022-09-12", salary: "$5,600", status: "active" },
  { id: "8", name: "Jennifer Lee", employeeId: "EMP008", department: "Human Resources", position: "Recruiter", email: "jen.lee@erp.com", phone: "+1 555-0108", joinDate: "2023-02-28", salary: "$4,500", status: "active" },
  { id: "9", name: "David Kim", employeeId: "EMP009", department: "Sales", position: "Sales Manager", email: "david.k@erp.com", phone: "+1 555-0109", joinDate: "2022-06-15", salary: "$6,800", status: "active" },
  { id: "10", name: "Maria Garcia", employeeId: "EMP010", department: "Finance", position: "Accountant", email: "maria.g@erp.com", phone: "+1 555-0110", joinDate: "2023-10-01", salary: "$5,200", status: "active" },
  { id: "11", name: "Nathan Park", employeeId: "EMP011", department: "Finance", position: "Junior Accountant", email: "nathan.p@erp.com", phone: "+1 555-0111", joinDate: "2026-02-15", salary: "$4,200", status: "active" },
  { id: "12", name: "Sophia Rivera", employeeId: "EMP012", department: "Sales", position: "Sales Executive", email: "sophia.r@erp.com", phone: "+1 555-0112", joinDate: "2026-02-10", salary: "$4,600", status: "active" },
];

const columns: Column<Employee>[] = [
  {
    key: "name",
    header: "Employee",
    sortable: true,
    render: (_, row) => (
      <Link href={`/hr/employees/manage`} className="flex items-center gap-2.5 hover:text-indigo-600">
        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xs font-semibold">
          {row.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-800">{row.name}</p>
          <p className="text-xs text-slate-400">{row.employeeId}</p>
        </div>
      </Link>
    ),
  },
  { key: "department", header: "Department", sortable: true },
  { key: "position", header: "Position", sortable: true },
  {
    key: "email",
    header: "Email",
    render: (v) => <span className="text-xs text-slate-500">{String(v)}</span>,
  },
  { key: "salary", header: "Salary", sortable: true },
  {
    key: "joinDate",
    header: "Join Date",
    sortable: true,
    render: (v) => <span className="text-xs text-slate-500">{String(v)}</span>,
  },
  {
    key: "status",
    header: "Status",
    render: (v) => (
      <Badge dot variant={v === "active" ? "success" : v === "on-leave" ? "warning" : "danger"}>
        {String(v)}
      </Badge>
    ),
  },
];

export default function EmployeesPage() {
  const active = employees.filter((e) => e.status === "active").length;
  const onLeave = employees.filter((e) => e.status === "on-leave").length;
  const depts = new Set(employees.map((e) => e.department)).size;

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
        <StatCard title="Total Employees" value={employees.length} icon={Users} variant="primary" />
        <StatCard title="Active" value={active} icon={UserCheck} variant="success" />
        <StatCard title="Departments" value={depts} icon={Building2} variant="info" />
      </div>

      <DataTable data={employees} columns={columns} searchPlaceholder="Search employees..." pageSize={10} />
    </div>
  );
}
