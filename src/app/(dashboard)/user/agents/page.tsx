'use client';

import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MarketingAgent } from '@/components/agents/MarketingAgent';
import { OrganizationAgent } from '@/components/agents/OrganizationAgent';
import { StrategyAgent } from '@/components/agents/StrategyAgent';
import { useAuth } from '@/core/auth/AuthProvider';
import { ResultContent } from '@/components/agents/resultCotent';

const AgentsPanel = () => {
  const [{ profile }] = useAuth();
  const [credits, setCredits] = useState(0);
  const [result, setResult] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setCredits(profile?.credits_balance);
  },[profile?.credits_balance]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            AI Agent Platform
          </h1>
          <p className="text-lg text-slate-600">
            Streamline your business with intelligent AI agents
          </p>
        </div>

        {/* Credits Display */}
        <div className="mb-6 flex justify-end">
          <Badge variant="success" className="px-4 py-2 text-lg font-semibold">
            Credits: {credits}
          </Badge>
        </div>

        {/* Agent Tabs */}
        <Tabs defaultValue="marketing" className="w-full">
          <TabsList className="mb-8 grid h-14 w-full grid-cols-3">
            <TabsTrigger
              value="marketing"
              className="flex items-center gap-3 text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 720 720"
              >
                <path
                  fill="#4db6ac"
                  d="M209.25 329.98L52.37 387.636l121.32 85.822l96.752-95.805l-61.197-47.674z"
                />
                <path
                  fill="#305cd2"
                  d="M480.19 71.446c-13.123 1.784-9.565 1.013-28.4 16.091c-18.009 14.417-69.925 100.35-97.674 129.26c-24.688 25.721-34.46 12.199-60.102 33.661c-25.68 21.494-65.273 64.464-65.273 64.464l63.978 47.319l101.43-139.48c23.948-32.932 23.693-37.266 36.743-71.821c6.385-16.906 17.76-29.899 27.756-45.808c12.488-19.874 30.186-34.855 21.543-33.68z"
                />
                <path
                  fill="#ddaa21"
                  d="M478.21 69.796c-31.267-.188-62.068 137.25-115.56 242.69c-54.543 107.52-162.24 176.82-162.24 176.82c18.157 8.243 34.682 4.91 54.236 23.395c13.375 16.164 52.091 95.975 75.174 146.12c0 0 18.965-10.297 42.994-27.694c24.03-17.398 53.124-41.897 73.384-70.301c26.884-37.692 47.897-61.042 65.703-75.271s32.404-19.336 46.459-20.54c50.237-4.305 124.58 85.792 124.58 85.792S527.27 70.097 478.2 69.797z"
                />
              </svg>
              Marketing Agent
            </TabsTrigger>
            <TabsTrigger
              value="organization"
              className="flex items-center gap-3 text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 50.843 50.843"
              >
                <path
                  fill="#af19d2"
                  d="M29.585 25.422a4.16 4.16 0 0 1-4.16 4.159a4.16 4.16 0 0 1-4.159-4.16a4.16 4.16 0 0 1 4.16-4.159a4.16 4.16 0 0 1 4.159 4.16M43.888 14.76a21.3 21.3 0 0 0-3.267-4.272l-4.808 2.776a16 16 0 0 0-5.02-2.91c-1.642 1.664-2.946 3.523-3.886 5.545c5.352-.364 10.88 1.573 16.012 5.582l3.026-1.747a21.3 21.3 0 0 0-2.057-4.974m.001 21.32a21.3 21.3 0 0 0 2.066-4.966l-4.808-2.776c.359-1.938.356-3.904.01-5.803c-2.262-.59-4.524-.79-6.745-.593c2.992 4.454 4.078 10.21 3.172 16.659l3.026 1.747a21.3 21.3 0 0 0 3.28-4.269zM25.427 46.74a21.3 21.3 0 0 0 5.333-.694v-5.552a16 16 0 0 0 5.03-2.893c-.62-2.253-1.578-4.312-2.859-6.137c-2.36 4.817-6.802 8.636-12.84 11.076v3.494a21.3 21.3 0 0 0 5.336.706M6.963 36.082a21.3 21.3 0 0 0 3.267 4.272l4.809-2.777a16 16 0 0 0 5.02 2.91c1.642-1.664 2.946-3.523 3.886-5.544c-5.353.364-10.88-1.573-16.012-5.583l-3.027 1.747a21.3 21.3 0 0 0 2.057 4.975m-.001-21.32a21.3 21.3 0 0 0-2.066 4.966l4.809 2.776a16 16 0 0 0-.01 5.802c2.262.59 4.524.79 6.744.593c-2.991-4.453-4.078-10.209-3.171-16.658l-3.026-1.747a21.3 21.3 0 0 0-3.28 4.269zm18.462-10.66a21.3 21.3 0 0 0-5.333.694v5.552a16 16 0 0 0-5.03 2.893c.62 2.253 1.578 4.312 2.86 6.137c2.36-4.818 6.802-8.636 12.84-11.076V4.808a21.3 21.3 0 0 0-5.337-.706"
                />
              </svg>
              Organization Agent
            </TabsTrigger>
            <TabsTrigger
              value="strategy"
              className="flex items-center gap-3 text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-[#3ff48e] data-[state=active]:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#71ff40"
                  d="M21.085 13.343a4.35 4.35 0 0 1-1.812 3.788l.738 1.429c.22.431.25.94.058 1.39a1.68 1.68 0 0 1-1.017.959l-.758.24a1.62 1.62 0 0 1-1.784-.527l-2.032-2.398a5.1 5.1 0 0 1-2.34-1.055a5 5 0 0 1-1.438.22a4.2 4.2 0 0 1-2.398-.757a5 5 0 0 1-1.553.211a5.6 5.6 0 0 1-2.206-.431a3.94 3.94 0 0 1-2.33-3.462c-.077-.69.038-1.39.336-2.024a3.3 3.3 0 0 1-.068-2.234a4.3 4.3 0 0 1 1.86-2.148c.557-1.62 2.12-2.704 3.837-2.589a4.404 4.404 0 0 1 5.59-.355a5 5 0 0 1 1.247-.163A4.16 4.16 0 0 1 18.37 5.01a4.61 4.61 0 0 1 3.433 4.286a5.05 5.05 0 0 1-.825 3.002c.067.345.106.69.106 1.045m-4.795-1.352c.547.067.978.48.978 1.026a.96.96 0 0 1-.959.959h-.604a4.97 4.97 0 0 1-1.553 2.196c.24.086.489.134.738.201c4.92-.067 4.344-3.068 4.344-3.116a2.486 2.486 0 0 0-2.58-2.388a.96.96 0 0 1-.958-.959a.96.96 0 0 1 .958-.959c1.18.029 2.312.47 3.194 1.247a5 5 0 0 0 .076-.854c-.057-1.189-.594-2.224-2.752-2.426c-1.198-2.838-4.22-1.266-4.22-.383c-.028.22.202.69.24.719a.96.96 0 0 1 .96.959a.96.96 0 0 1-.96.959a2.25 2.25 0 0 1-1.37-.537c-.461.297-.988.48-1.535.537c-.547.048-.997-.336-1.026-.863a.93.93 0 0 1 .844-1.055c.153-.02.901-.134.901-.739c0-.632.24-1.237.652-1.716c-.882-.24-1.831.077-2.79 1.237c-1.765-.278-2.484-.038-3.011 1.832c-.911.45-1.39.767-1.602 1.726a5.65 5.65 0 0 1 3.088.24a.97.97 0 0 1 .566 1.236a.96.96 0 0 1-1.237.566a2.93 2.93 0 0 0-2.206-.057c-.307.259-.307.796-.307 1.218c0 .71.355 1.37.96 1.754a3.5 3.5 0 0 0 1.64.384a6 6 0 0 1-.375-.777a.995.995 0 0 1 1.88-.652c.383 1.093 1.361 1.841 2.512 1.966a3.59 3.59 0 0 0 3.06-2.043c.22-1.323 1.284-1.438 2.454-1.438m1.918 7.163l-.595-1.246l-.68.153l.958 1.199zm-4.46-8.256a.96.96 0 0 0-.872-.988a2.56 2.56 0 0 0-1.85.643a2.85 2.85 0 0 0-.806 2.1a.96.96 0 0 0 .959.959a.95.95 0 0 0 .959-.96c0-.258.067-.517.22-.728a.64.64 0 0 1 .413-.144c.527.029.978-.364.978-.882z"
                />
              </svg>
              Strategy Agent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketing" className="animate-fade-in grid grid-cols-1 lg:grid-cols-5 gap-8">
            <Card className="col-span-3 h-full border-0 bg-white/80 shadow-xl backdrop-blur-sm">
              <CardHeader className="rounded-t-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <CardTitle className="text-2xl">Marketing Agent</CardTitle>
                <p className="text-pink-100">
                  Generate marketing content and strategies
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <MarketingAgent isGenerating={isGenerating} setResult={setResult} setIsGenerating={setIsGenerating}/>
              </CardContent>
            </Card>
            <div className="col-span-2 border-2 border-slate-200">
              <ResultContent result={result} isGenerating={isGenerating}/>
            </div>
          </TabsContent>

          <TabsContent value="organization" className="animate-fade-in grid grid-cols-1 lg:grid-cols-5 gap-8">
            <Card className="col-span-3 border-0 bg-white/80 shadow-xl backdrop-blur-sm">
              <CardHeader className="rounded-t-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                <CardTitle className="text-2xl">Organization Agent</CardTitle>
                <p className="text-blue-100">
                  Optimize workflows and task management
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <OrganizationAgent isGenerating={isGenerating} setResult={setResult} setIsGenerating={setIsGenerating}/>
              </CardContent>
            </Card>
            <div className="col-span-2 border-2 border-slate-200">
              <ResultContent result={result} isGenerating={isGenerating}/>
            </div>
          </TabsContent>

          <TabsContent value="strategy" className="animate-fade-in grid grid-cols-1 lg:grid-cols-5 gap-8">
            <Card className="col-span-3 border-0 bg-white/80 shadow-xl backdrop-blur-sm">
              <CardHeader className="rounded-t-lg bg-gradient-to-r from-green-500 to-[#3ff48e] text-white">
                <CardTitle className="text-2xl">Strategy Agent</CardTitle>
                <p className="text-purple-100">
                  Develop business strategies and positioning
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <StrategyAgent isGenerating={isGenerating} setResult={setResult} setIsGenerating={setIsGenerating}/>
              </CardContent>
            </Card>
            <div className="col-span-2 border-2 border-slate-200">
              <ResultContent result={result} isGenerating={isGenerating}/>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentsPanel;
