/**
 * MATHEMATICS — CARD-HOST LABEL-DISPLACEMENT BACKLOG (batches 1-29), closed 2026-10-13.
 *
 * `scripts/math/label-displacement.ts all 14` lists 218 figures / 483 labels (batches 1-29) that the production label solver moved more than 14 px on the
 * 570 x 370 card host. The real-Chromium audit (docs/qa/mathematics-visual-audit) found no clipping, overlap or contrast failure in any of them at 390 / 1280 px;
 * what remained to decide was whether a move broke a label's ASSOCIATION with what it names. `scripts/math/labelAssociation.ts` measures that. This test
 * pins the outcome so a regression in batches 1-29 — or any card-host move in batches 30+ (the rule since batch 30) — is caught:
 *   - every attached label stays within 75 px of its object, EXCEPT the nine reviewed below;
 *   - batches 30+ have no card-host label moved more than 14 px at all.
 */
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { analyse, farLabels, ATTACHED_PX, FAR_PX, CARD, MAX_BATCH } from '../../scripts/math/labelAssociation'
import { placeSceneLabels } from '@/lib/teaching/visual/layout'

/**
 * Attached labels that ended more than 75 px from their object. Each was looked at in the Chromium audit render at the 50/50 column width (566 px host):
 * the label is still unambiguous there — it keeps its colour (the figure's role colour for that quantity), sits in the same region of the figure, and no other
 * object of that colour is nearer. Accepted, not "fixed": moving them would be re-authoring figures whose renders pass every audit rule.
 */
const REVIEWED_FAR = [
  'math-basis | w = 2b₁ − b₂',
  'math-curves-in-space | curvature 1.25',
  'math-derivative-intro | slope 2: steeper',
  'math-inverse-variation | 2 × 3 = 6',
  'math-line-integrals | path-dependent',
  'math-polar-coordinates | θ = 60°',
  'math-proper-subset | 3 ∈ B, 3 ∉ A',
  'math-pythagorean-theorem | c = 5',
  'math-trig-functions | sin θ = 0.77',
]

describe('card-host label displacement, batches 1-29', () => {
  it('moved labels keep their association with the object they name, except the nine reviewed', async () => {
    const { figures, labels } = await analyse()
    expect(figures).toBeGreaterThan(150)                                   // the backlog is still the backlog (218 at review time); a collapse to ~0 would mean the tool broke
    const attached = labels.filter((l) => l.attached)
    expect(attached.length).toBeGreaterThan(300)
    expect(farLabels(labels)).toEqual(REVIEWED_FAR)
    for (const l of attached.filter((x) => !REVIEWED_FAR.includes(`${x.id} | ${x.text}`))) expect(l.d1, `${l.id} | ${l.text}`).toBeLessThanOrEqual(FAR_PX)
    expect(ATTACHED_PX).toBe(30)
  }, 300_000)

  it('batches 30 and later have no label moved more than 14 px on the card host', async () => {
    const dir = join(process.cwd(), 'src/lib/teaching/sceneGenerators')
    const mods = readdirSync(dir).filter((f) => /^mathCoreScenesB\d+\.ts$/.test(f)).map((f) => f.replace(/\.ts$/, '')).filter((m) => Number(m.replace(/\D/g, '')) > MAX_BATCH)
    expect(mods.length).toBeGreaterThanOrEqual(13)
    const moved: string[] = []
    for (const mod of mods) {
      const M = (await import(`@/lib/teaching/sceneGenerators/${mod}`)) as Record<string, any>
      for (const [name, fn] of Object.entries(M)) {
        if (!/^build/.test(name) || typeof fn !== 'function') continue
        const scene = fn()
        for (const l of placeSceneLabels(scene, CARD).labels) if (l.movedPx > 14 || !l.ok) moved.push(`${mod} ${scene.id} | ${l.text} (${Math.round(l.movedPx)})`)
      }
    }
    expect(moved).toEqual([])
  }, 300_000)
})
