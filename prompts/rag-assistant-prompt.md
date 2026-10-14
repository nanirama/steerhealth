# Project: Build a RAG Knowledge Assistant Page for the Steer Health Website

## 1. Role and Expertise

Act as a senior AI developer, RAG engineer, LLM evaluation specialist, observability and monitoring engineer, Next.js engineer, Sanity CMS developer, and senior product/UI designer.

You have expertise in:

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4
- Retrieval-Augmented Generation: chunking, embeddings, hybrid retrieval, re-ranking, grounding, citations
- LLM evaluation (faithfulness, answer relevance, retrieval precision/recall) and production monitoring
- Token accounting, latency measurement, cost tracking and structured logging
- Accessible, responsive, production-grade UI design that matches an existing brand

## 2. Project Context

The website is built with Next.js and Sanity CMS. A text-only Markdown knowledge base has already been exported from Sanity into `knowledge-base/` by `scripts/export-knowledge-base.mts` (`npm run export:kb`).

- `knowledge-base/pages/`, `solutions/`, `products/`, `faqs/`: one Markdown file per Sanity document
- Each file has YAML frontmatter: `title`, `content_type`, `slug`, `sanity_id`, `url`, `description`, `updated_at`, `dataset`, `references`, `referenced_by`
- `knowledge-base/manifest.json` lists every file. `knowledge-base/EXPORT_REPORT.md` documents coverage.
- FAQ answers live only in `faqs/`. Pages, solutions and products link to them by question rather than duplicating the answers.

Build a professional RAG assistant page on the same website that answers visitor questions using **only** this knowledge base, cites its sources, and shows per-response metrics.

## 3. First: Inspect the Codebase

Before writing code:

1. Review `knowledge-base/` (file structure, frontmatter, heading structure, `manifest.json`, `EXPORT_REPORT.md`).
2. Review the site layout: `src/app/layout.tsx`, `src/components/Common/BaseLayout.tsx`, `header.tsx`, `footer.tsx`, and existing pages such as `src/app/steernotes/page.tsx`.
3. Review the design system: `src/app/globals.css`, `src/components/Elements/ButtonComponent.jsx`, `Badge.tsx`, and the Luna components in `src/components/Luna/`.
4. Review the existing LLM integration in `src/app/api/generate-advice/route.ts`. The project already uses `@google/genai` with `GEMINI_API_KEY`. Reuse the existing provider and environment conventions unless told otherwise. Do not add a second LLM provider without asking.
5. Check existing API route patterns, error handling, and the `.env` variable naming.

Use the actual codebase as the source of truth.

## 4. Design Requirements: Match the Existing Site Theme

The page must look like a natural, first-party part of steerhealth.io: clean, modern, enterprise-healthcare, and calm. It must not look like a generic chatbot template. Reuse the site's existing tokens and components instead of inventing new ones.

### 4.1 Theme tokens observed in the codebase (verify before use)

| Role | Value | Where it is used |
| --- | --- | --- |
| Primary brand blue (buttons, links, accents) | `#335CFF` (hover `#2F55EB`) | `ButtonComponent` primary, `secondaryBorder` |
| Secondary accent blues | `#2160FD`, `#3591FA`, `#0030A6` | Highlight text, gradients |
| Gradient accent | `from-[#6FCAFF] via-[#3591FA] to-[#0030A6]`; `from-[#335CFF] to-[#00D9A5]` | Hero highlights, `gradientButton` |
| Teal accent (sparingly) | `#00B9B7` | Highlight text |
| Heading text | `#171717` (also `#0A0D14`, `#1D1718`) | Most headings |
| Body / secondary text | `#5C5C5C`, `#64717E` | Paragraphs, captions |
| Muted text | `#818181`, `#767676` | Meta labels |
| Page background | `#F5F5F5` (body), `#F7F7F7` surfaces, white cards | `globals.css`, sections |
| Borders | `#EBEBEB`, `#ECEFF1`, `#E9EAEB` | Cards, dividers |
| Soft brand gradients | `.bg-gradient2` (`#f2f2f2` to `#d1dfff`), `.bg-gradient` | Section backgrounds |

**Typography:** body uses `InterVariable`. Headings use `font3` (InterDisplay), with `font4` (BeigeCultureItalic) for the site's italic serif accent word in hero headings. Use `font-gilroy-semibold` / `font-gilroy-medium` and `font-space-grotesk-regular` only where existing components already use them. Follow the site's existing heading sizes and leading.

