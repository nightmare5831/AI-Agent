// app/api/student/notifications/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  try {
    // Get userId from query parameter
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId parameter' },
        { status: 400 }
      );
    }

    console.log(`Fetching notifications for user: ${userId}`);

    // Fetch notifications for the user
    const notifications = await prisma.notifications.findMany({
      where: {
        to: userId,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    console.log(`Found ${notifications.length} notifications`);

    // For debugging, log a sample of the data structure if available
    if (notifications.length > 0) {
      const sampleNotification = { ...notifications[0] };
      if (sampleNotification.data && sampleNotification.data.length > 1000) {
        sampleNotification.data =
          sampleNotification.data.substring(0, 1000) + '... [truncated]';
      }
      console.log('Sample notification structure:', sampleNotification);
    }

    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

// For debugging purposes - log the structure of the notification data
export async function POST(req: Request) {
  try {
    const notificationData = await req.json();

    // Ensure required fields are present
    if (
      !notificationData.from ||
      !notificationData.to ||
      !notificationData.type
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Creating notification:', {
      from: notificationData.from,
      to: notificationData.to,
      type: notificationData.type,
      title: notificationData.title || 'Notification',
      collection: notificationData.collection || 'general',
      // Don't log full data as it might be too large
      data: notificationData.data
        ? 'Data present (not showing full content)'
        : 'No data',
    });

    // Create notification
    const notification = await prisma.notifications.create({
      data: {
        from: notificationData.from,
        to: notificationData.to,
        collection: notificationData.collection || 'general',
        type: notificationData.type,
        title: notificationData.title || 'Notification',
        message: notificationData.message || '',
        data: notificationData.data || '{}',
        link: notificationData.link || '',
        viewed: notificationData.viewed || false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    console.log('Notification created with ID:', notification.id);

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}
