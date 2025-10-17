import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const days = parseInt(searchParams.get('days') || '30');

    // Calculate date range
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - days);

    // Fetch task logs (credits used)
    const taskLogs = await prisma.tasks_log.findMany({
      where: {
        timestamp: {
          gte: dateFrom,
        },
        ...(search && {
          profile: {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
            ],
          },
        }),
      },
      include: {
        profile: true,
      },
      orderBy: { timestamp: 'desc' },
    });

    // Fetch credit purchases
    const creditPurchases = await prisma.credit_purchases.findMany({
      where: {
        purchased_at: {
          gte: dateFrom,
        },
        ...(search && {
          profile: {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
            ],
          },
        }),
      },
      include: {
        profile: true,
      },
      orderBy: { purchased_at: 'desc' },
    });

    // Fetch subscriptions (allocated credits)
    const subscriptions = await prisma.subscriptions.findMany({
      where: {
        start_date: {
          gte: dateFrom,
        },
        ...(search && {
          profile: {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
            ],
          },
        }),
      },
      include: {
        profile: true,
      },
      orderBy: { start_date: 'desc' },
    });

    // Get current balance from profile
    const allProfiles = await prisma.profile.findMany({
      where: { role: 'user' },
      select: { credits_balance: true },
    });
    const currentBalance = allProfiles.reduce((sum, p) => sum + p.credits_balance, 0);

    // Format task logs as credit usage
    const usedCredits = taskLogs.map((log) => ({
      id: log.id,
      user: log.profile.name,
      email: log.profile.email,
      type: 'used',
      amount: log.credits_spent,
      details: `${log.agent_type} task`,
      balance: 0, // Will be calculated below
      timestamp: log.timestamp.toISOString(),
      date: `${new Date(log.timestamp).toLocaleDateString()} ${new Date(log.timestamp).toLocaleTimeString()}`,
    }));

    // Format purchases
    const purchasedCredits = creditPurchases.map((purchase) => ({
      id: purchase.id,
      user: purchase.profile.name,
      email: purchase.profile.email,
      type: 'purchased',
      amount: purchase.credits,
      details: `${purchase.pack_type} pack - R$${purchase.price}`,
      balance: 0, // Will be calculated below
      timestamp: purchase.purchased_at.toISOString(),
      date: `${new Date(purchase.purchased_at).toLocaleDateString()} ${new Date(purchase.purchased_at).toLocaleTimeString()}`,
    }));

    // Format subscriptions
    const allocatedCredits = subscriptions.map((sub) => ({
      id: sub.id,
      user: sub.profile.name,
      email: sub.profile.email,
      type: 'allocated',
      amount: sub.plan_type === 'professional' ? 200 : 100, // Based on plan
      details: `${sub.plan_type} subscription`,
      balance: 0, // Will be calculated below
      timestamp: sub.start_date.toISOString(),
      date: `${new Date(sub.start_date).toLocaleDateString()} ${new Date(sub.start_date).toLocaleTimeString()}`,
    }));

    // Combine and sort all logs
    const allLogs = [...usedCredits, ...purchasedCredits, ...allocatedCredits].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Calculate statistics
    const totalUsed = usedCredits.reduce((sum, log) => sum + log.amount, 0);
    const totalPurchased = purchasedCredits.reduce((sum, log) => sum + log.amount, 0);
    const totalAllocated = allocatedCredits.reduce((sum, log) => sum + log.amount, 0);

    // Generate chart data for the last 7 days
    const chartData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      const dayLogs = allLogs.filter(
        (log) => new Date(log.timestamp).toDateString() === date.toDateString()
      );

      chartData.push({
        date: dateStr,
        used: dayLogs.filter((l) => l.type === 'used').reduce((sum, l) => sum + l.amount, 0),
        earned: dayLogs
          .filter((l) => l.type === 'purchased' || l.type === 'allocated')
          .reduce((sum, l) => sum + l.amount, 0),
      });
    }

    // Add running balance to each log
    let runningBalance = currentBalance;
    for (let i = 0; i < allLogs.length; i++) {
      allLogs[i].balance = runningBalance;
      if (allLogs[i].type === 'used') {
        runningBalance += allLogs[i].amount; // Going backwards in time, so add back used credits
      } else {
        runningBalance -= allLogs[i].amount; // Going backwards, so remove earned credits
      }
    }

    return NextResponse.json({
      logs: allLogs,
      stats: {
        totalUsed,
        totalPurchased: totalPurchased + totalAllocated,
        balance: currentBalance,
      },
      chartData,
    });
  } catch (error) {
    console.error('Error fetching credit logs:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch credit logs',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
