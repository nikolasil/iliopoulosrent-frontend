import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'gr'],
 
  // Used when no locale matches
  defaultLocale: 'gr'
});
 
export const config = {
  matcher: [
    '/',
    '/(en|gr)/:path*',
    '/((?!_next|_vercel|api|.*\\..*).*)',
  ],
};