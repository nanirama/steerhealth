/** Secret and personal-data redaction shared by logs, events and stored transcripts. */

const SECRET_KEYS = /(api[-_]?key|token|secret|password|authorization|cookie)/i
const SECRET_VALUES = [/AIza[0-9A-Za-z_-]{20,}/g, /pcsk_[0-9A-Za-z_-]{20,}/g, /Bearer\s+[A-Za-z0-9._-]{8,}/gi, /sk-[A-Za-z0-9]{20,}/g, /scrypt\$[^\s"]+/g]
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g
const PHONE = /\+?\d[\d\s().-]{8,}\d/g
const CARD = /\b(?:\d[ -]?){13,19}\b/g
const SSN = /\b\d{3}-\d{2}-\d{4}\b/g

export function redactText(s: string): string {
  let out = s
  for (const re of SECRET_VALUES) out = out.replace(re, '[REDACTED]')
  return out.replace(EMAIL, '[email]').replace(SSN, '[id]').replace(CARD, '[number]').replace(PHONE, '[phone]')
}

/** Redact secrets by key name and by known token shapes; mask personal data in strings. */
export function redact(value: unknown, depth = 0): unknown {
  if (depth > 6) return '[depth]'
  if (typeof value === 'string') return redactText(value)
  if (Array.isArray(value)) return value.slice(0, 50).map((v) => redact(v, depth + 1))
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) out[k] = SECRET_KEYS.test(k) ? '[REDACTED]' : redact(v, depth + 1)
    return out
  }
  return value
}
