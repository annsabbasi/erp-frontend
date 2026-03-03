"use client";

import { Users, UserCog, Plus, Edit2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import Link from "next/link";
import { useDepartments } from "@/lib/hooks/use-departments";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorState } from "@/components/shared/ErrorState";

const bgColors = ["bg-indigo-500", "bg-emerald-500", "bg-amber-500", "bg-blue-500", "bg-violet-500", "bg-rose-500"];
const iconColors = ["text-indigo-600", "text-emerald-600", "text-amber-600", "text-blue-600", "text-violet-600", "text-rose-600"];

export default function DepartmentManagementPage() {
  const { data, isLoading, error, refetch } = useDepartments();

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState onRetry={refetch} />;

  const departments = data?.data ?? [];

  return (
    <div>
      <PageHeader
        title="Department Management"
        description="Manage departments, assign department heads, and control module access"
        actions={
          <div className="flex gap-2">
            <Link
              href="/admin/department-management/assign-heads"
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors"
            >
              <UserCog className="w-4 h-4" /> Assign Heads
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
              <Plus className="w-4 h-4" /> Add Department
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {departments.map((dept, i) => (
          <div key={dept.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className={`h-1.5 ${bgColors[i % bgColors.length]}`} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-800">{dept.name}</h3>
                    <Badge variant="secondary">{dept.code}</Badge>
                  </div>
                  <Badge variant={dept.isActive ? "success" : "secondary"} dot className="mt-1">
                    {dept.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 py-3 border-y border-slate-50 my-3">
                <div className={`w-9 h-9 ${bgColors[i % bgColors.length]} bg-opacity-10 rounded-full flex items-center justify-center`}>
                  <UserCog className={`w-4 h-4 ${iconColors[i % iconColors.length]}`} />
                </div>
                <div>
                  {dept.head ? (
                    <>
                      <p className="text-sm font-medium text-slate-700">{dept.head.firstName} {dept.head.lastName}</p>
                      <p className="text-xs text-slate-400">{dept.head.role}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-slate-500">Unassigned</p>
                      <p className="text-xs text-slate-400">No head assigned</p>
                    </>
                  )}
                </div>
              </div>

              {dept.description && (
                <p className="text-xs text-slate-500 mb-3">{dept.description}</p>
              )}

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Users className="w-3.5 h-3.5" />
                <span>Created {new Date(dept.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
