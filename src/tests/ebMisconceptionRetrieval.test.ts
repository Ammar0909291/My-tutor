/**
 * THE TUTOR MUST NOT AGREE WITH A WRONG CLAIM.
 *
 * ── THE MEASURED FAILURE ────────────────────────────────────────────────────
 * Topic 1 of the corpus audit, `phys.meas.units`, real production, real learner
 * account, played as a genuinely weak student:
 *
 *   me    "is a unit just the name of the thing youre counting"
 *   tutor "Yes, exactly"                                    <- affirmed it
 *   me    "ok so if i count 5 apples the unit is apples right"
 *   tutor "That is completely right—when you are counting fruit,
 *          'apples' is the unit"                            <- wrong, escalated
 *
 * "Apples" is not a unit; it is a countable object, and counting is
 * dimensionless. The tutor stated a false claim in its own voice, twice, at the
 * first concept in physics.
 *
 * ── THE DIAGNOSIS THAT WAS WRONG, AND WHY IT IS RECORDED HERE ───────────────
 * The obvious reading was "misconception screens never reach runtime". Measured
 * first: FALSE. The Blueprint register loads correctly and four misconceptions
 * reached the prompt. But all four are about SI NAMING — Celsius vs kelvin,
 * mass vs weight, litre as a base unit, gram vs kilogram — and none is what a
 * beginner does on turn three.
 *
 * Two real defects were behind it:
 *   1. `EBConceptContext` had no field for the Educational Brain's own
 *      `## Misconceptions` library, so 424 authored entries were parsed for
 *      opening scenarios and anti-analogies while their richest section — with
 *      symptom phrases, verbatim probes and repair routes — was dropped.
 *   2. Listing misconceptions never told the model not to AGREE with one. The
 *      failure was not a missed warning; it was active confirmation.
 */
import { describe, it, expect } from 'vitest'
import {
  loadBlueprintContent,
  loadEBConceptContext,
  buildBlueprintContextBlock,
} from '@/lib/curriculum/blueprintLoader'

const UNITS = 'phys.meas.units'

function blockFor(conceptId: string) {
  const bp = loadBlueprintContent(conceptId)
  if (!bp.found) return null
  const eb = loadEBConceptContext(conceptId)
  return buildBlueprintContextBlock(bp.content, eb.found ? eb.context : null, null)
}

describe('the Educational Brain misconception library reaches the prompt', () => {
  it('parses the authored entries for the audited concept', () => {
    const eb = loadEBConceptContext(UNITS)
    expect(eb.found).toBe(true)
    if (!eb.found) return
    const mcs = eb.context.ebMisconceptions
    expect(mcs.length).toBeGreaterThan(0)
    // M1 is the one that speaks to the measured failure: units treated as
    // interchangeable labels rather than as reference magnitudes.
    const m1 = mcs.find((m) => m.id === 'M1')
    expect(m1).toBeDefined()
    expect(m1!.title.toLowerCase()).toContain('units')
  })

  it('carries the authored detection surface, not just a title', () => {
    // A bare title is better than nothing, but the symptom phrases and the
    // verbatim probe are what make a misconception detectable mid-turn.
    const eb = loadEBConceptContext(UNITS)
    if (!eb.found) throw new Error('fixture concept lost its EB entry')
    const m1 = eb.context.ebMisconceptions.find((m) => m.id === 'M1')!
    expect(m1.symptom).toBeTruthy()
    expect(m1.probe).toBeTruthy()
    expect(m1.recovery).toBeTruthy()
  })

  it('emits them into the block WITHOUT displacing the Blueprint register', () => {
    const block = blockFor(UNITS)
    expect(block).toBeTruthy()
    // The Blueprint keeps its existing authority and its existing heading.
    expect(block).toContain('KNOWN MISCONCEPTIONS')
    expect(block).toContain('MC-1')
    // The Educational Brain's library is added after it, under its own heading.
    expect(block).toContain('FURTHER KNOWN MISCONCEPTIONS (Educational Brain)')
    expect(block).toContain('M1:')
  })

  it('does not duplicate a misconception both sources describe', () => {
    // Both registers name the mass/weight confusion. It must appear once.
    const block = blockFor(UNITS)!
    const idx = block.indexOf('FURTHER KNOWN MISCONCEPTIONS')
    const ebHalf = block.slice(idx)
    const blueprintTitles = loadBlueprintContent(UNITS)
    if (!blueprintTitles.found) throw new Error('fixture lost its blueprint')
    for (const mc of blueprintTitles.content.misconceptions) {
      const key = mc.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
      expect(ebHalf.toLowerCase().replace(/[^a-z0-9]+/g, ' ')).not.toContain(key)
    }
  })
})

