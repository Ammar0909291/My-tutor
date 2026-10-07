/**
 * PHYSICS VISUAL AUDIT — FRESHNESS + CLEANLINESS GATE.
 *
 * The browser audit (scripts/qa/physicsVisual) renders every Physics concept in
 * a real Chromium at 390px and desktop width, in both themes, drives every
 * slider extreme, and records a verdict per concept. That run is hours of
 * rendering, so it cannot execute in CI. What CI CAN do is prove that the
 * committed verdicts still describe what the resolver serves:
 *
 *   • the fingerprint of every served payload / provenance / scope matches the
 *     one the audit recorded — a changed figure, generator parameter or concept
 *     list after the last render invalidates the committed verdicts and fails
 *     here until the audit is re-run;
 *   • every concept in the KG has a verdict, and no concept is FAIL.
 *
 * Renderer changes are not in the fingerprint (that would force a re-render for
 * every unrelated UI edit); the shared pieces are guarded by
 * physicsVisualReadability.test.ts and the history doc requires a re-run.
 */
import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { servedFingerprint, physicsConceptIds } from '../../scripts/qa/physicsVisual/fingerprint'

const SUMMARY = 'docs/qa/physics-visual-audit/audit-summary.json'

interface Compact {
  fingerprint: string
  viewports: string[]
  themes: string[]
  summary: { concepts: number; verdicts: Record<string, number>; withMissingRenders: number }
  concepts: Array<{ id: string; verdict: string; fail: number; dims: Record<string, string> }>
}

describe('Physics visual audit — committed verdicts describe what ships', () => {
  it('the committed audit exists', () => {
    expect(existsSync(SUMMARY), `${SUMMARY} missing — run scripts/qa/physicsVisual/render.ts then validate.ts`).toBe(true)
  })

  const audit: Compact | null = existsSync(SUMMARY) ? JSON.parse(readFileSync(SUMMARY, 'utf8')) : null

  it('was recorded against the figures the resolver serves today', () => {
    expect(audit).not.toBeNull()
    expect(
      servedFingerprint().fingerprint,
      'A served physics figure, its provenance/scope, or the concept list changed after the last browser audit. ' +
        'Re-render (render.ts) and re-validate (validate.ts), then commit the new audit-summary.json.',
    ).toBe(audit!.fingerprint)
  }, 120_000)

  it('covers every KG concept exactly once', () => {
    const ids = physicsConceptIds()
    const audited = audit!.concepts.map((c) => c.id)
    expect(new Set(audited).size).toBe(audited.length)
    expect([...audited].sort()).toEqual([...ids].sort())
    expect(audit!.summary.concepts).toBe(ids.length)
  })

  it('rendered both a phone and a desktop viewport, in both themes', () => {
    expect(audit!.viewports).toEqual(expect.arrayContaining(['mobile', 'desktop-column']))
    expect(audit!.themes).toEqual(expect.arrayContaining(['dark', 'light']))
  })

  it('left no concept without a render', () => {
    expect(audit!.summary.withMissingRenders).toBe(0)
  })

  it('has no FAIL verdict — a failing figure must be repaired, not shipped', () => {
    const failing = audit!.concepts.filter((c) => c.verdict === 'FAIL' || c.fail > 0).map((c) => c.id)
    expect(failing).toEqual([])
  })

  it('never reports PASS for a dimension a machine cannot decide (semantics stays REVIEW_REQUIRED unless proven)', () => {
    const unsound = audit!.concepts.filter((c) => c.verdict === 'PASS' && !['PASS', 'REVIEW_REQUIRED'].includes(c.dims.semantic))
    expect(unsound.map((c) => c.id)).toEqual([])
  })
})
