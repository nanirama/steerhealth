import { getHealth } from '@/lib/rag/health'
import { json } from '@/lib/rag/http'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Public, cached (30 s) dependency status. Exposes status codes only, never error details. */
export async function GET() {
  const report = await getHealth()
  return json(report, report.status === 'down' ? 503 : 200)
}
