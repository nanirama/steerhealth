/**
 * Read queries for the admin dashboard. Everything is filtered, aggregated and paginated in SQL;
 * percentiles use ALL latency values in the selected window (not a sample), nearest-rank.
 *
 * Metric definitions (window = [from, to) on request timestamp):
 *  - Questions: chat requests that reached the pipeline (rejected/invalid requests are not counted).
 *  - Successful: status success or abstained (completed with an answer or an abstention).
 *  - Failed: status error or timeout. Cancelled: client aborted (excluded from error rate & latency).
 *  - Error rate: failed / (successful + failed).
 *  - Latency (avg/p50/p95/p99): total_server_ms of successful requests.
 *  - TTFT: server_ttft_ms of successful requests (client TTFT shown separately when reported).
 *  - Tokens: sums over requests with provider-reported usage; embedding tokens counted separately.
 *  - Cost: sum of per-request estimates (list prices; not billed amounts).
 *  - Retrieval failure rate: (empty retrieval + requests failed with an embedding/Pinecone error) / questions.
 *  - Conversations: distinct conversations with at least one request in the window.
 */
import { getConfig } from '../config.ts'
import { getDb } from './db.ts'
import { ensureLegacyImport } from './legacy-import.ts'

type Row = Record<string, unknown>
const num = (v: unknown): number | null => (v === null || v === undefined ? null : Number(v))

// ---------- time range -----------------------------------------------------------------------

export const RANGES = { '15m': 15 * 60_000, '1h': 3600_000, '24h': 86400_000, '7d': 7 * 86400_000, '30d': 30 * 86400_000 } as const
export type RangeKey = keyof typeof RANGES | 'custom'

export interface TimeRange {
  key: RangeKey
  fromMs: number
  toMs: number
  label: string
  bucketMs: number
}

const BUCKETS: [number, number][] = [
  [3600_000, 60_000], // <= 1h: 1 min
  [6 * 3600_000, 10 * 60_000],
  [2 * 86400_000, 3600_000],
  [8 * 86400_000, 6 * 3600_000],
  [Infinity, 86400_000],
]

export function parseRange(params: { range?: string | null; from?: string | null; to?: string | null }, now = Date.now()): TimeRange {
  let key = (params.range ?? '24h') as RangeKey
  let fromMs: number
  let toMs = now
  if (key === 'custom') {
    const f = params.from ? Date.parse(params.from) : NaN
    const t = params.to ? Date.parse(params.to) : NaN
    if (Number.isFinite(f) && Number.isFinite(t) && t > f && t - f <= 366 * 86400_000) {
      fromMs = f
      // A date-only "to" includes that whole day.
      toMs = /^\d{4}-\d{2}-\d{2}$/.test(params.to ?? '') ? t + 86400_000 : t
    } else {
      key = '24h'
      fromMs = now - RANGES['24h']
    }
  } else {
    if (!(key in RANGES)) key = '24h'
    fromMs = now - RANGES[key as keyof typeof RANGES]
  }
  const span = toMs - fromMs
  const bucketMs = BUCKETS.find(([max]) => span <= max)![1]
  const labels: Record<string, string> = { '15m': 'Last 15 minutes', '1h': 'Last hour', '24h': 'Last 24 hours', '7d': 'Last 7 days', '30d': 'Last 30 days' }
  const label = key === 'custom' ? `${new Date(fromMs).toISOString().slice(0, 16).replace('T', ' ')} – ${new Date(toMs).toISOString().slice(0, 16).replace('T', ' ')} UTC` : labels[key]
  return { key, fromMs, toMs, label, bucketMs }
}

// ---------- percentiles ----------------------------------------------------------------------

export type Pct = { value: number | null; samples: number; sufficient: boolean }

export function percentileOf(sorted: number[], p: number, minSamples: number): Pct {
  if (sorted.length < Math.max(1, minSamples)) return { value: null, samples: sorted.length, sufficient: false }
  const rank = Math.ceil((p / 100) * sorted.length)
  return { value: sorted[Math.min(sorted.length - 1, Math.max(0, rank - 1))], samples: sorted.length, sufficient: true }
}

function values(sql: string, ...args: (string | number)[]): number[] {
  return getDb()
    .prepare(sql)
    .all(...args)
    .map((r) => Number(r.v))
    .filter(Number.isFinite)
    .sort((a, b) => a - b)
}

