/** Gemini access: query/document embeddings, token counting and streaming generation. */
import { GoogleGenAI } from '@google/genai'
import type { Content, GenerateContentResponseUsageMetadata } from '@google/genai'
import { getConfig } from './config.ts'
import { RagError, classifyError, timeoutSignal, withRetry } from './retry.ts'

let client: GoogleGenAI | undefined

export function gemini(): GoogleGenAI {
  const cfg = getConfig()
  if (!cfg.geminiApiKey) throw new RagError('config_missing', 'GEMINI_API_KEY is not configured')
  client ??= new GoogleGenAI({ apiKey: cfg.geminiApiKey })
  return client
}

export type EmbeddingTask = 'RETRIEVAL_QUERY' | 'RETRIEVAL_DOCUMENT'

export interface EmbedResult {
  vectors: number[][]
  /** Provider-reported embedding tokens are not returned by embedContent on the Gemini API. */
  providerTokens: number | null
  retries: number
}

export async function embedTexts(texts: string[], task: EmbeddingTask, signal?: AbortSignal): Promise<EmbedResult> {
  const cfg = getConfig()
  let retries = 0
  const res = await withRetry(
    () =>
      gemini().models.embedContent({
        model: cfg.embeddingModel,
        contents: texts,
        config: {
          taskType: task,
          outputDimensionality: cfg.embeddingDimensions,
          abortSignal: timeoutSignal(cfg.embedTimeoutMs, signal),
        },
      }),
    (e) => classifyError(e, 'gemini'),
    { retries: cfg.maxRetries, signal, onRetry: () => retries++ },
  )
  const vectors = (res.embeddings ?? []).map((e) => e.values ?? [])
  if (vectors.length !== texts.length || vectors.some((v) => v.length !== cfg.embeddingDimensions)) {
    throw new RagError(
      'embedding_dimension_mismatch',
      `Embedding model returned ${vectors.length} vectors of ${vectors[0]?.length ?? 0} dims; expected ${texts.length} x ${cfg.embeddingDimensions}`,
    )
  }
  const statTokens = (res.embeddings ?? []).map((e) => e.statistics?.tokenCount)
  const providerTokens = statTokens.every((t) => typeof t === 'number') ? statTokens.reduce((a, b) => a + (b as number), 0) : null
  return { vectors, providerTokens, retries }
}

/** Token count for embedding input via the countTokens API (free; run in parallel with embedding). */
export async function countEmbeddingTokens(text: string | string[], signal?: AbortSignal): Promise<number | null> {
  const cfg = getConfig()
  try {
    const r = await gemini().models.countTokens({
      model: cfg.embeddingModel,
      contents: text,
      config: { abortSignal: timeoutSignal(cfg.embedTimeoutMs, signal) },
    })
    return typeof r.totalTokens === 'number' ? r.totalTokens : null
  } catch {
    return null
  }
}

export interface GenerateStreamOptions {
  model: string
  systemInstruction: string
  contents: Content[]
  temperature: number
  maxOutputTokens: number
  thinkingBudget: number
  signal: AbortSignal
  responseMimeType?: string
}

export interface StreamChunk {
  text: string
  usage?: GenerateContentResponseUsageMetadata
  finishReason?: string
  modelVersion?: string
}

/** Models that accept a thinking budget (2.5 family); others ignore/err on it, so omit there. */
const supportsThinkingBudget = (model: string) => /gemini-2\.5/.test(model)

export async function* generateStream(opts: GenerateStreamOptions): AsyncGenerator<StreamChunk> {
  const stream = await gemini().models.generateContentStream({
    model: opts.model,
    contents: opts.contents,
    config: {
      systemInstruction: opts.systemInstruction,
      temperature: opts.temperature,
      maxOutputTokens: opts.maxOutputTokens,
      abortSignal: opts.signal,
      ...(opts.responseMimeType ? { responseMimeType: opts.responseMimeType } : {}),
      ...(supportsThinkingBudget(opts.model) ? { thinkingConfig: { thinkingBudget: opts.thinkingBudget } } : {}),
    },
  })
  for await (const c of stream) {
    yield {
      text: c.text ?? '',
      usage: c.usageMetadata,
      finishReason: c.candidates?.[0]?.finishReason,
      modelVersion: c.modelVersion,
    }
  }
}

/** Non-streaming JSON generation (used by the evaluation judge). */
export async function generateJson(opts: Omit<GenerateStreamOptions, 'responseMimeType'>): Promise<{ text: string; usage?: GenerateContentResponseUsageMetadata }> {
  const res = await withRetry(
    () =>
      gemini().models.generateContent({
        model: opts.model,
        contents: opts.contents,
        config: {
          systemInstruction: opts.systemInstruction,
          temperature: opts.temperature,
          maxOutputTokens: opts.maxOutputTokens,
          responseMimeType: 'application/json',
          abortSignal: opts.signal,
        },
      }),
    (e) => classifyError(e, 'gemini'),
    { retries: getConfig().maxRetries, signal: opts.signal },
  )
  return { text: res.text ?? '', usage: res.usageMetadata }
}
