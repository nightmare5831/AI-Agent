export interface Lesson {
  id: number;
  title: string;
  className: string;
  teacherName: string;
  type: 'Live' | 'Recorded' | 'Document' | 'Interactive';
  createdAt: string;
  communicativeObjectives?: string[];
  languageContent?: string;
  prioritizedSkills?: string[];
  learningPath?: string;
  beginningRitual?: string;
  starterDocumentType?: string;
  starterDocumentFormat?: string;
  grammar?: string;
  vocabulary?: string[];
  communicationActivity?: string;
  finalTask?: string;
  endingRitual?: string;
}
