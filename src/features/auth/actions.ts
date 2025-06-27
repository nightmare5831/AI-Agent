'use server';

import { prisma } from '@/lib/db';

export const getProfile = async (id: string) => {
  const profile = await prisma.profile.findUnique({
    where: {
      id,
    },
  });

  return profile;
};
