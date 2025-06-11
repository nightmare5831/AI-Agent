'use client';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const Usage = dynamic(() =>
  import('@/components/user/usage'), {
  ssr: false,
  loading: () => <Loader2/>
});

export default function UsagePage() {
  return (
    <Usage />
  );
}
