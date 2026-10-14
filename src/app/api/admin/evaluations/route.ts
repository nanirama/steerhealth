import { evaluationsHandler } from '@/lib/rag/admin/handlers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const GET = (req: Request) => evaluationsHandler(req)
export const POST = (req: Request) => evaluationsHandler(req)
