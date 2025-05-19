// components/providers/notification-provider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/core/auth/AuthProvider';
import { NotificationType } from '@/types/notifications';

// Define types
export interface Notification {
  id: string;
  from: string;
  to: string;
  collection: string;
  type: NotificationType;
  title: string;
  message: string;
  data: string;
  link: string;
  viewed: boolean;
  created_at: Date | string;
  updated_at: Date | string;
}

// Define the structure of assessment data parsed from JSON
export interface AssessmentNotification {
  id: string;
  notificationId: string;
  title: string;
  description: string;
  message?: string; // Add the message property
  type: 'assessment';
  status: 'in-progress' | 'completed' | 'overdue' | 'not-started';
  progress: number;
  dueDate: Date;
  points: number;
  questions: any[];
  totalPoints: number;
  language: string;
  link?: string;
  created_at: Date | string;
  viewed: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
  refreshNotifications: () => Promise<void>;
  assessmentNotifications: AssessmentNotification[]; // Typed assessment data
}

// Create context for notifications
const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  markAsRead: async () => {},
  refreshNotifications: async () => {},
  assessmentNotifications: [],
});

// Hook to use notifications
export const useNotifications = () => useContext(NotificationContext);

// Notification Provider component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [{ profile }] = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [assessmentNotifications, setAssessmentNotifications] = useState<
    AssessmentNotification[]
  >([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Function to parse assessment data
  const parseAssessmentData = (notifications: Notification[]) => {
    // Filter notifications that are assessments
    const assessments = notifications.filter(
      (n) => n.type === 'assessment' && n.collection === 'assessments'
    );

    console.log('Assessment notifications to parse:', assessments);

    // Parse the JSON data field
    return assessments
      .map((assessment) => {
        try {
          // Parse the JSON data
          let parsedData: any = {};

          try {
            parsedData = JSON.parse(assessment.data);
            console.log('Successfully parsed JSON data:', parsedData);
          } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            console.log('Raw data causing parse error:', assessment.data);
            return null;
          }

          // Create a standardized assessment notification object
          const assessmentNotification: AssessmentNotification = {
            id: assessment.id,
            notificationId: assessment.id,
            title: parsedData.title || assessment.title || 'Assessment',
            description: assessment.message || 'Complete this assessment',
            message: assessment.message,
            type: 'assessment',
            status: 'in-progress',
            progress: 0,
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Due in 1 week by default
            points: 0,
            questions: parsedData.questions || [],
            totalPoints: parsedData.totalPoints || 0,
            language: parsedData.language || 'English',
            link: assessment.link,
            created_at: assessment.created_at,
            viewed: assessment.viewed,
          };

          // Calculate total points from questions if not explicitly provided
          if (
            !assessmentNotification.totalPoints &&
            Array.isArray(parsedData.questions)
          ) {
            assessmentNotification.totalPoints = parsedData.questions.reduce(
              (total: any, question: any) => total + (question.points || 0),
              0
            );
          }

          console.log(
            'Created assessment notification:',
            assessmentNotification
          );
          return assessmentNotification;
        } catch (error) {
          console.error('Error processing assessment data:', error);
          return null;
        }
      })
      .filter(Boolean) as AssessmentNotification[]; // Remove any null values
  };

  // Function to fetch notifications from the database
  const fetchNotifications = async () => {
    if (!profile) return;

    try {
      // Fetch notifications where the current user is the recipient
      console.log('Fetching notifications for user:', profile.id);
      const response = await fetch(
        `/api/student/notifications?userId=${profile.id}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      const notificationsData = await response.json();
      console.log('Fetched notifications data:', notificationsData);

      // Update state with notifications
      setNotifications(notificationsData);
      setUnreadCount(
        notificationsData.filter((n: Notification) => !n.viewed).length || 0
      );

      // Process assessment notifications
      const assessments = parseAssessmentData(notificationsData);
      setAssessmentNotifications(assessments);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Function to mark notification as read
  const markAsRead = async (id: string) => {
    try {
      // Update notification using API
      const response = await fetch(`/api/student/notifications/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          viewed: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }

      // Update local state
      setNotifications((current) =>
        current.map((n) => (n.id === id ? { ...n, viewed: true } : n))
      );
      setUnreadCount((count) => Math.max(0, count - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Function to refresh notifications
  const refreshNotifications = async () => {
    console.log('Manually refreshing notifications');
    await fetchNotifications();
  };

  // Initial load of notifications
  useEffect(() => {
    if (profile) {
      console.log('Initial load of notifications for user:', profile.id);
      fetchNotifications();
    }
  }, [profile]); // eslint-disable-line react-hooks/exhaustive-deps

  // Set up polling for new notifications (every 30 seconds)
  useEffect(() => {
    if (!profile) return;

    console.log('Setting up notification polling');
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 30000); // Check every 30 seconds

    return () => clearInterval(intervalId);
  }, [profile]); // eslint-disable-line react-hooks/exhaustive-deps

  // Set up real-time subscription for new notifications
  useEffect(() => {
    if (!profile) return;

    console.log('Setting up real-time notification listener');

    // Function to handle the custom event
    const handleNewNotification = (event: CustomEvent) => {
      const newNotification = event.detail;
      console.log('Received new notification event:', newNotification);

      // Check if the notification is for this user
      if (newNotification.to === profile.id) {
        console.log('Notification is for current user, processing...');

        // Add new notification to state
        setNotifications((current) => [newNotification, ...current]);
        setUnreadCount((count) => count + 1);

        // Process if it's an assessment
        if (newNotification.type === 'assessment') {
          try {
            console.log('Processing new assessment notification');
            let parsedData: any = {};

            try {
              parsedData = JSON.parse(newNotification.data);
            } catch (parseError) {
              console.error('Error parsing JSON:', parseError);
              return;
            }

            const newAssessment: AssessmentNotification = {
              id: newNotification.id,
              notificationId: newNotification.id,
              title: parsedData.title || newNotification.title || 'Assessment',
              description:
                newNotification.message || 'Complete this assessment',
              message: newNotification.message,
              type: 'assessment',
              status: 'in-progress',
              progress: 0,
              dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              points: 0,
              questions: parsedData.questions || [],
              totalPoints: parsedData.totalPoints || 0,
              language: parsedData.language || 'English',
              link: newNotification.link,
              created_at: newNotification.created_at,
              viewed: newNotification.viewed,
            };

            // Calculate total points from questions if not explicitly provided
            if (
              !newAssessment.totalPoints &&
              Array.isArray(parsedData.questions)
            ) {
              newAssessment.totalPoints = parsedData.questions.reduce(
                (total: any, question: any) => total + (question.points || 0),
                0
              );
            }

            setAssessmentNotifications((current) => [
              newAssessment,
              ...current,
            ]);
            console.log('New assessment processed and added:', newAssessment);

            // Show browser notification if supported
            if (
              'Notification' in window &&
              Notification.permission === 'granted'
            ) {
              new Notification(newAssessment.title, {
                body: `New assessment (${newAssessment.totalPoints} points)`,
              });
            }
          } catch (error) {
            console.error('Error processing new assessment data:', error);
          }
        }
      }
    };

    // Add event listener with type assertion
    window.addEventListener(
      'new-notification',
      handleNewNotification as EventListener
    );

    // Request notification permission
    if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }

    return () => {
      // Remove event listener
      window.removeEventListener(
        'new-notification',
        handleNewNotification as EventListener
      );
    };
  }, [profile]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        refreshNotifications,
        assessmentNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
