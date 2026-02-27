"use client";

import { Users, Clock, Calendar, DollarSign, UserPlus, TrendingUp, AlertCircle } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { ChartCard, ERPBarChart, ERPPieChart } from "@/components/shared/Charts";
import Link from "next/link";

const attendanceData = [
  { day: "Mon", present: 44, absent: 3, leave: 2 },
  { day: "Tue", present: 46, absent: 2, leave: 1 },
  { day: "Wed", present: 42, absent: 4, leave: 3 },
  { day: "Thu", present: 45, absent: 2, leave: 2 },
  { day: "Fri", present: 40, absent: 5, leave: 4 },
];

const deptDistribution = [
  { name: "Finance", value: 18, color: "#4f46e5" },
  { name: "Sales", value: 15, color: "#10b981" },
  { name: "HR", value: 8, color: "#f59e0b" },
  { name: "IT", value: 6, color: "#3b82f6" },
  { name: "Operations", value: 15, color: "#8b5cf6" },
];

const pendingLeaves = [
  { id: 1, name: "James Wilson", type: "Annual Leave", from: "Mar 3", to: "Mar 7", days: 5, status: "pending" },
  { id: 2, name: "Linda Martinez", type: "Sick Leave", from: "Feb 28", to: "Mar 1", days: 2, status: "pending" },
  { id: 3, name: "David Kim", type: "Emergency", from: "Mar 1", to: "Mar 1", days: 1, status: "pending" },
  { id: 4, name: "Maria Garcia", type: "Annual Leave", from: "Mar 10", to: "Mar 14", days: 5, status: "pending" },
];

const recentEmployees = [
  { id: 1, name: "Nathan Park", dept: "Finance", joinDate: "Feb 15, 2026", role: "Junior Accountant" },
  { id: 2, name: "Sophia Rivera", dept: "Sales", joinDate: "Feb 10, 2026", role: "Sales Executive" },
  { id: 3, name: "Oliver Hunt", dept: "IT", joinDate: "Feb 8, 2026", role: "DevOps Engineer" },
];

export default function HRDashboard() {
  return (
    <div>
      <PageHeader
        title="HR Dashboard"
        description="Employee overview, attendance, and workforce analytics"
        actions={
          <Link
            href="/hr/employees/add"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <UserPlus className="w-4 h-4" /> Add Employee
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Employees" value="62" icon={Users} change={3.4} variant="primary" description="Across all departments" />
        <StatCard title="Present Today" value="54" icon={Clock} change={1.2} variant="success" description="87% attendance rate" />
        <StatCard title="On Leave" value="5" icon={Calendar} change={-2.1} variant="warning" description="Approved leaves" />
        <StatCard title="Payroll This Month" value="$284,500" icon={DollarSign} change={5.8} variant="info" description="Processed on Feb 25" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <ChartCard title="Weekly Attendance" description="Present vs Absent vs On Leave" className="xl:col-span-2">
          <ERPBarChart
            data={attendanceData}
            dataKeys={[
              { key: "present", name: "Present", color: "#10b981" },
              { key: "absent", name: "Absent", color: "#ef4444" },
              { key: "leave", name: "Leave", color: "#f59e0b" },
            ]}
            xKey="day"
          />
        </ChartCard>

        <ChartCard title="Staff by Department" description="Distribution across departments">
          <ERPPieChart data={deptDistribution} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Pending Leave Requests */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-800">Pending Leave Requests</h3>
              <span className="inline-flex items-center justify-center w-5 h-5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                {pendingLeaves.length}
              </span>
            </div>
            <Link href="/hr/leave" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">View all</Link>
          </div>
          <div className="divide-y divide-slate-50">
            {pendingLeaves.map((l) => (
              <div key={l.id} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-xs font-semibold">
                    {l.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{l.name}</p>
                    <p className="text-xs text-slate-400">{l.type} · {l.from} – {l.to} ({l.days}d)</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg transition-colors">
                    Approve
                  </button>
                  <button className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium rounded-lg transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Hires & Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-800">Recent Hires</h3>
              <Link href="/hr/employees" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">View all</Link>
            </div>
            <div className="divide-y divide-slate-50">
              {recentEmployees.map((emp) => (
                <div key={emp.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xs font-semibold">
                    {emp.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700">{emp.name}</p>
                    <p className="text-xs text-slate-400">{emp.role} · {emp.dept}</p>
                  </div>
                  <span className="text-xs text-slate-400">{emp.joinDate}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Add Employee", href: "/hr/employees/add", color: "indigo" },
                { label: "Attendance", href: "/hr/attendance", color: "emerald" },
                { label: "Generate Payroll", href: "/hr/payroll/generate", color: "amber" },
                { label: "View Payslips", href: "/hr/payroll/payslips", color: "blue" },
              ].map(({ label, href, color }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-2.5 text-xs text-center font-medium rounded-lg transition-colors bg-${color}-50 hover:bg-${color}-100 text-${color}-700`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
