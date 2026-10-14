/**
 * Export published Sanity content to Markdown for a future RAG knowledge base.
 *
 * Usage:  npm run export:kb        (or: node scripts/export-knowledge-base.mts)
 *
 * - Read-only: only GROQ fetches, never mutations.
 * - Uses the same env vars as the website (NEXT_PUBLIC_SANITY_PROJECT_ID / _DATASET,
 *   SANITY_API_READ_TOKEN) loaded through @next/env, so the active dataset is respected.
 * - Writes to ./knowledge-base, removes files it generated on a previous run that are no
 *   longer produced, and writes manifest.json + EXPORT_REPORT.md.
 * - Requires Node >= 22.18 (native TypeScript type stripping). On 22.6-22.17 run with
 *   `node --experimental-strip-types`.
 */
import fs from 'node:fs'
import path from 'node:path'
import nextEnv from '@next/env'
import { createClient } from 'next-sanity'

type Json = any
type Doc = Record<string, Json> & { _id: string; _type: string }

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, 'knowledge-base')
const MANIFEST = path.join(OUT_DIR, 'manifest.json')
const REPORT = path.join(OUT_DIR, 'EXPORT_REPORT.md')

nextEnv.loadEnvConfig(ROOT, false, { info: () => null, error: console.error })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim()
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim()
const token = process.env.SANITY_API_READ_TOKEN?.trim()
if (!projectId || !dataset) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-21',
  useCdn: false,
  perspective: 'published',
  token,
})

// ---------------------------------------------------------------------------
// Content model configuration
// ---------------------------------------------------------------------------

interface TypeConfig {
  dir: string
  label: string
  url?: (doc: Doc, byId: Map<string, Doc>) => string | undefined
  title?: (doc: Doc) => string | undefined
  slug?: (doc: Doc) => string | undefined
}

const slugOf = (d: Doc) => d.slug?.current as string | undefined

/** Exported document types -> output directory and public URL (mirrors src/app routes). */
const TYPES: Record<string, TypeConfig> = {
  page: { dir: 'pages', label: 'Page', url: (d) => (slugOf(d) ? `/${slugOf(d)}` : undefined) },
  solutions: { dir: 'solutions', label: 'Solution', url: (d) => (slugOf(d) ? `/who-we-serve/${slugOf(d)}` : undefined) },
  products: { dir: 'products', label: 'Product', url: (d) => (slugOf(d) ? `/products/${slugOf(d)}` : undefined) },
  faqs: { dir: 'faqs', label: 'FAQ', title: (d) => d.question },
}

/** Document types intentionally not exported as files, with the reason recorded in the report. */
const OUT_OF_SCOPE = 'Out of scope (export limited to pages, solutions, products, FAQs)'
const NOT_EXPORTED: Record<string, string> = {
  ...Object.fromEntries(
    [
      'home', 'p2p', 'steernotes', 'steernotespricing', 'elevateHome', 'landingPages', 'platforms',
      'elevateSolutions', 'elevateProducts', 'integrations', 'casestudies', 'post', 'elevatePost', 'events',
      'testimonials', 'elevateTestimonials', 'teamMember', 'author',
    ].map((t) => [t, OUT_OF_SCOPE]),
  ),
  settings: 'Site configuration (top banner toggle/link), not knowledge content',
  faqCategory: 'Taxonomy; used as `categories` metadata on FAQs',
  blogCategory: 'Taxonomy (blog)',
  eventCategory: 'Taxonomy (events)',
  platformCategory: 'Taxonomy (platform pages)',
  tags: 'Taxonomy (blog)',
  solutionPage: 'Legacy type: present in dataset but not in the Studio schema or any website route',
  solutionCategory: 'Legacy type: present in dataset but not in the Studio schema or any website route',
  solutionParent: 'Legacy type: present in dataset but not in the Studio schema or any website route',
  a4mlandingpage: 'Legacy type: present in dataset but not in the Studio schema or any website route',
}

/** Shared documents that have their own canonical file; referencing docs only link to them. */
const CANONICAL_REF_TYPES = new Set(['faqs'])

/** Field keys that hold presentation, media, configuration or tracking data (never exported). */
const SKIP_KEYS = new Set([
  'seo', 'slug', 'orderBy', 'Order',
  'buttonStyle', 'linkType', 'internalLink', 'externalLink', 'hubspotFormId', 'formSettings',
  'imageUrl', 'imageUrlMobile', 'mobileImageUrl', 'videoUrl', 'videoLink', 'clientLogos',
  'imagePosition', 'videoPosition', 'contentAlign', 'type', 'trend',
  'enabled', 'showAtTop', 'showHeaderForm', 'isLandingPage', 'enableTopbanner',
  'pageSchemaJson', 'globalPageSchemaJson', 'alt',
  'linkedinUrl', 'xUrl', 'link', 'buttonLink', 'registrationLink',
  'textColor', 'color', 'bgColor', 'backgroundColor',
  // Generic UI strings repeated on many pages (form/CTA chrome, not knowledge).
  'stillHaveQuestionHeading', 'stillHaveQuestionSubHeading', 'preferToTalk', 'reachOutUsLabel',
  'generalEnquiryHeading', 'joinAndGrowLabel', 'registrationLinkText',
])

/** Object types that are purely presentational (no knowledge text). */
const SKIP_OBJECT_TYPES = new Set([
  'image', 'file', 'button', 'divider', 'textColor', 'slug', 'seo', 'clientLogoItem', 'LogoItem',
])

