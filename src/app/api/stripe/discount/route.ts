'use server';

import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const { profile_id, project_id, agent_type, agent_results, credits_spent } = await request.json();

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

    const exist = await prisma.tasks_log.findMany({
      where: { profile_id: profile_id, project_id: project_id },
    });
    let newTask = null;
    if (exist.length > 0) {
      let flag = false;
      let id = '';
      exist.map((task: any) => {
        if (task.agent_type === agent_type) {
          flag = true;
          id = task.id;
        }
      });

      if (flag) {
        newTask = await prisma.tasks_log.update({
          where: { id: id },
          data: {
            agent_results: agent_results,
          },
        });
        return NextResponse.json(
          { message: 'Task updated', task: newTask },
          { status: 200 }
        );
      }
    }

    newTask = await prisma.tasks_log.create({
      data: {
        profile_id,
        project_id,
        agent_type,
        agent_results,
        credits_spent,
      },
    });
    return NextResponse.json(
      { message: 'Task created', task: newTask },
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
