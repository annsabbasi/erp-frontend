"use client";

import { useState } from "react";
import { Plus, X, Shield, Edit2, Trash2, Key, MoreVertical } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import DataTable, { type Column } from "@/components/shared/DataTable";
import StatCard from "@/components/shared/StatCard";
import { Users, UserCheck, UserX } from "lucide-react";
import { formatDate } from "@/lib/utils";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive" | "suspended";
  lastLogin: string;
  createdAt: string;
};

const initialUsers: User[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah.johnson@erp.com", role: "HR", department: "Human Resources", status: "active", lastLogin: "2026-02-27", createdAt: "2024-01-15" },
  { id: 2, name: "Mike Chen", email: "mike.chen@erp.com", role: "Accountant", department: "Finance", status: "active", lastLogin: "2026-02-27", createdAt: "2024-02-08" },
  { id: 3, name: "Emily Davis", email: "emily.davis@erp.com", role: "Finance Officer", department: "Finance", status: "active", lastLogin: "2026-02-26", createdAt: "2024-01-22" },
  { id: 4, name: "Alex Thompson", email: "alex.thompson@erp.com", role: "Revenue Manager", department: "Sales", status: "active", lastLogin: "2026-02-27", createdAt: "2024-03-05" },
  { id: 5, name: "James Wilson", email: "james.wilson@erp.com", role: "HR", department: "Human Resources", status: "suspended", lastLogin: "2026-02-20", createdAt: "2024-04-12" },
  { id: 6, name: "Linda Martinez", email: "linda.m@erp.com", role: "Accountant", department: "Finance", status: "active", lastLogin: "2026-02-25", createdAt: "2024-05-18" },
  { id: 7, name: "Robert Brown", email: "robert.b@erp.com", role: "Finance Officer", department: "Finance", status: "inactive", lastLogin: "2026-01-10", createdAt: "2024-06-01" },
  { id: 8, name: "Jennifer Lee", email: "jen.lee@erp.com", role: "HR", department: "Human Resources", status: "active", lastLogin: "2026-02-26", createdAt: "2024-07-14" },
  { id: 9, name: "David Kim", email: "david.kim@erp.com", role: "Revenue Manager", department: "Sales", status: "active", lastLogin: "2026-02-27", createdAt: "2024-08-03" },
  { id: 10, name: "Maria Garcia", email: "maria.g@erp.com", role: "Accountant", department: "Finance", status: "active", lastLogin: "2026-02-24", createdAt: "2024-09-19" },
];

const roles = ["HR", "Accountant", "Finance Officer", "Revenue Manager", "Admin"];
const departments = ["Human Resources", "Finance", "Sales", "Operations", "IT"];

export default function ManageUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "HR", department: "Human Resources" });

  const activeCount = users.filter((u) => u.status === "active").length;
  const inactiveCount = users.filter((u) => u.status !== "active").length;

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setUsers([...users, {
      id: Date.now(), ...form, status: "active",
      lastLogin: "Never", createdAt: new Date().toISOString().split("T")[0],
    }]);
    setShowForm(false);
    setForm({ name: "", email: "", role: "HR", department: "Human Resources" });
  }

  function deleteUser(id: number) {
    setUsers(users.filter((u) => u.id !== id));
  }

  const columns: Column<User>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xs font-semibold">
            {row.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">{row.name}</p>
            <p className="text-xs text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      render: (v) => <Badge variant="primary">{String(v)}</Badge>,
    },
    { key: "department", header: "Department", sortable: true },
    {
      key: "status",
      header: "Status",
      render: (v) => (
        <Badge
          dot
          variant={v === "active" ? "success" : v === "suspended" ? "danger" : "secondary"}
        >
          {String(v)}
        </Badge>
      ),
    },
    {
      key: "lastLogin",
      header: "Last Login",
      sortable: true,
      render: (v) => <span className="text-xs text-slate-500">{v === "Never" ? "Never" : formatDate(String(v))}</span>,
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      render: (v) => <span className="text-xs text-slate-500">{formatDate(String(v))}</span>,
    },
  ];

  return (
    <div>
      <PageHeader
        title="User Management"
        description="Create, manage, and control access for all system users"
        actions={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" /> Add User
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Users" value={users.length} icon={Users} variant="primary" />
        <StatCard title="Active Users" value={activeCount} icon={UserCheck} variant="success" />
        <StatCard title="Inactive / Suspended" value={inactiveCount} icon={UserX} variant="danger" />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-800">Add New User</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@erp.com" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
                  <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {roles.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Department</label>
                  <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {departments.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                <p className="text-xs text-amber-700 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5" />
                  A temporary password will be sent to the user's email.
                </p>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DataTable
        data={users}
        columns={columns}
        searchPlaceholder="Search users..."
        actions={(row) => (
          <div className="flex items-center gap-1 justify-end">
            <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Reset Password">
              <Key className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => deleteUser(row.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      />
    </div>
  );
}
