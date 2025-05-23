'use server';

import { prisma } from '@/lib/db';

export async function getSubscription(userId : string) {
  const subscription = await prisma.subscriptions.findFirst({where:{user_id: userId}})
  return subscription;
}