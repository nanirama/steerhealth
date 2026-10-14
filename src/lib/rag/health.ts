/** Dependency health checks (cached briefly so the public endpoint cannot be used to amplify load). */
import { getConfig, missingConfig } from './config.ts'
import { gemini } from './gemini.ts'
import { loadKnowledgeBase } from './markdown-loader.ts'
import { namespaceStats, verifyIndex } from './pinecone.ts'
import { recentIngestionRuns } from './ingest.ts'

export interface CheckResult {
  ok: boolean
  latencyMs?: number
  code?: string
}

export interface HealthReport {
  status: 'ok' | 'degraded' | 'down'
  checkedAt: string
  checks: { config: CheckResult; gemini: CheckResult; pinecone: CheckResult; knowledgeBase: CheckResult }
  knowledgeBase: {
    documents: number | null
    indexedVectors: number | null
    lastSuccessfulIngestion: string | null
    embeddingModel: string
    chatModel: string
  }
}

let cache: { at: number; report: HealthReport } | undefined
const TTL_MS = 30_000

async function timed(fn: () => Promise<unknown>): Promise<CheckResult> {
  const t = performance.now()
  try {
    await fn()
    return { ok: true, latencyMs: Math.round(performance.now() - t) }
  } catch (e) {
    return { ok: false, latencyMs: Math.round(performance.now() - t), code: (e as { code?: string }).code ?? 'unavailable' }
  }
}

export async function getHealth(force = false): Promise<HealthReport> {
  if (!force && cache && Date.now() - cache.at < TTL_MS) return cache.report
  const cfg = getConfig()
  const missing = missingConfig(cfg)
  let documents: number | null = null
  let indexedVectors: number | null = null
  const [geminiCheck, pineconeCheck, kbCheck] = await Promise.all([
    cfg.geminiApiKey ? timed(() => gemini().models.get({ model: cfg.chatModel })) : Promise.resolve<CheckResult>({ ok: false, code: 'config_missing' }),
    cfg.pineconeApiKey
      ? timed(async () => {
          await verifyIndex()
          indexedVectors = (await namespaceStats()).vectorCount
        })
      : Promise.resolve<CheckResult>({ ok: false, code: 'config_missing' }),
    timed(async () => {
      const kb = await loadKnowledgeBase(cfg.knowledgeBaseDir)
      documents = kb.documents.length
      if (!documents) throw Object.assign(new Error('empty'), { code: 'kb_empty' })
    }),
  ])
  const runs = await recentIngestionRuns(20).catch(() => [])
  const lastOk = runs.find((r) => r.status === 'success' || r.status === 'partial')
  const checks = { config: { ok: !missing.length, code: missing.length ? 'config_missing' : undefined }, gemini: geminiCheck, pinecone: pineconeCheck, knowledgeBase: kbCheck }
  const allOk = Object.values(checks).every((c) => c.ok)
  const report: HealthReport = {
    status: allOk ? 'ok' : checks.gemini.ok || checks.pinecone.ok ? 'degraded' : 'down',
    checkedAt: new Date().toISOString(),
    checks,
    knowledgeBase: {
      documents,
      indexedVectors,
      lastSuccessfulIngestion: lastOk?.finishedAt ?? null,
      embeddingModel: cfg.embeddingModel,
      chatModel: cfg.chatModel,
    },
  }
  cache = { at: Date.now(), report }
  return report
}
