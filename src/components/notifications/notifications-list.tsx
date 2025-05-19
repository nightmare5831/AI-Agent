'use client';

import { useState } from 'react';
import { useNotifications } from '@/components/providers/notification-provider';
import { NotificationPreview } from './notification-preview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { NotificationType } from '@/types/notifications';

export function NotificationsList() {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [activeTab, setActiveTab] = useState('all');

  const filteredNotifications =
    activeTab === 'unread'
      ? notifications.filter((n) => !n.viewed)
      : notifications;

  const handleMarkAllAsRead = async () => {
    // Mark all unread notifications as read
    const unreadNotifications = notifications.filter((n) => !n.viewed);
    for (const notification of unreadNotifications) {
      await markAsRead(notification.id);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {unreadCount} unread
            </span>
          )}
        </CardTitle>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
            Mark all as read
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="all">All Notifications</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="m-0">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No notifications to display
              </div>
            ) : (
              <div className="space-y-1">
                {filteredNotifications.map((notification) => (
                  <NotificationPreview
                    key={notification.id}
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
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="unread" className="m-0">
            {unreadCount === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No unread notifications
              </div>
            ) : (
              <div className="space-y-1">
                {filteredNotifications.map((notification) => (
                  <NotificationPreview
                    key={notification.id}
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
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default NotificationsList;
