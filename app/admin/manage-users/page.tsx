"use client";

import { useState } from "react";
import { Plus, X, Edit2, Trash2, Key } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import DataTable, { type Column } from "@/components/shared/DataTable";
import StatCard from "@/components/shared/StatCard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";
import { Users, UserCheck, UserX } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useUsers, useCreateUser, useDeleteUser } from "@/lib/hooks/use-users";
import type { User as ApiUser, Role } from "@/lib/api/types";

const roles: Role[] = ["HR", "ACCOUNTANT", "FINANCE_OFFICER", "REVENUE_MANAGER", "ADMIN"];

export default function ManageUsersPage() {
  const { data, isLoading, error, refetch } = useUsers();
  const items = data?.data ?? [];
  const createUserMutation = useCreateUser();
  const deleteUserMutation = useDeleteUser();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "HR" as Role,
  });

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const activeCount = items.filter((u) => u.isActive).length;
  const inactiveCount = items.filter((u) => !u.isActive).length;

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    createUserMutation.mutate(
      {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        role: form.role,
      },
      {
        onSuccess: () => {
          setShowForm(false);
          setForm({ firstName: "", lastName: "", email: "", password: "", role: "HR" });
        },
      }
    );
  }

  const columns: Column<ApiUser>[] = [
    {
      key: "firstName",
      header: "Name",
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xs font-semibold">
            {`${row.firstName[0]}${row.lastName[0]}`.toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">{`${row.firstName} ${row.lastName}`}</p>
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
    {
      key: "isActive",
      header: "Status",
      render: (v) => (
        <Badge dot variant={v ? "success" : "secondary"}>
          {v ? "active" : "inactive"}
        </Badge>
      ),
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
        <StatCard title="Total Users" value={data?.meta?.total ?? items.length} icon={Users} variant="primary" />
        <StatCard title="Active Users" value={activeCount} icon={UserCheck} variant="success" />
        <StatCard title="Inactive" value={inactiveCount} icon={UserX} variant="danger" />
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                  <input
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="John"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                  <input
                    required
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="Doe"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@erp.com"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <input
                  required
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                <p className="text-xs text-amber-700 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5" />
                  The user will log in with the password you set above.
                </p>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createUserMutation.isPending}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
                >
                  {createUserMutation.isPending ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DataTable
        data={items}
        columns={columns}
        searchPlaceholder="Search users..."
        actions={(row) => (
          <div className="flex items-center gap-1 justify-end">
            <button
              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              title="Reset Password"
            >
              <Key className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => deleteUserMutation.mutate(row.id)}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      />
    </div>
  );
}
