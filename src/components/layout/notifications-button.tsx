'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell } from 'lucide-react';
import { useNotifications } from '@/components/providers/notification-provider';
import { NotificationPreview } from '@/components/notifications/notification-preview';
import { NotificationDropdownFooter } from '@/components/notifications/notification-dropdown-footer';
import { NotificationType } from '@/types/notifications';

export function NotificationsButton() {
  const { notifications, unreadCount } = useNotifications();
  const unreadNotifications = notifications.filter((n) => !n.viewed);
  const displayNotifications = unreadNotifications.slice(0, 5);
  const hasMoreUnread = unreadNotifications.length > 5;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative group hover:bg-transparent"
        >
          <Bell 
            className="h-5 w-5 group-hover:text-[#63B3ED] transition-all duration-300 transform group-hover:scale-110" 
            style={{
              stroke: 'url(#bellGradient)',
              strokeWidth: 2
            }}
          />
          <svg width="0" height="0" className="absolute">
            <linearGradient id="bellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#63B3ED" />
              <stop offset="100%" stopColor="#d32f2f" />
            </linearGradient>
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#63B3ED] to-[#d32f2f] text-[10px] font-medium text-white animate-pulse shadow-sm">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[380px] border border-[#63B3ED]/10 shadow-lg rounded-xl overflow-hidden backdrop-blur-sm"
        sideOffset={8}
      >
        {unreadNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="rounded-full bg-[#63B3ED]/10 p-3">
                <Bell className="h-6 w-6 text-[#63B3ED]/60" />
              </div>
              <p className="text-sm text-muted-foreground">No unread notifications</p>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 px-4 py-3 border-b border-[#63B3ED]/10">
              <h4 className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">
                Recent Notifications
              </h4>
            </div>
            <ScrollArea className="max-h-[300px] !overflow-y-auto">
              {displayNotifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="p-0">
                  <NotificationPreview
                    notification={{
                      id: notification.id,
                      title: notification.title,
                      message: notification.message,
                      type: notification.type,
                      read: notification.viewed,
                      timestamp: new Date(notification.created_at),
                      link: notification.link,
                      data: notification.data,
                    }}
                  />
                </DropdownMenuItem>
              ))}
              {hasMoreUnread && (
                <div className="border-t border-[#63B3ED]/10 px-4 py-3 text-center text-xs">
                  <span className="bg-[#63B3ED]/10 text-[#63B3ED] px-2 py-1 rounded-full font-medium">
                    +{unreadNotifications.length - 5} more unread notifications
                  </span>
                </div>
              )}
            </ScrollArea>
            <DropdownMenuSeparator />
          </>
        )}
        <NotificationDropdownFooter />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
