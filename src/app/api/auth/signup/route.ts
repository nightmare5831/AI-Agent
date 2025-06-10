'use server';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import createClient from '@/lib/supabase/server';

export const POST = async (request: Request) => {
  try {
    const supabase = createClient();
    const formData = await request.json();

    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() || 'Unknown';

    console.log('ip', ip)
    const existingIp = await prisma.users.findFirst({
      where: { ip_address: ip },
    });
    if(existingIp) {
      return NextResponse.json({message: 'This Ip already created account!'}, {status:409});
    }

    const existingUsers = await prisma.users.findFirst({
      where: { email: formData.email },
    });

    if (existingUsers) {
      return NextResponse.json(
        { message: 'Email is already registered' },
        { status: 409 }
      );
    }

    const {
      data: { user },
      error: signupError,
    } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      },
    });

    if (signupError) {
      console.error('Supabase signup error:', signupError);
      return NextResponse.json(
        { error: 'Failed to sign up user' },
        { status: 500 }
      );
    }

    if (!user) {
      console.warn(
        'Signup succeeded, but user object is null (likely waiting for email confirmation)'
      );
      return NextResponse.json(
        { message: 'Confirmation email sent. Please check your inbox.' },
        { status: 202 }
      );
    }

    await prisma.users.create({
      data: {
        id: user.id,
        name: formData.full_name,
        email: formData.email,
        role: formData.role,
        ip_address: ip
      },
    });
    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
};
