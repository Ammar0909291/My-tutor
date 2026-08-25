/**
 * PHASE 7K TRACK E — the affirm-guard reads the anti-analogies it already had.
 *
 * THE INCIDENT (2026-08-25, chem.atomic.bohr-model, CLEAN session, phase OBSERVE):
 *
 *   LEARNER: "so electrons are just tiny planets going round"
 *   TUTOR:   "Exactly—think of the electron as a tiny planet that orbits the
 *             nucleus, just like the planets orbit the Sun."
 *
 * MY FIRST HYPOTHESIS WAS WRONG and is recorded here so it is not re-derived:
 * I assumed the guard compared the learner's claim against the LESSON's own
 * text, so an over-extension of a taught analogy would read as agreement. It
 * does not. `route.ts` builds `knownMisconceptionText` from the concept's
 * misconception REGISTER (Blueprint + Educational Brain). Measured:
 * bohr-model carries 544 chars of register — the LARGEST of the four concepts
 * audited — and it simply does not contain the planetary over-extension. The
 * guard had nothing to match, so it correctly did not fire.
 *
 * `antiAnalogies[]` is authored, is returned by the SAME loader call the guard
 * already makes, and was never read. An anti-analogy is exactly an anticipated
 * misconception, so feeding it in widens the guard with existing content.
 *
 * WHAT THIS TEST DELIBERATELY PINS: that the widening is real where content
 * exists, AND that it does NOT close the Bohr case. Bohr needs authored
 * curriculum content, which is in the protected set and is reported for
 * approval rather than written here.
 */
import { describe, it, expect } from 'vitest'
import { loadBlueprintContent, loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'

/** Mirrors route.ts's construction exactly, including the new anti-analogy leg. */
function knownMisconceptionText(cid: string, withAntiAnalogies: boolean): string {
  let out = ''
  const bp = loadBlueprintContent(cid)
  if (bp.found) for (const mc of bp.content.misconceptions) out += ` ${mc.title} ${mc.characteristicPhrase ?? ''}`
  const eb = loadEBConceptContext(cid)
  if (eb.found) {
    for (const mc of eb.context.ebMisconceptions) out += ` ${mc.title} ${mc.symptom ?? ''}`
    if (withAntiAnalogies) for (const a of eb.context.antiAnalogies) out += ` ${a}`
  }
  return out.trim()
}

describe('Phase 7K Track E — anti-analogies widen the guard', () => {
  it('VSEPR gains its authored anti-analogy', () => {
    const before = knownMisconceptionText('chem.bond.vsepr', false)
    const after = knownMisconceptionText('chem.bond.vsepr', true)
    expect(after.length).toBeGreaterThan(before.length)
    expect(after).toContain('electrons choose their positions')
    expect(before).not.toContain('electrons choose their positions')
  })

  it('Active/Passive Voice gains its authored anti-analogy', () => {
    const before = knownMisconceptionText('eng.grammar.active-and-passive-voice', false)
    const after = knownMisconceptionText('eng.grammar.active-and-passive-voice', true)
    expect(after.length).toBeGreaterThan(before.length)
  })

  it('every existing register entry is PRESERVED, never replaced', () => {
    for (const cid of ['chem.bond.vsepr', 'phys.opt.total-internal-reflection']) {
      expect(knownMisconceptionText(cid, true)).toContain(knownMisconceptionText(cid, false))
    }
  })
})

// ── THE HONEST LIMIT, pinned so it cannot be quietly assumed fixed ───────────
describe('Phase 7K Track E — what this does NOT fix', () => {
  it('bohr-model has a LARGE register and ZERO anti-analogies', () => {
    const eb = loadEBConceptContext('chem.atomic.bohr-model')
    expect(eb.found).toBe(true)
    expect(eb.context.antiAnalogies.length).toBe(0)
    expect(knownMisconceptionText('chem.atomic.bohr-model', false).length).toBeGreaterThan(400)
  })

  it('so the guard text is UNCHANGED for Bohr — this is a content gap, not a code gap', () => {
    expect(knownMisconceptionText('chem.atomic.bohr-model', true))
      .toBe(knownMisconceptionText('chem.atomic.bohr-model', false))
  })

  it('and the planetary over-extension appears in neither source', () => {
    const known = knownMisconceptionText('chem.atomic.bohr-model', true).toLowerCase()
    expect(known.includes('planet') && known.includes('orbit')).toBe(false)
  })
})

// ── NEGATIVE CONTROL — the known-good cases still carry their evidence ───────
describe('Phase 7K Track E — the cases that already worked still work', () => {
  it('TIR still carries the misconception the guard matched in production', () => {
    const known = knownMisconceptionText('phys.opt.total-internal-reflection', true)
    expect(known).toContain('MC-TIR-CAN-OCCUR-FROM-LESS-DENSE-TO-DENSER')
    expect(known.length).toBeGreaterThan(200)
  })

  it('English still carries the passive-voice register', () => {
    expect(knownMisconceptionText('eng.grammar.active-and-passive-voice', true))
      .toContain('Passive Voice Is Always Bad Writing')
  })
})
