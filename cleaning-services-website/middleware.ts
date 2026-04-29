import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require admin authentication
const PROTECTED_PATHS = ['/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for a protected path
  const isProtected = PROTECTED_PATHS.some(path =>
    pathname === path || pathname.startsWith(path + '/')
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // Check for admin session cookie
  const session = request.cookies.get('admin_session');

  // API routes under /admin can return 401
  if (pathname.startsWith('/api/admin')) {
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }

  // For /admin pages, redirect to login if no session
  if (!session) {
    // The login is handled client-side in the admin page itself
    // We let the page load and the LoginScreen component handles auth
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
