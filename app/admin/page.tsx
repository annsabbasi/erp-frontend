"use client";

import { Users, Activity, Shield, Server, TrendingUp, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { ChartCard, ERPAreaChart, ERPBarChart } from "@/components/shared/Charts";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";

const activityData = [
  { month: "Sep", users: 180, logins: 420 },
  { month: "Oct", users: 195, logins: 460 },
  { month: "Nov", users: 210, logins: 510 },
  { month: "Dec", users: 220, logins: 490 },
  { month: "Jan", users: 238, logins: 540 },
  { month: "Feb", users: 248, logins: 580 },
];

const moduleUsage = [
  { name: "HR", usage: 92 },
  { name: "Finance", usage: 88 },
  { name: "Payroll", usage: 76 },
  { name: "CRM", usage: 65 },
  { name: "LMS", usage: 54 },
  { name: "Reports", usage: 48 },
];

const recentLogs = [
  { id: 1, user: "Sarah Johnson", action: "Created new employee record", role: "HR", time: "2026-02-27T10:32:00", status: "success" },
  { id: 2, user: "Mike Chen", action: "Generated monthly payroll", role: "Accountant", time: "2026-02-27T10:15:00", status: "success" },
  { id: 3, user: "Emily Davis", action: "Updated budget allocation", role: "Finance Officer", time: "2026-02-27T09:58:00", status: "warning" },
  { id: 4, user: "Alex Thompson", action: "Login from new device", role: "Revenue Manager", time: "2026-02-27T09:40:00", status: "info" },
  { id: 5, user: "System", action: "Automated backup completed", role: "System", time: "2026-02-27T09:00:00", status: "success" },
  { id: 6, user: "James Wilson", action: "Failed login attempt (3x)", role: "HR", time: "2026-02-27T08:45:00", status: "danger" },
];

const systemHealth = [
  { service: "API Server", status: "Operational", uptime: "99.9%", color: "success" as const },
  { service: "Database", status: "Operational", uptime: "100%", color: "success" as const },
  { service: "Email Service", status: "Degraded", uptime: "94.2%", color: "warning" as const },
  { service: "Storage", status: "Operational", uptime: "99.8%", color: "success" as const },
];

export default function AdminDashboard() {
  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="System overview and management controls"
        actions={
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              All Systems Operational
            </span>
            <Link
              href="/admin/manage-users"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Manage Users
            </Link>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Users" value="248" icon={Users} change={4.2} variant="primary" description="Across all roles" />
        <StatCard title="Active Sessions" value="183" icon={Activity} change={8.1} variant="success" description="Currently online" />
        <StatCard title="Active Modules" value="12" icon={Shield} change={0} variant="info" description="All modules running" />
        <StatCard title="System Uptime" value="99.9%" icon={Server} change={0.1} variant="default" description="Last 30 days" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <ChartCard
          title="User Growth & Login Activity"
          description="Monthly trend over the last 6 months"
          className="xl:col-span-2"
        >
          <ERPAreaChart
            data={activityData}
            dataKeys={[
              { key: "users", name: "Total Users", color: "#4f46e5" },
              { key: "logins", name: "Daily Logins", color: "#10b981" },
            ]}
            xKey="month"
          />
        </ChartCard>

        <ChartCard title="Module Usage" description="Adoption rate by module">
          <div className="space-y-3">
            {moduleUsage.map((m) => (
              <div key={m.name}>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>{m.name}</span>
                  <span className="font-medium">{m.usage}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${m.usage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Recent Activity</h3>
              <p className="text-xs text-slate-400 mt-0.5">Latest system events</p>
            </div>
            <Link href="/admin/activity-logs" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 px-5 py-3 hover:bg-slate-50 transition-colors">
                <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                  log.status === "success" ? "bg-emerald-500" :
                  log.status === "warning" ? "bg-amber-500" :
                  log.status === "danger" ? "bg-red-500" : "bg-blue-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-700 truncate">{log.user}</span>
                    <Badge variant={log.role === "System" ? "secondary" : "primary"} className="shrink-0">
                      {log.role}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{log.action}</p>
                </div>
                <span className="text-xs text-slate-400 shrink-0 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDateTime(log.time).split(",")[1]?.trim()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800">System Health</h3>
            <p className="text-xs text-slate-400 mt-0.5">Service status overview</p>
          </div>
          <div className="p-5 space-y-4">
            {systemHealth.map((s) => (
              <div key={s.service} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {s.color === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  )}
                  <div>
                    <p className="text-sm text-slate-700 font-medium">{s.service}</p>
                    <p className="text-xs text-slate-400">{s.uptime} uptime</p>
                  </div>
                </div>
                <Badge variant={s.color}>{s.status}</Badge>
              </div>
            ))}
          </div>

          <div className="px-5 pb-5">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500 font-medium mb-3">Quick Actions</p>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/admin/manage-users" className="px-3 py-2 text-xs text-center text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg font-medium transition-colors">
                  Add User
                </Link>
                <Link href="/admin/activity-logs" className="px-3 py-2 text-xs text-center text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors">
                  View Logs
                </Link>
                <Link href="/admin/announcements" className="px-3 py-2 text-xs text-center text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors">
                  Announce
                </Link>
                <Link href="/admin/department-management" className="px-3 py-2 text-xs text-center text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors">
                  Departments
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
