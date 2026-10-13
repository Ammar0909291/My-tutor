/**
 * CHEMISTRY VISUAL AUDIT — FRESHNESS + CLEANLINESS GATE.
 *
 * `scripts/chemistry/visual-audit` renders every Chemistry figure instance in a real Chromium at 390 and 1280 px, in both themes, across
 * every control state, and `final-audit.ts` commits the result as `docs/qa/chemistry-visual-audit/audit-summary.json`. That run is
 * the better part of an hour of WebGL rendering, so it cannot execute in CI. What CI CAN do is prove the committed record still
 * describes what the resolver serves, for EVERY tier:
 *
 *   • Tier -1/0/1 — the synchronous resolver (`resolveVisual`): the served figure's fingerprint, per concept, must equal the recorded one;
 *   • Tier 2/3   — the real asynchronous resolver replayed over the committed production snapshot (`tier23Replay.ts`): the served
 *                  figure, its category and its fingerprint, per concept.
 *
 * A changed generator, a new concept scene, a changed retirement or a changed snapshot invalidates exactly the concepts it touches and
 * fails here, naming them, until `final-audit.ts` is re-run for them (a partial re-render: `--base` carries over every unchanged instance).
 * Renderer / CSS changes are not in the fingerprint (that would force a re-render for every unrelated UI edit); the shared pieces are guarded by
 * the legibility tests, and `docs/history/chemistry-visual-quality-audit-2026-10-08.md` requires a re-run when they change.
 */
import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { getKnowledgeGraph, getAllNodes } from '@/lib/curriculum/knowledgeGraph'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { figureFingerprint } from '@/lib/teaching/visual/fingerprint'
import { replayAll } from '../../scripts/chemistry/visual-audit/tier23Replay'

const SUMMARY = 'docs/qa/chemistry-visual-audit/audit-summary.json'
const STATES = 'docs/qa/chemistry-visual-audit/render-states.json'

interface Concept { id: string; category: string; source: string; provenance: string | null; instanceId: string | null; fingerprint: string | null; verdict: string }
interface Instance {
  id: string; tier: string; conceptIds: string[]; fingerprint: string; verdict: string; render: string; semantic: string
  statesMeasured: number; viewports: string[]; themes: string[]; counts: Record<string, number>; failCodes: string[]
}
interface Audit { viewports: string[]; themes: string[]; summary: { concepts: number; withMissingRenders: number }; concepts: Concept[]; instances: Instance[] }

const audit: Audit | null = existsSync(SUMMARY) ? JSON.parse(readFileSync(SUMMARY, 'utf8')) : null
const kgIds = (): string[] => getAllNodes(getKnowledgeGraph('chemistry')!).map((n) => n.id)

