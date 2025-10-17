import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const plan = searchParams.get('plan') || 'all';
    const status = searchParams.get('status') || 'all';

    // Build where clause
    const where: any = {
      role: 'user', // Only get users, not admins
    };

    // Add search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Add plan filter
    if (plan !== 'all') {
      where.subscription_plan = plan;
    }

    // Fetch users with their subscriptions and task logs
    const users = await prisma.profile.findMany({
      where,
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

    // Format the response
    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      plan: user.subscription_plan || 'free',
      credits: user.credits_balance,
      status: user.credits_balance > 20 ? 'active' : user.credits_balance > 0 ? 'warning' : 'inactive',
      lastActive: user.tasks_log[0]?.timestamp
        ? new Date(user.tasks_log[0].timestamp).toLocaleDateString()
        : 'Never',
      signupDate: new Date(user.created_at).toLocaleDateString(),
      billingStatus: user.subscriptions[0]?.status || 'trial',
      stripeSubscriptionId: user.stripeSubscriptionId,
    }));

    return NextResponse.json({
      users: formattedUsers,
      total: formattedUsers.length,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
