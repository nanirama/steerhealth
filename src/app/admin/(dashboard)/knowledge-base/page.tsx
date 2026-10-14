import { kbStatus } from '@/lib/rag/admin/kb-status'
import { ActionButton, AutoRefresh } from '@/components/Admin/client'
import { int, ms, when } from '@/components/Admin/format'
import { Card, Empty, Kpi, PageHeader, StatusBadge, tdCls, thCls } from '@/components/Admin/ui'

const TYPE_LABEL: Record<string, string> = { page: 'Pages', faqs: 'FAQs', products: 'Products', solutions: 'Solutions' }

export default async function KnowledgeBasePage({ searchParams }: { searchParams: Promise<{ refresh?: string }> }) {
  const sp = await searchParams
  const kb = await kbStatus(sp.refresh === '1')
  const last = kb.runs[0]
  return (
    <>
      <AutoRefresh everyMs={5000} active={kb.running} />
      <PageHeader title="Knowledge base" subtitle={`Source: knowledge-base/*.md (exported from Sanity) → Pinecone. Status as of ${when(kb.generatedAt)}.`}>
        <div className="flex flex-wrap items-start gap-2">
          <ActionButton url="/api/admin/knowledge-base" body={{ dryRun: true }} label="Preview changes" variant="secondary" disabled={kb.running} />
          <ActionButton url="/api/admin/knowledge-base" body={{}} label={kb.running ? 'Reindexing…' : 'Reindex'} disabled={kb.running} confirmText="Run an incremental reindex now? Changed documents are re-embedded and their stale vectors removed. The Pinecone index itself is never deleted." />
        </div>
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
        <Kpi label="Source documents" value={int(kb.source.documents)} />
        {['page', 'faqs', 'products', 'solutions'].map((t) => (
          <Kpi key={t} label={TYPE_LABEL[t]} value={int(kb.source.byType[t] ?? 0)} />
        ))}
        <Kpi label="Indexed documents" value={int(kb.index.indexedDocuments)} tone={kb.index.indexedDocuments !== null && kb.index.indexedDocuments !== kb.source.documents ? 'warn' : undefined} hint={kb.index.indexedDocuments !== null && kb.index.indexedDocuments !== kb.source.documents ? 'Differs from source — reindex' : undefined} />
        <Kpi label="Indexed chunks" value={int(kb.index.indexedChunks)} />
        <Kpi label="Last successful ingestion" value={kb.lastSuccessful ? when(kb.lastSuccessful.finishedAt) : 'Never'} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card title="Index configuration">
          {kb.index.error && <p className="mb-3 rounded-xl bg-[#FDECEC] px-3 py-2 text-[13px] text-[#B42318]">Pinecone unavailable: {kb.index.error}</p>}
          <dl className="grid gap-y-2 text-[13px] sm:grid-cols-[180px_1fr]">
            <dt className="text-[#5C5C5C]">Pinecone index</dt>
            <dd className="font-medium">{kb.index.name}</dd>
            <dt className="text-[#5C5C5C]">Namespace</dt>
            <dd className="font-medium">{kb.index.namespace}</dd>
            <dt className="text-[#5C5C5C]">Dimension / metric</dt>
            <dd className="font-medium">
              {kb.index.dimension ?? '—'} / {kb.index.metric ?? '—'}
            </dd>
            <dt className="text-[#5C5C5C]">Embedding model</dt>
            <dd className="font-medium">
              {kb.index.embeddingModel} ({kb.index.embeddingDimensions} dims)
            </dd>
            <dt className="text-[#5C5C5C]">Reranker</dt>
            <dd className="font-medium">{kb.index.rerankModel}</dd>
            <dt className="text-[#5C5C5C]">Index version</dt>
            <dd>
              <code className="text-[12px]">{kb.index.indexVersion}</code>
            </dd>
          </dl>
        </Card>
        <Card title="Latest run" description={last ? `${last.runId} · ${when(last.startedAt)}` : undefined}>
          {!last ? (
            <Empty>No ingestion runs recorded.</Empty>
          ) : (
            <>
              <p className="flex flex-wrap items-center gap-2 text-[13px]">
                <StatusBadge status={last.status} /> {ms(last.durationMs)} · embedding {ms(last.embeddingMs)} · {last.embeddingTokens === null ? 'embedding tokens unavailable' : `${int(last.embeddingTokens)} embedding tokens`}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {(['added', 'modified', 'unchanged', 'removed', 'failed', 'eligible'] as const).map((k) => (
                  <div key={k} className="rounded-xl bg-[#F7F7F7] p-2 text-center">
                    <p className="text-[11px] capitalize text-[#5C5C5C]">{k}</p>
                    <p className="font3 text-[18px] font-semibold tabular-nums">{last.documents[k]}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[12px] text-[#5C5C5C]">
                Chunks: {last.chunks.local} local · {last.chunks.embedded} embedded · {last.chunks.upserted} upserted · {last.chunks.deleted} deleted
              </p>
              {last.error && <p className="mt-2 text-[12px] text-[#B42318]">{last.error}</p>}
              {last.failures.length > 0 && (
                <ul className="mt-2 list-disc pl-5 text-[12px] text-[#B42318]">
                  {last.failures.map((f, i) => (
                    <li key={i}>
                      {f.file ?? f.docId}: {f.reason}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </Card>
      </div>

      {kb.source.issues.length > 0 && (
        <Card className="mt-6" title="Source files that cannot be indexed">
          <ul className="list-disc pl-5 text-[13px] text-[#B42318]">
            {kb.source.issues.map((i) => (
              <li key={i.file}>
                {i.file}: {i.reason}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="mt-6" title="Ingestion history">
        {!kb.runs.length ? (
          <Empty>No ingestion runs recorded.</Empty>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#F0F0F0]">
                <tr>
                  {['Started', 'Status', 'Added', 'Modified', 'Unchanged', 'Removed', 'Failed', 'Upserted', 'Deleted', 'Duration', 'Index version'].map((h) => (
                    <th key={h} className={thCls}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {kb.runs.map((r) => (
                  <tr key={r.runId} className="border-b border-[#F5F5F5]">
                    <td className={tdCls}>{when(r.startedAt)}</td>
                    <td className={tdCls}>
                      <StatusBadge status={r.status} />
                    </td>
                    <td className={tdCls}>{r.documents.added}</td>
                    <td className={tdCls}>{r.documents.modified}</td>
                    <td className={tdCls}>{r.documents.unchanged}</td>
                    <td className={tdCls}>{r.documents.removed}</td>
                    <td className={`${tdCls} ${r.documents.failed ? 'text-[#B42318]' : ''}`}>{r.documents.failed}</td>
                    <td className={tdCls}>{r.chunks.upserted}</td>
                    <td className={tdCls}>{r.chunks.deleted}</td>
                    <td className={tdCls}>{ms(r.durationMs)}</td>
                    <td className={`${tdCls} font-mono text-[11px]`}>{r.indexVersion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  )
}
