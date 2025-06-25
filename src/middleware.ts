import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const locales = ['en', 'gr']; // Match with your routing.ts
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if locale is already in path (e.g., /en or /gr)
  const pathnameLocale = pathname.split('/')[1];
  if (locales.includes(pathnameLocale)) {
    return createMiddleware(routing)(request);
  }

  // Try reading cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

  const finalLocale = locales.includes(cookieLocale || '')
    ? cookieLocale
    : defaultLocale;

  const redirectUrl = new URL(`/${finalLocale}${pathname}`, request.url);
  return Response.redirect(redirectUrl);
}

export const config = {
  matcher: ["/", "/(gr|en)/:path*"]
};
