import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('superadmin-auth');

  if (request.nextUrl.pathname.startsWith('/superadmin')) {
    if (!cookie || cookie.value !== 'true') {
      return NextResponse.redirect(new URL('/superadmin-login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/superadmin/:path*',
};
