'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  StudentFilters,
  Filters,
  StudentLevel,
} from '@/components/teacher/students/student-filters';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { AddStudentDialog } from '@/components/teacher/students/add-student-dialog';
import { EditStudentDialog } from '@/components/teacher/students/edit-student-dialog';
import { useLanguage } from '@/components/teacher/language-selector';
import { useStudents } from '@/components/providers/students-provider';
import {
  StudentCard,
  StudentCardSkeleton,
} from '@/components/teacher/students/student-card';
import { toast } from 'sonner';
import { Student } from '@/types';
import Request from '@/lib/request';

export default function StudentsPage() {
  const { t } = useLanguage();
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { students, setStudents, fetchStudents } = useStudents();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [filters, setFilters] = useState<Filters>({
    classroom: 'all',
    level: 'all',
    difficulties: [],
  });

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // Filter by classroom
      if (
        filters.classroom !== 'all' &&
        student.classroom_id !== filters.classroom
      ) {
        return false;
      }

      // Filter by level
      if (filters.level !== 'all') {
        const studentLevel = student.level?.toUpperCase();
        // Handle the case where VERY_GOOD in the database might be stored as "Very Good" or "VERY GOOD"
        const normalizedStudentLevel = studentLevel?.replace(' ', '_');
        if (normalizedStudentLevel !== filters.level) {
          return false;
        }
      }

      // Filter by difficulties
      if (filters.difficulties.length > 0) {
        return filters.difficulties.every((difficulty) => {
          // We consider a difficulty present if its value is greater than 0
          return (
            student[
              difficulty as keyof Pick<
                Student,
                | 'grammar'
                | 'vocabulary'
                | 'phonetics'
                | 'listening'
                | 'speaking'
                | 'reading'
                | 'writing'
                | 'interacting'
              >
            ] > 0
          );
        });
      }

      return true;
    });
  }, [students, filters]);

  const handleEdit = (id: string) => {
    const student = students.find((s) => s.id === id);
    if (student) {
      setEditingStudent(student);
      setIsEditDialogOpen(true);
    }
  };

  const handleAdd = async (student: Student) => {
    setStudents([...students, student]);
    setIsAddStudentOpen(false);
    toast.success('Student information saved successfully!');
    try {
      const response = await Request.Post('/api/teacher/student', student);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          'Failed to save student information. Please try again.'
      );
    }
  };

  const handleSaveEdit = async (updatedStudent: Student) => {
    setStudents(
      students.map((item) =>
        item.id === updatedStudent.id ? updatedStudent : item
      )
    );

    toast.success('Student updated successfully!');
    try {
      const response = await fetch(
        `/api/teacher/student/${updatedStudent.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedStudent),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update student');
      }
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error('Failed to update student');
    }
  };

  const handleDelete = (id: string) => {
    try {
      setStudents(students.filter((student) => student.id !== id));
      toast.success('Student deleted successfully');
      fetch(`/api/teacher/student/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Failed to delete student');
    }
  };

  useEffect(() => {
    const loadStudents = async () => {
      try {
        await fetchStudents();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load lessons');
      } finally {
        setLoading(false);
      }
    };
    loadStudents();
  }, []); //eslint-disable-line

  if (loading) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Student Management</h1>
            <Button onClick={() => setIsAddStudentOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t('buttonTxt.addstudent')}
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <StudentFilters filters={filters} onFiltersChange={setFilters} />
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                  <StudentCardSkeleton key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Student Management</h1>
          <Button onClick={() => setIsAddStudentOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t('buttonTxt.addstudent')}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <StudentFilters filters={filters} onFiltersChange={setFilters} />
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredStudents.length === 0 ? (
                <div className="lg:col-span-3">
                  <Card className="p-8 text-center text-muted-foreground">
                    No students match the selected filters.
                  </Card>
                </div>
              ) : (
                filteredStudents.map((student) => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <AddStudentDialog
          open={isAddStudentOpen}
          onOpenChange={setIsAddStudentOpen}
          onSave={handleAdd}
        />
        <EditStudentDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          studentData={editingStudent}
          onSave={handleSaveEdit}
        />
      </div>
    </div>
  );
}