// ---------- overview ----------------------------------------------------------------------------

const COMPLETED = "status IN ('success','abstained')"
const FAILED = "status IN ('error','timeout')"
const RETRIEVAL_ERRORS = "(error_code LIKE 'pinecone%' OR error_code = 'index_missing' OR error_code LIKE 'embedding%')"

export interface StageStats {
  stage: string
  label: string
  samples: number
  avg: number | null
  p50: Pct
  p95: Pct
  p99: Pct
}

export function overview(range: TimeRange) {
  ensureLegacyImport()
  const cfg = getConfig()
  const d = getDb()
  const w = [range.fromMs, range.toMs] as const
  const k = d
    .prepare(
      `SELECT COUNT(*) AS questions,
        COUNT(DISTINCT conversation_id) AS conversations,
        SUM(CASE WHEN ${COMPLETED} THEN 1 ELSE 0 END) AS successful,
        SUM(CASE WHEN ${FAILED} THEN 1 ELSE 0 END) AS failed,
        SUM(CASE WHEN status = 'timeout' THEN 1 ELSE 0 END) AS timeouts,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled,
        SUM(CASE WHEN status = 'abstained' THEN 1 ELSE 0 END) AS abstained,
        SUM(CASE WHEN empty_retrieval = 1 OR ${RETRIEVAL_ERRORS} THEN 1 ELSE 0 END) AS retrieval_failures,
        SUM(CASE WHEN usage_source = 'provider' THEN input_tokens ELSE 0 END) AS input_tokens,
        SUM(CASE WHEN usage_source = 'provider' THEN output_tokens ELSE 0 END) AS output_tokens,
        SUM(CASE WHEN usage_source = 'provider' THEN thinking_tokens ELSE 0 END) AS thinking_tokens,
        SUM(CASE WHEN usage_source = 'provider' THEN generation_total_tokens ELSE 0 END) AS generation_tokens,
        SUM(embedding_tokens) AS embedding_tokens,
        SUM(CASE WHEN usage_source = 'provider' THEN 1 ELSE 0 END) AS with_usage,
        SUM(cost_total_usd) AS cost_usd,
        SUM(CASE WHEN cost_total_usd IS NULL THEN 1 ELSE 0 END) AS cost_unknown,
        SUM(CASE WHEN generation_attempts > 1 THEN generation_attempts - 1 ELSE 0 END) AS retries,
        MAX(ts) AS last_request
       FROM requests WHERE ts_ms >= ? AND ts_ms < ?`,
    )
    .get(...w) as Row
  const successful = Number(k.successful ?? 0)
  const failed = Number(k.failed ?? 0)
  const questions = Number(k.questions ?? 0)
  return {
    range,
    generatedAt: new Date().toISOString(),
    lastRequestAt: (k.last_request as string | null) ?? null,
    conversations: Number(k.conversations ?? 0),
    questions,
    successful,
    failed,
    timeouts: Number(k.timeouts ?? 0),
    cancelled: Number(k.cancelled ?? 0),
    abstained: Number(k.abstained ?? 0),
    errorRate: successful + failed ? failed / (successful + failed) : null,
    retrievalFailureRate: questions ? Number(k.retrieval_failures ?? 0) / questions : null,
    retries: Number(k.retries ?? 0),
    tokens: {
      input: Number(k.input_tokens ?? 0),
      output: Number(k.output_tokens ?? 0),
      thinking: Number(k.thinking_tokens ?? 0),
      generation: Number(k.generation_tokens ?? 0),
      embedding: Number(k.embedding_tokens ?? 0),
      requestsWithUsage: Number(k.with_usage ?? 0),
    },
    costUsd: num(k.cost_usd),
    costUnknownRequests: Number(k.cost_unknown ?? 0),
    latency: stageStats(range),
    thresholds: { latencyMs: cfg.latencyTargetMs, ttftMs: cfg.ttftTargetMs },
    minSamples: cfg.minSamples,
  }
}

const STAGES: [string, string][] = [
  ['total_server_ms', 'Total server latency'],
  ['client_completion_ms', 'Client-observed completion'],
  ['server_ttft_ms', 'Time to first token (server)'],
  ['client_ttft_ms', 'Time to first token (client)'],
  ['embedding_ms', 'Query embedding'],
  ['vector_search_ms', 'Pinecone vector search'],
  ['rerank_ms', 'Reranking'],
  ['context_assembly_ms', 'Context assembly'],
  ['generation_ms', 'Gemini generation'],
  ['citation_ms', 'Citation validation'],
]

