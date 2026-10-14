/**
 * Latency benchmark against a running server (dev or prod), measured from the client side.
 *
 *   npm run rag:bench -- --url http://localhost:3000 --n 10 --concurrency 2
 *
 * Reports per-stage server timings (from the `done` event) and client TTFT / completion,
 * with p50/p95, cold (first) vs warm requests, and threshold warnings.
 */
import nextEnv from '@next/env'

nextEnv.loadEnvConfig(process.cwd(), false, { info: () => null, error: console.error })

const argv = process.argv.slice(2)
const arg = (name: string, d: string) => argv[argv.indexOf(`--${name}`) + 1] && argv.includes(`--${name}`) ? argv[argv.indexOf(`--${name}`) + 1] : d
const base = arg('url', 'http://localhost:3000')
const n = Number(arg('n', '10'))
const concurrency = Number(arg('concurrency', '1'))
const latencyTarget = Number(process.env.RAG_LATENCY_TARGET_MS || 4000)
const ttftTarget = Number(process.env.RAG_TTFT_TARGET_MS || 1500)

const QUESTIONS = [
  'What is AI Front Door?',
  'How does Steer Health help hospitals?',
  'Which EHR systems does Steer integrate with?',
  'How secure is patient data?',
  'What does the Luna virtual assistant do?',
  'How long is the setup time?',
  'What is Steer Clinical Notes?',
  'How does Steer help ambulatory surgery centers?',
]

interface Sample {
  ok: boolean
  status: string
  clientTtft: number | null
  clientTotal: number
  server?: Record<string, number | null>
  inputTokens?: number | null
  outputTokens?: number | null
}

async function one(q: string): Promise<Sample> {
  const t0 = performance.now()
  let ttft: number | null = null
  const res = await fetch(`${base}/api/rag/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: q }] }) })
  if (!res.ok || !res.body) return { ok: false, status: `http_${res.status}`, clientTtft: null, clientTotal: performance.now() - t0 }
  const reader = res.body.getReader()
  const dec = new TextDecoder()
  let buf = ''
  let done: { status: string; timings: Record<string, number | null>; usage?: { inputTokens: number | null; outputTokens: number | null } } | undefined
  let status = 'incomplete'
  for (;;) {
    const r = await reader.read()
    if (r.done) break
    buf += dec.decode(r.value, { stream: true })
    let i: number
    while ((i = buf.indexOf('\n')) !== -1) {
      const ev = JSON.parse(buf.slice(0, i))
      buf = buf.slice(i + 1)
      if (ev.type === 'delta' && ttft === null) ttft = performance.now() - t0
      if (ev.type === 'done') {
        done = ev
        status = ev.status
      }
      if (ev.type === 'error') status = ev.code
    }
  }
  return { ok: Boolean(done), status, clientTtft: ttft, clientTotal: performance.now() - t0, server: done?.timings, inputTokens: done?.usage?.inputTokens, outputTokens: done?.usage?.outputTokens }
}

const pct = (xs: number[], p: number) => {
  const v = xs.filter(Number.isFinite).sort((a, b) => a - b)
  return v.length ? v[Math.min(v.length - 1, Math.ceil((p / 100) * v.length) - 1)] : NaN
}
const f = (x: number) => (Number.isFinite(x) ? `${Math.round(x)}` : 'n/a')

console.log(`Benchmark ${base} · ${n} requests · concurrency ${concurrency}`)
const samples: Sample[] = []
let next = 0
await Promise.all(
  Array.from({ length: concurrency }, async () => {
    while (next < n) {
      const i = next++
      const s = await one(QUESTIONS[i % QUESTIONS.length])
      samples[i] = s
      console.log(`  #${i + 1} ${s.status} client ${f(s.clientTotal)} ms · ttft ${f(s.clientTtft ?? NaN)} ms · server ${f(s.server?.totalServerMs ?? NaN)} ms`)
    }
  }),
)

const ok = samples.filter((s) => s.ok)
const col = (get: (s: Sample) => number | null | undefined) => ok.map((s) => get(s) ?? NaN)
const rows: [string, number[]][] = [
  ['client completion', col((s) => s.clientTotal)],
  ['client TTFT', col((s) => s.clientTtft)],
  ['server total', col((s) => s.server?.totalServerMs)],
  ['server TTFT', col((s) => s.server?.serverTtftMs)],
  ['embedding', col((s) => s.server?.embeddingMs)],
  ['vector search', col((s) => s.server?.vectorSearchMs)],
  ['rerank', col((s) => s.server?.rerankMs)],
  ['generation', col((s) => s.server?.generationMs)],
]
console.log(`\n${ok.length}/${samples.length} succeeded. Cold (first) request: client ${f(samples[0]?.clientTotal ?? NaN)} ms`)
console.log('stage'.padEnd(20) + 'p50'.padStart(8) + 'p95'.padStart(8) + 'max'.padStart(8) + '  (ms)')
for (const [name, xs] of rows) console.log(name.padEnd(20) + f(pct(xs, 50)).padStart(8) + f(pct(xs, 95)).padStart(8) + f(Math.max(...xs.filter(Number.isFinite))).padStart(8))
const warm = ok.slice(1)
const p95 = pct(warm.map((s) => s.clientTotal), 95)
const ttft = pct(warm.map((s) => s.clientTtft ?? NaN), 50)
if (p95 > latencyTarget) console.log(`WARNING: warm p95 completion ${f(p95)} ms exceeds RAG_LATENCY_TARGET_MS ${latencyTarget}`)
if (ttft > ttftTarget) console.log(`WARNING: warm p50 TTFT ${f(ttft)} ms exceeds RAG_TTFT_TARGET_MS ${ttftTarget}`)
const tokensIn = ok.map((s) => s.inputTokens ?? 0)
console.log(`Avg input tokens ${f(tokensIn.reduce((a, b) => a + b, 0) / (tokensIn.length || 1))} · avg output tokens ${f(ok.reduce((a, s) => a + (s.outputTokens ?? 0), 0) / (ok.length || 1))}`)
