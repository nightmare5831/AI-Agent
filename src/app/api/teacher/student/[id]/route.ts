'use server';
import { HTTP } from '@/core/http';
import { prisma } from '@/lib/db';
import createClient from '@/lib/supabase/server';
import { NextRequest } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return HTTP.UNAUTHORIZED({ message: 'User not authenticated' });
    }

    const formData = await request.json();
    console.log(formData);

    // Transform the formData to match the database schema
    // Add student_name field to update operation
    const updatedStudent = await prisma.students.update({
      where: {
        id: params.id,
      },
      data: {
        full_name: formData.full_name,
        classroom_id: formData.classroom_id,
        level: formData.level,
        learningconsiderations: formData.learningconsiderations,
        grammar: formData.grammar || formData.skills?.grammar || 0,
        vocabulary: formData.vocabulary || formData.skills?.vocabulary || 0,
        phonetics: formData.phonetics || formData.skills?.phonetics || 0,
        listening: formData.listening || formData.skills?.listening || 0,
        speaking: formData.speaking || formData.skills?.speaking || 0,
        reading: formData.reading || formData.skills?.reading || 0,
        writing: formData.writing || formData.skills?.writing || 0,
        interacting: formData.interacting || formData.skills?.interacting || 0,
        updated_at: new Date(),
      },
      include: {
        classroom: {
          select: {
            id: true,
            class_name: true,
          },
        },
      },
    });

    return HTTP.SUCCESS({
      message: 'Student updated successfully',
      data: updatedStudent,
    });
  } catch (error) {
    console.error('Error updating student:', error);
    return HTTP.BAD_REQUEST({
      message: 'Failed to update student. Please try again.',
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return HTTP.UNAUTHORIZED({ message: 'User not authenticated' });
    }

    await prisma.students.delete({
      where: {
        id: params.id,
      },
    });

    return HTTP.SUCCESS({
      message: 'Student deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    return HTTP.BAD_REQUEST({
      message: 'Failed to delete student. Please try again.',
    });
  } finally {
    await prisma.$disconnect();
  }
}
