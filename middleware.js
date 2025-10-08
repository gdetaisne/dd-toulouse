import { NextResponse } from 'next/server';

export function middleware(request) {
  // Appliquer les headers Helmet
  const response = NextResponse.next();
  
  // Headers CSP identiques à moverz-fr
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Content-Security-Policy', "frame-ancestors 'self' https://movers-test.gslv.cloud https://*.gslv.cloud; frame-src 'self' https://movers-test.gslv.cloud https://*.gslv.cloud;");
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // PRODUCTION: Permettre l'indexation
  // response.headers.set('X-Robots-Tag', 'noindex, nofollow, nosnippet, noarchive, nocache');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
