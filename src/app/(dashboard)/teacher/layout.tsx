'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import Loading from '@/components/loading';
import { useAuth } from '@/core/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { ClassesProvider } from '@/components/providers/classes-context';
import { StudentsProvider } from '@/components/providers/students-provider';
import { LessonsProvider } from '@/components/providers/lessons-provider';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [{ profile }] = useAuth();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!profile || hasShownToast.current) return;

    if (profile.role !== 'teacher') {
      hasShownToast.current = true;
      toast.error('You are not authorized to access this page');
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

  if (profile.role !== 'teacher') {
    return <Loading />;
  }
  return (
    <DashboardLayout type="teacher">
      <ClassesProvider>
        <StudentsProvider>
          <LessonsProvider>{children}</LessonsProvider>
        </StudentsProvider>
      </ClassesProvider>
    </DashboardLayout>
  );
}
