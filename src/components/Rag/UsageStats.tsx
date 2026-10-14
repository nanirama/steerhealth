'use client'

import { useId, useState } from 'react'
import type { StreamEvent } from '@/lib/rag/types'
import { fmtInt, fmtMs, fmtUsd } from './format'

export type DoneEvent = Extract<StreamEvent, { type: 'done' }>

export interface ClientTimings {
  /** Browser: request sent -> first answer text received. */
  ttftMs: number | null
  /** Browser: request sent -> final event received. */
  completionMs: number | null
}

/** Label with a dotted underline and an accessible tooltip (hover + keyboard focus). */
export function Term({ label, tip }: { label: string; tip: string }) {
  const id = useId()
  return (
    <span className="group relative inline-flex">
      <span tabIndex={0} aria-describedby={id} className="cursor-help border-b border-dotted border-[#9A9A9A] text-[#5C5C5C] outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[#335CFF]/40">
        {label}
      </span>
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[220px] -translate-x-1/2 rounded-lg bg-[#171717] px-2.5 py-1.5 text-[11px] leading-snug text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {tip}
      </span>
    </span>
  )
}

const TIPS = {
  input: 'Prompt tokens sent to Gemini, including instructions and retrieved context (provider-reported).',
  output: 'Tokens Gemini generated for this answer (provider-reported).',
  total: 'Gemini totalTokenCount for the generation call (input + output + any thinking).',
  latency: 'End-to-end time measured in your browser, from sending the question to receiving the complete answer.',
}

/** Compact pill shown under every completed answer: Input | Output | Total | Latency. */
export function MetricsBar({ done, client }: { done: DoneEvent; client: ClientTimings }) {
  const [open, setOpen] = useState(false)
  const u = done.usage
  const items: [string, string, string][] = [
    ['Input', TIPS.input, fmtInt(u.inputTokens)],
    ['Output', TIPS.output, fmtInt(u.outputTokens)],
    ['Total', TIPS.total, fmtInt(u.generationTotalTokens)],
    ['Latency', TIPS.latency, fmtMs(client.completionMs ?? done.timings.totalServerMs)],
  ]
  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex flex-wrap items-center rounded-full border border-[#EBEBEB] bg-[#F7F7F7] px-1 py-1 text-[12px] leading-5 tabular-nums">
          {items.map(([label, tip, value], i) => (
            <span key={label} className={`inline-flex items-center gap-1.5 px-3 ${i ? 'border-l border-[#E9EAEB]' : ''}`}>
              <Term label={label} tip={tip} />
              <span className="font-medium text-[#171717]">{value}</span>
            </span>
          ))}
        </div>
        {/* <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="rounded-full px-2.5 py-1 text-[12px] font-medium text-[#335CFF] transition-colors hover:bg-[#335CFF]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#335CFF]/40"
        >
          {open ? 'Hide details' : 'Performance details'}
        </button> */}
      </div>
      {/* {open && <Breakdown done={done} client={client} />} */}
    </div>
  )
}

function Row({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <dt className="text-[#5C5C5C]">{hint ? <Term label={label} tip={hint} /> : label}</dt>
      <dd className="font-medium tabular-nums text-[#171717]">{value}</dd>
    </div>
  )
}

export function Breakdown({ done, client }: { done: DoneEvent; client: ClientTimings }) {
  const t = done.timings
  const u = done.usage
  return (
    <div className="mt-3 grid gap-x-8 gap-y-1 rounded-2xl border border-[#EBEBEB] bg-white p-4 text-[13px] sm:grid-cols-2">
      <dl className="divide-y divide-[#F0F0F0]">
        <p className="pb-1 text-[11px] font-semibold uppercase tracking-wide text-[#818181]">Latency</p>
        <Row label="Client completion" value={fmtMs(client.completionMs)} hint={TIPS.latency} />
        <Row label="Time to first token" value={fmtMs(client.ttftMs)} hint="Browser: request sent -> first answer text received." />
        <Row label="Server total" value={fmtMs(t.totalServerMs)} hint="Server: request received -> final event sent (excludes network to your browser)." />
        <Row label="Server TTFT" value={fmtMs(t.serverTtftMs)} hint="Server: request received -> first answer text sent." />
        <Row label="Query embedding" value={fmtMs(t.embeddingMs)} hint="Gemini embedContent call for your question." />
        <Row label="Vector search" value={fmtMs(t.vectorSearchMs)} hint="Pinecone query only (excludes embedding)." />
        {t.rerankMs !== null && <Row label="Reranking" value={fmtMs(t.rerankMs)} hint="Pinecone hosted reranker over the retrieved candidates." />}
        <Row label="Generation" value={fmtMs(t.generationMs)} hint="Gemini streaming call, from request to last token (includes first-token wait)." />
      </dl>
      <dl className="divide-y divide-[#F0F0F0]">
        <p className="pb-1 text-[11px] font-semibold uppercase tracking-wide text-[#818181]">Tokens & cost</p>
        <Row label="Input tokens" value={fmtInt(u.inputTokens)} />
        <Row label="Output tokens" value={fmtInt(u.outputTokens)} />
        <Row label="Thinking tokens" value={fmtInt(u.thinkingTokens)} hint="Reasoning tokens (billed as output). 0 when thinking is disabled." />
        <Row label="Cached tokens" value={fmtInt(u.cachedTokens)} hint="Portion of input served from Gemini's context cache." />
        <Row label="Generation total" value={fmtInt(u.generationTotalTokens)} />
        <Row label="Embedding tokens" value={fmtInt(u.embeddingTokens)} hint="Question tokens counted with the countTokens API for the embedding model (tracked separately)." />
        <Row label="Estimated cost" value={fmtUsd(done.cost.totalUsd)} hint={`Estimate from list prices (${done.cost.pricingVersion}); not a billed amount.`} />
      </dl>
      <p className="text-[11px] text-[#818181] sm:col-span-2">
        {done.model} · {done.embeddingModel} · {done.retrievedCount} chunks retrieved · request {done.requestId.slice(0, 8)}
      </p>
    </div>
  )
}

export interface ConversationTotals {
  requests: number
  withUsage: number
  input: number
  output: number
  thinking: number
  generationTotal: number
  embedding: number
  costUsd: number
  costKnown: boolean
}

export const EMPTY_TOTALS: ConversationTotals = { requests: 0, withUsage: 0, input: 0, output: 0, thinking: 0, generationTotal: 0, embedding: 0, costUsd: 0, costKnown: true }

export function addToTotals(t: ConversationTotals, d: DoneEvent): ConversationTotals {
  const u = d.usage
  const has = u.usageSource === 'provider'
  return {
    requests: t.requests + 1,
    withUsage: t.withUsage + (has ? 1 : 0),
    input: t.input + (has ? (u.inputTokens ?? 0) : 0),
    output: t.output + (has ? (u.outputTokens ?? 0) : 0),
    thinking: t.thinking + (has ? (u.thinkingTokens ?? 0) : 0),
    generationTotal: t.generationTotal + (has ? (u.generationTotalTokens ?? 0) : 0),
    embedding: t.embedding + (u.embeddingTokens ?? 0),
    costUsd: t.costUsd + (d.cost.totalUsd ?? 0),
    costKnown: t.costKnown && d.cost.totalUsd !== null,
  }
}

function Stat({ label, value, tip, strong }: { label: string; value: string; tip?: string; strong?: boolean }) {
  return (
    <div className="rounded-xl border border-[#EBEBEB] bg-[#F7F7F7] px-3 py-2.5">
      <div className="text-[11px] text-[#5C5C5C]">{tip ? <Term label={label} tip={tip} /> : label}</div>
      <div className={`mt-0.5 tabular-nums text-[#171717] ${strong ? 'text-[20px] font-semibold font3' : 'text-[15px] font-medium'}`}>{value}</div>
    </div>
  )
}

/** Sidebar panel: current request + cumulative conversation usage, together with latency. */
export function UsagePanel({
  current,
  client,
  liveMs,
  streaming,
  totals,
}: {
  current: DoneEvent | null
  client: ClientTimings | null
  liveMs: number | null
  streaming: boolean
  totals: ConversationTotals
}) {
  const u = current?.usage
  const t = current?.timings
  return (
    <section aria-labelledby="usage-heading" className="rounded-[24px] border border-[#EBEBEB] bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 id="usage-heading" className="font3 text-[16px] font-semibold text-[#171717]">
          Usage & latency
        </h2>
        {streaming && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#335CFF]/10 px-2.5 py-0.5 text-[12px] font-medium tabular-nums text-[#335CFF]" aria-live="off">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#335CFF] motion-reduce:animate-none" />
            {fmtMs(liveMs)}
          </span>
        )}
      </div>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-[#818181]">Current request</p>
      {current && client ? (
        <>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Stat label="Input tokens" value={fmtInt(u?.inputTokens)} tip={TIPS.input} />
            <Stat label="Output tokens" value={fmtInt(u?.outputTokens)} tip={TIPS.output} />
            <Stat label="Total tokens" value={fmtInt(u?.generationTotalTokens)} tip={TIPS.total} />
            <Stat label="Total latency" value={fmtMs(client.completionMs)} tip={TIPS.latency} strong />
          </div>
          <dl className="mt-3 divide-y divide-[#F0F0F0] text-[13px]">
            <Row label="Time to first token" value={fmtMs(client.ttftMs)} hint="Browser: request sent -> first answer text." />
            <Row label="Embedding" value={fmtMs(t?.embeddingMs)} />
            <Row label="Vector search" value={fmtMs(t?.vectorSearchMs)} />
            {t?.rerankMs != null && <Row label="Reranking" value={fmtMs(t.rerankMs)} />}
            <Row label="Generation" value={fmtMs(t?.generationMs)} />
            <Row label="Server total" value={fmtMs(t?.totalServerMs)} />
            <Row label="Embedding tokens" value={fmtInt(u?.embeddingTokens)} />
            <Row label="Estimated cost" value={fmtUsd(current.cost.totalUsd)} hint="Estimate from configured list prices, not a billed amount." />
          </dl>
        </>
      ) : (
        <p className="mt-2 rounded-xl bg-[#F7F7F7] px-3 py-3 text-[13px] text-[#5C5C5C]">{streaming ? 'Measuring…' : 'Ask a question to see token usage and latency.'}</p>
      )}

      <p className="mt-5 text-[11px] font-semibold uppercase tracking-wide text-[#818181]">This conversation</p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Stat label="Input tokens" value={fmtInt(totals.input)} tip="Sum of Gemini prompt tokens across completed answers." />
        <Stat label="Output tokens" value={fmtInt(totals.output)} tip="Sum of Gemini output tokens across completed answers." />
        <Stat label="Generation tokens" value={fmtInt(totals.generationTotal)} tip="Sum of Gemini totalTokenCount (input + output + thinking) across answers." />
        <Stat label="Embedding tokens" value={fmtInt(totals.embedding)} tip="Sum of query-embedding tokens. Not included in generation tokens." />
      </div>
      <dl className="mt-3 divide-y divide-[#F0F0F0] text-[13px]">
        <Row label="Answers" value={`${totals.requests}${totals.withUsage < totals.requests ? ` (${totals.withUsage} with usage)` : ''}`} />
        <Row label="Estimated cost" value={totals.requests ? `${fmtUsd(totals.costUsd)}${totals.costKnown ? '' : '+'}` : '$0.00'} hint="Generation + embedding estimates. '+' means some answers had no price available." />
      </dl>
    </section>
  )
}
