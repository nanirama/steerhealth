/**
 * Admin API handlers (framework-independent: Request -> Response) so they can be unit-tested.
 * Route files under src/app/api/admin/* only delegate here. Every handler authenticates on the
 * server; state-changing handlers additionally require the CSRF token + same-origin request.
 */
import { missingConfig } from '../config.ts'
import { getEvalRun, listEvalRuns, runEvaluation } from '../evaluation.ts'
import { isIngestionRunning, runIngestion } from '../ingest.ts'
import { logger } from '../observability/logger.ts'
import { clientKey } from '../security.ts'
import { auditLog, conversationDetail, errorBreakdown, listConversations, listLogs, overview, parseRange, requestByTrace, series, slowRequests, traceSpans, usageByModel } from '../store/queries.ts'
import { getDb } from '../store/db.ts'
import { audit } from '../store/telemetry.ts'
import {
  GENERIC_LOGIN_ERROR,
  adminConfigured,
  checkLoginRate,
  allSessionTokens,
  clearSessionCookies,
  cookieSecure,
  createSession,
  csrfValid,
  destroySession,
  originAllowed,
  sessionCookie,
  sessionTokenFromRequest,
  validateSession,
  verifyCredentials,
} from './auth.ts'
import type { AdminSession } from './auth.ts'
import { invalidateKbStatus, kbStatus } from './kb-status.ts'

const HEADERS = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
export const json = (data: unknown, status = 200, extra: Record<string, string> = {}) => new Response(JSON.stringify(data), { status, headers: { ...HEADERS, ...extra } })
const fail = (status: number, code: string, message: string, extra: Record<string, string> = {}) => json({ error: { code, message } }, status, extra)

export const ID_RE = /^[A-Za-z0-9_-]{1,80}$/
export const TRACE_RE = /^[0-9a-f]{32}$/

/** Authenticate an admin API request. `mutation` additionally enforces CSRF + Origin. */
export function authenticate(req: Request, opts: { mutation?: boolean } = {}): { session: AdminSession; token: string } | Response {
  const token = sessionTokenFromRequest(req)
  const session = validateSession(token)
  if (!session || !token) return fail(401, 'unauthorized', 'Authentication required.')
  if (opts.mutation && !csrfValid(req, session)) {
    audit({ username: session.username, action: 'csrf_check', target: new URL(req.url).pathname, outcome: 'denied', ipHash: clientKey(req.headers) })
    return fail(403, 'csrf_failed', 'Request could not be verified. Reload the page and try again.')
  }
  return { session, token }
}

// ---------- login / logout / session ------------------------------------------------------------

export async function loginHandler(req: Request): Promise<Response> {
  const ip = clientKey(req.headers)
  if (!originAllowed(req)) return fail(403, 'origin_rejected', 'Request could not be verified.')
  let body: { username?: unknown; password?: unknown }
  try {
    body = (await req.json()) as typeof body
  } catch {
    return fail(400, 'invalid_body', 'Enter your username and password.')
  }
  const username = typeof body.username === 'string' ? body.username.trim().slice(0, 100) : ''
  const password = typeof body.password === 'string' ? body.password.slice(0, 200) : ''
  if (!username || !password) return fail(400, 'missing_fields', 'Enter your username and password.')
  const rate = checkLoginRate(ip, username)
  if (!rate.allowed) {
    audit({ username, action: 'login', outcome: 'denied', ipHash: ip, detail: { reason: 'rate_limited' } })
    return fail(429, 'rate_limited', 'Too many sign-in attempts. Try again later.', { 'Retry-After': String(rate.retryAfterSec) })
  }
  if (!adminConfigured()) {
    logger.error('admin.login.not_configured', { route: '/api/admin/login' })
    return fail(503, 'not_configured', 'Admin sign-in is not configured.')
  }
  const ok = await verifyCredentials(username, password)
  if (!ok) {
    audit({ username, action: 'login', outcome: 'failure', ipHash: ip })
    logger.warn('admin.login.failed', { route: '/api/admin/login', status: 'failure' })
    return fail(401, 'invalid_credentials', GENERIC_LOGIN_ERROR)
  }
  const { token, session } = createSession(username, { ipHash: ip, userAgent: req.headers.get('user-agent') ?? '' })
  audit({ username, action: 'login', outcome: 'success', ipHash: ip })
  logger.info('admin.login.succeeded', { route: '/api/admin/login', status: 'success' })
  return json({ ok: true, expiresAt: new Date(session.expiresMs).toISOString() }, 200, { 'Set-Cookie': sessionCookie(token, session.expiresMs, cookieSecure(req)) })
}

