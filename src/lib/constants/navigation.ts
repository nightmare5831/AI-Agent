import {
  LayoutDashboardIcon,
  UsersIcon,
  CreditCardIcon,
  DollarSignIcon,
  LogsIcon,
  RocketIcon,
  PenTool,
} from 'lucide-react';

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
    icon:   DollarSignIcon,
    href: '/admin/subscriptions',
  },
  {
    title: 'Reports',
    shortTitle: 'reports',
    icon:   LogsIcon,
    href: '/admin/reports',
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
