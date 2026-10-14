/** Request validation for POST /api/rag/chat (pure; unit-tested). */
import { CONTENT_TYPES } from './types.ts'
import type { ChatMessage, ChatRequestBody, ContentType } from './types.ts'

export interface ValidationLimits {
  maxQuestionChars: number
  maxMessages: number
}

export type ValidationResult = { ok: true; value: ChatRequestBody } | { ok: false; code: string; message: string }

const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g

export function validateChatRequest(body: unknown, limits: ValidationLimits): ValidationResult {
  if (!body || typeof body !== 'object') return { ok: false, code: 'invalid_body', message: 'Request body must be a JSON object.' }
  const b = body as Record<string, unknown>
  if (!Array.isArray(b.messages) || b.messages.length === 0) return { ok: false, code: 'invalid_messages', message: '`messages` must be a non-empty array.' }
  if (b.messages.length > limits.maxMessages) return { ok: false, code: 'too_many_messages', message: `At most ${limits.maxMessages} messages are allowed.` }
  const messages: ChatMessage[] = []
  for (const m of b.messages) {
    const mm = m as Record<string, unknown>
    if (!mm || (mm.role !== 'user' && mm.role !== 'assistant') || typeof mm.content !== 'string') {
      return { ok: false, code: 'invalid_message', message: 'Each message needs role "user" or "assistant" and string content.' }
    }
    const content = mm.content.replace(CONTROL, '').trim()
    // History messages are capped generously; the current question has the strict limit.
    if (content.length > limits.maxQuestionChars * 4) return { ok: false, code: 'message_too_long', message: 'A message in the history is too long.' }
    messages.push({ role: mm.role, content })
  }
  const last = messages[messages.length - 1]
  if (last.role !== 'user') return { ok: false, code: 'last_not_user', message: 'The last message must be from the user.' }
  if (!last.content) return { ok: false, code: 'empty_question', message: 'Please enter a question.' }
  if (last.content.length > limits.maxQuestionChars) return { ok: false, code: 'question_too_long', message: `Questions are limited to ${limits.maxQuestionChars} characters.` }

  let contentTypes: ContentType[] | undefined
  if (b.contentTypes !== undefined) {
    if (!Array.isArray(b.contentTypes) || !b.contentTypes.every((t) => CONTENT_TYPES.includes(t as ContentType))) {
      return { ok: false, code: 'invalid_content_types', message: `contentTypes must be a subset of ${CONTENT_TYPES.join(', ')}.` }
    }
    contentTypes = b.contentTypes.length ? (b.contentTypes as ContentType[]) : undefined
  }
  let conversationId: string | undefined
  if (b.conversationId !== undefined) {
    if (typeof b.conversationId !== 'string' || !/^[A-Za-z0-9_-]{1,64}$/.test(b.conversationId)) {
      return { ok: false, code: 'invalid_conversation_id', message: 'conversationId must be 1-64 URL-safe characters.' }
    }
    conversationId = b.conversationId
  }
  return { ok: true, value: { messages, contentTypes, conversationId } }
}
