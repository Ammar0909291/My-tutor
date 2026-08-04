import type { AICompletionRequest, AICompletionResult, AIProvider } from './types'
import {
  AIEmptyResponseError, AINetworkError, AIQuotaError,
  AIRateLimitError, AIServerError, AITimeoutError,
} from './types'

// Timeout budget. YandexGPT is the PRIMARY tier for Russian only, so the whole
// Russian chain has to fit inside `api/learn/chat`'s 60_000 ms maxDuration
// alongside the degraded render:
//   15_000 (yandex) + 20_000 (gemini) + 8_000 (openrouter) + 8_000 (groq)
//     = 51_000 < 60_000
// The same-provider retry is disabled chain-wide (see src/lib/ai/router.ts),
// so this is the true worst case rather than a best case.
const TIMEOUT_MS = 15_000

const COMPLETION_URL = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion'

/**
 * YandexGPT Foundation Models completion provider.
 *
 * Restored (2026-08-04) as a first-class AIProvider rather than as the special
 * case it used to be. The pre-52152a18 implementation called Groq directly from
 * inside its own catch blocks, so it owned a private, hardcoded fallback chain
 * that the failover router could not see, could not measure, and could not
 * reorder. Here it does exactly what every other provider does: attempt once,
 * throw a typed error, and let createFailoverRouter own failover, metrics and
 * telemetry. That is what keeps a single provider-selection authority.
 *
 * Credentials: BOTH YANDEX_API_KEY and YANDEX_FOLDER_ID are required — the
 * folder id is part of the model URI, not just a header, so a key without a
 * folder cannot produce a valid request. router.ts treats "both present" as
 * this provider's configured-key test and drops it from the chain otherwise,
 * exactly as it already does for Gemini/OpenRouter/Groq.
 */
export function createYandexProvider(apiKey: string, folderId: string, model: string): AIProvider {
  const modelUri = `gpt://${folderId}/${model}`

  async function post(body: unknown, timeoutMs: number): Promise<Response> {
    return fetch(COMPLETION_URL, {
      method: 'POST',
      headers: {
        Authorization: `Api-Key ${apiKey}`,
        'x-folder-id': folderId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs),
    })
  }

  return {
    name: 'yandex',
    model,

    async complete(req: AICompletionRequest): Promise<AICompletionResult> {
      let response: Response
      try {
        response = await post(
          {
            modelUri,
            completionOptions: {
              stream: false,
              temperature: req.temperature,
              // The API expects maxTokens as a string.
              maxTokens: String(req.maxTokens),
            },
            messages: [
              { role: 'system', text: req.systemPrompt },
              // History is already windowed by routeAI (MAX_HISTORY_MESSAGES).
              // The old implementation re-sliced to 6 here, silently discarding
              // context the caller had deliberately passed; that is the same
              // truncation defect routeAI documents and fixed, so it is not
              // reproduced.
              ...req.messages.map((m) => ({
                role: m.role === 'user' ? 'user' : 'assistant',
                text: m.content,
              })),
            ],
          },
          TIMEOUT_MS,
        )
      } catch (err: any) {
        throw classifyError(err)
      }

      if (!response.ok) {
        const body = await response.text().catch(() => '')
        throw classifyError({ status: response.status, message: body })
      }

      let data: any
      try {
        data = await response.json()
      } catch (err: any) {
        throw classifyError(err)
      }

      const alternative = data?.result?.alternatives?.[0]
      const text = alternative?.message?.text ?? ''
      const finishReason = alternative?.status ?? null

      if (!text) throw new AIEmptyResponseError('yandex')

      // Yandex reports token counts as STRINGS. Parsed here so the shared
      // metrics/telemetry path receives real numbers; anything unparseable is
      // omitted so it reads "not_reported" rather than a fabricated 0.
      const u = data?.result?.usage
      const promptTokens = toCount(u?.inputTextTokens)
      const completionTokens = toCount(u?.completionTokens)
      const usage = promptTokens !== undefined || completionTokens !== undefined
        ? { promptTokens, completionTokens }
        : undefined

      return { text, finishReason, provider: 'yandex', usage }
    },

    async healthCheck(): Promise<boolean> {
      try {
        const response = await post(
          {
            modelUri,
            completionOptions: { stream: false, temperature: 0, maxTokens: '5' },
            messages: [{ role: 'user', text: 'ping' }],
          },
          5_000,
        )
        if (!response.ok) return false
        const data = await response.json()
        return !!data?.result?.alternatives?.[0]?.message?.text
      } catch {
        return false
      }
    },
  }
}

function toCount(raw: unknown): number | undefined {
  const n = typeof raw === 'string' ? Number(raw) : typeof raw === 'number' ? raw : NaN
  return Number.isFinite(n) ? n : undefined
}

export function classifyError(err: any): Error {
  if (err instanceof AITimeoutError) return err

  const message = String(err?.message ?? '')
  const status = err?.status ?? err?.statusCode ?? 0

  // AbortSignal.timeout() rejects with a DOMException named 'TimeoutError';
  // an aborted fetch surfaces as 'AbortError'. Both mean the same thing here.
  if (err?.name === 'TimeoutError' || err?.name === 'AbortError') {
    return new AITimeoutError('yandex', err)
  }
  if (message.includes('timeout') || message.includes('timed out') || message.includes('ETIMEDOUT')) {
    return new AITimeoutError('yandex', err)
  }
  if (status === 429) {
    // Same distinction Groq's classifier makes: an exhausted allowance cannot
    // clear within a retry backoff, so it must be non-retryable.
    if (/quota|insufficient|limit exceeded/i.test(message)) return new AIQuotaError('yandex', err)
    return new AIRateLimitError('yandex', err)
  }
  if (status >= 500) return new AIServerError('yandex', status, err)
  if (
    message.includes('ECONNREFUSED') || message.includes('ECONNRESET') ||
    message.includes('ENOTFOUND') || message.includes('fetch failed')
  ) {
    return new AINetworkError('yandex', err)
  }
  if (status > 0) {
    // 4xx other than 429 (401 bad key, 403 wrong folder, 400 bad request):
    // real, non-retryable, and must still fail over to the next provider.
    return new AIServerError('yandex', status, err)
  }
  return err
}
