'use client';

import { Card } from '@/components/ui/card';
import { Notification } from '@/types/student';
import { formatDistanceToNow } from 'date-fns';

export function NotificationsList() {
  // This would normally fetch from an API
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'New Assignment Added',
      message: 'Grammar Practice: Past Tense has been assigned',
      timestamp: new Date('2024-01-30T10:00:00'),
      read: false,
    },
    {
      id: '2',
      title: 'Assignment Due Soon',
      message: 'Vocabulary Quiz is due in 2 days',
      timestamp: new Date('2024-01-30T09:00:00'),
      read: true,
    },
  ];

  return (
    <Card className="p-4">
      <h2 className="mb-4 text-xl font-semibold">Recent Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`rounded-lg p-3 ${
              notification.read ? 'bg-muted' : 'bg-primary/10'
            }`}
          >
            <h3 className="font-medium">{notification.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {notification.message}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
