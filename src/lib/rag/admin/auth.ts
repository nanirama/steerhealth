/**
 * Administrator authentication for /admin.
 *
 * - Single administrator configured by ADMIN_USERNAME + ADMIN_PASSWORD_HASH (server-only env).
 * - Password hash: scrypt (Node crypto) in the form `scrypt:N:r:p:<salt b64url>:<hash b64url>`
 *   (no `$`, so Next's env loader does not try to expand it). Generate with `npm run admin:hash-password`.
 * - Server-side sessions in the telemetry DB: the cookie holds a random 256-bit token, the DB stores
 *   only its SHA-256. Absolute expiry (ADMIN_SESSION_TTL_HOURS) + idle timeout (ADMIN_SESSION_IDLE_MINUTES).
 * - Cookie: HttpOnly, SameSite=Strict, Path=/; Secure + `__Host-` prefix whenever served over HTTPS.
 * - CSRF: state-changing requests need a matching Origin (or Referer) AND the per-session CSRF token
 *   in the `x-csrf-token` header.
 * - Login attempts are rate-limited per client and per username; failures return one generic message.
 */
import crypto from 'node:crypto'
import { getConfig } from '../config.ts'
import { RateLimiter } from '../security.ts'
import { getDb } from '../store/db.ts'

import { SESSION_COOKIE_NAMES, findSessionToken, sessionCookieName } from './paths.ts'
export { cookieSecure, findSessionToken, isProtectedPath } from './paths.ts'
export const GENERIC_LOGIN_ERROR = 'Invalid username or password.'

// ---------- password hashing ----------------------------------------------------------------

const SCRYPT_DEFAULT = { N: 32768, r: 8, p: 1, keylen: 64 }

function scrypt(password: string, salt: Buffer, N: number, r: number, p: number, keylen: number): Promise<Buffer> {
  return new Promise((resolve, reject) =>
    crypto.scrypt(password, salt, keylen, { N, r, p, maxmem: 256 * N * r }, (err, key) => (err ? reject(err) : resolve(key))),
  )
}

export async function hashPassword(password: string, opts = SCRYPT_DEFAULT): Promise<string> {
  if (password.length < 6) throw new Error('Password must be at least 6 characters')
  const salt = crypto.randomBytes(16)
  const key = await scrypt(password, salt, opts.N, opts.r, opts.p, opts.keylen)
  return ['scrypt', opts.N, opts.r, opts.p, salt.toString('base64url'), key.toString('base64url')].join(':')
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split(':')
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false
  const [N, r, p] = parts.slice(1, 4).map(Number)
  if (![N, r, p].every((x) => Number.isInteger(x) && x > 0) || N > 2 ** 20) return false
  const salt = Buffer.from(parts[4], 'base64url')
  const expected = Buffer.from(parts[5], 'base64url')
  const actual = await scrypt(password, salt, N, r, p, expected.length)
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected)
}

// A throwaway hash so failed usernames cost the same as failed passwords (no timing oracle).
let dummyHash: Promise<string> | undefined
const getDummyHash = () => (dummyHash ??= hashPassword(crypto.randomBytes(16).toString('hex')))

const safeEqual = (a: string, b: string) => {
  const x = crypto.createHash('sha256').update(a).digest()
  const y = crypto.createHash('sha256').update(b).digest()
  return crypto.timingSafeEqual(x, y)
}

export function adminConfigured(): boolean {
  const { username, passwordHash } = getConfig().admin
  return Boolean(username && passwordHash.startsWith('scrypt:'))
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const cfg = getConfig().admin
  if (!adminConfigured()) {
    await verifyPassword(password, await getDummyHash())
    return false
  }
  const userOk = safeEqual(username, cfg.username)
  const passOk = await verifyPassword(password, userOk ? cfg.passwordHash : await getDummyHash())
  return userOk && passOk
}

// ---------- login rate limiting -------------------------------------------------------------

let byClient: RateLimiter | undefined
let byUser: RateLimiter | undefined

export function checkLoginRate(clientHash: string, username: string, now = Date.now()): { allowed: boolean; retryAfterSec: number } {
  const cfg = getConfig().admin
  const windowMs = cfg.loginWindowMinutes * 60_000
  byClient ??= new RateLimiter(cfg.loginMaxAttempts, windowMs)
  byUser ??= new RateLimiter(cfg.loginMaxAttempts * 2, windowMs)
  const a = byClient.check(clientHash, now)
  const b = byUser.check(`u:${username.toLowerCase()}`, now)
  return { allowed: a.allowed && b.allowed, retryAfterSec: Math.max(a.retryAfterSec, b.retryAfterSec) }
}

