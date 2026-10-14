'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ContentType, PublicSource } from '@/lib/rag/types'
import AnswerMarkdown from './AnswerMarkdown'
import SourceList from './SourceList'
import { EMPTY_TOTALS, MetricsBar, UsagePanel, addToTotals } from './UsageStats'
import type { ClientTimings, ConversationTotals, DoneEvent } from './UsageStats'
import { readEvents } from './format'

type Turn =
  | { id: string; role: 'user'; text: string }
  | {
      id: string
      role: 'assistant'
      text: string
      state: 'streaming' | 'done' | 'error' | 'cancelled'
      retrieved: PublicSource[]
      done?: DoneEvent
      error?: { message: string; partial: boolean }
      client: ClientTimings
      question: string
    }

const SUGGESTIONS = [
  'What is AI Front Door and what results does it deliver?',
  'How does Steer Health help hospitals and health systems?',
  'Which EHR systems does Steer Health integrate with?',
  'What can the Luna virtual assistant do?',
  'How secure is patient data with Steer Health?',
  'How long does it take to go live?',
]

const FILTERS: { value: ContentType; label: string }[] = [
  { value: 'products', label: 'Products' },
  { value: 'solutions', label: 'Solutions' },
  { value: 'page', label: 'Pages' },
  { value: 'faqs', label: 'FAQs' },
]

const MAX_CHARS = 1000
const newId = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now() + Math.random()))

