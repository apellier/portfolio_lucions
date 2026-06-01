import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['fr', 'en'];
const defaultLocale = 'fr';

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  // Basic check for language preference
  if (acceptLanguage.toLowerCase().startsWith('en')) {
    return 'en';
  }
  if (acceptLanguage.toLowerCase().includes('en') && !acceptLanguage.includes('fr')) {
    return 'en';
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a valid locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to language sub-path
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip internal paths, static assets and media files
    '/((?!api|_next/static|_next/image|favicon.ico|photos|file.svg|globe.svg|next.svg|window.svg|vercel.svg|Minute.*|Capture.*|.*\\.jpg|.*\\.jpeg|.*\\.png|.*\\.mp4|.*\\.mov).*)',
  ],
};
