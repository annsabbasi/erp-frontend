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

const v = {
  default:  { bar: "bg-slate-400",    icon: "bg-slate-100 text-slate-600"    },
  primary:  { bar: "bg-indigo-500",   icon: "bg-indigo-50 text-indigo-600"   },
  success:  { bar: "bg-emerald-500",  icon: "bg-emerald-50 text-emerald-600" },
  warning:  { bar: "bg-amber-500",    icon: "bg-amber-50 text-amber-600"     },
  danger:   { bar: "bg-red-500",      icon: "bg-red-50 text-red-600"         },
  info:     { bar: "bg-blue-500",     icon: "bg-blue-50 text-blue-600"       },
};

export default function StatCard({
  title, value, icon: Icon, change, changeLabel = "vs last month",
  variant = "primary", description, className,
}: StatCardProps) {
  const style    = v[variant];
  const positive = change !== undefined && change >= 0;

  return (
    <div className={cn("bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200", className)}>
      {/* coloured top bar */}
      <div className={cn("h-1", style.bar)} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1.5 leading-none">{value}</p>
            {description && <p className="text-xs text-slate-400 mt-1.5">{description}</p>}
          </div>
          <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center shrink-0", style.icon)}>
            <Icon className="w-5 h-5" />
          </div>
        </div>

        {change !== undefined && (
          <div className="flex items-center gap-1.5 mt-4 pt-3.5 border-t border-slate-100">
            <span className={cn(
              "inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full",
              positive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
            )}>
              {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {positive ? "+" : ""}{change}%
            </span>
            <span className="text-xs text-slate-400">{changeLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}
