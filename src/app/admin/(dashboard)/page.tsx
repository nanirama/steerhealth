import Link from 'next/link'
import { kbStatus } from '@/lib/rag/admin/kb-status'
import { errorBreakdown, overview, parseRange, series, slowRequests, usageByModel } from '@/lib/rag/store/queries'
import type { Pct } from '@/lib/rag/store/queries'
import { LineChart, StackedBars } from '@/components/Admin/charts'
import { RangeFilter } from '@/components/Admin/client'
import { int, ms, pct, shortId, span, usd, when } from '@/components/Admin/format'
import { Card, Kpi, PageHeader, StatusBadge, tdCls, thCls } from '@/components/Admin/ui'

const p = (x: Pct) => (x.sufficient ? ms(x.value) : x.samples ? `Insufficient samples (${x.samples})` : 'No data')

export default async function AdminOverview({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams
  const range = parseRange({ range: sp.range, from: sp.from, to: sp.to })
  const ov = overview(range)
  const ser = series(range)
  const slow = slowRequests(range, ov.thresholds.latencyMs, 15)
  const models = usageByModel(range)
  const errors = errorBreakdown(range)
  const kb = await kbStatus().catch(() => null)
  const total = ov.latency.find((s) => s.stage === 'total_server_ms')!
  const ttft = ov.latency.find((s) => s.stage === 'server_ttft_ms')!
  const clientTtft = ov.latency.find((s) => s.stage === 'client_ttft_ms')!
  const noReq = ov.questions === 0

  return (
    <>
      <PageHeader
        title="Overview"
        subtitle={
          <>
            {range.label} · generated {when(ov.generatedAt)} · last request {when(ov.lastRequestAt)} · bucket {span(range.bucketMs)}
          </>
        }
      >
        <RangeFilter current={range.key} from={sp.from} to={sp.to} />
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <Kpi label="Conversations" value={int(ov.conversations)} hint="Distinct conversations with a request in range" />
        <Kpi label="User questions" value={int(ov.questions)} hint="Chat requests that reached the pipeline" />
        <Kpi label="Successful" value={int(ov.successful)} hint={`Answered or abstained · ${ov.abstained} abstained`} tone={noReq ? undefined : 'good'} />
        <Kpi label="Failed" value={int(ov.failed)} hint={`Errors + timeouts · ${ov.timeouts} timeouts · ${ov.cancelled} cancelled (excluded)`} tone={ov.failed ? 'bad' : undefined} />
        <Kpi label="Error rate" value={pct(ov.errorRate)} hint="failed / (successful + failed)" tone={(ov.errorRate ?? 0) > 0.05 ? 'bad' : undefined} />
        <Kpi label="Retrieval failure rate" value={pct(ov.retrievalFailureRate)} hint="(no source above threshold + retrieval errors) / questions" tone={(ov.retrievalFailureRate ?? 0) > 0.2 ? 'warn' : undefined} />
        <Kpi label="Avg end-to-end latency" value={ms(total.avg)} hint={`Server, successful requests · n=${total.samples}`} />
        <Kpi label="p50 latency" value={p(total.p50)} hint="Nearest rank over all samples" />
        <Kpi label="p95 latency" value={p(total.p95)} hint={`Needs ≥${ov.minSamples.p95} samples`} tone={total.p95.sufficient && (total.p95.value ?? 0) > ov.thresholds.latencyMs ? 'warn' : undefined} />
        <Kpi label="p99 latency" value={p(total.p99)} hint={`Needs ≥${ov.minSamples.p99} samples`} />
        <Kpi label="Avg time to first token" value={ms(ttft.avg)} hint={`Server · client avg ${ms(clientTtft.avg)} (n=${clientTtft.samples})`} tone={(ttft.avg ?? 0) > ov.thresholds.ttftMs ? 'warn' : undefined} />
        <Kpi label="Generation retries" value={int(ov.retries)} hint="Failed Gemini attempts later retried (usage not counted)" />
        <Kpi label="Input tokens" value={int(ov.tokens.input)} hint={`Gemini promptTokenCount · ${ov.tokens.requestsWithUsage} requests with usage`} />
        <Kpi label="Output tokens" value={int(ov.tokens.output)} hint={`candidatesTokenCount · +${int(ov.tokens.thinking)} thinking`} />
        <Kpi label="Embedding tokens" value={int(ov.tokens.embedding)} hint="Query embeddings (countTokens), separate from generation" />
        <Kpi label="Estimated LLM cost" value={usd(ov.costUsd)} hint={`List-price estimate${ov.costUnknownRequests ? ` · ${ov.costUnknownRequests} without price` : ''}`} />
        <Kpi label="Indexed documents" value={int(kb?.index.indexedDocuments)} hint={kb ? `${kb.source.documents} source Markdown documents` : 'Index unavailable'} />
        <Kpi label="Indexed chunks" value={int(kb?.index.indexedChunks)} hint={kb ? `Pinecone ${kb.index.name} / ${kb.index.namespace}` : undefined} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card title="End-to-end latency" description={`Server total latency per ${span(range.bucketMs)} bucket, successful requests. Percentiles shown only when the bucket has enough samples.`}>
          <LineChart
            ariaLabel="Latency percentiles over time"
            points={ser.points}
            bucketMs={ser.bucketMs}
            unit="milliseconds"
            threshold={{ value: ov.thresholds.latencyMs, label: `Target ${ms(ov.thresholds.latencyMs)}` }}
            series={[
              { key: 'p50', label: 'p50', color: '#335CFF' },
              { key: 'p95', label: 'p95', color: '#DD8A2B' },
              { key: 'p99', label: 'p99', color: '#B42318', dashed: true },
            ]}
          />
        </Card>
        <Card title="Token usage" description={`Provider-reported tokens summed per ${span(range.bucketMs)} bucket.`}>
          <StackedBars
            ariaLabel="Token usage over time"
            points={ser.points}
            bucketMs={ser.bucketMs}
            unit="tokens"
            format={(v) => (v >= 1000 ? `${(v / 1000).toFixed(v >= 10_000 ? 0 : 1)}k` : String(Math.round(v)))}
            series={[
              { key: 'inputTokens', label: 'Input', color: '#335CFF' },
              { key: 'outputTokens', label: 'Output', color: '#6FCAFF' },
              { key: 'embeddingTokens', label: 'Embedding', color: '#00B9B7' },
            ]}
          />
        </Card>
        <Card title="Estimated cost" description={`Sum of per-request list-price estimates per ${span(range.bucketMs)} bucket (not billed amounts).`}>
          <StackedBars ariaLabel="Estimated cost over time" points={ser.points} bucketMs={ser.bucketMs} unit="USD" format={(v) => `$${v < 0.01 ? v.toFixed(4) : v.toFixed(2)}`} series={[{ key: 'costUsd', label: 'Estimated cost', color: '#0030A6' }]} />
        </Card>
        <Card title="Requests & errors" description={`Requests per ${span(range.bucketMs)} bucket.`}>
          <StackedBars
            ariaLabel="Requests and errors over time"
            points={ser.points.map((pt) => ({ ...pt, ok: pt.requests - pt.errors }))}
            bucketMs={ser.bucketMs}
            unit="requests"
            format={(v) => String(Math.round(v))}
            series={[
              { key: 'ok', label: 'Completed or cancelled', color: '#335CFF' },
              { key: 'errors', label: 'Failed', color: '#B42318' },
            ]}
          />
          {errors.length > 0 && <p className="mt-3 text-[12px] text-[#B42318]">Errors: {errors.map((e) => `${e.code} × ${e.count}`).join(' · ')}</p>}
        </Card>
      </div>

      <Card className="mt-6" title="Latency by pipeline stage" description="Successful requests in range. Stages are sequential parts of one request; they are not added together to form the total.">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#F0F0F0]">
              <tr>
                <th className={thCls}>Stage</th>
                <th className={thCls}>Samples</th>
                <th className={thCls}>Average</th>
                <th className={thCls}>p50</th>
                <th className={thCls}>p95</th>
                <th className={thCls}>p99</th>
              </tr>
            </thead>
            <tbody>
              {ov.latency.map((s) => (
                <tr key={s.stage} className="border-b border-[#F5F5F5]">
                  <td className={`${tdCls} font-medium`}>{s.label}</td>
                  <td className={tdCls}>{s.samples}</td>
                  <td className={tdCls}>{ms(s.avg)}</td>
                  <td className={tdCls}>{p(s.p50)}</td>
                  <td className={tdCls}>{p(s.p95)}</td>
                  <td className={tdCls}>{p(s.p99)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Card title="Slowest requests" description={`Highlighted rows exceed the ${ms(ov.thresholds.latencyMs)} latency target (RAG_LATENCY_TARGET_MS).`}>
          {!slow.length ? (
            <p className="text-[13px] text-[#5C5C5C]">No requests in this range.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-[#F0F0F0]">
                  <tr>
                    {['Request', 'Conversation', 'Time', 'Total', 'TTFT', 'Retrieval', 'Generation', 'Status'].map((h) => (
                      <th key={h} className={thCls}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {slow.map((r) => (
                    <tr key={r.requestId} className={`border-b border-[#F5F5F5] ${r.overThreshold ? 'bg-[#FFF8EE]' : ''}`}>
                      <td className={tdCls}>
                        <Link className="font-mono text-[#335CFF] hover:underline" href={`/admin/conversations/${r.conversationId}#req-${r.requestId}`}>
                          {shortId(r.requestId)}
                        </Link>
                      </td>
                      <td className={`${tdCls} font-mono text-[12px]`}>{shortId(r.conversationId, 12)}</td>
                      <td className={tdCls}>{r.ts.slice(5, 19).replace('T', ' ')}</td>
                      <td className={`${tdCls} ${r.overThreshold ? 'font-semibold text-[#B54708]' : ''}`}>{ms(r.totalMs)}</td>
                      <td className={tdCls}>{ms(r.ttftMs)}</td>
                      <td className={tdCls}>{ms(r.retrievalMs)}</td>
                      <td className={tdCls}>{ms(r.generationMs)}</td>
                      <td className={tdCls}>
                        <StatusBadge status={r.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
        <Card title="Usage by model" description="Provider-reported tokens; cost is an estimate.">
          {!models.length ? (
            <p className="text-[13px] text-[#5C5C5C]">No requests in this range.</p>
          ) : (
            <ul className="space-y-3 text-[13px]">
              {models.map((m) => (
                <li key={m.model} className="rounded-xl border border-[#F0F0F0] p-3">
                  <p className="font-medium text-[#171717]">{m.model}</p>
                  <p className="mt-1 tabular-nums text-[#5C5C5C]">
                    {int(m.requests)} requests · {int(m.input)} in · {int(m.output)} out{m.thinking ? ` · ${int(m.thinking)} thinking` : ''} · {int(m.embedding)} embedding · {usd(m.costUsd)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  )
}
