/**
 * Token accounting and cost estimation.
 *
 * Prices are list prices (USD per 1M tokens, paid tier, standard) read from the official page
 * https://ai.google.dev/gemini-api/docs/pricing on 2026-10-14 (page last updated 2026-10-13).
 * They are estimates, not billed amounts. Override with RAG_PRICING_JSON, e.g.
 *   {"version":"2027-01","models":{"gemini-2.5-flash":{"inputPer1M":0.3,"outputPer1M":2.5}}}
 * A model without a price yields `null` cost (shown as "Unavailable"), never a guess.
 */
import type { GenerateContentResponseUsageMetadata } from '@google/genai'
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
  version: 'google-list-2026-10-13',
  source: 'https://ai.google.dev/gemini-api/docs/pricing (retrieved 2026-10-14)',
  models: {
    // Prompts <= 200k tokens. Output price includes thinking tokens.
    'gemini-2.5-flash': { inputPer1M: 0.3, outputPer1M: 2.5, cachedInputPer1M: 0.03 },
    'gemini-3.5-flash-lite': { inputPer1M: 0.3, outputPer1M: 2.5, cachedInputPer1M: 0.03 },
    'gemini-3.1-flash-lite': { inputPer1M: 0.25, outputPer1M: 1.5, cachedInputPer1M: 0.025 },
    'gemini-3.1-pro-preview': { inputPer1M: 2, outputPer1M: 12, cachedInputPer1M: 0.2 },
    'gemini-embedding-2': { inputPer1M: 0.2, outputPer1M: 0 },
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
 * Usage from the final streamed chunk's usageMetadata. Gemini reports cumulative usage on the
 * last chunk, so values are taken from the last chunk that has them — never summed across chunks.
 */
export function usageFromMetadata(meta: GenerateContentResponseUsageMetadata | undefined, embeddingTokens: number | null): TokenUsage {
  if (!meta) {
    return { inputTokens: null, outputTokens: null, thinkingTokens: null, cachedTokens: null, generationTotalTokens: null, embeddingTokens, usageSource: 'unavailable' }
  }
  return {
    inputTokens: num(meta.promptTokenCount),
    outputTokens: num(meta.candidatesTokenCount) ?? 0,
    thinkingTokens: num(meta.thoughtsTokenCount) ?? 0,
    cachedTokens: num(meta.cachedContentTokenCount) ?? 0,
    generationTotalTokens: num(meta.totalTokenCount),
    embeddingTokens,
    usageSource: num(meta.promptTokenCount) === null ? 'unavailable' : 'provider',
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