export function logoutHandler(req: Request): Response {
  const auth = authenticate(req, { mutation: true })
  if (auth instanceof Response) {
    // Always clear the cookie, even when the session is already gone.
    return auth.status === 401 ? cleared(json({ ok: true }), req) : auth
  }
  // End every session this browser presents (e.g. a leftover cookie under the other name).
  for (const t of new Set([auth.token, ...allSessionTokens(req)])) destroySession(t)
  audit({ username: auth.session.username, action: 'logout', outcome: 'success', ipHash: clientKey(req.headers) })
  return cleared(json({ ok: true }), req)
}

function cleared(res: Response, req: Request): Response {
  for (const c of clearSessionCookies(cookieSecure(req))) res.headers.append('Set-Cookie', c)
  return res
}

export function sessionHandler(req: Request): Response {
  const auth = authenticate(req)
  if (auth instanceof Response) return auth
  return json({ username: auth.session.username, csrfToken: auth.session.csrfToken, expiresAt: new Date(auth.session.expiresMs).toISOString() })
}

// ---------- read APIs ------------------------------------------------------------------------------

const intParam = (v: string | null, min: number, max: number) => {
  const n = Number(v)
  return v !== null && Number.isFinite(n) ? Math.min(max, Math.max(min, Math.floor(n))) : undefined
}

export async function overviewHandler(req: Request): Promise<Response> {
  const auth = authenticate(req)
  if (auth instanceof Response) return auth
  const p = new URL(req.url).searchParams
  const range = parseRange({ range: p.get('range'), from: p.get('from'), to: p.get('to') })
  const ov = overview(range)
  const kb = await kbStatus().catch(() => null)
  return json({
    ...ov,
    series: series(range),
    slowRequests: slowRequests(range, ov.thresholds.latencyMs),
    byModel: usageByModel(range),
    errors: errorBreakdown(range),
    knowledgeBase: kb ? { documents: kb.source.documents, indexedDocuments: kb.index.indexedDocuments, indexedChunks: kb.index.indexedChunks } : null,
  })
}

export function conversationsHandler(req: Request): Response {
  const auth = authenticate(req)
  if (auth instanceof Response) return auth
  const p = new URL(req.url).searchParams
  const status = p.get('status')
  return json(
    listConversations({
      q: (p.get('q') ?? '').slice(0, 100),
      from: p.get('from') ?? undefined,
      to: p.get('to') ?? undefined,
      status: status === 'success' || status === 'failed' ? status : '',
      slow: p.get('slow') === '1',
      minLatencyMs: intParam(p.get('minLatencyMs'), 0, 600_000),
      contentType: p.get('contentType') ?? undefined,
      model: p.get('model') ?? undefined,
      minTokens: intParam(p.get('minTokens'), 0, 10_000_000),
      minCostUsd: p.get('minCostUsd') ? Math.max(0, Number(p.get('minCostUsd')) || 0) : undefined,
      page: intParam(p.get('page'), 1, 100_000),
      pageSize: intParam(p.get('pageSize'), 5, 100),
    }),
  )
}

export function conversationHandler(req: Request, id: string): Response {
  const auth = authenticate(req)
  if (auth instanceof Response) return auth
  if (!ID_RE.test(id)) return fail(400, 'invalid_id', 'Invalid conversation ID.')
  const c = conversationDetail(id)
  return c ? json(c) : fail(404, 'not_found', 'Conversation not found.')
}

export function logsHandler(req: Request): Response {
  const auth = authenticate(req)
  if (auth instanceof Response) return auth
  const p = new URL(req.url).searchParams
  const check = (v: string | null, re: RegExp) => (v && re.test(v) ? v : undefined)
  for (const [k, re] of [['conversationId', ID_RE], ['requestId', ID_RE], ['traceId', TRACE_RE]] as const) {
    if (p.get(k) && !re.test(p.get(k)!)) return fail(400, 'invalid_filter', `Invalid ${k}.`)
  }
  return json(
    listLogs({
      conversationId: check(p.get('conversationId'), ID_RE),
      requestId: check(p.get('requestId'), ID_RE),
      traceId: check(p.get('traceId'), TRACE_RE),
      q: (p.get('q') ?? '').slice(0, 100),
      level: p.get('level') ?? undefined,
      event: (p.get('event') ?? '').slice(0, 80) || undefined,
      page: intParam(p.get('page'), 1, 100_000),
      pageSize: intParam(p.get('pageSize'), 10, 200),
    }),
  )
}

