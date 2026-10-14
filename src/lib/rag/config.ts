/**
 * Central RAG configuration. Every model ID, index setting, threshold and limit is read
 * from environment variables here (with documented defaults) so nothing is hard-coded
 * elsewhere. Server-only: never import this from a Client Component.
 */
import path from 'node:path'

if (typeof window !== 'undefined') {
  throw new Error('src/lib/rag is server-only and must not be bundled for the browser')
}

const str = (name: string, fallback = ''): string => (process.env[name] ?? '').trim() || fallback
const num = (name: string, fallback: number): number => {
  const raw = (process.env[name] ?? '').trim()
  if (!raw) return fallback
  const n = Number(raw)
  if (!Number.isFinite(n)) throw new Error(`Invalid number for ${name}`)
  return n
}
const bool = (name: string, fallback: boolean): boolean => {
  const raw = (process.env[name] ?? '').trim().toLowerCase()
  if (!raw) return fallback
  return raw === '1' || raw === 'true' || raw === 'yes'
}

export interface RagConfig {
  geminiApiKey: string
  embeddingModel: string
  embeddingDimensions: number
  chatModel: string
  chatTemperature: number
  chatMaxOutputTokens: number
  chatThinkingBudget: number
  judgeModel: string
  countEmbeddingTokens: boolean

  pineconeApiKey: string
  pineconeIndexName: string
  pineconeIndexHost: string
  pineconeNamespace: string
  pineconeCloud: string
  pineconeRegion: string

  knowledgeBaseDir: string
  chunkSizeTokens: number
  chunkOverlapTokens: number
  chunkerVersion: string

  topK: number
  /** Pinecone hosted reranker (e.g. bge-reranker-v2-m3); empty disables reranking. */
  rerankModel: string
  rerankCandidates: number
  rerankTimeoutMs: number
  minScore: number
  maxSources: number
  maxChunksPerDoc: number
  maxContextChars: number
  historyMessages: number

  maxQuestionChars: number
  maxMessages: number
  maxBodyBytes: number
  rateLimitPerMinute: number

  embedTimeoutMs: number
  searchTimeoutMs: number
  generationTimeoutMs: number
  maxRetries: number

  latencyTargetMs: number
  ttftTargetMs: number

  logDir: string
  logLevel: 'debug' | 'info' | 'warn' | 'error'
  logRetentionDays: number
  logMaxFileBytes: number
  traceSampleRate: number
  otlpEndpoint: string
  serviceName: string

  evalResultsDir: string
  evalDatasetPath: string
  evalK: number
  evalThresholds: { recallAtK: number; mrr: number; faithfulness: number; correctness: number; abstentionAccuracy: number; citationSupport: number }

  /** SQLite telemetry store; must be on persistent storage in production. */
  dbPath: string
  /** 'redacted' (default: emails/phones/keys masked), 'full', or 'off' (no transcript content). */
  transcriptMode: 'redacted' | 'full' | 'off'
  transcriptRetentionDays: number
  telemetryRetentionDays: number
  /** Minimum samples before showing a percentile (otherwise "Insufficient samples"). */
  minSamples: { p50: number; p95: number; p99: number }

  admin: {
    username: string
    passwordHash: string
    sessionTtlHours: number
    sessionIdleMinutes: number
    loginMaxAttempts: number
    loginWindowMinutes: number
    /** Extra allowed Origin for state-changing admin requests (defaults to the request host). */
    allowedOrigin: string
  }
}

let cached: RagConfig | undefined

