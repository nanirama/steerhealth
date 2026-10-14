import { traceHandler } from '@/lib/rag/admin/handlers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request, { params }: { params: Promise<{ traceId: string }> }) {
  return traceHandler(req, (await params).traceId)
}
