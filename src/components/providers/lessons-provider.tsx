'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Lesson } from '@/types';

interface LessonsContextType {
  lessons: Lesson[];
  setLessons: React.Dispatch<React.SetStateAction<Lesson[]>>;
  addLesson: (lesson: Lesson) => void;
  fetchLessons: () => Promise<void>;
}

const LessonsContext = createContext<LessonsContextType | undefined>(undefined);

export function LessonsProvider({ children }: { children: React.ReactNode }) {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const fetchLessons = async () => {
    try {
      const response = await fetch('/api/teacher/lesson');
      if (!response.ok) {
        throw new Error('Failed to fetch lessons');
      }
      const data = await response.json();
      setLessons(data.data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      throw error;
    }
  };

  const addLesson = useCallback((newLesson: Lesson) => {
    setLessons((prev) => [...prev, newLesson]);
  }, []);

  return (
    <LessonsContext.Provider
      value={{ lessons, setLessons, addLesson, fetchLessons }}
    >
      {children}
    </LessonsContext.Provider>
  );
}

export function useLessons() {
  const context = useContext(LessonsContext);
  if (context === undefined) {
    throw new Error('useLessons must be used within a LessonsProvider');
  }
  return context;
}
