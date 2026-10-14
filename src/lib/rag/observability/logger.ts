/**
 * Structured logger. Each event is:
 *  - stored in the telemetry DB (`events` table; queryable from /admin with correlation IDs),
 *  - appended to LOG_DIR/app-YYYY-MM-DD.jsonl (rotated raw log stream for log shippers),
 *  - written as one JSON line to stdout/stderr (container logs).
 */
import { getConfig } from '../config.ts'
import { recordEvent } from '../store/telemetry.ts'
import { appendRecord } from './jsonl-store.ts'
import { redact } from './redact.ts'

export { redact } from './redact.ts'

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'
const ORDER: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 }

export interface LogFields {
  conversationId?: string
  requestId?: string
  traceId?: string
  spanId?: string
  route?: string
  durationMs?: number
  model?: string
  operation?: string
  inputTokens?: number | null
  outputTokens?: number | null
  status?: string
  errorCode?: string
  [key: string]: unknown
}

export interface LogEvent extends LogFields {
  timestamp: string
  level: LogLevel
  event: string
}

/** Correlation IDs are random/validated identifiers, never user content: exempt from redaction (patterns like phone numbers would corrupt them). */
const ID_FIELDS = ['conversationId', 'requestId', 'traceId', 'spanId'] as const

const CORE = new Set(['conversationId', 'requestId', 'traceId', 'spanId', 'route', 'durationMs', 'model', 'operation', 'inputTokens', 'outputTokens', 'status', 'errorCode'])

export function log(level: LogLevel, event: string, fields: LogFields = {}): LogEvent | undefined {
  const cfg = getConfig()
  if (ORDER[level] < ORDER[cfg.logLevel]) return undefined
  const ids: LogFields = {}
  const rest: LogFields = {}
  for (const [k, v] of Object.entries(fields)) ((ID_FIELDS as readonly string[]).includes(k) ? ids : rest)[k] = v
  const record = { timestamp: new Date().toISOString(), level, event, ...(redact(rest) as LogFields), ...ids } as LogEvent
  const data: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(record)) if (!CORE.has(k) && k !== 'timestamp' && k !== 'level' && k !== 'event') data[k] = v
  recordEvent({
    timestamp: record.timestamp,
    level,
    event,
    conversationId: record.conversationId,
    requestId: record.requestId,
    traceId: record.traceId,
    spanId: record.spanId,
    route: record.route,
    model: record.model,
    operation: record.operation,
    durationMs: record.durationMs,
    inputTokens: record.inputTokens,
    outputTokens: record.outputTokens,
    status: record.status === undefined ? undefined : String(record.status),
    errorCode: record.errorCode,
    data,
  })
  void appendRecord('app', record)
  if (process.env.NODE_ENV !== 'test' && !process.env.RAG_SILENT_STDOUT) {
    const line = JSON.stringify(record)
    if (level === 'error' || level === 'warn') process.stderr.write(line + '\n')
    else process.stdout.write(line + '\n')
  }
  return record
}

export const logger = {
  debug: (event: string, f?: LogFields) => log('debug', event, f),
  info: (event: string, f?: LogFields) => log('info', event, f),
  warn: (event: string, f?: LogFields) => log('warn', event, f),
  error: (event: string, f?: LogFields) => log('error', event, f),
}
