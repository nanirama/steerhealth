import Link from 'next/link'
import { eventTypes, listLogs } from '@/lib/rag/store/queries'
import { LogsTable } from '@/components/Admin/trace'
import { Card, PageHeader, Pagination, inputCls, labelCls } from '@/components/Admin/ui'

export default async function LogsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams
  const page = Math.max(1, Number(sp.page) || 1)
  const data = listLogs({ q: (sp.q ?? '').slice(0, 100), level: sp.level, event: sp.event, page, pageSize: 50 })
  const events = eventTypes()
  const params = { q: sp.q, level: sp.level, event: sp.event }
  return (
    <>
      <PageHeader title="Logs" subtitle="Structured events from the telemetry store, newest first. Correlated by conversation, request and trace IDs." />
      <Card className="mb-6">
        <form method="get" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="q">
              Request, trace or conversation ID
            </label>
            <input id="q" name="q" defaultValue={sp.q} className={`${inputCls} mt-1 font-mono`} />
          </div>
          <div>
            <label className={labelCls} htmlFor="level">
              Minimum severity
            </label>
            <select id="level" name="level" defaultValue={sp.level ?? ''} className={`${inputCls} mt-1`}>
              <option value="">Any</option>
              <option value="info">Info and above</option>
              <option value="warn">Warnings and errors</option>
              <option value="error">Errors only</option>
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="event">
              Event type
            </label>
            <select id="event" name="event" defaultValue={sp.event ?? ''} className={`${inputCls} mt-1`}>
              <option value="">Any</option>
              {events.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button type="submit" className="rounded-[8px] bg-[#335CFF] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#2F55EB]">
              Apply
            </button>
            {(sp.q || sp.level || sp.event) && (
              <Link href="/admin/logs" className="rounded-[8px] border border-[#EBEBEB] bg-white px-3 py-2 text-[13px] font-medium hover:border-[#335CFF]">
                Reset
              </Link>
            )}
          </div>
        </form>
      </Card>
      <Card>
        <LogsTable logs={data.rows} />
        <Pagination page={data.page} pages={data.pages} total={data.total} basePath="/admin/logs" params={params} />
      </Card>
    </>
  )
}
