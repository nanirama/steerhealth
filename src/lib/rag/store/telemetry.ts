/** Writes into the telemetry store. All writes are best-effort and never throw into callers. */
import { getConfig } from '../config.ts'
import { redactText } from '../observability/redact.ts'
import type { PublicSource, RequestRecord } from '../types.ts'
import { applyRetention, getDb, tx } from './db.ts'

let warned = false
function safe<T>(label: string, fn: () => T): T | undefined {
  try {
    return fn()
  } catch (e) {
    if (!warned) {
      warned = true
      process.stderr.write(`[rag] telemetry store write failed (${label}): ${(e as Error).message}\n`)
    }
    return undefined
  }
}

const b = (v: boolean | undefined) => (v === undefined ? null : v ? 1 : 0)
const n = (v: number | null | undefined) => (typeof v === 'number' && Number.isFinite(v) ? v : null)

export interface GenerationAttempt {
  attempt: number
  status: 'success' | 'error'
  errorCode?: string
  durationMs: number
}

export interface RequestTelemetry {
  record: RequestRecord
  conversationId: string
  rerankModel?: string
  sources: PublicSource[]
  attempts: GenerationAttempt[]
  /** Raw texts; stored according to RAG_TRANSCRIPT_MODE (redacted by default). */
  question: string
  answer: string
}

export function transcriptContent(text: string): { content: string | null; redaction: string } {
  const mode = getConfig().transcriptMode
  if (mode === 'off') return { content: null, redaction: 'off' }
  if (mode === 'full') return { content: text, redaction: 'none' }
  return { content: redactText(text), redaction: 'redacted' }
}

