'use client'

import { useEffect, useState } from 'react'
import ChatPanel from './ChatPanel'
import { fmtInt, fmtTime } from './format'

interface Health {
  status: 'ok' | 'degraded' | 'down'
  knowledgeBase: { documents: number | null; indexedVectors: number | null; lastSuccessfulIngestion: string | null }
}

function StatusPill() {
  const [health, setHealth] = useState<Health | null>(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    fetch('/api/rag/health', { cache: 'no-store' })
      .then((r) => r.json() as Promise<Health>)
      .then(setHealth)
      .catch(() => setFailed(true))
  }, [])
  const color = failed || health?.status === 'down' ? 'bg-[#C53030]' : health?.status === 'degraded' ? 'bg-[#DD8A2B]' : health ? 'bg-[#00B9B7]' : 'bg-[#BDBDBD]'
  const label = failed
    ? 'Status unavailable'
    : !health
      ? 'Checking knowledge base…'
      : health.status === 'down'
        ? 'Assistant offline'
        : `${fmtInt(health.knowledgeBase.documents)} documents · ${health.knowledgeBase.indexedVectors !== null ? `${fmtInt(health.knowledgeBase.indexedVectors)} chunks indexed` : 'index unavailable'}${health.knowledgeBase.lastSuccessfulIngestion ? ` · synced ${fmtTime(health.knowledgeBase.lastSuccessfulIngestion)}` : ''}`
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#EBEBEB] bg-white px-3 py-1.5 text-[12px] text-[#5C5C5C]" role="status">
      <span className={`h-2 w-2 rounded-full ${color}`} aria-hidden="true" />
      {label}
    </span>
  )
}

/** Public assistant workspace. Monitoring lives in the authenticated /admin dashboard. */
export default function RagWorkspace() {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StatusPill />
      </div>
      <ChatPanel />
    </div>
  )
}
