/**
 * ENGLISH VISUAL VALIDATION — FRESHNESS + CLEANLINESS GATE (envelope audit).
 *
 * English serves almost no static figure (only `eng.grammar.nouns`, audited separately): `resolveVisual` returns "no figure" for every other English concept, so nearly every English figure a learner sees is generated at runtime
 * (admitted by `parseVisualSpec` / `payloadBlockers`, cached in production). The served set therefore cannot be enumerated offline. What is audited is the ENVELOPE:
 * the real renderer fed 222 fixture specs (one realistic `process_flow` per English concept built from that concept's own authored wording + 6 worst-case schema-limit
 * specs), rendered in Chromium at 390 / 1280 / column width, dark + light, under the real lesson page's token scope. See scripts/qa/englishVisual/buildFixtures.ts and
 * docs/history/english-visual-validation.md. This gate proves the committed record still describes the fixtures, that nothing failed, and that English has not
 * silently gained a static figure (which would need a real audit: since 2026-10-18 `eng.grammar.nouns` has one, see englishStaticFigureAudit.test.ts).
 */
import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { fixtureFingerprints } from '../../scripts/qa/englishVisual/fingerprint'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'

const SUMMARY = 'docs/qa/english-visual-audit/audit-summary.json'
interface Audit { fingerprints: Record<string, string>; viewports: string[]; themes: string[]; renderScope: string; summary: { fixtures: number; verdicts: Record<string, number>; withMissingRenders: number; renders: number }; concepts: Array<{ id: string; kind: string; verdict: string; fail: number; states: number }> }

describe('English visual audit — the committed envelope audit describes the fixtures', () => {
  it('the committed audit exists', () => {
    expect(existsSync(SUMMARY), `${SUMMARY} missing — run scripts/qa/englishVisual (buildFixtures, renderAudit, validate)`).toBe(true)
  })
  const audit: Audit | null = existsSync(SUMMARY) ? JSON.parse(readFileSync(SUMMARY, 'utf8')) : null

  it('was recorded against the fixtures built today (per fixture)', () => {
    const now = fixtureFingerprints().fingerprints
    const stale = Object.keys(now).filter((id) => audit!.fingerprints[id] !== now[id])
    expect(stale, 'These fixtures changed since the audit: re-render them (renderAudit.ts --redo --concepts <ids>), validate.ts, commit the result (docs/history/english-visual-validation.md).').toEqual([])
    expect(Object.keys(audit!.fingerprints).sort()).toEqual(Object.keys(now).sort())
  })

  it('covers all 216 English concepts and the worst-case envelope specs, each rendered at every viewport and theme', () => {
    const kg = JSON.parse(readFileSync('docs/english/kg/graph.json', 'utf8'))
    const ids: string[] = (Array.isArray(kg) ? kg : (kg.concepts ?? kg.nodes)).map((n: { id: string }) => n.id)
    expect(ids).toHaveLength(216)
    const concept = audit!.concepts.filter((c) => c.kind === 'concept').map((c) => c.id)
    expect([...concept].sort()).toEqual([...ids].sort())
    expect(audit!.concepts.filter((c) => c.kind === 'envelope').length).toBeGreaterThanOrEqual(6)
    expect(audit!.viewports).toEqual(expect.arrayContaining(['mobile', 'desktop', 'desktop-column']))
    expect(audit!.themes).toEqual(expect.arrayContaining(['dark', 'light']))
    expect(audit!.summary.withMissingRenders).toBe(0)
    expect(audit!.renderScope).toBe('lesson')
  })

  it('has no FAIL verdict', () => {
    expect(audit!.concepts.filter((c) => c.verdict === 'FAIL' || c.fail > 0).map((c) => c.id)).toEqual([])
  })

  it('English serves a static figure ONLY for the concepts the static-figure audit covers — any other needs a real audit, not this envelope one', () => {
    const kg = JSON.parse(readFileSync('docs/english/kg/graph.json', 'utf8'))
    const ids: string[] = (Array.isArray(kg) ? kg : (kg.concepts ?? kg.nodes)).map((n: { id: string }) => n.id)
    const served = ids.filter((id) => resolveVisual({ message: 'show me a diagram', lessonConceptId: id, learnerRequest: 'diagram', subject: 'english' } as Parameters<typeof resolveVisual>[0]).graphical)
    const audited = Object.keys((JSON.parse(readFileSync('docs/qa/english-visual-audit/static-figures.json', 'utf8')) as { fingerprints: Record<string, string> }).fingerprints)
    expect(served.filter((id) => !audited.includes(id)), 'these English concepts now serve a static figure that no audit covers: scripts/qa/englishVisual/staticFigures.ts (docs/qa/ENGLISH_VISUAL_VALIDATION.md)').toEqual([])
  }, 120_000)
})
