import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  
  // TASK-LEADGEN-02: Normaliser casse (éviter 404 sur /Ville/ vs /ville/)
  const lowerPathname = pathname.toLowerCase();
  if (pathname !== lowerPathname) {
    url.pathname = lowerPathname;
    return NextResponse.redirect(url, 301);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
