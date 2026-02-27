"use client";

import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

const PALETTE = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6", "#06b6d4", "#f97316"];

const TT_STYLE = {
  fontSize: 12,
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 16px -2px rgba(0,0,0,0.08)",
  padding: "8px 12px",
  background: "#fff",
};

/* ── ChartCard wrapper ─────────────────────────────────── */
export function ChartCard({
  title, description, className, children,
}: {
  title: string; description?: string; className?: string; children: React.ReactNode;
}) {
  return (
    <div className={cn("bg-white rounded-2xl border border-slate-200 shadow-sm p-5", className)}>
      <div className="mb-4">
        <p className="text-sm font-bold text-slate-800">{title}</p>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  );
}

/* ── Area Chart ────────────────────────────────────────── */
export function ERPAreaChart({
  data, dataKeys, xKey, height = 256, formatY, formatTooltip,
}: {
  data: Record<string, unknown>[];
  dataKeys: { key: string; color?: string; name?: string }[];
  xKey: string;
  height?: number;
  formatY?: (v: number) => string;
  formatTooltip?: (v: number) => string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
        <defs>
          {dataKeys.map((dk, i) => (
            <linearGradient key={dk.key} id={`ag-${dk.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={dk.color ?? PALETTE[i % PALETTE.length]} stopOpacity={0.18} />
              <stop offset="100%" stopColor={dk.color ?? PALETTE[i % PALETTE.length]} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={formatY} />
        <Tooltip contentStyle={TT_STYLE} formatter={(v: number) => [formatTooltip ? formatTooltip(v) : v.toLocaleString()]} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
        {dataKeys.map((dk, i) => (
          <Area
            key={dk.key} type="monotone" dataKey={dk.key} name={dk.name ?? dk.key}
            stroke={dk.color ?? PALETTE[i % PALETTE.length]} strokeWidth={2}
            fill={`url(#ag-${dk.key})`} dot={false} activeDot={{ r: 4, strokeWidth: 0 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ── Bar Chart ─────────────────────────────────────────── */
export function ERPBarChart({
  data, dataKeys, xKey, height = 256, formatY, formatTooltip,
}: {
  data: Record<string, unknown>[];
  dataKeys: { key: string; color?: string; name?: string }[];
  xKey: string;
  height?: number;
  formatY?: (v: number) => string;
  formatTooltip?: (v: number) => string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -16 }} barCategoryGap="35%">
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={formatY} />
        <Tooltip contentStyle={TT_STYLE} formatter={(v: number) => [formatTooltip ? formatTooltip(v) : v.toLocaleString()]} cursor={{ fill: "#f8fafc" }} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
        {dataKeys.map((dk, i) => (
          <Bar key={dk.key} dataKey={dk.key} name={dk.name ?? dk.key}
            fill={dk.color ?? PALETTE[i % PALETTE.length]} radius={[4, 4, 0, 0]} maxBarSize={44} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ── Pie Chart ─────────────────────────────────────────── */
export function ERPPieChart({
  data, height = 256, formatValue, innerRadius = 60,
}: {
  data: { name: string; value: number; color?: string }[];
  height?: number;
  formatValue?: (v: number) => string;
  innerRadius?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%"
          innerRadius={innerRadius} outerRadius={innerRadius + 36}
          paddingAngle={3} dataKey="value" stroke="#fff" strokeWidth={2}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color ?? PALETTE[i % PALETTE.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={TT_STYLE} formatter={(v: number) => [formatValue ? formatValue(v) : v.toLocaleString()]} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

/* ── Line Chart ────────────────────────────────────────── */
export function ERPLineChart({
  data, dataKeys, xKey, height = 256, formatY,
}: {
  data: Record<string, unknown>[];
  dataKeys: { key: string; color?: string; name?: string }[];
  xKey: string;
  height?: number;
  formatY?: (v: number) => string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={formatY} />
        <Tooltip contentStyle={TT_STYLE} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
        {dataKeys.map((dk, i) => (
          <Line key={dk.key} type="monotone" dataKey={dk.key} name={dk.name ?? dk.key}
            stroke={dk.color ?? PALETTE[i % PALETTE.length]} strokeWidth={2}
            dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

/* ── Mini sparkline (CSS only) ─────────────────────────── */
export function MiniBar({ values, color = "#4f46e5", height = 32 }: { values: number[]; color?: string; height?: number }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex items-end gap-px" style={{ height }}>
      {values.map((v, i) => (
        <div key={i} className="flex-1 rounded-sm opacity-75" style={{ height: `${(v / max) * 100}%`, background: color, minHeight: 2 }} />
      ))}
    </div>
  );
}
