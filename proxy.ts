import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_PREFIXES = [
  '/admin',
  '/hr',
  '/accountant',
  '/finance-officer',
  '/revenue-manager',
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('erp_token')?.value;
  const userCookie = request.cookies.get('erp_user')?.value;

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === '/login' && token && userCookie) {
    try {
      const user = JSON.parse(decodeURIComponent(userCookie)) as { role: string };
      const roleMap: Record<string, string> = {
        ADMIN: '/admin',
        HR: '/hr',
        ACCOUNTANT: '/accountant',
        FINANCE_OFFICER: '/finance-officer',
        REVENUE_MANAGER: '/revenue-manager',
      };
      const dest = roleMap[user.role];
      if (dest) {
        return NextResponse.redirect(new URL(dest, request.url));
      }
    } catch {
      // Invalid cookie — let them through to login
    }
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
