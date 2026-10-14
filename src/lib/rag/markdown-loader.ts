/**
 * Discovers and parses knowledge-base Markdown files written by scripts/export-knowledge-base.mts.
 * Frontmatter is the small YAML subset that exporter emits (scalars as JSON strings, string lists).
 */
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { CONTENT_TYPES } from './types.ts'
import type { ContentType, KnowledgeDocument } from './types.ts'

export interface LoadIssue {
  file: string
  reason: string
}

export interface LoadResult {
  documents: KnowledgeDocument[]
  issues: LoadIssue[]
  /** Files found, excluding reports/manifests. */
  filesScanned: number
}

/** Directories (relative to the knowledge base) that contain indexable documents. */
export const KB_DIRECTORIES = ['pages', 'faqs', 'products', 'solutions'] as const

export type Frontmatter = Record<string, string | string[]>

export function parseFrontmatter(raw: string): { data: Frontmatter; body: string } | null {
  const text = raw.replace(/^﻿/, '').replace(/\r\n?/g, '\n')
  if (!text.startsWith('---\n')) return null
  const end = text.indexOf('\n---', 4)
  if (end === -1) return null
  const block = text.slice(4, end)
  const body = text.slice(end + 4).replace(/^\n+/, '')
  const data: Frontmatter = {}
  let listKey: string | null = null
  for (const line of block.split('\n')) {
    if (!line.trim()) continue
    const item = /^\s+-\s+(.*)$/.exec(line)
    if (item && listKey) {
      ;(data[listKey] as string[]).push(parseScalar(item[1]))
      continue
    }
    const kv = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line)
    if (!kv) return null
    const [, key, value] = kv
    if (value === '') {
      data[key] = []
      listKey = key
    } else {
      data[key] = parseScalar(value)
      listKey = null
    }
  }
  return { data, body }
}

function parseScalar(v: string): string {
  const s = v.trim()
  if (s.startsWith('"')) {
    try {
      return String(JSON.parse(s))
    } catch {
      return s.slice(1, -1)
    }
  }
  return s
}

export function hashText(...parts: (string | undefined)[]): string {
  const h = crypto.createHash('sha256')
  for (const p of parts) h.update((p ?? '') + '\u0000')
  return h.digest('hex')
}

const asString = (v: string | string[] | undefined) => (typeof v === 'string' && v.trim() ? v.trim() : undefined)

/** Only allow site-relative paths or http(s) URLs from frontmatter; never invent one. */
export function safeUrl(v: string | undefined): string | undefined {
  if (!v) return undefined
  if (/^\/(?!\/)[^\s]*$/.test(v)) return v
  if (/^https?:\/\/[^\s]+$/i.test(v)) return v
  return undefined
}

export function toDocument(sourceFile: string, raw: string): KnowledgeDocument | LoadIssue {
  const parsed = parseFrontmatter(raw)
  if (!parsed) return { file: sourceFile, reason: 'missing or malformed frontmatter' }
  const { data, body } = parsed
  const id = asString(data.sanity_id)
  const title = asString(data.title)
  const contentType = asString(data.content_type) as ContentType | undefined
  if (!id) return { file: sourceFile, reason: 'frontmatter has no sanity_id' }
  if (!title) return { file: sourceFile, reason: 'frontmatter has no title' }
  if (!contentType || !CONTENT_TYPES.includes(contentType)) {
    return { file: sourceFile, reason: `unsupported content_type "${contentType ?? ''}"` }
  }
  if (/[^\x20-\x7E]/.test(id) || id.includes('#')) return { file: sourceFile, reason: 'sanity_id is not a valid vector ID prefix' }
  const text = body.trim()
  if (text.replace(/^#.*$/gm, '').trim().length === 0) return { file: sourceFile, reason: 'document has no body text' }
  const url = safeUrl(asString(data.url))
  return {
    id,
    title,
    contentType,
    slug: asString(data.slug),
    url,
    description: asString(data.description),
    updatedAt: asString(data.updated_at),
    dataset: asString(data.dataset),
    sourceFile,
    body: text,
    hash: hashText(id, title, contentType, url, text),
  }
}

/** Load every document from the four content directories. Unreadable/malformed files are reported, not thrown. */
export async function loadKnowledgeBase(kbDir: string): Promise<LoadResult> {
  const documents: KnowledgeDocument[] = []
  const issues: LoadIssue[] = []
  let filesScanned = 0
  const seen = new Map<string, string>()
  for (const dir of KB_DIRECTORIES) {
    const files = await listMarkdown(path.join(kbDir, dir)).catch((e: NodeJS.ErrnoException) => {
      if (e.code === 'ENOENT') {
        issues.push({ file: `${dir}/`, reason: 'directory not found' })
        return [] as string[]
      }
      throw e
    })
    for (const abs of files.sort()) {
      filesScanned++
      const rel = path.relative(kbDir, abs).split(path.sep).join('/')
      let raw: string
      try {
        raw = await fs.readFile(abs, 'utf8')
      } catch (e) {
        issues.push({ file: rel, reason: `unreadable: ${(e as Error).message}` })
        continue
      }
      const doc = toDocument(rel, raw)
      if ('reason' in doc) {
        issues.push(doc)
        continue
      }
      const prev = seen.get(doc.id)
      if (prev) {
        issues.push({ file: rel, reason: `duplicate sanity_id ${doc.id} (also in ${prev}); skipped` })
        continue
      }
      seen.set(doc.id, rel)
      documents.push(doc)
    }
  }
  return { documents, issues, filesScanned }
}

async function listMarkdown(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const out: string[] = []
  for (const e of entries) {
    const abs = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await listMarkdown(abs)))
    else if (e.isFile() && e.name.endsWith('.md')) out.push(abs)
  }
  return out
}
