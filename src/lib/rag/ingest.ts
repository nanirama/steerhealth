/**
 * Incremental knowledge-base -> Pinecone synchronization.
 *
 * Pinecone is the source of truth for what is indexed: every vector stores `doc_hash`,
 * `chunk_count` and `index_version`. A run:
 *  1. loads + chunks local Markdown;
 *  2. lists all vector IDs in the namespace and fetches chunk #0 metadata per document;
 *  3. plans added / modified / unchanged / removed documents (pure `planSync`);
 *  4. embeds + upserts changed docs, then deletes their stale chunk IDs (only after upsert
 *     succeeded), then deletes vectors of removed docs.
 * Per-document failures are recorded and do not abort the run. A lock file prevents
 * concurrent runs (across the CLI and the admin API on the same volume).
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { chunkDocument } from './chunking.ts'
import { getConfig, indexVersion } from './config.ts'
import { countEmbeddingTokens, embedTexts } from './gemini.ts'
import { loadKnowledgeBase } from './markdown-loader.ts'
import type { LoadIssue } from './markdown-loader.ts'
import { deleteVectors, fetchMetadata, listAllIds, namespaceStats, upsertVectors, verifyIndex } from './pinecone.ts'
import { RagError } from './retry.ts'
import { getDb } from './store/db.ts'
import { recordIngestionRun } from './store/telemetry.ts'
import { logger } from './observability/logger.ts'
import { inSpan, markError, startSpan } from './observability/tracing.ts'
import type { Chunk, ChunkMetadata, KnowledgeDocument } from './types.ts'

export interface RemoteDocState {
  ids: string[]
  docHash?: string
  chunkCount?: number
  indexVersion?: string
}

export interface SyncPlan {
  added: KnowledgeDocument[]
  modified: KnowledgeDocument[]
  unchanged: KnowledgeDocument[]
  /** Remote doc IDs no longer present locally. */
  removed: string[]
}

export function docIdOf(vectorId: string): string {
  const i = vectorId.lastIndexOf('#')
  return i === -1 ? vectorId : vectorId.slice(0, i)
}

export function groupRemote(ids: string[]): Map<string, RemoteDocState> {
  const m = new Map<string, RemoteDocState>()
  for (const id of ids) {
    const d = docIdOf(id)
    const s = m.get(d) ?? { ids: [] }
    s.ids.push(id)
    m.set(d, s)
  }
  return m
}

export function planSync(local: KnowledgeDocument[], remote: Map<string, RemoteDocState>, version: string, chunkCounts: Map<string, number>): SyncPlan {
  const plan: SyncPlan = { added: [], modified: [], unchanged: [], removed: [] }
  const localIds = new Set(local.map((d) => d.id))
  for (const doc of local) {
    const r = remote.get(doc.id)
    if (!r || !r.ids.length) plan.added.push(doc)
    else if (r.docHash !== doc.hash || r.indexVersion !== version || r.chunkCount !== chunkCounts.get(doc.id) || r.ids.length !== chunkCounts.get(doc.id)) {
      plan.modified.push(doc)
    } else plan.unchanged.push(doc)
  }
  for (const id of remote.keys()) if (!localIds.has(id)) plan.removed.push(id)
  return plan
}

export function toMetadata(doc: KnowledgeDocument, chunk: Chunk, version: string, embeddingModel: string): ChunkMetadata {
  const md: ChunkMetadata = {
    doc_id: doc.id,
    chunk_id: chunk.id,
    chunk_index: chunk.index,
    chunk_count: chunk.count,
    title: doc.title,
    content_type: doc.contentType,
    source_file: doc.sourceFile,
    doc_hash: doc.hash,
    chunk_hash: chunk.hash,
    index_version: version,
    embedding_model: embeddingModel,
    text: chunk.text,
  }
  // Pinecone rejects null metadata values: only set optional fields that exist.
  if (doc.slug) md.slug = doc.slug
  if (doc.url) md.url = doc.url
  if (chunk.section) md.section = chunk.section
  if (doc.dataset) md.dataset = doc.dataset
  if (doc.updatedAt) md.updated_at = doc.updatedAt
  return md
}

export interface IngestionRun {
  runId: string
  startedAt: string
  finishedAt?: string
  status: 'running' | 'success' | 'partial' | 'failed' | 'dry-run'
  dryRun: boolean
  indexName: string
  namespace: string
  indexVersion: string
  embeddingModel: string
  documents: { eligible: number; added: number; modified: number; unchanged: number; removed: number; failed: number }
  chunks: { local: number; embedded: number; upserted: number; deleted: number }
  vectorCountAfter?: number
  embeddingTokens: number | null
  durationMs?: number
  embeddingMs: number
  failures: { docId?: string; file?: string; reason: string }[]
  loadIssues: LoadIssue[]
  error?: string
}

