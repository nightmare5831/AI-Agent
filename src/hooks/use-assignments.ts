// hooks/use-assignments.ts
import { useState, useEffect } from 'react';
import { useNotifications } from '@/components/providers/notification-provider';
import {
  Assignment,
  AssignmentStatus,
  AssignmentType,
} from '@/types/assignments';

// Export as both named and default export to support different import styles
export const useAssignments = () => {
  const { assessmentNotifications, refreshNotifications } = useNotifications();
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    // Convert assessment notifications to assignment format
    const convertedAssessments = assessmentNotifications.map(
      (notification): Assignment => {
        return {
          id: notification.id,
          title: notification.title || 'Assessment',
          description: notification.description || 'Complete this assessment',
          type: 'assessment',
          status: notification.status || 'in-progress',
          progress: notification.progress || 0,
          dueDate: new Date(
            notification.dueDate || Date.now() + 7 * 24 * 60 * 60 * 1000
          ),
          points: notification.points || 0,
          attachments: [], // No attachments by default
          link: notification.link || '',
        };
      }
    );

    setAssignments(convertedAssessments);
  }, [assessmentNotifications]);

  const refreshAssessments = async () => {
    await refreshNotifications();
  };

  return {
    assignments,
    refreshAssessments,
  };
};

// Also export as default for backward compatibility
export { useAssignments as default };
