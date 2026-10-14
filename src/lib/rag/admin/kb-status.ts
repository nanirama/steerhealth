/** Knowledge-base and index status for /admin/knowledge-base (cached briefly). */
import { getConfig, indexVersion } from '../config.ts'
import { groupRemote, isIngestionRunning, recentIngestionRuns } from '../ingest.ts'
import type { IngestionRun } from '../ingest.ts'
import { loadKnowledgeBase } from '../markdown-loader.ts'
import { listAllIds, namespaceStats, verifyIndex } from '../pinecone.ts'

export interface KbStatus {
  generatedAt: string
  source: { documents: number; byType: Record<string, number>; issues: { file: string; reason: string }[] }
  index: {
    name: string
    namespace: string
    host?: string
    dimension?: number
    metric?: string
    embeddingModel: string
    embeddingDimensions: number
    indexVersion: string
    rerankModel: string
    indexedDocuments: number | null
    indexedChunks: number | null
    error?: string
  }
  running: boolean
  lastSuccessful: IngestionRun | null
  runs: IngestionRun[]
}

let cache: { at: number; value: KbStatus } | undefined

export async function kbStatus(force = false): Promise<KbStatus> {
  if (!force && cache && Date.now() - cache.at < 30_000) return { ...cache.value, running: await isIngestionRunning() }
  const cfg = getConfig()
  const kb = await loadKnowledgeBase(cfg.knowledgeBaseDir)
  const byType: Record<string, number> = {}
  for (const d of kb.documents) byType[d.contentType] = (byType[d.contentType] ?? 0) + 1
  const index: KbStatus['index'] = {
    name: cfg.pineconeIndexName,
    namespace: cfg.pineconeNamespace,
    embeddingModel: cfg.embeddingModel,
    embeddingDimensions: cfg.embeddingDimensions,
    indexVersion: indexVersion(cfg),
    rerankModel: cfg.rerankModel || 'disabled',
    indexedDocuments: null,
    indexedChunks: null,
  }
  try {
    const info = await verifyIndex()
    Object.assign(index, { host: info.host, dimension: info.dimension, metric: info.metric })
    const ids = await listAllIds()
    index.indexedChunks = ids.length
    index.indexedDocuments = groupRemote(ids).size
    if (!ids.length) index.indexedChunks = (await namespaceStats()).vectorCount
  } catch (e) {
    index.error = (e as { code?: string }).code ?? 'unavailable'
  }
  const runs = await recentIngestionRuns(20)
  const value: KbStatus = {
    generatedAt: new Date().toISOString(),
    source: { documents: kb.documents.length, byType, issues: kb.issues },
    index,
    running: await isIngestionRunning(),
    lastSuccessful: runs.find((r) => r.status === 'success' || r.status === 'partial') ?? null,
    runs,
  }
  cache = { at: Date.now(), value }
  return value
}

export function invalidateKbStatus() {
  cache = undefined
}
