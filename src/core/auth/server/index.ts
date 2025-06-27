'use server';

import { prisma } from '@/lib/db';
import createClient from '@/lib/supabase/server';
export async function getCurrentUser() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getCurrentProfile() {
  const user = await getCurrentUser();

  if (!user) return null;
  const profile = await prisma.profile.findFirst({ where: { id: user.id } });
  if (!profile) {
    return null
  }

  return profile;
}