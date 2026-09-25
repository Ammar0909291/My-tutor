/**
 * BIOLOGY END-USER-READY VISUAL GAP FIX (2026-09-25).
 *
 * `bio.plant.photosynthesis` and `bio.immuno.immune-disorders` both had NO
 * static (Tier 0/1) visual binding at all (`hasBinding:false`) and relied
 * entirely on Tier 3 live generation. Measured live in production
 * (2026-09-24 real-learner QA, driving the deployed app on a real account):
 *
 *   - bio.immuno.immune-disorders: `provenance: 'no-figure:critic-reject-
 *     cached'` on EVERY turn of a 10-turn session, including an explicit
 *     "do you have picture...?" request — no diagram ever reached the
 *     learner.
 *   - bio.plant.photosynthesis: already characterised in
 *     photosynthesisVisualServingLedger.test.ts (2026-09-23) — the
 *     explicit-request retry regenerates a figure fingerprint-identical to
 *     the one already rejected, so it is discarded as
 *     `no-figure:retry-identical-figure` without ever reaching the critic
 *     again. The generator is architecturally incapable of escaping this
 *     for a concept whose candidate is effectively deterministic.
 *
 * The fix is a deterministic Tier 0 scene for each concept (reusing the
 * existing, already-generic `buildCellPathwayScene` /
 * `buildCellComparisonScene` generators — no new generator authored, per
 * this codebase's own "prefer reuse" priority). Tier 0 is checked before
 * Tier 3 in resolveVisual's decision order, so neither concept depends on
 * the generator/critic loop converging any more — this is the identical
 * structural fix already applied to the 18 bio.cell concepts in
 * bioCellVisualReplacement.test.ts.
 *
 * Both scenes are grounded strictly in what each concept's own Educational
 * Brain entry says is ACTUALLY TAUGHT (`educational-brain/concepts/biology/
 * bio.plant.photosynthesis.md`, `bio.immuno.immune-disorders.md`), not the
 * raw KG description's fuller scope — both EB entries explicitly flag the
 * extra KG detail (photosystems I/II, C4/CAM; organ transplant rejection) as
 * an untaught "Curriculum Feedback" content gap, so neither appears here.
 */
import { describe, expect, it } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { resolveVisualForTurn } from '@/lib/teaching/visual/resolveVisual'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { lookupConceptVisualBinding } from '@/lib/teaching/visualRegistry'

const PHOTOSYNTHESIS = 'bio.plant.photosynthesis'
const IMMUNE_DISORDERS = 'bio.immuno.immune-disorders'
const THE_TWO = [PHOTOSYNTHESIS, IMMUNE_DISORDERS]

const ask = (conceptId: string) =>
  resolveVisual({ message: 'explain with diagram', lessonConceptId: conceptId, learnerRequest: 'diagram' })

describe.each(THE_TWO)('%s now resolves to a faithful Tier 0 scene', (conceptId) => {
  it('is graphical, with concept-authored generator provenance', () => {
    const d = ask(conceptId)
    expect(d.graphical).toBe(true)
    expect(d.asset?.conceptId).toBe(conceptId)
  })

  it('resolveVisualForTurn reaches the same figure asynchronously, provenance intact', async () => {
    const d = await resolveVisualForTurn({ message: 'explain with diagram', lessonConceptId: conceptId, learnerRequest: 'diagram' }, {})
    expect(d.graphical).toBe(true)
    expect(d.provenance).toBe(`generator:${conceptId}:concept-authored`)
  })

  it('is not retired', () => {
    expect(isRetiredVisualBinding(conceptId)).toBe(false)
  })

  it('has no curated Tier 1 binding — the fix is genuinely Tier 0, not a registry entry', () => {
    expect(lookupConceptVisualBinding(conceptId)).toBeNull()
  })

  it('the Tier 3 critic/generator loop is now structurally unreachable: even deps that would always reject/throw are never consulted', async () => {
    let generateCalled = false
    let criticCalled = false
    const d = await resolveVisualForTurn(
      { message: 'explain with diagram', lessonConceptId: conceptId, learnerRequest: 'diagram' },
      {
        enabled: () => true,
        policy: 'auto',
        generate: async () => { generateCalled = true; throw new Error('Tier 3 must not be reached') },
        critic: async () => { criticCalled = true; throw new Error('critic must not be reached') },
        budgetReader: { countToday: async () => 0 },
      },
    )
    expect(d.graphical).toBe(true)
    expect(generateCalled).toBe(false)
    expect(criticCalled).toBe(false)
  })
})

