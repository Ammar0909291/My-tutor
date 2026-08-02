import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * TEMPORARY diagnostic — Gemini integration investigation (2026-08-01).
 * Delete before merging to main. Token-gated so it is not publicly usable.
 *
 * Answers two questions that cannot be answered from outside the deployment:
 *   1. Which model ids does this deployment's GEMINI_API_KEY actually expose?
 *   2. Does the currently-configured GEMINI_MODEL succeed or fail, and with what?
 */
// One-off gate token for this throwaway preview-only route (no env var to set).
const DIAG_TOKEN = 'g7m-2f91c4ae6b0d47'

export async function GET(req: Request) {
  const url = new URL(req.url)
  if (url.searchParams.get('token') !== DIAG_TOKEN) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  const key = process.env.GEMINI_API_KEY ?? ''
  const configured = process.env.GEMINI_MODEL ?? 'gemini-2.5-flash-lite'

  const out: Record<string, unknown> = {
    keyPresent: key !== '',
    keyLength: key.length,
    configuredModel: configured,
    groqKeyPresent: (process.env.GROQ_API_KEY ?? '') !== '',
    openrouterKeyPresent: (process.env.OPENROUTER_API_KEY ?? '') !== '',
  }

  // 1. ListModels — the authoritative list for this key.
  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}&pageSize=200`,
    )
    const body: any = await r.json()
    out.listModelsStatus = r.status
    if (Array.isArray(body?.models)) {
      out.availableModels = body.models
        .filter((m: any) => (m.supportedGenerationMethods ?? []).includes('generateContent'))
        .map((m: any) => m.name?.replace(/^models\//, ''))
    } else {
      out.listModelsError = body?.error ?? body
    }
  } catch (e: any) {
    out.listModelsThrew = e?.message ?? String(e)
  }

  // 2. Probe candidate model ids with a real generateContent call.
  const candidates = [
    configured,
    'gemini-3.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-3-flash-lite',
    'gemini-flash-lite-latest',
  ]
  const probes: Record<string, unknown> = {}
  for (const model of Array.from(new Set(candidates))) {
    try {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'Say OK.' }] }] }),
        },
      )
      const body: any = await r.json()
      probes[model] = {
        status: r.status,
        ok: r.ok,
        text: body?.candidates?.[0]?.content?.parts?.[0]?.text ?? null,
        error: body?.error ? { code: body.error.code, status: body.error.status, message: body.error.message } : null,
      }
    } catch (e: any) {
      probes[model] = { threw: e?.message ?? String(e) }
    }
  }
  out.probes = probes

  return NextResponse.json(out)
}
