import type { AICompletionRequest, AICompletionResult, AIProvider } from './types'
import { AIProviderError, AIEmptyResponseError } from './types'
import { recordRequest, recordSuccess, recordFailure, recordFailover } from './metrics'

const RETRY_BACKOFF_MS = 500

export interface FailoverRouterOptions {
  /** Ordered provider chain. providers[0] is primary and is the only tier
   *  that gets a same-provider retry on a retryable error; every provider
   *  after it is a straight one-shot fallback tried in order. */
  providers: AIProvider[]
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
  const { providers } = opts
  if (providers.length === 0) throw new Error('createFailoverRouter requires at least one provider')

  async function tryProvider(provider: AIProvider, req: AICompletionRequest): Promise<AICompletionResult> {
    recordRequest(provider.name)
    const start = Date.now()
    const result = await provider.complete(req)
    recordSuccess(provider.name, Date.now() - start)
    return result
  }

  async function complete(req: AICompletionRequest): Promise<AICompletionResult> {
    let lastErr: any

    for (let i = 0; i < providers.length; i++) {
      const provider = providers[i]
      const isPrimary = i === 0
      try {
        return await tryProvider(provider, req)
      } catch (err: any) {
        recordFailure(provider.name, failureKind(err))
        console.warn(`[ai/router] ${provider.name} failed: ${err.message}`)
        lastErr = err

        // Only the primary (first) tier gets a same-provider retry — every
        // tier after it is a backup already, tried once.
        if (isPrimary && isRetryable(err)) {
          try {
            await new Promise((r) => setTimeout(r, RETRY_BACKOFF_MS))
            const retryReq = err instanceof AIEmptyResponseError
              ? { ...req, maxTokens: Math.max(req.maxTokens * 2, 2048) }
              : req
            return await tryProvider(provider, retryReq)
          } catch (retryErr: any) {
            recordFailure(provider.name, failureKind(retryErr))
            console.warn(`[ai/router] ${provider.name} retry failed: ${retryErr.message}`)
            lastErr = retryErr
          }
        }

        const next = providers[i + 1]
        if (next) {
          recordFailover()
          console.log(`[ai/router] failing over to ${next.name}`)
        }
      }
    }

    console.error(`[ai/router] all providers failed: ${lastErr?.message}`)
    throw lastErr
  }

  async function healthCheck(): Promise<Record<string, boolean>> {
    const results = await Promise.all(providers.map((p) => p.healthCheck()))
    const status: Record<string, boolean> = {}
    providers.forEach((p, i) => { status[p.name] = results[i] })
    return status
  }

  return { complete, healthCheck, providerNames: providers.map((p) => p.name) }
}
