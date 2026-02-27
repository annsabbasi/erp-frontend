import { cn } from "@/lib/utils";

type Variant = "default" | "primary" | "success" | "warning" | "danger" | "info" | "secondary";

const styles: Record<Variant, string> = {
  default:   "bg-slate-100  text-slate-600",
  primary:   "bg-indigo-100 text-indigo-700",
  success:   "bg-emerald-100 text-emerald-700",
  warning:   "bg-amber-100  text-amber-700",
  danger:    "bg-red-100    text-red-700",
  info:      "bg-blue-100   text-blue-700",
  secondary: "bg-slate-200  text-slate-500",
};

const dots: Record<Variant, string> = {
  default:   "bg-slate-400",
  primary:   "bg-indigo-500",
  success:   "bg-emerald-500",
  warning:   "bg-amber-500",
  danger:    "bg-red-500",
  info:      "bg-blue-500",
  secondary: "bg-slate-400",
};

export default function Badge({
  variant = "default",
  children,
  className,
  dot = false,
}: {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap",
      styles[variant],
      className
    )}>
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dots[variant])} />}
      {children}
    </span>
  );
}
