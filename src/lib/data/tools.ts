import { Tool } from '@/types/tools';
import {
  TestTube,
  PenTool,
  Users,
  LayoutGrid,
  Clock,
  FileText,
  MessageSquare,
  PieChart,
  BookOpen,
  MonitorPlay,
  Calendar,
  CheckSquare,
  LucideIcon,
} from 'lucide-react';

interface ToolCategory {
  label: string;
  icon: LucideIcon;
}

export const toolCategories: Record<Tool['category'], ToolCategory> = {
  assessment: {
    label: 'Assessment',
    icon: TestTube,
  },
  'content-creation': {
    label: 'Content Creation',
    icon: PenTool,
  },
  collaboration: {
    label: 'Collaboration',
    icon: Users,
  },
  'classroom-management': {
    label: 'Classroom Management',
    icon: LayoutGrid,
  },
  productivity: {
    label: 'Productivity',
    icon: Clock,
  },
};

export const toolIcons: Record<string, LucideIcon> = {
  TestTube,
  FileText,
  MessageSquare,
  CheckSquare,
  Calendar,
  PieChart,
  MonitorPlay,
  Users,
  BookOpen,
};

export const tools: Tool[] = [
  {
    id: 'differentiated-text-generator',
    name: 'Differentiated Text Generator',
    description: 'Differentiated Text Generator',
    category: 'assessment',
    icon: 'TestTube',
    url: '/teacher/tools/differentiated-text-generator',
    isPremium: false,
  },
  {
    id: 'differentiated-activity-generator',
    name: 'Differentiated Activity Generator',
    description: 'Differentiated Activity Generator',
    category: 'content-creation',
    icon: 'FileText',
    url: '/teacher/tools/differentiated-activity-generator',
    isPremium: false,
  },
  {
    id: 'audio-resource-generator',
    name: 'Audio Resource Generator',
    description: 'Audio Resource Generator',
    category: 'collaboration',
    icon: 'MessageSquare',
    url: '/teacher/tools/audio-resource-generator',
    isPremium: false,
  },
  {
    id: 'project-generator',
    name: 'Project Generator',
    description: 'Project Generator',
    category: 'classroom-management',
    icon: 'CheckSquare',
    url: '/teacher/tools/project-generator',
    isPremium: false,
  },
  {
    id: 'lesson-planner',
    name: 'Quick Lesson Planner',
    description: 'Plan and organize your lessons efficiently',
    category: 'productivity',
    icon: 'Calendar',
    url: '/teacher/tools/lesson-planner',
    isPremium: false,
  },
  {
    id: 'detailed-lesson-planner',
    name: 'Detailed Lesson Planner',
    description: 'Plan and organize your lessons efficiently',
    category: 'productivity',
    icon: 'Calendar',
    url: '/teacher/lesson-planner',
    isPremium: false,
  },
  {
    id: 'activit-integrator',
    name: 'Activity Integrator within a lesson',
    description: 'Activity Integrator within a lesson',
    category: 'assessment',
    icon: 'PieChart',
    url: '/teacher/tools/activit-integrator',
    isPremium: true,
  },
  {
    id: 'end-of-lesson-poll',
    name: 'End-of-Lesson Poll',
    description: 'End-of-Lesson Poll',
    category: 'content-creation',
    icon: 'MonitorPlay',
    url: '/teacher/tools/end-lesson',
    isPremium: true,
  },
];