export function recordRequest(t: RequestTelemetry): void {
  safe('request', () => {
    const r = t.record
    const ts = Date.parse(r.timestamp)
    const cited = new Set(r.citations?.cited ?? [])
    tx((d) => {
      d.prepare(
        `INSERT INTO conversations(id, started_at, started_ms, last_activity, last_activity_ms) VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET last_activity = excluded.last_activity, last_activity_ms = excluded.last_activity_ms`,
      ).run(t.conversationId, r.timestamp, ts, r.timestamp, ts)
      d.prepare(
        `INSERT OR REPLACE INTO requests (request_id, conversation_id, trace_id, ts, ts_ms, status, error_code, model, embedding_model, rerank_model,
          question_chars, retrieved_count, sources_used, empty_retrieval, input_tokens, output_tokens, thinking_tokens, cached_tokens,
          generation_total_tokens, embedding_tokens, usage_source, cost_generation_usd, cost_embedding_usd, cost_total_usd, pricing_version,
          validation_ms, embedding_ms, vector_search_ms, rerank_ms, context_assembly_ms, generation_ms, generation_first_token_ms, server_ttft_ms,
          citation_ms, total_server_ms, cited_count, invalid_citations, uncited, abstained, generation_attempts, warnings)
         VALUES (${Array(41).fill('?').join(',')})`,
      ).run(
        r.requestId, t.conversationId, r.traceId, r.timestamp, ts, r.status, r.errorCode ?? null, r.model, r.embeddingModel, t.rerankModel || null,
        r.questionChars, r.retrievedCount, r.sourcesUsed, b(r.emptyRetrieval), n(r.usage.inputTokens), n(r.usage.outputTokens), n(r.usage.thinkingTokens),
        n(r.usage.cachedTokens), n(r.usage.generationTotalTokens), n(r.usage.embeddingTokens), r.usage.usageSource, n(r.cost.generationUsd),
        n(r.cost.embeddingUsd), n(r.cost.totalUsd), r.cost.pricingVersion, n(r.timings.validationMs), n(r.timings.embeddingMs), n(r.timings.vectorSearchMs),
        n(r.timings.rerankMs), n(r.timings.contextAssemblyMs), n(r.timings.generationMs), n(r.timings.generationFirstTokenMs), n(r.timings.serverTtftMs),
        n(r.timings.citationMs), n(r.timings.totalServerMs), r.citations ? r.citations.cited.length : null, r.citations ? r.citations.invalid.length : null,
        b(r.citations?.uncitedAnswer), b(r.citations?.abstained), t.attempts.length, JSON.stringify(r.warnings ?? []),
      )
      const att = d.prepare('INSERT OR REPLACE INTO generation_attempts(request_id, attempt, status, error_code, duration_ms) VALUES (?, ?, ?, ?, ?)')
      for (const a of t.attempts) att.run(r.requestId, a.attempt, a.status, a.errorCode ?? null, n(a.durationMs))
      const src = d.prepare('INSERT OR REPLACE INTO retrieved_sources(request_id, n, doc_id, title, content_type, url, top_score, cited, sections) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
      for (const s of t.sources) src.run(r.requestId, s.n, s.docId, s.title, s.contentType, s.url ?? null, s.topScore, cited.has(s.n) ? 1 : 0, JSON.stringify(s.sections))
      const turn = d.prepare('INSERT INTO turns(conversation_id, request_id, role, content, redaction, ts, ts_ms) VALUES (?, ?, ?, ?, ?, ?, ?)')
      const q = transcriptContent(t.question)
      turn.run(t.conversationId, r.requestId, 'user', q.content, q.redaction, r.timestamp, ts)
      if (t.answer || r.status !== 'cancelled') {
        const a = transcriptContent(t.answer || '')
        turn.run(t.conversationId, r.requestId, 'assistant', a.content, a.redaction, r.timestamp, ts + 1)
      }
    })
    applyRetention()
  })
}

/** Client-observed timings reported by the browser after a response completes (set once). */
export function recordClientTimings(requestId: string, ttftMs: number | null, completionMs: number | null): boolean {
  return (
    safe('client_timings', () => {
      const res = getDb()
        .prepare(
          `UPDATE requests SET client_ttft_ms = ?, client_completion_ms = ?
           WHERE request_id = ? AND client_completion_ms IS NULL AND ts_ms > ?`,
        )
        .run(n(ttftMs), n(completionMs), requestId, Date.now() - 15 * 60_000)
      return Number(res.changes) > 0
    }) ?? false
  )
}

export interface EventRow {
  timestamp: string
  level: string
  event: string
  conversationId?: string
  requestId?: string
  traceId?: string
  spanId?: string
  route?: string
  model?: string
  operation?: string
  durationMs?: number
  inputTokens?: number | null
  outputTokens?: number | null
  status?: string
  errorCode?: string
  data?: Record<string, unknown>
}

export function recordEvent(e: EventRow): void {
  safe('event', () => {
    getDb()
      .prepare(
        `INSERT INTO events(ts, ts_ms, level, event, conversation_id, request_id, trace_id, span_id, route, model, operation, duration_ms,
          input_tokens, output_tokens, status, error_code, data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        e.timestamp, Date.parse(e.timestamp), e.level, e.event, e.conversationId ?? null, e.requestId ?? null, e.traceId ?? null, e.spanId ?? null,
        e.route ?? null, e.model ?? null, e.operation ?? null, n(e.durationMs), n(e.inputTokens), n(e.outputTokens), e.status ?? null,
        e.errorCode ?? null, e.data && Object.keys(e.data).length ? JSON.stringify(e.data) : null,
      )
  })
}

export interface SpanRow {
  traceId: string
  spanId: string
  parentSpanId?: string
  name: string
  startTime: string
  durationMs: number
  status: string
  statusMessage?: string
  attributes: Record<string, unknown>
  events: unknown[]
}

export function recordSpan(s: SpanRow): void {
  safe('span', () => {
    getDb()
      .prepare(
        `INSERT OR REPLACE INTO spans(span_id, trace_id, parent_span_id, name, start_time, start_ms, duration_ms, status, status_message, attributes, events)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(s.spanId, s.traceId, s.parentSpanId ?? null, s.name, s.startTime, Date.parse(s.startTime), s.durationMs, s.status, s.statusMessage ?? null, JSON.stringify(s.attributes), JSON.stringify(s.events))
  })
}

export function recordIngestionRun(run: { runId: string; startedAt: string; finishedAt?: string; status: string; dryRun: boolean }): void {
  safe('ingestion', () => {
    getDb()
      .prepare('INSERT OR REPLACE INTO ingestion_runs(run_id, started_at, started_ms, finished_at, status, dry_run, payload) VALUES (?, ?, ?, ?, ?, ?, ?)')
      .run(run.runId, run.startedAt, Date.parse(run.startedAt), run.finishedAt ?? null, run.status, run.dryRun ? 1 : 0, JSON.stringify(run))
  })
}

export function recordEvalRun(run: { runId: string; startedAt: string; datasetVersion: string; cases: number; failedCases: string[] }): void {
  safe('evaluation', () => {
    getDb()
      .prepare('INSERT OR REPLACE INTO eval_runs(run_id, started_at, started_ms, dataset_version, cases, failed, payload) VALUES (?, ?, ?, ?, ?, ?, ?)')
      .run(run.runId, run.startedAt, Date.parse(run.startedAt), run.datasetVersion, run.cases, run.failedCases.length, JSON.stringify(run))
  })
}

export function audit(entry: { username?: string; action: string; target?: string; outcome: 'success' | 'failure' | 'denied'; ipHash?: string; detail?: Record<string, unknown> }): void {
  safe('audit', () => {
    const now = new Date()
    getDb()
      .prepare('INSERT INTO admin_audit(ts, ts_ms, username, action, target, outcome, ip_hash, detail) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
      .run(now.toISOString(), now.getTime(), entry.username ?? null, entry.action, entry.target ?? null, entry.outcome, entry.ipHash ?? null, entry.detail ? JSON.stringify(entry.detail) : null)
  })
}
