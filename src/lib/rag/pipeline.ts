/**
 * Chat pipeline: embed query -> Pinecone search -> context assembly -> streamed Gemini answer
 * -> citation validation. Emits NDJSON StreamEvents and persists one RequestRecord.
 *
 * Timing boundaries (all performance.now(), milliseconds):
 *  - t0 is taken when the route handler starts processing (before body parsing).
 *  - embeddingMs: the embedContent call only (countTokens runs in parallel and is not awaited
 *    on the critical path).
 *  - vectorSearchMs: the Pinecone query only (excludes embedding).
 *  - generationMs: from the generateContentStream call until the stream is fully consumed,
 *    including network time and first-token wait.
 *  - serverTtftMs: t0 -> first text chunk enqueued to the HTTP response.
 *  - totalServerMs: t0 -> final `done`/`error` event enqueued. The browser receives it slightly
 *    later; client-observed latency is measured in the browser.
 * Stage durations are sequential except countTokens, so they are not summed into the total.
 */
import crypto from 'node:crypto'
import { LruCache, normalizeQuery } from './cache.ts'
import { getConfig } from './config.ts'
import { ABSTAIN_TEXT, validateCitations } from './citations.ts'
import { emptyUsage, estimateCost, usageFromMetadata } from './cost.ts'
import { countEmbeddingTokens, embedTexts, generateStream } from './gemini.ts'
import type { GenerateStreamOptions, StreamChunk } from './gemini.ts'
import { queryVectors, rerankChunks } from './pinecone.ts'
import { buildContents, buildRetrievalQuery, SYSTEM_INSTRUCTION } from './prompt.ts'
import { assembleContext, toPublicSource } from './retrieval.ts'
import { RagError, classifyError, timeoutSignal } from './retry.ts'
import { logger } from './observability/logger.ts'
import { inSpan, markError, startSpan } from './observability/tracing.ts'
import { recordRequest } from './store/telemetry.ts'
import type { GenerationAttempt } from './store/telemetry.ts'
import type { SpanHandle } from './observability/tracing.ts'
import type {
  ChatRequestBody,
  ContentType,
  PublicSource,
  RequestRecord,
  RequestStatus,
  RetrievedChunk,
  ServerTimings,
  StreamEvent,
  TokenUsage,
} from './types.ts'

export interface PipelineDeps {
  embedQuery: (text: string, signal: AbortSignal) => Promise<{ vector: number[]; cached: boolean }>
  countTokens: (text: string, signal: AbortSignal) => Promise<number | null>
  search: (vector: number[], topK: number, contentTypes: ContentType[] | undefined, signal: AbortSignal) => Promise<RetrievedChunk[]>
  rerank: (query: string, chunks: RetrievedChunk[], model: string, signal: AbortSignal) => Promise<RetrievedChunk[]>
  generate: (opts: GenerateStreamOptions) => AsyncIterable<StreamChunk>
  now: () => number
  persist: boolean
}

const embeddingCache = new LruCache<number[]>(500, 3600_000)
const tokenCache = new LruCache<number>(500, 3600_000)

export const defaultDeps: PipelineDeps = {
  embedQuery: async (text, signal) => {
    const cfg = getConfig()
    const key = `${cfg.embeddingModel}:${cfg.embeddingDimensions}:${normalizeQuery(text)}`
    const hit = embeddingCache.get(key)
    if (hit) return { vector: hit, cached: true }
    const vector = (await embedTexts([text], 'RETRIEVAL_QUERY', signal)).vectors[0]
    embeddingCache.set(key, vector)
    return { vector, cached: false }
  },
  countTokens: async (text, signal) => {
    const key = `${getConfig().embeddingModel}:${normalizeQuery(text)}`
    const hit = tokenCache.get(key)
    if (hit !== undefined) return hit
    const n = await countEmbeddingTokens(text, signal)
    if (n !== null) tokenCache.set(key, n)
    return n
  },
  search: (v, k, types, signal) => queryVectors(v, k, types, signal),
  rerank: (q, chunks, model, signal) => rerankChunks(q, chunks, model, signal),
  generate: (opts) => generateStream(opts),
  now: () => performance.now(),
  persist: true,
}

export interface ChatRun {
  requestId: string
  t0: number
  root: SpanHandle
  validationMs: number
}

export function startChatRun(deps: Pick<PipelineDeps, 'now'> = defaultDeps, route = '/api/rag/chat'): ChatRun {
  const t0 = deps.now()
  const requestId = crypto.randomUUID()
  const root = startSpan('rag.request', undefined, { 'http.route': route, 'http.request.method': 'POST', 'rag.request_id': requestId })
  return { requestId, t0, root, validationMs: 0 }
}

export interface ChatResult {
  status: RequestStatus
  record: RequestRecord
}