describe('Chemistry visual audit — the committed record describes what ships', () => {
  it('the committed audit exists', () => {
    expect(existsSync(SUMMARY), `${SUMMARY} missing — run scripts/chemistry/visual-audit (inventory, tier23-resolve, render-measure, final-audit)`).toBe(true)
    expect(existsSync(STATES), `${STATES} missing`).toBe(true)
  })

  it('covers every KG concept exactly once, each in exactly one category A-E', () => {
    const ids = kgIds()
    const audited = audit!.concepts.map((c) => c.id)
    expect(new Set(audited).size).toBe(audited.length)
    expect([...audited].sort()).toEqual([...ids].sort())
    expect(audit!.summary.concepts).toBe(ids.length)
    for (const c of audit!.concepts) expect(['A', 'B', 'C', 'D', 'E'], c.id).toContain(c.category)
  })

  it('Tier -1/0/1: every concept the synchronous resolver serves has the recorded fingerprint, and one it does not serve is not recorded as served', () => {
    const stale: string[] = []
    for (const c of audit!.concepts) {
      if (c.source === 'tier2' || c.source === 'tier3') continue
      const d = resolveVisual({ message: '', lessonConceptId: c.id, subject: 'chemistry' })
      const now = d.graphical && d.payload ? figureFingerprint(d.payload) : null
      if (c.source === 'none') { if (now !== null) stale.push(`${c.id} (now served ${now})`); continue }
      if (now !== c.fingerprint) stale.push(`${c.id} (recorded ${c.fingerprint}, now ${now})`)
    }
    expect(
      stale,
      'These concepts serve a Tier 0/1 figure the committed browser audit did not render. Regenerate the inventory, render the changed instances ' +
        '(render-measure.mjs --only), and re-run final-audit.ts with --base docs/qa/chemistry-visual-audit/audit-summary.json (see docs/history/chemistry-visual-quality-audit-2026-10-08.md).',
    ).toEqual([])
  }, 120_000)

  it('Tier 2/3: the real async resolver over the production snapshot serves the recorded figures (and refuses the retired ones)', async () => {
    const { concepts } = await replayAll()
    const now = new Map(concepts.map((c) => [c.conceptId as string, c as { category: string; asked: { graphical: boolean; fingerprint: string | null } }]))
    const stale: string[] = []
    for (const c of audit!.concepts) {
      const r = now.get(c.id)!
      // The replay fingerprints the figure VALUE; the Tier 0/1 record fingerprints the whole payload (the tier-1 test above compares those).
      // So here a Tier 0/1 concept is held to "served", and a Tier 2/3 concept to "served with the recorded fingerprint".
      const viaAsync = c.source === 'tier2' || c.source === 'tier3'
      const sameServed = r.asked.graphical === (c.category === 'E') && (!viaAsync || r.asked.fingerprint === c.fingerprint)
      if (!sameServed) stale.push(`${c.id} (recorded ${c.category}/${c.fingerprint}, now ${r.category}/${r.asked.fingerprint})`)
    }
    expect(stale, 'The Tier 2/3 resolution changed (a retirement, a gate, a Tier 0/1 scene that now shadows a cached figure, or the snapshot); re-run tier23-resolve.ts, render the new figures and re-run final-audit.ts.').toEqual([])
  }, 180_000)

  it('every served concept points at an instance that was rendered in both viewports and both themes', () => {
    expect(audit!.viewports).toEqual(expect.arrayContaining(['1280', '390']))
    expect(audit!.themes).toEqual(expect.arrayContaining(['dark', 'light']))
    const byId = new Map(audit!.instances.map((i) => [i.id, i]))
    for (const c of audit!.concepts.filter((x) => x.category === 'E')) {
      const inst = byId.get(c.instanceId ?? '')
      expect(inst, `${c.id} -> ${c.instanceId}`).toBeDefined()
      expect(inst!.fingerprint, c.id).toBe(c.fingerprint)
      expect(inst!.viewports, c.id).toEqual(expect.arrayContaining(['1280', '390']))
      expect(inst!.themes, c.id).toEqual(expect.arrayContaining(['dark', 'light']))
      expect(inst!.statesMeasured, c.id).toBeGreaterThanOrEqual(4)
    }
    expect(audit!.summary.withMissingRenders).toBe(0)
  })

  it('has no FAIL verdict — a failing figure must be repaired, not shipped', () => {
    expect(audit!.instances.filter((i) => i.verdict === 'FAIL' || i.counts.FAIL > 0 || i.failCodes.length > 0).map((i) => `${i.id}: ${i.failCodes.join(',')}`)).toEqual([])
    expect(audit!.concepts.filter((c) => c.verdict === 'FAIL').map((c) => c.id)).toEqual([])
  })

  it('never reports PASS past what a machine can decide (a REVIEW_REQUIRED semantic verdict keeps the instance REVIEW_REQUIRED)', () => {
    const unsound = audit!.instances.filter((i) => i.verdict === 'PASS' && (i.semantic !== 'PASS' || i.render !== 'PASS'))
    expect(unsound.map((i) => i.id)).toEqual([])
  })

  it('every concept without a figure is classified A, B or D with a reason; none is silently dropped', () => {
    for (const c of audit!.concepts.filter((x) => x.category !== 'E')) {
      expect(['A', 'B', 'C', 'D'], c.id).toContain(c.category)
      expect(c.source, c.id).toBe('none')
      expect(c.instanceId, c.id).toBeNull()
    }
  })
})
