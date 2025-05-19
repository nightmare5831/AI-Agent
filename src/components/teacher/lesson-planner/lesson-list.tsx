// lesson-list.tsx
'use client';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { LessonCard, LessonCardSkeleton } from './lesson-card';
import { useLessons } from '@/components/providers/lessons-provider';
import { toast } from 'sonner';
import { EditLessonDialog } from './edit-lesson-dialog';

export function LessonList() {
  const { lessons, setLessons, fetchLessons } = useLessons();
  const [editingLesson, setEditingLesson] = useState<any | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleEdit = async (id: string) => {
    const lessonData = lessons.find((l: any) => l.id === id);
    if (lessonData) {
      setEditingLesson(lessonData);
      setIsEditDialogOpen(true);
    }
    console.log('Editing lesson:', editingLesson);
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {lessons.map((item) => (
        <LessonCard
          key={item.id}
          lessonItem={item}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}

      <EditLessonDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        lessonData={editingLesson}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
