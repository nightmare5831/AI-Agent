'use server';

import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const {
    user_id,
    agent_type,
    task_type,
    credits_spent,
    output_type,
    agent_results, // optional object: { output_text?, file_url?, image_url? }
  } = await request.json();
  console.log('request', user_id, output_type)
  try {
    const user = await prisma.users.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    await prisma.users.update({
      where: { id: user_id },
      data: {
        credits_balance: {
          decrement: credits_spent,
        },
      },
    });

    const newTask = await prisma.tasks_log.create({
      data: {
        user_id,
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
