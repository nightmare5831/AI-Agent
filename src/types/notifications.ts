export type NotificationType =
  | 'assessment'
  | 'assignment'
  | 'message'
  | 'lesson'
  | 'achievement'
  | 'event'
  | 'alert'
  | 'feedback'
  | string; // Allow string for backward compatibility
export type NotificationStatus = 'all' | 'read' | 'unread';

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

export interface NotificationFilters {
  status: NotificationStatus;
  types: NotificationType[];
}

export interface NotificationContextType {
  notifications: Notification[];
  filters: NotificationFilters;
  setFilters: (filters: Partial<NotificationFilters>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  getFilteredNotifications: () => Notification[];
  unreadCount: number;
}
