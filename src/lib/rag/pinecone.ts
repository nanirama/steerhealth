/** Pinecone access via the official SDK. Never deletes indexes; vector deletes are ID-scoped. */
import { Pinecone } from '@pinecone-database/pinecone'
import type { Index, RecordMetadata } from '@pinecone-database/pinecone'
import { getConfig } from './config.ts'
import { RagError, classifyError, timeoutSignal, withRetry } from './retry.ts'
import type { ChunkMetadata, ContentType, RetrievedChunk } from './types.ts'

let pc: Pinecone | undefined
let indexHandle: Index<RecordMetadata> | undefined
let verified: Promise<IndexInfo> | undefined

export interface IndexInfo {
  name: string
  dimension: number
  metric: string
  host: string
  ready: boolean
}

export function pinecone(): Pinecone {
  const cfg = getConfig()
  if (!cfg.pineconeApiKey) throw new RagError('config_missing', 'PINECONE_API_KEY is not configured')
  pc ??= new Pinecone({ apiKey: cfg.pineconeApiKey })
  return pc
}

function wrap<T>(fn: () => Promise<T>, signal?: AbortSignal, timeoutMs?: number): Promise<T> {
  const cfg = getConfig()
  const ms = timeoutMs ?? cfg.searchTimeoutMs
  return withRetry(
    () => {
      const sig = timeoutSignal(ms, signal)
      // The SDK has no per-call AbortSignal; race the call against the signal.
      return new Promise<T>((resolve, reject) => {
        if (sig.aborted) return reject(sig.reason)
        const onAbort = () => reject(sig.reason)
        sig.addEventListener('abort', onAbort, { once: true })
        fn().then(resolve, reject).finally(() => sig.removeEventListener('abort', onAbort))
      })
    },
    (e) => classifyError(e, 'pinecone'),
    { retries: cfg.maxRetries, signal },
  )
}

/** Describe the configured index and verify it matches the embedding configuration. Cached. */
export function verifyIndex(force = false): Promise<IndexInfo> {
  if (verified && !force) return verified
  const cfg = getConfig()
  verified = (async () => {
    let model
    try {
      model = await wrap(() => pinecone().describeIndex(cfg.pineconeIndexName), undefined, 10000)
    } catch (e) {
      const err = classifyError(e, 'pinecone')
      if (err.code === 'pinecone_not_found' || /not ?found/i.test(String((e as Error)?.message))) {
        throw new RagError('index_missing', `Pinecone index "${cfg.pineconeIndexName}" does not exist`)
      }
      throw err
    }
    const info: IndexInfo = {
      name: model.name,
      dimension: model.dimension ?? 0,
      metric: model.metric,
      host: model.host,
      ready: Boolean(model.status?.ready),
    }
    if (info.dimension !== cfg.embeddingDimensions) {
      throw new RagError(
        'index_dimension_mismatch',
        `Index "${info.name}" has dimension ${info.dimension} but GEMINI_EMBEDDING_DIMENSIONS is ${cfg.embeddingDimensions}`,
      )
    }
    if (info.metric !== 'cosine') {
      throw new RagError('index_metric_mismatch', `Index "${info.name}" uses metric "${info.metric}"; expected cosine`)
    }
    return info
  })()
  verified.catch(() => (verified = undefined))
  return verified
}

async function index(): Promise<Index<RecordMetadata>> {
  if (indexHandle) return indexHandle
  const cfg = getConfig()
  const host = cfg.pineconeIndexHost || (await verifyIndex()).host
  indexHandle = pinecone().index({ name: cfg.pineconeIndexName, host, namespace: cfg.pineconeNamespace })
  return indexHandle
}

