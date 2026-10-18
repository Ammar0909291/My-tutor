/**
 * ENGLISH STATIC-FIGURE AUDIT — FRESHNESS + CLEANLINESS GATE.
 *
 * `eng.grammar.nouns` is the first English concept served a figure of its own (a registry scene; every other English figure is generated at
 * runtime and covered by the envelope audit, englishVisualAudit.test.ts). The figure a learner is served was rendered in Chromium at 390 px
 * (dark + light), 1280 px and the 50/50 column under the real lesson token scope (scripts/qa/englishVisual/staticFigures.ts) and the shared
 * figure-audit rules applied. This gate fails, naming the concept, when the served figure differs from the audited one, when an English concept
 * serves a static figure the audit does not cover, when a render is missing, or when any verdict is FAIL or the semantic evidence is missing.
 */
import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { staticFigureFingerprints } from '../../scripts/qa/englishVisual/staticFingerprint'

const RECORD = 'docs/qa/english-visual-audit/static-figures.json'
interface Row { id: string; verdict: string; semantic: string; evidence: string[]; fail: number; missing: string[]; byViewport: Record<string, string> }
interface Audit { fingerprints: Record<string, string>; viewports: string[]; themes: string[]; renderScope: string; summary: { concepts: number; withMissingRenders: number }; concepts: Row[] }

describe('English static-figure audit — the committed record describes the figures served today', () => {
  it('the committed audit exists', () => {
    expect(existsSync(RECORD), `${RECORD} missing — run scripts/qa/englishVisual/staticFigures.ts`).toBe(true)
  })
  const audit: Audit = JSON.parse(readFileSync(RECORD, 'utf8'))

  it('covers exactly the English concepts that serve a static figure, and each served figure is the one that was audited', () => {
    const now = staticFigureFingerprints().fingerprints
    expect(Object.keys(now).sort()).toEqual(audit.concepts.map((c) => c.id).sort())
    const stale = Object.keys(now).filter((id) => audit.fingerprints[id] !== now[id])
    expect(stale, 'These served figures changed since the audit: re-render them (staticFigures.ts), commit docs/qa/english-visual-audit/static-figures.json').toEqual([])
    expect(Object.keys(audit.fingerprints).sort()).toEqual(Object.keys(now).sort())
  }, 120_000)   // resolves all 216 English concepts

  it('rendered every figure at every viewport and theme under the lesson token scope', () => {
    expect(audit.viewports).toEqual(expect.arrayContaining(['mobile', 'desktop', 'desktop-column']))
    expect(audit.themes).toEqual(expect.arrayContaining(['dark', 'light']))
    expect(audit.renderScope).toBe('lesson')
    expect(audit.summary.withMissingRenders).toBe(0)
    for (const c of audit.concepts) expect(c.missing, c.id).toEqual([])
  })

  it('has no FAIL, and every figure is PASS on every viewport with deterministic semantic evidence', () => {
    for (const c of audit.concepts) {
      expect(c.fail, c.id).toBe(0)
      expect(c.verdict, c.id).toBe('PASS')
      for (const [vp, v] of Object.entries(c.byViewport)) expect(v, `${c.id} ${vp}`).toBe('PASS')
      expect(c.semantic, c.id).toBe('PASS')
      expect(c.evidence, `${c.id} names no content test`).toContain('englishStaticFigureContent.test.ts')
    }
  })
})
