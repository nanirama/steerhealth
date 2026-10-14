/** Dependency-free admin constants (safe to import from proxy.ts). */

const SECURE_NAME = '__Host-steer_admin'
const PLAIN_NAME = 'steer_admin'
/** Both names are accepted; the secure one is preferred. */
export const SESSION_COOKIE_NAMES = [SECURE_NAME, PLAIN_NAME] as const

/**
 * Cookies are `Secure` (and use the `__Host-` prefix) when the request arrived over HTTPS, including
 * behind a TLS-terminating proxy (X-Forwarded-Proto). ADMIN_COOKIE_SECURE=true|false overrides.
 * Plain-HTTP local runs (`next start` on http://localhost) therefore still work.
 */
export function cookieSecure(req: Request): boolean {
  const override = (process.env.ADMIN_COOKIE_SECURE ?? '').trim().toLowerCase()
  if (override === 'true') return true
  if (override === 'false') return false
  const proto = req.headers.get('x-forwarded-proto')?.split(',')[0]?.trim() ?? new URL(req.url).protocol.replace(':', '')
  return proto === 'https'
}

export const sessionCookieName = (secure: boolean) => (secure ? SECURE_NAME : PLAIN_NAME)

/** Find the session token in a cookie lookup function (Next cookies() or a parsed header). */
export function findSessionToken(get: (name: string) => string | undefined): string | undefined {
  for (const n of SESSION_COOKIE_NAMES) {
    const v = get(n)
    if (v) return v
  }
  return undefined
}

/** Paths gated by proxy.ts: /admin pages and /api/admin APIs, except login and Sanity Studio. */
export function isProtectedPath(pathname: string): boolean {
  if (pathname === '/admin/login' || pathname === '/api/admin/login') return false
  if (pathname === '/admin/studio' || pathname.startsWith('/admin/studio/')) return false
  return pathname === '/admin' || pathname.startsWith('/admin/') || pathname.startsWith('/api/admin/')
}

/** Only allow same-site relative redirect targets after login. */
export function safeNext(next: string | null | undefined): string {
  return next && /^\/admin(\/|$|\?)/.test(next) && !next.startsWith('//') && !next.startsWith('/admin/login') ? next : '/admin'
}
