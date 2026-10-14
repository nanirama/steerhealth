/** Server-side session enforcement for admin pages (runs in every admin layout/page render). */
import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { findSessionToken, validateSession } from './auth.ts'
import type { AdminSession } from './auth.ts'

export async function currentAdmin(): Promise<AdminSession | null> {
  const jar = await cookies()
  return validateSession(findSessionToken((n) => jar.get(n)?.value))
}

export async function requireAdminPage(): Promise<AdminSession> {
  const session = await currentAdmin()
  if (!session) redirect('/admin/login')
  return session
}
