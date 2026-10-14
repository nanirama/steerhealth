'use client'

import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

/** Turn [1] / [1, 3] markers into internal links so they render as citation chips. */
function linkCitations(text: string): string {
  return text.replace(/\[(\d+(?:\s*,\s*\d+)*)\](?!\()/g, (_, g: string) =>
    g
      .split(',')
      .map((n) => `[${n.trim()}](#cite-${n.trim()})`)
      .join(''),
  )
}

/**
 * Safe Markdown: raw HTML is skipped, URLs go through react-markdown's default sanitizer, and
 * only site-relative or http(s) links render as anchors.
 */
export default function AnswerMarkdown({ text, messageId, validCitations, onCite }: { text: string; messageId: string; validCitations: number; onCite?: (n: number) => void }) {
  const components: Components = {
    a({ href, children }) {
      const cite = /^#cite-(\d+)$/.exec(href ?? '')
      if (cite) {
        const n = Number(cite[1])
        if (validCitations && n > validCitations) return null
        return (
          <button
            type="button"
            onClick={() => onCite?.(n)}
            aria-label={`Source ${n}`}
            aria-controls={`${messageId}-source-${n}`}
            className="mx-0.5 inline-flex h-[18px] min-w-[18px] -translate-y-0.5 items-center justify-center rounded-full bg-[#335CFF]/10 px-1 align-middle text-[11px] font-semibold text-[#335CFF] transition-colors hover:bg-[#335CFF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#335CFF]/40"
          >
            {n}
          </button>
        )
      }
      if (href && href.startsWith('/')) return <Link href={href} className="font-medium text-[#335CFF] underline-offset-2 hover:underline">{children}</Link>
      if (href && /^https?:\/\//.test(href)) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="font-medium text-[#335CFF] underline-offset-2 hover:underline">
            {children}
          </a>
        )
      }
      return <>{children}</>
    },
    p: ({ children }) => <p className="my-2 first:mt-0 last:mb-0">{children}</p>,
    ul: ({ children }) => <ul className="my-2 list-disc space-y-1 pl-5 marker:text-[#9A9A9A]">{children}</ul>,
    ol: ({ children }) => <ol className="my-2 list-decimal space-y-1 pl-5 marker:text-[#9A9A9A]">{children}</ol>,
    h1: ({ children }) => <h3 className="font3 mb-1 mt-3 text-[16px] font-semibold text-[#171717]">{children}</h3>,
    h2: ({ children }) => <h3 className="font3 mb-1 mt-3 text-[16px] font-semibold text-[#171717]">{children}</h3>,
    h3: ({ children }) => <h4 className="font3 mb-1 mt-3 text-[15px] font-semibold text-[#171717]">{children}</h4>,
    strong: ({ children }) => <strong className="font-semibold text-[#171717]">{children}</strong>,
    table: ({ children }) => (
      <div className="my-3 overflow-x-auto rounded-xl border border-[#EBEBEB]">
        <table className="w-full border-collapse text-left text-[13px]">{children}</table>
      </div>
    ),
    th: ({ children }) => <th className="border-b border-[#EBEBEB] bg-[#F7F7F7] px-3 py-2 font-semibold text-[#171717]">{children}</th>,
    td: ({ children }) => <td className="border-b border-[#F0F0F0] px-3 py-2 align-top">{children}</td>,
    code: ({ children }) => <code className="rounded bg-[#F2F2F2] px-1 py-0.5 text-[13px]">{children}</code>,
    img: () => null,
  }
  return (
    <div className="text-[15px] leading-[1.65] text-[#3D3D3D]">
      <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml components={components}>
        {linkCitations(text)}
      </ReactMarkdown>
    </div>
  )
}
