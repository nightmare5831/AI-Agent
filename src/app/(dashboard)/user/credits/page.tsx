'use client';
import dynamic from 'next/dynamic';
import Loading from '@/components/loading';

const CreditsPage = dynamic(() => import('@/components/user/credits'), {
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center">
      <Loading />
    </div>
  ),
});

export default function CreditPage() {
  return <CreditsPage />;
}
