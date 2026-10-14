/** Server-rendered SVG charts. Data comes straight from stored measurements; empty buckets are gaps. */
import { ms, NO_DATA } from './format'

type Point = Record<string, number | string | null>

const W = 720
const H = 200
const PAD = { l: 52, r: 12, t: 10, b: 26 }

function ticks(max: number, n = 4) {
  if (!max) return [0]
  const step = Math.pow(10, Math.floor(Math.log10(max / n)))
  const nice = [1, 2, 5, 10].map((m) => m * step).find((s) => max / s <= n) ?? step * 10
  return Array.from({ length: Math.floor(max / nice) + 1 }, (_, i) => i * nice)
}

function timeLabel(iso: string, bucketMs: number) {
  const d = new Date(iso)
  return bucketMs >= 86400_000 ? d.toISOString().slice(5, 10) : d.toISOString().slice(11, 16)
}

export interface Series {
  key: string
  label: string
  color: string
  dashed?: boolean
}

/** Line chart (one line per series); null values break the line. */
export function LineChart({ points, series, bucketMs, unit, threshold, format = ms, ariaLabel }: { points: Point[]; series: Series[]; bucketMs: number; unit: string; threshold?: { value: number; label: string }; format?: (v: number) => string; ariaLabel: string }) {
  const vals = points.flatMap((p) => series.map((s) => p[s.key])).filter((v): v is number => typeof v === 'number')
  if (!vals.length) return <p className="rounded-xl bg-[#F7F7F7] px-4 py-10 text-center text-[13px] text-[#5C5C5C]">{NO_DATA} for this time range.</p>
  const max = Math.max(...vals, threshold?.value ?? 0) * 1.08
  const x = (i: number) => PAD.l + (i / Math.max(1, points.length - 1)) * (W - PAD.l - PAD.r)
  const y = (v: number) => PAD.t + (1 - v / max) * (H - PAD.t - PAD.b)
  const every = Math.max(1, Math.ceil(points.length / 8))
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={ariaLabel}>
        {ticks(max).map((t) => (
          <g key={t}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} stroke="#F0F0F0" />
            <text x={PAD.l - 6} y={y(t) + 3} textAnchor="end" fontSize="10" fill="#9A9A9A">
              {format(t)}
            </text>
          </g>
        ))}
        {points.map((p, i) =>
          i % every === 0 ? (
            <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="10" fill="#9A9A9A">
              {timeLabel(String(p.t), bucketMs)}
            </text>
          ) : null,
        )}
        {threshold && <line x1={PAD.l} x2={W - PAD.r} y1={y(threshold.value)} y2={y(threshold.value)} stroke="#B54708" strokeDasharray="4 3" strokeWidth="1" />}
        {series.map((s) => {
          const segs: string[] = []
          let cur = ''
          points.forEach((p, i) => {
            const v = p[s.key]
            if (typeof v === 'number') cur += `${cur ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`
            else if (cur) {
              segs.push(cur)
              cur = ''
            }
          })
          if (cur) segs.push(cur)
          return (
            <g key={s.key}>
              {segs.map((d, i) => (
                <path key={i} d={d} fill="none" stroke={s.color} strokeWidth="1.8" strokeDasharray={s.dashed ? '4 3' : undefined} />
              ))}
              {points.map((p, i) => (typeof p[s.key] === 'number' ? <circle key={i} cx={x(i)} cy={y(p[s.key] as number)} r="2.2" fill={s.color}><title>{`${timeLabel(String(p.t), bucketMs)} · ${s.label}: ${format(p[s.key] as number)}`}</title></circle> : null))}
            </g>
          )
        })}
      </svg>
      <figcaption className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#5C5C5C]">
        {series.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-1.5">
            <span className="h-0.5 w-4" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
        {threshold && (
          <span className="inline-flex items-center gap-1.5">
            <span className="h-0 w-4 border-t border-dashed border-[#B54708]" />
            {threshold.label}
          </span>
        )}
        <span className="text-[#9A9A9A]">Unit: {unit}</span>
      </figcaption>
    </figure>
  )
}

/** Stacked bar chart for counts (e.g. tokens per bucket). */
export function StackedBars({ points, series, bucketMs, unit, format, ariaLabel }: { points: Point[]; series: Series[]; bucketMs: number; unit: string; format: (v: number) => string; ariaLabel: string }) {
  const totals = points.map((p) => series.reduce((a, s) => a + (Number(p[s.key]) || 0), 0))
  const max = Math.max(...totals) * 1.08
  if (!max) return <p className="rounded-xl bg-[#F7F7F7] px-4 py-10 text-center text-[13px] text-[#5C5C5C]">{NO_DATA} for this time range.</p>
  const bw = (W - PAD.l - PAD.r) / points.length
  const y = (v: number) => PAD.t + (1 - v / max) * (H - PAD.t - PAD.b)
  const every = Math.max(1, Math.ceil(points.length / 8))
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={ariaLabel}>
        {ticks(max).map((t) => (
          <g key={t}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} stroke="#F0F0F0" />
            <text x={PAD.l - 6} y={y(t) + 3} textAnchor="end" fontSize="10" fill="#9A9A9A">
              {format(t)}
            </text>
          </g>
        ))}
        {points.map((p, i) => {
          let acc = 0
          return (
            <g key={i}>
              {series.map((s) => {
                const v = Number(p[s.key]) || 0
                if (!v) return null
                const top = y(acc + v)
                const h = y(acc) - top
                acc += v
                return (
                  <rect key={s.key} x={PAD.l + i * bw + bw * 0.15} width={Math.max(1, bw * 0.7)} y={top} height={h} fill={s.color} rx="1">
                    <title>{`${timeLabel(String(p.t), bucketMs)} · ${s.label}: ${format(v)}`}</title>
                  </rect>
                )
              })}
              {i % every === 0 && (
                <text x={PAD.l + i * bw + bw / 2} y={H - 8} textAnchor="middle" fontSize="10" fill="#9A9A9A">
                  {timeLabel(String(p.t), bucketMs)}
                </text>
              )}
            </g>
          )
        })}
      </svg>
      <figcaption className="mt-2 flex flex-wrap gap-x-4 text-[11px] text-[#5C5C5C]">
        {series.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
        <span className="text-[#9A9A9A]">Unit: {unit}</span>
      </figcaption>
    </figure>
  )
}
