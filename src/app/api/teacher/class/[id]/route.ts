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

    const updatedClass = await prisma.classes.update({
      where: {
        id: params.id,
      },
      data: {
        class_name: formData.class_name,
        age_learner: formData.age_learner,
        subject: formData.subject,
        language_level: formData.language_level,
        session_duration: formData.session_duration,
        discipline: formData.problems.discipline,
        lack_motivation: formData.problems.lack_motivation,
        low_turnout: formData.problems.low_turnout,
        lack_space: formData.problems.lack_space,
        cultural: formData.problems.cultural,
        equipment: formData.equipment,
        updated_at: new Date(),
      },
      include: {
        teacher: {
          select: {
            id: true,
            full_name: true,
            email: true,
          },
        },
        students: true,
      },
    });

    return HTTP.SUCCESS({
      message: 'Class updated successfully',
      data: updatedClass,
    });
  } catch (error) {
    console.error('Error updating class:', error);
    return HTTP.BAD_REQUEST({
      message: 'Failed to update class. Please try again.',
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

    // Delete all students associated with the class first
    await prisma.students.deleteMany({
      where: {
        classroom_id: params.id,
      },
    });

    // Then delete the class itself
    await prisma.classes.delete({
      where: {
        id: params.id,
      },
    });

    return HTTP.SUCCESS({
      message: 'Class deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting class:', error);
    return HTTP.BAD_REQUEST({
      message: 'Failed to delete class. Please try again.',
    });
  } finally {
    await prisma.$disconnect();
  }
}
