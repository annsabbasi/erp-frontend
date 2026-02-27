"use client";

import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6", "#06b6d4", "#f97316"];

// ── ChartCard ────────────────────────────────────────────────────
interface ChartCardProps {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function ChartCard({ title, description, className, children, action }: ChartCardProps) {
  return (
    <div className={cn("bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden", className)}>
      <div className="flex items-start justify-between px-5 pt-5 pb-2">
        <div>
          <h3 className="text-sm font-bold text-slate-800">{title}</h3>
          {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
        </div>
        {action && <div className="shrink-0 ml-4">{action}</div>}
      </div>
      <div className="px-5 pb-5">{children}</div>
    </div>
  );
}

const tooltipStyle = {
  fontSize: 12,
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
  padding: "8px 12px",
};

// ── Area Chart ───────────────────────────────────────────────────
interface AreaChartProps {
  data: Record<string, unknown>[];
  dataKeys: { key: string; color?: string; name?: string }[];
  xKey: string;
  height?: number;
  formatY?: (v: number) => string;
  formatTooltip?: (v: number) => string;
}

export function ERPAreaChart({ data, dataKeys, xKey, height = 260, formatY, formatTooltip }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -10 }}>
        <defs>
          {dataKeys.map((dk, i) => (
            <linearGradient key={dk.key} id={`ag-${dk.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={dk.color ?? COLORS[i % COLORS.length]} stopOpacity={0.18} />
              <stop offset="100%" stopColor={dk.color ?? COLORS[i % COLORS.length]} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} dy={4} />
        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={formatY} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [formatTooltip ? formatTooltip(v) : v.toLocaleString()]} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
        {dataKeys.map((dk, i) => (
          <Area
            key={dk.key}
            type="monotone"
            dataKey={dk.key}
            name={dk.name ?? dk.key}
            stroke={dk.color ?? COLORS[i % COLORS.length]}
            strokeWidth={2.5}
            fill={`url(#ag-${dk.key})`}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ── Bar Chart ────────────────────────────────────────────────────
interface BarChartProps {
  data: Record<string, unknown>[];
  dataKeys: { key: string; color?: string; name?: string }[];
  xKey: string;
  height?: number;
  formatY?: (v: number) => string;
  formatTooltip?: (v: number) => string;
}

export function ERPBarChart({ data, dataKeys, xKey, height = 260, formatY, formatTooltip }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -10 }} barGap={4} barCategoryGap="30%">
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} dy={4} />
        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={formatY} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [formatTooltip ? formatTooltip(v) : v.toLocaleString()]} cursor={{ fill: "#f8fafc", radius: 6 }} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
        {dataKeys.map((dk, i) => (
          <Bar key={dk.key} dataKey={dk.key} name={dk.name ?? dk.key} fill={dk.color ?? COLORS[i % COLORS.length]} radius={[5, 5, 0, 0]} maxBarSize={40} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Pie Chart ────────────────────────────────────────────────────
interface PieChartProps {
  data: { name: string; value: number; color?: string }[];
  height?: number;
  formatValue?: (v: number) => string;
  innerRadius?: number;
}

export function ERPPieChart({ data, height = 260, formatValue, innerRadius = 65 }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={innerRadius + 38}
          paddingAngle={3}
          dataKey="value"
          strokeWidth={2}
          stroke="#ffffff"
        >
          {data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={entry.color ?? COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [formatValue ? formatValue(v) : v.toLocaleString()]} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

// ── Line Chart ───────────────────────────────────────────────────
interface LineChartProps {
  data: Record<string, unknown>[];
  dataKeys: { key: string; color?: string; name?: string }[];
  xKey: string;
  height?: number;
  formatY?: (v: number) => string;
}

export function ERPLineChart({ data, dataKeys, xKey, height = 260, formatY }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} dy={4} />
        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={formatY} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
        {dataKeys.map((dk, i) => (
          <Line
            key={dk.key}
            type="monotone"
            dataKey={dk.key}
            name={dk.name ?? dk.key}
            stroke={dk.color ?? COLORS[i % COLORS.length]}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

// ── Mini sparkline (CSS only) ─────────────────────────────────────
export function MiniBar({ values, color = "#4f46e5", height = 32 }: { values: number[]; color?: string; height?: number }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex items-end gap-0.5" style={{ height }}>
      {values.map((v, i) => (
        <div key={i} className="flex-1 rounded-sm" style={{ height: `${(v / max) * 100}%`, backgroundColor: color, minHeight: 2, opacity: 0.75 }} />
      ))}
    </div>
  );
}
