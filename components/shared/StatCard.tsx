import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: number;
  changeLabel?: string;
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "info";
  description?: string;
  className?: string;
}

const variants = {
  default:  { icon: "bg-slate-100 text-slate-600",   accent: "bg-slate-500" },
  primary:  { icon: "bg-indigo-50 text-indigo-600",  accent: "bg-indigo-500" },
  success:  { icon: "bg-emerald-50 text-emerald-600", accent: "bg-emerald-500" },
  warning:  { icon: "bg-amber-50 text-amber-600",    accent: "bg-amber-500" },
  danger:   { icon: "bg-red-50 text-red-600",        accent: "bg-red-500" },
  info:     { icon: "bg-blue-50 text-blue-600",      accent: "bg-blue-500" },
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  change,
  changeLabel = "vs last month",
  variant = "primary",
  description,
  className,
}: StatCardProps) {
  const v = variants[variant];
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className={cn("bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200", className)}>
      {/* Colored accent bar */}
      <div className={cn("h-1 w-full", v.accent)} />

      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
            <p className="text-[28px] font-bold text-slate-900 mt-1.5 leading-none tracking-tight">{value}</p>
            {description && (
              <p className="text-xs text-slate-400 mt-1.5">{description}</p>
            )}
          </div>
          <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ml-3", v.icon)}>
            <Icon className="w-5 h-5" />
          </div>
        </div>

        {change !== undefined && (
          <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-slate-100">
            <span className={cn("flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full",
              isPositive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
            )}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {isPositive ? "+" : ""}{change}%
            </span>
            <span className="text-xs text-slate-400">{changeLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}
