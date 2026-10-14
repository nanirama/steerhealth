/**
 * OpenTelemetry tracing for the RAG pipeline.
 *
 * A dedicated NodeTracerProvider is created for RAG and is deliberately NOT registered as the
 * global provider, so the rest of the Next.js site is not instrumented as a side effect.
 * Parent/child relationships are passed explicitly (no global context manager needed).
 *
 * Exporters:
 *  - Store span exporter -> telemetry DB `spans` table (feeds the /admin trace explorer)
 *  - OTLP/HTTP exporter when OTEL_EXPORTER_OTLP_ENDPOINT is set (Grafana, Honeycomb, etc.)
 *
 * Sampling: RAG_TRACE_SAMPLE_RATE (0..1, parent-based ratio). Prompts and answers are never
 * recorded as span attributes — only lengths, counts, IDs and timings.
 */
import { SpanStatusCode, trace, ROOT_CONTEXT } from '@opentelemetry/api'
import type { Attributes, Context, Span, Tracer } from '@opentelemetry/api'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { resourceFromAttributes } from '@opentelemetry/resources'
import {
  BatchSpanProcessor,
  ParentBasedSampler,
  SimpleSpanProcessor,
  TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-base'
import type { ReadableSpan, SpanExporter, SpanProcessor } from '@opentelemetry/sdk-trace-base'
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'
import { getConfig } from '../config.ts'
import { recordSpan } from '../store/telemetry.ts'

export interface SpanRecord {
  traceId: string
  spanId: string
  parentSpanId?: string
  name: string
  startTime: string
  durationMs: number
  status: 'ok' | 'error' | 'unset'
  statusMessage?: string
  attributes: Attributes
  events: { name: string; timeOffsetMs: number; attributes?: Attributes }[]
}

const hrToMs = (t: [number, number]) => t[0] * 1e3 + t[1] / 1e6

export function toSpanRecord(s: ReadableSpan): SpanRecord {
  const start = hrToMs(s.startTime as [number, number])
  return {
    traceId: s.spanContext().traceId,
    spanId: s.spanContext().spanId,
    parentSpanId: s.parentSpanContext?.spanId,
    name: s.name,
    startTime: new Date(start).toISOString(),
    durationMs: Math.round(hrToMs(s.duration as [number, number]) * 100) / 100,
    status: s.status.code === SpanStatusCode.ERROR ? 'error' : s.status.code === SpanStatusCode.OK ? 'ok' : 'unset',
    statusMessage: s.status.message,
    attributes: s.attributes,
    events: s.events.map((e) => ({
      name: e.name,
      timeOffsetMs: Math.round((hrToMs(e.time as [number, number]) - start) * 100) / 100,
      attributes: e.attributes,
    })),
  }
}

export class StoreSpanExporter implements SpanExporter {
  export(spans: ReadableSpan[], done: (r: { code: number }) => void): void {
    for (const s of spans) recordSpan(toSpanRecord(s))
    done({ code: 0 })
  }
  shutdown(): Promise<void> {
    return Promise.resolve()
  }
}

let provider: NodeTracerProvider | undefined
let tracer: Tracer | undefined

export function getTracer(): Tracer {
  if (tracer) return tracer
  const cfg = getConfig()
  const processors: SpanProcessor[] = [new SimpleSpanProcessor(new StoreSpanExporter())]
  if (cfg.otlpEndpoint) {
    const url = cfg.otlpEndpoint.replace(/\/$/, '') + (cfg.otlpEndpoint.endsWith('/v1/traces') ? '' : '/v1/traces')
    processors.push(new BatchSpanProcessor(new OTLPTraceExporter({ url })))
  }
  provider = new NodeTracerProvider({
    resource: resourceFromAttributes({ [ATTR_SERVICE_NAME]: cfg.serviceName }),
    sampler: new ParentBasedSampler({ root: new TraceIdRatioBasedSampler(Math.min(1, Math.max(0, cfg.traceSampleRate))) }),
    spanProcessors: processors,
  })
  tracer = provider.getTracer('steer-rag', '1.0.0')
  return tracer
}

export async function shutdownTracing(): Promise<void> {
  await provider?.forceFlush()
}

/** A started span plus the context to parent children on. */
export interface SpanHandle {
  span: Span
  ctx: Context
  traceId: string
  spanId: string
}

export function startSpan(name: string, parent?: SpanHandle, attributes?: Attributes): SpanHandle {
  const t = getTracer()
  const span = t.startSpan(name, { attributes }, parent?.ctx ?? ROOT_CONTEXT)
  const ctx = trace.setSpan(parent?.ctx ?? ROOT_CONTEXT, span)
  const sc = span.spanContext()
  return { span, ctx, traceId: sc.traceId, spanId: sc.spanId }
}

/** Run `fn` inside a child span; records errors with a classified code and always ends the span. */
export async function inSpan<T>(
  name: string,
  parent: SpanHandle,
  fn: (h: SpanHandle) => Promise<T>,
  attributes?: Attributes,
): Promise<T> {
  const h = startSpan(name, parent, attributes)
  try {
    const out = await fn(h)
    h.span.setStatus({ code: SpanStatusCode.OK })
    return out
  } catch (e) {
    markError(h, e)
    throw e
  } finally {
    h.span.end()
  }
}

export function markError(h: SpanHandle, e: unknown) {
  const code = (e as { code?: string })?.code ?? 'internal_error'
  h.span.setAttribute('error.type', String(code))
  h.span.setStatus({ code: SpanStatusCode.ERROR, message: String(code) })
  h.span.addEvent('exception', { 'exception.type': String((e as Error)?.name ?? 'Error'), 'error.code': String(code) })
}
