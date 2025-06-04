import createMiddleware from 'next-intl/middleware';

const locales = ['en', 'gr'];
const defaultLocale = 'gr';

export default async function middleware(req: any) {
  // Extract host and protocol from headers (Cloudflare forwards these)
  const host = req.headers.get('host') || '';
  const protocol = req.headers.get('x-forwarded-proto') || 'http';
  console.log('Host:', host, 'Protocol:', protocol);
  // Optionally: enforce this middleware only on your domain
  if (host !== 'iliopoulosrent.com') {
    // Skip or handle differently if needed
    return;
  }

  // Here you can call next-intl middleware normally
  const nextIntlMiddleware = createMiddleware({
    locales,
    defaultLocale,
  });

  // Call the next-intl middleware with the request
  return nextIntlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(en|gr)/:path*', '/((?!_next|_vercel|api|.*\\..*).*)'],
};
