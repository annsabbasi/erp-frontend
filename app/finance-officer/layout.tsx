import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata = { title: { template: "%s | Finance Officer | FinanceERP", default: "Finance Officer Dashboard" } };

export default function FinanceOfficerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="finance-officer">
      {children}
    </DashboardLayout>
  );
}
