import { Header } from "@/components/layout/home/header";
import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout type="user">
      {children}
    </DashboardLayout>
  );
}