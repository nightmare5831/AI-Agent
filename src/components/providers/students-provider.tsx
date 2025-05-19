'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Student } from '@/types';

interface StudentsContextType {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  addStudent: (student: Student) => void;
  fetchStudents: () => Promise<void>;
}

const StudentsContext = createContext<StudentsContextType | undefined>(
  undefined
);

export function StudentsProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/teacher/student');
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  };

  const addStudent = useCallback((newStudent: Student) => {
    setStudents((prev) => [...prev, newStudent]);
  }, []);

  return (
    <StudentsContext.Provider
      value={{ students, setStudents, addStudent, fetchStudents }}
    >
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentsContext);
  if (context === undefined) {
    throw new Error('useStudents must be used within a StudentsProvider');
  }
  return context;
}
