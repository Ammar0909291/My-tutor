/**
 * Wave 0 Step 1 — structural validation of the Educational Brain seed
 * assets (src/lib/teaching/assets/brainSeedAssets.ts). Pure data checks;
 * no DB, no KG file loads (the seed script itself re-validates concept
 * ids against the live canonical KGs at run time before writing).
 */
import { describe, it, expect } from 'vitest'
import {
  SEED_EXPLANATIONS, SEED_PROBES, SEED_LANGUAGE, seedCanonicalSlug,
} from '@/lib/teaching/assets/brainSeedAssets'

describe('brainSeedAssets (Wave 0 Step 1)', () => {
  it('covers exactly the four authored Educational Brain concepts', () => {
    const ids = new Set([
      ...SEED_EXPLANATIONS.map((e) => e.conceptId),
      ...SEED_PROBES.map((p) => p.conceptId),
    ])
    expect(ids).toEqual(new Set([
      'math.arith.fractions',
      'phys.mech.newtons-first-law',
      'eng.phonics.letter-sound-correspondence',
      'eng.phonics.phonemic-awareness',
    ]))
  })

  it('every asset cites its educational-brain source (Wave 0 traceability rule)', () => {
    for (const a of [...SEED_EXPLANATIONS, ...SEED_PROBES]) {
      expect(a.source).toMatch(/^educational-brain\/concepts\//)
    }
  })

  it('every explanation has non-trivial speakable content', () => {
    for (const e of SEED_EXPLANATIONS) {
      expect(e.content.length).toBeGreaterThan(80)
      expect(e.content).not.toMatch(/TODO|placeholder/i)
    }
  })

  it('canonical slugs are unique (one lineage per concept x kind x language x band)', () => {
    const slugs = [
      ...SEED_EXPLANATIONS.map((e) => seedCanonicalSlug(e.conceptId, e.familyKind, e.gradeBand)),
      ...SEED_PROBES.map((p) => seedCanonicalSlug(p.conceptId, p.probeKind, p.gradeBand)),
    ]
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const s of slugs) expect(s).toContain(`:${SEED_LANGUAGE}:`)
  })

  it('every choice-based probe has exactly one correct choice and misconception-mapped distractors', () => {
    for (const p of SEED_PROBES.filter((p) => p.choices !== undefined)) {
      expect(p.choices).toBeDefined()
      const correct = p.choices!.filter((c) => c.isCorrect)
      expect(correct).toHaveLength(1)
      // Distractor science (assessment/03): at least one wrong choice maps to a
      // documented misconception, making a wrong answer diagnostic, not noise.
      const mapped = p.choices!.filter((c) => !c.isCorrect && c.misconceptionId)
      expect(mapped.length).toBeGreaterThan(0)
    }
  })

  it('every probe targets at least the misconception its distractors map to', () => {
    for (const p of SEED_PROBES) {
      for (const c of p.choices ?? []) {
        if (c.misconceptionId) {
          expect(p.targetedMisconceptions).toContain(c.misconceptionId)
        }
      }
    }
  })
})
