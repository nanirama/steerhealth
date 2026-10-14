import { knowledgeBaseHandler } from '@/lib/rag/admin/handlers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const GET = (req: Request) => knowledgeBaseHandler(req)
export const POST = (req: Request) => knowledgeBaseHandler(req)
