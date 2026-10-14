/**
 * POST /api/rag/client-metrics — the browser reports client-observed TTFT and completion latency
 * for a request it just received. Accepted once per request, only within 15 minutes of the request,
 * bounded values, rate-limited. The server never claims to measure browser receipt time itself.
 */
import { errorJson, json } from './http.ts'
import { RateLimiter, clientKey } from './security.ts'
import { recordClientTimings } from './store/telemetry.ts'

const limiter = new RateLimiter(60, 60_000)
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const bounded = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 600_000 ? Math.round(v * 10) / 10 : null)

export async function clientMetricsHandler(req: Request): Promise<Response> {
  if (!limiter.check(clientKey(req.headers)).allowed) return errorJson(429, 'rate_limited', 'Too many requests.')
  const text = await req.text().catch(() => '')
  if (text.length > 1000) return errorJson(413, 'body_too_large', 'Request is too large.')
  let body: { requestId?: unknown; ttftMs?: unknown; completionMs?: unknown }
  try {
    body = JSON.parse(text)
  } catch {
    return errorJson(400, 'invalid_json', 'Invalid JSON.')
  }
  if (typeof body.requestId !== 'string' || !UUID.test(body.requestId)) return errorJson(400, 'invalid_request_id', 'Invalid requestId.')
  const ttft = bounded(body.ttftMs)
  const completion = bounded(body.completionMs)
  if (completion === null) return errorJson(400, 'invalid_timing', 'completionMs must be 0-600000.')
  if (ttft !== null && ttft > completion) return errorJson(400, 'invalid_timing', 'ttftMs cannot exceed completionMs.')
  return json({ recorded: recordClientTimings(body.requestId, ttft, completion) })
}
