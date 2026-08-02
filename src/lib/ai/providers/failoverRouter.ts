import type { AICompletionRequest, AICompletionResult, AIProvider } from './types'
import { AIProviderError, AIEmptyResponseError } from './types'
import { recordRequest, recordSuccess, recordFailure, recordFailover } from './metrics'

const RETRY_BACKOFF_MS = 500

export interface FailoverRouterOptions {
  /** Ordered provider chain. providers[0] is primary and is the only tier
   *  that gets a same-provider retry on a retryable error; every provider
   *  after it is a straight one-shot fallback tried in order. */
  providers: AIProvider[]
  /**
   * P17 diagnostic (gemini_only isolation): suppress the primary tier's
   * same-provider retry, so a failed attempt returns to the caller
   * immediately rather than costing a second full provider timeout. Default
   * false — the retry behaves exactly as it always has for every normal
   * deployment. See router.ts's isGeminiOnlyMode() for why the isolation
   * window needs it (30s + 30s does not fit a 60s function budget).
   */
  disableSameProviderRetry?: boolean
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
  const { providers, disableSameProviderRetry = false } = opts
  if (providers.length === 0) throw new Error('createFailoverRouter requires at least one provider')

  /**
   * One structured line per provider ATTEMPT — success or failure — emitted
   * from the single place that already wraps every attempt and already
   * measures elapsed time.
   *
   * Why this exists: a production question of the form "show me, per Gemini
   * attempt, the HTTP status / model / latency / tokens / finish reason" was
   * unanswerable from the logs. Every one of those values except finishReason
   * was either measured and discarded (latency, tokens, status) or never
   * captured at all (model). recordSuccess() fed them to an in-process
   * counter that resets on cold start and is unreachable from outside the
   * lambda, so nothing durable ever saw them.
   *
   * Greppable prefix, key=value pairs, one line: `[ai/attempt]`.
   */
  function logAttempt(fields: Record<string, string | number | null | undefined>): void {
    try {
      const body = Object.entries(fields)
        .filter(([, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => `${k}=${v}`)
        .join(' ')
      console.log(`[ai/attempt] ${body}`)
    } catch { /* telemetry never breaks a turn */ }
  }

  /** HTTP status if the provider or SDK surfaced one, else null. */
  function statusOf(err: any): number | null {
    if (err instanceof AIProviderError && typeof err.statusCode === 'number') return err.statusCode
    const raw = err?.status ?? err?.statusCode ?? err?.httpStatusCode
    return typeof raw === 'number' && raw > 0 ? raw : null
  }

  async function tryProvider(provider: AIProvider, req: AICompletionRequest): Promise<AICompletionResult> {
    recordRequest(provider.name)
    const start = Date.now()
    try {
      const result = await provider.complete(req)
      const elapsedMs = Date.now() - start
      recordSuccess(provider.name, elapsedMs, result.usage ?? null)
      logAttempt({
        provider: provider.name,
        model: provider.model,
        outcome: 'ok',
        elapsed_ms: elapsedMs,
        http_status: 200,
        finish_reason: result.finishReason,
        prompt_tokens: result.usage?.promptTokens ?? 'not_reported',
        completion_tokens: result.usage?.completionTokens ?? 'not_reported',
        // Summed only when at least one half was reported, so an unreported
        // call reads 'not_reported' rather than a misleading 0.
        total_tokens: result.usage && (result.usage.promptTokens != null || result.usage.completionTokens != null)
          ? (result.usage.promptTokens ?? 0) + (result.usage.completionTokens ?? 0)
          : 'not_reported',
        chars: result.text.length,
      })
      return result
    } catch (err: any) {
      // Latency on the FAILURE path was never measured before. Without it a
      // timeout cannot be distinguished from an instant rejection, which is
      // exactly the distinction "did the request reach Google?" turns on.
      const elapsedMs = Date.now() - start
      logAttempt({
        provider: provider.name,
        model: provider.model,
        outcome: 'fail',
        elapsed_ms: elapsedMs,
        http_status: statusOf(err) ?? 'none',
        error_name: err?.name ?? 'Error',
        failure_kind: failureKind(err),
        // An attempt that fails in single-digit ms never left the lambda;
        // one that burns the full provider budget did reach the network.
        reached_network: elapsedMs > 250 ? 'likely' : 'unlikely',
        message: JSON.stringify(String(err?.message ?? '').slice(0, 300)),
      })
      throw err
    }
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
        if (isPrimary && isRetryable(err) && !disableSameProviderRetry) {
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
