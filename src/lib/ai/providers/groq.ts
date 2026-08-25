import Groq from 'groq-sdk'
import type { AICompletionRequest, AICompletionResult, AIProvider } from './types'
import {
  AIEmptyResponseError, AINetworkError, AIQuotaError,
  AIRateLimitError, AIServerError, AITimeoutError,
} from './types'

// SEV-1 (2026-08-02) timeout budget — fallback tier. Reached only after the
// primary has already spent its own budget, so it is capped tighter than
// Gemini's 20_000 to keep the whole chain inside `api/learn/chat`'s 60_000 ms
// maxDuration. Groq answers in well under a second in normal operation, so
// this is not a working constraint. See src/lib/ai/providers/gemini.ts.
const TIMEOUT_MS = 8_000

/**
 * Third-tier automatic fallback (Gemini → OpenRouter → Groq). Reuses the
 * `openai/gpt-oss-20b` model this app ran on before the Gemini/OpenRouter
 * migration — a proven-working default, not a new choice.
 */
export function createGroqProvider(apiKey: string, model: string): AIProvider {
  const client = new Groq({ apiKey, timeout: TIMEOUT_MS, maxRetries: 0 })

  return {
    name: 'groq',
    model,

    async complete(req: AICompletionRequest): Promise<AICompletionResult> {
      let response
      try {
        response = await client.chat.completions.create({
          model,
          messages: [
            { role: 'system', content: req.systemPrompt },
            ...req.messages.slice(-6),
          ],
          max_tokens: req.maxTokens,
          temperature: req.temperature,
        })
      } catch (err: any) {
        // Phase 7K Track C: Groq can reject its OWN generation as a stray tool
        // call and hand the text back in `failed_generation`. Recover it rather
        // than spending a failover hop (and, when the chain is exhausted, a
        // learner-visible outage) on content that was successfully generated.
        const salvaged = salvageToolUseFailure(err)
        if (salvaged) {
          console.warn('[ai/groq] recovered generation from tool_use_failed 400 ' +
            `(chars=${salvaged.length}) — provider rejected its own output as a tool call`)
          return { text: salvaged, finishReason: 'stop', provider: 'groq' }
        }
        throw classifyError(err)
      }

      const text = response.choices[0]?.message?.content ?? ''
      const finishReason = response.choices[0]?.finish_reason ?? null

      if (!text) throw new AIEmptyResponseError('groq')

      // Groq's chat.completions response is OpenAI-compatible and carries a
      // `usage` object exactly like Gemini's `usageMetadata` — this provider
      // simply never read it, which is why every attempt log before this
      // showed prompt_tokens/completion_tokens as "not_reported" even on a
      // successful call. `cachedTokens` omitted: Groq's usage object carries
      // no cached-token field to report (unlike Gemini's), so leaving it out
      // reads as "not measured" rather than a fabricated zero.
      const usage = response.usage
        ? { promptTokens: response.usage.prompt_tokens, completionTokens: response.usage.completion_tokens }
        : undefined

      return { text, finishReason, provider: 'groq', usage }
    },

    async healthCheck(): Promise<boolean> {
      try {
        const response = await client.chat.completions.create({
          model,
          messages: [{ role: 'user', content: 'ping' }],
          max_tokens: 5,
        })
        return !!response.choices[0]?.message?.content
      } catch {
        return false
      }
    },
  }
}

/**
 * Recover the completion Groq generated but refused to return.
 *
 * PRODUCTION INCIDENT (Phase 7J, 2026-08-25). Groq answered a normal teaching
 * turn with:
 *
 *   400 tool_use_failed — "Tool choice is none, but model called a tool"
 *   failed_generation: {"name": "assistant", "arguments": <!--MCQ q="Which of
 *     the following is required for total internal reflection to occur?" …
 *     correct="A"--> <!--MCQ q="What is the critical angle for light going from
 *     water (n=1.33) into air (n=1.0)?" … correct="B"-->}
 *
 * This app never sends `tools`, so nothing asked for a tool call: Groq's
 * SERVER-SIDE harmony parser classified the model's own output as one and
 * rejected the whole generation. TWO well-formed MCQs with correct answer keys
 * — exactly the gradeable questions the mastery ladder cannot advance without —
 * were thrown away by the transport, and the turn then fell through to a dead
 * fallback provider and served the learner an outage template.
 *
 * The content was never missing. It is handed back inside the error. So this
 * unwraps the tool-call envelope the model mistakenly emitted and returns the
 * text underneath.
 *
 * WHAT THIS IS NOT. It does not parse, grade, or interpret an MCQ — `mcq.ts`
 * remains the single grading owner and its rules are unchanged. It does not
 * make prose questions acceptable. Salvaged text goes through exactly the same
 * downstream parsing, withholding and gating as text from a 200 response, so a
 * malformed or ungradeable salvage is still refused by the gate contract that
 * already refuses one today.
 */
