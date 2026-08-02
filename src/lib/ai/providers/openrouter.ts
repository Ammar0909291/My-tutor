import OpenAI from 'openai'
import type { AICompletionRequest, AICompletionResult, AIProvider } from './types'
import {
  AIEmptyResponseError, AINetworkError, AIQuotaError,
  AIRateLimitError, AIServerError, AITimeoutError,
} from './types'

// SEV-1 (2026-08-02) timeout budget — fallback tier. Same reasoning as
// src/lib/ai/providers/groq.ts: capped at 8_000 so the full chain fits inside
// `api/learn/chat`'s 60_000 ms maxDuration.
const TIMEOUT_MS = 8_000

export function createOpenRouterProvider(apiKey: string, model: string): AIProvider {
  const client = new OpenAI({
    apiKey,
    baseURL: 'https://openrouter.ai/api/v1',
    timeout: TIMEOUT_MS,
    maxRetries: 0,
    defaultHeaders: { 'HTTP-Referer': 'https://mytutor.app', 'X-Title': 'My Tutor' },
  })

  return {
    name: 'openrouter',
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

      if (!text) throw new AIEmptyResponseError('openrouter')

      return { text, finishReason, provider: 'openrouter' }
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
  const message = err?.message ?? ''
  const status = err?.status ?? err?.statusCode ?? 0

  if (err instanceof OpenAI.APIConnectionTimeoutError || message.includes('timeout') || message.includes('timed out') || message.includes('ETIMEDOUT')) {
    return new AITimeoutError('openrouter', err)
  }
  if (status === 429) {
    if (message.toLowerCase().includes('quota') || message.toLowerCase().includes('insufficient')) {
      return new AIQuotaError('openrouter', err)
    }
    return new AIRateLimitError('openrouter', err)
  }
  if (status >= 500) return new AIServerError('openrouter', status, err)
  if (err instanceof OpenAI.APIConnectionError || message.includes('ECONNREFUSED') || message.includes('ECONNRESET') || message.includes('ENOTFOUND') || message.includes('fetch failed')) {
    return new AINetworkError('openrouter', err)
  }
  return err
}
