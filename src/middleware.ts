import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware is no longer needed as we are using the main authentication flow
// and protecting the layout directly.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
