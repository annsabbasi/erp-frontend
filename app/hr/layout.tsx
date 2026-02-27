import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata = { title: { template: "%s | HR | FinanceERP", default: "HR Dashboard" } };

export default function HRLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="hr">
      {children}
    </DashboardLayout>
  );
}
