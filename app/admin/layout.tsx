import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata = { title: { template: "%s | Admin | FinanceERP", default: "Admin" } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="admin">
      {children}
    </DashboardLayout>
  );
}
