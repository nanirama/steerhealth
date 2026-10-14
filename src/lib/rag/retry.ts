/** Bounded retries with exponential backoff + full jitter, and timeout/abort composition. */

export class RagError extends Error {
  code: string
  status?: number
  retryable: boolean
  constructor(code: string, message: string, opts: { status?: number; retryable?: boolean; cause?: unknown } = {}) {
    super(message, { cause: opts.cause })
    this.name = 'RagError'
    this.code = code
    this.status = opts.status
    this.retryable = opts.retryable ?? false
  }
}

/** Map a provider/SDK error to a stable error code without leaking provider details. */
export function classifyError(e: unknown, provider: 'gemini' | 'pinecone'): RagError {
  if (e instanceof RagError) return e
  const err = e as { name?: string; status?: number; code?: string | number; message?: string }
  const msg = String(err?.message ?? e)
  const status = typeof err?.status === 'number' ? err.status : Number(/\b(4\d\d|5\d\d)\b/.exec(msg)?.[1]) || undefined
  if (err?.name === 'AbortError' || /aborted/i.test(msg)) return new RagError('cancelled', 'Request was cancelled', { cause: e })
  if (err?.name === 'TimeoutError' || /timed? ?out/i.test(msg)) return new RagError(`${provider}_timeout`, `${provider} request timed out`, { retryable: true, cause: e })
  if (status === 429 || /RESOURCE_EXHAUSTED|rate limit|quota/i.test(msg)) return new RagError(`${provider}_rate_limited`, `${provider} rate limit or quota exceeded`, { status: 429, retryable: true, cause: e })
  if (status === 401 || status === 403) return new RagError(`${provider}_auth`, `${provider} rejected the credentials`, { status, cause: e })
  if (status === 404) return new RagError(`${provider}_not_found`, `${provider} resource or model not found`, { status, cause: e })
  if (status === 400) return new RagError(`${provider}_bad_request`, `${provider} rejected the request`, { status, cause: e })
  if (status && status >= 500) return new RagError(`${provider}_unavailable`, `${provider} is temporarily unavailable`, { status, retryable: true, cause: e })
  if (/fetch failed|ECONNRESET|ETIMEDOUT|ENOTFOUND|EAI_AGAIN|socket/i.test(msg)) return new RagError(`${provider}_network`, `Network error calling ${provider}`, { retryable: true, cause: e })
  return new RagError(`${provider}_error`, `${provider} request failed`, { status, cause: e })
}

export interface RetryOptions {
  retries: number
  baseDelayMs?: number
  maxDelayMs?: number
  signal?: AbortSignal
  onRetry?: (attempt: number, error: RagError, delayMs: number) => void
  /** Injected for tests. */
  sleep?: (ms: number, signal?: AbortSignal) => Promise<void>
  random?: () => number
}

export const sleep = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason)
    const t = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort)
      resolve()
    }, ms)
    const onAbort = () => {
      clearTimeout(t)
      reject(signal?.reason)
    }
    signal?.addEventListener('abort', onAbort, { once: true })
  })

export function backoffDelay(attempt: number, base: number, max: number, random: () => number): number {
  return Math.round(random() * Math.min(max, base * 2 ** attempt))
}

export async function withRetry<T>(
  fn: (attempt: number) => Promise<T>,
  classify: (e: unknown) => RagError,
  opts: RetryOptions,
): Promise<T> {
  const base = opts.baseDelayMs ?? 250
  const max = opts.maxDelayMs ?? 4000
  const wait = opts.sleep ?? sleep
  const random = opts.random ?? Math.random
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn(attempt)
    } catch (e) {
      const err = classify(e)
      if (opts.signal?.aborted || err.code === 'cancelled' || !err.retryable || attempt >= opts.retries) throw err
      const delay = backoffDelay(attempt, base, max, random)
      opts.onRetry?.(attempt + 1, err, delay)
      await wait(delay, opts.signal)
    }
  }
}

/** Combine the caller's signal (client disconnect) with a per-operation timeout. */
export function timeoutSignal(ms: number, parent?: AbortSignal): AbortSignal {
  const t = AbortSignal.timeout(ms)
  return parent ? AbortSignal.any([parent, t]) : t
}
