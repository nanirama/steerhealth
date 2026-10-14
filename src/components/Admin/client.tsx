'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createContext, useContext, useEffect, useState, useTransition } from 'react'

// ---------- session context (CSRF token for state-changing requests) -------------------------

const AdminCtx = createContext<{ username: string; csrfToken: string } | null>(null)

export function AdminProvider({ username, csrfToken, children }: { username: string; csrfToken: string; children: React.ReactNode }) {
  return <AdminCtx.Provider value={{ username, csrfToken }}>{children}</AdminCtx.Provider>
}

function useAdmin() {
  const v = useContext(AdminCtx)
  if (!v) throw new Error('AdminProvider missing')
  return v
}

async function adminPost(url: string, csrfToken: string, body: unknown) {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrfToken }, body: JSON.stringify(body ?? {}), credentials: 'same-origin' })
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown> & { error?: { message?: string } }
  if (!res.ok) throw new Error(data.error?.message ?? `Request failed (${res.status})`)
  return data
}

// ---------- navigation ---------------------------------------------------------------------------

const NAV = [
  { href: '/admin', label: 'Overview', icon: 'M3 12l2-2 4 4 8-8 4 4' },
  { href: '/admin/conversations', label: 'Conversations', icon: 'M4 5h16v10H8l-4 4V5z' },
  { href: '/admin/logs', label: 'Logs', icon: 'M5 6h14M5 12h14M5 18h9' },
  { href: '/admin/evaluations', label: 'Evaluations', icon: 'M5 13l4 4L19 7' },
  { href: '/admin/knowledge-base', label: 'Knowledge base', icon: 'M4 5a2 2 0 012-2h12v18H6a2 2 0 01-2-2V5zm4 0v14' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { username } = useAdmin()
  const [open, setOpen] = useState(false)
  const isActive = (href: string) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href))
  return (
    <>
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[#EBEBEB] bg-white px-4 py-3 lg:hidden">
        <span className="font3 text-[15px] font-semibold text-[#171717]">Steer Health · Admin</span>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="admin-nav" className="rounded-lg border border-[#EBEBEB] px-3 py-1.5 text-[13px] font-medium">
          Menu
        </button>
      </div>
      <aside id="admin-nav" className={`${open ? 'block' : 'hidden'} border-b border-[#EBEBEB] bg-white lg:sticky lg:top-0 lg:block lg:h-screen lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r`}>
        <div className="hidden px-5 pb-4 pt-6 lg:block">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#335CFF]">Steer Health</p>
          <p className="font3 mt-1 text-[17px] font-semibold text-[#171717]">AI Assistant Admin</p>
        </div>
        <nav aria-label="Admin" className="px-3 py-2">
          <ul className="space-y-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(n.href) ? 'page' : undefined}
                  className={`flex items-center gap-3 rounded-[10px] px-3 py-2 text-[14px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#335CFF]/40 ${isActive(n.href) ? 'bg-[#335CFF]/10 text-[#335CFF]' : 'text-[#3D3D3D] hover:bg-[#F5F5F5]'}`}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={n.icon} />
                  </svg>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-[#F0F0F0] px-5 py-4 lg:absolute lg:bottom-0 lg:w-60">
          <p className="text-[12px] text-[#818181]">Signed in as</p>
          <p className="text-[13px] font-medium text-[#171717]">{username}</p>
          <div className="mt-2 flex items-center gap-3">
            <LogoutButton />
            <Link href="/ai-assistant" className="text-[12px] font-medium text-[#5C5C5C] hover:text-[#171717]">
              Open assistant ↗
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}

export function LogoutButton() {
  const { csrfToken } = useAdmin()
  const [busy, setBusy] = useState(false)
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true)
        try {
          await adminPost('/api/admin/logout', csrfToken, {})
        } finally {
          window.location.assign('/admin/login')
        }
      }}
      className="text-[12px] font-medium text-[#B42318] hover:underline disabled:opacity-50"
    >
      {busy ? 'Signing out…' : 'Sign out'}
    </button>
  )
}

// ---------- time range filter ---------------------------------------------------------------------

const RANGE_OPTIONS = [
  ['15m', 'Last 15 min'],
  ['1h', 'Last hour'],
  ['24h', 'Last 24 h'],
  ['7d', 'Last 7 days'],
  ['30d', 'Last 30 days'],
  ['custom', 'Custom'],
] as const