**Shape and spacing:**
- Content width: `max-w-7xl` container.
- Corner radii: `rounded-[8px]` for buttons, `rounded-xl` / `rounded-2xl` / `rounded-[24px]` for cards and panels, `rounded-full` for pills.
- Shadows: subtle only, matching the existing hover shadows (`hover:shadow-md`).
- Transitions: 200–300 ms ease-in-out.

**Buttons:** reuse the `ButtonComponent` styles (`primary`, `secondaryBorder`, `primaryBlack`), including the arrow hover animation where appropriate.

### 4.2 Page layout

- Wrap the page in the site's `BaseLayout` so the real header and footer appear. Choose the route (e.g. `/ask` or `/assistant`) after checking that it doesn't collide with the `/:slug` → `/pages/:slug` rewrite in `next.config.ts` or with Sanity page slugs.
- **Hero header:** a small kicker label, a headline in the site's style (`font3` heading with an optional `font4` italic accent word), and a one-line subtext explaining that answers come from Steer Health content.
- **Conversation panel:** a white `rounded-[24px]` card with an `#EBEBEB` border on the `#F5F5F5` background, centered at a comfortable reading width (about 768–880px).
  - User messages are right-aligned in a light brand-tinted bubble. Assistant messages are left-aligned on white with full Markdown rendering (headings, lists, tables, bold, links).
- **Empty state:** 4–6 suggested-question chips built from real knowledge-base topics (for example products, solutions, integrations with EHRs, security). Never use hard-coded marketing claims.
- **Composer:** a multi-line input pinned at the bottom of the panel.
  - Primary `#335CFF` send button. Enter sends; Shift+Enter adds a new line.
  - Show a character limit, a disabled state while a response is streaming, and a Stop button.
- **Sources:** under every assistant answer, show a "Sources" row of citation chips. Each chip shows the document title and content type (Product / Solution / Page / FAQ) and links to the document's public `url` from frontmatter. Number the chips to match inline `[1]`, `[2]` markers in the answer.
- **States:** streaming text with a subtle typing indicator, skeletons while loading, and friendly inline error messages with a Retry action. When nothing relevant is retrieved, show a clear "I couldn't find this in Steer Health's content" response with a CTA to contact the team (reuse the existing contact page route).
- **Responsive:** works at 375px mobile width with no horizontal scroll and touch-friendly targets of at least 44px. The composer remains usable above the mobile keyboard.
- **Accessibility:** WCAG 2.1 AA contrast and full keyboard navigation with visible focus rings. Use `aria-live="polite"` for streamed answers and labelled controls, and respect `prefers-reduced-motion`.
- **Polish:** no layout shift, and auto-scroll that does not fight the user when they scroll up. Answers need a copy button and thumbs up/down feedback.

### 4.3 Response metrics bar (required)

Under every completed assistant response, show a compact metrics bar like this reference:

```
 Input: 6  |  Output: 433  |  Latency: 2050 ms
```

Specification:
- A pill-shaped container (`rounded-full`) with a light neutral background (`#F7F7F7` or `#F5F5F5`), a `#EBEBEB` border or none, small text (12–13px), and comfortable horizontal padding.
- Three items separated by thin vertical dividers (`#E9EAEB`):
  - **Input**: prompt / input tokens for the request
  - **Output**: completion / output tokens
  - **Latency**: total end-to-end time in milliseconds, measured on the server from request received to final token
- Labels in muted text (`#5C5C5C`) with a **dotted underline** that shows a tooltip on hover and keyboard focus:
  - Input: "Tokens sent to the model, including retrieved context"
  - Output: "Tokens generated in this answer"
  - Latency: "Total time to generate the full answer"
- Values use the heading colour (`#171717`) with `tabular-nums`, so numbers don't jitter.
- Use the token counts reported by the provider's usage metadata (for Gemini, `usageMetadata.promptTokenCount` and `candidatesTokenCount`). Never estimate counts on the client. If usage data is unavailable, show "—" instead of a fake number.
- Optionally expandable (a "Details" toggle) to show: time to first token, retrieval time, number of chunks retrieved, model name, and estimated cost.
- The bar appears only after the stream completes, fades in, and never shifts the answer text.
- Decide during implementation whether metrics are visible to all visitors or only in development / to internal users, and make it a single config flag (default: visible).

