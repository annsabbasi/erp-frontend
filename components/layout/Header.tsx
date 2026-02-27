"use client";

import { useState } from "react";
import { Menu, Bell, Search, ChevronDown, Settings, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuClick: () => void;
  role: string;
  roleLabel: string;
}

const notifications = [
  { id: 1, title: "New employee added", desc: "Sarah Johnson was added to Engineering", time: "2 min ago", read: false, dot: "bg-indigo-500" },
  { id: 2, title: "Payroll processing complete", desc: "February payroll has been processed", time: "1 hr ago", read: false, dot: "bg-emerald-500" },
  { id: 3, title: "Budget approval pending", desc: "3 budgets awaiting your approval", time: "3 hrs ago", read: true, dot: "bg-amber-500" },
  { id: 4, title: "Backup completed", desc: "System backup ran successfully", time: "Yesterday", read: true, dot: "bg-slate-400" },
];

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

export default function Header({ onMenuClick, role, roleLabel }: HeaderProps) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((seg, i) => ({
    label: seg.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  const avatarColor = roleAvatarColors[role] ?? "bg-indigo-600";
  const initials = roleInitials[role] ?? "??";
  const name = roleNames[role] ?? roleLabel;

  const closeAll = () => { setShowNotifications(false); setShowUserMenu(false); };

  return (
    <>
      {/* Backdrop for dropdowns */}
      {(showNotifications || showUserMenu) && (
        <div className="fixed inset-0 z-20" onClick={closeAll} />
      )}

      <header className="fixed top-0 left-0 right-0 lg:left-64 h-16 bg-white z-30 flex items-center px-4 gap-3" style={{ borderBottom: "1px solid #f1f5f9", boxShadow: "0 1px 0 0 #f1f5f9" }}>

        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-sm flex-1 min-w-0 overflow-hidden">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1 min-w-0 shrink-0">
              {i > 0 && <span className="text-slate-300 mx-0.5">/</span>}
              {crumb.isLast ? (
                <span className="text-slate-800 font-semibold truncate">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="text-slate-400 hover:text-slate-600 transition-colors whitespace-nowrap">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-1.5 shrink-0">

          {/* Search */}
          <button className="hidden md:flex items-center gap-2.5 px-3.5 py-2 text-sm text-slate-400 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-white transition-all w-44">
            <Search className="w-3.5 h-3.5 shrink-0" />
            <span className="flex-1 text-left text-xs">Quick search...</span>
            <kbd className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded-md font-mono">⌘K</kbd>
          </button>

          {/* Notifications */}
          <div className="relative z-30">
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
              className="relative p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Bell className="w-4.5 h-4.5" style={{ width: "1.1rem", height: "1.1rem" }} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-[340px] bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden animate-fade-in">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
                  <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-full">{unreadCount} new</span>
                </div>
                <div className="max-h-[320px] overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={cn("flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer", !n.read && "bg-indigo-50/40")}
                    >
                      <span className={cn("w-2 h-2 rounded-full shrink-0 mt-1.5", n.dot)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 leading-tight">{n.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.desc}</p>
                        <p className="text-[11px] text-slate-400 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 border-t border-slate-100">
                  <button className="text-xs text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                    View all notifications →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative z-30">
            <button
              onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
              className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0", avatarColor)}>
                {initials}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-slate-800 leading-none">{name}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{roleLabel}</p>
              </div>
              <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 hidden sm:block transition-transform duration-200", showUserMenu ? "rotate-180" : "")} />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-56 bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden animate-fade-in">
                <div className="px-4 py-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0", avatarColor)}>
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">{name}</p>
                      <p className="text-xs text-slate-400 truncate">{role}@financeerp.com</p>
                    </div>
                  </div>
                </div>
                <div className="py-1.5">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Settings</span>
                  </button>
                </div>
                <div className="py-1.5 border-t border-slate-100">
                  <Link
                    href="/login"
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
