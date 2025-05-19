export interface Class {
  id: string;
  class_name: string;
  age_learner: string;
  subject: string;
  language_level: string;
  session_duration: string;
  discipline: number;
  lack_motivation: number;
  low_turnout: number;
  lack_space: number;
  cultural: number;
  equipment: {
    phones: boolean;
    tablets: boolean;
    internet: boolean;
    projector: boolean;
    interactiveBoard: boolean;
    television: boolean;
    noEquipment: boolean;
  };
}

export interface Student {
  id: string;
  full_name: string;
  classroom_id: string;
  level: string;
  learningconsiderations: {
    adhd: boolean;
    dyslexia: boolean;
    visualImpairment: boolean;
    hearingImpairment: boolean;
    autism: boolean;
    downSyndrome: boolean;
  };
  grammar: number;
  vocabulary: number;
  phonetics: number;
  listening: number;
  speaking: number;
  reading: number;
  writing: number;
  interacting: number;
  classroom?: {
    class_name: string;
  };
  // This is not directly related in Prisma but added manually
  student_info?: {
    full_name: string;
  };
  created_at?: Date;
  updated_at?: Date;
}

export interface Lesson {
  id: string;
  title: string;
  class_name: string;
  teacher_name: string;
  lessontype: string;
  objectives: string;
  languagecontent: string;
  prioritized_skills: string[];
  details: {
    learningpath: string;
    beginning_ritual: string;
    ending_ritual: string;
    document_type: string;
    document_format: string;
    grammar: string;
    vocabulary: string[];
    phonetics: string[];
    communication: string[];
    finaltask: string;
  };
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  classes: Class[];
}
