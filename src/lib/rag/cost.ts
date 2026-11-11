/**
 * Token accounting and cost estimation.
 *
 * Prices are list prices (USD per 1M tokens, on-demand) read on 2026-11-11 from
 * https://console.groq.com/docs/model/openai/gpt-oss-120b and https://www.pinecone.io/pricing/.
 * They are estimates, not billed amounts. Override with RAG_PRICING_JSON, e.g.
 *   {"version":"2027-01","models":{"openai/gpt-oss-120b":{"inputPer1M":0.15,"outputPer1M":0.6}}}
 * A model without a price yields `null` cost (shown as "Unavailable"), never a guess.
 */
import type { LlmUsage } from './groq.ts'
import type { CostEstimate, TokenUsage } from './types.ts'

export interface ModelPrice {
  inputPer1M: number
  outputPer1M: number
  cachedInputPer1M?: number
}

export interface PricingTable {
  version: string
  source: string
  models: Record<string, ModelPrice>
}

export const DEFAULT_PRICING: PricingTable = {
  version: 'groq-pinecone-list-2026-11-11',
  source: 'console.groq.com/docs/model/openai/gpt-oss-120b; pinecone.io/pricing (retrieved 2026-11-11)',
  models: {
    // Output price includes reasoning tokens.
    'openai/gpt-oss-120b': { inputPer1M: 0.15, outputPer1M: 0.6, cachedInputPer1M: 0.075 },
    'llama-text-embed-v2': { inputPer1M: 0.16, outputPer1M: 0 },
  },
}

let pricing: PricingTable | undefined

export function getPricing(): PricingTable {
  if (pricing) return pricing
  const raw = process.env.RAG_PRICING_JSON?.trim()
  if (raw) {
    try {
      const p = JSON.parse(raw) as Partial<PricingTable>
      pricing = { version: p.version ?? 'custom', source: p.source ?? 'RAG_PRICING_JSON', models: { ...DEFAULT_PRICING.models, ...(p.models ?? {}) } }
      return pricing
    } catch {
      // Fall through to defaults; invalid override is reported by the health check.
    }
  }
  pricing = DEFAULT_PRICING
  return pricing
}

const num = (v: unknown): number | null => (typeof v === 'number' && Number.isFinite(v) ? v : null)

/**
 * Usage from the final streamed chunk. Groq reports usage once, on the last chunk, so values are
 * taken from the last chunk that has them — never summed across chunks. Groq's completion_tokens
 * includes reasoning tokens; they are split out so output + thinking = completion_tokens.
 */
export function usageFromMetadata(meta: LlmUsage | undefined, embeddingTokens: number | null): TokenUsage {
  if (!meta) {
    return { inputTokens: null, outputTokens: null, thinkingTokens: null, cachedTokens: null, generationTotalTokens: null, embeddingTokens, usageSource: 'unavailable' }
  }
  const completion = num(meta.completion_tokens) ?? 0
  const reasoning = Math.min(completion, num(meta.completion_tokens_details?.reasoning_tokens) ?? 0)
  return {
    inputTokens: num(meta.prompt_tokens),
    outputTokens: completion - reasoning,
    thinkingTokens: reasoning,
    cachedTokens: num(meta.prompt_tokens_details?.cached_tokens) ?? 0,
    generationTotalTokens: num(meta.total_tokens),
    embeddingTokens,
    usageSource: num(meta.prompt_tokens) === null ? 'unavailable' : 'provider',
  }
}

export function emptyUsage(embeddingTokens: number | null = null): TokenUsage {
  return { inputTokens: 0, outputTokens: 0, thinkingTokens: 0, cachedTokens: 0, generationTotalTokens: 0, embeddingTokens, usageSource: 'provider' }
}

export function estimateCost(usage: TokenUsage, chatModel: string, embeddingModel: string, table: PricingTable = getPricing()): CostEstimate {
  const chat = table.models[chatModel]
  const emb = table.models[embeddingModel]
  let generationUsd: number | null = null
  if (chat && usage.inputTokens !== null) {
    const cached = usage.cachedTokens ?? 0
    const uncached = Math.max(0, usage.inputTokens - cached)
    const out = (usage.outputTokens ?? 0) + (usage.thinkingTokens ?? 0)
    generationUsd = (uncached * chat.inputPer1M + cached * (chat.cachedInputPer1M ?? chat.inputPer1M) + out * chat.outputPer1M) / 1e6
  }
  const embeddingUsd = emb && usage.embeddingTokens !== null ? (usage.embeddingTokens * emb.inputPer1M) / 1e6 : null
  const totalUsd = generationUsd === null && embeddingUsd === null ? null : (generationUsd ?? 0) + (embeddingUsd ?? 0)
  return { generationUsd, embeddingUsd, totalUsd, pricingVersion: table.version, estimated: true }
}
