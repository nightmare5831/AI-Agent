// utils/notifications.ts

/**
 * Send a real-time notification event to connected clients
 * This simulates the behavior of WebSockets for demonstration purposes
 */
import {
  Bell,
  CheckCircle,
  FileText,
  MessageCircle,
  BookOpen,
  Award,
  Calendar,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { NotificationType } from '@/types/notifications';

export function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case 'assessment':
      return CheckCircle;
    case 'assignment':
      return FileText;
    case 'message':
      return MessageCircle;
    case 'lesson':
      return BookOpen;
    case 'achievement':
      return Award;
    case 'event':
      return Calendar;
    case 'alert':
      return AlertCircle;
    case 'feedback':
      return FileCheck;
    default:
      return Bell;
  }
}

export const getNotificationColor = (type: NotificationType): string => {
  switch (type) {
    case 'assessment':
      return 'text-green-600';
    case 'assignment':
      return 'text-blue-600';
    case 'message':
      return 'text-violet-600';
    case 'lesson':
      return 'text-amber-600';
    case 'achievement':
      return 'text-yellow-600';
    case 'event':
      return 'text-indigo-600';
    case 'alert':
      return 'text-red-600';
    case 'feedback':
      return 'text-cyan-600';
    default:
      return 'text-slate-600';
  }
};
export const broadcastNotification = (notification: any) => {
  // Create and dispatch a custom event
  const notificationEvent = new CustomEvent('new-notification', {
    detail: notification,
  });
  window.dispatchEvent(notificationEvent);
};

/**
 * Utility function to send notifications
 */
export const sendNotification = async (notificationData: any) => {
  try {
    const response = await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notificationData),
    });

    if (!response.ok) {
      throw new Error('Failed to send notification');
    }

    const notification = await response.json();

    // Broadcast the notification to all clients (simulation)
    broadcastNotification(notification);

    return notification;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};
