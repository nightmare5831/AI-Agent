'use server';

import { HTTP } from '@/core/http';
import { prisma } from '@/lib/db';
import createClient from '@/lib/supabase/server';

export const POST = async (request: Request) => {
  const supabase = createClient();
  const formData = await request.json();
  // Check if class name already exists
  const existingClass = await prisma.classes.findUnique({
    where: { class_name: formData.class_name },
  });

  if (existingClass) {
    return HTTP.BAD_REQUEST({
      message: 'The class already exists.',
    });
  }

  try {
    // Get the current user's session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return HTTP.UNAUTHORIZED({ message: 'User not authenticated' });
    }

    const newClass = await prisma.classes.create({
      data: {
        class_name: formData.class_name,
        teacher: {
          connect: {
            id: session.user.id,
          },
        },
        age_learner: formData.age_learner,
        subject: formData.subject,
        language_level: formData.language_level,
        session_duration: formData.session_duration,
        discipline: formData.problems.discipline,
        lack_motivation: formData.problems.motivation,
        low_turnout: formData.problems.attendance,
        lack_space: formData.problems.space,
        cultural: formData.problems.cultural,
        equipment: formData.equipment,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return HTTP.SUCCESS({
      message: 'Class created successfully',
      data: newClass,
    });
  } catch (error) {
    console.error('Error creating student:', error);
    return HTTP.BAD_REQUEST({
      message: 'Failed to create class. Please try again.',
    });
  }
};

// Add GET route for fetching classes
export const GET = async (request: Request) => {
  const supabase = createClient();

  try {
    // Get the current user's session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return HTTP.UNAUTHORIZED({ message: 'User not authenticated' });
    }

    // Fetch classes where the current user is the teacher
    const classes = await prisma.classes.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    return HTTP.SUCCESS({
      message: 'Classes fetched successfully',
      data: classes,
    });
  } catch (error) {
    console.error('Error fetching classes:', error);
    return HTTP.BAD_REQUEST({
      message: 'Failed to fetch classes. Please try again.',
    });
  }
};
