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

    // Ignore static files, assets, and APIs programmatically
    if (
      pathname.includes('.') ||
      pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/photos/')
    ) {
      return;
    }

    // Check if pathname already has a valid locale
    const pathnameHasLocale = locales.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect to language sub-path
    const locale = getLocale(request);
    const redirectPath = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
    
    const redirectUrl = new URL(redirectPath, request.url);
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Proxy routing error:", error);
    // Fallback redirect to default locale using standard URL constructor
    const fallbackUrl = new URL('/fr', request.url);
    return NextResponse.redirect(fallbackUrl);
  }
}

export const config = {
  matcher: [
    // Run proxy on all paths except Next.js static internals and standard favicon
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
