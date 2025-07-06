'use server';

import { prisma } from '@/lib/db';

export async function getProject(userId : string) {
  const projects = await prisma.projects.findMany({where:{profile_id: userId}})
  return projects;
}

export async function deleteProject(userId : string, created: string) {
  const project = await prisma.projects.findUnique({where:{profile_id:userId, createId:created}})
  const response = await prisma.projects.delete({where: {id: project.id}});
  return response.name;
}