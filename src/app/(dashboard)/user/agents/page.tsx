'use client';

import { Search } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { agentCards } from '@/lib/constants/usermock';
import { useState } from 'react';

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    plan: 'Professional',
  };

  const filteredAgents = agentCards.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative overflow-hidden">
      <div className="space-y-8 pl-5 pr-2">
        {/* Header section */}
        <div className="rounded-lg border border-[#8b5cf6]/20 bg-background/70 p-8 shadow-xl backdrop-blur-md">
          <h1 className="bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            AI Agents
          </h1>
          <p className="text-muted-foreground">
            Browse and use AI agents to automate your business tasks
          </p>
        </div>

        {/* Search and Create */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search agents..."
              className="h-10 w-full rounded-md border border-[#8b5cf6]/20 bg-background px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAgents.map((agent) => (
            <Card
              key={agent.id}
              className="flex flex-col border border-[#8b5cf6]/20 bg-background/70 shadow-md backdrop-blur-md"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="rounded-lg bg-[#2B6CB0]/10 p-2">
                    {agent.icon}
                  </div>
                  <div className="flex gap-2">
                    {agent.popular && (
                      <Badge className="bg-[#2B6CB0] hover:bg-[#8b5cf6]/90">
                        Popular
                      </Badge>
                    )}
                    {agent.status === 'coming-soon' ? (
                      <Badge variant="success">Coming Soon</Badge>
                    ) : (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        Active
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="mt-4">{agent.name}</CardTitle>
                <CardDescription>{agent.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-sm">
                  <span className="font-medium">Credits per use:</span>{' '}
                  <span className="text-muted-foreground">
                    {agent.creditsPerUse}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="border-t border-[#8b5cf6]/10 p-4">
                {agent.status === 'coming-soon' ? (
                  <Button
                    disabled
                    className="w-full bg-muted text-muted-foreground hover:bg-muted"
                  >
                    Coming Soon
                  </Button>
                ) : (
                  <Link href={`/agents/${agent.id}`} className="w-full">
                    <Button className="w-full bg-[#2B6CB0] hover:bg-[#2B6CB0]/90">
                      Use Agent
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
