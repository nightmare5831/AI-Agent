// types/assignments.ts

export type AssignmentStatus =
  | 'in-progress'
  | 'completed'
  | 'overdue'
  | 'not-started'
  | string;
export type AssignmentType =
  | 'assessment'
  | 'assignment'
  | 'project'
  | 'quiz'
  | string;

export interface Attachment {
  name: string;
  url: string;
  type: string;
  size?: number;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  type: AssignmentType;
  status: AssignmentStatus;
  progress: number;
  dueDate: Date;
  points?: number;
  attachments?: Attachment[];
  link?: string;
}
