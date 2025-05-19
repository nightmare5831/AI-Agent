'use server';
import { HTTP } from '@/core/http';
import { prisma } from '@/lib/db';
import createClient from '@/lib/supabase/server';
import { NextRequest } from 'next/server';

export async function GET(
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

    const lesson = await prisma.lessons.findUnique({
      where: {
        id: params.id,
      },
      include: {
        classroom: {
          select: {
            id: true,
            class_name: true,
            age_learner: true,
            subject: true,
            language_level: true,
            session_duration: true,
            discipline: true,
            lack_motivation: true,
            low_turnout: true,
            lack_space: true,
            cultural: true,
            equipment: true,
            teacher: {
              select: {
                full_name: true,
                email: true,
              },
            },
            students: {
              select: {
                id: true,
                full_name: true,
                level: true,
                learningconsiderations: true,
                grammar: true,
                vocabulary: true,
                phonetics: true,
                listening: true,
                speaking: true,
                reading: true,
                writing: true,
                interacting: true,
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      return HTTP.HTTP_NOT_FOUND({ message: 'Lesson not found' });
    }

    // Transform the lesson data to include classroom and student information

    return HTTP.SUCCESS({
      message: 'Lesson fetched successfully',
      data: lesson,
    });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return HTTP.BAD_REQUEST({
      message: 'Failed to fetch lesson. Please try again.',
    });
  } finally {
    await prisma.$disconnect();
  }
}

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
    console.log('formData: ', formData);

    const updatedLesson = await prisma.lessons.update({
      where: {
        id: params.id,
      },
      data: {
        classroom_id: formData.classroom.id,
        title: formData.title,
        lessontype: formData.lessontype,
        objectives: formData.objectives,
        languagecontent: formData.languagecontent,
        prerequisites: formData.prerequisites,
        learningpath: formData.learningPath,
        beginning_ritual: formData.beginning_ritual,
        ending_ritual: formData.ending_ritual,
        document_type: formData.document_type,
        document_format: formData.document_format,
        grammar: formData.grammar,
        vocabulary: formData.vocabulary,
        phonetics: formData.phonetics,
        communication: formData.communication,
        finaltask: formData.finaltask,
        created_at: new Date(),
        updated_at: new Date(),
      },
      include: {
        classroom: {
          select: {
            class_name: true,
            teacher: {
              select: {
                full_name: true,
                email: true,
              },
            },
            students: {
              select: {
                id: true,
                full_name: true,
                level: true,
                learningconsiderations: true,
                grammar: true,
                vocabulary: true,
                phonetics: true,
                listening: true,
                speaking: true,
                reading: true,
                writing: true,
                interacting: true,
              },
            },
          },
        },
      },
    });

    const transformedLesson = {
      ...updatedLesson,
      students: updatedLesson.classroom?.students || [],
    };

    return HTTP.SUCCESS({
      message: 'Lesson updated successfully',
      data: transformedLesson,
    });
  } catch (error) {
    console.error('Error updating lesson:', error);
    return HTTP.BAD_REQUEST({
      message: 'Failed to update lesson. Please try again.',
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

    await prisma.lessons.delete({
      where: {
        id: params.id,
      },
    });

    return HTTP.SUCCESS({
      message: 'Lesson deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting lesson:', error);
    return HTTP.BAD_REQUEST({
      message: 'Failed to delete lesson. Please try again.',
    });
  } finally {
    await prisma.$disconnect();
  }
}