export async function runChat(
  run: ChatRun,
  body: ChatRequestBody,
  emit: (e: StreamEvent) => void,
  clientSignal: AbortSignal,
  deps: PipelineDeps = defaultDeps,
): Promise<ChatResult> {
  const cfg = getConfig()
  const { requestId, root } = run
  const traceId = root.traceId
  const ms = (from: number) => Math.round((deps.now() - from) * 10) / 10
  const timings: ServerTimings = {
    validationMs: run.validationMs,
    embeddingMs: null,
    vectorSearchMs: null,
    rerankMs: null,
    contextAssemblyMs: null,
    generationMs: null,
    generationFirstTokenMs: null,
    serverTtftMs: null,
    citationMs: null,
    totalServerMs: 0,
  }
  const question = body.messages[body.messages.length - 1].content
  const history = body.messages.slice(0, -1).slice(-cfg.historyMessages)
  // Every request belongs to a conversation; requests sent without one form a single-turn conversation.
  const conversationId = body.conversationId ?? `single-${requestId}`
  const ids = { conversationId, requestId, traceId, route: '/api/rag/chat' }
  root.span.setAttributes({
    'rag.question_chars': question.length,
    'rag.history_messages': history.length,
    'gen_ai.system': 'gemini',
    'gen_ai.request.model': cfg.chatModel,
    'rag.conversation_id': conversationId,
  })
  logger.info('rag.request.started', { ...ids, spanId: root.spanId, operation: 'chat', historyMessages: history.length, questionChars: question.length })

  let usage: TokenUsage = usageFromMetadata(undefined, null)
  let embeddingTokensPromise: Promise<number | null> = Promise.resolve(null)
  let retrieved = 0
  let sourcesUsed = 0
  let answer = ''
  let firstTokenSent = false
  let publicSources: PublicSource[] = []
  const attempts: GenerationAttempt[] = []
  const warnings: string[] = []
  let status: RequestStatus = 'success'
  let errorCode: string | undefined
  let citations: ReturnType<typeof validateCitations>['report'] | undefined

  try {
    // 1. Preprocess: build the retrieval query (follow-ups include the previous question).
    const retrievalQuery = await inSpan('rag.preprocess', root, async (h) => {
      const q = buildRetrievalQuery(history, question)
      h.span.setAttribute('rag.retrieval_query_chars', q.length)
      return q
    })

    // 2. Query embedding (+ token count in parallel, off the critical path).
    if (cfg.countEmbeddingTokens) embeddingTokensPromise = deps.countTokens(retrievalQuery, clientSignal).catch(() => null)
    const vector = await inSpan(
      'rag.embed_query',
      root,
      async (h) => {
        const t = deps.now()
        try {
          const r = await deps.embedQuery(retrievalQuery, clientSignal)
          h.span.setAttribute('rag.embedding_cache_hit', r.cached)
          timings.embeddingMs = ms(t)
          logger.info('rag.embedding.completed', { ...ids, spanId: h.spanId, operation: 'embedding', model: cfg.embeddingModel, durationMs: timings.embeddingMs, cacheHit: r.cached })
          return r.vector
        } finally {
          timings.embeddingMs ??= ms(t)
        }
      },
      { 'gen_ai.request.model': cfg.embeddingModel, 'gen_ai.operation.name': 'embeddings' },
    )

    // 3. Vector search (more candidates when a reranker will narrow them down).
    const searchK = cfg.rerankModel ? Math.max(cfg.topK, cfg.rerankCandidates) : cfg.topK
    let matches = await inSpan(
      'rag.vector_search',
      root,
      async (h) => {
        const t = deps.now()
        try {
          const m = await deps.search(vector, searchK, body.contentTypes, clientSignal)
          h.span.setAttributes({ 'rag.top_k': searchK, 'rag.matches': m.length, 'rag.top_score': m[0]?.score ?? 0, 'db.system': 'pinecone' })
          timings.vectorSearchMs = ms(t)
          logger.info('rag.retrieval.completed', { ...ids, spanId: h.spanId, operation: 'vector_search', durationMs: timings.vectorSearchMs, matches: m.length, topK: searchK })
          return m
        } finally {
          timings.vectorSearchMs ??= ms(t)
        }
      },
      { 'rag.filter.content_types': (body.contentTypes ?? []).join(',') },
    )
    retrieved = matches.length

    // 3b. Optional reranking of candidates above the similarity threshold. A reranker failure falls
    // back to dense ranking (logged + flagged to the user) instead of failing the request.
    if (cfg.rerankModel) {
      const candidates = matches.filter((m) => m.score >= cfg.minScore)
      const tr = deps.now()
      try {
        matches = await inSpan(
          'rag.rerank',
          root,
          async (h) => {
            const r = await deps.rerank(retrievalQuery, candidates, cfg.rerankModel, clientSignal)
            h.span.setAttributes({ 'rag.rerank.candidates': candidates.length, 'rag.rerank.top_score': r[0]?.rerankScore ?? 0 })
            return r
          },
          { 'rag.rerank.model': cfg.rerankModel },
        )
      } catch (e) {
        if (clientSignal.aborted) throw e
        warnings.push('Reranking was unavailable; results use similarity ranking.')
        logger.warn('rag.rerank.failed', { ...ids, operation: 'rerank', errorCode: (e as { code?: string }).code ?? 'rerank_failed' })
      } finally {
        timings.rerankMs = ms(tr)
      }
    }

    // 4. Context assembly.
    const t4 = deps.now()
    const ctx = await inSpan('rag.context_assembly', root, async (h) => {
      const c = assembleContext(matches, {
        minScore: cfg.minScore,
        maxSources: cfg.maxSources,
        maxChunksPerDoc: cfg.maxChunksPerDoc,
        maxContextChars: cfg.maxContextChars,
      })
      h.span.setAttributes({ 'rag.above_threshold': c.aboveThreshold, 'rag.sources': c.sources.length, 'rag.dropped_for_budget': c.droppedForBudget })
      return c
    })
    timings.contextAssemblyMs = ms(t4)
    sourcesUsed = ctx.sources.length
    publicSources = ctx.sources.map(toPublicSource)
    emit({ type: 'meta', requestId, traceId, model: cfg.chatModel, sources: publicSources })

    if (!ctx.sources.length) {
      // Nothing relevant enough: abstain without calling the generator (saves a model call).
      answer = `${ABSTAIN_TEXT} Please contact the Steer Health team for help with this question.`
      status = 'abstained'
      usage = emptyUsage(null)
      timings.serverTtftMs = ms(run.t0)
      emit({ type: 'delta', text: answer })
      firstTokenSent = true
      citations = { cited: [], invalid: [], abstained: true, uncitedAnswer: false }
      root.span.setAttribute('rag.empty_retrieval', true)
    } else {
      // 5. Generation (streamed). Retries only before any text has been sent.
      const contents = buildContents(history, question, ctx.sources)
      await inSpan(
        'rag.generate',
        root,
        async (h) => {
          const genSignal = timeoutSignal(cfg.generationTimeoutMs, clientSignal)
          const tg = deps.now()
          let lastUsage: StreamChunk['usage']
          let finish: string | undefined
          for (let attempt = 0; ; attempt++) {
            const ta = deps.now()
            try {
              for await (const chunk of deps.generate({
                model: cfg.chatModel,
                systemInstruction: SYSTEM_INSTRUCTION,
                contents,
                temperature: cfg.chatTemperature,
                maxOutputTokens: cfg.chatMaxOutputTokens,
                thinkingBudget: cfg.chatThinkingBudget,
                signal: genSignal,
              })) {
                if (chunk.usage) lastUsage = chunk.usage
                if (chunk.finishReason) finish = chunk.finishReason
                if (!chunk.text) continue
                if (!firstTokenSent) {
                  timings.generationFirstTokenMs = ms(tg)
                  timings.serverTtftMs = ms(run.t0)
                  h.span.addEvent('first_token')
                  firstTokenSent = true
                }
                answer += chunk.text
                emit({ type: 'delta', text: chunk.text })
              }
              attempts.push({ attempt: attempt + 1, status: 'success', durationMs: ms(ta) })
              break
            } catch (e) {
              const err = genSignal.aborted && !clientSignal.aborted ? new RagError('gemini_timeout', 'Generation timed out') : classifyError(e, 'gemini')
              // Failed attempts are recorded separately; their (unknown) usage is never added to the request's usage.
              attempts.push({ attempt: attempt + 1, status: 'error', errorCode: err.code, durationMs: ms(ta) })
              if (firstTokenSent || !err.retryable || attempt >= cfg.maxRetries || clientSignal.aborted) throw err
              h.span.addEvent('retry', { attempt: attempt + 1, 'error.code': err.code })
              logger.warn('rag.generation.retry', { ...ids, spanId: h.spanId, operation: 'generation', model: cfg.chatModel, attempt: attempt + 1, errorCode: err.code })
              await new Promise((r) => setTimeout(r, Math.random() * 250 * 2 ** attempt))
            }
          }
          timings.generationMs = ms(tg)
          usage = usageFromMetadata(lastUsage, null)
          if (finish && finish !== 'STOP') warnings.push(`Generation finished with reason ${finish}.`)
          if (usage.usageSource === 'unavailable') warnings.push('The model did not report token usage for this response.')
          h.span.setAttributes({
            'gen_ai.response.finish_reasons': finish ?? 'unknown',
            'gen_ai.usage.input_tokens': usage.inputTokens ?? -1,
            'gen_ai.usage.output_tokens': usage.outputTokens ?? -1,
            'gen_ai.usage.thinking_tokens': usage.thinkingTokens ?? 0,
          })
          logger.info('rag.generation.completed', {
            ...ids,
            spanId: h.spanId,
            operation: 'generation',
            model: cfg.chatModel,
            durationMs: timings.generationMs,
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            attempts: attempts.length,
            finishReason: finish ?? 'unknown',
          })
        },
        { 'gen_ai.operation.name': 'chat', 'gen_ai.request.model': cfg.chatModel, 'rag.sources': ctx.sources.length },
      )

      // 6. Citation validation.
      const t6 = deps.now()
      await inSpan('rag.citations', root, async (h) => {
        const v = validateCitations(answer, ctx.sources.length)
        answer = v.answer
        citations = v.report
        h.span.setAttributes({ 'rag.cited': v.report.cited.length, 'rag.invalid_citations': v.report.invalid.length, 'rag.abstained': v.report.abstained })
      })
      timings.citationMs = ms(t6)
      if (citations?.abstained) status = 'abstained'
      if (citations?.invalid.length) warnings.push(`Removed ${citations.invalid.length} citation(s) that did not match a source.`)
      if (citations?.uncitedAnswer) warnings.push('This answer contains no citations; verify it against the sources.')
    }

    usage = { ...usage, embeddingTokens: await embeddingTokensPromise }
    const cost = estimateCost(usage, cfg.chatModel, cfg.embeddingModel)
    const cited = new Set(citations?.cited ?? [])
    await inSpan('rag.serialize', root, async () => {
      timings.totalServerMs = ms(run.t0)
      emit({
        type: 'done',
        requestId,
        traceId,
        status,
        answer,
        citations: citations ?? { cited: [], invalid: [], abstained: false, uncitedAnswer: !answer },
        citedSources: publicSources.filter((s) => cited.has(s.n)),
        usage,
        cost,
        timings,
        model: cfg.chatModel,
        embeddingModel: cfg.embeddingModel,
        retrievedCount: retrieved,
        warnings,
      })
    })
  } catch (e) {
    const err = clientSignal.aborted ? new RagError('cancelled', 'Request was cancelled') : classifyError(e, 'gemini')
    status = err.code === 'cancelled' ? 'cancelled' : err.code.endsWith('_timeout') ? 'timeout' : 'error'
    errorCode = err.code
    markError(root, err)
    timings.totalServerMs = ms(run.t0)
    usage = { ...usage, embeddingTokens: await embeddingTokensPromise }
    if (status !== 'cancelled') {
      emit({ type: 'error', requestId, traceId, code: err.code, message: publicMessage(err.code), partial: firstTokenSent })
    }
    if (status !== 'cancelled') logger.error('rag.request.failed', { ...ids, spanId: root.spanId, errorCode: err.code, status, durationMs: timings.totalServerMs })
    else logger.info('rag.request.cancelled', { ...ids, spanId: root.spanId, status, durationMs: timings.totalServerMs })
  } finally {
    root.span.setAttributes({ 'rag.status': status, 'rag.total_server_ms': timings.totalServerMs })
    if (status !== 'error' && status !== 'timeout') root.span.setStatus({ code: 1 })
    root.span.end()
  }

  const record: RequestRecord = {
    timestamp: new Date().toISOString(),
    requestId,
    traceId,
    conversationId,
    status,
    errorCode,
    model: cfg.chatModel,
    embeddingModel: cfg.embeddingModel,
    retrievedCount: retrieved,
    sourcesUsed,
    emptyRetrieval: sourcesUsed === 0 && status !== 'error' && status !== 'timeout' && status !== 'cancelled',
    questionChars: question.length,
    usage,
    cost: estimateCost(usage, cfg.chatModel, cfg.embeddingModel),
    timings,
    citations,
    warnings,
  }
  if (deps.persist) recordRequest({ record, conversationId, rerankModel: cfg.rerankModel, sources: publicSources, attempts, question, answer })
  if (status === 'success' || status === 'abstained') logger.info('rag.request.completed', {
    ...ids,
    spanId: root.spanId,
    status,
    durationMs: timings.totalServerMs,
    model: cfg.chatModel,
    inputTokens: usage.inputTokens,
    outputTokens: usage.outputTokens,
    retrievedCount: retrieved,
    sourcesUsed,
  })
  return { status, record }
}

/** User-facing messages; never include provider details, stack traces or internals. */
export function publicMessage(code: string): string {
  if (code.endsWith('_timeout')) return 'The assistant took too long to respond. Please try again.'
  if (code.endsWith('_rate_limited')) return 'The assistant is busy right now. Please try again in a moment.'
  if (code === 'index_missing' || code === 'config_missing' || code.endsWith('_auth')) return 'The assistant is not available right now.'
  return 'Something went wrong while answering. Please try again.'
}
