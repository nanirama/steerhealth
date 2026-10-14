import Link from 'next/link'
import { notFound } from 'next/navigation'
import { TRACE_RE } from '@/lib/rag/admin/handlers'
import { listLogs, requestByTrace, traceSpans } from '@/lib/rag/store/queries'
import { ms, when } from '@/components/Admin/format'
import { LogsTable, TraceTimeline } from '@/components/Admin/trace'
import { Card, PageHeader, StatusBadge } from '@/components/Admin/ui'

export default async function TracePage({ params }: { params: Promise<{ traceId: string }> }) {
  const { traceId } = await params
  if (!TRACE_RE.test(traceId)) notFound()
  const spans = traceSpans(traceId)
  const req = requestByTrace(traceId)
  const logs = listLogs({ traceId, pageSize: 200 }).rows
  if (!spans.length && !logs.length) notFound()
  const root = spans.find((s) => !s.parentSpanId)
  return (
    <>
      <nav className="mb-3 text-[12px]">
        {req ? (
          <Link href={`/admin/conversations/${req.conversationId}#req-${req.requestId}`} className="font-medium text-[#335CFF] hover:underline">
            ← Conversation {req.conversationId.slice(0, 12)}
          </Link>
        ) : (
          <Link href="/admin/logs" className="font-medium text-[#335CFF] hover:underline">
            ← Logs
          </Link>
        )}
      </nav>
      <PageHeader
        title="Trace explorer"
        subtitle={
          <>
            <code className="text-[12px]">{traceId}</code>
            {root && (
              <>
                {' '}
                · {root.name} · {when(root.startTime)} · {ms(root.durationMs)} · <StatusBadge status={root.status} />
              </>
            )}
          </>
        }
      />
      <Card title={`Spans (${spans.length})`} description="Recorded OpenTelemetry spans. Click a span for attributes, parent and events.">
        <TraceTimeline spans={spans} />
      </Card>
      <Card className="mt-6" title={`Correlated logs (${logs.length})`}>
        <LogsTable logs={logs} />
      </Card>
    </>
  )
}
