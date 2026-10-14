import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { currentAdmin } from '@/lib/rag/admin/guard'
import { safeNext } from '@/lib/rag/admin/paths'
import LoginForm from '@/components/Admin/LoginForm'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Admin Login | Steer Health', robots: { index: false, follow: false } }

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNext((await searchParams).next)
  if (await currentAdmin()) redirect(next)
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient2 px-4 py-12">
      <div className="w-full max-w-[420px]">
        <div className="mb-6 flex justify-center">
          <Image src="/images/logo.webp" alt="Steer Health" width={161} height={32} priority className="h-8 w-auto" />
        </div>
        <div className="rounded-[24px] border border-[#EBEBEB] bg-white p-7 shadow-[0_10px_40px_-20px_rgba(0,48,166,0.25)] sm:p-8">
          <h1 className="font3 text-[24px] font-semibold tracking-tight text-[#171717]">Admin Login</h1>
          <p className="mt-1 text-[14px] text-[#5C5C5C]">Sign in to monitor the Steer Health AI Assistant.</p>
          <LoginForm next={next} />
        </div>
        <p className="mt-6 text-center text-[12px] text-[#818181]">Restricted area. Access attempts are logged.</p>
      </div>
    </main>
  )
}