describe('bio.plant.photosynthesis: the two-stage relay, not a single fused event', () => {
  it('draws exactly the two coupled stages the EB entry says are actually taught', () => {
    const scene = buildCanonicalScene(null, PHOTOSYNTHESIS)
    expect(scene).not.toBeNull()
    expect(scene!.steps).toHaveLength(2)
    const allText = scene!.steps.flatMap((s) => [s.narration, ...s.objects.map((o) => o.text)]).join(' ')
    expect(allText).toMatch(/light/i)
    expect(allText).toMatch(/calvin/i)
    expect(allText).toMatch(/ATP/)
    expect(allText).toMatch(/NADPH/)
  })

  it('does not depict photosystems I/II or C4/CAM — the EB entry flags these as an untaught content gap', () => {
    const scene = buildCanonicalScene(null, PHOTOSYNTHESIS)!
    const allText = JSON.stringify(scene)
    expect(allText).not.toMatch(/photosystem/i)
    expect(allText).not.toMatch(/C4|CAM/)
  })

  it('is not a cycle and has no branching — it is a real, taught linear sequence', () => {
    const scene = buildCanonicalScene(null, PHOTOSYNTHESIS)!
    const allText = JSON.stringify(scene)
    expect(allText).not.toContain('cycle-return')
  })
})

describe('bio.immuno.immune-disorders: three failure modes, not four', () => {
  it('draws exactly the three categories the EB entry says are actually taught', () => {
    const scene = buildCanonicalScene(null, IMMUNE_DISORDERS)
    expect(scene).not.toBeNull()
    expect(scene!.steps).toHaveLength(3)
    const allText = scene!.steps.flatMap((s) => [s.narration, ...s.objects.map((o) => o.text)]).join(' ')
    expect(allText).toMatch(/autoimmune/i)
    expect(allText).toMatch(/allergy/i)
    expect(allText).toMatch(/immunodeficiency/i)
  })

  it('does not depict organ transplant rejection — the EB entry flags it as an untaught content gap', () => {
    const scene = buildCanonicalScene(null, IMMUNE_DISORDERS)!
    const allText = JSON.stringify(scene).toLowerCase()
    expect(allText).not.toContain('transplant')
    expect(allText).not.toContain('immunosuppress')
  })

  it('names the real worked examples from the EB entry, not invented ones', () => {
    const scene = buildCanonicalScene(null, IMMUNE_DISORDERS)!
    const allText = JSON.stringify(scene)
    expect(allText).toMatch(/Type 1 diabetes/)
    expect(allText).toMatch(/HIV/)
    expect(allText).toMatch(/SCID/)
  })
})

describe('non-regression: everything this fix must not touch', () => {
  it('CONCEPT_SCENE_OVERRIDES grew by exactly these two', () => {
    expect(CONCEPT_SCENE_OVERRIDES).toHaveLength(58)
    expect(CONCEPT_SCENE_OVERRIDES).toContain(PHOTOSYNTHESIS)
    expect(CONCEPT_SCENE_OVERRIDES).toContain(IMMUNE_DISORDERS)
  })

  it('an unrelated concept still stuck on Tier 3 is unaffected by this fix', () => {
    // bio.mol.dna-replication is a pre-existing, documented Tier-3-only case
    // (visualGeneratorSplits.test.ts's REQUIRES_AUTHORING list) — it must
    // still resolve exactly as before, with no override accidentally added.
    expect(CONCEPT_SCENE_OVERRIDES).not.toContain('bio.mol.dna-replication')
    expect(buildCanonicalScene(null, 'bio.mol.dna-replication')).toBeNull()
  })

  it('mitosis and the 18 retired-then-replaced bio.cell concepts are unaffected', () => {
    const mitosis = ask('bio.cell.mitosis')
    expect(mitosis.graphical).toBe(true)
    expect(mitosis.asset?.provenance).not.toContain('concept-authored')

    const apoptosis = ask('bio.cell.apoptosis')
    expect(apoptosis.graphical).toBe(true)
    expect(apoptosis.asset?.conceptId).toBe('bio.cell.apoptosis')
  })

  it('an unrelated still-retired concept remains retired', () => {
    expect(isRetiredVisualBinding('chem.bond.ionic-bonding')).toBe(true)
    expect(ask('chem.bond.ionic-bonding').graphical).toBe(false)
  })
})