export function stageStats(range: TimeRange): StageStats[] {
  const m = getConfig().minSamples
  return STAGES.map(([col, label]) => {
    const v = values(`SELECT ${col} AS v FROM requests WHERE ts_ms >= ? AND ts_ms < ? AND ${COMPLETED} AND ${col} IS NOT NULL`, range.fromMs, range.toMs)
    return {
      stage: col,
      label,
      samples: v.length,
      avg: v.length ? v.reduce((a, b) => a + b, 0) / v.length : null,
      p50: percentileOf(v, 50, m.p50),
      p95: percentileOf(v, 95, m.p95),
      p99: percentileOf(v, 99, m.p99),
    }
  })
}

/** Time-bucketed series: request counts, errors, latency percentiles, tokens and cost. */
export function series(range: TimeRange) {
  const m = getConfig().minSamples
  const rows = getDb()
    .prepare(
      `SELECT ts_ms, status, total_server_ms, server_ttft_ms, input_tokens, output_tokens, embedding_tokens, cost_total_usd, usage_source
       FROM requests WHERE ts_ms >= ? AND ts_ms < ? ORDER BY ts_ms`,
    )
    .all(range.fromMs, range.toMs)
  const start = Math.floor(range.fromMs / range.bucketMs) * range.bucketMs
  const count = Math.min(500, Math.ceil((range.toMs - start) / range.bucketMs))
  const buckets = Array.from({ length: count }, (_, i) => ({ t: start + i * range.bucketMs, lat: [] as number[], requests: 0, errors: 0, input: 0, output: 0, embedding: 0, cost: 0 }))
  for (const r of rows) {
    const i = Math.floor((Number(r.ts_ms) - start) / range.bucketMs)
    const b = buckets[i]
    if (!b) continue
    b.requests++
    if (r.status === 'error' || r.status === 'timeout') b.errors++
    if ((r.status === 'success' || r.status === 'abstained') && r.total_server_ms !== null) b.lat.push(Number(r.total_server_ms))
    if (r.usage_source === 'provider') {
      b.input += Number(r.input_tokens ?? 0)
      b.output += Number(r.output_tokens ?? 0)
    }
    b.embedding += Number(r.embedding_tokens ?? 0)
    b.cost += Number(r.cost_total_usd ?? 0)
  }
  return {
    bucketMs: range.bucketMs,
    points: buckets.map((b) => {
      const s = b.lat.sort((x, y) => x - y)
      return {
        t: new Date(b.t).toISOString(),
        requests: b.requests,
        errors: b.errors,
        samples: s.length,
        p50: percentileOf(s, 50, m.p50).value,
        p95: percentileOf(s, 95, m.p95).value,
        p99: percentileOf(s, 99, m.p99).value,
        inputTokens: b.input,
        outputTokens: b.output,
        embeddingTokens: b.embedding,
        costUsd: b.cost,
      }
    }),
  }
}

export function slowRequests(range: TimeRange, thresholdMs: number, limit = 20) {
  return getDb()
    .prepare(
      `SELECT request_id, conversation_id, trace_id, ts, status, total_server_ms, server_ttft_ms, client_ttft_ms, embedding_ms,
        vector_search_ms, rerank_ms, generation_ms
       FROM requests WHERE ts_ms >= ? AND ts_ms < ? AND total_server_ms IS NOT NULL
       ORDER BY total_server_ms DESC LIMIT ?`,
    )
    .all(range.fromMs, range.toMs, Math.min(100, limit))
    .map((r) => ({
      requestId: String(r.request_id),
      conversationId: String(r.conversation_id),
      traceId: String(r.trace_id),
      ts: String(r.ts),
      status: String(r.status),
      totalMs: num(r.total_server_ms),
      ttftMs: num(r.client_ttft_ms) ?? num(r.server_ttft_ms),
      retrievalMs: r.vector_search_ms === null && r.embedding_ms === null ? null : Number(r.embedding_ms ?? 0) + Number(r.vector_search_ms ?? 0) + Number(r.rerank_ms ?? 0),
      generationMs: num(r.generation_ms),
      overThreshold: Number(r.total_server_ms) > thresholdMs,
    }))
}

