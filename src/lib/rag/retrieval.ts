/** Turn raw Pinecone matches into numbered, deduplicated, budgeted sources for the prompt. */
import type { PublicSource, RetrievedChunk, Source } from './types.ts'

export interface AssembleOptions {
  minScore: number
  maxSources: number
  maxChunksPerDoc: number
  maxContextChars: number
}

export interface AssembledContext {
  sources: Source[]
  /** Matches that passed the score threshold (before per-doc/budget limits). */
  aboveThreshold: number
  droppedForBudget: number
}

export function assembleContext(matches: RetrievedChunk[], opts: AssembleOptions): AssembledContext {
  // Reranked candidates are ordered by rerank score; otherwise by cosine similarity.
  const reranked = matches.some((m) => typeof m.rerankScore === 'number')
  const sorted = [...matches].sort((a, b) => (reranked ? (b.rerankScore ?? -1) - (a.rerankScore ?? -1) : b.score - a.score))
  const seenIds = new Set<string>()
  const seenText = new Set<string>()
  const passing = sorted.filter((m) => {
    if (m.score < opts.minScore || seenIds.has(m.id)) return false
    seenIds.add(m.id)
    const key = m.metadata.chunk_hash || m.metadata.text
    if (seenText.has(key)) return false // identical chunk text from a shared/duplicated document
    seenText.add(key)
    return true
  })

  const byDoc = new Map<string, RetrievedChunk[]>()
  for (const m of passing) {
    const list = byDoc.get(m.metadata.doc_id) ?? []
    if (list.length < opts.maxChunksPerDoc) list.push(m)
    byDoc.set(m.metadata.doc_id, list)
  }

  const sources: Source[] = []
  let used = 0
  let dropped = 0
  for (const [docId, chunks] of byDoc) {
    if (sources.length >= opts.maxSources) {
      dropped += chunks.length
      continue
    }
    const ordered = [...chunks].sort((a, b) => a.metadata.chunk_index - b.metadata.chunk_index)
    const kept = []
    for (const c of ordered) {
      if (used + c.metadata.text.length > opts.maxContextChars && (sources.length || kept.length)) {
        dropped++
        continue
      }
      used += c.metadata.text.length
      kept.push(c)
    }
    if (!kept.length) continue
    const m = kept[0].metadata
    sources.push({
      n: sources.length + 1,
      docId,
      title: m.title,
      contentType: m.content_type,
      url: m.url,
      sourceFile: m.source_file,
      chunks: kept.map((c) => ({ id: c.id, section: c.metadata.section, score: c.score, text: c.metadata.text })),
      topScore: Math.max(...kept.map((c) => c.score)),
    })
  }
  return { sources, aboveThreshold: passing.length, droppedForBudget: dropped }
}

/** Source blocks inserted into the prompt. Content is wrapped and labelled as untrusted data. */
export function formatSourcesForPrompt(sources: Source[]): string {
  return sources
    .map((s) => {
      const body = s.chunks.map((c) => c.text.replace(/<\/?source[^>]*>/gi, '')).join('\n\n---\n\n')
      return `<source id="${s.n}" title="${s.title.replace(/"/g, "'")}" type="${s.contentType}">\n${body}\n</source>`
    })
    .join('\n\n')
}

export function toPublicSource(s: Source): PublicSource {
  const text = s.chunks[0]?.text ?? ''
  // Drop the "Title (Type)\nSection: ..." prefix from the excerpt shown in the UI.
  const excerpt = text.replace(/^[^\n]*\n(Section:[^\n]*\n)?\n?/, '').replace(/\s+/g, ' ').trim().slice(0, 280)
  return {
    n: s.n,
    docId: s.docId,
    title: s.title,
    contentType: s.contentType,
    url: s.url,
    topScore: Math.round(s.topScore * 1000) / 1000,
    sections: [...new Set(s.chunks.map((c) => c.section).filter((x): x is string => Boolean(x)))],
    excerpt,
  }
}
