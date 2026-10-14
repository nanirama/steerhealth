import Link from 'next/link'
import { evaluationState } from '@/lib/rag/admin/handlers'
import { getEvalRun, listEvalRuns, loadDataset } from '@/lib/rag/evaluation'
import type { EvalRun } from '@/lib/rag/evaluation'
import { ActionButton, AutoRefresh } from '@/components/Admin/client'
import { int, ms, pct, usd, when } from '@/components/Admin/format'
import { Card, Empty, PageHeader, StatusBadge, tdCls, thCls } from '@/components/Admin/ui'

type AggKey = keyof EvalRun['aggregates']
const METRICS: { key: AggKey; label: string; gate?: keyof EvalRun['passed']; note: string; lowerBetter?: boolean }[] = [
  { key: 'recallAtK', label: 'Recall@k', gate: 'recallAtK', note: 'Labelled relevant docs found in top-k dense candidates' },
  { key: 'precisionAtK', label: 'Precision@k', note: 'Share of top-k docs that are labelled relevant' },
  { key: 'mrr', label: 'MRR', gate: 'mrr', note: '1 / rank of first relevant doc' },
  { key: 'ndcgAtK', label: 'nDCG@k', note: 'Graded relevance where labelled' },
  { key: 'correctness', label: 'Answer correctness', gate: 'correctness', note: 'Judge vs reference answer' },
  { key: 'faithfulness', label: 'Faithfulness', gate: 'faithfulness', note: 'Judge: claims supported by retrieved context' },
  { key: 'citationSupport', label: 'Citation correctness', gate: 'citationSupport', note: 'Judge: each [n] supports its claim' },
  { key: 'unsupportedClaimRate', label: 'Unsupported-claim rate', note: 'Cases with ≥1 unsupported claim', lowerBetter: true },
  { key: 'abstentionAccuracy', label: 'Appropriate abstention', gate: 'abstentionAccuracy', note: 'Abstained exactly when expected' },
  { key: 'completeness', label: 'Completeness', note: 'Judge: expected claims covered' },
]

function delta(now: number | null, prev: number | null | undefined, lowerBetter = false) {
  if (now === null || prev === null || prev === undefined) return null
  const d = now - prev
  if (Math.abs(d) < 0.0005) return <span className="text-[11px] text-[#818181]">±0 vs previous</span>
  const good = lowerBetter ? d < 0 : d > 0
  return <span className={`text-[11px] font-medium ${good ? 'text-[#0F7A52]' : 'text-[#B42318]'}`}>{`${d > 0 ? '+' : ''}${(d * 100).toFixed(1)} pts vs previous`}</span>
}

