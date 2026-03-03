// ─────────────────────────────────────────────────────────────────────────────
// proxy.ts — Next.js 16 route-protection middleware (equivalent of middleware.ts
// in earlier Next.js versions). Runs on the Edge runtime before any page is
// served; never reaches client-side code.
// ─────────────────────────────────────────────────────────────────────────────
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Maps each protected route prefix to the role required to access it
const ROLE_ROUTES: Record<string, string> = {
  '/admin':           'ADMIN',
  '/hr':              'HR',
  '/accountant':      'ACCOUNTANT',
  '/finance-officer': 'FINANCE_OFFICER',
  '/revenue-manager': 'REVENUE_MANAGER',
};

// Maps a role to its home page
const ROLE_HOME: Record<string, string> = {
  ADMIN:           '/admin',
  HR:              '/hr',
  ACCOUNTANT:      '/accountant',
  FINANCE_OFFICER: '/finance-officer',
  REVENUE_MANAGER: '/revenue-manager',
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('erp_token')?.value;
  const role  = request.cookies.get('erp_role')?.value;

  // Find whether this path falls under a protected prefix
  const requiredRole = Object.entries(ROLE_ROUTES).find(
    ([prefix]) => pathname.startsWith(prefix)
  )?.[1];

  // ── Protected route, no token → send to login ──────────────────────────────
  if (requiredRole && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // ── Protected route, wrong role → send to login ────────────────────────────
  if (requiredRole && role && role !== requiredRole) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // ── Already authenticated, trying to visit /login → send to role home ──────
  if (pathname === '/login' && token && role && ROLE_HOME[role]) {
    const url = request.nextUrl.clone();
    url.pathname = ROLE_HOME[role];
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/hr/:path*',
    '/accountant/:path*',
    '/finance-officer/:path*',
    '/revenue-manager/:path*',
    '/login',
  ],
};
