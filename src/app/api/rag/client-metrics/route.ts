import { clientMetricsHandler } from '@/lib/rag/client-metrics'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const POST = (req: Request) => clientMetricsHandler(req)
