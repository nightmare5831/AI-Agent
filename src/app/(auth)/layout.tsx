'use client';

import Loading from '@/components/loading';
import { useAuth } from '@/core/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [{ user, profile }] = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
      if (profile?.role === 'admin') {
        router.push('/admin');
      } else if (profile?.role === 'user') {
        router.push('/user');
      } else {
        router.push('/');
      }
    } else {
      setIsLoading(false);
    }
  }, [user, profile, router]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  return <div className="min-h-screen bg-background">{children}</div>;
}
