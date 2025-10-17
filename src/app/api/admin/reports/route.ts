import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    // Calculate date range
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - days);

    // Fetch all users
    const totalUsers = await prisma.profile.count({
      where: { role: 'user' },
    });

    // Fetch new users in period
    const newUsers = await prisma.profile.count({
      where: {
        role: 'user',
        created_at: { gte: dateFrom },
      },
    });

    // Fetch active subscriptions
    const activeSubscriptions = await prisma.subscriptions.count({
      where: {
        status: 'active',
        end_date: { gte: new Date() },
      },
    });

    // Calculate total revenue
    const subscriptions = await prisma.subscriptions.findMany({
      where: {
        start_date: { gte: dateFrom },
      },
    });

    const totalRevenue = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);

    // Fetch credit purchases
    const creditPurchases = await prisma.credit_purchases.findMany({
      where: {
        purchased_at: { gte: dateFrom },
      },
    });

    const creditRevenue = creditPurchases.reduce((sum, purchase) => sum + purchase.price, 0);

    // Fetch task logs for usage statistics
    const taskLogs = await prisma.tasks_log.findMany({
      where: {
        timestamp: { gte: dateFrom },
      },
    });

    const totalTasksCompleted = taskLogs.length;
    const totalCreditsUsed = taskLogs.reduce((sum, log) => sum + log.credits_spent, 0);

    // Agent usage statistics
    const agentUsage: Record<string, number> = {};
    taskLogs.forEach((log) => {
      agentUsage[log.agent_type] = (agentUsage[log.agent_type] || 0) + 1;
    });

    // Daily activity data for charts
    const dailyData = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const dayTasks = taskLogs.filter(
        (log) =>
          new Date(log.timestamp) >= date && new Date(log.timestamp) < nextDate
      );

      const daySubscriptions = subscriptions.filter(
        (sub) =>
          new Date(sub.start_date) >= date && new Date(sub.start_date) < nextDate
      );

      dailyData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        tasks: dayTasks.length,
        revenue: daySubscriptions.reduce((sum, sub) => sum + sub.amount, 0),
        newUsers: await prisma.profile.count({
          where: {
            role: 'user',
            created_at: { gte: date, lt: nextDate },
          },
        }),
      });
    }

    // Top users by task count
    const userTaskCounts: Record<string, { count: number; credits: number; user: any }> = {};

    for (const log of taskLogs) {
      if (!userTaskCounts[log.profile_id]) {
        const profile = await prisma.profile.findUnique({
          where: { id: log.profile_id },
        });
        userTaskCounts[log.profile_id] = {
          count: 0,
          credits: 0,
          user: profile,
        };
      }
      userTaskCounts[log.profile_id].count++;
      userTaskCounts[log.profile_id].credits += log.credits_spent;
    }

    const topUsers = Object.values(userTaskCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
      .map((item) => ({
        name: item.user?.name || 'Unknown',
        email: item.user?.email || '',
        tasks: item.count,
        credits: item.credits,
      }));

    // Format system stats for frontend
    const systemStats = [
      {
        name: 'Total Users',
        value: totalUsers.toString(),
        change: newUsers > 0 ? `+${newUsers} this period` : 'No change',
        isPositive: newUsers > 0,
      },
      {
        name: 'Active Subscriptions',
        value: activeSubscriptions.toString(),
        change: activeSubscriptions > 0 ? `${Math.round((activeSubscriptions / Math.max(totalUsers, 1)) * 100)}% of users` : 'No subscriptions',
        isPositive: activeSubscriptions > 0,
      },
      {
        name: 'Total Revenue',
        value: `R$${Math.round((totalRevenue + creditRevenue) * 100) / 100}`,
        change: totalRevenue > 0 ? `+${Math.round(totalRevenue)}` : 'No revenue',
        isPositive: totalRevenue > 0,
      },
      {
        name: 'Credits Used',
        value: totalCreditsUsed.toString(),
        change: `${totalTasksCompleted} tasks`,
        isPositive: totalCreditsUsed > 0,
      },
    ];

    // Format user activity data
    const userActivityData = dailyData.map((day) => ({
      name: day.date,
      active: day.tasks,
      new: day.newUsers,
    }));

    // Format revenue data
    const revenueData = dailyData.map((day) => ({
      name: day.date,
      revenue: day.revenue,
    }));

    // Format agent usage data
    const agentUsageData = Object.entries(agentUsage).map(([name, usage]) => ({
      name,
      usage,
    }));

    return NextResponse.json({
      systemStats,
      userActivityData,
      revenueData,
      agentUsageData,
      summary: {
        totalUsers,
        newUsers,
        activeSubscriptions,
        totalRevenue: Math.round((totalRevenue + creditRevenue) * 100) / 100,
        totalTasksCompleted,
        totalCreditsUsed,
      },
      topUsers,
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch reports',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
