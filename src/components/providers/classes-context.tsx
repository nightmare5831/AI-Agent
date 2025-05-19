'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface Class {
  id: string;
  class_name: string;
  age_learner: string;
  subject: string;
  created_at: string;
}

interface ClassesContextType {
  classes: Class[];
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
  addClass: (newClass: Class) => void;
  fetchClasses: () => Promise<void>;
}

const ClassesContext = createContext<ClassesContextType | undefined>(undefined);

export function ClassesProvider({ children }: { children: React.ReactNode }) {
  const [classes, setClasses] = useState<Class[]>([]);

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/teacher/class');
      if (!response.ok) {
        throw new Error('Failed to fetch classes');
      }
      const data = await response.json();
      setClasses(data.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    }
  };

  const addClass = useCallback((newClass: Class) => {
    setClasses((prev) => [newClass, ...prev]);
  }, []);

  return (
    <ClassesContext.Provider
      value={{ classes, setClasses, addClass, fetchClasses }}
    >
      {children}
    </ClassesContext.Provider>
  );
}

export function useClasses() {
  const context = useContext(ClassesContext);
  if (context === undefined) {
    throw new Error('useClasses must be used within a ClassesProvider');
  }
  return context;
}
