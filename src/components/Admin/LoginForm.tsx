'use client'

import { useState } from 'react'

export default function LoginForm({ next }: { next: string }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [touched, setTouched] = useState(false)
  const userMissing = touched && !username.trim()
  const passMissing = touched && !password

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    setError(null)
    if (!username.trim() || !password) return
    setBusy(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'same-origin',
      })
      if (res.ok) {
        window.location.assign(next)
        return
      }
      const data = (await res.json().catch(() => ({}))) as { error?: { message?: string } }
      setError(data.error?.message ?? 'Sign-in failed. Please try again.')
    } catch {
      setError('Could not reach the server. Check your connection and try again.')
    } finally {
      setPassword('')
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} noValidate className="mt-6 space-y-4" aria-describedby={error ? 'login-error' : undefined}>
      {error && (
        <p id="login-error" role="alert" className="rounded-xl border border-[#F5C2C0] bg-[#FFF5F5] px-3 py-2.5 text-[13px] text-[#9B2C2C]">
          {error}
        </p>
      )}
      <div>
        <label htmlFor="admin-username" className="block text-[13px] font-medium text-[#171717]">
          Username
        </label>
        <input
          id="admin-username"
          name="username"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-invalid={userMissing}
          aria-describedby={userMissing ? 'username-msg' : undefined}
          className={`mt-1.5 w-full rounded-[10px] border bg-[#FAFAFA] px-3.5 py-2.5 text-[15px] text-[#171717] transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#335CFF]/25 ${userMissing ? 'border-[#E5484D]' : 'border-[#EBEBEB] focus:border-[#335CFF]'}`}
        />
        {userMissing && (
          <p id="username-msg" className="mt-1 text-[12px] text-[#B42318]">
            Enter your username.
          </p>
        )}
      </div>
      <div>
        <label htmlFor="admin-password" className="block text-[13px] font-medium text-[#171717]">
          Password
        </label>
        <div className="relative mt-1.5">
          <input
            id="admin-password"
            name="password"
            type={show ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={passMissing}
            aria-describedby={passMissing ? 'password-msg' : undefined}
            className={`w-full rounded-[10px] border bg-[#FAFAFA] py-2.5 pl-3.5 pr-20 text-[15px] text-[#171717] transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#335CFF]/25 ${passMissing ? 'border-[#E5484D]' : 'border-[#EBEBEB] focus:border-[#335CFF]'}`}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-pressed={show}
            aria-controls="admin-password"
            className="absolute inset-y-0 right-1.5 my-1.5 rounded-lg px-2.5 text-[12px] font-medium text-[#335CFF] hover:bg-[#335CFF]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#335CFF]/40"
          >
            {show ? 'Hide' : 'Show'}
          </button>
        </div>
        {passMissing && (
          <p id="password-msg" className="mt-1 text-[12px] text-[#B42318]">
            Enter your password.
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={busy}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-[#335CFF] text-[15px] font-medium text-white transition-colors hover:bg-[#2F55EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#335CFF]/40 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
      >
        {busy && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none" aria-hidden="true" />}
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
