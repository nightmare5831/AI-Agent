'use server';

import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const {
    profile_id,
    agent_type,
    task_type,
    credits_spent,
    output_type,
    agent_results, // optional object: { output_text?, file_url?, image_url? }
  } = await request.json();
  console.log('request', profile_id, output_type)
  try {
    const user = await prisma.profile.findUnique({
      where: { id: profile_id },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    await prisma.profile.update({
      where: { id: profile_id },
      data: {
        credits_balance: {
          decrement: credits_spent,
        },
      },
    });

    const newTask = await prisma.tasks_log.create({
      data: {
        profile_id,
        agent_type,
        task_type,
        credits_spent,
        output_type,
      },
    });

    if (agent_results) {
      await prisma.agent_results.create({
        data: {
          task_id: newTask.id,
          ...agent_results,
        },
      });
    }
    return NextResponse.json(
      { message: 'Task created', task_id: newTask.id },
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