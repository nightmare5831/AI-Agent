'use client';

import { useState } from 'react';
import { Notification } from '@/types/notifications';

export function useNotifications() {
  // This would normally fetch from an API
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'assignment',
      title: 'New Assignment Added',
      message:
        'A new grammar practice assignment has been added to your dashboard.',
      timestamp: new Date('2024-01-30T10:00:00'),
      read: false,
    },
    {
      id: '2',
      type: 'message',
      title: 'Message from Teacher',
      message: 'Great progress on your last assignment! Keep up the good work.',
      timestamp: new Date('2024-01-30T09:00:00'),
      read: true,
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Achievement Unlocked',
      message:
        "You've completed 10 assignments! You've earned the 'Dedicated Learner' badge.",
      timestamp: new Date('2024-01-29T15:00:00'),
      read: false,
    },
    {
      id: '4',
      type: 'system',
      title: 'System Update',
      message: 'New features have been added to the platform. Check them out!',
      timestamp: new Date('2024-01-29T12:00:00'),
      read: true,
    },
  ]);

  return {
    notifications,
  };
}
