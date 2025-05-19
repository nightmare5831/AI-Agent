import { NextResponse, type NextRequest } from 'next/server';
import createSeverClient from './server';

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = await createSeverClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/auth/';
    redirectUrl.searchParams.set(`redirectTo`, request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}
