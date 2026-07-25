import type { AICompletionRequest, AICompletionResult, AIProvider } from './types'
import { AIProviderError, AIEmptyResponseError } from './types'
import { recordRequest, recordSuccess, recordFailure, recordFailover } from './metrics'

const RETRY_BACKOFF_MS = 500

export interface FailoverRouterOptions {
  primary: AIProvider
  fallback: AIProvider
}

function isRetryable(err: unknown): boolean {
  if (err instanceof AIProviderError) return err.retryable
  return false
}

function failureKind(err: unknown): 'timeout' | 'rateLimit' | 'emptyResponse' | 'error' {
  if (err instanceof AIProviderError) {
    if (err.name === 'AITimeoutError') return 'timeout'
    if (err.name === 'AIRateLimitError' || err.name === 'AIQuotaError') return 'rateLimit'
    if (err.name === 'AIEmptyResponseError') return 'emptyResponse'
  }
  return 'error'
}

export function createFailoverRouter(opts: FailoverRouterOptions) {
  const { primary, fallback } = opts

  async function tryProvider(provider: AIProvider, req: AICompletionRequest): Promise<AICompletionResult> {
    recordRequest(provider.name)
    const start = Date.now()
    const result = await provider.complete(req)
    recordSuccess(provider.name, Date.now() - start)
    return result
  }

  async function complete(req: AICompletionRequest): Promise<AICompletionResult> {
    // 1. Try primary
    try {
      return await tryProvider(primary, req)
    } catch (primaryErr: any) {
      recordFailure(primary.name, failureKind(primaryErr))
      console.warn(`[ai/router] ${primary.name} failed: ${primaryErr.message}`)

      // 2. If retryable, retry primary once with backoff
      if (isRetryable(primaryErr)) {
        try {
          await new Promise((r) => setTimeout(r, RETRY_BACKOFF_MS))

          const retryReq = primaryErr instanceof AIEmptyResponseError
            ? { ...req, maxTokens: Math.max(req.maxTokens * 2, 2048) }
            : req
          return await tryProvider(primary, retryReq)
        } catch (retryErr: any) {
          recordFailure(primary.name, failureKind(retryErr))
          console.warn(`[ai/router] ${primary.name} retry failed: ${retryErr.message}`)
        }
      }

      // 3. Failover to fallback
      recordFailover()
      console.log(`[ai/router] failing over to ${fallback.name}`)
      try {
        return await tryProvider(fallback, req)
      } catch (fallbackErr: any) {
        recordFailure(fallback.name, failureKind(fallbackErr))
        console.error(`[ai/router] ${fallback.name} also failed: ${fallbackErr.message}`)
        throw fallbackErr
      }
    }
  }

  async function healthCheck(): Promise<{ primary: boolean; fallback: boolean }> {
    const [p, f] = await Promise.all([primary.healthCheck(), fallback.healthCheck()])
    return { primary: p, fallback: f }
  }

  return { complete, healthCheck, primaryName: primary.name, fallbackName: fallback.name }
}
