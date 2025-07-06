'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { ResultsProvider } from '@/contexts/ResultsContext';

const AgentsPage = dynamic(() => import('@/components/user/agent'), {
  loading: () => <Loader2 />,
});

export default function AgentPage() {
  return (
    <ResultsProvider>
      <AgentsPage />
    </ResultsProvider>
  );
}
