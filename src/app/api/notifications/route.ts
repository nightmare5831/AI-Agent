import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const notificationData = await req.json();

    // Validate required fields
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

    // Create notification using Prisma
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
      },
    });

    // Emit a custom event for real-time notification
    // In a real server environment, this would be a WebSocket or SSE emission
    // For client-side, we'll create a browser event to simulate this
    if (typeof window !== 'undefined') {
      const notificationEvent = new CustomEvent('new-notification', {
        detail: notification,
      });
      window.dispatchEvent(notificationEvent);
    }

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    console.error('Failed to create notification:', error);
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}