export default async function EvaluationsPage({ searchParams }: { searchParams: Promise<{ run?: string; show?: string }> }) {
  const sp = await searchParams
  const runs = await listEvalRuns(30)
  const dataset = await loadDataset().catch(() => null)
  const running = evaluationState()
  const selected = sp.run && /^eval-[0-9TZ-]{10,40}$/.test(sp.run) ? await getEvalRun(sp.run) : (runs[0] ?? null)
  const idx = selected ? runs.findIndex((r) => r.runId === selected.runId) : -1
  const previous = idx >= 0 ? (runs[idx + 1] ?? null) : null
  const a = selected?.aggregates
  const showAll = sp.show === 'all'

  return (
    <>
      <AutoRefresh everyMs={10_000} active={Boolean(running)} />
      <PageHeader title="Evaluations" subtitle={dataset ? `Dataset v${dataset.dataset.version} · ${dataset.dataset.cases.length} cases · hash ${dataset.hash}` : 'No evaluation dataset found (evaluations/dataset.json)'}>
        <div className="flex flex-wrap items-start gap-2">
          <ActionButton url="/api/admin/evaluations" body={{ skipJudge: true }} label="Run (deterministic only)" variant="secondary" disabled={Boolean(running) || !dataset} confirmText="Run all cases without the LLM judge? This calls Gemini once per case." />
          <ActionButton url="/api/admin/evaluations" body={{}} label={running ? `Running since ${when(running.startedAt)}` : 'Run full evaluation'} disabled={Boolean(running) || !dataset} confirmText="Run the full evaluation with the LLM judge? It makes two model calls per case (about $0.50 per run at current list prices)." />
        </div>
      </PageHeader>

      {!selected || !a ? (
        <Empty>Not evaluated yet. Run an evaluation to measure retrieval and answer quality.</Empty>
      ) : (
        <>
          <Card
            title={`Run ${selected.runId.replace('eval-', '')}`}
            description={`${when(selected.startedAt)} · dataset v${selected.datasetVersion} · ${selected.cases} cases · ${selected.failedCases.length} with failures${previous ? ` · compared with ${previous.runId.replace('eval-', '')}` : ''}`}
          >
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
              {METRICS.map((m) => {
                const v = a[m.key] as number | null
                const gate = m.gate ? selected.passed[m.gate] : undefined
                return (
                  <div key={m.key} className="rounded-2xl border border-[#EBEBEB] p-4">
                    <p className="flex items-center gap-1.5 text-[12px] text-[#5C5C5C]">
                      {m.label}
                      {gate === true && <span className="text-[11px] font-semibold text-[#0F7A52]">pass</span>}
                      {gate === false && <span className="text-[11px] font-semibold text-[#B42318]">below threshold</span>}
                    </p>
                    <p className="font3 mt-1 text-[22px] font-semibold tabular-nums text-[#171717]">{v === null ? <span className="text-[14px] font-medium text-[#9A9A9A]">Not evaluated</span> : m.key === 'mrr' || m.key === 'ndcgAtK' ? v.toFixed(3) : pct(v)}</p>
                    <p className="text-[11px] text-[#818181]">{m.note}</p>
                    {delta(v, previous?.aggregates[m.key] as number | null | undefined, m.lowerBetter)}
                  </div>
                )
              })}
            </div>
            <dl className="mt-5 grid gap-x-8 gap-y-2 text-[13px] sm:grid-cols-2 xl:grid-cols-3">
              <p><span className="text-[#5C5C5C]">Models:</span> chat {selected.config.chatModel} · embed {selected.config.embeddingModel} · judge {selected.config.judgeModel}</p>
              <p><span className="text-[#5C5C5C]">Retrieval:</span> top-k {selected.config.topK}, min score {selected.config.minScore}, k={selected.config.k}</p>
              <p><span className="text-[#5C5C5C]">Index version:</span> <code className="text-[12px]">{selected.config.indexVersion}</code></p>
              <p><span className="text-[#5C5C5C]">Latency:</span> avg {ms(a.avgLatencyMs)} · p95 {ms(a.p95LatencyMs)} · TTFT {ms(a.avgServerTtftMs)}</p>
              <p><span className="text-[#5C5C5C]">Tokens:</span> generation {int(a.totalInputTokens)} in / {int(a.totalOutputTokens)} out · judge {int(a.judgeInputTokens)} in / {int(a.judgeOutputTokens)} out</p>
              <p><span className="text-[#5C5C5C]">Estimated cost:</span> generation {usd(a.generationCostUsd)} · judge {usd(a.judgeCostUsd)}</p>
            </dl>
          </Card>

          <Card
            className="mt-6"
            title={showAll ? `All cases (${selected.results.length})` : `Failed cases (${selected.failedCases.length})`}
            action={
              <Link href={`/admin/evaluations?run=${selected.runId}${showAll ? '' : '&show=all'}`} className="text-[12px] font-medium text-[#335CFF] hover:underline">
                {showAll ? 'Show failed only' : 'Show all cases'}
              </Link>
            }
          >
            <ul className="divide-y divide-[#F0F0F0]">
              {selected.results
                .filter((r) => showAll || r.failures.length)
                .map((r) => (
                  <li key={r.id} className="py-3">
                    <details>
                      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-2 text-[13px]">
                        <StatusBadge status={r.failures.length ? 'failed' : 'success'} />
                        <span className="font-medium text-[#171717]">{r.question}</span>
                        <span className="rounded-full bg-[#F2F2F2] px-2 py-0.5 text-[11px] text-[#5C5C5C]">{r.category}</span>
                        <span className="ml-auto text-[11px] tabular-nums text-[#818181]">
                          R@k {r.recallAtK?.toFixed(2) ?? '—'} · faith {r.judge?.faithfulness?.toFixed(2) ?? '—'} · correct {r.judge?.correctness?.toFixed(2) ?? '—'} · {ms(r.latencyMs)}
                        </span>
                      </summary>
                      <div className="mt-2 space-y-2 rounded-xl bg-[#FAFAFA] p-3 text-[12px] text-[#5C5C5C]">
                        {r.failures.length > 0 && <p className="font-medium text-[#B42318]">{r.failures.join(' · ')}</p>}
                        <p className="whitespace-pre-wrap text-[13px] text-[#171717]">{r.answer || '(no answer)'}</p>
                        {r.judge?.unsupportedClaims.length ? <p>Unsupported claims: {r.judge.unsupportedClaims.join('; ')}</p> : null}
                        {r.judge?.rationale && <p>Judge rationale: {r.judge.rationale}</p>}
                        <p className="font-mono text-[11px]">relevant: {r.relevantDocIds.join(', ') || '—'}</p>
                        <p className="font-mono text-[11px]">retrieved: {r.retrievedDocIds.join(', ') || '—'} · cited: {r.citedDocIds.join(', ') || '—'}</p>
                      </div>
                    </details>
                  </li>
                ))}
            </ul>
          </Card>
        </>
      )}

      {runs.length > 0 && (
        <Card className="mt-6" title="Run history">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#F0F0F0]">
                <tr>
                  {['Run', 'Dataset', 'Cases', 'Failed', 'Recall@k', 'MRR', 'Correctness', 'Faithfulness', 'Citations', 'Abstention', 'Avg latency', 'Judge cost'].map((h) => (
                    <th key={h} className={thCls}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {runs.map((r) => (
                  <tr key={r.runId} className={`border-b border-[#F5F5F5] ${r.runId === selected?.runId ? 'bg-[#335CFF]/[0.04]' : ''}`}>
                    <td className={tdCls}>
                      <Link href={`/admin/evaluations?run=${r.runId}`} className="text-[#335CFF] hover:underline">
                        {when(r.startedAt)}
                      </Link>
                    </td>
                    <td className={tdCls}>v{r.datasetVersion}</td>
                    <td className={tdCls}>{r.cases}</td>
                    <td className={tdCls}>{r.failedCases.length}</td>
                    <td className={tdCls}>{pct(r.aggregates.recallAtK)}</td>
                    <td className={tdCls}>{r.aggregates.mrr?.toFixed(3) ?? 'No data'}</td>
                    <td className={tdCls}>{pct(r.aggregates.correctness)}</td>
                    <td className={tdCls}>{pct(r.aggregates.faithfulness)}</td>
                    <td className={tdCls}>{pct(r.aggregates.citationSupport)}</td>
                    <td className={tdCls}>{pct(r.aggregates.abstentionAccuracy)}</td>
                    <td className={tdCls}>{ms(r.aggregates.avgLatencyMs)}</td>
                    <td className={tdCls}>{usd(r.aggregates.judgeCostUsd)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  )
}