describe('the never-confirm rule', () => {
  it('is present whenever any misconception knowledge is', () => {
    const block = blockFor(UNITS)!
    expect(block).toContain('NEVER CONFIRM A WRONG CLAIM')
  })

  it('names the exact opener that produced the failure', () => {
    // "Yes, exactly" and "That is completely right" were the real responses.
    // Banning agreement generically is not enough — the rule has to close the
    // agree-then-correct move, which is what actually happened.
    const block = blockFor(UNITS)!
    expect(block).toContain('do not agree first and correct')
    expect(block.toLowerCase()).toContain('"exactly"')
    expect(block.toLowerCase()).toContain('spot on')
  })

  it('covers the question form the learner actually used', () => {
    // The misconception arrived as "is a unit just X?" and "so it's X right?",
    // not as a flat assertion. A rule about wrong STATEMENTS would have missed
    // both.
    const block = blockFor(UNITS)!
    expect(block).toContain('including as a question')
  })

  it('reaches every concept that has any misconception knowledge', () => {
    // The rule is not concept-specific, and the corpus scan showed every
    // audited concept carries at least a Blueprint register — so this must
    // hold for a concept picked from a different subject and domain too.
    for (const id of ['chem.atomic.atomic-structure', 'phys.mech.newtons-first-law']) {
      const block = blockFor(id)
      if (!block) continue
      expect(block).toContain('NEVER CONFIRM A WRONG CLAIM')
    }
  })
})

describe('parsing is defensive', () => {
  it('a concept with no EB entry still builds a block', () => {
    const bp = loadBlueprintContent(UNITS)
    if (!bp.found) throw new Error('fixture lost its blueprint')
    const block = buildBlueprintContextBlock(bp.content, null, null)
    expect(block).toContain('KNOWN MISCONCEPTIONS')
    expect(block).not.toContain('FURTHER KNOWN MISCONCEPTIONS')
    // The rule still fires — it is driven by the Blueprint register too.
    expect(block).toContain('NEVER CONFIRM A WRONG CLAIM')
  })

  it('never returns more entries than a prompt can act on', () => {
    const eb = loadEBConceptContext(UNITS)
    if (!eb.found) return
    expect(eb.context.ebMisconceptions.length).toBeLessThanOrEqual(6)
  })
})

describe('M5 — the misconception the corpus audit actually found', () => {
  it('is authored and parsed', () => {
    const eb = loadEBConceptContext(UNITS)
    expect(eb.found).toBe(true)
    if (!eb.found) return
    const m5 = eb.context.ebMisconceptions.find((m) => m.id === 'M5')
    expect(m5, 'M5 must exist — it is the failure Topic 1 exposed').toBeDefined()
    expect(m5!.title.toLowerCase()).toContain('name of the thing')
    // The symptom phrases are what let the repair MATCH it to a learner's
    // words, so they must carry the learner's actual phrasing.
    expect(m5!.symptom!.toLowerCase()).toContain('counting')
    expect(m5!.symptom!.toLowerCase()).toContain('apples')
    expect(m5!.probe).toBeTruthy()
    expect(m5!.recovery).toBeTruthy()
  })

  it('reaches the prompt block', () => {
    const block = blockFor(UNITS)!
    expect(block).toContain('M5:')
    expect(block.toLowerCase()).toContain('name of the thing you are counting')
  })

  it('outranks the other four for the learner phrasing that failed', () => {
    // The repair selects on vocabulary shared with the learner's message.
    // This mirrors that scoring so the selection cannot silently regress to
    // "always the first entry", which would hand over M1 — a real
    // misconception, but not the one this learner has.
    const eb = loadEBConceptContext(UNITS)
    if (!eb.found) throw new Error('fixture lost its EB entry')
    const learner = 'ok so if i count 5 apples the unit is apples right'
    const words = new Set(learner.toLowerCase().split(/[^a-z]+/).filter(Boolean))
    const score = (t: string) =>
      t.toLowerCase().split(/[^a-z]+/).filter(Boolean).reduce((n, w) => n + (words.has(w) ? 1 : 0), 0)
    const ranked = [...eb.context.ebMisconceptions]
      .map((m) => ({ id: m.id, s: score(`${m.title} ${m.symptom ?? ''}`) }))
      .sort((a, b) => b.s - a.s)
    expect(ranked[0].id).toBe('M5')
  })
})
