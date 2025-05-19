'use server';
import { HTTP } from '@/core/http';
import { prisma } from '@/lib/db';
import createClient from '@/lib/supabase/server';

// GET /api/lessons
export const GET = async () => {
  const supabase = createClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return HTTP.UNAUTHORIZED({ message: 'User not authenticated' });
    }

    const lessons = await prisma.lessons.findMany({
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
      orderBy: {
        created_at: 'desc',
      },
    });

    // Transform the data to include classroom name directly in the lesson object

    return HTTP.SUCCESS({
      message: 'Lessons fetched successfully',
      data: lessons,
    });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return HTTP.BAD_REQUEST({
      message: 'Failed to fetch lessons. Please try again.',
    });
  }
};

// POST /api/lessons
export async function POST(request: Request) {
  const supabase = createClient();
  const formData = await request.json();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return HTTP.UNAUTHORIZED({ message: 'User not authenticated' });
    }

    const newLesson = await prisma.lessons.create({
      data: {
        title: formData.title,
        classroom_id: formData.classId,
        lessontype: formData.lessonType,
        objectives: formData.objectives,
        languagecontent: formData.languageContent,
        prerequisites: formData.prerequisites,
        learningpath: formData.details.learningPath,
        beginning_ritual: formData.details.beginningRitual,
        ending_ritual: formData.details.endingRitual,
        document_type: formData.details.documentType,
        document_format: formData.details.documentFormat,
        grammar: formData.details.grammar,
        vocabulary: formData.details.vocabulary,
        phonetics: formData.details.phonetics,
        communication: formData.details.communication,
        finaltask: formData.details.finalTask,
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
              },
            },
          },
        },
      },
    });

    // Transform the new lesson to match the GET response format
    const transformedLesson = {
      ...newLesson,
      class_name: newLesson.classroom?.class_name || 'Unnamed Class',
      teacher_name:
        newLesson.classroom?.teacher?.full_name || 'Unknown Teacher',
    };

    return HTTP.SUCCESS({
      message: 'Lesson created successfully',
      data: transformedLesson,
    });
  } catch (error) {
    console.error('Error creating lesson:', error);
    return HTTP.BAD_REQUEST({
      message: 'Failed to create lesson. Please try again.',
    });
  } finally {
    await prisma.$disconnect();
  }
}
