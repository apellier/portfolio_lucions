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
  try {
    const { pathname } = request.nextUrl;

    // Check if pathname already has a valid locale
    const pathnameHasLocale = locales.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect to language sub-path
    const locale = getLocale(request);
    const redirectPath = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
    
    const url = request.nextUrl.clone();
    url.pathname = redirectPath;
    
    return NextResponse.redirect(url);
  } catch (error) {
    console.error("Proxy routing error:", error);
    // Fallback redirect to default locale
    const fallbackUrl = request.nextUrl.clone();
    fallbackUrl.pathname = '/fr';
    return NextResponse.redirect(fallbackUrl);
  }
}

export const config = {
  matcher: [
    // Skip internal paths, static assets and media files (any path containing a dot ".")
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
