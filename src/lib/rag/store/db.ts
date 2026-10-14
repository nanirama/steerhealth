/**
 * Durable telemetry store: SQLite via Node's built-in `node:sqlite` (no native dependency).
 *
 * System of record for conversations, turns, RAG requests (tokens, latency, cost), generation
 * attempts, retrieved sources, structured events (logs), spans, ingestion runs, evaluation runs,
 * admin sessions and the admin audit log. WAL mode; one writer process (current single-replica
 * deployment). RAG_DB_PATH must be on persistent storage (Kubernetes PVC) in production.
 */
import fs from 'node:fs'
import path from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { getConfig } from '../config.ts'

const SCHEMA_VERSION = 1

const SCHEMA = `
CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT);

CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  started_at TEXT NOT NULL,
  started_ms INTEGER NOT NULL,
  last_activity TEXT NOT NULL,
  last_activity_ms INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_conv_last ON conversations(last_activity_ms);

CREATE TABLE IF NOT EXISTS requests (
  request_id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  trace_id TEXT NOT NULL,
  ts TEXT NOT NULL,
  ts_ms INTEGER NOT NULL,
  status TEXT NOT NULL,
  error_code TEXT,
  model TEXT,
  embedding_model TEXT,
  rerank_model TEXT,
  question_chars INTEGER,
  retrieved_count INTEGER,
  sources_used INTEGER,
  empty_retrieval INTEGER,
  input_tokens INTEGER,
  output_tokens INTEGER,
  thinking_tokens INTEGER,
  cached_tokens INTEGER,
  generation_total_tokens INTEGER,
  embedding_tokens INTEGER,
  usage_source TEXT,
  cost_generation_usd REAL,
  cost_embedding_usd REAL,
  cost_total_usd REAL,
  pricing_version TEXT,
  validation_ms REAL,
  embedding_ms REAL,
  vector_search_ms REAL,
  rerank_ms REAL,
  context_assembly_ms REAL,
  generation_ms REAL,
  generation_first_token_ms REAL,
  server_ttft_ms REAL,
  citation_ms REAL,
  total_server_ms REAL,
  client_ttft_ms REAL,
  client_completion_ms REAL,
  cited_count INTEGER,
  invalid_citations INTEGER,
  uncited INTEGER,
  abstained INTEGER,
  generation_attempts INTEGER,
  warnings TEXT
);
CREATE INDEX IF NOT EXISTS idx_req_ts ON requests(ts_ms);
CREATE INDEX IF NOT EXISTS idx_req_conv ON requests(conversation_id, ts_ms);
CREATE INDEX IF NOT EXISTS idx_req_trace ON requests(trace_id);
CREATE INDEX IF NOT EXISTS idx_req_status ON requests(status, ts_ms);

CREATE TABLE IF NOT EXISTS generation_attempts (
  request_id TEXT NOT NULL,
  attempt INTEGER NOT NULL,
  status TEXT NOT NULL,
  error_code TEXT,
  duration_ms REAL,
  PRIMARY KEY (request_id, attempt)
);

CREATE TABLE IF NOT EXISTS turns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id TEXT NOT NULL,
  request_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT,
  redaction TEXT NOT NULL,
  ts TEXT NOT NULL,
  ts_ms INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_turns_conv ON turns(conversation_id, ts_ms);
CREATE INDEX IF NOT EXISTS idx_turns_req ON turns(request_id);

CREATE TABLE IF NOT EXISTS retrieved_sources (
  request_id TEXT NOT NULL,
  n INTEGER NOT NULL,
  doc_id TEXT NOT NULL,
  title TEXT,
  content_type TEXT,
  url TEXT,
  top_score REAL,
  cited INTEGER NOT NULL DEFAULT 0,
  sections TEXT,
  PRIMARY KEY (request_id, n)
);
CREATE INDEX IF NOT EXISTS idx_src_type ON retrieved_sources(content_type, request_id);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL,
  ts_ms INTEGER NOT NULL,
  level TEXT NOT NULL,
  event TEXT NOT NULL,
  conversation_id TEXT,
  request_id TEXT,
  trace_id TEXT,
  span_id TEXT,
  route TEXT,
  model TEXT,
  operation TEXT,
  duration_ms REAL,
  input_tokens INTEGER,
  output_tokens INTEGER,
  status TEXT,
  error_code TEXT,
  data TEXT
);
CREATE INDEX IF NOT EXISTS idx_ev_ts ON events(ts_ms);
CREATE INDEX IF NOT EXISTS idx_ev_req ON events(request_id);
CREATE INDEX IF NOT EXISTS idx_ev_conv ON events(conversation_id);
CREATE INDEX IF NOT EXISTS idx_ev_trace ON events(trace_id);
CREATE INDEX IF NOT EXISTS idx_ev_level ON events(level, ts_ms);
CREATE INDEX IF NOT EXISTS idx_ev_event ON events(event, ts_ms);

CREATE TABLE IF NOT EXISTS spans (
  span_id TEXT PRIMARY KEY,
  trace_id TEXT NOT NULL,
  parent_span_id TEXT,
  name TEXT NOT NULL,
  start_time TEXT NOT NULL,
  start_ms INTEGER NOT NULL,
  duration_ms REAL NOT NULL,
  status TEXT NOT NULL,
  status_message TEXT,
  attributes TEXT,
  events TEXT
);
CREATE INDEX IF NOT EXISTS idx_spans_trace ON spans(trace_id, start_ms);
CREATE INDEX IF NOT EXISTS idx_spans_start ON spans(start_ms);

CREATE TABLE IF NOT EXISTS ingestion_runs (
  run_id TEXT PRIMARY KEY,
  started_at TEXT NOT NULL,
  started_ms INTEGER NOT NULL,
  finished_at TEXT,
  status TEXT NOT NULL,
  dry_run INTEGER NOT NULL DEFAULT 0,
  payload TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_ing_started ON ingestion_runs(started_ms);

CREATE TABLE IF NOT EXISTS eval_runs (
  run_id TEXT PRIMARY KEY,
  started_at TEXT NOT NULL,
  started_ms INTEGER NOT NULL,
  dataset_version TEXT,
  cases INTEGER,
  failed INTEGER,
  payload TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_eval_started ON eval_runs(started_ms);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id_hash TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  csrf_token TEXT NOT NULL,
  created_ms INTEGER NOT NULL,
  expires_ms INTEGER NOT NULL,
  last_seen_ms INTEGER NOT NULL,
  ip_hash TEXT,
  user_agent TEXT
);

CREATE TABLE IF NOT EXISTS admin_audit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL,
  ts_ms INTEGER NOT NULL,
  username TEXT,
  action TEXT NOT NULL,
  target TEXT,
  outcome TEXT NOT NULL,
  ip_hash TEXT,
  detail TEXT
);
CREATE INDEX IF NOT EXISTS idx_audit_ts ON admin_audit(ts_ms);
`

