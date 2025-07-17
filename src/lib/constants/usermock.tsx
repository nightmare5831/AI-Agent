import {
  MessageSquare,
  BotIcon,
  Sparkles,
  Search,
  Calendar,
} from 'lucide-react';

export const user = {
  name: 'John Doe',
  email: 'john@example.com',
  plan: 'Professional',
  credits: 85,
};

export const recentActivity = [
  {
    id: 1,
    date: '2025-05-15',
    agent: 'Marketing Bot',
    activity: 'WhatsApp Campaign',
    creditsUsed: 5,
  },
  {
    id: 2,
    date: '2025-05-14',
    agent: 'Organization Bot',
    activity: 'Task Management',
    creditsUsed: 3,
  },
  {
    id: 3,
    date: '2025-05-13',
    agent: 'Strategy Bot',
    activity: 'Analytics Report',
    creditsUsed: 8,
  },
  {
    id: 4,
    date: '2025-05-12',
    agent: 'Marketing Bot',
    activity: 'Content Generation',
    creditsUsed: 4,
  },
  {
    id: 5,
    date: '2025-05-10',
    agent: 'WhatsApp Bot',
    activity: 'Customer Responses',
    creditsUsed: 10,
  },
];

export const agentCards = [
  {
    id: 1,
    name: 'Marketing Agent',
    description:
      'Generate marketing content, visuals, and schedule posts using AI and DALL·E.',
    icon: <MessageSquare className="h-7 w-7 text-[#2B6CB0]" />,
    creditsPerUse: 5,
    status: 'active',
    popular: true,
  },
  {
    id: 2,
    name: 'Organization Agent',
    description:
      'Create checklists, plans, and downloadable docs with GPT-powered forms.',
    icon: <Calendar className="h-7 w-7 text-[#2B6CB0]" />,
    creditsPerUse: 3,
    status: 'active',
    popular: false,
  },
  {
    id: 3,
    name: 'Strategy Agent',
    description:
      'Run multi-step workflows for branding, growth, and strategic planning.',
    icon: <Sparkles className="h-7 w-7 text-[#2B6CB0]" />,
    creditsPerUse: 10,
    status: 'active',
    popular: false,
  },
  {
    id: 4,
    name: 'Auto Support Bot',
    description:
      'Handle customer queries with GPT and route to human agents when needed.',
    icon: <Search className="h-7 w-7 text-[#2B6CB0]" />,
    creditsPerUse: 7,
    status: 'coming-soon',
    popular: false,
  },
  {
    id: 5,
    name: 'Scheduling Bot',
    description:
      'Suggest times, sync calendars, and confirm bookings via WhatsApp.',
    icon: <BotIcon className="h-7 w-7 text-[#2B6CB0]" />,
    creditsPerUse: 'Varies',
    status: 'coming-soon',
    popular: true,
  },
];

// Mock data for the chart
export const usageData = [
  { day: '01', date: 'May 01', credits: 5 },
  { day: '02', date: 'May 02', credits: 8 },
  { day: '03', date: 'May 03', credits: 3 },
  { day: '04', date: 'May 04', credits: 0 },
  { day: '05', date: 'May 05', credits: 12 },
  { day: '06', date: 'May 06', credits: 7 },
  { day: '07', date: 'May 07', credits: 8 },
  { day: '08', date: 'May 08', credits: 2 },
  { day: '09', date: 'May 09', credits: 0 },
  { day: '10', date: 'May 10', credits: 9 },
  { day: '11', date: 'May 11', credits: 11 },
  { day: '12', date: 'May 12', credits: 3 },
  { day: '13', date: 'May 13', credits: 6 },
  { day: '14', date: 'May 14', credits: 10 },
  { day: '15', date: 'May 15', credits: 5 },
];

// Mock data for the table
export const activityLogs = [
  {
    id: 1,
    date: '2025-05-15',
    agent: 'Marketing Bot',
    activity: 'WhatsApp Campaign',
    creditsUsed: 5,
    status: 'completed',
  },
  {
    id: 2,
    date: '2025-05-14',
    agent: 'Organization Bot',
    activity: 'Task Management',
    creditsUsed: 3,
    status: 'completed',
  },
  {
    id: 3,
    date: '2025-05-13',
    agent: 'Strategy Bot',
    activity: 'Analytics Report',
    creditsUsed: 8,
    status: 'completed',
  },
  {
    id: 4,
    date: '2025-05-12',
    agent: 'Marketing Bot',
    activity: 'Content Generation',
    creditsUsed: 4,
    status: 'completed',
  },
  {
    id: 5,
    date: '2025-05-10',
    agent: 'WhatsApp Bot',
    activity: 'Customer Responses',
    creditsUsed: 10,
    status: 'completed',
  },
  {
    id: 6,
    date: '2025-05-09',
    agent: 'Strategy Bot',
    activity: 'Competitive Analysis',
    creditsUsed: 7,
    status: 'completed',
  },
  {
    id: 7,
    date: '2025-05-08',
    agent: 'Organization Bot',
    activity: 'Meeting Notes',
    creditsUsed: 2,
    status: 'completed',
  },
  {
    id: 8,
    date: '2025-05-07',
    agent: 'WhatsApp Bot',
    activity: 'Auto Responses',
    creditsUsed: 8,
    status: 'completed',
  },
  {
    id: 9,
    date: '2025-05-06',
    agent: 'Marketing Bot',
    activity: 'Social Media Posts',
    creditsUsed: 7,
    status: 'completed',
  },
  {
    id: 10,
    date: '2025-05-05',
    agent: 'Strategy Bot',
    activity: 'Market Research',
    creditsUsed: 12,
    status: 'completed',
  },
];

export const freePlan = {
  id: 'free',
  name: 'Free',
  price: 'R$00.00',
  interval: 'month',
  credits: 10,
  features: [
    '5 AI Credits',
    'Basic AI Agents',
    'Email Support',
    '1-day History',
  ],
  recommended: false,
} 

export const plans = [
  {
    id: 'essential',
    name: 'Monthly Plan',
    price: 'R$47.90',
    interval: 'month',
    credits: 100,
    features: [
      '100 AI Credits',
      'All AI Agents',
      'Priority Support',
      '30-day History',
    ],
    recommended: false,
  },
  {
    id: 'professional',
    name: 'Annual Plan',
    price: 'R$377.00',
    interval: 'annual',
    credits: 100,
    features: [
      '100 AI Credits',
      'All AI Agents',
      'Priority Support',
      '30-day History',
    ],
    recommended: true,
  },
];

export const creditPacks = [
  {
    id: 'PACK_100',
    name: 'Extra Pack',
    credits: 100,
    price: 'R$39.90',
    recommended: false,
  },
];
