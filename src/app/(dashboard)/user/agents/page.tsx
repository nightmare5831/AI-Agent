'use client';

import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarketingAgent } from '@/components/agents/MarketingAgent';
import { OrganizationAgent } from '@/components/agents/OrganizationAgent';
import { StrategyAgent } from '@/components/agents/StrategyAgent';
import { Megaphone, FileText, Target } from 'lucide-react';
import { useAuth } from '@/core/auth/AuthProvider';


const AgentsPanel = () => {
  const [{profile}] = useAuth();
  const [credits, setCredits] = useState(0)

  useEffect(() => {
    setCredits(profile.credits_balance);
  })

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Agents</h1>
          <p className="text-slate-600">Choose an AI agent to automate your business tasks</p>
        </div>

        <Tabs defaultValue="marketing" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="marketing" className="flex items-center space-x-2 py-3">
              <Megaphone className="w-4 h-4" />
              <span>Marketing Agent</span>
            </TabsTrigger>
            <TabsTrigger value="organization" className="flex items-center space-x-2 py-3">
              <FileText className="w-4 h-4" />
              <span>Organization Agent</span>
            </TabsTrigger>
            <TabsTrigger value="strategy" className="flex items-center space-x-2 py-3">
              <Target className="w-4 h-4" />
              <span>Strategy Agent</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketing">
            <MarketingAgent credits={credits} setCredits={(e) => setCredits(e)} />
          </TabsContent>
          
          <TabsContent value="organization">
            <OrganizationAgent credits={credits} setCredits={(e) => setCredits(e)} />
          </TabsContent>
          
          <TabsContent value="strategy">
            <StrategyAgent credits={credits} setCredits={(w) => setCredits(w)} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentsPanel