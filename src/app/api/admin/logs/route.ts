import { logsHandler } from '@/lib/rag/admin/handlers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const GET = (req: Request) => logsHandler(req)
