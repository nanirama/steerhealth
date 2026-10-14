'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { PublicSource } from '@/lib/rag/types'
import { TYPE_LABEL, fmtScore } from './format'

function TypeBadge({ type }: { type: string }) {
  return <span className="rounded-full bg-[#F2F2F2] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#5C5C5C]">{TYPE_LABEL[type] ?? type}</span>
}

/** Cited sources as numbered chips + an expandable list of everything that was retrieved. */
export default function SourceList({ messageId, cited, retrieved, highlight }: { messageId: string; cited: PublicSource[]; retrieved: PublicSource[]; highlight: number | null }) {
  const [open, setOpen] = useState(false)
  if (!retrieved.length) return null
  return (
    <div className="mt-4">
      {cited.length > 0 && (
        <>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#818181]">Sources</p>
          <ul className="flex flex-wrap gap-2">
            {cited.map((s) => {
              const body = (
                <>
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#335CFF] px-1 text-[11px] font-semibold text-white">{s.n}</span>
                  <span className="max-w-[240px] truncate text-[13px] font-medium text-[#171717]">{s.title}</span>
                  <TypeBadge type={s.contentType} />
                </>
              )
              const cls = `inline-flex items-center gap-2 rounded-full border bg-white py-1 pl-1 pr-3 transition-all duration-200 ${
                highlight === s.n ? 'border-[#335CFF] ring-2 ring-[#335CFF]/20' : 'border-[#EBEBEB] hover:border-[#335CFF]/60'
              }`
              return (
                <li key={s.n} id={`${messageId}-source-${s.n}`}>
                  {s.url ? (
                    <Link href={s.url} className={cls} title={`Open ${s.title}`}>
                      {body}
                    </Link>
                  ) : (
                    <span className={cls} title="This FAQ has no standalone page">
                      {body}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-[#5C5C5C] hover:text-[#171717] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#335CFF]/40"
      >
        <svg className={`h-3 w-3 transition-transform ${open ? 'rotate-90' : ''}`} viewBox="0 0 12 12" aria-hidden="true">
          <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Retrieved context ({retrieved.length})
      </button>
      {open && (
        <ol className="mt-2 space-y-2">
          {retrieved.map((s) => (
            <li key={s.n} className="rounded-xl border border-[#EBEBEB] bg-[#FAFAFA] p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[12px] font-semibold text-[#335CFF]">[{s.n}]</span>
                <span className="text-[13px] font-medium text-[#171717]">{s.title}</span>
                <TypeBadge type={s.contentType} />
                <span className="ml-auto text-[11px] tabular-nums text-[#818181]" title="Cosine similarity used for ranking; not a probability that the answer is correct.">
                  similarity {fmtScore(s.topScore)}
                </span>
              </div>
              {s.sections.length > 0 && <p className="mt-1 text-[12px] text-[#818181]">{s.sections.join(' · ')}</p>}
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#5C5C5C]">{s.excerpt}…</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
