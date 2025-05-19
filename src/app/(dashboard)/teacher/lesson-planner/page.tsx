'use client';
import { useState, useEffect } from 'react';
import { CreateLessonDialog } from '@/components/teacher/lesson-planner/create-lesson-dialog';
import { useLessons } from '@/components/providers/lessons-provider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  LessonCard,
  LessonCardSkeleton,
} from '@/components/teacher/lesson-planner/lesson-card';
import { PlusCircle } from 'lucide-react';

import { toast } from 'sonner';
import { EditLessonDialog } from '@/components/teacher/lesson-planner/edit-lesson-dialog';
import { useLanguage } from '@/components/teacher/language-selector';

export default function LessonPlannerPage() {
  const [isCreateLessonOpen, setIsCreateLessonOpen] = useState(false);
  const { lessons, setLessons, fetchLessons } = useLessons();
  const [editingLesson, setEditingLesson] = useState<any | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const loadLessons = async () => {
      try {
        await fetchLessons();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load lessons');
      } finally {
        setLoading(false);
      }
    };
    loadLessons();
  }, []); //eslint-disable-line

  const handleEdit = (id: string) => {
    const lessonData = lessons.find((l: any) => l.id === id);

    if (lessonData) {
      setIsEditDialogOpen(true);
      setEditingLesson(lessonData);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLessons(lessons.filter((item) => item.id !== id));
      toast.success('Lesson deleted successfully');
      const response = await fetch(`/api/teacher/lesson/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete lesson');
      }
    } catch (error) {
      console.error('Error deleting lesson:', error);
      toast.error('Failed to delete lesson');
    }
  };
  const handleSaveEdit = async (updatedLesson: any) => {
    setLessons(
      lessons.map((item) =>
        item.id === updatedLesson.id ? updatedLesson : item
      )
    );

    toast.success('Lesson updated successfully!');
    try {
      const response = await fetch(`/api/teacher/lesson/${updatedLesson.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLesson),
      });
      if (!response.ok) {
        throw new Error('Failed to update lesson');
      }
    } catch (error) {
      console.error('Error updating lesson:', error);
      toast.error('Failed to update lesson');
    }
  };
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <LessonCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  if (lessons.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        The data does not exist.
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8 text-center text-muted-foreground">{error}</Card>
    );
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Detailed Lesson Planner</h1>
          <Button onClick={() => setIsCreateLessonOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Lesson
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {lessons.map((item) => (
            <LessonCard
              key={item.id}
              lessonItem={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
      {isEditDialogOpen && (
        <EditLessonDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          lessonData={editingLesson}
          onSave={handleSaveEdit}
        />
      )}
      <CreateLessonDialog
        open={isCreateLessonOpen}
        onOpenChange={setIsCreateLessonOpen}
      />
    </div>
  );
}
