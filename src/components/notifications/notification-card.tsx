'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Notification } from '@/types/notifications';
import { X } from 'lucide-react';
import { useNotifications } from '@/contexts/notification-context';
import { getNotificationIcon } from '@/lib/utils/notifications';

interface NotificationCardProps {
  notification: Notification;
}

export function NotificationCard({ notification }: NotificationCardProps) {
  const { deleteNotification, markAsRead } = useNotifications();
  const Icon = getNotificationIcon(notification.type);

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  return (
    <Card
      className={`p-4 ${notification.read ? 'bg-background' : 'bg-primary/5'}`}
    >
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-primary/10 p-2">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div onClick={handleClick} className="cursor-pointer">
              <h3 className="font-semibold">{notification.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {notification.message}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => deleteNotification(notification.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
            </p>
            {!notification.read && (
              <Badge variant="secondary" className="text-xs">
                New
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
