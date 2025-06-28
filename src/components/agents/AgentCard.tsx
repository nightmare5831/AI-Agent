'use client';

import React from 'react';
import { Agent } from '@/lib/agentType';
import { MarketingStrategyAgent } from './MarketingStrategyAgent';
import { MarketingCalendarAgent } from './MarketingCalendarAgent';
import { PostIdeasAgent } from './PostIdeasAgent';
import { PostTextAgent } from './PostTextAgent';
import { ImageGenerationAgent } from './ImageGnerationAgent';
import { SEOOptimizationAgent } from './SEOOptimizationAgent';
import { GenericAgent } from './GnericAgent';
interface AgentCardProps {
  agent: Agent;
  projectId: string;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, projectId }) => {
  // Route to specific agent component based on agent ID
  switch (agent.id) {
    case 'marketing-strategy':
      return <MarketingStrategyAgent agent={agent} projectId={projectId} />;
    case 'marketing-calendar':
      return <MarketingCalendarAgent agent={agent} projectId={projectId} />;
    case 'post-ideas':
      return <PostIdeasAgent agent={agent} projectId={projectId} />;
    case 'post-text':
      return <PostTextAgent agent={agent} projectId={projectId} />;
    case 'image-generation':
      return <ImageGenerationAgent agent={agent} projectId={projectId} />;
    case 'seo-optimization':
      return <SEOOptimizationAgent agent={agent} projectId={projectId} />;
    default:
      return <GenericAgent agent={agent} projectId={projectId} />;
  }
};
