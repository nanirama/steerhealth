/** Formatting for admin views. Missing values render as "No data", never as 0. */

export const NO_DATA = 'No data'

export const int = (n: number | null | undefined) => (typeof n === 'number' && Number.isFinite(n) ? Math.round(n).toLocaleString('en-US') : NO_DATA)

export function ms(v: number | null | undefined): string {
  if (typeof v !== 'number' || !Number.isFinite(v)) return NO_DATA
  if (v >= 1000) return `${(v / 1000).toFixed(v >= 10_000 ? 1 : 2)} s`
  return `${Math.round(v)} ms`
}

export function usd(v: number | null | undefined): string {
  if (typeof v !== 'number' || !Number.isFinite(v)) return NO_DATA
  if (v === 0) return '$0.00'
  if (v < 0.01) return `$${v.toFixed(5)}`
  return `$${v.toFixed(v < 10 ? 4 : 2)}`
}

export const pct = (v: number | null | undefined, digits = 1) => (typeof v === 'number' && Number.isFinite(v) ? `${(v * 100).toFixed(digits)}%` : NO_DATA)

export function when(iso: string | null | undefined): string {
  if (!iso) return NO_DATA
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? NO_DATA : d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'UTC' }) + ' UTC'
}

export const shortId = (id: string | null | undefined, n = 8) => (id ? (id.length > n + 2 ? `${id.slice(0, n)}…` : id) : NO_DATA)

export const STATUS_STYLE: Record<string, string> = {
  success: 'bg-[#E7F6EF] text-[#0F7A52]',
  abstained: 'bg-[#EEF2FF] text-[#3046C5]',
  error: 'bg-[#FDECEC] text-[#B42318]',
  timeout: 'bg-[#FFF4E5] text-[#B54708]',
  cancelled: 'bg-[#F2F2F2] text-[#5C5C5C]',
  ok: 'bg-[#E7F6EF] text-[#0F7A52]',
  'has errors': 'bg-[#FDECEC] text-[#B42318]',
  partial: 'bg-[#FFF4E5] text-[#B54708]',
  failed: 'bg-[#FDECEC] text-[#B42318]',
  'dry-run': 'bg-[#F2F2F2] text-[#5C5C5C]',
  unset: 'bg-[#F2F2F2] text-[#5C5C5C]',
}

export const LEVEL_STYLE: Record<string, string> = {
  debug: 'text-[#818181]',
  info: 'text-[#3046C5]',
  warn: 'text-[#B54708]',
  error: 'text-[#B42318]',
}

/** Human duration for bucket sizes / windows (e.g. "1 min", "10 min", "1 h", "1 d"). */
export function span(msVal: number): string {
  if (msVal >= 86400_000) return `${Math.round(msVal / 86400_000)} d`
  if (msVal >= 3600_000) return `${Math.round(msVal / 3600_000)} h`
  return `${Math.round(msVal / 60_000)} min`
}
