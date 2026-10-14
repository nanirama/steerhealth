/**
 * Append-only JSONL files under LOG_DIR with daily + size-based rotation and retention.
 *
 * File layout: `<stream>-YYYY-MM-DD.jsonl`, rolling to `<stream>-YYYY-MM-DD.1.jsonl` etc. when
 * LOG_MAX_FILE_MB is exceeded. Files older than LOG_RETENTION_DAYS are deleted (checked at most
 * hourly). Durable only if LOG_DIR is on persistent storage (e.g. a Kubernetes PVC).
 */
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { getConfig } from '../config.ts'

export type StreamName = 'app' | 'requests' | 'traces' | 'ingestion'

const queues = new Map<string, Promise<void>>()
let lastCleanup = 0

const day = (d = new Date()) => d.toISOString().slice(0, 10)

async function currentFile(dir: string, stream: StreamName, maxBytes: number): Promise<string> {
  const base = `${stream}-${day()}`
  for (let i = 0; i < 1000; i++) {
    const file = path.join(dir, i === 0 ? `${base}.jsonl` : `${base}.${i}.jsonl`)
    try {
      const st = await fsp.stat(file)
      if (st.size < maxBytes) return file
    } catch {
      return file
    }
  }
  return path.join(dir, `${base}.overflow.jsonl`)
}

/** Serialized per-stream append; never throws into the request path. */
export function appendRecord(stream: StreamName, record: unknown): Promise<void> {
  const cfg = getConfig()
  const line = JSON.stringify(record) + '\n'
  const prev = queues.get(stream) ?? Promise.resolve()
  const next = prev
    .then(async () => {
      await fsp.mkdir(cfg.logDir, { recursive: true })
      const file = await currentFile(cfg.logDir, stream, cfg.logMaxFileBytes)
      await fsp.appendFile(file, line, 'utf8')
      maybeCleanup(cfg.logDir, cfg.logRetentionDays)
    })
    .catch((e) => {
      // Telemetry must not break requests; surface once on stderr.
      process.stderr.write(`[rag] failed to write ${stream} log: ${(e as Error).message}\n`)
    })
  queues.set(stream, next)
  return next
}

/** Wait for pending writes (used by scripts before exit and by tests). */
export async function flushStores(): Promise<void> {
  await Promise.all([...queues.values()])
}

function maybeCleanup(dir: string, retentionDays: number) {
  const now = Date.now()
  if (now - lastCleanup < 3600_000) return
  lastCleanup = now
  const cutoff = day(new Date(now - retentionDays * 86400_000))
  fsp
    .readdir(dir)
    .then((files) =>
      Promise.all(
        files
          .filter((f) => /^(app|requests|traces|ingestion)-\d{4}-\d{2}-\d{2}/.test(f) && f.slice(f.indexOf('-') + 1, f.indexOf('-') + 11) < cutoff)
          .map((f) => fsp.rm(path.join(dir, f), { force: true })),
      ),
    )
    .catch(() => undefined)
}

/** Files for a stream covering the last `days` days, newest first. */
async function filesFor(stream: StreamName, days: number): Promise<string[]> {
  const dir = getConfig().logDir
  let names: string[]
  try {
    names = await fsp.readdir(dir)
  } catch {
    return []
  }
  const cutoff = day(new Date(Date.now() - days * 86400_000))
  return names
    .filter((n) => n.startsWith(`${stream}-`) && n.endsWith('.jsonl') && n.slice(stream.length + 1, stream.length + 11) >= cutoff)
    .sort()
    .reverse()
    .map((n) => path.join(dir, n))
}

/**
 * Read records from the last `days` days, newest first, up to `limit`. Malformed lines are
 * skipped (a crash mid-write can leave a partial final line).
 */
export async function readRecords<T>(stream: StreamName, opts: { days: number; limit?: number; filter?: (r: T) => boolean }): Promise<T[]> {
  const out: T[] = []
  const limit = opts.limit ?? Infinity
  for (const file of await filesFor(stream, opts.days)) {
    let text: string
    try {
      text = await fsp.readFile(file, 'utf8')
    } catch {
      continue
    }
    const lines = text.split('\n')
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i]
      if (!line.trim()) continue
      try {
        const r = JSON.parse(line) as T
        if (!opts.filter || opts.filter(r)) out.push(r)
      } catch {
        continue
      }
      if (out.length >= limit) return out
    }
  }
  return out
}

export function logDirExists(): boolean {
  return fs.existsSync(getConfig().logDir)
}
