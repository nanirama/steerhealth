/**
 * Heading-aware Markdown chunking.
 *
 * 1. The body is split into sections at Markdown headings, tracking the heading path.
 * 2. Consecutive sections under the same H2 are packed together up to `chunkSizeTokens`.
 * 3. A section larger than the budget is split on paragraph (then line) boundaries, with
 *    `overlapTokens` of trailing context repeated at the start of the next piece.
 * 4. Every chunk is prefixed with the document title, type and section path so it stays
 *    understandable when retrieved on its own.
 *
 * Token counts are estimated as ceil(chars / 4); this only sizes chunks. Billing and
 * usage figures always come from the provider.
 */
import { hashText } from './markdown-loader.ts'
import type { Chunk, ContentType, KnowledgeDocument } from './types.ts'

export interface ChunkOptions {
  chunkSizeTokens: number
  overlapTokens: number
}

export const estimateTokens = (s: string) => Math.ceil(s.length / 4)

const TYPE_LABEL: Record<ContentType, string> = {
  page: 'Page',
  solutions: 'Solution',
  products: 'Product',
  faqs: 'FAQ',
}

interface Section {
  path: string[]
  /** Heading level that opened this section (1 for preamble). */
  level: number
  lines: string[]
}

function splitSections(body: string, title: string): Section[] {
  const sections: Section[] = []
  const stack: { level: number; text: string }[] = []
  let current: Section = { path: [], level: 1, lines: [] }
  let inFence = false
  for (const line of body.split('\n')) {
    if (/^```/.test(line)) inFence = !inFence
    const h = !inFence && /^(#{1,6})\s+(.*)$/.exec(line)
    if (h) {
      const level = h[1].length
      const text = h[2].trim()
      // The H1 repeats the document title; it is carried in the chunk prefix instead.
      if (level === 1 && text === title) continue
      if (current.lines.some((l) => l.trim())) sections.push(current)
      while (stack.length && stack[stack.length - 1].level >= level) stack.pop()
      stack.push({ level, text })
      current = { path: stack.map((s) => s.text), level, lines: [line] }
      continue
    }
    current.lines.push(line)
  }
  if (current.lines.some((l) => l.trim())) sections.push(current)
  return sections
}

/** Split text that exceeds the budget into pieces on paragraph/line boundaries with overlap. */
export function splitLong(text: string, maxTokens: number, overlapTokens: number): string[] {
  const maxChars = maxTokens * 4
  const overlapChars = overlapTokens * 4
  if (text.length <= maxChars) return [text]
  const units: string[] = []
  for (const para of text.split(/\n{2,}/)) {
    if (para.length <= maxChars) units.push(para)
    else {
      // Oversized paragraph (e.g. a long list or table): split on lines, then hard-wrap.
      for (const line of para.split('\n')) {
        if (line.length <= maxChars) units.push(line)
        else for (let i = 0; i < line.length; i += maxChars) units.push(line.slice(i, i + maxChars))
      }
    }
  }
  const pieces: string[] = []
  let buf: string[] = []
  let len = 0
  for (const u of units) {
    if (len + u.length + 2 > maxChars && buf.length) {
      pieces.push(buf.join('\n\n'))
      // Carry trailing units as overlap.
      const carry: string[] = []
      let carried = 0
      for (let i = buf.length - 1; i >= 0 && carried + buf[i].length <= overlapChars; i--) {
        carry.unshift(buf[i])
        carried += buf[i].length
      }
      buf = carry
      len = carried
    }
    buf.push(u)
    len += u.length + 2
  }
  if (buf.length) pieces.push(buf.join('\n\n'))
  return pieces
}

export function chunkDocument(doc: KnowledgeDocument, opts: ChunkOptions): Chunk[] {
  const prefixFor = (label: string) =>
    (doc.contentType === 'faqs' ? `FAQ: ${doc.title}` : `${doc.title} (${TYPE_LABEL[doc.contentType]})`) +
    (label ? `\nSection: ${label}` : '')

  const sections = splitSections(doc.body, doc.title)
  const budget = Math.max(50, opts.chunkSizeTokens)

  // Group sections by their top-level (H2) ancestor, then pack groups within budget.
  const packed: { path: string[]; text: string }[] = []
  let group: Section[] = []
  const flush = () => {
    if (!group.length) return
    let buf: Section[] = []
    let len = 0
    const emit = () => {
      if (!buf.length) return
      const text = buf.map((s) => s.lines.join('\n').trim()).filter(Boolean).join('\n\n')
      const path = buf.length === 1 ? buf[0].path : commonPath(buf.map((s) => s.path))
      packed.push({ path, text })
      buf = []
      len = 0
    }
    for (const s of group) {
      const t = estimateTokens(s.lines.join('\n'))
      if (len + t > budget && buf.length) emit()
      buf.push(s)
      len += t
    }
    emit()
    group = []
  }
  for (const s of sections) {
    const top = s.path[0]
    if (group.length && group[0].path[0] !== top) flush()
    group.push(s)
  }
  flush()

  // Merge adjacent tiny sections (e.g. a one-line hero or a 3-item stat list) so chunks carry
  // enough context to embed well. Their headings stay in the text.
  const merged: { label: string; text: string }[] = []
  for (const p of packed) {
    const label = p.path.join(' > ')
    const prev = merged[merged.length - 1]
    if (
      prev &&
      estimateTokens(prev.text) < MIN_CHUNK_TOKENS &&
      estimateTokens(prev.text) + estimateTokens(p.text) <= budget * 0.8
    ) {
      prev.text = `${prev.text}\n\n${p.text}`
      prev.label = [prev.label, label].filter(Boolean).join(' · ')
    } else merged.push({ label, text: p.text })
  }

  const raw: { label: string; text: string }[] = []
  for (const p of merged) {
    const prefix = prefixFor(p.label)
    const room = budget - estimateTokens(prefix) - 4
    for (const piece of splitLong(p.text, Math.max(40, room), opts.overlapTokens)) {
      raw.push({ label: p.label, text: `${prefix}\n\n${piece.trim()}` })
    }
  }

  return raw.map((r, index) => ({
    id: `${doc.id}#${index}`,
    docId: doc.id,
    index,
    count: raw.length,
    section: r.label,
    text: r.text,
    hash: hashText(r.text),
  }))
}

const MIN_CHUNK_TOKENS = 150

function commonPath(paths: string[][]): string[] {
  const first = paths[0] ?? []
  const out: string[] = []
  for (let i = 0; i < first.length; i++) {
    if (paths.every((p) => p[i] === first[i])) out.push(first[i])
    else break
  }
  return out
}
