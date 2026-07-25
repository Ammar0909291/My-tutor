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

function classifyError(err: any): Error {
  if (err instanceof Groq.APIConnectionTimeoutError) return new AITimeoutError('groq', err)
  if (err instanceof Groq.RateLimitError) return new AIRateLimitError('groq', err)
  if (err instanceof Groq.APIConnectionError) return new AINetworkError('groq', err)

  const message = err?.message ?? ''
  const status = err?.status ?? 0

  if (message.includes('timeout') || message.includes('timed out') || message.includes('ETIMEDOUT')) {
    return new AITimeoutError('groq', err)
  }
  if (status === 429) {
    if (message.toLowerCase().includes('quota') || message.toLowerCase().includes('insufficient')) {
      return new AIQuotaError('groq', err)
    }
    return new AIRateLimitError('groq', err)
  }
  if (status >= 500) return new AIServerError('groq', status, err)
  if (message.includes('ECONNREFUSED') || message.includes('ECONNRESET') || message.includes('ENOTFOUND') || message.includes('fetch failed')) {
    return new AINetworkError('groq', err)
  }
  return err
}
