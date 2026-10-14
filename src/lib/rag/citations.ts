/** Citation parsing/validation: every [n] must refer to a source actually given to the model. */
import type { CitationReport } from './types.ts'

/** Exact abstention sentence the model is instructed to use when the sources lack the answer. */
export const ABSTAIN_TEXT = "I couldn't find that in Steer Health's knowledge base."

const MARKER = /\[(\d+(?:\s*,\s*\d+)*)\]/g

export function extractCitationNumbers(text: string): number[] {
  const out: number[] = []
  for (const m of text.matchAll(MARKER)) for (const n of m[1].split(',')) out.push(Number(n.trim()))
  return out
}

export function isAbstention(text: string): boolean {
  const t = text.trim().toLowerCase().replace(/[’]/g, "'")
  return t.startsWith(ABSTAIN_TEXT.toLowerCase().slice(0, 40))
}

/**
 * Validate markers against the number of sources. Invalid markers (e.g. [7] with 5 sources)
 * are removed from the returned answer so the UI never links to a non-existent source.
 */
export function validateCitations(answer: string, sourceCount: number): { answer: string; report: CitationReport } {
  const invalid = new Set<number>()
  const cited: number[] = []
  const cleaned = answer.replace(MARKER, (_, group: string) => {
    const nums = group.split(',').map((n) => Number(n.trim()))
    const ok = nums.filter((n) => Number.isInteger(n) && n >= 1 && n <= sourceCount)
    for (const n of nums) if (!ok.includes(n)) invalid.add(n)
    for (const n of ok) if (!cited.includes(n)) cited.push(n)
    return ok.length ? `[${ok.join(', ')}]` : ''
  })
  const abstained = isAbstention(cleaned)
  return {
    answer: cleaned.replace(/[ \t]+([.,;:])/g, '$1').trim(),
    report: {
      cited,
      invalid: [...invalid],
      abstained,
      uncitedAnswer: !abstained && cited.length === 0 && cleaned.trim().length > 0,
    },
  }
}
