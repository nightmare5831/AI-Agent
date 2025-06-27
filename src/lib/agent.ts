export interface Question {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect';
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface Agent {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
}
