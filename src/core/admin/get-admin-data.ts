'use server';

import { prisma } from '@/lib/db';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  plan: string;
  credits: number;
  status: 'active' | 'warning' | 'inactive';
  lastActive: string;
  signupDate: string;
  billingStatus: 'paid' | 'overdue' | 'canceled' | 'trial';
}

export interface AdminStats {
  totalUsers: number;
  activeSubscriptions: number;
  lowCreditAccounts: number;
  expiredSubscriptions: number;
  creditsUsed30d: number;
  newUsers30d: number;
}

export interface CreditUsageData {
  name: string;
  usage: number;
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  try {
    const users = await prisma.profile.findMany({
      include: {
        subscriptions: {
          orderBy: { start_date: 'desc' },
          take: 1,
        },
        tasks_log: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return users.map(user => {
      const latestSubscription = user.subscriptions[0];
      const lastTask = user.tasks_log[0];
      const creditPercentage = (user.credits_balance / 100) * 100; // Assuming 100 is base for percentage calc
      
      // Determine status based on credits and subscription
      let status: 'active' | 'warning' | 'inactive' = 'active';
      if (user.credits_balance === 0) {
        status = 'inactive';
      } else if (user.credits_balance < 20) {
        status = 'warning';
      }

      // Determine billing status
      let billingStatus: 'paid' | 'overdue' | 'canceled' | 'trial' = 'trial';
      if (latestSubscription) {
        if (latestSubscription.status === 'active' && new Date(latestSubscription.end_date) > new Date()) {
          billingStatus = 'paid';
        } else if (new Date(latestSubscription.end_date) < new Date()) {
          billingStatus = 'overdue';
        } else if (latestSubscription.status === 'canceled') {
          billingStatus = 'canceled';
        }
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.subscription_plan || 'free',
        credits: user.credits_balance,
        status,
        lastActive: lastTask ? new Date(lastTask.timestamp).toLocaleDateString() : 'Never',
        signupDate: new Date(user.created_at).toLocaleDateString(),
        billingStatus,
      };
    });
  } catch (error) {
    console.error('Error fetching admin users:', error);
    return [];
  }
}

export async function getAdminStats(): Promise<AdminStats> {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Get total users
    const totalUsers = await prisma.profile.count();

    // Get active subscriptions
    const activeSubscriptions = await prisma.subscriptions.count({
      where: {
        status: 'active',
        end_date: { gte: new Date() },
      },
    });

    // Get low credit accounts (less than 20% of typical allocation, assuming 100 credits is typical)
    const lowCreditAccounts = await prisma.profile.count({
      where: {
        AND: [
          { credits_balance: { lt: 20 } },
          { credits_balance: { gt: 0 } },
        ],
      },
    });

    // Get expired subscriptions
    const expiredSubscriptions = await prisma.subscriptions.count({
      where: {
        end_date: { lt: new Date() },
        status: { not: 'canceled' },
      },
    });

    // Get credits used in last 30 days
    const creditsUsed = await prisma.tasks_log.aggregate({
      _sum: {
        credits_spent: true,
      },
      where: {
        timestamp: { gte: thirtyDaysAgo },
      },
    });

    // Get new users in last 30 days
    const newUsers30d = await prisma.profile.count({
      where: {
        created_at: { gte: thirtyDaysAgo },
      },
    });

    return {
      totalUsers,
      activeSubscriptions,
      lowCreditAccounts,
      expiredSubscriptions,
      creditsUsed30d: creditsUsed._sum.credits_spent || 0,
      newUsers30d,
    };
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return {
      totalUsers: 0,
      activeSubscriptions: 0,
      lowCreditAccounts: 0,
      expiredSubscriptions: 0,
      creditsUsed30d: 0,
      newUsers30d: 0,
    };
  }
}

export async function getCreditUsageOverTime(): Promise<CreditUsageData[]> {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // Get credit usage grouped by month
    const creditUsage = await prisma.tasks_log.groupBy({
      by: ['timestamp'],
      _sum: {
        credits_spent: true,
      },
      where: {
        timestamp: { gte: sixMonthsAgo },
      },
      orderBy: {
        timestamp: 'asc',
      },
    });

    // Group by month
    const monthlyUsage = new Map<string, number>();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    creditUsage.forEach(usage => {
      const date = new Date(usage.timestamp);
      const monthKey = `${monthNames[date.getMonth()]}`;
      
      if (monthlyUsage.has(monthKey)) {
        monthlyUsage.set(monthKey, (monthlyUsage.get(monthKey) || 0) + (usage._sum.credits_spent || 0));
      } else {
        monthlyUsage.set(monthKey, usage._sum.credits_spent || 0);
      }
    });

    // Convert to array format expected by the chart
    const result: CreditUsageData[] = [];
    const currentMonth = new Date().getMonth();
    
    // Get last 6 months in order
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const monthName = monthNames[monthIndex];
      result.push({
        name: monthName,
        usage: monthlyUsage.get(monthName) || 0,
      });
    }

    return result;
  } catch (error) {
    console.error('Error fetching credit usage over time:', error);
    return [];
  }
}