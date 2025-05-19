'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useNotifications } from '@/components/providers/notification-provider';
import { formatDistanceToNow } from 'date-fns';
import { getNotificationIcon } from '@/lib/utils/notifications';

import { NotificationType } from '@/types/notifications';

// Función para obtener los estilos según el tipo de notificación
function getNotificationTypeStyle(type: NotificationType) {
  switch (type) {
    case 'assessment':
      return {
        bgColor: 'bg-[#63B3ED]/10',
        textColor: 'text-[#63B3ED]'
      };
    case 'assignment':
      return {
        bgColor: 'bg-[#8b5cf6]/10',
        textColor: 'text-[#8b5cf6]'
      };
    case 'feedback':
      return {
        bgColor: 'bg-[#ec4899]/10',
        textColor: 'text-[#ec4899]'
      };
    case 'system':
    default:
      return {
        bgColor: 'bg-[#d32f2f]/10',
        textColor: 'text-[#d32f2f]'
      };
  }
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  timestamp: Date;
  link?: string;
  data?: string;
}

interface NotificationPreviewProps {
  notification: Notification;
}

export function NotificationPreview({
  notification,
}: NotificationPreviewProps) {
  const { markAsRead } = useNotifications();
  const Icon = getNotificationIcon(notification.type);

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }

    // Navigate to link if provided
    if (notification.link && typeof window !== 'undefined') {
      window.location.href = notification.link;
    }
  };

  return (
    <div 
      className={`flex w-full items-start gap-3 p-4 hover:bg-[#63B3ED]/5 transition-all duration-300 border-l-2 ${notification.read ? 'border-transparent' : 'border-[#63B3ED]'}`}
    >
      <div 
        className={`flex-shrink-0 rounded-full p-2 ${getNotificationTypeStyle(notification.type).bgColor}`}
      >
        <Icon className={`h-4 w-4 ${getNotificationTypeStyle(notification.type).textColor}`} />
      </div>
      <div className="flex-1 cursor-pointer space-y-1" onClick={handleClick}>
        <div className="flex items-center gap-2">
          <p className="line-clamp-1 text-sm font-medium">{notification.title}</p>
          {!notification.read && (
            <span className="h-2 w-2 rounded-full bg-[#d32f2f] animate-pulse"></span>
          )}
        </div>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {notification.message}
        </p>
        <p className="text-xs text-[#63B3ED]/70">
          {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 flex-shrink-0 hover:bg-[#d32f2f]/10 hover:text-[#d32f2f] transition-all duration-300"
        onClick={(e) => {
          e.stopPropagation();
          markAsRead(notification.id);
        }}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