export function usageByModel(range: TimeRange) {
  return getDb()
    .prepare(
      `SELECT model, COUNT(*) AS requests,
        SUM(CASE WHEN usage_source='provider' THEN input_tokens ELSE 0 END) AS input,
        SUM(CASE WHEN usage_source='provider' THEN output_tokens ELSE 0 END) AS output,
        SUM(CASE WHEN usage_source='provider' THEN thinking_tokens ELSE 0 END) AS thinking,
        SUM(embedding_tokens) AS embedding, SUM(cost_total_usd) AS cost
       FROM requests WHERE ts_ms >= ? AND ts_ms < ? GROUP BY model ORDER BY requests DESC`,
    )
    .all(range.fromMs, range.toMs)
    .map((r) => ({ model: String(r.model ?? 'unknown'), requests: Number(r.requests), input: Number(r.input ?? 0), output: Number(r.output ?? 0), thinking: Number(r.thinking ?? 0), embedding: Number(r.embedding ?? 0), costUsd: num(r.cost) }))
}

export function errorBreakdown(range: TimeRange) {
  return getDb()
    .prepare(`SELECT error_code, COUNT(*) AS n FROM requests WHERE ts_ms >= ? AND ts_ms < ? AND ${FAILED} GROUP BY error_code ORDER BY n DESC`)
    .all(range.fromMs, range.toMs)
    .map((r) => ({ code: String(r.error_code ?? 'unknown'), count: Number(r.n) }))
}

// ---------- conversations ----------------------------------------------------------------------

export interface ConversationFilters {
  q?: string
  from?: string
  to?: string
  status?: 'success' | 'failed' | ''
  slow?: boolean
  minLatencyMs?: number
  contentType?: string
  model?: string
  minTokens?: number
  minCostUsd?: number
  page?: number
  pageSize?: number
}

export function listConversations(f: ConversationFilters) {
  ensureLegacyImport()
  const cfg = getConfig()
  const where: string[] = []
  const args: (string | number)[] = []
  const having: string[] = []
  const hargs: (string | number)[] = []
  const q = (f.q ?? '').trim()
  if (q) {
    where.push('(r.conversation_id = ? OR r.conversation_id IN (SELECT conversation_id FROM requests WHERE request_id = ? OR trace_id = ?))')
    args.push(q, q, q)
  }
  const from = f.from ? Date.parse(f.from) : NaN
  const to = f.to ? Date.parse(f.to) : NaN
  if (Number.isFinite(from)) {
    where.push('r.ts_ms >= ?')
    args.push(from)
  }
  if (Number.isFinite(to)) {
    where.push('r.ts_ms < ?')
    args.push(/^\d{4}-\d{2}-\d{2}$/.test(f.to ?? '') ? to + 86400_000 : to)
  }
  if (f.model) {
    where.push('r.model = ?')
    args.push(f.model)
  }
  if (f.contentType) {
    where.push('EXISTS (SELECT 1 FROM retrieved_sources s WHERE s.request_id = r.request_id AND s.content_type = ?)')
    args.push(f.contentType)
  }
  if (f.status === 'failed') having.push("SUM(CASE WHEN r.status IN ('error','timeout') THEN 1 ELSE 0 END) > 0")
  if (f.status === 'success') having.push("SUM(CASE WHEN r.status IN ('error','timeout') THEN 1 ELSE 0 END) = 0")
  if (f.slow) {
    having.push('MAX(r.total_server_ms) > ?')
    hargs.push(cfg.latencyTargetMs)
  }
  if (f.minLatencyMs && f.minLatencyMs > 0) {
    having.push('MAX(r.total_server_ms) >= ?')
    hargs.push(f.minLatencyMs)
  }
  if (f.minTokens && f.minTokens > 0) {
    having.push('SUM(COALESCE(r.generation_total_tokens, 0)) >= ?')
    hargs.push(f.minTokens)
  }
  if (f.minCostUsd && f.minCostUsd > 0) {
    having.push('SUM(COALESCE(r.cost_total_usd, 0)) >= ?')
    hargs.push(f.minCostUsd)
  }
  const pageSize = Math.min(100, Math.max(5, f.pageSize ?? 25))
  const page = Math.max(1, Math.floor(f.page ?? 1))
  const base = `FROM requests r ${where.length ? `WHERE ${where.join(' AND ')}` : ''} GROUP BY r.conversation_id ${having.length ? `HAVING ${having.join(' AND ')}` : ''}`
  const d = getDb()
  const total = Number((d.prepare(`SELECT COUNT(*) AS n FROM (SELECT r.conversation_id ${base})`).get(...args, ...hargs) as Row).n)
  const rows = d
    .prepare(
      `SELECT r.conversation_id AS id, MIN(r.ts) AS started, MAX(r.ts) AS last_activity, COUNT(*) AS questions,
        SUM(CASE WHEN r.status IN ('success','abstained') THEN 1 ELSE 0 END) AS responses,
        SUM(CASE WHEN r.usage_source='provider' THEN r.input_tokens ELSE 0 END) AS input_tokens,
        SUM(CASE WHEN r.usage_source='provider' THEN r.output_tokens ELSE 0 END) AS output_tokens,
        SUM(COALESCE(r.generation_total_tokens, 0)) AS total_tokens,
        SUM(COALESCE(r.generation_ms, 0)) AS generation_ms,
        AVG(CASE WHEN r.status IN ('success','abstained') THEN r.total_server_ms END) AS avg_latency_ms,
        MAX(r.total_server_ms) AS max_latency_ms,
        SUM(r.cost_total_usd) AS cost_usd,
        SUM(CASE WHEN r.status IN ('error','timeout') THEN 1 ELSE 0 END) AS errors
       ${base} ORDER BY MAX(r.ts_ms) DESC LIMIT ? OFFSET ?`,
    )
    .all(...args, ...hargs, pageSize, (page - 1) * pageSize)
  return {
    total,
    page,
    pageSize,
    pages: Math.max(1, Math.ceil(total / pageSize)),
    rows: rows.map((r) => ({
      id: String(r.id),
      startedAt: String(r.started),
      lastActivity: String(r.last_activity),
      questions: Number(r.questions),
      responses: Number(r.responses),
      inputTokens: Number(r.input_tokens ?? 0),
      outputTokens: Number(r.output_tokens ?? 0),
      totalTokens: Number(r.total_tokens ?? 0),
      generationMs: Number(r.generation_ms ?? 0),
      avgLatencyMs: num(r.avg_latency_ms),
      maxLatencyMs: num(r.max_latency_ms),
      costUsd: num(r.cost_usd),
      errors: Number(r.errors ?? 0),
      status: Number(r.errors ?? 0) > 0 ? 'has errors' : 'ok',
    })),
  }
}

