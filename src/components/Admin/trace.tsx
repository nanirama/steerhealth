import Link from 'next/link'
import type { SpanView, listLogs } from '@/lib/rag/store/queries'
import { LEVEL_STYLE, ms, shortId, when } from './format'
import { StatusBadge } from './ui'

/** Span tree with a timeline bar per span. Slow spans (>40% of the trace or over 1 s) are highlighted. */
export function TraceTimeline({ spans }: { spans: SpanView[] }) {
  if (!spans.length) return <p className="text-[13px] text-[#5C5C5C]">No spans recorded for this trace (not sampled, expired, or recorded before tracing was enabled).</p>
  const byId = new Map(spans.map((s) => [s.spanId, s]))
  const root = spans.find((s) => !s.parentSpanId || !byId.has(s.parentSpanId)) ?? spans[0]
  const t0 = root.startMs
  const total = Math.max(1, root.durationMs, ...spans.map((s) => s.startMs - t0 + s.durationMs))
  const children = new Map<string, SpanView[]>()
  for (const s of spans) if (s !== root && s.parentSpanId) children.set(s.parentSpanId, [...(children.get(s.parentSpanId) ?? []), s])
  const ordered: { span: SpanView; depth: number }[] = []
  const walk = (s: SpanView, depth: number) => {
    ordered.push({ span: s, depth })
    for (const c of (children.get(s.spanId) ?? []).sort((a, b) => a.startMs - b.startMs)) walk(c, depth + 1)
  }
  walk(root, 0)
  for (const s of spans) if (!ordered.some((o) => o.span === s)) ordered.push({ span: s, depth: 1 })
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[640px]">
        <div className="grid grid-cols-[220px_1fr_80px] gap-3 border-b border-[#F0F0F0] pb-1 text-[11px] font-semibold uppercase tracking-wide text-[#818181]">
          <span>Span</span>
          <span>Timeline (0 – {ms(total)})</span>
          <span className="text-right">Duration</span>
        </div>
        <ol>
          {ordered.map(({ span: s, depth }) => {
            const left = ((s.startMs - t0) / total) * 100
            const width = Math.max(0.5, (s.durationMs / total) * 100)
            const slow = s !== root && (s.durationMs > total * 0.4 || s.durationMs > 1000)
            return (
              <li key={s.spanId}>
                <details className="group">
                  <summary className="grid cursor-pointer list-none grid-cols-[220px_1fr_80px] items-center gap-3 rounded-lg py-1.5 text-[12px] hover:bg-[#F7F7F7]">
                    <span className="truncate font-mono text-[#171717]" style={{ paddingLeft: depth * 14 }}>
                      {s.status === 'error' && <span className="mr-1 text-[#B42318]">●</span>}
                      {s.name}
                    </span>
                    <span className="relative h-3 rounded bg-[#F2F2F2]">
                      <span className={`absolute top-0 h-3 rounded ${s.status === 'error' ? 'bg-[#B42318]' : slow ? 'bg-[#DD8A2B]' : 'bg-[#335CFF]'}`} style={{ left: `${Math.min(99.5, left)}%`, width: `${Math.min(100 - left, width)}%` }} />
                    </span>
                    <span className={`text-right tabular-nums ${slow ? 'font-semibold text-[#B54708]' : 'text-[#5C5C5C]'}`}>{ms(s.durationMs)}</span>
                  </summary>
                  <div className="mb-2 ml-4 rounded-xl border border-[#EBEBEB] bg-[#FAFAFA] p-3 text-[11px]">
                    <p className="text-[#5C5C5C]">
                      span <code>{s.spanId}</code> · parent <code>{s.parentSpanId ?? '—'}</code> · start {when(s.startTime)} (+{ms(s.startMs - t0)}) · <StatusBadge status={s.status} />
                      {s.statusMessage ? ` ${s.statusMessage}` : ''}
                    </p>
                    <dl className="mt-2 grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-x-3 gap-y-0.5">
                      {Object.entries(s.attributes).map(([k, v]) => (
                        <div key={k} className="contents">
                          <dt className="truncate font-mono text-[#818181]">{k}</dt>
                          <dd className="truncate font-mono text-[#171717]">{String(v)}</dd>
                        </div>
                      ))}
                    </dl>
                    {s.events.length > 0 && <p className="mt-2 text-[#5C5C5C]">Events: {s.events.map((e) => `${e.name} @ +${ms(e.timeOffsetMs)}`).join(', ')}</p>}
                  </div>
                </details>
              </li>
            )
          })}
        </ol>
        <p className="mt-2 text-[11px] text-[#818181]">
          Trace <code>{root.traceId}</code>. Child spans are sequential stages of the request; their durations are not summed into the total. Orange = slow span.
        </p>
      </div>
    </div>
  )
}

