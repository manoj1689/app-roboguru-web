import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value || '';

  const protectedRoutes = ['/Home', '/Profile']; // List of protected pages

  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect to home/landing if not logged in
  }

  return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
  matcher: ['/Home', '/Profile'], // Protect these routes
};