## 5. RAG Implementation Requirements

1. **Ingestion script:** a separate, rerunnable script (like the export script) that:
   - Reads `knowledge-base/**/*.md` and parses the frontmatter.
   - Chunks the text by Markdown headings (H2/H3), keeping the document title and section heading path in every chunk so each chunk makes sense on its own. Use a token-bounded chunk size with small overlap.
   - Attaches metadata to every chunk: `sanity_id`, `content_type`, `slug`, `url`, `title`, `heading_path`, `updated_at`, `dataset`.
   - Is idempotent: content hashes prevent duplicate chunks, and documents removed from the knowledge base are deleted from the index.
2. **Embeddings and vector store:** propose the simplest option that fits this project's hosting (Docker/Kubernetes via `Dockerfile` and `kubernetes/`). Explain the trade-offs and wait for approval before adding infrastructure or dependencies.
3. **Retrieval:** top-k semantic search, optionally hybrid with keyword search, plus optional re-ranking. Allow filtering by `content_type`. When an FAQ chunk matches, prefer it for direct questions.
4. **Generation:**
   - Use a system prompt that requires answers grounded strictly in the retrieved context, inline citations `[n]`, no invented facts, prices, statistics or medical advice, and a clear fallback when the context doesn't contain the answer.
   - Stream the response.
   - Hold model name, temperature, and max tokens in config.
5. **API route:** a Next.js route handler (e.g. `src/app/api/assistant/route.ts`) that:
   - Validates input length, applies basic rate limiting, and keeps every key on the server.
   - Returns a stream containing the answer, the sources list, and a final metrics event (input tokens, output tokens, latency, time to first token, retrieval time, chunk count, model).
6. **Security:** guard against prompt injection (knowledge-base content and user input are data, not instructions). Never expose environment variables or tokens to the client, never log full user messages containing personal information, and escape or sanitize rendered Markdown.

## 6. Observability and Evaluation

- **Structured logs** for every request: request ID, timestamp, model, input/output tokens, retrieval time, time to first token, total latency, chunk IDs and scores retrieved, fallback-triggered flag, and user feedback (thumbs up/down) linked by request ID.
- **Metrics** worth tracking: p50/p95 latency, tokens per request, cost per request, fallback rate, error rate, and feedback ratio.
- **Evaluation set:** build a small golden dataset of 30–50 questions from the real knowledge base. Prefer FAQs, which already pair questions with answers, and add product and solution questions. Provide a script that reports retrieval hit rate, faithfulness to sources, citation correctness, and answer relevance.
- Don't add a paid observability vendor without asking. Start with structured logs that a vendor can consume later.

## 7. Constraints

- Do not modify existing pages, components, layouts, routes or behaviour other than adding the new page, its components, and its API route. If adding a header navigation link is appropriate, ask first.
- Do not modify Sanity schemas, Sanity content, or the export script's output format.
- Keep new dependencies to a minimum and justify each one. Reuse `@google/genai`, `clsx`, `lucide-react` / `react-icons`, and the existing Markdown/Portable Text tooling where possible.
- Follow the project's TypeScript, ESLint and Tailwind conventions. Keep the new UI components in a dedicated folder (e.g. `src/components/Assistant/`).
- Use only the knowledge base as the answer source. The assistant must not browse the web or answer outside Steer Health's content.

## 8. Execution Workflow

1. Inspect the codebase and the knowledge base. Summarize the design tokens and components you will reuse.
2. Propose the architecture (chunking, embeddings, vector store, provider, route, UI component tree) and wait for approval on any new infrastructure or dependency.
3. Implement ingestion, then retrieval and generation, then the API route, then the UI (including the metrics bar).
4. Verify in the browser at desktop and 375px mobile widths, in the empty, loading, streaming, answered, no-answer and error states. Confirm that the metrics shown match the provider's usage data and the server-measured latency.
5. Run the evaluation set and report the results.
6. Summarize the files created, the configuration needed, the evaluation results, and the remaining issues.

## Final Objective

A professional, on-brand knowledge assistant page that looks native to the Steer Health website, answers only from the exported Sanity knowledge base with numbered source citations, shows a clean Input / Output / Latency metrics bar under every response, and ships with logging and an evaluation harness ready for production monitoring.
