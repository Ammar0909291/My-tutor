import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { isAdmin } from '@/lib/auth/admin'
import { createGeminiProvider } from '@/lib/ai/providers/gemini'
import { resolveGeminiModel } from '@/lib/ai/router'
import { AIProviderError } from '@/lib/ai/providers/types'

/**
 * Gemini connectivity probe — ADMIN ONLY, READ ONLY, DIAGNOSTIC ONLY.
 *
 * THE QUESTION THIS ANSWERS. Production Gemini calls have been failing with
 * elapsed_ms = 30000-30002 and http_status = none: our own timer fires and no
 * HTTP response is ever received. That is consistent with two very different
 * causes and the logs cannot separate them:
 *   (a) connectivity/configuration — the request never gets a response at all
 *   (b) prompt size / model latency — the ~8k-token teaching prompt is simply
 *       too slow for the 30s cap, while the endpoint itself is healthy
 * A one-word prompt on the identical stack discriminates them outright: if
 * "ping" also hangs to 30s it is (a); if "ping" returns quickly it is (b).
 *
 * IDENTICAL TO PRODUCTION BY CONSTRUCTION — this is the whole point, so each
 * axis is spelled out:
 *   API key   process.env.GEMINI_API_KEY, the same variable the router reads
 *   model     resolveGeminiModel(process.env.GEMINI_MODEL) — the SAME exported
 *             resolver, so a stale gemini-2.5-* override is rejected here
 *             exactly as it is in production
 *   SDK       createGeminiProvider(), the same factory the router calls
 *   timeout   the provider's own TIMEOUT_MS (30s) — inherited, not restated
 *   region    inherent: this route runs in the same Vercel region as the
 *             teaching routes
 * The ONLY difference from a teaching turn is the prompt body. That is the
 * variable under test.
 *
 * WHY NOT JUST healthCheck(). The provider does expose healthCheck(), and it
 * is called here — but it cannot answer this question on its own: it returns a
 * bare boolean, swallows the error, and uses a hardcoded 5s cap rather than
 * production's 30s. It cannot report HTTP status, finish reason or an error
 * body, which is exactly what is being asked for. So this route runs BOTH: the
 * real complete() call at production settings for the detail, and healthCheck()
 * alongside it, which as a 5s probe is itself a useful second data point.
 *
 * TOUCHES NOTHING. No routing change, no provider mutation, no shared state,
 * no writes. It constructs its own provider instance and discards it.
 */
export const dynamic = 'force-dynamic'

const PROBE_PROMPT = 'ping'

