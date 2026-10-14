import { loginHandler } from '@/lib/rag/admin/handlers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const POST = (req: Request) => loginHandler(req)
