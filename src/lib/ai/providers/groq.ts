import Groq from 'groq-sdk'
import type { AICompletionRequest, AICompletionResult, AIProvider } from './types'
import {
  AIEmptyResponseError, AINetworkError, AIQuotaError,
  AIRateLimitError, AIServerError, AITimeoutError,
} from './types'

const TIMEOUT_MS = 30_000

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
        throw classifyError(err)
      }

      const text = response.choices[0]?.message?.content ?? ''
      const finishReason = response.choices[0]?.finish_reason ?? null

      if (!text) throw new AIEmptyResponseError('groq')

      return { text, finishReason, provider: 'groq' }
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
