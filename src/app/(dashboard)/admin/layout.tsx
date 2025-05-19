import { getCurrentProfile } from "@/core/auth/server";
import { redirect } from "next/navigation";
import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentProfile();
  if (!user) {
    redirect("/auth/signin");
  }
  
  if (user.role !== "admin") {
    redirect("/user"); // Redirect non-admin users to regular user page
  }

  return (
    <DashboardLayout type="admin">
      {children}
    </DashboardLayout>
  );
}