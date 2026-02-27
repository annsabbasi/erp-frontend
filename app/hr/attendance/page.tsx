"use client";

import { useState } from "react";
import { Clock, CheckCircle2, XCircle, AlertTriangle, Download } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import StatCard from "@/components/shared/StatCard";
import { ChartCard, ERPBarChart } from "@/components/shared/Charts";
import { Users } from "lucide-react";

const weekData = [
  { day: "Mon Feb 24", present: 54, late: 3, absent: 3, leave: 2 },
  { day: "Tue Feb 25", present: 56, late: 2, absent: 2, leave: 2 },
  { day: "Wed Feb 26", present: 52, late: 4, absent: 4, leave: 2 },
  { day: "Thu Feb 27 (Today)", present: 54, late: 2, absent: 3, leave: 3 },
];

const todayAttendance = [
  { id: "EMP001", name: "Sarah Johnson", dept: "HR", clockIn: "08:58", clockOut: "—", status: "present" },
  { id: "EMP002", name: "Mike Chen", dept: "Finance", clockIn: "09:02", clockOut: "—", status: "late" },
  { id: "EMP003", name: "Emily Davis", dept: "Finance", clockIn: "08:45", clockOut: "—", status: "present" },
  { id: "EMP004", name: "Alex Thompson", dept: "Sales", clockIn: "09:00", clockOut: "—", status: "present" },
  { id: "EMP005", name: "James Wilson", dept: "HR", clockIn: "—", clockOut: "—", status: "leave" },
  { id: "EMP006", name: "Linda Martinez", dept: "Finance", clockIn: "08:55", clockOut: "—", status: "present" },
  { id: "EMP007", name: "Robert Brown", dept: "Finance", clockIn: "—", clockOut: "—", status: "absent" },
  { id: "EMP008", name: "Jennifer Lee", dept: "HR", clockIn: "09:15", clockOut: "—", status: "late" },
  { id: "EMP009", name: "David Kim", dept: "Sales", clockIn: "09:01", clockOut: "—", status: "present" },
  { id: "EMP010", name: "Maria Garcia", dept: "Finance", clockIn: "08:50", clockOut: "—", status: "present" },
];

const statusConfig = {
  present: { label: "Present", variant: "success" as const, icon: CheckCircle2, color: "text-emerald-500" },
  late: { label: "Late", variant: "warning" as const, icon: AlertTriangle, color: "text-amber-500" },
  absent: { label: "Absent", variant: "danger" as const, icon: XCircle, color: "text-red-500" },
  leave: { label: "On Leave", variant: "info" as const, icon: Clock, color: "text-blue-500" },
};

export default function AttendancePage() {
  const [date, setDate] = useState("2026-02-27");
  const today = todayAttendance;
  const present = today.filter((e) => e.status === "present").length;
  const late = today.filter((e) => e.status === "late").length;
  const absent = today.filter((e) => e.status === "absent").length;
  const onLeave = today.filter((e) => e.status === "leave").length;

  return (
    <div>
      <PageHeader
        title="Attendance Management"
        description="Track daily attendance, clock-in/out times, and late arrivals"
        actions={
          <div className="flex gap-2">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="Present" value={present} icon={CheckCircle2} variant="success" description={`${Math.round((present / today.length) * 100)}% attendance`} />
        <StatCard title="Late" value={late} icon={AlertTriangle} variant="warning" description="Clock in after 9:00 AM" />
        <StatCard title="Absent" value={absent} icon={XCircle} variant="danger" description="No show without leave" />
        <StatCard title="On Leave" value={onLeave} icon={Clock} variant="info" description="Approved leave" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <ChartCard title="Weekly Attendance Overview" className="xl:col-span-2">
          <ERPBarChart
            data={weekData}
            dataKeys={[
              { key: "present", name: "Present", color: "#10b981" },
              { key: "late", name: "Late", color: "#f59e0b" },
              { key: "absent", name: "Absent", color: "#ef4444" },
            ]}
            xKey="day"
          />
        </ChartCard>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Today's Summary</h3>
          <div className="space-y-3">
            {[
              { label: "Total Employees", value: today.length, color: "bg-slate-500" },
              { label: "Present", value: present, color: "bg-emerald-500" },
              { label: "Late Arrivals", value: late, color: "bg-amber-500" },
              { label: "Absent", value: absent, color: "bg-red-500" },
              { label: "On Leave", value: onLeave, color: "bg-blue-500" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                  <span className="text-sm text-slate-600">{label}</span>
                </div>
                <span className="text-sm font-semibold text-slate-800">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center">
              Attendance Rate: <span className="font-bold text-emerald-600">{Math.round((present / today.length) * 100)}%</span>
            </p>
            <div className="h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.round((present / today.length) * 100)}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">Today's Attendance Log</h3>
          <span className="text-xs text-slate-400">Feb 27, 2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Employee", "ID", "Department", "Clock In", "Clock Out", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {today.map((e) => {
                const cfg = statusConfig[e.status as keyof typeof statusConfig];
                const StatusIcon = cfg.icon;
                return (
                  <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xs font-semibold">
                          {e.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="font-medium text-slate-800">{e.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{e.id}</code></td>
                    <td className="px-4 py-3 text-slate-500">{e.dept}</td>
                    <td className="px-4 py-3 font-mono text-slate-600">{e.clockIn}</td>
                    <td className="px-4 py-3 font-mono text-slate-600">{e.clockOut}</td>
                    <td className="px-4 py-3">
                      <Badge variant={cfg.variant} dot>{cfg.label}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