export async function queryVectors(
  vector: number[],
  topK: number,
  contentTypes: ContentType[] | undefined,
  signal?: AbortSignal,
): Promise<RetrievedChunk[]> {
  const idx = await index()
  const filter = contentTypes?.length ? { content_type: { $in: contentTypes } } : undefined
  const res = await wrap(() => idx.query({ vector, topK, includeMetadata: true, includeValues: false, ...(filter ? { filter } : {}) }), signal)
  return (res.matches ?? [])
    .filter((m) => m.metadata && typeof (m.metadata as Record<string, unknown>).text === 'string')
    .map((m) => ({ id: m.id, score: m.score ?? 0, metadata: m.metadata as unknown as ChunkMetadata }))
}

export async function upsertVectors(records: { id: string; values: number[]; metadata: ChunkMetadata }[]): Promise<void> {
  const idx = await index()
  for (let i = 0; i < records.length; i += 100) {
    const batch = records.slice(i, i + 100).map((r) => ({ ...r, metadata: r.metadata as unknown as RecordMetadata }))
    await wrap(() => idx.upsert({ records: batch }), undefined, 30000)
  }
}

export async function deleteVectors(ids: string[]): Promise<void> {
  if (!ids.length) return
  const idx = await index()
  for (let i = 0; i < ids.length; i += 500) {
    const batch = ids.slice(i, i + 500)
    await wrap(() => idx.deleteMany({ ids: batch }), undefined, 30000)
  }
}

/** All vector IDs in the namespace (serverless indexes support ID listing). */
export async function listAllIds(): Promise<string[]> {
  const idx = await index()
  const ids: string[] = []
  let token: string | undefined
  for (let page = 0; page < 10000; page++) {
    const res = await wrap(() => idx.listPaginated({ limit: 100, ...(token ? { paginationToken: token } : {}) }), undefined, 15000)
    for (const v of res.vectors ?? []) if (v.id) ids.push(v.id)
    token = res.pagination?.next
    if (!token) break
  }
  return ids
}

export async function fetchMetadata(ids: string[]): Promise<Map<string, ChunkMetadata>> {
  const idx = await index()
  const out = new Map<string, ChunkMetadata>()
  for (let i = 0; i < ids.length; i += 100) {
    const batch = ids.slice(i, i + 100)
    const res = await wrap(() => idx.fetch({ ids: batch }), undefined, 15000)
    for (const [id, rec] of Object.entries(res.records ?? {})) {
      if (rec?.metadata) out.set(id, rec.metadata as unknown as ChunkMetadata)
    }
  }
  return out
}

export async function namespaceStats(): Promise<{ vectorCount: number; namespace: string; dimension?: number }> {
  const cfg = getConfig()
  const idx = await index()
  const s = await wrap(() => idx.describeIndexStats(), undefined, 10000)
  return {
    vectorCount: s.namespaces?.[cfg.pineconeNamespace]?.recordCount ?? 0,
    namespace: cfg.pineconeNamespace,
    dimension: s.dimension,
  }
}

/** Rerank candidate chunks with a Pinecone hosted model; returns chunks sorted by rerank score. */
export async function rerankChunks(query: string, chunks: RetrievedChunk[], model: string, signal?: AbortSignal): Promise<RetrievedChunk[]> {
  if (!chunks.length) return chunks
  const cfg = getConfig()
  const res = await wrap(
    () =>
      pinecone().inference.rerank({
        model,
        query,
        documents: chunks.map((c) => ({ id: c.id, text: c.metadata.text })),
        rankFields: ['text'],
        returnDocuments: false,
        topN: chunks.length,
      }),
    signal,
    cfg.rerankTimeoutMs,
  )
  return res.data.map((d) => ({ ...chunks[d.index], rerankScore: d.score }))
}

/** Explicit, opt-in index creation (ingestion script `--create-index`). Never called implicitly. */
export async function createServerlessIndex(): Promise<void> {
  const cfg = getConfig()
  await pinecone().createIndex({
    name: cfg.pineconeIndexName,
    dimension: cfg.embeddingDimensions,
    metric: 'cosine',
    spec: { serverless: { cloud: cfg.pineconeCloud as 'aws' | 'gcp' | 'azure', region: cfg.pineconeRegion } },
    waitUntilReady: true,
    suppressConflicts: true,
  })
  verified = undefined
  indexHandle = undefined
}