/** Section types that only render UI (logos, calculators) or are out of scope (testimonials). */
const SKIP_SECTION_TYPES = new Set([
  'clientLogos', 'clientLogosSlider', 'p2pHdrLogosSection', 'roiCalculator',
  'testimonialsSection', 'fmTestimonials', 'elevateTestimonialsSection', 'hospitalTestimonials', 'steerNotesTestimonials',
])

/** Keys rendered as the heading/title of an object, in priority order. */
const TITLE_KEYS = ['heading', 'title', 'headline', 'question', 'name', 'clientname', 'tabLabel', 'iconLabel', 'steerLabel', 'displayTitle', 'ctaHeading', 'statLabel']
/** Short eyebrow/kicker text shown before a heading. */
const KICKER_KEYS = ['kickerText', 'tagline', 'tagLine', 'tabline', 'badgeText']
/** Attribution-style fields appended to a title line. */
const ATTRIBUTION_KEYS = ['role', 'jobTitle', 'jobtitle', 'jotTitle', 'clientJobTitle', 'authorTitle', 'department', 'company', 'year']
/** Body text keys, rendered in this order before any remaining fields. */
const BODY_KEYS = ['lastRevised', 'subheading', 'subHeading', 'subtitle', 'subtext', 'subText', 'ctaSubHeading', 'shortDescription', 'shortdescription', 'description', 'content', 'text', 'quote', 'statNote', 'about']

/** Readable fallback headings for sections that have no heading text of their own. */
const SECTION_FALLBACK_TITLES: Record<string, string> = {
  solutionsStats: 'Key Statistics', homeStats: 'Key Statistics', fmStats: 'Key Statistics', elevateStats: 'Key Statistics', steerNotesStats: 'Key Statistics',
  testimonialsSection: 'Testimonials', fmTestimonials: 'Testimonials', elevateTestimonialsSection: 'Testimonials', hospitalTestimonials: 'Testimonials', steerNotesTestimonials: 'Testimonials',
  faqSection: 'Frequently Asked Questions', faqPageSection: 'Frequently Asked Questions',
  leadershipSection: 'Leadership', ourTeamSection: 'Our Team', blogSection: 'Related Articles',
  contactSection: 'Contact', companyTimelineSection: 'Company Timeline',
}

// ---------------------------------------------------------------------------
// Export state used for validation / reporting
// ---------------------------------------------------------------------------

const unsupported = new Map<string, number>() // `${context}` -> count
const brokenRefs: string[] = []
const noteUnsupported = (what: string) => unsupported.set(what, (unsupported.get(what) ?? 0) + 1)

// ---------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------

