/**
 * First-line gate for the admin area: requests to /admin/* and /api/admin/* without a session
 * cookie are redirected to /admin/login (pages) or rejected with 401 (APIs). This only checks that
 * a cookie is present; every admin page and API validates the session again on the server.
 * Sanity Studio (/admin/studio) and the login endpoints are excluded.
 */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { findSessionToken, isProtectedPath } from '@/lib/rag/admin/paths'

const NO_CACHE = { 'Cache-Control': 'no-store, max-age=0', Vary: 'Cookie' }

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl
  if (!isProtectedPath(pathname)) return NextResponse.next()
  if (findSessionToken((n) => req.cookies.get(n)?.value)) return NextResponse.next()
  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: { code: 'unauthorized', message: 'Authentication required.' } }, { status: 401, headers: NO_CACHE })
  }
  const login = new URL('/admin/login', req.url)
  login.searchParams.set('next', pathname + search)
  // Never let the browser cache this redirect: after sign-in the same URL must load the page.
  const res = NextResponse.redirect(login)
  for (const [k, v] of Object.entries(NO_CACHE)) res.headers.set(k, v)
  return res
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
}