export function LogsTable({ logs, showIds = true }: { logs: ReturnType<typeof listLogs>['rows']; showIds?: boolean }) {
  if (!logs.length) return <p className="text-[13px] text-[#5C5C5C]">No log events match.</p>
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[12px]">
        <thead className="border-b border-[#F0F0F0] text-[11px] uppercase tracking-wide text-[#818181]">
          <tr>
            <th className="py-1.5 pr-3 font-semibold">Time (UTC)</th>
            <th className="pr-3 font-semibold">Level</th>
            <th className="pr-3 font-semibold">Event</th>
            <th className="pr-3 font-semibold">Operation</th>
            <th className="pr-3 font-semibold">Duration</th>
            <th className="pr-3 font-semibold">Tokens</th>
            <th className="pr-3 font-semibold">Status / error</th>
            {showIds && <th className="pr-3 font-semibold">Correlation</th>}
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l.id} className="border-b border-[#F5F5F5] align-top">
              <td className="whitespace-nowrap py-1.5 pr-3 tabular-nums text-[#5C5C5C]">{l.ts.slice(5, 19).replace('T', ' ')}</td>
              <td className={`pr-3 font-semibold ${LEVEL_STYLE[l.level] ?? ''}`}>{l.level}</td>
              <td className="pr-3 font-mono text-[#171717]">
                {l.event}
                {l.data && (
                  <details>
                    <summary className="cursor-pointer text-[11px] text-[#818181]">details</summary>
                    <pre className="mt-1 max-w-[420px] overflow-x-auto whitespace-pre-wrap rounded bg-[#F7F7F7] p-2 text-[11px] text-[#3D3D3D]">{JSON.stringify(l.data, null, 2)}</pre>
                  </details>
                )}
              </td>
              <td className="pr-3 text-[#5C5C5C]">{l.operation ?? l.model ?? ''}</td>
              <td className="whitespace-nowrap pr-3 tabular-nums">{l.durationMs !== null ? ms(l.durationMs) : ''}</td>
              <td className="whitespace-nowrap pr-3 tabular-nums">{l.inputTokens !== null || l.outputTokens !== null ? `${l.inputTokens ?? '—'} / ${l.outputTokens ?? '—'}` : ''}</td>
              <td className="pr-3">{l.errorCode ? <span className="text-[#B42318]">{l.errorCode}</span> : (l.status ?? '')}</td>
              {showIds && (
                <td className="whitespace-nowrap pr-3 text-[11px]">
                  {l.conversationId && (
                    <Link className="text-[#335CFF] hover:underline" href={`/admin/conversations/${l.conversationId}${l.requestId ? `#req-${l.requestId}` : ''}`}>
                      conv {shortId(l.conversationId)}
                    </Link>
                  )}
                  {l.traceId && (
                    <>
                      {' · '}
                      <Link className="text-[#335CFF] hover:underline" href={`/admin/traces/${l.traceId}`}>
                        trace {shortId(l.traceId)}
                      </Link>
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