let db: DatabaseSync | undefined
let lastRetention = 0

export function dbPath(): string {
  return getConfig().dbPath
}

export function getDb(): DatabaseSync {
  if (db) return db
  const file = dbPath()
  if (file !== ':memory:') fs.mkdirSync(path.dirname(file), { recursive: true })
  db = new DatabaseSync(file, { timeout: 5000 })
  db.exec('PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;')
  db.exec(SCHEMA)
  db.prepare('INSERT OR REPLACE INTO meta(key, value) VALUES (?, ?)').run('schema_version', String(SCHEMA_VERSION))
  return db
}

/** Run a function inside a transaction (all-or-nothing). */
export function tx<T>(fn: (d: DatabaseSync) => T): T {
  const d = getDb()
  d.exec('BEGIN')
  try {
    const out = fn(d)
    d.exec('COMMIT')
    return out
  } catch (e) {
    d.exec('ROLLBACK')
    throw e
  }
}

/**
 * Retention: transcripts older than RAG_TRANSCRIPT_RETENTION_DAYS have their content removed
 * (metadata kept); telemetry older than RAG_TELEMETRY_RETENTION_DAYS is deleted; expired admin
 * sessions are purged. Runs at most hourly.
 */
export function applyRetention(now = Date.now(), force = false): { transcripts: number; requests: number; events: number; spans: number } | null {
  if (!force && now - lastRetention < 3600_000) return null
  lastRetention = now
  const cfg = getConfig()
  const d = getDb()
  const tCut = now - cfg.transcriptRetentionDays * 86400_000
  const mCut = now - cfg.telemetryRetentionDays * 86400_000
  const n = (r: { changes: number | bigint }) => Number(r.changes)
  return tx(() => ({
    transcripts: n(d.prepare("UPDATE turns SET content = NULL, redaction = 'expired' WHERE ts_ms < ? AND content IS NOT NULL").run(tCut)),
    requests: n(d.prepare('DELETE FROM requests WHERE ts_ms < ?').run(mCut)) +
      n(d.prepare('DELETE FROM generation_attempts WHERE request_id NOT IN (SELECT request_id FROM requests)').run()) +
      n(d.prepare('DELETE FROM retrieved_sources WHERE request_id NOT IN (SELECT request_id FROM requests)').run()) +
      n(d.prepare('DELETE FROM turns WHERE ts_ms < ?').run(mCut)) +
      n(d.prepare('DELETE FROM conversations WHERE last_activity_ms < ?').run(mCut)),
    events: n(d.prepare('DELETE FROM events WHERE ts_ms < ?').run(mCut)),
    spans: n(d.prepare('DELETE FROM spans WHERE start_ms < ?').run(mCut)) + n(d.prepare('DELETE FROM admin_sessions WHERE expires_ms < ?').run(now)),
  }))
}

/** Test hook. */
export function closeDbForTests() {
  db?.close()
  db = undefined
  lastRetention = 0
}
