'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const AgentsPage = dynamic(() => import('@/components/user/agent'), {
  loading: () => <Loader2 />,
});

export default function AgentPage() {
  return <AgentsPage />;
}
