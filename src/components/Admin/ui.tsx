import Link from 'next/link'
import { STATUS_STYLE } from './format'

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font3 text-[26px] font-semibold tracking-tight text-[#171717]">{title}</h1>
        {subtitle && <p className="mt-1 text-[13px] text-[#5C5C5C]">{subtitle}</p>}
      </div>
      {children}
    </header>
  )
}

export function Card({ title, description, children, action, className = '' }: { title?: string; description?: React.ReactNode; children: React.ReactNode; action?: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-[20px] border border-[#EBEBEB] bg-white p-5 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && <h2 className="font3 text-[15px] font-semibold text-[#171717]">{title}</h2>}
            {description && <p className="mt-0.5 text-[12px] text-[#818181]">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

export function Kpi({ label, value, hint, tone }: { label: string; value: string; hint?: string; tone?: 'warn' | 'bad' | 'good' }) {
  const color = tone === 'bad' ? 'text-[#B42318]' : tone === 'warn' ? 'text-[#B54708]' : tone === 'good' ? 'text-[#0F7A52]' : 'text-[#171717]'
  return (
    <div className="rounded-2xl border border-[#EBEBEB] bg-white p-4">
      <p className="text-[12px] text-[#5C5C5C]">{label}</p>
      <p className={`font3 mt-1 text-[22px] font-semibold tabular-nums ${color} ${value === 'No data' || value.startsWith('Insufficient') ? '!text-[15px] !font-medium !text-[#9A9A9A]' : ''}`}>{value}</p>
      {hint && <p className="mt-1 text-[11px] leading-snug text-[#818181]">{hint}</p>}
    </div>
  )
}

export function StatusBadge({ status }: { status: string }) {
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_STYLE[status] ?? 'bg-[#F2F2F2] text-[#5C5C5C]'}`}>{status}</span>
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <p className="rounded-xl bg-[#F7F7F7] px-4 py-8 text-center text-[14px] text-[#5C5C5C]">{children}</p>
}

export function Pagination({ page, pages, total, basePath, params }: { page: number; pages: number; total: number; basePath: string; params: Record<string, string | undefined> }) {
  const href = (p: number) => {
    const q = new URLSearchParams()
    for (const [k, v] of Object.entries(params)) if (v) q.set(k, v)
    q.set('page', String(p))
    return `${basePath}?${q.toString()}`
  }
  return (
    <nav aria-label="Pagination" className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[13px]">
      <span className="text-[#5C5C5C]">
        {total.toLocaleString('en-US')} result{total === 1 ? '' : 's'} · page {page} of {pages}
      </span>
      <span className="flex gap-2">
        {page > 1 ? (
          <Link href={href(page - 1)} className="rounded-lg border border-[#EBEBEB] bg-white px-3 py-1.5 font-medium hover:border-[#335CFF]">
            ← Previous
          </Link>
        ) : (
          <span className="rounded-lg border border-[#F0F0F0] px-3 py-1.5 text-[#BDBDBD]">← Previous</span>
        )}
        {page < pages ? (
          <Link href={href(page + 1)} className="rounded-lg border border-[#EBEBEB] bg-white px-3 py-1.5 font-medium hover:border-[#335CFF]">
            Next →
          </Link>
        ) : (
          <span className="rounded-lg border border-[#F0F0F0] px-3 py-1.5 text-[#BDBDBD]">Next →</span>
        )}
      </span>
    </nav>
  )
}

export const inputCls = 'w-full rounded-[8px] border border-[#EBEBEB] bg-white px-3 py-2 text-[13px] text-[#171717] focus:border-[#335CFF] focus:outline-none focus:ring-2 focus:ring-[#335CFF]/20'
export const labelCls = 'block text-[12px] font-medium text-[#5C5C5C]'
export const thCls = 'whitespace-nowrap px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-[#818181]'
export const tdCls = 'whitespace-nowrap px-3 py-2.5 text-[13px] tabular-nums text-[#171717]'
