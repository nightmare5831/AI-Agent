'use client';

import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader,CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MarketingAgent } from '@/components/agents/MarketingAgent';
import { OrganizationAgent } from '@/components/agents/OrganizationAgent';
import { StrategyAgent } from '@/components/agents/StrategyAgent';
import { useAuth } from '@/core/auth/AuthProvider';


const AgentsPanel = () => {
  const [{profile}] = useAuth();
  const [credits, setCredits] = useState(0)

  useEffect(() => {
    setCredits(profile.credits_balance);
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            AI Agent Platform
          </h1>
          <p className="text-slate-600 text-lg">
            Streamline your business with intelligent AI agents
          </p>
        </div>

        {/* Credits Display */}
        <div className="flex justify-end mb-6">
          <Badge variant="success" className="px-4 py-2 text-lg font-semibold">
            Credits: {credits}
          </Badge>
        </div>

        {/* Agent Tabs */}
        <Tabs defaultValue="marketing" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-14">
            <TabsTrigger 
              value="marketing" 
              className="text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
              >
              🎯 Marketing Agent
            </TabsTrigger>
            <TabsTrigger 
              value="organization"
              className="text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
              >
              🧩 Organization Agent
            </TabsTrigger>
            <TabsTrigger 
              value="strategy"
              className="text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white"
            >
              🧠 Strategy Agent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketing" className="animate-fade-in">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Marketing Agent</CardTitle>
                <p className="text-pink-100">Generate marketing content and strategies</p>
              </CardHeader>
              <CardContent className="p-6">
                <MarketingAgent />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="organization" className="animate-fade-in">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Organization Agent</CardTitle>
                <p className="text-blue-100">Optimize workflows and task management</p>
              </CardHeader>
              <CardContent className="p-6">
                <OrganizationAgent />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategy" className="animate-fade-in">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Strategy Agent</CardTitle>
                <p className="text-purple-100">Develop business strategies and positioning</p>
              </CardHeader>
              <CardContent className="p-6">
                <StrategyAgent />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentsPanel