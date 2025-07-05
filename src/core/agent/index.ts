'use server';

import { prisma } from '@/lib/db';

export async function getProject(userId : string) {
  const projects = await prisma.tasks_log.findMany({where:{profile_id: userId}})
  return projects;
}