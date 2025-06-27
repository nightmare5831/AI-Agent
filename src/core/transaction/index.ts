'use server';

import { prisma } from '@/lib/db';

export async function getTransactionHistory(userId: string) {
  const transaction = await prisma.tasks_log.findMany({
    where: {
      profile_id: userId as string,
    },
    orderBy: {
      timestamp: 'desc',
    },
  });
  return transaction;
}
