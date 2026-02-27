"use client";

import { Edit2, Trash2, Eye, Download, Mail, Phone } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { useState } from "react";

const employees = [
  { id: "EMP001", name: "Sarah Johnson", dept: "Human Resources", position: "HR Manager", email: "sarah.johnson@erp.com", phone: "+1 555-0101", salary: 6200, status: "active", experience: "4 years" },
  { id: "EMP002", name: "Mike Chen", dept: "Finance", position: "Chief Accountant", email: "mike.chen@erp.com", phone: "+1 555-0102", salary: 7800, status: "active", experience: "6 years" },
  { id: "EMP003", name: "Emily Davis", dept: "Finance", position: "Finance Officer", email: "emily.davis@erp.com", phone: "+1 555-0103", salary: 7200, status: "active", experience: "3 years" },
  { id: "EMP004", name: "Alex Thompson", dept: "Sales", position: "Revenue Manager", email: "alex.t@erp.com", phone: "+1 555-0104", salary: 8500, status: "active", experience: "5 years" },
  { id: "EMP005", name: "James Wilson", dept: "Human Resources", position: "HR Associate", email: "james.w@erp.com", phone: "+1 555-0105", salary: 4200, status: "on-leave", experience: "2 years" },
  { id: "EMP006", name: "Linda Martinez", dept: "Finance", position: "Junior Accountant", email: "linda.m@erp.com", phone: "+1 555-0106", salary: 4800, status: "active", experience: "2 years" },
];

export default function ManageEmployeesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const emp = employees.find((e) => e.id === selected);

  return (
    <div>
      <PageHeader
        title="Manage Employees"
        description="Edit employee details, roles, and access"
        actions={
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50">
            <Download className="w-4 h-4" /> Export
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Employee List */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <input placeholder="Search employees..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="overflow-y-auto max-h-[600px]">
            {employees.map((e) => (
              <button
                key={e.id}
                onClick={() => setSelected(e.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-slate-50 hover:bg-slate-50 transition-colors ${
                  selected === e.id ? "bg-indigo-50 border-r-2 border-r-indigo-600" : ""
                }`}
              >
                <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xs font-semibold shrink-0">
                  {e.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{e.name}</p>
                  <p className="text-xs text-slate-400 truncate">{e.position}</p>
                </div>
                <Badge dot variant={e.status === "active" ? "success" : "warning"} className="shrink-0">
                  {e.status === "active" ? "Active" : "Leave"}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Employee Detail */}
        <div className="lg:col-span-2">
          {emp ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-800">Employee Profile</h3>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                    {emp.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{emp.name}</h2>
                    <p className="text-sm text-slate-500">{emp.position} · {emp.dept}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge dot variant={emp.status === "active" ? "success" : "warning"}>{emp.status}</Badge>
                      <span className="text-xs text-slate-400">{emp.id}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Department", value: emp.dept },
                    { label: "Position", value: emp.position },
                    { label: "Experience", value: emp.experience },
                    { label: "Monthly Salary", value: `$${emp.salary.toLocaleString()}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-slate-800">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Contact</h4>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="w-4 h-4 text-slate-400" /> {emp.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="w-4 h-4 text-slate-400" /> {emp.phone}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-64 flex items-center justify-center">
              <div className="text-center">
                <Eye className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Select an employee to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