export function filterOptions() {
  const d = getDb()
  return {
    models: d.prepare('SELECT DISTINCT model FROM requests WHERE model IS NOT NULL ORDER BY model').all().map((r) => String(r.model)),
    contentTypes: d.prepare('SELECT DISTINCT content_type FROM retrieved_sources WHERE content_type IS NOT NULL ORDER BY content_type').all().map((r) => String(r.content_type)),
  }
}

export function requestRow(r: Row) {
  return {
    requestId: String(r.request_id),
    conversationId: String(r.conversation_id),
    traceId: String(r.trace_id),
    ts: String(r.ts),
    status: String(r.status),
    errorCode: (r.error_code as string | null) ?? null,
    model: (r.model as string | null) ?? null,
    embeddingModel: (r.embedding_model as string | null) ?? null,
    rerankModel: (r.rerank_model as string | null) ?? null,
    retrievedCount: num(r.retrieved_count),
    sourcesUsed: num(r.sources_used),
    emptyRetrieval: Number(r.empty_retrieval) === 1,
    usageSource: String(r.usage_source ?? 'unavailable'),
    inputTokens: num(r.input_tokens),
    outputTokens: num(r.output_tokens),
    thinkingTokens: num(r.thinking_tokens),
    cachedTokens: num(r.cached_tokens),
    generationTotalTokens: num(r.generation_total_tokens),
    embeddingTokens: num(r.embedding_tokens),
    costUsd: num(r.cost_total_usd),
    costGenerationUsd: num(r.cost_generation_usd),
    costEmbeddingUsd: num(r.cost_embedding_usd),
    pricingVersion: (r.pricing_version as string | null) ?? null,
    timings: {
      validationMs: num(r.validation_ms),
      embeddingMs: num(r.embedding_ms),
      vectorSearchMs: num(r.vector_search_ms),
      rerankMs: num(r.rerank_ms),
      contextAssemblyMs: num(r.context_assembly_ms),
      generationMs: num(r.generation_ms),
      generationFirstTokenMs: num(r.generation_first_token_ms),
      serverTtftMs: num(r.server_ttft_ms),
      citationMs: num(r.citation_ms),
      totalServerMs: num(r.total_server_ms),
      clientTtftMs: num(r.client_ttft_ms),
      clientCompletionMs: num(r.client_completion_ms),
    },
    citedCount: num(r.cited_count),
    invalidCitations: num(r.invalid_citations),
    uncited: Number(r.uncited) === 1,
    abstained: Number(r.abstained) === 1,
    generationAttempts: num(r.generation_attempts),
    warnings: r.warnings ? (JSON.parse(String(r.warnings)) as string[]) : [],
  }
}
export type RequestView = ReturnType<typeof requestRow>