const LOCK_STALE_MS = 30 * 60_000

async function acquireLock(file: string, runId: string): Promise<void> {
  await fs.mkdir(path.dirname(file), { recursive: true })
  try {
    await fs.writeFile(file, JSON.stringify({ runId, pid: process.pid, at: Date.now() }), { flag: 'wx' })
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== 'EEXIST') throw e
    const held = JSON.parse(await fs.readFile(file, 'utf8').catch(() => '{}')) as { at?: number; runId?: string }
    if (held.at && Date.now() - held.at < LOCK_STALE_MS) throw new RagError('ingestion_locked', `Ingestion ${held.runId ?? ''} is already running`)
    await fs.writeFile(file, JSON.stringify({ runId, pid: process.pid, at: Date.now() }))
  }
}

export function lockFile() {
  return path.join(getConfig().logDir, 'ingestion.lock')
}

export async function isIngestionRunning(): Promise<boolean> {
  try {
    const held = JSON.parse(await fs.readFile(lockFile(), 'utf8')) as { at?: number }
    return Boolean(held.at && Date.now() - held.at < LOCK_STALE_MS)
  } catch {
    return false
  }
}

export async function runIngestion(opts: { dryRun?: boolean; concurrency?: number; batchSize?: number; onProgress?: (msg: string) => void } = {}): Promise<IngestionRun> {
  const cfg = getConfig()
  const version = indexVersion(cfg)
  const runId = `ing-${new Date().toISOString().replace(/[:.]/g, '-')}`
  const progress = opts.onProgress ?? (() => undefined)
  const run: IngestionRun = {
    runId,
    startedAt: new Date().toISOString(),
    status: 'running',
    dryRun: Boolean(opts.dryRun),
    indexName: cfg.pineconeIndexName,
    namespace: cfg.pineconeNamespace,
    indexVersion: version,
    embeddingModel: cfg.embeddingModel,
    documents: { eligible: 0, added: 0, modified: 0, unchanged: 0, removed: 0, failed: 0 },
    chunks: { local: 0, embedded: 0, upserted: 0, deleted: 0 },
    embeddingTokens: 0,
    embeddingMs: 0,
    failures: [],
    loadIssues: [],
  }
  const t0 = performance.now()
  const root = startSpan('rag.ingestion', undefined, { 'rag.run_id': runId, 'rag.dry_run': run.dryRun, 'rag.index_version': version })
  if (!opts.dryRun) await acquireLock(lockFile(), runId)
  try {
    const loaded = await inSpan('ingest.load', root, () => loadKnowledgeBase(cfg.knowledgeBaseDir))
    run.loadIssues = loaded.issues
    run.documents.eligible = loaded.documents.length
    if (!loaded.documents.length) throw new RagError('kb_empty', `No indexable documents found in ${path.basename(cfg.knowledgeBaseDir)}/`)

    const chunksByDoc = new Map<string, Chunk[]>()
    for (const d of loaded.documents) chunksByDoc.set(d.id, chunkDocument(d, { chunkSizeTokens: cfg.chunkSizeTokens, overlapTokens: cfg.chunkOverlapTokens }))
    run.chunks.local = [...chunksByDoc.values()].reduce((a, c) => a + c.length, 0)
    progress(`Loaded ${loaded.documents.length} documents -> ${run.chunks.local} chunks (${loaded.issues.length} load issues)`)

    // Validate the index before any change.
    await inSpan('ingest.verify_index', root, () => verifyIndex(true))

    const remote = await inSpan('ingest.remote_state', root, async (h) => {
      const ids = await listAllIds()
      const grouped = groupRemote(ids)
      const heads = [...grouped.values()].map((s) => s.ids.find((id) => id.endsWith('#0')) ?? s.ids[0])
      const meta = await fetchMetadata(heads)
      for (const [docId, s] of grouped) {
        const m = meta.get(s.ids.find((id) => id.endsWith('#0')) ?? s.ids[0])
        if (m) Object.assign(s, { docHash: m.doc_hash, chunkCount: m.chunk_count, indexVersion: m.index_version })
        grouped.set(docId, s)
      }
      h.span.setAttributes({ 'rag.remote_vectors': ids.length, 'rag.remote_docs': grouped.size })
      return grouped
    })

    const plan = planSync(loaded.documents, remote, version, new Map([...chunksByDoc].map(([k, v]) => [k, v.length])))
    run.documents.added = plan.added.length
    run.documents.modified = plan.modified.length
    run.documents.unchanged = plan.unchanged.length
    run.documents.removed = plan.removed.length
    progress(`Plan: +${plan.added.length} added, ~${plan.modified.length} modified, =${plan.unchanged.length} unchanged, -${plan.removed.length} removed`)

    if (opts.dryRun) {
      run.status = 'dry-run'
      run.embeddingTokens = null
      return run
    }

    const toEmbed = [...plan.added, ...plan.modified]
    const batchSize = opts.batchSize ?? 50
    const concurrency = Math.max(1, opts.concurrency ?? 3)
    let tokensKnown = true
    let cursor = 0
    const worker = async () => {
      while (cursor < toEmbed.length) {
        const doc = toEmbed[cursor++]
        const chunks = chunksByDoc.get(doc.id)!
        try {
          await inSpan(
            'ingest.document',
            root,
            async () => {
              const records: { id: string; values: number[]; metadata: ChunkMetadata }[] = []
              for (let i = 0; i < chunks.length; i += batchSize) {
                const batch = chunks.slice(i, i + batchSize)
                const te = performance.now()
                const texts = batch.map((c) => c.text)
                const [emb, tokens] = await Promise.all([embedTexts(texts, 'RETRIEVAL_DOCUMENT'), countEmbeddingTokens(texts)])
                run.embeddingMs += performance.now() - te
                if (tokens === null) tokensKnown = false
                else run.embeddingTokens = (run.embeddingTokens ?? 0) + tokens
                run.chunks.embedded += batch.length
                batch.forEach((c, j) => records.push({ id: c.id, values: emb.vectors[j], metadata: toMetadata(doc, c, version, cfg.embeddingModel) }))
              }
              await upsertVectors(records)
              run.chunks.upserted += records.length
              // Delete chunk IDs that existed before but are not part of the new version.
              const keep = new Set(chunks.map((c) => c.id))
              const stale = (remote.get(doc.id)?.ids ?? []).filter((id) => !keep.has(id))
              await deleteVectors(stale)
              run.chunks.deleted += stale.length
            },
            { 'rag.doc_id': doc.id, 'rag.chunks': chunks.length },
          )
        } catch (e) {
          run.documents.failed++
          run.failures.push({ docId: doc.id, file: doc.sourceFile, reason: (e as RagError).code ?? (e as Error).message })
          logger.error('rag.ingestion.document_failed', { runId, docId: doc.id, errorCode: (e as RagError).code })
        }
        if ((run.chunks.upserted + run.documents.failed) % 25 === 0) progress(`Embedded ${run.chunks.embedded}/${toEmbed.reduce((a, d) => a + chunksByDoc.get(d.id)!.length, 0)} chunks`)
      }
    }
    await inSpan('ingest.embed_upsert', root, () => Promise.all(Array.from({ length: concurrency }, worker)).then(() => undefined))

    await inSpan('ingest.delete_removed', root, async () => {
      for (const docId of plan.removed) {
        const ids = remote.get(docId)?.ids ?? []
        try {
          await deleteVectors(ids)
          run.chunks.deleted += ids.length
        } catch (e) {
          run.failures.push({ docId, reason: `delete failed: ${(e as RagError).code ?? (e as Error).message}` })
        }
      }
    })
    if (!tokensKnown) run.embeddingTokens = null
    // describeIndexStats is eventually consistent; this count can lag by a few seconds.
    run.vectorCountAfter = await namespaceStats().then((s) => s.vectorCount).catch(() => undefined)
    run.status = run.failures.length ? 'partial' : 'success'
    return run
  } catch (e) {
    run.status = 'failed'
    run.error = (e as RagError).code ? `${(e as RagError).code}: ${(e as Error).message}` : (e as Error).message
    markError(root, e)
    return run
  } finally {
    run.finishedAt = new Date().toISOString()
    run.durationMs = Math.round(performance.now() - t0)
    run.embeddingMs = Math.round(run.embeddingMs)
    root.span.setAttributes({ 'rag.status': run.status, 'rag.chunks_upserted': run.chunks.upserted, 'rag.chunks_deleted': run.chunks.deleted })
    root.span.end()
    if (!opts.dryRun) {
      await fs.rm(lockFile(), { force: true })
      recordIngestionRun(run)
    }
    logger.info('rag.ingestion.completed', { runId, status: run.status, durationMs: run.durationMs, ...run.documents, upserted: run.chunks.upserted, deleted: run.chunks.deleted })
  }
}

export async function recentIngestionRuns(limit = 10): Promise<IngestionRun[]> {
  const rows = getDb().prepare('SELECT payload FROM ingestion_runs WHERE dry_run = 0 ORDER BY started_ms DESC LIMIT ?').all(Math.min(200, limit))
  return rows.map((r) => JSON.parse(String(r.payload)) as IngestionRun)
}
