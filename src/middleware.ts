import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware is currently not in use but is kept for future reference.
// The authentication logic has been integrated into the individual admin pages.

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
