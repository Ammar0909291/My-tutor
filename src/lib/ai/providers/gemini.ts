import { GoogleGenerativeAI } from '@google/generative-ai'
import type { AICompletionRequest, AICompletionResult, AIProvider } from './types'
import {
  AIEmptyResponseError, AINetworkError, AIQuotaError,
  AIRateLimitError, AIServerError, AITimeoutError,
} from './types'

const TIMEOUT_MS = 30_000

export function createGeminiProvider(apiKey: string, model: string): AIProvider {
  const client = new GoogleGenerativeAI(apiKey)

  return {
    name: 'gemini',

    async complete(req: AICompletionRequest): Promise<AICompletionResult> {
      const gen = client.getGenerativeModel({
        model,
        systemInstruction: req.systemPrompt,
        generationConfig: {
          maxOutputTokens: req.maxTokens,
          temperature: req.temperature,
        },
      })

      const contents = req.messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }))

      let result
      try {
        result = await Promise.race([
          gen.generateContent({ contents }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new AITimeoutError('gemini')), TIMEOUT_MS),
          ),
        ])
      } catch (err: any) {
        throw classifyError(err)
      }

      const text = result.response?.text?.() ?? ''
      const finishReason = result.response?.candidates?.[0]?.finishReason ?? null

      if (!text) throw new AIEmptyResponseError('gemini')

      return { text, finishReason, provider: 'gemini' }
    },

    async healthCheck(): Promise<boolean> {
      try {
        const gen = client.getGenerativeModel({ model })
        const result = await Promise.race([
          gen.generateContent({ contents: [{ role: 'user', parts: [{ text: 'ping' }] }] }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('health timeout')), 5_000),
          ),
        ])
        return !!result.response?.text?.()
      } catch {
        return false
      }
    },
  }
}

function classifyError(err: any): Error {
  if (err instanceof AITimeoutError) return err

  const message = err?.message ?? ''
  const status = err?.status ?? err?.statusCode ?? err?.httpStatusCode ?? 0

  if (message.includes('timeout') || message.includes('timed out') || message.includes('ETIMEDOUT')) {
    return new AITimeoutError('gemini', err)
  }
  if (status === 429) {
    if (message.toLowerCase().includes('quota')) return new AIQuotaError('gemini', err)
    return new AIRateLimitError('gemini', err)
  }
  if (status >= 500) return new AIServerError('gemini', status, err)
  if (message.includes('ECONNREFUSED') || message.includes('ECONNRESET') || message.includes('ENOTFOUND') || message.includes('fetch failed')) {
    return new AINetworkError('gemini', err)
  }
  return err
}
