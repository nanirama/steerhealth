import { logoutHandler } from '@/lib/rag/admin/handlers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const POST = (req: Request) => logoutHandler(req)
