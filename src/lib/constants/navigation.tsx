import { MessageCircle, Sparkles, CreditCard, ShieldCheck } from 'lucide-react';

import {
  LayoutDashboardIcon,
  UsersIcon,
  CreditCardIcon,
  DollarSignIcon,
  LogsIcon,
  RocketIcon,
} from 'lucide-react';

export const getAdminItems = (t: any) => [
  {
    title: t.navigation.dashboard,
    shortTitle: t.navigation.dashboard,
    icon: LayoutDashboardIcon,
    href: '/admin',
  },
  {
    title: t.navigation.users,
    shortTitle: t.navigation.users,
    icon: UsersIcon,
    href: '/admin/users',
  },
  {
    title: t.navigation.credits,
    shortTitle: t.navigation.credits,
    icon: CreditCardIcon,
    href: '/admin/creditlogs',
  },
  {
    title: 'Subscriptions',
    shortTitle: 'Subscriptions',
    icon: DollarSignIcon,
    href: '/admin/subscriptions',
  },
  {
    title: 'Reports',
    shortTitle: 'Reports',
    icon: LogsIcon,
    href: '/admin/reports',
  },
];

export const adminItems = [
  {
    title: 'Dashboard',
    shortTitle: 'Dashboard',
    icon: LayoutDashboardIcon,
    href: '/admin',
  },
  {
    title: 'Users',
    shortTitle: 'Users',
    icon: UsersIcon,
    href: '/admin/users',
  },
  {
    title: 'Creditlogs',
    shortTitle: 'CreditLogs',
    icon: CreditCardIcon,
    href: '/admin/creditlogs',
  },
  {
    title: 'Subscriptions',
    shortTitle: 'Subscriptions',
    icon: DollarSignIcon,
    href: '/admin/subscriptions',
  },
  {
    title: 'Reports',
    shortTitle: 'reports',
    icon: LogsIcon,
    href: '/admin/reports',
  },
];

export const getUserItems = (t: any) => [
  {
    title: t.navigation.dashboard,
    shortTitle: t.navigation.dashboard,
    icon: LayoutDashboardIcon,
    href: '/user',
  },
  {
    title: t.navigation.agents,
    shortTitle: t.navigation.agents,
    icon: RocketIcon,
    href: '/user/agents',
  },
  {
    title: t.navigation.credits,
    shortTitle: t.navigation.credits,
    icon: CreditCardIcon,
    href: '/user/credits',
  },
  {
    title: t.navigation.usageHistory,
    shortTitle: t.navigation.usageHistory,
    icon: LogsIcon,
    href: '/user/usage',
  },
];

export const userItems = [
  {
    title: 'Dashboard',
    shortTitle: 'Dashboard',
    icon: LayoutDashboardIcon,
    href: '/user',
  },
  {
    title: 'Agents',
    shortTitle: 'Agents',
    icon: RocketIcon,
    href: '/user/agents',
  },
  {
    title: 'Credits',
    shortTitle: 'Credits',
    icon: CreditCardIcon,
    href: '/user/credits',
  },
  {
    title: 'UsageHistory',
    shortTitle: 'UsageHistory',
    icon: LogsIcon,
    href: '/user/usage',
  },
];

export const features = [
  {
    icon: <Sparkles className="h-5 w-5 text-[#2B6CB0]" />,
    title: 'AI Agent',
    description: 'Execute predefined business tasks using GPT and DALL·E',
    items: [
      {
        title: 'Marketing',
        description:
          'Create compelling marketing content and automate your WhatsApp marketing campaigns with AI-powered suggestions.',
      },
      {
        title: 'Organization',
        description:
          'Streamline your business processes with intelligent task management and automated workflow optimization.',
      },
      {
        title: 'Strategy',
        description:
          'Get data-driven insights and strategic recommendations to grow your business and improve customer engagement.',
      },
    ],
  },
  {
    icon: <MessageCircle className="h-5 w-5 text-[#2B6CB0]" />,
    title: 'WhatsApp Integration',
    description: 'Trigger and manage tasks via a WhatsApp-based interface',
    items: [
      {
        title: 'Agent menu system',
        description: 'Choose AI agents directly from WhatsApp chat',
      },
      {
        title: 'Message automation',
        description: 'Auto-reply and execute tasks based on user input',
      },
      {
        title: 'Real-time content delivery',
        description: 'Receive texts, PDFs, and images instantly in chat',
      },
    ],
  },
  {
    icon: <CreditCard className="h-5 w-5 text-[#2B6CB0]" />,
    title: 'Flexible Credit System',
    description: 'Track and control resource usage per task',
    items: [
      {
        title: 'Subscription & credits',
        description: 'Pay monthly or top-up as needed',
      },
      {
        title: 'Credit-based billing',
        description: 'Each action consumes credits based on type',
      },
      {
        title: 'Dashboard insights',
        description: 'Monitor your usage, remaining credits, and history',
      },
    ],
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-[#2B6CB0]" />,
    title: 'Admin & Analytics',
    description: 'Full control and visibility over user activity',
    items: [
      {
        title: 'User management',
        description: 'View, filter, and manage customer accounts',
      },
      {
        title: 'Usage tracking management',
        description: 'Analyze task trends and credit consumption',
      },
      {
        title: 'Real-time reporting',
        description: 'Export insights and monitor platform activity',
      },
    ],
  },
];
