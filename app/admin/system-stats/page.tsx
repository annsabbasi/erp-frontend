"use client";

import { Server, Cpu, Database, Wifi, HardDrive, Users, Activity, Clock } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";
import { ChartCard, ERPAreaChart, ERPBarChart } from "@/components/shared/Charts";

const serverMetrics = [
  { time: "00:00", cpu: 32, memory: 58, requests: 120 },
  { time: "04:00", cpu: 18, memory: 52, requests: 45 },
  { time: "08:00", cpu: 45, memory: 64, requests: 380 },
  { time: "10:00", cpu: 68, memory: 72, requests: 620 },
  { time: "12:00", cpu: 72, memory: 78, requests: 710 },
  { time: "14:00", cpu: 65, memory: 75, requests: 680 },
  { time: "16:00", cpu: 58, memory: 70, requests: 520 },
  { time: "18:00", cpu: 48, memory: 65, requests: 340 },
  { time: "20:00", cpu: 38, memory: 60, requests: 210 },
  { time: "Now", cpu: 44, memory: 63, requests: 290 },
];

const roleDistribution = [
  { role: "HR", count: 8 },
  { role: "Accountant", count: 12 },
  { role: "Finance Officer", count: 5 },
  { role: "Revenue Manager", count: 4 },
  { role: "Admin", count: 3 },
];

const storageItems = [
  { label: "Employee Records", size: "12.4 GB", percentage: 24 },
  { label: "Financial Documents", size: "28.6 GB", percentage: 57 },
  { label: "Reports & Analytics", size: "6.8 GB", percentage: 13 },
  { label: "System Logs", size: "3.2 GB", percentage: 6 },
];

export default function SystemStatsPage() {
  return (
    <div>
      <PageHeader
        title="System Statistics"
        description="Real-time system performance metrics and resource usage"
        actions={
          <button className="px-4 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            Export Report
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="CPU Usage" value="44%" icon={Cpu} change={-5.2} variant="warning" description="4 cores / 8 threads" />
        <StatCard title="Memory Usage" value="63%" icon={Server} change={2.1} variant="info" description="8 GB / 16 GB used" />
        <StatCard title="Storage Used" value="51 GB" icon={HardDrive} change={3.4} variant="default" description="100 GB total capacity" />
        <StatCard title="Active Connections" value="183" icon={Wifi} change={8.1} variant="primary" description="Real-time connections" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Server Performance" description="CPU, Memory & Requests over 24h">
          <ERPAreaChart
            data={serverMetrics}
            dataKeys={[
              { key: "cpu", name: "CPU %", color: "#f59e0b" },
              { key: "memory", name: "Memory %", color: "#3b82f6" },
            ]}
            xKey="time"
            formatY={(v) => `${v}%`}
          />
        </ChartCard>

        <ChartCard title="User Distribution by Role" description="Number of users per role">
          <ERPBarChart
            data={roleDistribution}
            dataKeys={[{ key: "count", name: "Users", color: "#4f46e5" }]}
            xKey="role"
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Storage Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Storage Breakdown</h3>
          <div className="space-y-4">
            {storageItems.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.size}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{item.percentage}% of total</p>
              </div>
            ))}
          </div>
        </div>

        {/* Database Stats */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Database Statistics</h3>
          <div className="space-y-3">
            {[
              { label: "Total Records", value: "1,248,392", icon: Database },
              { label: "Tables", value: "87", icon: Database },
              { label: "Avg Query Time", value: "12ms", icon: Clock },
              { label: "Daily Transactions", value: "4,821", icon: Activity },
              { label: "Replication Lag", value: "0ms", icon: Wifi },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Icon className="w-4 h-4 text-slate-400" />
                  {label}
                </div>
                <span className="text-sm font-semibold text-slate-800">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Uptime Report */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Uptime Report</h3>
          <div className="space-y-3">
            {[
              { service: "API Server", uptime: 99.9, days: "30d" },
              { service: "Database", uptime: 100, days: "30d" },
              { service: "Email Service", uptime: 94.2, days: "30d" },
              { service: "Storage", uptime: 99.8, days: "30d" },
              { service: "Analytics", uptime: 98.7, days: "30d" },
            ].map((s) => (
              <div key={s.service} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-700">{s.service}</p>
                  <p className="text-xs text-slate-400">{s.days} average</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${s.uptime >= 99 ? "bg-emerald-500" : s.uptime >= 95 ? "bg-amber-500" : "bg-red-500"}`}
                      style={{ width: `${s.uptime}%` }}
                    />
                  </div>
                  <Badge variant={s.uptime >= 99 ? "success" : s.uptime >= 95 ? "warning" : "danger"}>
                    {s.uptime}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
