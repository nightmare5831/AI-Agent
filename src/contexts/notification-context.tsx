'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notification, NotificationType } from '@/types/notifications';
import { useAuth } from '@/core/auth/AuthProvider';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  markAsRead: async () => {},
  deleteNotification: async () => {},
  refreshNotifications: async () => {},
});

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [{ profile }] = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    if (!profile) return;

    try {
      // Simulate API call to fetch notifications
      // In a real app, you would fetch from an API
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'New Assignment',
          message: 'You have a new assignment due next week',
          type: 'assignment',
          read: false,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          link: '/assignments/1',
        },
        {
          id: '2',
          title: 'Assessment Graded',
          message: 'Your recent assessment has been graded',
          type: 'assessment',
          read: false,
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          link: '/assessments/2',
        },
        {
          id: '3',
          title: 'Message from Teacher',
          message: 'Please check your homework submission',
          type: 'message',
          read: true,
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          link: '/messages/3',
        },
      ];

      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter((n) => !n.read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      // Simulate API call to mark notification as read
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      // Simulate API call to delete notification
      const updatedNotifications = notifications.filter((n) => n.id !== id);
      setNotifications(updatedNotifications);
      setUnreadCount(updatedNotifications.filter((n) => !n.read).length);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const refreshNotifications = async () => {
    await fetchNotifications();
  };

  useEffect(() => {
    if (profile) {
      fetchNotifications();
    }
  }, [profile]); //eslint-disable-line

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        deleteNotification,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
