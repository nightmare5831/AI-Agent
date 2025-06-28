export interface Question {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'radio';
  placeholder?: string;
  options?: string[];
  required?: boolean;
  condition?: (answers: Record<string, string>) => boolean;
}

export interface Agent {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
}