interface ProbeResult {
  probe: string
  ok: boolean
  startedAt: string
  elapsedMs: number
  httpStatus: number | null
  finishReason: string | null
  model: string
  promptTokens: number | null
  completionTokens: number | null
  errorName: string | null
  errorBody: string | null
  textPreview: string | null
}

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!(await isAdmin(session.user.id))) {
    // TEMPORARY DIAGNOSTIC (remove once admin access is settled).
    // isAdmin() reads users.role and returns a bare boolean, so a 403 cannot
    // distinguish "no session reached the route", "wrong user id", "row
    // missing" and "role is STUDENT". This line names which one it is.
    // Verified 2026-08-02: every one of the 20 rows in users is STUDENT — the
    // database contains no ADMIN at all — so this endpoint 403s for everyone.
    // No secret is logged: id and email identify the caller, role is a public
    // enum. The session token, API keys and password hashes are never touched.
    let dbRole: string | null = null
    let rowFound = false
    try {
      const { prisma } = await import('@/lib/db/prisma')
      const row = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true, email: true },
      })
      rowFound = !!row
      dbRole = row?.role ?? null
    } catch (err) {
      dbRole = `lookup_failed:${err instanceof Error ? err.name : 'unknown'}`
    }
    console.warn(
      '[admin/gemini-probe] 403 —' +
      ` session_user_id=${session.user.id}` +
      ` session_email=${session.user.email ?? 'none'}` +
      ` user_row_found=${rowFound}` +
      ` db_role=${dbRole ?? 'none'}` +
      ` expected_role=ADMIN` +
      ` admin_emails_configured=${(process.env.ADMIN_EMAILS ?? '').length > 0}`,
    )
    return NextResponse.json({
      error: 'Forbidden',
      diagnostic: {
        sessionUserId: session.user.id,
        sessionEmail: session.user.email ?? null,
        userRowFound: rowFound,
        dbRole,
        expectedRole: 'ADMIN',
        adminEmailsConfigured: (process.env.ADMIN_EMAILS ?? '').length > 0,
        note: 'Role is read from users.role by isAdmin(). ADMIN_EMAILS only promotes at first sign-in via maybeBootstrapAdmin(); it is not consulted per request.',
      },
    }, { status: 403 })
  }

  const model = resolveGeminiModel(process.env.GEMINI_MODEL)
  const apiKey = process.env.GEMINI_API_KEY ?? ''
  const provider = createGeminiProvider(apiKey, model)

  // ── Probe 1: a real completion at production settings ──────────────────
  const startedAt = new Date()
  const t0 = Date.now()
  const result: ProbeResult = {
    probe: 'complete',
    ok: false,
    startedAt: startedAt.toISOString(),
    elapsedMs: 0,
    httpStatus: null,
    finishReason: null,
    model,
    promptTokens: null,
    completionTokens: null,
    errorName: null,
    errorBody: null,
    textPreview: null,
  }

  try {
    const completion = await provider.complete({
      messages: [{ role: 'user', content: PROBE_PROMPT }],
      systemPrompt: 'Reply with a single word.',
      maxTokens: 16,
      temperature: 0,
    })
    result.elapsedMs = Date.now() - t0
    result.ok = true
    result.httpStatus = 200
    result.finishReason = completion.finishReason
    result.promptTokens = completion.usage?.promptTokens ?? null
    result.completionTokens = completion.usage?.completionTokens ?? null
    result.textPreview = completion.text.slice(0, 120)
  } catch (err: any) {
    result.elapsedMs = Date.now() - t0
    result.errorName = err?.name ?? 'Error'
    result.httpStatus =
      err instanceof AIProviderError && typeof err.statusCode === 'number'
        ? err.statusCode
        : (typeof err?.status === 'number' ? err.status : null)
    // The FULL message, not a summary: for a Google API error this is where
    // the reason lives ("API key not valid", "quota", "billing", the model
    // name on a 404). Capped only to keep one log line sane.
    result.errorBody = String(err?.message ?? '').slice(0, 1000)
  }

  // ── Probe 2: the provider's own healthCheck (5s cap, boolean) ──────────
  const h0 = Date.now()
  let healthOk = false
  let healthError: string | null = null
  try {
    healthOk = await provider.healthCheck()
  } catch (err: any) {
    healthError = String(err?.message ?? '').slice(0, 300)
  }
  const healthElapsedMs = Date.now() - h0

  // One greppable line per probe, matching the [ai/attempt] convention so both
  // can be read side by side in the same log stream.
  console.log(
    `[ai/probe] probe=complete model=${model} ok=${result.ok}` +
    ` started_at=${result.startedAt} elapsed_ms=${result.elapsedMs}` +
    ` http_status=${result.httpStatus ?? 'none'}` +
    ` finish_reason=${result.finishReason ?? 'none'}` +
    ` prompt_tokens=${result.promptTokens ?? 'not_reported'}` +
    ` completion_tokens=${result.completionTokens ?? 'not_reported'}` +
    ` error_name=${result.errorName ?? 'none'}` +
    ` error_body=${JSON.stringify(result.errorBody ?? '')}`,
  )
  console.log(
    `[ai/probe] probe=healthcheck model=${model} ok=${healthOk}` +
    ` elapsed_ms=${healthElapsedMs} error=${JSON.stringify(healthError ?? '')}`,
  )

  return NextResponse.json({
    // Never the key itself — only whether one is present and its shape, which
    // is what distinguishes "unset" from "set but rejected".
    keyConfigured: apiKey.length > 0,
    keyLength: apiKey.length,
    model,
    providerModel: provider.model ?? null,
    complete: result,
    healthCheck: { ok: healthOk, elapsedMs: healthElapsedMs, error: healthError },
    // Stated inline so the reading does not depend on remembering the design.
    interpretation: result.ok
      ? 'Gemini answered a minimal prompt on the production stack. Connectivity, key, model and region are all fine — the 30s production timeouts are therefore prompt size or model latency, not configuration.'
      : result.elapsedMs >= 29_000
        ? 'A one-word prompt ALSO hung to the full timeout with no HTTP response. That rules out prompt size: the fault is connectivity or the key/project, not the tutoring prompt.'
        : 'The probe failed FAST rather than hanging — read httpStatus and errorBody: a fast failure is an auth, quota, billing or model error, all of which are configuration, not latency.',
  })
}