export function conversationDetail(id: string) {
  ensureLegacyImport()
  const d = getDb()
  const reqs = d.prepare('SELECT * FROM requests WHERE conversation_id = ? ORDER BY ts_ms').all(id).map(requestRow)
  if (!reqs.length) return null
  const turns = d.prepare('SELECT request_id, role, content, redaction, ts FROM turns WHERE conversation_id = ? ORDER BY ts_ms, id').all(id)
  const sources = d.prepare(`SELECT s.* FROM retrieved_sources s JOIN requests r ON r.request_id = s.request_id WHERE r.conversation_id = ? ORDER BY s.request_id, s.n`).all(id)
  const attempts = d.prepare(`SELECT a.* FROM generation_attempts a JOIN requests r ON r.request_id = a.request_id WHERE r.conversation_id = ? ORDER BY a.request_id, a.attempt`).all(id)
  const ok = reqs.filter((r) => r.status === 'success' || r.status === 'abstained')
  const sum = (xs: (number | null)[]) => xs.reduce<number>((a, b) => a + (b ?? 0), 0)
  return {
    id,
    startedAt: reqs[0].ts,
    endedAt: reqs[reqs.length - 1].ts,
    turns: reqs.length,
    summary: {
      inputTokens: sum(reqs.filter((r) => r.usageSource === 'provider').map((r) => r.inputTokens)),
      outputTokens: sum(reqs.filter((r) => r.usageSource === 'provider').map((r) => r.outputTokens)),
      generationTokens: sum(reqs.map((r) => r.generationTotalTokens)),
      embeddingTokens: reqs.some((r) => r.embeddingTokens !== null) ? sum(reqs.map((r) => r.embeddingTokens)) : null,
      cumulativeLatencyMs: sum(reqs.map((r) => r.timings.totalServerMs)),
      avgLatencyMs: ok.length ? sum(ok.map((r) => r.timings.totalServerMs)) / ok.length : null,
      costUsd: reqs.some((r) => r.costUsd !== null) ? sum(reqs.map((r) => r.costUsd)) : null,
      errors: reqs.filter((r) => r.status === 'error' || r.status === 'timeout').length,
    },
    requests: reqs.map((r) => ({
      ...r,
      turns: turns.filter((t) => t.request_id === r.requestId).map((t) => ({ role: String(t.role), content: (t.content as string | null) ?? null, redaction: String(t.redaction), ts: String(t.ts) })),
      sources: sources.filter((s) => s.request_id === r.requestId).map((s) => ({ n: Number(s.n), docId: String(s.doc_id), title: String(s.title ?? ''), contentType: String(s.content_type ?? ''), url: (s.url as string | null) ?? null, topScore: num(s.top_score), cited: Number(s.cited) === 1, sections: s.sections ? (JSON.parse(String(s.sections)) as string[]) : [] })),
      attempts: attempts.filter((a) => a.request_id === r.requestId).map((a) => ({ attempt: Number(a.attempt), status: String(a.status), errorCode: (a.error_code as string | null) ?? null, durationMs: num(a.duration_ms) })),
    })),
  }
}
export type ConversationView = NonNullable<ReturnType<typeof conversationDetail>>

// ---------- logs & traces ------------------------------------------------------------------------

export interface LogFilters {
  conversationId?: string
  requestId?: string
  traceId?: string
  q?: string
  level?: string
  event?: string
  fromMs?: number
  toMs?: number
  page?: number
  pageSize?: number
}

