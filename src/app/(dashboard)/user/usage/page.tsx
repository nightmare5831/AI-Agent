'use client';
import dynamic from 'next/dynamic';
import Loading from '@/components/loading';

const Usage = dynamic(() => import('@/components/user/usage'), {
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center">
      <Loading />
    </div>
  ),
});

export default function UsagePage() {
  return <Usage />;
}
