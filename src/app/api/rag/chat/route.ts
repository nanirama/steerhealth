import { getConfig, missingConfig } from '@/lib/rag/config'
import { errorJson, NO_STORE } from '@/lib/rag/http'
import { logger } from '@/lib/rag/observability/logger'
import { inSpan, markError } from '@/lib/rag/observability/tracing'
import { runChat, startChatRun } from '@/lib/rag/pipeline'
import { BodyTooLarge, clientKey, getChatLimiter, readBodyLimited } from '@/lib/rag/security'
import type { StreamEvent } from '@/lib/rag/types'
import { validateChatRequest } from '@/lib/rag/validation'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const cfg = getConfig()
  const run = startChatRun()
  const reject = (status: number, code: string, message: string, headers: Record<string, string> = {}) => {
    logger.warn('rag.request.rejected', { requestId: run.requestId, traceId: run.root.traceId, route: '/api/rag/chat', errorCode: code, status: String(status) })
    markError(run.root, { code })
    run.root.span.setAttribute('http.response.status_code', status)
    run.root.span.end()
    return errorJson(status, code, message, { 'X-Request-Id': run.requestId, ...headers })
  }

  const limit = getChatLimiter().check(clientKey(req.headers))
  if (!limit.allowed) return reject(429, 'rate_limited', 'Too many questions in a short time. Please wait a moment.', { 'Retry-After': String(limit.retryAfterSec) })

  const missing = missingConfig(cfg)
  if (missing.length) {
    logger.error('rag.config.missing', { requestId: run.requestId, missing })
    return reject(503, 'not_configured', 'The assistant is not available right now.')
  }

  let parsed: ReturnType<typeof validateChatRequest>
  try {
    const t = performance.now()
    parsed = await inSpan('rag.validate', run.root, async (h) => {
      const text = await readBodyLimited(req, cfg.maxBodyBytes)
      let body: unknown
      try {
        body = JSON.parse(text)
      } catch {
        return { ok: false as const, code: 'invalid_json', message: 'Request body must be valid JSON.' }
      }
      const v = validateChatRequest(body, { maxQuestionChars: cfg.maxQuestionChars, maxMessages: cfg.maxMessages })
      h.span.setAttribute('rag.validation', v.ok ? 'ok' : v.code)
      return v
    })
    run.validationMs = Math.round((performance.now() - t) * 10) / 10
  } catch (e) {
    if (e instanceof BodyTooLarge) return reject(413, 'body_too_large', 'Request is too large.')
    return reject(400, 'invalid_request', 'Could not read the request.')
  }
  if (!parsed.ok) return reject(400, parsed.code, parsed.message)
  const body = parsed.value

  const abort = new AbortController()
  req.signal.addEventListener('abort', () => abort.abort(), { once: true })
  const encoder = new TextEncoder()

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      let open = true
      const emit = (e: StreamEvent) => {
        if (!open) return
        try {
          controller.enqueue(encoder.encode(JSON.stringify(e) + '\n'))
        } catch {
          open = false
        }
      }
      runChat(run, body, emit, abort.signal)
        .catch((e) => logger.error('rag.request.unhandled', { requestId: run.requestId, errorCode: (e as { code?: string })?.code ?? 'internal_error' }))
        .finally(() => {
          if (open) {
            open = false
            try {
              controller.close()
            } catch {
              /* already closed by the client */
            }
          }
        })
    },
    cancel() {
      abort.abort()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'X-Request-Id': run.requestId,
      'X-Trace-Id': run.root.traceId,
      'X-Accel-Buffering': 'no',
      ...NO_STORE,
    },
  })
}
