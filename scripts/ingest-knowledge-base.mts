/**
 * Incrementally sync knowledge-base/*.md into Pinecone.
 *
 *   npm run rag:ingest                 # sync (added/modified/removed only)
 *   npm run rag:ingest -- --dry-run    # show the plan, change nothing
 *   npm run rag:ingest -- --create-index   # create the serverless index first if it is missing
 */
import nextEnv from '@next/env'

nextEnv.loadEnvConfig(process.cwd(), false, { info: () => null, error: console.error })
process.env.RAG_SILENT_STDOUT = '1'

const { getConfig, indexVersion, missingConfig } = await import('../src/lib/rag/config.ts')
const { runIngestion } = await import('../src/lib/rag/ingest.ts')
const { createServerlessIndex, verifyIndex } = await import('../src/lib/rag/pinecone.ts')
const { flushStores } = await import('../src/lib/rag/observability/jsonl-store.ts')
const { shutdownTracing } = await import('../src/lib/rag/observability/tracing.ts')

const args = new Set(process.argv.slice(2))
const cfg = getConfig()
const missing = missingConfig(cfg)
if (missing.length) {
  console.error(`Missing configuration: ${missing.join(', ')} (set them in .env)`)
  process.exit(1)
}

console.log(`Index "${cfg.pineconeIndexName}", namespace "${cfg.pineconeNamespace}", ${indexVersion(cfg)}`)

try {
  await verifyIndex(true)
} catch (e) {
  const code = (e as { code?: string }).code
  if (code === 'index_missing' && args.has('--create-index')) {
    console.log(`Creating serverless index "${cfg.pineconeIndexName}" (${cfg.embeddingDimensions} dims, cosine, ${cfg.pineconeCloud}/${cfg.pineconeRegion})...`)
    await createServerlessIndex()
    await verifyIndex(true)
  } else {
    console.error(`Index check failed: ${(e as Error).message}${code === 'index_missing' ? ' (re-run with --create-index to create it)' : ''}`)
    process.exit(1)
  }
}

const run = await runIngestion({ dryRun: args.has('--dry-run'), onProgress: (m) => console.log(`  ${m}`) })
await flushStores()
await shutdownTracing()

console.log(`\nStatus: ${run.status}${run.error ? ` — ${run.error}` : ''}`)
console.log(`Documents: ${run.documents.eligible} eligible · +${run.documents.added} added · ~${run.documents.modified} modified · =${run.documents.unchanged} unchanged · -${run.documents.removed} removed · ${run.documents.failed} failed`)
console.log(`Chunks: ${run.chunks.local} local · ${run.chunks.embedded} embedded · ${run.chunks.upserted} upserted · ${run.chunks.deleted} deleted`)
if (run.vectorCountAfter !== undefined) console.log(`Vectors in namespace (stats may lag a few seconds): ${run.vectorCountAfter}`)
console.log(`Embedding tokens: ${run.embeddingTokens ?? 'unavailable'} · embedding time ${run.embeddingMs} ms · total ${run.durationMs} ms`)
for (const i of run.loadIssues) console.log(`  load issue: ${i.file}: ${i.reason}`)
for (const f of run.failures) console.log(`  failure: ${f.file ?? f.docId}: ${f.reason}`)
process.exit(run.status === 'failed' ? 1 : 0)
