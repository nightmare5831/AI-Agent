'use server';

import { prisma } from '@/lib/db';

export async function getTask(userId : string, projectId: string) {
  const tasks = await prisma.tasks_log.findMany({where:{profile_id: userId, project_id:projectId}})
  return tasks;
}