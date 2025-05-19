'use server';

import { HTTP } from '@/core/http';
import { prisma } from '@/lib/db';
import createClient from '@/lib/supabase/server';

export const GET = async () => {
  const supabase = createClient();

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return HTTP.UNAUTHORIZED({ message: 'User not authenticated' });
    }

    // Get all students with their classroom information, but not student_info
    // since that's causing the Prisma error
    const students = await prisma.students.findMany({
      include: {
        classroom: true, // Include related classroom data
      },
    });

    // If needed, fetch profiles separately and join manually
    const studentIds = students.map((student) => student.id);
    const profiles = await prisma.profiles.findMany({
      where: {
        id: {
          in: studentIds,
        },
      },
    });

    // Map profiles to students
    const studentsWithProfiles = students.map((student) => {
      const profile = profiles.find((p) => p.id === student.id);
      return {
        ...student,
        student_info: profile ? { full_name: profile.full_name } : undefined,
      };
    });

    return HTTP.SUCCESS({
      message: 'Students fetched successfully',
      data: studentsWithProfiles,
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    return HTTP.BAD_REQUEST({
      message: 'Failed to fetch students. Please try again.',
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (request: Request) => {
  const supabase = createClient();
  const formData = await request.json();

  try {
    // Get the current user's session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return HTTP.UNAUTHORIZED({ message: 'User not authenticated' });
    }

    // Create new student in the database
    const newStudent = await prisma.students.create({
      data: {
        id: formData.id,
        full_name: formData.full_name,
        classroom_id: formData.classroom_id,
        level: formData.level,
        learningconsiderations: formData.learningconsiderations,
        grammar: formData.grammar,
        vocabulary: formData.vocabulary,
        phonetics: formData.phonetics,
        listening: formData.listening,
        speaking: formData.speaking,
        reading: formData.reading,
        writing: formData.writing,
        interacting: formData.interacting,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return HTTP.SUCCESS({
      message: 'Student created successfully',
      data: newStudent,
    });
  } catch (error) {
    console.error('Error creating student:', error);
    return HTTP.BAD_REQUEST({
      message: 'Failed to create student. Please try again.',
    });
  } finally {
    await prisma.$disconnect();
  }
};