export function RangeFilter({ current, from, to }: { current: string; from?: string; to?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [custom, setCustom] = useState(current === 'custom')
  const [f, setF] = useState(from ?? '')
  const [t, setT] = useState(to ?? '')
  const [pending, start] = useTransition()
  const go = (next: Record<string, string | undefined>) => {
    const p = new URLSearchParams(params.toString())
    for (const [k, v] of Object.entries(next)) {
      if (v) p.set(k, v)
      else p.delete(k)
    }
    start(() => router.push(`${pathname}?${p.toString()}`))
  }
  return (
    <div className="flex flex-wrap items-center gap-2" aria-busy={pending}>
      <div role="group" aria-label="Time range" className="flex flex-wrap gap-1 rounded-full border border-[#EBEBEB] bg-white p-1">
        {RANGE_OPTIONS.map(([k, label]) => (
          <button
            key={k}
            type="button"
            aria-pressed={k === 'custom' ? custom : current === k && !custom}
            onClick={() => {
              if (k === 'custom') return setCustom(true)
              setCustom(false)
              go({ range: k, from: undefined, to: undefined })
            }}
            className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${(k === 'custom' ? custom : current === k && !custom) ? 'bg-[#171717] text-white' : 'text-[#5C5C5C] hover:text-[#171717]'}`}
          >
            {label}
          </button>
        ))}
      </div>
      {custom && (
        <form
          className="flex flex-wrap items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            if (f && t) go({ range: 'custom', from: f, to: t })
          }}
        >
          <label className="text-[12px] text-[#5C5C5C]">
            From <input type="date" value={f} onChange={(e) => setF(e.target.value)} required className="ml-1 rounded-lg border border-[#EBEBEB] px-2 py-1 text-[12px]" />
          </label>
          <label className="text-[12px] text-[#5C5C5C]">
            To <input type="date" value={t} onChange={(e) => setT(e.target.value)} required className="ml-1 rounded-lg border border-[#EBEBEB] px-2 py-1 text-[12px]" />
          </label>
          <button type="submit" className="rounded-lg bg-[#335CFF] px-3 py-1.5 text-[12px] font-medium text-white hover:bg-[#2F55EB]">
            Apply
          </button>
        </form>
      )}
      {pending && <span className="text-[12px] text-[#818181]">Loading…</span>}
    </div>
  )
}

// ---------- protected actions ---------------------------------------------------------------------

export function ActionButton({ url, body, label, busyLabel, confirmText, variant = 'primary', disabled }: { url: string; body?: unknown; label: string; busyLabel?: string; confirmText?: string; variant?: 'primary' | 'secondary'; disabled?: boolean }) {
  const { csrfToken } = useAdmin()
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        disabled={busy || disabled}
        onClick={async () => {
          if (confirmText && !window.confirm(confirmText)) return
          setBusy(true)
          setMsg(null)
          try {
            const r = await adminPost(url, csrfToken, body)
            const run = r.run as { documents?: Record<string, number>; status?: string; error?: string } | undefined
            setMsg({
              ok: true,
              text: run?.documents
                ? `Preview: +${run.documents.added} added · ~${run.documents.modified} modified · =${run.documents.unchanged} unchanged · -${run.documents.removed} removed${run.error ? ` (${run.error})` : ''}`
                : 'Started. This page refreshes automatically.',
            })
            router.refresh()
          } catch (e) {
            setMsg({ ok: false, text: (e as Error).message })
          } finally {
            setBusy(false)
          }
        }}
        className={`inline-flex items-center gap-2 rounded-[8px] px-3.5 py-2 text-[13px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${variant === 'primary' ? 'bg-[#335CFF] text-white hover:bg-[#2F55EB]' : 'border border-[#335CFF] text-[#171717] hover:bg-[#2F55EB] hover:text-white'}`}
      >
        {busy ? (busyLabel ?? 'Working…') : label}
      </button>
      {msg && (
        <span role={msg.ok ? 'status' : 'alert'} className={`text-[12px] ${msg.ok ? 'text-[#0F7A52]' : 'text-[#B42318]'}`}>
          {msg.text}
        </span>
      )}
    </span>
  )
}

/** Re-render the server component periodically (e.g. while an ingestion/evaluation runs). */
export function AutoRefresh({ everyMs, active }: { everyMs: number; active: boolean }) {
  const router = useRouter()
  useEffect(() => {
    if (!active) return
    const t = setInterval(() => router.refresh(), everyMs)
    return () => clearInterval(t)
  }, [active, everyMs, router])
  return null
}
