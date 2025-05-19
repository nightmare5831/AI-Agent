'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import Loading from '@/components/loading';
import { useAuth } from '@/core/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

const UNAUTHORIZED_MESSAGE = 'You are not authorized to access this page';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [{ profile }] = useAuth();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!profile || hasShownToast.current) return;

    if (profile.role !== 'student') {
      hasShownToast.current = true;
      toast.error(UNAUTHORIZED_MESSAGE);
      router.push('/');
    }
  }, [profile, router]);

  if (!profile) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (profile.role !== 'student') {
    return <Loading />;
  }

  return <DashboardLayout type="student">{children}</DashboardLayout>;
}
