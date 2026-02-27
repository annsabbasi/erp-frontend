"use client";

import { Building2, Users, UserCog, Plus, Edit2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import Link from "next/link";

const departments = [
  { id: 1, name: "Human Resources", code: "HR", head: "Sarah Johnson", headRole: "HR Manager", employees: 12, status: "active", modules: ["Employees", "Payroll", "Attendance", "Leave"] },
  { id: 2, name: "Finance & Accounting", code: "FIN", head: "Mike Chen", headRole: "Chief Accountant", employees: 8, status: "active", modules: ["Accounts", "Payroll", "Reports", "Budget"] },
  { id: 3, name: "Revenue Management", code: "REV", head: "Alex Thompson", headRole: "Revenue Manager", employees: 6, status: "active", modules: ["Revenue", "Invoicing", "Pricing", "CRM"] },
  { id: 4, name: "Operations", code: "OPS", head: "Unassigned", headRole: "—", employees: 15, status: "active", modules: ["Tasks", "Resources", "Projects"] },
  { id: 5, name: "Information Technology", code: "IT", head: "System Admin", headRole: "IT Director", employees: 4, status: "active", modules: ["System", "Security", "Infrastructure"] },
  { id: 6, name: "Sales & Marketing", code: "SAL", head: "Jennifer Lee", headRole: "Sales Director", employees: 10, status: "active", modules: ["CRM", "Revenue", "Reports"] },
];

const colors = ["indigo", "emerald", "amber", "blue", "violet", "rose"];
const bgColors = ["bg-indigo-500", "bg-emerald-500", "bg-amber-500", "bg-blue-500", "bg-violet-500", "bg-rose-500"];

export default function DepartmentManagementPage() {
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
                  <Badge variant="success" dot className="mt-1">Active</Badge>
                </div>
                <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 py-3 border-y border-slate-50 my-3">
                <div className={`w-9 h-9 ${bgColors[i % bgColors.length]} bg-opacity-10 rounded-full flex items-center justify-center`}>
                  <UserCog className={`w-4 h-4 text-${colors[i % colors.length]}-600`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{dept.head}</p>
                  <p className="text-xs text-slate-400">{dept.headRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <Users className="w-3.5 h-3.5" />
                <span>{dept.employees} employees</span>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-2">Module Access</p>
                <div className="flex flex-wrap gap-1">
                  {dept.modules.map((m) => (
                    <span key={m} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
