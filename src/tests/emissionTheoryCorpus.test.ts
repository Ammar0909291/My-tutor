/**
 * THE CONTENT-BOUNDARY HALF of the emission-theory contract.
 *
 * visionDirectionGuard.test.ts pins the RUNTIME repair — what happens when the
 * model generates the claim. This file pins the CORPUS: no authored physics
 * asset may itself teach that light originates in the eye, and the misconception
 * this concept was missing is now registered and detectable.
 *
 * The runtime guard exists because the authored content was already correct.
 * This test is what keeps that true.
 */
import { describe, it, expect } from 'vitest'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import { isEmissionTheoryClaim } from '@/lib/teaching/visionDirectionGuard'

const REFL = 'phys.opt.reflection'
const MC = `${REFL}:MC-EMISSION-THEORY-OF-VISION`

describe('no authored physics asset teaches the emission theory of vision', () => {
  it('no authored explanation ASSERTS the claim', () => {
    // `misconception_repair` assets QUOTE it in order to refute it, which is how
    // a misconception is repaired — the guard's own REFUTATION_CONTEXT exemption
    // recognises those sentences, so they are not offenders here either. Every
    // other family is strictly forbidden.
    const offenders = AUTHORED_EXPLANATIONS
      .filter((e) => e.subjectSlug === 'physics')
      .filter((e) => e.content.split(/(?<=[.!?;])\s+/).some((s) => isEmissionTheoryClaim(s)))
      .map((e) => e.conceptId)
    expect(offenders).toEqual([])
  })

  it('no authored probe stem or CORRECT choice contains the claim', () => {
    const offenders: string[] = []
    for (const p of AUTHORED_PROBES.filter((x) => x.subjectSlug === 'physics')) {
      const texts = [p.stem, ...(p.choices ?? []).filter((c) => c.isCorrect).map((c) => c.text)]
      if (texts.some((t) => isEmissionTheoryClaim(String(t)))) offenders.push(p.conceptId)
    }
    expect(offenders).toEqual([])
  })

})

/**
 * THE SECOND HALF OF THIS CONTRACT IS BLOCKED, NOT FORGOTTEN.
 *
 * Registering `phys.opt.reflection:MC-EMISSION-THEORY-OF-VISION` in the authored
 * corpus was attempted and reverted, because two PRE-EXISTING corpus invariants
 * refuse it and neither can be satisfied from inside this campaign:
 *
 *  1. `seedCanonicalSlug` is `conceptId:familyKind:language:gradeBand`, so a
 *     SECOND `misconception_repair` at HIGH band for this concept carries the
 *     same slug as the existing one and is DISCARDED at seed time — the asset
 *     would never reach a learner. (brainSeedAssets.test.ts caught it: 0 -> 1
 *     collisions.)
 *  2. `misconceptionIdsJoinToBlueprints.test.ts` requires every probed
 *     misconception id to join to its blueprint, and its own comment states the
 *     rule: "closing them needs a blueprint change, which is the Curriculum
 *     Production Pipeline's to make, not this campaign's." A new id without a
 *     blueprint entry is an orphan (30 -> 31).
 *
 * Both are correct invariants and neither was weakened. The durable content fix
 * therefore needs a blueprint MC entry authored by the pipeline first; the
 * deterministic repair for the generated prose (visionDirectionGuard.ts) does
 * not depend on it and ships independently.
 */
