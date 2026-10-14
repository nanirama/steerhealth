import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ID_RE } from '@/lib/rag/admin/handlers'
import { getConfig } from '@/lib/rag/config'
import { conversationDetail, listLogs, traceSpans } from '@/lib/rag/store/queries'
import { int, ms, shortId, usd, when } from '@/components/Admin/format'
import { LogsTable, TraceTimeline } from '@/components/Admin/trace'
import { Card, Kpi, PageHeader, StatusBadge } from '@/components/Admin/ui'

const TYPE_LABEL: Record<string, string> = { page: 'Page', products: 'Product', solutions: 'Solution', faqs: 'FAQ' }

function Metric({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div>
      <dt className="text-[11px] text-[#818181]">{label}</dt>
      <dd className={`text-[13px] font-medium tabular-nums ${warn ? 'text-[#B54708]' : 'text-[#171717]'}`}>{value}</dd>
    </div>
  )
}

export default async function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!ID_RE.test(id)) notFound()
  const c = conversationDetail(id)
  if (!c) notFound()
  const cfg = getConfig()
  const s = c.summary

  return (
    <>
      <nav className="mb-3 text-[12px]">
        <Link href="/admin/conversations" className="font-medium text-[#335CFF] hover:underline">
          ← Conversations
        </Link>
      </nav>
      <PageHeader
        title="Conversation"
        subtitle={
          <>
            <code className="text-[12px]">{c.id}</code> · {when(c.startedAt)} → {when(c.endedAt)}
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
        <Kpi label="Turns" value={int(c.turns)} />
        <Kpi label="Input tokens" value={int(s.inputTokens)} />
        <Kpi label="Output tokens" value={int(s.outputTokens)} />
        <Kpi label="Generation tokens" value={int(s.generationTokens)} hint="Sum of Gemini totalTokenCount" />
        <Kpi label="Embedding tokens" value={int(s.embeddingTokens)} />
        <Kpi label="Cumulative latency" value={ms(s.cumulativeLatencyMs)} hint="Sum of server totals" />
        <Kpi label="Avg response latency" value={ms(s.avgLatencyMs)} />
        <Kpi label="Estimated cost" value={usd(s.costUsd)} hint={`${s.errors} error${s.errors === 1 ? '' : 's'}`} tone={s.errors ? 'bad' : undefined} />
      </div>

      <Card className="mt-6" title="Transcript" description={`Stored per RAG_TRANSCRIPT_MODE (“${cfg.transcriptMode}”); content older than ${cfg.transcriptRetentionDays} days is removed.`}>
        <ol className="space-y-3">
          {c.requests.flatMap((r) =>
            r.turns.map((t, i) => (
              <li key={`${r.requestId}-${i}`} className={`flex ${t.role === 'user' ? 'justify-end' : ''}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${t.role === 'user' ? 'rounded-br-md bg-[#335CFF] text-white' : 'rounded-bl-md border border-[#EBEBEB] bg-[#FAFAFA] text-[#3D3D3D]'}`}>
                  <p className={`mb-1 text-[11px] ${t.role === 'user' ? 'text-white/70' : 'text-[#818181]'}`}>
                    {t.role === 'user' ? 'User' : 'Assistant'} · {t.ts.slice(11, 19)} UTC ·{' '}
                    <a href={`#req-${r.requestId}`} className="underline">
                      request {shortId(r.requestId)}
                    </a>
                    {t.redaction === 'redacted' && ' · redacted'}
                  </p>
                  {t.content === null ? <em className="opacity-80">{t.redaction === 'expired' ? 'Content removed by retention policy.' : t.redaction === 'off' ? 'Transcript storage is disabled.' : 'No content stored.'}</em> : <p className="whitespace-pre-wrap">{t.content || '(empty)'}</p>}
                </div>
              </li>
            )),
          )}
          {c.requests.every((r) => !r.turns.length) && <p className="text-[13px] text-[#5C5C5C]">No transcript stored for these requests (recorded before transcript storage existed).</p>}
        </ol>
      </Card>

      <h2 className="font3 mb-3 mt-8 text-[18px] font-semibold text-[#171717]">Requests ({c.requests.length})</h2>
      <ol className="space-y-4">
        {c.requests.map((r, idx) => {
          const t = r.timings
          const slow = (t.totalServerMs ?? 0) > cfg.latencyTargetMs
          const spans = traceSpans(r.traceId)
          const logs = listLogs({ requestId: r.requestId, pageSize: 100 }).rows
          return (
            <li key={r.requestId} id={`req-${r.requestId}`} className="scroll-mt-6">
              <details open={c.requests.length <= 3 || idx === c.requests.length - 1} className="group rounded-[20px] border border-[#EBEBEB] bg-white">
                <summary className="flex cursor-pointer list-none flex-wrap items-center gap-3 px-5 py-4">
                  <span className="text-[13px] font-semibold text-[#171717]">#{idx + 1}</span>
                  <StatusBadge status={r.status} />
                  <span className="text-[13px] text-[#5C5C5C]">{when(r.ts)}</span>
                  <span className={`text-[13px] tabular-nums ${slow ? 'font-semibold text-[#B54708]' : 'text-[#171717]'}`}>{ms(t.totalServerMs)}</span>
                  <span className="text-[13px] tabular-nums text-[#5C5C5C]">
                    {int(r.inputTokens)} in / {int(r.outputTokens)} out
                  </span>
                  {r.errorCode && <span className="text-[12px] font-medium text-[#B42318]">{r.errorCode}</span>}
                  <span className="ml-auto font-mono text-[11px] text-[#818181]">{r.requestId}</span>
                </summary>
                <div className="space-y-5 border-t border-[#F0F0F0] px-5 py-4">
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 lg:grid-cols-6">
                    <Metric label="Request ID" value={shortId(r.requestId, 13)} />
                    <Metric label="Trace ID" value={shortId(r.traceId, 13)} />
                    <Metric label="Model" value={r.model ?? 'No data'} />
                    <Metric label="Input tokens" value={int(r.inputTokens)} />
                    <Metric label="Output tokens" value={int(r.outputTokens)} />
                    <Metric label="Total tokens" value={int(r.generationTotalTokens)} />
                    <Metric label="Thinking / cached" value={`${int(r.thinkingTokens)} / ${int(r.cachedTokens)}`} />
                    <Metric label="Embedding tokens" value={int(r.embeddingTokens)} />
                    <Metric label="End-to-end (server)" value={ms(t.totalServerMs)} warn={slow} />
                    <Metric label="Client completion" value={ms(t.clientCompletionMs)} />
                    <Metric label="TTFT (server / client)" value={`${ms(t.serverTtftMs)} / ${ms(t.clientTtftMs)}`} warn={(t.serverTtftMs ?? 0) > cfg.ttftTargetMs} />
                    <Metric label="Embedding" value={ms(t.embeddingMs)} />
                    <Metric label="Pinecone search" value={ms(t.vectorSearchMs)} />
                    <Metric label="Reranking" value={ms(t.rerankMs)} />
                    <Metric label="Context assembly" value={ms(t.contextAssemblyMs)} />
                    <Metric label="Gemini generation" value={ms(t.generationMs)} />
                    <Metric label="Citation validation" value={ms(t.citationMs)} />
                    <Metric label="Citations" value={r.citedCount === null ? 'No data' : `${r.citedCount} cited${r.invalidCitations ? `, ${r.invalidCitations} invalid removed` : ''}${r.uncited ? ', uncited answer' : ''}${r.abstained ? ', abstained' : ''}`} warn={Boolean(r.invalidCitations || r.uncited)} />
                    <Metric label="Retrieved chunks" value={`${int(r.retrievedCount)} → ${int(r.sourcesUsed)} sources`} />
                    <Metric label="Estimated cost" value={usd(r.costUsd)} />
                    <Metric label="Generation attempts" value={int(r.generationAttempts)} warn={(r.generationAttempts ?? 0) > 1} />
                    <Metric label="Usage source" value={r.usageSource} />
                  </dl>
                  {r.warnings.length > 0 && <p className="rounded-xl bg-[#FFF8EE] px-3 py-2 text-[12px] text-[#8A5A00]">{r.warnings.join(' ')}</p>}
                  {r.attempts.length > 0 && (
                    <div>
                      <h3 className="text-[12px] font-semibold uppercase tracking-wide text-[#818181]">Gemini attempts</h3>
                      <ul className="mt-1 flex flex-wrap gap-2 text-[12px]">
                        {r.attempts.map((a) => (
                          <li key={a.attempt} className="rounded-lg border border-[#F0F0F0] px-2 py-1">
                            #{a.attempt} <StatusBadge status={a.status} /> {ms(a.durationMs)} {a.errorCode && <span className="text-[#B42318]">{a.errorCode}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div>
                    <h3 className="text-[12px] font-semibold uppercase tracking-wide text-[#818181]">Retrieved sources</h3>
                    {!r.sources.length ? (
                      <p className="mt-1 text-[13px] text-[#5C5C5C]">No sources recorded.</p>
                    ) : (
                      <ul className="mt-2 grid gap-2 md:grid-cols-2">
                        {r.sources.map((src) => (
                          <li key={src.n} className={`rounded-xl border p-3 text-[13px] ${src.cited ? 'border-[#335CFF]/40 bg-[#335CFF]/[0.03]' : 'border-[#F0F0F0]'}`}>
                            <p className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold text-[#335CFF]">[{src.n}]</span>
                              <span className="font-medium text-[#171717]">{src.title}</span>
                              <span className="rounded-full bg-[#F2F2F2] px-2 py-0.5 text-[10px] font-semibold uppercase text-[#5C5C5C]">{TYPE_LABEL[src.contentType] ?? src.contentType}</span>
                              {src.cited && <span className="text-[11px] font-medium text-[#0F7A52]">cited</span>}
                              <span className="ml-auto text-[11px] tabular-nums text-[#818181]" title="Cosine similarity (ranking signal, not a probability)">
                                sim {src.topScore?.toFixed(3) ?? '—'}
                              </span>
                            </p>
                            {src.sections.length > 0 && <p className="mt-1 text-[12px] text-[#818181]">{src.sections.join(' · ')}</p>}
                            {src.url && (
                              <Link href={src.url} className="mt-1 inline-block text-[12px] text-[#335CFF] hover:underline">
                                {src.url}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-[12px] font-semibold uppercase tracking-wide text-[#818181]">Trace</h3>
                      <Link href={`/admin/traces/${r.traceId}`} className="text-[12px] font-medium text-[#335CFF] hover:underline">
                        Open trace explorer →
                      </Link>
                    </div>
                    <div className="mt-2">
                      <TraceTimeline spans={spans} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-[12px] font-semibold uppercase tracking-wide text-[#818181]">Logs ({logs.length})</h3>
                      <Link href={`/admin/logs?q=${r.requestId}`} className="text-[12px] font-medium text-[#335CFF] hover:underline">
                        Filter in logs viewer →
                      </Link>
                    </div>
                    <div className="mt-2">
                      <LogsTable logs={logs} showIds={false} />
                    </div>
                  </div>
                  <p className="text-[12px] text-[#818181]">Evaluation: chat requests are not evaluated inline; see Evaluations for offline evaluation runs.</p>
                </div>
              </details>
            </li>
          )
        })}
      </ol>
    </>
  )
}
