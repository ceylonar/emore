import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('superadmin-auth')?.value === 'true';
  const url = request.nextUrl.clone();

  if (request.nextUrl.pathname.startsWith('/superadmin') && !isAuthenticated) {
    url.pathname = '/superadmin-login';
    return NextResponse.redirect(url);
  }

  if (request.nextUrl.pathname === '/superadmin-login' && isAuthenticated) {
    url.pathname = '/superadmin';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/superadmin/:path*', '/superadmin-login'],
};
