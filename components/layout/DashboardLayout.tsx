"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { roleConfig } from "@/lib/constants";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: string;
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const config = roleConfig[role] ?? { nav: [], label: role };
  const navigation = config.nav;
  const roleLabel = config.label;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "#f1f5f9" }}>
      <Sidebar
        navigation={navigation}
        role={role}
        roleLabel={roleLabel}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        role={role}
        roleLabel={roleLabel}
      />
      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-6 max-w-[1600px]">{children}</div>
      </main>
    </div>
  );
}
