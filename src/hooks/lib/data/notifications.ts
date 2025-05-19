import { Notification } from '@/types/notifications';

export const defaultNotifications: Notification[] = [
  {
    id: '1',
    type: 'assignment',
    title: 'New Assignment: Grammar Practice',
    message:
      'Complete the past tense exercises by Friday. This will help reinforce recent lessons.',
    timestamp: new Date('2024-01-30T10:00:00'),
    read: false,
  },
  {
    id: '2',
    type: 'message',
    title: 'Feedback on Your Progress',
    message:
      "Great improvement in your speaking skills! Let's focus on pronunciation next week.",
    timestamp: new Date('2024-01-30T09:00:00'),
    read: true,
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Achievement: Dedicated Learner',
    message: "Congratulations! You've completed 10 consecutive assignments.",
    timestamp: new Date('2024-01-29T15:00:00'),
    read: false,
  },
  {
    id: '4',
    type: 'system',
    title: 'Platform Update',
    message:
      'New features have been added to improve your learning experience.',
    timestamp: new Date('2024-01-29T14:00:00'),
    read: false,
  },
  {
    id: '5',
    type: 'assignment',
    title: 'Quiz: Vocabulary Review',
    message:
      "A new vocabulary quiz is available. Test your knowledge of this week's words.",
    timestamp: new Date('2024-01-29T13:00:00'),
    read: false,
  },
  {
    id: '6',
    type: 'message',
    title: 'Study Group Invitation',
    message:
      'Would you like to join the conversation practice group this Thursday?',
    timestamp: new Date('2024-01-29T12:00:00'),
    read: false,
  },
];