export function getConfig(): RagConfig {
  if (cached) return cached
  const root = process.cwd()
  const level = str('LOG_LEVEL', 'info') as RagConfig['logLevel']
  cached = {
    geminiApiKey: str('GEMINI_API_KEY'),
    embeddingModel: str('GEMINI_EMBEDDING_MODEL', 'gemini-embedding-2'),
    embeddingDimensions: num('GEMINI_EMBEDDING_DIMENSIONS', 768),
    chatModel: str('GEMINI_CHAT_MODEL', 'gemini-2.5-flash'),
    chatTemperature: num('GEMINI_CHAT_TEMPERATURE', 0.2),
    chatMaxOutputTokens: num('GEMINI_CHAT_MAX_OUTPUT_TOKENS', 1024),
    // 0 disables "thinking" on models that support a budget: lower latency for grounded Q&A.
    chatThinkingBudget: num('GEMINI_CHAT_THINKING_BUDGET', 0),
    // gemini-2.5-pro is no longer available to new API users (verified 2026-10-14).
    judgeModel: str('GEMINI_JUDGE_MODEL', 'gemini-3.1-pro-preview'),
    countEmbeddingTokens: bool('RAG_COUNT_EMBEDDING_TOKENS', true),

    pineconeApiKey: str('PINECONE_API_KEY'),
    pineconeIndexName: str('PINECONE_INDEX_NAME', 'steer-kb'),
    pineconeIndexHost: str('PINECONE_INDEX_HOST'),
    // Namespace defaults to the Sanity dataset so development and production content never mix.
    pineconeNamespace: str('PINECONE_NAMESPACE', str('NEXT_PUBLIC_SANITY_DATASET', 'default')),
    pineconeCloud: str('PINECONE_CLOUD', 'aws'),
    pineconeRegion: str('PINECONE_REGION', 'us-east-1'),

    knowledgeBaseDir: path.resolve(root, str('RAG_KNOWLEDGE_BASE_DIR', 'knowledge-base')),
    chunkSizeTokens: num('RAG_CHUNK_SIZE', 450),
    chunkOverlapTokens: num('RAG_CHUNK_OVERLAP', 60),
    chunkerVersion: 'md-heading-v1',

    // 12/6 measured better than 8/5 on the eval set (completeness 85.7% -> 90.1%, no faithfulness loss).
    topK: num('RAG_TOP_K', 12),
    // A/B on eval v1.3.0: correctness 89.3% -> 94.4%, completeness 86.0% -> 91.2%, +~0.3 s TTFT.
    // Set RAG_RERANK_MODEL=none to disable.
    rerankModel: ((v) => (v === 'none' ? '' : v))(str('RAG_RERANK_MODEL', 'bge-reranker-v2-m3')),
    rerankCandidates: num('RAG_RERANK_CANDIDATES', 20),
    rerankTimeoutMs: num('RAG_RERANK_TIMEOUT_MS', 3000),
    minScore: num('RAG_MIN_SCORE', 0.45),
    maxSources: num('RAG_MAX_SOURCES', 6),
    maxChunksPerDoc: num('RAG_MAX_CHUNKS_PER_DOC', 2),
    maxContextChars: num('RAG_MAX_CONTEXT_CHARS', 12000),
    historyMessages: num('RAG_HISTORY_MESSAGES', 6),

    maxQuestionChars: num('RAG_MAX_QUESTION_CHARS', 1000),
    maxMessages: num('RAG_MAX_MESSAGES', 20),
    maxBodyBytes: num('RAG_MAX_BODY_BYTES', 64 * 1024),
    rateLimitPerMinute: num('RAG_RATE_LIMIT_PER_MINUTE', 20),

    embedTimeoutMs: num('RAG_EMBED_TIMEOUT_MS', 8000),
    searchTimeoutMs: num('RAG_SEARCH_TIMEOUT_MS', 5000),
    generationTimeoutMs: num('RAG_GENERATION_TIMEOUT_MS', 45000),
    maxRetries: num('RAG_MAX_RETRIES', 2),

    latencyTargetMs: num('RAG_LATENCY_TARGET_MS', 4000),
    ttftTargetMs: num('RAG_TTFT_TARGET_MS', 1500),

    logDir: path.resolve(root, str('LOG_DIR', 'logs')),
    logLevel: (['debug', 'info', 'warn', 'error'] as const).includes(level) ? level : 'info',
    logRetentionDays: num('LOG_RETENTION_DAYS', 14),
    logMaxFileBytes: num('LOG_MAX_FILE_MB', 20) * 1024 * 1024,
    traceSampleRate: num('RAG_TRACE_SAMPLE_RATE', 1),
    otlpEndpoint: str('OTEL_EXPORTER_OTLP_ENDPOINT'),
    serviceName: str('OTEL_SERVICE_NAME', 'steer-rag'),

    evalResultsDir: path.resolve(root, str('EVAL_RESULTS_DIR', 'evaluations/runs')),
    evalDatasetPath: path.resolve(root, str('EVAL_DATASET_PATH', 'evaluations/dataset.json')),
    evalK: num('RAG_EVAL_K', 5),
    evalThresholds: {
      recallAtK: num('RAG_EVAL_MIN_RECALL', 0.8),
      mrr: num('RAG_EVAL_MIN_MRR', 0.6),
      faithfulness: num('RAG_EVAL_MIN_FAITHFULNESS', 0.85),
      correctness: num('RAG_EVAL_MIN_CORRECTNESS', 0.75),
      abstentionAccuracy: num('RAG_EVAL_MIN_ABSTENTION_ACCURACY', 0.8),
      citationSupport: num('RAG_EVAL_MIN_CITATION_SUPPORT', 0.85),
    },

    dbPath: path.resolve(root, str('RAG_DB_PATH', 'data/rag.db')),
    transcriptMode: ((v) => (v === 'full' || v === 'off' ? v : 'redacted'))(str('RAG_TRANSCRIPT_MODE', 'redacted')),
    transcriptRetentionDays: num('RAG_TRANSCRIPT_RETENTION_DAYS', 30),
    telemetryRetentionDays: num('RAG_TELEMETRY_RETENTION_DAYS', 90),
    minSamples: { p50: num('RAG_MIN_SAMPLES_P50', 5), p95: num('RAG_MIN_SAMPLES_P95', 20), p99: num('RAG_MIN_SAMPLES_P99', 100) },

    admin: {
      username: str('ADMIN_USERNAME'),
      passwordHash: str('ADMIN_PASSWORD_HASH'),
      sessionTtlHours: num('ADMIN_SESSION_TTL_HOURS', 8),
      sessionIdleMinutes: num('ADMIN_SESSION_IDLE_MINUTES', 60),
      loginMaxAttempts: num('ADMIN_LOGIN_MAX_ATTEMPTS', 5),
      loginWindowMinutes: num('ADMIN_LOGIN_WINDOW_MINUTES', 15),
      allowedOrigin: str('ADMIN_ALLOWED_ORIGIN'),
    },
  }
  return cached
}

/** Identifies vectors produced by a specific embedding setup; a change forces re-embedding. */
export function indexVersion(cfg: RagConfig = getConfig()): string {
  return `${cfg.embeddingModel}:${cfg.embeddingDimensions}:${cfg.chunkerVersion}:${cfg.chunkSizeTokens}-${cfg.chunkOverlapTokens}`
}

/** Missing required settings, by name only (never values). */
export function missingConfig(cfg: RagConfig = getConfig()): string[] {
  const missing: string[] = []
  if (!cfg.geminiApiKey) missing.push('GEMINI_API_KEY')
  if (!cfg.pineconeApiKey) missing.push('PINECONE_API_KEY')
  return missing
}

/** Test hook: drop the cached config after mutating process.env. */
export function resetConfigForTests() {
  cached = undefined
}
