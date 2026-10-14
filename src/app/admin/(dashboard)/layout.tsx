import type { Metadata } from 'next'
import { requireAdminPage } from '@/lib/rag/admin/guard'
import { AdminProvider, Sidebar } from '@/components/Admin/client'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Admin | Steer Health AI Assistant', robots: { index: false, follow: false } }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdminPage()
  return (
    <AdminProvider username={session.username} csrfToken={session.csrfToken}>
      <div className="min-h-screen bg-[#F5F5F5] lg:flex">
        <Sidebar />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </AdminProvider>
  )
}
