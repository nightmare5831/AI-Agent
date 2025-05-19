'use client';
import { useState, useEffect } from 'react';
import { useClasses } from '@/components/providers/classes-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { EditClassDialog } from '@/components/teacher/classes/edit-class-dialog';
import { CreateClassDialog } from '@/components/teacher/classes/create-class-dialog';
import { ClassCard } from '@/components/teacher/classes/class-card';
import { PlusCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

function ClassCardSkeleton() {
  return (
    <Card className="border-border bg-card shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Skeleton className="h-9 w-48" />
            <Skeleton className="mt-2 h-5 w-64" />
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-lg border border-border bg-card px-4 py-2 shadow-sm">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-1 h-8 w-16" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <ClassCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { classes, setClasses, fetchClasses } = useClasses();
  const [editingClass, setEditingClass] = useState<any | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadClasses = async () => {
      try {
        await fetchClasses();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load lessons');
      } finally {
        setLoading(false);
      }
    };
    loadClasses();
  }, []); //eslint-disable-line

  if (loading) {
    return <LoadingState />;
  }

  if (classes.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        The data does not exist.
      </Card>
    );
  }

  const handleSaveCreat = async (newClass: any) => {
    setClasses([...classes, newClass]);

    try {
      const response = await fetch('/api/teacher/class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClass),
      });
      if (!response.ok) {
        throw new Error('Failed to create class');
      }
    } catch (error) {
      console.error('Error creating class:', error);
      toast.error('Failed to create class');
    }
    setIsConfirmDialogOpen(true);
  };
  const handleEdit = (id: string) => {
    const classData = classes.find((s: any) => s.id === id);
    if (classData) {
      setEditingClass(classData);
      setIsEditDialogOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setClasses(classes.filter((item) => item.id !== id));
      toast.success('Class deleted successfully');
      const response = await fetch(`/api/teacher/class/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete class');
      }
    } catch (error) {
      console.error('Error deleting class:', error);
      toast.error('Failed to delete class');
    }
  };

  const handleSaveEdit = async (updatedClass: any) => {
    setClasses(
      classes.map((classItem) =>
        classItem.id === updatedClass.id ? updatedClass : classItem
      )
    );
    toast.success('Class updated successfully!');
    try {
      const response = await fetch(`/api/teacher/class/${updatedClass.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedClass),
      });
      if (!response.ok) {
        throw new Error('Failed to update class');
      }
    } catch (error) {
      console.error('Error updating class:', error);
      toast.error('Failed to update class. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Class Overview
            </h1>
            <p className="mt-2 text-muted-foreground">
              Browse and manage your classes
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => setIsCreateClassOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Class
            </Button>
            <div className="rounded-lg border border-border bg-card px-4 py-2 shadow-sm">
              <p className="text-sm text-muted-foreground">Total Classes</p>
              <p className="text-2xl font-bold text-foreground">
                {classes.length}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((classItem) => (
            <ClassCard
              key={classItem.id}
              classItem={classItem}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      <EditClassDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        classData={editingClass}
        onSave={handleSaveEdit}
      />
      <CreateClassDialog
        open={isCreateClassOpen}
        onOpenChange={setIsCreateClassOpen}
        onSave={handleSaveCreat}
      />
      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent className="bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Class</AlertDialogTitle>
            <AlertDialogDescription>
              Congratulations you have just created your class successfully. Do
              you want to add information about your learners?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Later</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => router.push('/teacher/students')}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
