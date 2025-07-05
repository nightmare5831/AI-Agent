'use server';

import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const { createdId, name, description, profile_id } = await request.json();
  try {
    const user = await prisma.profile.findUnique({
      where: { id: profile_id },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const newProject = await prisma.projects.create({
      data: {
        profile_id: profile_id,
        createId: createdId,
        name: name,
        description: description,
      },
    });

    return NextResponse.json(
      { message: 'Task created', task: newProject },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};

POST.preferredRegion = ['gru1'];
