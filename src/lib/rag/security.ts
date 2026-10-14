/** Admin authorization and per-client rate limiting for the RAG API routes. */
import crypto from 'node:crypto'
import { getConfig } from './config.ts'

/**
 * Sliding-window limiter, in memory. Correct for the current single-replica deployment; with
 * multiple replicas each pod enforces its own limit (use a shared store such as Redis then).
 */
export class RateLimiter {
  private hits = new Map<string, number[]>()
  limit: number
  windowMs: number
  constructor(limit: number, windowMs = 60_000) {
    this.limit = limit
    this.windowMs = windowMs
  }
  check(key: string, now = Date.now()): { allowed: boolean; retryAfterSec: number; remaining: number } {
    const from = now - this.windowMs
    const list = (this.hits.get(key) ?? []).filter((t) => t > from)
    if (list.length >= this.limit) {
      this.hits.set(key, list)
      return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((list[0] + this.windowMs - now) / 1000)), remaining: 0 }
    }
    list.push(now)
    this.hits.set(key, list)
    if (this.hits.size > 10_000) {
      for (const [k, v] of this.hits) if (!v.some((t) => t > from)) this.hits.delete(k)
    }
    return { allowed: true, retryAfterSec: 0, remaining: this.limit - list.length }
  }
}

let chatLimiter: RateLimiter | undefined
export function getChatLimiter() {
  chatLimiter ??= new RateLimiter(getConfig().rateLimitPerMinute)
  return chatLimiter
}

/** Client key for rate limiting: first X-Forwarded-For hop (set by the ingress), else a constant. */
export function clientKey(headers: Headers): string {
  const fwd = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const real = headers.get('x-real-ip')?.trim()
  const ip = fwd || real || 'unknown'
  return crypto.createHash('sha256').update(ip).digest('hex').slice(0, 16)
}

/** Read a request body as text, enforcing a byte limit even without Content-Length. */
export async function readBodyLimited(req: Request, maxBytes: number): Promise<string> {
  const declared = Number(req.headers.get('content-length') ?? '0')
  if (declared > maxBytes) throw new BodyTooLarge()
  if (!req.body) return ''
  const reader = req.body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    total += value.byteLength
    if (total > maxBytes) {
      await reader.cancel()
      throw new BodyTooLarge()
    }
    chunks.push(value)
  }
  return new TextDecoder().decode(Buffer.concat(chunks))
}

export class BodyTooLarge extends Error {
  constructor() {
    super('Request body too large')
  }
}
