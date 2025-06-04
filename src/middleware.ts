import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const locales = ['en', 'gr'];
const defaultLocale = 'gr';

const nextIntlMiddleware = createMiddleware({ locales, defaultLocale });

export default function middleware(req: any) {
  const host = req.headers.get('host') || '';
  const protocol = req.headers.get('x-forwarded-proto') || 'http';

  // Create a NextResponse so you can add headers for debugging
  const res = NextResponse.next();
  res.headers.set('x-debug-host', host);
  res.headers.set('x-debug-protocol', protocol);

  // Optionally skip locale middleware if host not your domain
  if (host !== 'iliopoulosrent.com' || host !== 'www.iliopoulosrent.com') {
    return res;
  }

  // Call your next-intl middleware and return its response
  return nextIntlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(en|gr)/:path*', '/((?!_next|_vercel|api|.*\\..*).*)'],
};