export function traceHandler(req: Request, traceId: string): Response {
  const auth = authenticate(req)
  if (auth instanceof Response) return auth
  if (!TRACE_RE.test(traceId)) return fail(400, 'invalid_id', 'Invalid trace ID.')
  const spans = traceSpans(traceId)
  if (!spans.length) return fail(404, 'not_found', 'Trace not found (it may not have been sampled or has expired).')
  return json({ traceId, request: requestByTrace(traceId), spans })
}

export function auditHandler(req: Request): Response {
  const auth = authenticate(req)
  if (auth instanceof Response) return auth
  return json({ entries: auditLog(intParam(new URL(req.url).searchParams.get('limit'), 1, 500) ?? 50) })
}

// ---------- evaluations ------------------------------------------------------------------------------

/** Shared via the DB (route handlers and pages may not share module instances). Stale after 2 h. */
export function evaluationState(): { startedAt: string } | null {
  const row = getDb().prepare("SELECT value FROM meta WHERE key = 'eval_running'").get()
  if (!row) return null
  const v = JSON.parse(String(row.value)) as { startedAt: string }
  return Date.now() - Date.parse(v.startedAt) < 2 * 3600_000 ? v : null
}
const setEvaluationState = (v: { startedAt: string } | null) =>
  v ? getDb().prepare("INSERT OR REPLACE INTO meta(key, value) VALUES ('eval_running', ?)").run(JSON.stringify(v)) : getDb().prepare("DELETE FROM meta WHERE key = 'eval_running'").run()

export async function evaluationsHandler(req: Request): Promise<Response> {
  const mutation = req.method === 'POST'
  const auth = authenticate(req, { mutation })
  if (auth instanceof Response) return auth
  if (!mutation) {
    const runId = new URL(req.url).searchParams.get('runId')
    if (runId) {
      if (!/^eval-[0-9TZ-]{10,40}$/.test(runId)) return fail(400, 'invalid_id', 'Invalid run ID.')
      const run = await getEvalRun(runId)
      return run ? json({ run }) : fail(404, 'not_found', 'Evaluation run not found.')
    }
    const runs = await listEvalRuns(30)
    return json({ running: evaluationState(), runs: runs.map((r) => ({ runId: r.runId, startedAt: r.startedAt, datasetVersion: r.datasetVersion, cases: r.cases, failed: r.failedCases.length, aggregates: r.aggregates, config: r.config, passed: r.passed })) })
  }
  if (missingConfig().length) return fail(503, 'not_configured', 'Gemini and Pinecone must be configured to run evaluations.')
  if (evaluationState()) return fail(409, 'evaluation_running', 'An evaluation run is already in progress.')
  const body = (await req.json().catch(() => ({}))) as { skipJudge?: unknown }
  const state = { startedAt: new Date().toISOString() }
  setEvaluationState(state)
  audit({ username: auth.session.username, action: 'evaluation.start', outcome: 'success', ipHash: clientKey(req.headers), detail: { skipJudge: body.skipJudge === true } })
  void runEvaluation({ skipJudge: body.skipJudge === true })
    .catch((e) => logger.error('rag.evaluation.failed', { errorCode: (e as { code?: string }).code ?? 'internal_error' }))
    .finally(() => setEvaluationState(null))
  return json({ started: true, startedAt: state.startedAt }, 202)
}

// ---------- knowledge base ----------------------------------------------------------------------------

let ingestRunning: Promise<unknown> | null = null

export async function knowledgeBaseHandler(req: Request): Promise<Response> {
  const mutation = req.method === 'POST'
  const auth = authenticate(req, { mutation })
  if (auth instanceof Response) return auth
  if (!mutation) return json(await kbStatus(new URL(req.url).searchParams.get('refresh') === '1'))
  if (missingConfig().length) return fail(503, 'not_configured', 'Gemini and Pinecone must be configured to reindex.')
  const body = (await req.json().catch(() => ({}))) as { dryRun?: unknown }
  const dryRun = body.dryRun === true
  if (ingestRunning || (await isIngestionRunning())) return fail(409, 'ingestion_running', 'An ingestion run is already in progress.')
  audit({ username: auth.session.username, action: dryRun ? 'ingestion.preview' : 'ingestion.start', outcome: 'success', ipHash: clientKey(req.headers) })
  if (dryRun) return json({ run: await runIngestion({ dryRun: true }) })
  ingestRunning = runIngestion()
    .catch((e) => logger.error('rag.ingestion.unhandled', { errorCode: (e as { code?: string }).code ?? 'internal_error' }))
    .finally(() => {
      ingestRunning = null
      invalidateKbStatus()
    })
  return json({ started: true }, 202)
}
