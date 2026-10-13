/**
 * MATHEMATICS VISUAL AUDIT — FRESHNESS + CLEANLINESS GATE.
 *
 * The browser audit (scripts/qa/mathVisual) renders every Mathematics concept that serves a figure in a real Chromium at 390 px and desktop widths,
 * in both themes, and records a verdict per concept. That run is hours of software-WebGL rendering, so it cannot execute in CI. What CI CAN do
 * is prove that the committed verdicts still describe what the resolver serves:
 *
 *   • the fingerprint of EACH concept's served payload / provenance / scope matches the one the audit recorded — a changed figure, generator
 *     parameter or new concept invalidates the committed verdict for exactly those concepts and fails here, naming them, until they are
 *     re-rendered (a partial re-audit: scripts/qa/physicsVisual/merge-audit.ts is shared; no full re-render needed);
 *   • every figure-serving concept has a verdict, and no concept is FAIL.
 *
 * Renderer / CSS changes are not in the fingerprint (that would force a re-render for every unrelated UI edit); the shared pieces are guarded by
 * their own tests and docs/history/mathematics-visual-render-audit.md requires a re-run when they change. Mathematics-only: the Physics, Chemistry
 * and Biology gates are untouched.
 */
import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { servedFingerprints, mathematicsConceptIds } from '../../scripts/qa/mathVisual/fingerprint'

const SUMMARY = 'docs/qa/mathematics-visual-audit/audit-summary.json'

interface Compact {
  fingerprint: string
  fingerprints: Record<string, string>
  viewports: string[]
  themes: string[]
  summary: { concepts: number; verdicts: Record<string, number>; withMissingRenders: number }
  concepts: Array<{ id: string; verdict: string; fail: number; semantic: string; dims: Record<string, string> }>
}

describe('Mathematics visual audit — committed verdicts describe what ships', () => {
  it('the committed audit exists', () => {
    expect(existsSync(SUMMARY), `${SUMMARY} missing — run scripts/qa/mathVisual/renderAudit.ts then validate.ts`).toBe(true)
  })

  const audit: Compact | null = existsSync(SUMMARY) ? JSON.parse(readFileSync(SUMMARY, 'utf8')) : null

  it('was recorded against the figures the resolver serves today (per concept)', () => {
    expect(audit).not.toBeNull()
    const now = servedFingerprints().fingerprints
    const stale = Object.keys(now).filter((id) => audit!.fingerprints[id] !== now[id])
    expect(
      stale,
      'These concepts serve a figure (payload, provenance or scope) that the committed browser audit did not render. Render just them: ' +
        'renderAudit.ts --out <dir> --concepts <ids>, then validate.ts --in <dir> --out <dir2>, then scripts/qa/physicsVisual/merge-audit.ts ' +
        '--base docs/qa/mathematics-visual-audit/audit-summary.json --update <dir2>/audit-summary.json --out docs/qa/mathematics-visual-audit/audit-summary.json, ' +
        'and commit the result (see docs/history/mathematics-visual-render-audit.md).',
    ).toEqual([])
  }, 120_000)

  it('covers every concept that serves a figure exactly once, and nothing else', () => {
    const ids = mathematicsConceptIds()
    expect(Object.keys(audit!.fingerprints).sort()).toEqual([...ids].sort())
    const graphical = ids.filter((id) => resolveVisual({ message: 'show me a diagram', lessonConceptId: id, learnerRequest: 'diagram', subject: 'mathematics' } as Parameters<typeof resolveVisual>[0]).graphical)
    const audited = audit!.concepts.map((c) => c.id)
    expect(new Set(audited).size).toBe(audited.length)
    expect([...audited].sort()).toEqual([...graphical].sort())
    expect(audit!.summary.concepts).toBe(graphical.length)
  }, 120_000)

  it('rendered both a phone and a desktop viewport, in both themes', () => {
    expect(audit!.viewports).toEqual(expect.arrayContaining(['mobile', 'desktop', 'desktop-column']))
    expect(audit!.themes).toEqual(expect.arrayContaining(['dark', 'light']))
  })

  it('left no concept without a render', () => {
    expect(audit!.summary.withMissingRenders).toBe(0)
  })

  it('has no FAIL verdict — a failing figure must be repaired, not shipped', () => {
    const failing = audit!.concepts.filter((c) => c.verdict === 'FAIL' || c.fail > 0).map((c) => c.id)
    expect(failing).toEqual([])
  })

  it('never reports PASS for a dimension a machine cannot decide (semantics stays REVIEW_REQUIRED unless a deterministic assertion covers the figure)', () => {
    const unsound = audit!.concepts.filter((c) => c.verdict === 'PASS' && !['PASS', 'REVIEW_REQUIRED'].includes(c.semantic))
    expect(unsound.map((c) => c.id)).toEqual([])
  })
})
