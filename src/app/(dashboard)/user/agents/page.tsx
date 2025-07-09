'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/loading';
import { ResultsProvider } from '@/contexts/ResultsContext';

const AgentsPage = dynamic(() => import('@/components/user/agent'), {
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center">
      <Loading />
    </div>
  ),
});

export default function AgentPage() {
  return (
    <ResultsProvider>
      <AgentsPage />
    </ResultsProvider>
  );
}
