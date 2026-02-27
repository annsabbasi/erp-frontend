"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { type NavItem } from "@/lib/constants";
import { ChevronDown, X, TrendingUp, LogOut } from "lucide-react";

interface SidebarProps {
  navigation: NavItem[];
  role: string;
  roleLabel: string;
  isOpen: boolean;
  onClose: () => void;
}

const roleAvatarColors: Record<string, string> = {
  admin: "bg-violet-600",
  hr: "bg-emerald-600",
  accountant: "bg-blue-600",
  "finance-officer": "bg-indigo-600",
  "revenue-manager": "bg-amber-600",
};

const roleInitials: Record<string, string> = {
  admin: "AD",
  hr: "HR",
  accountant: "AC",
  "finance-officer": "FO",
  "revenue-manager": "RM",
};

const roleNames: Record<string, string> = {
  admin: "System Admin",
  hr: "HR Manager",
  accountant: "J. Smith",
  "finance-officer": "Finance Officer",
  "revenue-manager": "Rev. Manager",
};

function NavItemComponent({ item, level = 0 }: { item: NavItem; level?: number }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(() =>
    item.children ? item.children.some((c) => pathname.startsWith(c.href)) || pathname === item.href : false
  );

  const isActive = pathname === item.href;
  const isChildActive = item.children?.some((c) => pathname.startsWith(c.href));
  const Icon = item.icon;

  if (item.children) {
    return (
      <div className="space-y-0.5">
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
            isChildActive
              ? "bg-indigo-600 text-white"
              : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
          )}
        >
          <Icon className="w-4 h-4 shrink-0" />
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronDown
            className={cn("w-3.5 h-3.5 transition-transform duration-200", expanded ? "rotate-180" : "")}
          />
        </button>

        {expanded && (
          <div className="ml-4 pl-3 border-l border-slate-700/60 space-y-0.5 mt-0.5">
            {item.children.map((child) => (
              <NavItemComponent key={child.href} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
        isActive
          ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/30"
          : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span>{item.label}</span>
    </Link>
  );
}

export default function Sidebar({ navigation, role, roleLabel, isOpen, onClose }: SidebarProps) {
  const avatarColor = roleAvatarColors[role] ?? "bg-indigo-600";
  const initials = roleInitials[role] ?? "??";
  const name = roleNames[role] ?? roleLabel;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 z-50 flex flex-col transition-sidebar",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        style={{ background: "#0c1322" }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-[64px] shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <Link href={`/${role}`} className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-indigo-900/50">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm leading-none tracking-tight">FinanceERP</p>
              <p className="text-slate-500 text-[11px] mt-0.5 truncate">{roleLabel}</p>
            </div>
          </Link>
          <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-white transition-colors p-1 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav label */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Navigation</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto sidebar-scroll px-3 pb-4 space-y-0.5">
          {navigation.map((item) => (
            <NavItemComponent key={item.href} item={item} />
          ))}
        </nav>

        {/* User section */}
        <div className="shrink-0 p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0", avatarColor)}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate leading-none">{name}</p>
              <p className="text-slate-500 text-xs truncate mt-0.5">{roleLabel}</p>
            </div>
          </div>
          <Link
            href="/login"
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>
      </aside>
    </>
  );
}
