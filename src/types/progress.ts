export interface SkillProgress {
  skill: string;
  level: string;
  progress: number;
  change: number;
}

export interface Activity {
  id: string;
  type: 'assignment' | 'quiz' | 'practice' | 'achievement';
  title: string;
  description: string;
  timestamp: Date;
  score?: number;
  xpGained?: number;
}

export interface LearningGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  dueDate: Date;
}

export interface OverallProgress {
  level: string;
  xp: number;
  xpNeeded: number;
  streak: number;
  hoursStudied: number;
  activitiesCompleted: number;
}
