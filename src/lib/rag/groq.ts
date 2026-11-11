/** Groq access (OpenAI-compatible chat completions): streaming and one-shot generation. */
import { getConfig } from './config.ts'
import { RagError, classifyError, withRetry } from './retry.ts'

const BASE_URL = 'https://api.groq.com/openai/v1'

export interface LlmMessage {
  role: 'user' | 'assistant'
  content: string
}

/** Usage as reported by Groq; `completion_tokens` includes reasoning tokens. */
export interface LlmUsage {
  prompt_tokens?: number
  completion_tokens?: number
  total_tokens?: number
  prompt_tokens_details?: { cached_tokens?: number }
  completion_tokens_details?: { reasoning_tokens?: number }
}

export interface GenerateStreamOptions {
  model: string
  systemInstruction: string
  messages: LlmMessage[]
  temperature: number
  maxOutputTokens: number
  /** gpt-oss models only: 'low' | 'medium' | 'high'. Reasoning is never returned to the caller. */
  reasoningEffort: string
  signal: AbortSignal
}

export interface StreamChunk {
  text: string
  usage?: LlmUsage
  /** Upper-cased provider finish reason (STOP, LENGTH, ...). */
  finishReason?: string
  modelVersion?: string
}

function apiKey(): string {
  const key = getConfig().groqApiKey
  if (!key) throw new RagError('config_missing', 'GROQ_API_KEY is not configured')
  return key
}

/** Reasoning controls differ per model family; unknown models get none. */
function reasoningParams(model: string, effort: string): Record<string, unknown> {
  if (/gpt-oss/.test(model)) return { reasoning_effort: effort, include_reasoning: false }
  if (/qwen3/.test(model)) return { reasoning_format: 'hidden' }
  return {}
}

function requestBody(opts: GenerateStreamOptions, extra: Record<string, unknown>) {
  return JSON.stringify({
    model: opts.model,
    messages: [{ role: 'system', content: opts.systemInstruction }, ...opts.messages],
    temperature: opts.temperature,
    max_completion_tokens: opts.maxOutputTokens,
    ...reasoningParams(opts.model, opts.reasoningEffort),
    ...extra,
  })
}

/** POST to Groq; non-2xx responses throw an Error carrying `status` so classifyError can map it. */
async function post(path: string, body: string, signal: AbortSignal): Promise<Response> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey()}`, 'Content-Type': 'application/json' },
    body,
    signal,
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw Object.assign(new Error(`Groq ${res.status}: ${detail.slice(0, 500)}`), { status: res.status })
  }
  return res
}

export async function* generateStream(opts: GenerateStreamOptions): AsyncGenerator<StreamChunk> {
  const res = await post('/chat/completions', requestBody(opts, { stream: true, stream_options: { include_usage: true } }), opts.signal)
  if (!res.body) throw new RagError('groq_error', 'Groq returned an empty stream')
  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()
  let buf = ''
  try {
    for (;;) {
      const { value, done } = await reader.read()
      if (done) break
      buf += value
      let nl: number
      while ((nl = buf.indexOf('\n')) !== -1) {
        const line = buf.slice(0, nl).trim()
        buf = buf.slice(nl + 1)
        if (!line.startsWith('data:')) continue
        const data = line.slice(5).trim()
        if (data === '[DONE]') return
        const c = JSON.parse(data) as {
          model?: string
          choices?: { delta?: { content?: string | null }; finish_reason?: string | null }[]
          usage?: LlmUsage
          x_groq?: { usage?: LlmUsage }
          error?: { message?: string }
        }
        if (c.error) throw new Error(`Groq stream error: ${c.error.message ?? 'unknown'}`)
        const choice = c.choices?.[0]
        yield {
          // gpt-oss streams 【n】 one token at a time; map the brackets so live text shows [n].
          text: (choice?.delta?.content ?? '').replace(/【/g, '[').replace(/】/g, ']'),
          usage: c.usage ?? c.x_groq?.usage,
          finishReason: choice?.finish_reason ? choice.finish_reason.toUpperCase() : undefined,
          modelVersion: c.model,
        }
      }
    }
  } finally {
    reader.releaseLock()
  }
}

/** Non-streaming generation with retries; `json` enables JSON mode (used by the evaluation judge). */
export async function generateText(
  opts: GenerateStreamOptions & { json?: boolean },
): Promise<{ text: string; usage?: LlmUsage }> {
  const res = await withRetry(
    async () => {
      const r = await post('/chat/completions', requestBody(opts, opts.json ? { response_format: { type: 'json_object' } } : {}), opts.signal)
      return (await r.json()) as { choices?: { message?: { content?: string | null } }[]; usage?: LlmUsage }
    },
    (e) => classifyError(e, 'groq'),
    { retries: getConfig().maxRetries, signal: opts.signal },
  )
  return { text: res.choices?.[0]?.message?.content ?? '', usage: res.usage }
}

/** Cheap credential + model check for the health endpoint. */
export async function checkModel(model: string, signal?: AbortSignal): Promise<void> {
  // Model IDs contain a literal slash (openai/gpt-oss-120b) that the route expects unencoded.
  const res = await fetch(`${BASE_URL}/models/${model.split('/').map(encodeURIComponent).join('/')}`, { headers: { Authorization: `Bearer ${apiKey()}` }, signal })
  if (!res.ok) throw classifyError(Object.assign(new Error(`Groq ${res.status}`), { status: res.status }), 'groq')
}