const clean = (s: string) =>
  s
    .replace(/\r\n?/g, '\n')
    .replace(/[​-‍﻿]/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()

const oneLine = (s: string) => clean(s).replace(/\s*\n+\s*/g, ' ')

const isBlockArray = (v: Json): boolean =>
  Array.isArray(v) && v.length > 0 && v.some((x) => x?._type === 'block')

const isUrlLike = (s: string) => /^(https?:)?\/\//i.test(s) || /\.(webp|png|jpe?g|svg|gif|webm|mp4|pdf)$/i.test(s)

const slugify = (s: string) =>
  s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[’'"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '')

const yamlStr = (s: string) => JSON.stringify(s)

// ---------------------------------------------------------------------------
// Portable Text -> Markdown
// ---------------------------------------------------------------------------

function renderSpans(block: Json): string {
  const defs = new Map<string, Json>((block.markDefs ?? []).map((m: Json) => [m._key, m]))
  let out = ''
  for (const child of block.children ?? []) {
    if (child._type !== 'span') {
      noteUnsupported(`inline object "${child._type}"`)
      continue
    }
    let text: string = child.text ?? ''
    if (!text.trim()) {
      out += text
      continue
    }
    // Keep surrounding whitespace outside the markers so `** bold**` never happens.
    const lead = text.match(/^\s*/)?.[0] ?? ''
    const trail = text.match(/\s*$/)?.[0] ?? ''
    text = text.trim()
    for (const mark of child.marks ?? []) {
      if (mark === 'strong') text = `**${text}**`
      else if (mark === 'em') text = `*${text}*`
      else if (mark === 'code') text = `\`${text}\``
      else if (mark === 'strike-through') text = `~~${text}~~`
      else if (mark === 'underline') continue
      else if (defs.has(mark)) {
        const def = defs.get(mark)
        const href = def.href ?? def.url
        if (def._type === 'link' && typeof href === 'string' && href && !isUrlLike(href.replace(/^https?:\/\/[^/]+/, '')) ) {
          text = `[${text}](${href})`
        } else if (def._type === 'link' && typeof href === 'string' && href) {
          text = `[${text}](${href})`
        } else if (def._type !== 'link' && def._type !== 'textColor') {
          noteUnsupported(`mark annotation "${def._type}"`)
        }
      } else if (!['textColor'].includes(mark)) {
        // Unknown decorator or color mark: keep the text, drop the mark.
      }
    }
    out += lead + text + trail
  }
  return out.replace(/\n/g, '  \n')
}

/** Flatten Portable Text to plain inline text (used for titles/labels). */
function ptToInline(blocks: Json[]): string {
  return oneLine(
    blocks
      .filter((b) => b?._type === 'block')
      .map((b) => (b.children ?? []).map((c: Json) => c.text ?? '').join(''))
      .filter((t: string) => t.trim())
      .join(' '),
  )
}

function renderTable(table: Json): string {
  const rows: string[][] = (table.rows ?? []).map((r: Json) =>
    (r.cells ?? []).map((c: Json) => oneLine(String(c ?? '')).replace(/\|/g, '\\|')),
  )
  if (!rows.length) return ''
  const width = Math.max(...rows.map((r) => r.length))
  const pad = (r: string[]) => [...r, ...Array(width - r.length).fill('')]
  const [head, ...body] = rows.map(pad)
  return [
    `| ${head.join(' | ')} |`,
    `| ${head.map(() => '---').join(' | ')} |`,
    ...body.map((r) => `| ${r.join(' | ')} |`),
  ].join('\n')
}

/** Convert a Portable Text array to Markdown. Headings are shifted below `baseLevel`. */
function ptToMarkdown(blocks: Json[], baseLevel: number, ctx: RenderCtx): string {
  const out: string[] = []
  let listBuf: string[] = []
  const counters: number[] = []
  const flushList = () => {
    if (listBuf.length) out.push(listBuf.join('\n'))
    listBuf = []
    counters.length = 0
  }
  for (const b of blocks) {
    if (!b) continue
    if (b._type === 'block') {
      const text = clean(renderSpans(b))
      if (!text) continue
      if (b.listItem) {
        const level = Math.max(1, b.level ?? 1)
        counters.length = level
        counters[level - 1] = (counters[level - 1] ?? 0) + 1
        const marker = b.listItem === 'number' ? `${counters[level - 1]}.` : '-'
        listBuf.push(`${'  '.repeat(level - 1)}${marker} ${text}`)
        continue
      }
      flushList()
      const style: string = b.style ?? 'normal'
      const h = /^h([1-6])$/.exec(style)
      if (h) {
        const level = Math.min(6, Math.max(Number(h[1]), baseLevel + 1))
        out.push(`${'#'.repeat(level)} ${oneLine(text.replace(/\*\*/g, ''))}`)
      } else if (style === 'blockquote') {
        out.push(text.split('\n').map((l) => `> ${l}`).join('\n'))
      } else {
        out.push(text)
      }
      continue
    }
    flushList()
    if (b._type === 'table') {
      const t = renderTable(b)
      if (t) out.push(t)
    } else if (b._type === 'image') {
      // Images are never exported; keep a meaningful caption as text if one exists.
      if (typeof b.caption === 'string' && b.caption.trim()) out.push(`*${oneLine(b.caption)}*`)
    } else if (SKIP_OBJECT_TYPES.has(b._type)) {
      continue
    } else {
      const md = renderValue(b, baseLevel + 1, ctx)
      if (md) out.push(md)
      else noteUnsupported(`empty/unsupported block object "${b._type}"`)
    }
  }
  flushList()
  return out.join('\n\n')
}

// ---------------------------------------------------------------------------
// Generic object -> Markdown
// ---------------------------------------------------------------------------

interface RenderCtx {
  doc: Doc
  byId: Map<string, Doc>
  paths: Map<string, string> // _id -> knowledge-base relative path
  refs: Set<string> // referenced doc ids (for frontmatter / back-references)
}

/** Text value of a field: string, number, or Portable Text flattened. */
function textOf(v: Json): string | undefined {
  if (typeof v === 'string') return v.trim() && !isUrlLike(v.trim()) ? clean(v) : undefined
  if (typeof v === 'number') return String(v)
  if (isBlockArray(v)) return ptToInline(v) || undefined
  return undefined
}

function linkTo(target: Doc, ctx: RenderCtx): string {
  const cfg = TYPES[target._type]
  const title = oneLine(String(cfg?.title?.(target) ?? target.title ?? target.name ?? target.question ?? target._id))
  const file = ctx.paths.get(target._id)
  return file ? `[${title}](${relLink(ctx.paths.get(ctx.doc._id)!, file)})` : title
}

const relLink = (from: string, to: string) => path.posix.relative(path.posix.dirname(from), to) || path.posix.basename(to)

/** Render a resolved reference. Shared docs are linked, not inlined, to avoid duplication. */
function renderRef(ref: Json, level: number, ctx: RenderCtx): string {
  const target = ctx.byId.get(ref._ref)
  if (!target) {
    brokenRefs.push(`${ctx.doc._type}/${ctx.doc._id} -> ${ref._ref}`)
    return ''
  }
  ctx.refs.add(target._id)
  if (target._type === 'faqs') return `- ${linkTo(target, ctx)}`
  // Testimonials are out of scope for this knowledge base.
  if (target._type === 'testimonials' || target._type === 'elevateTestimonials') return ''
  if (target._type === 'teamMember') {
    return `- ${linkTo(target, ctx)}${target.jobTitle ? ` — ${oneLine(target.jobTitle)}` : ''}`
  }
  return `- ${linkTo(target, ctx)}`
}

/** Detect stat-like objects (value + label) and render them as one line. */
function statLine(o: Json): string | undefined {
  const valueKeys = ['value', 'statValue', 'highlight', 'percentage', 'bookingsPercentage']
  const labelKeys = ['label', 'statLabel', 'bookingsLabel', 'title', 'description', 'text', 'subtitle']
  for (const vk of valueKeys) {
    const v = o[vk]
    if (!(typeof v === 'number' || (typeof v === 'string' && v.trim() && v.trim().length <= 15))) continue
    const lk = labelKeys.find((k) => textOf(o[k]))
    const l = lk ? textOf(o[lk]) : undefined
    if (lk && l && !l.includes('\n\n')) {
      const prefix = typeof o.prefix === 'string' ? o.prefix : ''
      const suffix = typeof o.suffix === 'string' ? o.suffix : typeof o.suffice === 'string' ? o.suffice : vk.includes('ercentage') ? '%' : ''
      const extras = Object.keys(o).filter(
        (k) => !k.startsWith('_') && ![vk, lk, 'prefix', 'suffix', 'suffice'].includes(k) && !SKIP_KEYS.has(k) && textOf(o[k]),
      )
      const tail = extras.map((k) => oneLine(textOf(o[k])!)).join(' — ')
      return `- **${prefix}${String(v).trim()}${suffix}** ${oneLine(l)}${tail ? ` — ${tail}` : ''}`
    }
  }
  return undefined
}

/** Render any value (object / array / scalar) as Markdown at a given heading level. */
function renderValue(v: Json, level: number, ctx: RenderCtx, key?: string): string {
  if (v == null) return ''
  if (typeof v === 'string' || typeof v === 'number') {
    const t = textOf(v)
    return t ?? ''
  }
  if (typeof v === 'boolean') return ''
  if (Array.isArray(v)) {
    if (isBlockArray(v)) return ptToMarkdown(v, level - 1, ctx)
    if (v.every((x) => typeof x === 'string')) {
      const items = v.map((x) => textOf(x)).filter(Boolean)
      return items.map((x) => `- ${x}`).join('\n')
    }
    const parts: string[] = []
    let bullets: string[] = []
    const flush = () => {
      if (bullets.length) parts.push(bullets.join('\n'))
      bullets = []
    }
    for (const item of v) {
      if (item?._type === 'reference' || item?._ref) {
        const r = renderRef(item, level, ctx)
        if (r) bullets.push(r)
        continue
      }
      const md = renderObject(item, level, ctx, true)
      if (!md) continue
      if (md.startsWith('- ') && !md.includes('\n\n')) bullets.push(md)
      else {
        flush()
        parts.push(md)
      }
    }
    flush()
    return parts.join('\n\n')
  }
  if (typeof v === 'object') {
    if (v._type === 'reference' || v._ref) return renderRef(v, level, ctx)
    return renderObject(v, level, ctx, false, key)
  }
  return ''
}

/**
 * Render an object. Title-like field becomes a heading (or bold bullet for compact items),
 * then body fields, then any remaining fields in key order.
 */
function renderObject(o: Json, level: number, ctx: RenderCtx, inList: boolean, key?: string): string {
  if (!o || typeof o !== 'object') return renderValue(o, level, ctx)
  if (SKIP_OBJECT_TYPES.has(o._type)) {
    if (o._type === 'image' && typeof o.caption === 'string' && o.caption.trim()) return `*${oneLine(o.caption)}*`
    return ''
  }
  if (o._type === 'table') return renderTable(o)

  const stat = statLine(o)
  if (stat) return stat

  const used = new Set<string>()
  // "Your challenge vs. Steer advantage" comparison rows -> two-column table.
  let comparison = ''
  if (Array.isArray(o.comparisonTable) && o.comparisonTable.length) {
    for (const k of ['comparisonTable', 'compareFeature', 'otherLabel', 'steerLabel']) used.add(k)
    comparison = renderTable({
      rows: [
        { cells: [textOf(o.otherLabel) ?? 'Challenge', textOf(o.steerLabel) ?? 'Steer Health'] },
        ...o.comparisonTable.map((r: Json) => ({
          cells: [r.othersAvailable, r.steerAvailable].map((c) => (isBlockArray(c) ? oneLine(clean(c.map(renderSpans).join(' '))) : textOf(c) ?? '')),
        })),
      ],
    })
  }
  // Paired fields such as missionTitle + missionDescription -> one subsection each.
  const pairs: string[] = []
  for (const k of Object.keys(o).sort()) {
    const m = /^(.+)Title$/.exec(k)
    const descKey = m && [`${m[1]}Description`, `${m[1]}Text`].find((d) => o[d] != null)
    if (!m || !descKey || !textOf(o[k])) continue
    used.add(k).add(descKey)
    const desc = renderValue(o[descKey], level + 2, ctx, descKey)
    pairs.push(`${'#'.repeat(Math.min(6, level + 1))} ${oneLine(textOf(o[k])!)}${desc ? `\n\n${desc}` : ''}`)
  }
  const titleKey = TITLE_KEYS.find((k) => !used.has(k) && textOf(o[k]))
  const title = titleKey ? oneLine(textOf(o[titleKey])!) : undefined
  if (titleKey) used.add(titleKey)

  const kickers = KICKER_KEYS.filter((k) => textOf(o[k])).map((k) => (used.add(k), oneLine(textOf(o[k])!)))
  const attribution = ATTRIBUTION_KEYS.filter((k) => textOf(o[k])).map((k) => (used.add(k), oneLine(textOf(o[k])!)))

  const body: string[] = []
  const bodyKeys = [...BODY_KEYS, ...Object.keys(o).sort()]
  for (const k of bodyKeys) {
    if (used.has(k) || k.startsWith('_') || SKIP_KEYS.has(k)) continue
    // A leftover tab/icon label next to a real heading is UI chrome.
    if (titleKey && k === 'iconLabel') continue
    used.add(k)
    const val = o[k]
    if (val == null || typeof val === 'boolean') continue
    if (typeof val === 'string' && (!val.trim() || isUrlLike(val.trim()))) continue
    const childLevel = title ? level + 1 : level
    const md = renderValue(val, childLevel, ctx, k)
    if (!md) {
      if (typeof val === 'object' && k !== 'testimonials' && !SKIP_OBJECT_TYPES.has(val?._type) && !(Array.isArray(val) && !val.length)) {
        if (!(val?._type && SKIP_SECTION_TYPES.has(val._type))) noteUnsupported(`no text in field "${k}" (${val?._type ?? (Array.isArray(val) ? 'array' : 'object')})`)
      }
      continue
    }
    if (typeof val === 'string' && /^[a-z]+[A-Z]?[a-zA-Z]*$/.test(k) && !BODY_KEYS.includes(k) && md.length < 120 && !md.includes('\n')) {
      // Short unnamed scalar fields (e.g. location, email): keep a readable label.
      body.push(`${humanize(k)}: ${md}`)
    } else body.push(md)
  }
  if (comparison) body.push(comparison)
  body.push(...pairs)

  const attr = attribution.length ? ` — ${attribution.join(', ')}` : ''
  const kicker = kickers.length ? kickers.join(' · ') : ''

  // Compact list items: single short paragraph -> one bullet line.
  if (inList && title && body.length <= 1 && !body.some((b) => b.includes('\n')) && (body[0]?.length ?? 0) < 400) {
    return `- **${title}**${attr}${body[0] ? `: ${body[0]}` : ''}${kicker ? ` (${kicker})` : ''}`
  }
  if (inList && !title && body.length === 1 && !body[0].includes('\n')) return `- ${body[0]}${attr}`

  const out: string[] = []
  if (title) out.push(`${'#'.repeat(Math.min(6, level))} ${title}`)
  if (kicker) out.push(`*${kicker}*`)
  if (attr) out.push(attr.slice(3))
  out.push(...body)
  return out.filter(Boolean).join('\n\n')
}

const humanize = (k: string) =>
  k
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/^./, (c) => c.toUpperCase())

// ---------------------------------------------------------------------------
// Sections & documents
// ---------------------------------------------------------------------------

function renderSection(section: Json, index: number, ctx: RenderCtx): string {
  if (!section || SKIP_SECTION_TYPES.has(section._type)) return ''
  let md = renderObject(section, 2, ctx, false)
  // Heading-only sections (lists the site fills at runtime) carry no knowledge.
  if (!md.split('\n').some((l) => l.trim() && !l.startsWith('#'))) return ''
  if (!md.startsWith('## ')) {
    // Give headless sections a heading so they don't merge into the previous section;
    // a headless first section (hero/intro) stays directly under the document title.
    const fallback = SECTION_FALLBACK_TITLES[section._type] ?? (index > 0 ? humanize(String(section._type).replace(/Section$/, '')) : undefined)
    if (fallback) md = `## ${fallback}\n\n${md}`
  }
  return md
}

function frontmatter(fields: Record<string, Json>): string {
  const lines = ['---']
  for (const [k, v] of Object.entries(fields)) {
    if (v == null || v === '' || (Array.isArray(v) && !v.length)) continue
    if (Array.isArray(v)) {
      lines.push(`${k}:`)
      for (const x of v) lines.push(`  - ${yamlStr(String(x))}`)
    } else lines.push(`${k}: ${typeof v === 'string' ? yamlStr(v) : v}`)
  }
  lines.push('---')
  return lines.join('\n')
}

function refTitles(refs: Json, byId: Map<string, Doc>, field = 'title'): string[] {
  const list = Array.isArray(refs) ? refs : refs ? [refs] : []
  return list.map((r: Json) => byId.get(r?._ref)?.[field]).filter(Boolean).map((s: string) => oneLine(s))
}

const fmtDate = (s?: string) => (s && !Number.isNaN(Date.parse(s)) ? new Date(s).toISOString().slice(0, 10) : undefined)

/** Document-specific top-level content (fields outside the generic `sections` array). */
function renderDocBody(doc: Doc, ctx: RenderCtx): { md: string[]; meta: Record<string, Json> } {
  const md: string[] = []
  const meta: Record<string, Json> = {}
  const pt = (v: Json, base = 1) => (isBlockArray(v) ? ptToMarkdown(v, base, ctx) : '')
  const push = (heading: string | undefined, text: string) => {
    if (!text.trim()) return
    md.push(heading ? `## ${heading}\n\n${text}` : text)
  }

  switch (doc._type) {
    case 'faqs': {
      meta.categories = refTitles(doc.categories, ctx.byId)
      push(undefined, pt(doc.answer))
      break
    }
    case 'testimonials':
    case 'elevateTestimonials': {
      if (doc.jobtitle) push(undefined, oneLine(doc.jobtitle))
      push(undefined, pt(doc.testimonial).split('\n\n').map((p) => `> ${p.replace(/\n/g, '\n> ')}`).join('\n>\n'))
      break
    }
    case 'teamMember': {
      if (doc.jobTitle) push(undefined, `Role: ${oneLine(doc.jobTitle)}`)
      push(undefined, pt(doc.bioDetails))
      break
    }
    case 'author': {
      if (doc.jotTitle) push(undefined, `Role: ${oneLine(doc.jotTitle)}`)
      push(undefined, pt(doc.bio))
      break
    }
    case 'post':
    case 'elevatePost': {
      meta.author = ctx.byId.get(doc.author?._ref)?.name
      meta.published_at = fmtDate(doc.publishedAt)
      meta.categories = refTitles(doc.categories, ctx.byId)
      meta.tags = refTitles(doc.tags, ctx.byId, 'tag')
      push('Expert Insight', pt(doc.expert, 2))
      push(undefined, pt(doc.body, 1))
      if (doc.blogCta) push(undefined, renderObject({ ...doc.blogCta, button: undefined }, 2, ctx, false))
      break
    }
    case 'casestudies': {
      push(undefined, doc.shortDescription ? clean(doc.shortDescription) : '')
      const facts = [
        ['Company author', ctx.byId.get(doc.author?._ref)?.name],
        ['Industry', doc.industry],
        ['Company size', doc.companySize],
        ['Headquarters', doc.headquarters],
      ].filter(([, v]) => v && String(v).trim()).map(([k, v]) => `- **${k}:** ${oneLine(String(v))}`)
      push('At a Glance', facts.filter((f) => !f.startsWith('- **Company author')).join('\n'))
      push('About', doc.about ? clean(doc.about) : '')
      push('Key Features', pt(doc.keyFeatures, 2))
      push('Challenge', pt(doc.challenge, 2))
      push('Solution', pt(doc.solution, 2))
      push('Results', pt(doc.results, 2))
      push('Why It Matters', pt(doc.whyItMatters, 2))
      push('Looking Ahead', pt(doc.lookingAhead, 2))
      break
    }
    case 'events': {
      meta.categories = refTitles(doc.categories, ctx.byId)
      meta.start_date = fmtDate(doc.startDate)
      meta.end_date = fmtDate(doc.endDate)
      const facts = [
        ['Starts', fmtDate(doc.startDate)],
        ['Ends', fmtDate(doc.endDate)],
        ['Location', doc.address],
        ['Registration', doc.registrationLinkText && doc.registrationLink ? `[${oneLine(doc.registrationLinkText)}](${doc.registrationLink})` : doc.registrationLinkText],
      ].filter(([, v]) => v).map(([k, v]) => `- **${k}:** ${oneLine(String(v))}`)
      push('Event Details', facts.join('\n'))
      push(undefined, doc.shortDescription ? clean(doc.shortDescription) : '')
      push(undefined, pt(doc.content, 1))
      push(undefined, pt(doc.formContent, 1))
      push(undefined, pt(doc.formblowContent, 1))
      if (doc.eventCta) push(undefined, renderObject({ ...doc.eventCta, button: undefined }, 2, ctx, false))
      break
    }
    case 'integrations': {
      push(undefined, doc.shortdescription ? clean(doc.shortdescription) : '')
      break
    }
    case 'elevateProducts': {
      push(undefined, pt(doc.shortDescription, 1))
      push('Use Cases', pt(doc.UseCases, 2))
      break
    }
    case 'platforms': {
      const cat = ctx.byId.get(doc.category?._ref)
      meta.category = cat ? oneLine(cat.displayTitle || cat.title) : undefined
      break
    }
  }

  ;((doc.sections ?? []) as Json[]).forEach((s, i) => {
    const md2 = renderSection(s, i, ctx)
    if (md2) md.push(md2)
  })
  return { md, meta }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`Exporting published content from dataset "${dataset}"...`)

  const exportTypes = Object.keys(TYPES)
  const docs: Doc[] = await client.fetch(
    `*[!(_id in path("drafts.**")) && !(_id in path("versions.**")) && !(_type match "sanity.*") && !(_id in path("_.**"))] | order(_id asc)`,
  )
  const byId = new Map(docs.map((d) => [d._id, d]))

  // Independent count per type straight from the Content Lake, for validation.
  const counts: Record<string, number> = await client.fetch(
    `{${[...exportTypes, ...Object.keys(NOT_EXPORTED)].map((t) => `"${t}": count(*[_type == "${t}" && !(_id in path("drafts.**")) && !(_id in path("versions.**"))])`).join(',')}}`,
  )
  const allTypes: string[] = await client.fetch(`array::unique(*[!(_type match "sanity.*") && !(_id in path("_.**"))]._type)`)
  const unknownTypes = allTypes.filter((t) => !TYPES[t] && !NOT_EXPORTED[t])

  // ---- Assign stable, unique file paths ---------------------------------
  const paths = new Map<string, string>()
  const missingSlug: string[] = []
  const collisions: string[] = []
  const eligible = docs.filter((d) => TYPES[d._type])
  const proposals = new Map<string, Doc[]>()
  for (const d of eligible) {
    const cfg = TYPES[d._type]
    let base = cfg.slug?.(d) ?? slugOf(d)
    if (!base) {
      const t = cfg.title?.(d) ?? d.title ?? d.name
      if (!['faqs', 'testimonials', 'elevateTestimonials', 'teamMember'].includes(d._type)) missingSlug.push(`${d._type} ${d._id}`)
      base = t ? slugify(String(t)) : d._id
    }
    base = slugify(base) || slugify(d._id)
    // Platform pages share slugs (overview, benefits...) across categories: prefix the category.
    if (d._type === 'platforms') {
      const cat = slugOf(byId.get(d.category?._ref) ?? ({} as Doc))
      if (cat) base = `${cat}-${base}`
    }
    const rel = `${cfg.dir}/${base}.md`
    proposals.set(rel, [...(proposals.get(rel) ?? []), d])
  }
  for (const [rel, group] of proposals) {
    if (group.length === 1) paths.set(group[0]._id, rel)
    else {
      collisions.push(`${rel} (${group.length} docs: ${group.map((g) => g._id).join(', ')})`)
      for (const g of group) paths.set(g._id, rel.replace(/\.md$/, `-${slugify(g._id).slice(0, 8)}.md`))
    }
  }

  // ---- Render ------------------------------------------------------------
  const rendered = new Map<string, { doc: Doc; body: string; meta: Record<string, Json>; refs: Set<string> }>()
  const skipped: string[] = []
  const failed: string[] = []
  for (const doc of eligible) {
    try {
      const ctx: RenderCtx = { doc, byId, paths, refs: new Set() }
      const { md, meta } = renderDocBody(doc, ctx)
      const body = md.join('\n\n').replace(/\n{3,}/g, '\n\n').trim()
      const words = body.split(/\s+/).filter(Boolean).length
      if (words < 3) {
        skipped.push(`${doc._type} \`${doc._id}\` (${oneLine(String(TYPES[doc._type].title?.(doc) ?? doc.title ?? ''))}): no exportable text`)
        paths.delete(doc._id)
        continue
      }
      rendered.set(doc._id, { doc, body, meta, refs: ctx.refs })
    } catch (e) {
      failed.push(`${doc._type} \`${doc._id}\`: ${(e as Error).message}`)
      paths.delete(doc._id)
    }
  }

  // Back-references: which documents use a shared doc (FAQ, testimonial, team member).
  const referencedBy = new Map<string, Set<string>>()
  for (const [id, r] of rendered) {
    for (const t of r.refs) {
      if (!referencedBy.has(t)) referencedBy.set(t, new Set())
      referencedBy.get(t)!.add(id)
    }
  }

  // ---- Write ------------------------------------------------------------
  const previous: string[] = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')).documents.map((d: Json) => d.file) : []
  const manifest: Json[] = []
  const written = new Set<string>()
  for (const [id, { doc, body, meta, refs }] of [...rendered].sort((a, b) => paths.get(a[0])!.localeCompare(paths.get(b[0])!))) {
    const cfg = TYPES[doc._type]
    const rel = paths.get(id)!
    const title = oneLine(String(cfg.title?.(doc) ?? doc.title ?? doc.seo?.metaTitle ?? doc._id))
    const url = cfg.url?.(doc, byId)
    const linksOut = [...refs].filter((r) => paths.has(r)).map((r) => paths.get(r)!).sort()
    const linksIn = [...(referencedBy.get(id) ?? [])].filter((r) => paths.has(r)).map((r) => paths.get(r)!).sort()
    const fm = frontmatter({
      title,
      content_type: doc._type,
      slug: slugOf(doc) ?? cfg.slug?.(doc),
      sanity_id: doc._id,
      url,
      description: doc.seo?.metaDescription ? oneLine(doc.seo.metaDescription) : undefined,
      ...meta,
      updated_at: doc._updatedAt,
      source: 'sanity',
      dataset,
      references: CANONICAL_REF_TYPES.has(doc._type) ? [] : linksOut,
      referenced_by: linksIn,
    })
    const heading = doc._type === 'faqs' ? `# ${title}` : `# ${title}`
    const content = `${fm}\n\n${heading}\n\n${body}\n`
    const abs = path.join(OUT_DIR, rel)
    fs.mkdirSync(path.dirname(abs), { recursive: true })
    fs.writeFileSync(abs, content, 'utf8')
    written.add(rel)
    manifest.push({ file: rel, sanity_id: id, content_type: doc._type, title, url: url ?? null, updated_at: doc._updatedAt })
  }

  // Remove stale files from a previous run (only files this script generated).
  const removed: string[] = []
  for (const rel of previous) {
    if (written.has(rel)) continue
    const abs = path.join(OUT_DIR, rel)
    if (abs.startsWith(OUT_DIR + path.sep) && fs.existsSync(abs)) {
      fs.rmSync(abs)
      removed.push(rel)
    }
  }
  removeEmptyDirs(OUT_DIR)
  fs.writeFileSync(MANIFEST, JSON.stringify({ dataset, generated_at: new Date().toISOString(), documents: manifest }, null, 2) + '\n')

  // ---- Validate -----------------------------------------------------------
  const issues: string[] = []
  const files = listMd(OUT_DIR).filter((f) => f !== 'EXPORT_REPORT.md')
  const orphanFiles = files.filter((f) => !written.has(f))
  if (orphanFiles.length) issues.push(`Markdown files not produced by this run: ${orphanFiles.join(', ')}`)
  const mediaHits: string[] = []
  const shortFiles: string[] = []
  for (const f of written) {
    const text = fs.readFileSync(path.join(OUT_DIR, f), 'utf8')
    if (/cdn\.sanity\.io|image-[0-9a-f]{20,}|\]\([^)]*\.(webp|png|jpe?g|svg|gif|webm|mp4)\)|!\[/i.test(text)) mediaHits.push(f)
    const bodyText = text.replace(/^---[\s\S]*?---/, '').replace(/^#.*$/gm, '')
    // FAQ answers are legitimately short; only flag near-empty ones.
    if (bodyText.split(/\s+/).filter(Boolean).length < (f.startsWith('faqs/') ? 4 : 15)) shortFiles.push(f)
  }
  if (mediaHits.length) issues.push(`Image/media references found in: ${mediaHits.join(', ')}`)

  const typeRows = exportTypes.map((t) => {
    const exported = manifest.filter((m) => m.content_type === t).length
    const fetched = eligible.filter((d) => d._type === t).length
    return { t, dir: TYPES[t].dir, count: counts[t] ?? 0, fetched, exported }
  })
  for (const r of typeRows) if (r.count !== r.fetched) issues.push(`${r.t}: Content Lake count ${r.count} != fetched ${r.fetched}`)
  const totalEligible = typeRows.reduce((a, r) => a + r.count, 0)
  const totalExported = manifest.length

  // ---- Report ---------------------------------------------------------------
  const report = [
    '# Knowledge Base Export Report',
    '',
    `- **Source:** Sanity project \`${projectId}\`, dataset \`${dataset}\`, perspective \`published\` (drafts excluded)`,
    `- **Generated:** ${new Date().toISOString()}`,
    `- **Script:** \`scripts/export-knowledge-base.mts\` (\`npm run export:kb\`)`,
    `- **Result:** ${totalExported} Markdown files from ${totalEligible} eligible published documents (${skipped.length} skipped as empty, ${failed.length} failed)`,
    '',
    '## Documents by type',
    '',
    '| Sanity type | Directory | Published in dataset | Exported | Skipped/failed |',
    '| --- | --- | ---: | ---: | ---: |',
    ...typeRows.map((r) => `| \`${r.t}\` | \`${r.dir}/\` | ${r.count} | ${r.exported} | ${r.fetched - r.exported} |`),
    '',
    '## Types not exported as files',
    '',
    '| Sanity type | Published docs | Reason |',
    '| --- | ---: | --- |',
    ...Object.entries(NOT_EXPORTED).map(([t, why]) => `| \`${t}\` | ${counts[t] ?? 0} | ${why} |`),
    ...(unknownTypes.length ? ['', `**Unrecognized document types in dataset (not exported, review needed):** ${unknownTypes.map((t) => `\`${t}\``).join(', ')}`] : []),
    '',
    '## Skipped / failed documents',
    '',
    ...(skipped.length || failed.length ? [...skipped, ...failed].map((s) => `- ${s}`) : ['None.']),
    '',
    '## Validation',
    '',
    `- Every eligible type's fetched count matches an independent \`count()\` query: ${typeRows.every((r) => r.count === r.fetched) ? 'yes' : '**no** (see issues)'}`,
    `- Duplicate filenames: ${collisions.length ? `${collisions.length} slug collision(s) resolved with an ID suffix — ${collisions.join('; ')}` : 'none'}`,
    `- Documents without a slug (filename derived from title): ${missingSlug.length ? missingSlug.join(', ') : 'none'} (FAQs, testimonials and team members have no slug field by design)`,
    `- Image/media assets or URLs in output: ${mediaHits.length ? `**found** in ${mediaHits.join(', ')}` : 'none'}`,
    `- Broken references (target missing or unpublished): ${brokenRefs.length ? `${brokenRefs.length} — ${[...new Set(brokenRefs)].join('; ')}` : 'none'}`,
    `- Very short files (< 15 words of body text; verify these are genuinely short in Sanity): ${shortFiles.length ? shortFiles.join(', ') : 'none'}`,
    `- Stale files removed from previous run: ${removed.length ? removed.join(', ') : 'none'}`,
    '',
    '## Fields without exportable text',
    '',
    'Fields encountered that produced no text (counts across all documents). These are reported rather than silently dropped; most are empty objects or sections with only media.',
    '',
    ...(unsupported.size ? [...unsupported].sort((a, b) => b[1] - a[1]).map(([k, n]) => `- ${k}: ${n}`) : ['None.']),
    '',
    '## Excluded by design',
    '',
    '- Images, files, video URLs, image filenames, logos, alt text, colors and layout options.',
    '- Buttons/CTA link targets, HubSpot form IDs, SEO share images, JSON-LD schema blobs, display order numbers.',
    '- Sections that render only logos or an interactive calculator: ' + [...SKIP_SECTION_TYPES].map((t) => `\`${t}\``).join(', ') + '.',
    '- FAQs referenced from pages, solutions and products are listed as linked questions rather than duplicated; each answer lives once in `faqs/`.',
    '- Testimonial references are omitted (testimonials are out of scope). Team members and blog posts referenced from pages appear by name/title only.',
    '',
    '## Open issues',
    '',
    ...(issues.length ? issues.map((i) => `- ${i}`) : ['None detected.']),
    '',
  ].join('\n')
  fs.writeFileSync(REPORT, report, 'utf8')

  console.log(`Wrote ${totalExported} files to knowledge-base/ (${skipped.length} skipped, ${failed.length} failed, ${removed.length} stale removed).`)
  if (issues.length) console.log(`Issues:\n- ${issues.join('\n- ')}`)
  console.log('See knowledge-base/EXPORT_REPORT.md')
}

function listMd(dir: string, base = ''): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const rel = base ? `${base}/${e.name}` : e.name
    if (e.isDirectory()) return listMd(path.join(dir, e.name), rel)
    return e.name.endsWith('.md') ? [rel] : []
  })
}

function removeEmptyDirs(dir: string) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue
    const sub = path.join(dir, e.name)
    removeEmptyDirs(sub)
    if (!fs.readdirSync(sub).length) fs.rmdirSync(sub)
  }
}

main().catch((e) => {
  console.error('Export failed:', e instanceof Error ? e.message : e)
  process.exit(1)
})