export function listLogs(f: LogFilters) {
  ensureLegacyImport()
  const where: string[] = []
  const args: (string | number)[] = []
  const eq = (col: string, v?: string) => {
    if (v) {
      where.push(`${col} = ?`)
      args.push(v)
    }
  }
  eq('conversation_id', f.conversationId)
  eq('request_id', f.requestId)
  eq('trace_id', f.traceId)
  if (f.q?.trim()) {
    where.push('(request_id = ? OR trace_id = ? OR conversation_id = ?)')
    args.push(f.q.trim(), f.q.trim(), f.q.trim())
  }
  const levels = ['debug', 'info', 'warn', 'error']
  if (f.level && levels.includes(f.level)) {
    where.push(`level IN (${levels.slice(levels.indexOf(f.level)).map(() => '?').join(',')})`)
    args.push(...levels.slice(levels.indexOf(f.level)))
  }
  if (f.event) {
    where.push('event LIKE ?')
    args.push(`${f.event.replace(/[%_]/g, '')}%`)
  }
  if (f.fromMs) {
    where.push('ts_ms >= ?')
    args.push(f.fromMs)
  }
  if (f.toMs) {
    where.push('ts_ms < ?')
    args.push(f.toMs)
  }
  const pageSize = Math.min(200, Math.max(10, f.pageSize ?? 50))
  const page = Math.max(1, Math.floor(f.page ?? 1))
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : ''
  const d = getDb()
  const total = Number((d.prepare(`SELECT COUNT(*) AS n FROM events ${clause}`).get(...args) as Row).n)
  const rows = d.prepare(`SELECT * FROM events ${clause} ORDER BY ts_ms DESC, id DESC LIMIT ? OFFSET ?`).all(...args, pageSize, (page - 1) * pageSize)
  return {
    total,
    page,
    pageSize,
    pages: Math.max(1, Math.ceil(total / pageSize)),
    rows: rows.map((r) => ({
      id: Number(r.id),
      ts: String(r.ts),
      level: String(r.level),
      event: String(r.event),
      conversationId: (r.conversation_id as string | null) ?? null,
      requestId: (r.request_id as string | null) ?? null,
      traceId: (r.trace_id as string | null) ?? null,
      spanId: (r.span_id as string | null) ?? null,
      route: (r.route as string | null) ?? null,
      model: (r.model as string | null) ?? null,
      operation: (r.operation as string | null) ?? null,
      durationMs: num(r.duration_ms),
      inputTokens: num(r.input_tokens),
      outputTokens: num(r.output_tokens),
      status: (r.status as string | null) ?? null,
      errorCode: (r.error_code as string | null) ?? null,
      data: r.data ? (JSON.parse(String(r.data)) as Record<string, unknown>) : null,
    })),
  }
}

export function eventTypes(): string[] {
  return getDb().prepare('SELECT DISTINCT event FROM events ORDER BY event LIMIT 200').all().map((r) => String(r.event))
}

export function traceSpans(traceId: string) {
  if (!/^[0-9a-f]{32}$/.test(traceId)) return []
  ensureLegacyImport()
  return getDb()
    .prepare('SELECT * FROM spans WHERE trace_id = ? ORDER BY start_ms, rowid')
    .all(traceId)
    .map((s) => ({
      spanId: String(s.span_id),
      parentSpanId: (s.parent_span_id as string | null) ?? null,
      traceId: String(s.trace_id),
      name: String(s.name),
      startTime: String(s.start_time),
      startMs: Number(s.start_ms),
      durationMs: Number(s.duration_ms),
      status: String(s.status),
      statusMessage: (s.status_message as string | null) ?? null,
      attributes: JSON.parse(String(s.attributes ?? '{}')) as Record<string, string | number | boolean>,
      events: JSON.parse(String(s.events ?? '[]')) as { name: string; timeOffsetMs: number }[],
    }))
}
export type SpanView = ReturnType<typeof traceSpans>[number]

export function requestByTrace(traceId: string) {
  const r = getDb().prepare('SELECT request_id, conversation_id FROM requests WHERE trace_id = ?').get(traceId)
  return r ? { requestId: String(r.request_id), conversationId: String(r.conversation_id) } : null
}

export function auditLog(limit = 50) {
  return getDb()
    .prepare('SELECT ts, username, action, target, outcome FROM admin_audit ORDER BY ts_ms DESC LIMIT ?')
    .all(Math.min(500, limit))
    .map((r) => ({ ts: String(r.ts), username: (r.username as string | null) ?? null, action: String(r.action), target: (r.target as string | null) ?? null, outcome: String(r.outcome) }))
}
