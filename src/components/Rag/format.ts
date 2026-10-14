/** Client-safe formatting helpers for the /ai-assistant UI. */
import type { StreamEvent } from '@/lib/rag/types'

export const fmtInt = (n: number | null | undefined) => (typeof n === 'number' && Number.isFinite(n) ? n.toLocaleString('en-US') : 'Unavailable')

export function fmtMs(ms: number | null | undefined): string {
  if (typeof ms !== 'number' || !Number.isFinite(ms)) return '—'
  if (ms >= 1000) return `${(ms / 1000).toFixed(ms >= 10_000 ? 1 : 2)} s`
  return `${Math.round(ms)} ms`
}

export function fmtUsd(v: number | null | undefined): string {
  if (typeof v !== 'number' || !Number.isFinite(v)) return 'Unavailable'
  if (v === 0) return '$0.00'
  if (v < 0.01) return `$${v.toFixed(5)}`
  return `$${v.toFixed(4)}`
}

export const fmtPct = (v: number | null | undefined, digits = 0) => (typeof v === 'number' && Number.isFinite(v) ? `${(v * 100).toFixed(digits)}%` : '—')

export const fmtScore = (v: number | null | undefined) => (typeof v === 'number' && Number.isFinite(v) ? v.toFixed(2) : '—')

export function fmtTime(iso: string | null | undefined): string {
  if (!iso) return '—'
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export const TYPE_LABEL: Record<string, string> = { page: 'Page', solutions: 'Solution', products: 'Product', faqs: 'FAQ' }

/** Parse an NDJSON response body into StreamEvents as they arrive. */
export async function* readEvents(body: ReadableStream<Uint8Array>): AsyncGenerator<StreamEvent> {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buf = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buf += decoder.decode(value, { stream: true })
    let nl: number
    while ((nl = buf.indexOf('\n')) !== -1) {
      const line = buf.slice(0, nl).trim()
      buf = buf.slice(nl + 1)
      if (line) yield JSON.parse(line) as StreamEvent
    }
  }
  if (buf.trim()) yield JSON.parse(buf) as StreamEvent
}

/** Fetch an admin endpoint with the session's bearer token. */
export async function adminFetch<T>(url: string, token: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(url, { ...init, headers: { ...(init.headers ?? {}), Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, cache: 'no-store' })
  const data = (await res.json().catch(() => ({}))) as T & { error?: { code: string; message: string } }
  if (!res.ok) throw Object.assign(new Error(data.error?.message ?? `Request failed (${res.status})`), { status: res.status, code: data.error?.code })
  return data
}
