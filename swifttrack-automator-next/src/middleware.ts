import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  // Exclude authentication for login and registration routes
  if (request.nextUrl.pathname === '/api/auth' || request.nextUrl.pathname === '/api/auth/register') {
    return NextResponse.next();
  }

  // Get token from cookie
  const token = request.cookies.get('auth-token')?.value;

  // If no token and trying to access protected route, return unauthorized
  if (!token && request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  // For protected routes, verify token
  if (token && request.nextUrl.pathname.startsWith('/api/')) {
    try {
      const user = verifyToken();
      if (!user) {
        return NextResponse.json(
          { success: false, message: 'Invalid token' },
          { status: 401 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
  ],
};