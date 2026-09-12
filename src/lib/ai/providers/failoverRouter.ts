import type { AICompletionRequest, AICompletionResult, AIProvider } from './types'
import { AIProviderError, AIEmptyResponseError } from './types'
import { recordRequest, recordSuccess, recordFailure, recordFailover } from './metrics'

const RETRY_BACKOFF_MS = 500

/**
 * PCD-002 — THE CHAIN COULD OUTLIVE THE FUNCTION THAT CALLS IT.
 *
 * ── THE ARITHMETIC, FROM THIS REPOSITORY'S OWN CONSTANTS ────────────────────
 * `vercel.json` gives `/api/learn/chat` a `maxDuration` of 60s. The provider
 * timeouts are gemini 20s, yandex 15s, groq 8s, openrouter 8s, and the primary
 * tier gets one same-provider retry after a 500 ms backoff. So:
 *
 *   default chain  groq 8 + 0.5 + groq 8 + gemini 20 + openrouter 8  = 44.5s
 *   russian chain  yandex 15 + 0.5 + yandex 15 + gemini 20
 *                    + openrouter 8 + groq 8                          = 66.5s
 *
 * The Russian chain exceeds the function's entire budget on its own, before a
 * single database read, and the default chain leaves 15.5s for everything else
 * the turn does — session load, snapshot CAS, asset assembly, evidence writes,
 * message persistence, and a visual pipeline that carries its own 9s deadline.
 *
 * ── WHY A try/catch COULD NOT SAVE IT ───────────────────────────────────────
 * The route already prepares a degraded template for exactly this case, and
 * `router.ts` deliberately does NOT swallow a timeout so the caller can serve
 * it. None of that runs when the PLATFORM kills the invocation: there is no
 * exception to catch, the lambda is gone, and the learner gets a raw 504
 * `FUNCTION_INVOCATION_TIMEOUT` page with the session ended — which is what
 * PCD-002 recorded.
 *
 * ── THE BOUND ───────────────────────────────────────────────────────────────
 * The chain now carries a wall-clock deadline and stops when it cannot afford
 * another attempt, so the route gets control back with time to serve the
 * degraded template it already has. Each attempt is additionally raced against
 * the REMAINING budget, so one slow provider cannot overshoot by its own
 * timeout — that is the difference between bounding the chain and merely
 * checking the clock between tiers.
 *
 * 45s leaves 15s of the 60s budget for persistence and the response. It is the
 * chain that is bounded, never a single provider's own timeout, so a healthy
 * fast path is completely unaffected: the deadline can only fire on a turn that
 * was already going to fail.
 */
export const AI_CHAIN_DEADLINE_MS = Number(process.env.AI_CHAIN_DEADLINE_MS ?? 45_000)

/** Below this there is no point starting another provider. */
const MIN_ATTEMPT_MS = 1_000

/** Thrown when the chain runs out of wall clock. Retryable: nothing is wrong
 *  with the providers, the TURN ran out of time. */
export class AIChainDeadlineError extends AIProviderError {
  constructor(elapsedMs: number, triedProviders: string[]) {
    super(
      `AI chain deadline exceeded after ${elapsedMs}ms (tried: ${triedProviders.join(', ') || 'none'})`,
      'chain',
      undefined,
      true,
    )
    this.name = 'AIChainDeadlineError'
  }
}

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
  /**
   * PCD-002: wall-clock budget for the WHOLE chain, defaulting to
   * AI_CHAIN_DEADLINE_MS. Injectable so tests can bound a chain in
   * milliseconds instead of waiting out real provider timeouts.
   */
  deadlineMs?: number
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
  const { providers, disableSameProviderRetry = false, deadlineMs = AI_CHAIN_DEADLINE_MS } = opts
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
        // 0 is a real, meaningful answer here (cache did not fire), so it must
        // survive logAttempt's empty-value filter — hence the explicit String().
        cached_tokens: result.usage?.cachedTokens != null
          ? String(result.usage.cachedTokens) : 'not_reported',
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

    // PCD-002. One wall clock for the whole chain — see AI_CHAIN_DEADLINE_MS.
    const chainStart = Date.now()
    const tried: string[] = []
    const remainingMs = () => deadlineMs - (Date.now() - chainStart)
    const outOfTime = () => remainingMs() < MIN_ATTEMPT_MS

    /**
     * Race one attempt against what is LEFT of the chain's budget, not against
     * the provider's own timeout. Checking the clock only between tiers would
     * still let the last attempt started overshoot by its full timeout (20s for
     * gemini), which is precisely the overshoot that kills the invocation.
     *
     * The losing provider promise is abandoned, not cancelled — these clients
     * take no AbortSignal. That is sound here: the lambda returns immediately
     * afterwards and the orphan dies with it, and the alternative is the
     * platform killing the whole invocation instead.
     */
    const attemptWithinBudget = async (p: AIProvider, r: AICompletionRequest) => {
      const budget = remainingMs()
      let timer: ReturnType<typeof setTimeout> | undefined
      try {
        return await Promise.race([
          tryProvider(p, r),
          new Promise<never>((_, reject) => {
            timer = setTimeout(
              () => reject(new AIChainDeadlineError(Date.now() - chainStart, tried)),
              Math.max(budget, 0),
            )
          }),
        ])
      } finally {
        if (timer) clearTimeout(timer)
      }
    }

    for (let i = 0; i < providers.length; i++) {
      const provider = providers[i]
      const isPrimary = i === 0

      if (outOfTime()) {
        const err = new AIChainDeadlineError(Date.now() - chainStart, tried)
        console.error(
          `[ai/router] ${JSON.stringify({
            event: 'chain-deadline', elapsed_ms: Date.now() - chainStart,
            deadline_ms: deadlineMs, tried, skipped: provider.name,
          })}`,
        )
        throw lastErr ?? err
      }
      tried.push(provider.name)

      try {
        return await attemptWithinBudget(provider, req)
      } catch (err: any) {
        recordFailure(provider.name, failureKind(err))
        console.warn(`[ai/router] ${provider.name} failed: ${err.message}`)
        lastErr = err

        // Only the primary (first) tier gets a same-provider retry — every
        // tier after it is a backup already, tried once.
        // The same-provider retry is a SECOND full provider timeout, so it is
        // also budgeted — it is the single largest avoidable cost in the chain.
        if (isPrimary && isRetryable(err) && !disableSameProviderRetry
            && remainingMs() > RETRY_BACKOFF_MS + MIN_ATTEMPT_MS) {
          try {
            await new Promise((r) => setTimeout(r, RETRY_BACKOFF_MS))
            const retryReq = err instanceof AIEmptyResponseError
              ? { ...req, maxTokens: Math.max(req.maxTokens * 2, 2048) }
              : req
            return await attemptWithinBudget(provider, retryReq)
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
