import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  if (!req.cookies.has('awz_session')) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
