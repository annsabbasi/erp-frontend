import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "primary" | "secondary";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variants: Record<BadgeVariant, string> = {
  default:   "bg-slate-100  text-slate-700  border border-slate-200/70",
  primary:   "bg-indigo-50  text-indigo-700 border border-indigo-200/60",
  success:   "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
  warning:   "bg-amber-50   text-amber-700  border border-amber-200/60",
  danger:    "bg-red-50     text-red-700    border border-red-200/60",
  info:      "bg-blue-50    text-blue-700   border border-blue-200/60",
  secondary: "bg-slate-100  text-slate-500  border border-slate-200/50",
};

const dotColors: Record<BadgeVariant, string> = {
  default:   "bg-slate-400",
  primary:   "bg-indigo-500",
  success:   "bg-emerald-500",
  warning:   "bg-amber-500",
  danger:    "bg-red-500",
  info:      "bg-blue-500",
  secondary: "bg-slate-400",
};

export default function Badge({ variant = "default", children, className, dot = false }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold leading-none", variants[variant], className)}>
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])} />}
      {children}
    </span>
  );
}
