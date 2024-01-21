import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = /^\/movies(\/|$)/;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SECRET });
  const { pathname } = req.nextUrl;

  // Check if the pathname starts with /movies
  const isProtectedRoute = PROTECTED_ROUTES.test(pathname);
  // If user is trying to access the auth page and is already logged in
  if (token && !isProtectedRoute) {
    return NextResponse.redirect(new URL('/movies', req.url)); // Redirect to dashboard
  }

  // If user is trying to access a protected route and is not logged in
  if (!token && isProtectedRoute) {
    // Replace with your protected routes pattern
    return NextResponse.redirect(new URL('/', req.url)); // Redirect to sign-in
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/movies/:path*', '/', '/reset-password'], // Specify the path you want to protect
};