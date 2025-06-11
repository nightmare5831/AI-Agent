'use client';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const CreditsPage = dynamic(() =>
  import('@/components/user/credits'), {
  ssr: false,
  loading: () => <Loader2/>
});

export default function CreditPage() {
  return (
    <CreditsPage />
  );
}