export function resetLoginRateForTests() {
  byClient = undefined
  byUser = undefined
}

// ---------- sessions --------------------------------------------------------------------------

export interface AdminSession {
  username: string
  csrfToken: string
  createdMs: number
  expiresMs: number
}

const sha = (s: string) => crypto.createHash('sha256').update(s).digest('hex')

export function createSession(username: string, meta: { ipHash?: string; userAgent?: string } = {}, now = Date.now()): { token: string; session: AdminSession } {
  const cfg = getConfig().admin
  const token = crypto.randomBytes(32).toString('base64url')
  const session: AdminSession = { username, csrfToken: crypto.randomBytes(24).toString('base64url'), createdMs: now, expiresMs: now + cfg.sessionTtlHours * 3600_000 }
  getDb()
    .prepare('INSERT INTO admin_sessions(id_hash, username, csrf_token, created_ms, expires_ms, last_seen_ms, ip_hash, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .run(sha(token), username, session.csrfToken, now, session.expiresMs, now, meta.ipHash ?? null, (meta.userAgent ?? '').slice(0, 200))
  return { token, session }
}

export function validateSession(token: string | undefined | null, now = Date.now()): AdminSession | null {
  if (!token || token.length > 100) return null
  const cfg = getConfig().admin
  const d = getDb()
  const row = d.prepare('SELECT * FROM admin_sessions WHERE id_hash = ?').get(sha(token))
  if (!row) return null
  const expires = Number(row.expires_ms)
  const lastSeen = Number(row.last_seen_ms)
  if (now >= expires || now - lastSeen > cfg.sessionIdleMinutes * 60_000 || String(row.username) !== cfg.username) {
    d.prepare('DELETE FROM admin_sessions WHERE id_hash = ?').run(sha(token))
    return null
  }
  if (now - lastSeen > 60_000) d.prepare('UPDATE admin_sessions SET last_seen_ms = ? WHERE id_hash = ?').run(now, sha(token))
  return { username: String(row.username), csrfToken: String(row.csrf_token), createdMs: Number(row.created_ms), expiresMs: expires }
}

export function destroySession(token: string | undefined | null): void {
  if (token) getDb().prepare('DELETE FROM admin_sessions WHERE id_hash = ?').run(sha(token))
}

// ---------- cookies & CSRF --------------------------------------------------------------------

export function readCookie(header: string | null, name: string): string | undefined {
  if (!header) return undefined
  for (const part of header.split(';')) {
    const i = part.indexOf('=')
    if (i > 0 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim())
  }
  return undefined
}

export function sessionCookie(token: string, expiresMs: number, secure: boolean): string {
  const attrs = [`${sessionCookieName(secure)}=${encodeURIComponent(token)}`, 'Path=/', 'HttpOnly', 'SameSite=Strict', `Expires=${new Date(expiresMs).toUTCString()}`]
  if (secure) attrs.push('Secure')
  return attrs.join('; ')
}

/** Clear both possible cookie names (the `__Host-` one must carry Secure to be accepted). */
export function clearSessionCookies(secure: boolean): string[] {
  const clear = (name: string, s: boolean) => [`${name}=`, 'Path=/', 'HttpOnly', 'SameSite=Strict', 'Expires=Thu, 01 Jan 1970 00:00:00 GMT', 'Max-Age=0', ...(s ? ['Secure'] : [])].join('; ')
  return [clear(sessionCookieName(true), true), clear(sessionCookieName(false), secure)]
}

/** Every session token presented by the request (both cookie names). */
export function allSessionTokens(req: Request): string[] {
  const header = req.headers.get('cookie')
  return SESSION_COOKIE_NAMES.map((n) => readCookie(header, n)).filter((t): t is string => Boolean(t))
}

export function sessionTokenFromRequest(req: Request): string | undefined {
  const header = req.headers.get('cookie')
  return findSessionToken((name) => readCookie(header, name))
}

/** Same-origin check for state-changing requests. */
export function originAllowed(req: Request): boolean {
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
  const allowed = new Set<string>()
  if (host) {
    allowed.add(`https://${host}`)
    allowed.add(`http://${host}`)
  }
  const extra = getConfig().admin.allowedOrigin
  if (extra) allowed.add(extra.replace(/\/$/, ''))
  const origin = req.headers.get('origin')
  if (origin) return allowed.has(origin)
  const referer = req.headers.get('referer')
  if (!referer) return false
  try {
    return allowed.has(new URL(referer).origin)
  } catch {
    return false
  }
}

export function csrfValid(req: Request, session: AdminSession): boolean {
  const token = req.headers.get('x-csrf-token') ?? ''
  return token.length > 0 && safeEqual(token, session.csrfToken) && originAllowed(req)
}
