export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'in-progress' | 'completed';
  type: 'assessment' | 'assignment';
  progress: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  classCode: string;
  interests: string[];
  progress: {
    grammar: number;
    vocabulary: number;
    speaking: number;
    listening: number;
  };
}
