/**
 * One-time import of telemetry recorded before the SQLite store existed (LOG_DIR/requests-*,
 * traces-*, app-*, ingestion-*.jsonl). Real measurements only; legacy requests have no stored
 * transcript or retrieved-source rows. Guarded by a meta flag so it runs once per database.
 */
import fs from 'node:fs'
import path from 'node:path'
import { getConfig } from '../config.ts'
import type { RequestRecord } from '../types.ts'
import { getDb, tx } from './db.ts'

let checked = false

function readJsonl(prefix: string): Record<string, unknown>[] {
  const dir = getConfig().logDir
  if (!fs.existsSync(dir)) return []
  const out: Record<string, unknown>[] = []
  for (const f of fs.readdirSync(dir).filter((n) => n.startsWith(prefix) && n.endsWith('.jsonl')).sort()) {
    for (const line of fs.readFileSync(path.join(dir, f), 'utf8').split('\n')) {
      if (!line.trim()) continue
      try {
        out.push(JSON.parse(line))
      } catch {
        /* partial line */
      }
    }
  }
  return out
}

export function ensureLegacyImport(): void {
  if (checked) return
  checked = true
  const d = getDb()
  if (d.prepare("SELECT value FROM meta WHERE key = 'legacy_import'").get()) return
  const n = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : null)
  const counts = { requests: 0, spans: 0, events: 0, ingestion: 0 }
  tx(() => {
    for (const raw of readJsonl('requests-')) {
      const r = raw as unknown as RequestRecord
      if (!r.requestId || !r.timestamp) continue
      const conv = r.conversationId ?? `single-${r.requestId}`
      const ts = Date.parse(r.timestamp)
      d.prepare(
        `INSERT INTO conversations(id, started_at, started_ms, last_activity, last_activity_ms) VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET last_activity = MAX(last_activity, excluded.last_activity), last_activity_ms = MAX(last_activity_ms, excluded.last_activity_ms)`,
      ).run(conv, r.timestamp, ts, r.timestamp, ts)
      const t = r.timings ?? ({} as RequestRecord['timings'])
      const u = r.usage ?? ({} as RequestRecord['usage'])
      d.prepare(
        `INSERT OR IGNORE INTO requests(request_id, conversation_id, trace_id, ts, ts_ms, status, error_code, model, embedding_model, question_chars,
          retrieved_count, sources_used, empty_retrieval, input_tokens, output_tokens, thinking_tokens, cached_tokens, generation_total_tokens,
          embedding_tokens, usage_source, cost_generation_usd, cost_embedding_usd, cost_total_usd, pricing_version, validation_ms, embedding_ms,
          vector_search_ms, rerank_ms, context_assembly_ms, generation_ms, generation_first_token_ms, server_ttft_ms, citation_ms, total_server_ms,
          cited_count, invalid_citations, uncited, abstained, generation_attempts, warnings)
         VALUES (${Array(40).fill('?').join(',')})`,
      ).run(
        r.requestId, conv, r.traceId, r.timestamp, ts, r.status, r.errorCode ?? null, r.model ?? null, r.embeddingModel ?? null, n(r.questionChars),
        n(r.retrievedCount), n(r.sourcesUsed), r.emptyRetrieval ? 1 : 0, n(u.inputTokens), n(u.outputTokens), n(u.thinkingTokens), n(u.cachedTokens),
        n(u.generationTotalTokens), n(u.embeddingTokens), u.usageSource ?? 'unavailable', n(r.cost?.generationUsd), n(r.cost?.embeddingUsd), n(r.cost?.totalUsd),
        r.cost?.pricingVersion ?? null, n(t.validationMs), n(t.embeddingMs), n(t.vectorSearchMs), n(t.rerankMs), n(t.contextAssemblyMs), n(t.generationMs),
        n(t.generationFirstTokenMs), n(t.serverTtftMs), n(t.citationMs), n(t.totalServerMs), r.citations ? r.citations.cited.length : null,
        r.citations ? r.citations.invalid.length : null, r.citations?.uncitedAnswer ? 1 : 0, r.citations?.abstained ? 1 : 0, null, '["Imported from legacy JSONL; no transcript or sources stored."]',
      )
      counts.requests++
    }
    for (const s of readJsonl('traces-')) {
      if (!s.spanId || !s.traceId || !s.startTime) continue
      d.prepare(
        `INSERT OR IGNORE INTO spans(span_id, trace_id, parent_span_id, name, start_time, start_ms, duration_ms, status, status_message, attributes, events)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ).run(String(s.spanId), String(s.traceId), (s.parentSpanId as string) ?? null, String(s.name), String(s.startTime), Date.parse(String(s.startTime)), Number(s.durationMs ?? 0), String(s.status ?? 'unset'), (s.statusMessage as string) ?? null, JSON.stringify(s.attributes ?? {}), JSON.stringify(s.events ?? []))
      counts.spans++
    }
    const core = new Set(['timestamp', 'level', 'event', 'conversationId', 'requestId', 'traceId', 'spanId', 'route', 'model', 'operation', 'durationMs', 'inputTokens', 'outputTokens', 'status', 'errorCode'])
    for (const e of readJsonl('app-')) {
      if (!e.timestamp || !e.event) continue
      const data = Object.fromEntries(Object.entries(e).filter(([k]) => !core.has(k)))
      d.prepare(
        `INSERT INTO events(ts, ts_ms, level, event, conversation_id, request_id, trace_id, span_id, route, model, operation, duration_ms, input_tokens, output_tokens, status, error_code, data)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ).run(String(e.timestamp), Date.parse(String(e.timestamp)), String(e.level ?? 'info'), String(e.event), (e.conversationId as string) ?? null, (e.requestId as string) ?? null, (e.traceId as string) ?? null, (e.spanId as string) ?? null, (e.route as string) ?? null, (e.model as string) ?? null, (e.operation as string) ?? null, n(e.durationMs), n(e.inputTokens), n(e.outputTokens), e.status === undefined ? null : String(e.status), (e.errorCode as string) ?? null, Object.keys(data).length ? JSON.stringify(data) : null)
      counts.events++
    }
    for (const r of readJsonl('ingestion-')) {
      if (!r.runId || !r.startedAt) continue
      d.prepare('INSERT OR IGNORE INTO ingestion_runs(run_id, started_at, started_ms, finished_at, status, dry_run, payload) VALUES (?, ?, ?, ?, ?, ?, ?)').run(String(r.runId), String(r.startedAt), Date.parse(String(r.startedAt)), (r.finishedAt as string) ?? null, String(r.status), r.dryRun ? 1 : 0, JSON.stringify(r))
      counts.ingestion++
    }
    d.prepare("INSERT OR REPLACE INTO meta(key, value) VALUES ('legacy_import', ?)").run(JSON.stringify({ at: new Date().toISOString(), ...counts }))
  })
}

export function resetLegacyImportForTests() {
  checked = false
}
