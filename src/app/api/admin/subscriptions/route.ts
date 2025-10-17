import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';
    const plan = searchParams.get('plan') || 'all';

    // Build where clause
    const where: any = {};

    // Add search filter
    if (search) {
      where.profile = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    // Add status filter
    if (status !== 'all') {
      where.status = status;
    }

    // Add plan filter
    if (plan !== 'all') {
      where.plan_type = plan;
    }

    // Fetch subscriptions
    const subscriptions = await prisma.subscriptions.findMany({
      where,
      include: {
        profile: true,
      },
      orderBy: { start_date: 'desc' },
    });

    // Format subscriptions
    const formattedSubscriptions = subscriptions.map((sub) => ({
      id: sub.id,
      user: sub.profile.name,
      email: sub.profile.email,
      plan: sub.plan_type,
      status: sub.status,
      startDate: new Date(sub.start_date).toLocaleDateString(),
      nextBilling: new Date(sub.end_date).toLocaleDateString(),
      amount: `R$${sub.amount}`,
      paymentMethod: sub.method,
      isActive: new Date(sub.end_date) > new Date() && sub.status === 'active',
      daysRemaining: Math.max(
        0,
        Math.ceil((new Date(sub.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      ),
    }));

    // Calculate statistics
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const activeSubscriptions = subscriptions.filter(
      (s) => new Date(s.end_date) > now && s.status === 'active'
    ).length;

    const totalRevenue = subscriptions
      .filter((s) => s.status === 'active' || s.status === 'overdue')
      .reduce((sum, sub) => sum + sub.amount, 0);

    const upcomingRenewals = subscriptions.filter(
      (s) => {
        const endDate = new Date(s.end_date);
        return endDate >= now && endDate <= sevenDaysFromNow && s.status === 'active';
      }
    ).length;

    const overdueCount = subscriptions.filter((s) => s.status === 'overdue').length;

    // Plan distribution for pie chart
    const planCounts: Record<string, number> = {};
    subscriptions.forEach((sub) => {
      planCounts[sub.plan_type] = (planCounts[sub.plan_type] || 0) + 1;
    });

    const planStats = Object.entries(planCounts).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color: name === 'essential' ? '#63B3ED' : name === 'professional' ? '#2B6CB0' : '#8b5cf6',
    }));

    // Status distribution for pie chart
    const statusCounts: Record<string, number> = {};
    subscriptions.forEach((sub) => {
      statusCounts[sub.status] = (statusCounts[sub.status] || 0) + 1;
    });

    const statusStats = Object.entries(statusCounts).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color:
        name === 'active' ? '#38A169' :
        name === 'overdue' ? '#E53E3E' :
        name === 'trial' ? '#ECC94B' :
        '#718096',
    }));

    return NextResponse.json({
      subscriptions: formattedSubscriptions,
      stats: {
        total: subscriptions.length,
        active: activeSubscriptions,
        revenue: totalRevenue,
        upcoming: upcomingRenewals,
        overdue: overdueCount,
      },
      planStats,
      statusStats,
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch subscriptions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
