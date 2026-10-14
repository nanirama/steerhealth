import Link from 'next/link'
import { getConfig } from '@/lib/rag/config'
import { filterOptions, listConversations } from '@/lib/rag/store/queries'
import { int, ms, shortId, usd } from '@/components/Admin/format'
import { Card, Empty, PageHeader, Pagination, StatusBadge, inputCls, labelCls, tdCls, thCls } from '@/components/Admin/ui'

const TYPE_LABEL: Record<string, string> = { page: 'Pages', products: 'Products', solutions: 'Solutions', faqs: 'FAQs' }

export default async function ConversationsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams
  const num = (v?: string) => (v && Number.isFinite(Number(v)) && Number(v) > 0 ? Number(v) : undefined)
  const filters = {
    q: (sp.q ?? '').slice(0, 100),
    from: sp.from,
    to: sp.to,
    status: (sp.status === 'success' || sp.status === 'failed' ? sp.status : '') as '' | 'success' | 'failed',
    slow: sp.slow === '1',
    minLatencyMs: num(sp.minLatencyMs),
    contentType: sp.contentType || undefined,
    model: sp.model || undefined,
    minTokens: num(sp.minTokens),
    minCostUsd: num(sp.minCostUsd),
    page: num(sp.page) ?? 1,
    pageSize: 25,
  }
  const data = listConversations(filters)
  const opts = filterOptions()
  const target = getConfig().latencyTargetMs
  const params = Object.fromEntries(Object.entries(sp).filter(([k]) => k !== 'page')) as Record<string, string | undefined>
  const active = Object.entries(params).some(([, v]) => v)

  return (
    <>
      <PageHeader title="Conversations" subtitle="Every conversation and its RAG requests. Filtering and pagination run on the server." />
      <Card className="mb-6">
        <form method="get" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="q">
              Conversation, request or trace ID
            </label>
            <input id="q" name="q" defaultValue={filters.q} placeholder="Paste an ID…" className={`${inputCls} mt-1 font-mono`} />
          </div>
          <div>
            <label className={labelCls} htmlFor="from">
              From
            </label>
            <input id="from" name="from" type="date" defaultValue={sp.from} className={`${inputCls} mt-1`} />
          </div>
          <div>
            <label className={labelCls} htmlFor="to">
              To
            </label>
            <input id="to" name="to" type="date" defaultValue={sp.to} className={`${inputCls} mt-1`} />
          </div>
          <div>
            <label className={labelCls} htmlFor="status">
              Outcome
            </label>
            <select id="status" name="status" defaultValue={filters.status} className={`${inputCls} mt-1`}>
              <option value="">Any</option>
              <option value="success">No failed requests</option>
              <option value="failed">Has failed requests</option>
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="contentType">
              Retrieved content type
            </label>
            <select id="contentType" name="contentType" defaultValue={sp.contentType ?? ''} className={`${inputCls} mt-1`}>
              <option value="">Any</option>
              {opts.contentTypes.map((t) => (
                <option key={t} value={t}>
                  {TYPE_LABEL[t] ?? t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="model">
              Gemini model
            </label>
            <select id="model" name="model" defaultValue={sp.model ?? ''} className={`${inputCls} mt-1`}>
              <option value="">Any</option>
              {opts.models.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="minLatencyMs">
              Min. latency (ms)
            </label>
            <input id="minLatencyMs" name="minLatencyMs" type="number" min="0" defaultValue={sp.minLatencyMs} className={`${inputCls} mt-1`} />
          </div>
          <div>
            <label className={labelCls} htmlFor="minTokens">
              Min. total tokens
            </label>
            <input id="minTokens" name="minTokens" type="number" min="0" defaultValue={sp.minTokens} className={`${inputCls} mt-1`} />
          </div>
          <div>
            <label className={labelCls} htmlFor="minCostUsd">
              Min. cost (USD)
            </label>
            <input id="minCostUsd" name="minCostUsd" type="number" min="0" step="0.0001" defaultValue={sp.minCostUsd} className={`${inputCls} mt-1`} />
          </div>
          <label className="flex items-center gap-2 self-end pb-2 text-[13px] text-[#171717]">
            <input type="checkbox" name="slow" value="1" defaultChecked={filters.slow} className="h-4 w-4 accent-[#335CFF]" />
            Slow (&gt; {ms(target)})
          </label>
          <div className="flex items-end gap-2">
            <button type="submit" className="rounded-[8px] bg-[#335CFF] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#2F55EB]">
              Apply
            </button>
            {active && (
              <Link href="/admin/conversations" className="rounded-[8px] border border-[#EBEBEB] bg-white px-3 py-2 text-[13px] font-medium text-[#171717] hover:border-[#335CFF]">
                Reset
              </Link>
            )}
          </div>
        </form>
      </Card>

      <Card>
        {!data.rows.length ? (
          <Empty>{active ? 'No conversations match these filters.' : 'No conversations recorded yet. Ask a question on /ai-assistant to create one.'}</Empty>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-[#F0F0F0]">
                  <tr>
                    {['Conversation', 'Started', 'Last activity', 'Questions', 'Responses', 'Input', 'Output', 'Total tokens', 'Generation time', 'Avg latency', 'Est. cost', 'Errors', 'Status'].map((h) => (
                      <th key={h} className={thCls}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((c) => (
                    <tr key={c.id} className="border-b border-[#F5F5F5] hover:bg-[#FAFAFA]">
                      <td className={tdCls}>
                        <Link href={`/admin/conversations/${c.id}`} className="font-mono text-[12px] font-medium text-[#335CFF] hover:underline">
                          {shortId(c.id, 18)}
                        </Link>
                      </td>
                      <td className={tdCls}>{c.startedAt.slice(5, 16).replace('T', ' ')}</td>
                      <td className={tdCls}>{c.lastActivity.slice(5, 16).replace('T', ' ')}</td>
                      <td className={tdCls}>{c.questions}</td>
                      <td className={tdCls}>{c.responses}</td>
                      <td className={tdCls}>{int(c.inputTokens)}</td>
                      <td className={tdCls}>{int(c.outputTokens)}</td>
                      <td className={tdCls}>{int(c.totalTokens)}</td>
                      <td className={tdCls}>{ms(c.generationMs)}</td>
                      <td className={`${tdCls} ${(c.maxLatencyMs ?? 0) > target ? 'text-[#B54708]' : ''}`}>{ms(c.avgLatencyMs)}</td>
                      <td className={tdCls}>{usd(c.costUsd)}</td>
                      <td className={`${tdCls} ${c.errors ? 'font-semibold text-[#B42318]' : ''}`}>{c.errors}</td>
                      <td className={tdCls}>
                        <StatusBadge status={c.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={data.page} pages={data.pages} total={data.total} basePath="/admin/conversations" params={params} />
          </>
        )}
      </Card>
    </>
  )
}
