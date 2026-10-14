import { conversationHandler } from '@/lib/rag/admin/handlers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return conversationHandler(req, (await params).id)
}
