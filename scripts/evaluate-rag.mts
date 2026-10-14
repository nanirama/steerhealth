/**
 * Run the RAG evaluation suite (evaluations/dataset.json) against the live index + models.
 *
 *   npm run rag:eval                        # all cases, with the LLM judge
 *   npm run rag:eval -- --no-judge          # deterministic metrics only
 *   npm run rag:eval -- --case faq-cost,product-dfd
 * Exits 1 when a configured threshold is not met (usable as a CI regression gate).
 */
import nextEnv from '@next/env'

nextEnv.loadEnvConfig(process.cwd(), false, { info: () => null, error: console.error })
process.env.RAG_SILENT_STDOUT = '1'

const { missingConfig } = await import('../src/lib/rag/config.ts')
const { runEvaluation } = await import('../src/lib/rag/evaluation.ts')
const { flushStores } = await import('../src/lib/rag/observability/jsonl-store.ts')
const { shutdownTracing } = await import('../src/lib/rag/observability/tracing.ts')

const argv = process.argv.slice(2)
const caseArg = argv.find((a, i) => argv[i - 1] === '--case')
if (missingConfig().length) {
  console.error(`Missing configuration: ${missingConfig().join(', ')}`)
  process.exit(1)
}

const run = await runEvaluation({ skipJudge: argv.includes('--no-judge'), caseIds: caseArg?.split(','), onProgress: (m) => console.log(`  ${m}`) })
await flushStores()
await shutdownTracing()

const pct = (v: number | null) => (v === null ? 'n/a' : `${(v * 100).toFixed(1)}%`)
const a = run.aggregates
console.log(`\nRun ${run.runId} · ${run.cases} cases · dataset v${run.datasetVersion} (${run.datasetHash})`)
console.log(`Models: chat ${run.config.chatModel}, embedding ${run.config.embeddingModel}, judge ${run.config.judgeModel}`)
console.log(`Retrieval: Recall@${run.config.k} ${pct(a.recallAtK)} · Precision@${run.config.k} ${pct(a.precisionAtK)} · MRR ${a.mrr?.toFixed(3) ?? 'n/a'} · nDCG@${run.config.k} ${a.ndcgAtK?.toFixed(3) ?? 'n/a'}`)
console.log(`Answers: faithfulness ${pct(a.faithfulness)} · correctness ${pct(a.correctness)} · completeness ${pct(a.completeness)} · context relevance ${pct(a.contextRelevance)}`)
console.log(`Citations: support ${pct(a.citationSupport)} (judge) · hit rate ${pct(a.citationHitRate)} · label precision ${pct(a.citationPrecision)} · abstention accuracy ${pct(a.abstentionAccuracy)} · unsupported-claim rate ${pct(a.unsupportedClaimRate)}`)
console.log(`Latency: avg ${a.avgLatencyMs?.toFixed(0) ?? 'n/a'} ms · p95 ${a.p95LatencyMs?.toFixed(0) ?? 'n/a'} ms · avg server TTFT ${a.avgServerTtftMs?.toFixed(0) ?? 'n/a'} ms`)
console.log(`Tokens: gen ${a.totalInputTokens} in / ${a.totalOutputTokens} out · judge ${a.judgeInputTokens} in / ${a.judgeOutputTokens} out`)
console.log(`Estimated cost: generation $${a.generationCostUsd?.toFixed(4) ?? 'n/a'} · judge $${a.judgeCostUsd?.toFixed(4) ?? 'n/a'}`)
console.log(`Thresholds: ${Object.entries(run.passed).map(([k, v]) => `${k}=${v === null ? 'n/a' : v ? 'pass' : 'FAIL'}`).join(' ')}`)
if (run.failedCases.length) console.log(`Cases with failures: ${run.failedCases.join(', ')}`)
process.exit(Object.values(run.passed).some((v) => v === false) ? 1 : 0)
