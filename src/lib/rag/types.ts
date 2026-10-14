/** Types shared by the RAG server modules and the /rag client UI (type-only; no runtime code). */

export type ContentType = 'page' | 'solutions' | 'products' | 'faqs'

export const CONTENT_TYPES: readonly ContentType[] = ['page', 'solutions', 'products', 'faqs']

export interface KnowledgeDocument {
  /** Sanity document ID; stable across exports. */
  id: string
  title: string
  contentType: ContentType
  slug?: string
  /** Site-relative URL from frontmatter, only when the export provided one. */
  url?: string
  description?: string
  updatedAt?: string
  dataset?: string
  /** Path relative to the knowledge-base directory, e.g. `products/digital-front-door.md`. */
  sourceFile: string
  /** Markdown body without frontmatter. */
  body: string
  /** sha256 of the frontmatter fields we index + body. */
  hash: string
}

export interface Chunk {
  /** `${docId}#${index}` — stable for unchanged documents, prefix-listable in Pinecone. */
  id: string
  docId: string
  index: number
  count: number
  /** Heading path inside the document, e.g. `Why Everyone Loves DFD > Be discovered first`. */
  section: string
  /** Text that is embedded and shown to the model (includes document/section context). */
  text: string
  hash: string
}

export interface ChunkMetadata {
  doc_id: string
  chunk_id: string
  chunk_index: number
  chunk_count: number
  title: string
  content_type: ContentType
  slug?: string
  url?: string
  section?: string
  source_file: string
  doc_hash: string
  chunk_hash: string
  index_version: string
  embedding_model: string
  dataset?: string
  updated_at?: string
  text: string
}

export interface RetrievedChunk {
  id: string
  /** Cosine similarity from Pinecone. A ranking signal, NOT a probability of correctness. */
  score: number
  /** Relevance score from the optional reranker (model-specific scale). */
  rerankScore?: number
  metadata: ChunkMetadata
}

/** One numbered source given to the model: a document with 1..n of its retrieved chunks. */
export interface Source {
  n: number
  docId: string
  title: string
  contentType: ContentType
  url?: string
  sourceFile: string
  chunks: { id: string; section?: string; score: number; text: string }[]
  topScore: number
}

export interface TokenUsage {
  /** Gemini `promptTokenCount` of the final successful generation call (includes context). */
  inputTokens: number | null
  /** Gemini `candidatesTokenCount`. */
  outputTokens: number | null
  /** Gemini `thoughtsTokenCount` (billed as output); 0 when thinking is disabled. */
  thinkingTokens: number | null
  /** Gemini `cachedContentTokenCount` (subset of input). */
  cachedTokens: number | null
  /** Gemini `totalTokenCount` for the generation call. */
  generationTotalTokens: number | null
  /** Query-embedding tokens, from the countTokens API (embedContent reports no usage). */
  embeddingTokens: number | null
  usageSource: 'provider' | 'unavailable'
}

export interface CostEstimate {
  generationUsd: number | null
  embeddingUsd: number | null
  totalUsd: number | null
  pricingVersion: string
  /** Always an estimate from configured list prices, never a billed amount. */
  estimated: true
}

/** Server-measured timings in ms (performance.now()). Spans may overlap; see docs/RAG.md. */
export interface ServerTimings {
  validationMs: number
  embeddingMs: number | null
  vectorSearchMs: number | null
  /** Pinecone hosted reranking call; null when reranking is disabled. */
  rerankMs: number | null
  contextAssemblyMs: number | null
  /** From generation call start until the stream is fully consumed. */
  generationMs: number | null
  /** From generation call start to the first text chunk from Gemini. */
  generationFirstTokenMs: number | null
  /** From server request start to the first text chunk being enqueued to the response. */
  serverTtftMs: number | null
  citationMs: number | null
  /** Server request start -> final event enqueued (stream completion on the server). */
  totalServerMs: number
}

export interface CitationReport {
  cited: number[]
  invalid: number[]
  uncitedAnswer: boolean
  abstained: boolean
}

export type RequestStatus = 'success' | 'abstained' | 'error' | 'cancelled' | 'timeout'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatRequestBody {
  messages: ChatMessage[]
  contentTypes?: ContentType[]
  conversationId?: string
}

/** NDJSON events streamed from POST /api/rag/chat. */
export type StreamEvent =
  | { type: 'meta'; requestId: string; traceId: string; model: string; sources: PublicSource[] }
  | { type: 'delta'; text: string }
  | {
      type: 'done'
      requestId: string
      traceId: string
      status: RequestStatus
      answer: string
      citations: CitationReport
      citedSources: PublicSource[]
      usage: TokenUsage
      cost: CostEstimate
      timings: ServerTimings
      model: string
      embeddingModel: string
      retrievedCount: number
      warnings: string[]
    }
  | { type: 'error'; requestId: string; traceId: string; code: string; message: string; partial: boolean }

export interface PublicSource {
  n: number
  docId: string
  title: string
  contentType: ContentType
  url?: string
  topScore: number
  sections: string[]
  excerpt: string
}

/** One persisted record per chat request (logs/requests-*.jsonl); feeds the metrics dashboard. */
export interface RequestRecord {
  timestamp: string
  requestId: string
  traceId: string
  conversationId?: string
  status: RequestStatus
  errorCode?: string
  model: string
  embeddingModel: string
  retrievedCount: number
  sourcesUsed: number
  emptyRetrieval: boolean
  questionChars: number
  usage: TokenUsage
  cost: CostEstimate
  timings: ServerTimings
  citations?: CitationReport
  warnings?: string[]
}