export function salvageToolUseFailure(err: any): string | null {
  const status = err?.status ?? err?.statusCode ?? 0
  if (status !== 400) return null

  // The SDK surfaces the body in different shapes depending on how it was
  // constructed; check each rather than assuming one.
  const bodies = [err?.error?.error, err?.error, err?.response?.data?.error, err?.body?.error]
  let raw: unknown
  let code: unknown
  for (const b of bodies) {
    if (b && typeof b === 'object') {
      if (raw === undefined && 'failed_generation' in (b as any)) raw = (b as any).failed_generation
      if (code === undefined && 'code' in (b as any)) code = (b as any).code
    }
  }
  if (code !== 'tool_use_failed') return null
  if (typeof raw !== 'string' || raw.trim() === '') return null

  return unwrapToolCallEnvelope(raw)
}

/**
 * Strip the `{"name": …, "arguments": …}` wrapper the model emitted around its
 * real answer. Deliberately literal: if the envelope is not recognised the raw
 * text is returned unchanged rather than guessed at, and an empty result is
 * reported as null so the caller falls back to normal failover.
 */
export function unwrapToolCallEnvelope(raw: string): string | null {
  let text = raw.trim()

  // `{"name": "assistant", "arguments": <payload>}` — the observed shape. The
  // payload is NOT valid JSON (it is the tutor's prose plus MCQ tags), which is
  // why this is a string operation and not JSON.parse.
  const opened = /^\{\s*"name"\s*:\s*"[^"]*"\s*,\s*"arguments"\s*:\s*/.exec(text)
  if (opened) {
    text = text.slice(opened[0].length).trim()
    if (text.endsWith('}')) text = text.slice(0, -1).trim()
    // A payload that WAS quoted as a JSON string keeps its quotes and escapes.
    if (text.startsWith('"') && text.endsWith('"')) {
      try { text = JSON.parse(text) } catch { text = text.slice(1, -1) }
    }
  }

  text = text.trim()
  return text === '' ? null : text
}

export function classifyError(err: any): Error {
  const message = err?.message ?? ''
  const status = err?.status ?? 0

  // P4 (2026-07-26): production evidence showed Groq's daily-token-quota
  // exhaustion ("Rate limit reached... on tokens per day (TPD): Limit
  // 200000, Used 199489...", retry-after ~30min) was misclassified as
  // AIRateLimitError (retryable=true), because the SDK throws
  // Groq.RateLimitError for this case too, and that check ran BEFORE the
  // message-based quota-keyword check below ever had a chance to run — so
  // the keyword check never fired for this exact real error text (it says
  // "tokens per day", not "quota"/"insufficient"). Every request during a
  // TPD exhaustion window (which lasts until Groq's daily reset, never
  // seconds away) then paid for a guaranteed-fail same-provider retry at
  // failoverRouter.ts's 500ms backoff — pure wasted latency, since a daily
  // quota cannot possibly clear in 500ms. Checking the message FIRST, for
  // any 429, fixes this without touching the RPM/TPM burst-limit path
  // (still correctly AIRateLimitError, still correctly retried).
  if (status === 429 || err instanceof Groq.RateLimitError) {
    if (/tokens per day|\bTPD\b|quota|insufficient/i.test(message)) {
      return new AIQuotaError('groq', err)
    }
  }

  if (err instanceof Groq.APIConnectionTimeoutError) return new AITimeoutError('groq', err)
  if (err instanceof Groq.RateLimitError) return new AIRateLimitError('groq', err)
  if (err instanceof Groq.APIConnectionError) return new AINetworkError('groq', err)

  if (message.includes('timeout') || message.includes('timed out') || message.includes('ETIMEDOUT')) {
    return new AITimeoutError('groq', err)
  }
  if (status === 429) {
    return new AIRateLimitError('groq', err)
  }
  if (status >= 500) return new AIServerError('groq', status, err)
  if (message.includes('ECONNREFUSED') || message.includes('ECONNRESET') || message.includes('ENOTFOUND') || message.includes('fetch failed')) {
    return new AINetworkError('groq', err)
  }
  return err
}
