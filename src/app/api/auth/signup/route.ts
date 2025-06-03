'use server';

import { HTTP } from '@/core/http';
import { prisma } from '@/lib/db';
import createClient from '@/lib/supabase/server';

export const POST = async (request: Request) => {
  const supabase = createClient();
  const formData = await request.json();

  const existingUsers = await prisma.users.findFirst({
    where: { email: formData.email },
  });

  if (existingUsers) {
    return HTTP.BAD_REQUEST({
      message: 'Email is already registered',
    });
  }
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    console.log(error.message);
    switch (error.message) {
      case 'Email rate limit exceeded':
        return HTTP.BAD_REQUEST({
          message: 'Please try again after some time',
        });
    }

    return HTTP.BAD_REQUEST({ message: 'User registration failed' });
  }

  await prisma.users.create({
    data: {
      id: user.id,
      name: formData.full_name,
      email: formData.email,
      role: formData.role,
    },
  });

  return HTTP.SUCCESS({ message: 'User registered successfully' });
};