export default function ChatPanel() {
  const [turns, setTurns] = useState<Turn[]>([])
  const [input, setInput] = useState('')
  const [filters, setFilters] = useState<ContentType[]>([])
  const [streaming, setStreaming] = useState(false)
  const [liveMs, setLiveMs] = useState<number | null>(null)
  const [totals, setTotals] = useState<ConversationTotals>(EMPTY_TOTALS)
  const [highlight, setHighlight] = useState<{ id: string; n: number } | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const conversationId = useRef(newId().replace(/[^A-Za-z0-9_-]/g, '').slice(0, 32))
  const abortRef = useRef<AbortController | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const stickToBottom = useRef(true)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const lastDone = [...turns].reverse().find((t): t is Extract<Turn, { role: 'assistant' }> => t.role === 'assistant' && Boolean(t.done))

  // Auto-scroll only while the user is near the bottom (never fight a manual scroll-up).
  useEffect(() => {
    const el = scrollRef.current
    if (el && stickToBottom.current) el.scrollTo({ top: el.scrollHeight })
  }, [turns])

  const onScroll = () => {
    const el = scrollRef.current
    if (el) stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80
  }

  const updateAssistant = (id: string, patch: (t: Extract<Turn, { role: 'assistant' }>) => Partial<Extract<Turn, { role: 'assistant' }>>) =>
    setTurns((ts) => ts.map((t) => (t.id === id && t.role === 'assistant' ? { ...t, ...patch(t) } : t)))

  const ask = useCallback(
    async (questionRaw: string) => {
      const question = questionRaw.trim()
      if (!question || streaming) return
      if (question.length > MAX_CHARS) {
        setNotice(`Questions are limited to ${MAX_CHARS} characters.`)
        return
      }
      setNotice(null)
      setInput('')
      stickToBottom.current = true
      const history = turns
        .filter((t) => t.role === 'user' || (t.role === 'assistant' && t.state === 'done'))
        .slice(-6)
        .map((t) => ({ role: t.role, content: t.role === 'user' ? t.text : (t.done?.answer ?? t.text) }))
      const userTurn: Turn = { id: newId(), role: 'user', text: question }
      const aId = newId()
      const assistant: Turn = { id: aId, role: 'assistant', text: '', state: 'streaming', retrieved: [], client: { ttftMs: null, completionMs: null }, question }
      setTurns((ts) => [...ts, userTurn, assistant])
      setStreaming(true)

      const controller = new AbortController()
      abortRef.current = controller
      const t0 = performance.now()
      setLiveMs(0)
      const timer = window.setInterval(() => setLiveMs(performance.now() - t0), 100)
      let gotFirst = false
      let clientTtft: number | null = null
      try {
        const res = await fetch('/api/rag/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [...history, { role: 'user', content: question }], contentTypes: filters.length ? filters : undefined, conversationId: conversationId.current }),
          signal: controller.signal,
        })
        if (!res.ok || !res.body) {
          const data = (await res.json().catch(() => ({}))) as { error?: { message?: string } }
          const retry = res.headers.get('Retry-After')
          throw new Error(data.error?.message ?? (res.status === 429 && retry ? `Too many requests. Try again in ${retry}s.` : 'The assistant is unavailable right now.'))
        }
        for await (const ev of readEvents(res.body)) {
          if (ev.type === 'meta') updateAssistant(aId, () => ({ retrieved: ev.sources }))
          else if (ev.type === 'delta') {
            if (!gotFirst) {
              gotFirst = true
              const ttft = performance.now() - t0
              clientTtft = ttft
              updateAssistant(aId, (t) => ({ client: { ...t.client, ttftMs: ttft } }))
            }
            updateAssistant(aId, (t) => ({ text: t.text + ev.text }))
          } else if (ev.type === 'done') {
            const completion = performance.now() - t0
            updateAssistant(aId, (t) => ({ state: 'done', text: ev.answer, done: ev, client: { ...t.client, completionMs: completion } }))
            setTotals((tot) => addToTotals(tot, ev))
            // Report client-observed latency (the server cannot measure browser receipt time).
            void fetch('/api/rag/client-metrics', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ requestId: ev.requestId, ttftMs: clientTtft, completionMs: completion }),
              keepalive: true,
            }).catch(() => undefined)
          } else if (ev.type === 'error') {
            updateAssistant(aId, () => ({ state: 'error', error: { message: ev.message, partial: ev.partial } }))
          }
        }
      } catch (e) {
        if (controller.signal.aborted) updateAssistant(aId, (t) => ({ state: 'cancelled', error: { message: 'Stopped.', partial: Boolean(t.text) } }))
        else updateAssistant(aId, (t) => ({ state: 'error', error: { message: (e as Error).message || 'Network error. Please try again.', partial: Boolean(t.text) } }))
      } finally {
        window.clearInterval(timer)
        setLiveMs(performance.now() - t0)
        setStreaming(false)
        abortRef.current = null
        setTurns((ts) => ts.map((t) => (t.id === aId && t.role === 'assistant' && t.state === 'streaming' ? { ...t, state: 'error', error: { message: 'The response ended unexpectedly.', partial: Boolean(t.text) } } : t)))
        inputRef.current?.focus()
      }
    },
    [filters, streaming, turns],
  )

  const stop = () => abortRef.current?.abort()

  const reset = () => {
    abortRef.current?.abort()
    setTurns([])
    setTotals(EMPTY_TOTALS)
    setLiveMs(null)
    setNotice(null)
    conversationId.current = newId().replace(/[^A-Za-z0-9_-]/g, '').slice(0, 32)
    inputRef.current?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      void ask(input)
    }
  }

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text.replace(/\s?\[\d+(?:,\s*\d+)*\]/g, ''))
      setNotice('Answer copied to clipboard.')
    } catch {
      setNotice('Could not copy to clipboard.')
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <section aria-label="Conversation" className="flex min-h-[560px] flex-col overflow-hidden rounded-[24px] border border-[#EBEBEB] bg-white lg:h-[calc(100vh-220px)] lg:max-h-[860px]">
        {/* <div className="flex flex-wrap items-center gap-2 border-b border-[#F0F0F0] px-4 py-3 sm:px-6">
          <span className="mr-1 text-[12px] font-medium text-[#818181]">Search in</span>
          <button
            type="button"
            onClick={() => setFilters([])}
            aria-pressed={!filters.length}
            className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${!filters.length ? 'border-[#335CFF] bg-[#335CFF] text-white' : 'border-[#EBEBEB] text-[#5C5C5C] hover:border-[#335CFF]/50'}`}
          >
            All
          </button>
          {FILTERS.map((f) => {
            const on = filters.includes(f.value)
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={on}
                onClick={() => setFilters((fs) => (on ? fs.filter((x) => x !== f.value) : [...fs, f.value]))}
                className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${on ? 'border-[#335CFF] bg-[#335CFF]/10 text-[#335CFF]' : 'border-[#EBEBEB] text-[#5C5C5C] hover:border-[#335CFF]/50'}`}
              >
                {f.label}
              </button>
            )
          })}
          <button
            type="button"
            onClick={reset}
            disabled={!turns.length}
            className="ml-auto inline-flex items-center gap-1.5 rounded-[8px] border border-[#EBEBEB] px-3 py-1.5 text-[12px] font-medium text-[#171717] transition-colors hover:border-[#335CFF] hover:text-[#335CFF] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            New conversation
          </button>
        </div> */}

        <div ref={scrollRef} onScroll={onScroll} className="flex-1 overflow-y-auto px-4 py-6 sm:px-6" aria-live="polite" aria-busy={streaming}>
          {!turns.length ? (
            <div className="mx-auto flex h-full max-w-[640px] flex-col justify-center py-6">
              <p className="font3 text-center text-[20px] font-semibold text-[#171717]">What would you like to know?</p>
              <p className="mt-1 text-center text-[14px] text-[#5C5C5C]">Answers come only from Steer Health&rsquo;s published pages, products, solutions and FAQs, with sources.</p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void ask(s)}
                    className="group rounded-2xl border border-[#EBEBEB] bg-[#FAFAFA] px-4 py-3 text-left text-[14px] text-[#171717] transition-all duration-200 hover:border-[#335CFF]/60 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#335CFF]/40"
                  >
                    {s}
                    <span className="ml-1 text-[#335CFF] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ol className="mx-auto max-w-[820px] space-y-6">
              {turns.map((t) =>
                t.role === 'user' ? (
                  <li key={t.id} className="flex justify-end">
                    <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-[#335CFF] px-4 py-2.5 text-[15px] leading-relaxed text-white">{t.text}</div>
                  </li>
                ) : (
                  <li key={t.id} className="flex gap-3">
                    <div aria-hidden="true" className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6FCAFF] via-[#3591FA] to-[#0030A6] text-[12px] font-semibold text-white">
                      AI
                    </div>
                    <div className="min-w-0 flex-1">
                      {t.text ? (
                        <AnswerMarkdown
                          text={t.text}
                          messageId={t.id}
                          validCitations={t.retrieved.length}
                          onCite={(n) => {
                            setHighlight({ id: t.id, n })
                            document.getElementById(`${t.id}-source-${n}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
                          }}
                        />
                      ) : t.state === 'streaming' ? (
                        <div className="space-y-2 pt-1" aria-label="Generating answer">
                          <div className="flex items-center gap-1.5 text-[13px] text-[#818181]">
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#335CFF] motion-reduce:animate-none" />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#335CFF] [animation-delay:120ms] motion-reduce:animate-none" />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#335CFF] [animation-delay:240ms] motion-reduce:animate-none" />
                            <span className="ml-2">{t.retrieved.length ? `Found ${t.retrieved.length} relevant source${t.retrieved.length > 1 ? 's' : ''}, writing answer…` : 'Searching the knowledge base…'}</span>
                          </div>
                          <div className="h-3 w-3/4 animate-pulse rounded bg-[#F2F2F2] motion-reduce:animate-none" />
                          <div className="h-3 w-1/2 animate-pulse rounded bg-[#F2F2F2] motion-reduce:animate-none" />
                        </div>
                      ) : null}

                      {t.state === 'streaming' && t.text && <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-[#335CFF] align-middle motion-reduce:animate-none" aria-hidden="true" />}

                      {(t.state === 'error' || t.state === 'cancelled') && (
                        <div role={t.state === 'error' ? 'alert' : 'status'} className={`mt-3 flex flex-wrap items-center gap-3 rounded-xl border px-3 py-2 text-[13px] ${t.state === 'error' ? 'border-[#F5C2C0] bg-[#FFF5F5] text-[#9B2C2C]' : 'border-[#EBEBEB] bg-[#F7F7F7] text-[#5C5C5C]'}`}>
                          <span>
                            {t.error?.message}
                            {t.error?.partial ? ' The answer above is incomplete.' : ''}
                          </span>
                          <button type="button" onClick={() => void ask(t.question)} disabled={streaming} className="font-medium text-[#335CFF] hover:underline disabled:opacity-40">
                            Retry
                          </button>
                        </div>
                      )}

                      {t.done && (
                        <>
                          {t.done.warnings.length > 0 && <p className="mt-2 text-[12px] text-[#8A6D1F]">{t.done.warnings.join(' ')}</p>}
                          <SourceList messageId={t.id} cited={t.done.citedSources} retrieved={t.retrieved} highlight={highlight?.id === t.id ? highlight.n : null} />
                          <MetricsBar done={t.done} client={t.client} />
                          <div className="mt-2 flex items-center gap-3 text-[12px]">
                            <button type="button" onClick={() => void copy(t.done!.answer)} className="font-medium text-[#5C5C5C] hover:text-[#171717]">
                              Copy answer
                            </button>

                          </div>
                        </>
                      )}
                    </div>
                  </li>
                ),
              )}
            </ol>
          )}
        </div>

        <form
          className="border-t border-[#F0F0F0] p-3 sm:p-4"
          onSubmit={(e) => {
            e.preventDefault()
            void ask(input)
          }}
        >
          <div className="flex items-end gap-2 rounded-2xl border border-[#EBEBEB] bg-[#FAFAFA] p-2 transition-colors focus-within:border-[#335CFF] focus-within:bg-white">
            <label htmlFor="rag-question" className="sr-only">
              Ask a question about Steer Health
            </label>
            <textarea
              id="rag-question"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS + 50))}
              onKeyDown={onKeyDown}
              rows={1}
              maxLength={MAX_CHARS + 50}
              placeholder="Ask about products, solutions, integrations, security…"
              className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-2.5 text-[15px] text-[#171717] placeholder:text-[#9A9A9A] focus:outline-none"
              style={{ fieldSizing: 'content' } as React.CSSProperties}
            />
            {streaming ? (
              <button type="button" onClick={stop} className="inline-flex h-11 items-center gap-2 rounded-[8px] border border-[#171717] px-4 text-[14px] font-medium text-[#171717] transition-colors hover:bg-[#171717] hover:text-white">
                <span className="h-2.5 w-2.5 rounded-[2px] bg-current" aria-hidden="true" />
                Stop
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim() || input.length > MAX_CHARS}
                className="group inline-flex h-11 items-center gap-2 rounded-[8px] bg-[#335CFF] px-4 text-[14px] font-medium text-white transition-colors hover:bg-[#2F55EB] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Ask
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M3.646 11.354a.5.5 0 0 1 0-.708L10.293 4H6a.5.5 0 0 1 0-1h5.5a.5.5 0 0 1 .5.5V9a.5.5 0 0 1-1 0V4.707l-6.646 6.647a.5.5 0 0 1-.708 0Z" fill="currentColor" />
                </svg>
              </button>
            )}
          </div>
          <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-[#818181]">
            <span role="status">{notice ?? 'Enter to send · Shift+Enter for a new line'}</span>
            <span className={`tabular-nums ${input.length > MAX_CHARS ? 'font-semibold text-[#C53030]' : ''}`}>
              {input.length}/{MAX_CHARS}
            </span>
          </div>
        </form>
      </section>

      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <UsagePanel current={lastDone?.done ?? null} client={lastDone?.client ?? null} liveMs={liveMs} streaming={streaming} totals={totals} />
        <p className="px-2 text-[12px] leading-relaxed text-[#818181]">
          Answers are generated by AI from Steer Health content and may be incomplete. For pricing or account questions, <Link href="/contact-us" className="font-medium text-[#335CFF] hover:underline">contact our team</Link>.
        </p>
      </aside>
    </div>
  )
}
