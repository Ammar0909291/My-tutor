/**
 * VISUAL GROUNDING — what the tutor is told is on screen must be what is on
 * screen, and must be enough to teach the figure without inventing physics.
 *
 * THE OBSERVED DRIFT (production, 2026-08-09, viscosity):
 *
 *   "…we can see the text label labelled \"THICK\" alongside a bond between
 *    two atoms, representing…"
 *
 * in a figure about fluid shearing that contains no atoms. That sentence was
 * the semantics table read back verbatim: `bond` was described by its MEANING
 * in a chemistry scene rather than by its shape, and the viscosity figure draws
 * 26 of them as plates and fluid layers.
 *
 * The second half of the drift was omission. One 8-item budget, filled in
 * object order, dropped the labels that carry the teaching: total internal
 * reflection reached the model with case ① and without ② and ③ — the three
 * cases the figure exists to contrast.
 *
 * Every assertion below is checked against the ADMITTED asset's own semantics,
 * derived from the payload the renderer will paint. Nothing is asserted about
 * prose the model might produce.
 */

import { describe, expect, it } from 'vitest'
import { resolveVisual, restoreVisualSession } from '@/lib/teaching/visual/resolveVisual'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import { describeVisualPayload, buildSemanticsBlock } from '@/lib/teaching/visual/visualSemantics'
import { noFigureDecision } from '@/lib/teaching/visual/types'
import { visibleObjects } from '@/lib/teaching/sceneSpec'
import { RETIRED_VISUAL_BINDINGS } from '@/lib/teaching/visual/retired'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'

const LESSON = 'phys.meas.scalars-vectors'

function decisionFor(conceptId: string, opts: { excursionReturnTo?: string | null } = {}) {
  return resolveVisual({
    message: 'explain with diagram',
    lessonConceptId: conceptId,
    excursionReturnToConceptId: opts.excursionReturnTo ?? null,
    excursionActive: (opts.excursionReturnTo ?? null) !== null,
    subject: 'physics',
    learnerRequest: 'diagram',
  })
}
const groundingFor = (conceptId: string) => {
  const d = decisionFor(conceptId)
  return { decision: d, semantics: describeVisualPayload(d.payload), contract: buildVisualContractBlock(d) }
}

/**
 * The seven pilot figures and the grounding each one owes its learner.
 * `mustRead` are label texts that MUST reach the model verbatim; `mustMean`
 * are phrases the authored stages must carry; `mustNotSay` are claims the
 * grounding must never hand over.
 */
const GATES = [
  {
    id: 'phys.therm.calorimetry',
    mustRead: ['calorimeter', 'water', 'thermometer'],
    mustMean: ['heat', 'until'],
    mustNotSay: ['bond between two atoms', '°C', 'joules'],
  },
  {
    id: 'phys.therm.first-law',
    mustRead: ['ΔU', 'Q', 'W'],
    mustMean: ['energy'],
    mustNotSay: ['bond between two atoms'],
  },
  {
    id: 'phys.opt.total-internal-reflection',
    mustRead: ['① θ < θc', '② θ = θc', '③ θ > θc', 'escapes', 'all reflected back'],
    mustMean: ['critical angle', 'normal', 'reflected back'],
    mustNotSay: ['bond between two atoms', 'atoms'],
  },
  {
    id: 'phys.wave.transverse-waves',
    mustRead: ['crest', 'trough', 'wavelength'],
    mustMean: ['travels', 'up and down'],
    mustNotSay: ['bond between two atoms'],
  },
  {
    id: 'phys.wave.interference',
    mustRead: ['CONSTRUCTIVE', 'DESTRUCTIVE', 'wave 1', 'wave 2'],
    mustMean: ['cancel', 'crest'],
    mustNotSay: ['bond between two atoms'],
  },
  {
    id: 'phys.mech.viscosity',
    mustRead: ['fixed plate', 'plate dragged', 'velocity gradient', 'THICK', 'THIN'],
    mustMean: ['layer', 'shear'],
    mustNotSay: ['bond between two atoms', 'atoms', 'molecular bond'],
  },
  {
    id: 'phys.mech.surface-tension',
    mustRead: ['surface', 'tube'],
    mustMean: ['surface'],
    mustNotSay: ['bond between two atoms'],
  },
] as const

// ── the reported failure ─────────────────────────────────────────────────────

describe('the reported sentence is now impossible', () => {
  it('no pilot figure is described as containing atoms or bonds', () => {
    for (const { id } of GATES) {
      // The DESCRIPTIVE half only: the RULES half deliberately says the words
      // ("a line is not a bond", "no molecular or atomic explanation") in order
      // to forbid them, and finding them there is the fix working, not a leak.
      const described = groundingFor(id).contract.toLowerCase().split('rules:')[0]
      expect(described, id).not.toContain('bond between two atoms')
      expect(described, id).not.toContain('atom')
    }
  })

  it('the shapes that caused it are described as shapes', () => {
    const { semantics } = groundingFor('phys.mech.viscosity')
    // 26 plain cylinders — plates and fluid layers, not chemistry.
    expect(semantics.geometry.join(' ')).toMatch(/straight lines/)
    expect(semantics.geometry.join(' ')).not.toMatch(/bond|atom/i)
  })

  it('a scene that DOES draw molecules still only gets shape nouns', () => {
    // Truthfulness does not depend on the subject: the noun names what the
    // renderer paints, and meaning arrives through labels and narration.
    const { semantics } = groundingFor('phys.mech.surface-tension')
    expect(semantics.geometry.join(' ')).not.toMatch(/bond between two atoms/i)
  })
})

// ── every label survives ─────────────────────────────────────────────────────

describe('every label the renderer draws reaches the model', () => {
  it.each(GATES.map((g) => g.id))('%s · no label is dropped', (id) => {
    const d = decisionFor(id)
    if (d.payload?.renderer !== 'scene') throw new Error('expected a scene')
    const drawn = [...new Set(
      visibleObjects(d.payload.sceneSpec, Infinity)
        .map((o) => (typeof o.text === 'string' ? o.text.trim() : ''))
        .filter(Boolean),
    )]
    const semantics = describeVisualPayload(d.payload)
    for (const text of drawn) {
      expect(semantics.readable.some((r) => text.startsWith(r) || r.startsWith(text)), `${id}: "${text}"`).toBe(true)
    }
  })

  it.each(GATES)('$id · carries the labels its teaching depends on', ({ id, mustRead }) => {
    const block = groundingFor(id).contract
    for (const needle of mustRead) expect(block, `${id} missing "${needle}"`).toContain(needle)
  })

  it('TIR carries all THREE cases — the regression that motivated this', () => {
    const block = groundingFor('phys.opt.total-internal-reflection').contract
    expect(block).toContain('① θ < θc')
    expect(block).toContain('② θ = θc')
    expect(block).toContain('③ θ > θc')
    // And the outcome of each, so the model cannot swap them.
    expect(block).toContain('escapes')
    expect(block).toContain('grazes the surface')
    expect(block).toContain('all reflected back')
  })
})

// ── relationships (what it means) ────────────────────────────────────────────

describe('the figure\'s meaning comes from authored narration, not invention', () => {
  it.each(GATES)('$id · the stages state the relationships', ({ id, mustMean }) => {
    const block = groundingFor(id).contract.toLowerCase()
    for (const needle of mustMean) expect(block, `${id} missing "${needle}"`).toContain(needle.toLowerCase())
  })

  it('narrations are quoted whole, not cut mid-sentence', () => {
    for (const { id } of GATES) {
      const { semantics } = groundingFor(id)
      for (const step of semantics.steps) {
        // The old 120-char clamp produced fragments like "the fluid does not
        // move as a". A complete stage ends in real punctuation.
        expect(step.trim(), `${id}: "${step}"`).toMatch(/[.!?]$/)
      }
    }
  })

  it('equations are flagged for natural speech, without a scene-specific script', () => {
    const visc = groundingFor('phys.mech.viscosity').contract
    expect(visc).toContain('F = η A (dv/dy)')
    expect(visc).toMatch(/SAY IT IN WORDS/)
    // The instruction must be generic — no worked example from another figure.
    expect(visc).not.toContain('force equals viscosity times area')
  })
})

// ── forbidden claims ─────────────────────────────────────────────────────────

describe('what must not be claimed', () => {
  it.each(GATES)('$id · the grounding never hands over a forbidden claim', ({ id, mustNotSay }) => {
    const block = groundingFor(id).contract.toLowerCase()
    for (const needle of mustNotSay) {
      // The prohibition itself may name a thing ("a line is not a bond"), so
      // check the DESCRIPTIVE half of the contract, before the RULES.
      const described = block.split('rules:')[0]
      expect(described, `${id} leaked "${needle}"`).not.toContain(needle.toLowerCase())
    }
  })

  it('the contract forbids invented values and mechanisms explicitly', () => {
    const block = groundingFor('phys.therm.calorimetry').contract
    expect(block).toMatch(/Do NOT state a measurement, a numerical value, a unit, or a named/)
    expect(block).toMatch(/a line is not a bond/)
  })

  it('and forbids pivoting to another concept while the figure is up', () => {
    const block = groundingFor('phys.mech.viscosity').contract
    expect(block).toMatch(/GROUNDING: everything you say this turn is about/)
    expect(block).toContain('Viscosity and Stokes\' Law')
    expect(block).toMatch(/Do not ask about, or pivot to, a different\s+concept/)
  })
})

// ── excursion: visual concept vs lesson anchor ───────────────────────────────

describe('grounding names the FIGURE\'s concept, never the lesson', () => {
  const d = decisionFor('phys.mech.viscosity', { excursionReturnTo: LESSON })
  const block = buildVisualContractBlock(d)

  it('the figure is the excursion target', () => {
    expect(d.asset?.conceptId).toBe('phys.mech.viscosity')
    expect(d.excursion).toBe(true)
    expect(d.session?.returnToConceptId).toBe(LESSON)
  })

  it('the contract grounds on the target and never on the lesson', () => {
    expect(block).toContain('Viscosity and Stokes\' Law')
    expect(block).not.toContain(getKGNode(LESSON)!.title)
    expect(block).not.toContain('SI Units')
  })

  it('the return anchor is not offered as teaching material', () => {
    // It appears in the excursion DIRECTIVE (teaching/excursion.ts), which owns
    // the lifecycle — never in the figure's grounding.
    expect(block).toMatch(/EXCURSION FIGURE/)
    expect(block).not.toMatch(/return to .*Scalar/i)
  })
})

// ── restoration keeps the same grounding ─────────────────────────────────────

describe('a restored figure carries identical grounding', () => {
  it.each(GATES.map((g) => g.id))('%s · same semantics after refresh', (id) => {
    const live = decisionFor(id)
    const restored = restoreVisualSession(JSON.parse(JSON.stringify(live.session)))
    expect(restored).not.toBeNull()
    expect(buildSemanticsBlock(describeVisualPayload(restored!.payload)))
      .toBe(buildSemanticsBlock(describeVisualPayload(live.payload)))
  })
})

// ── negative cases all fail closed ───────────────────────────────────────────

describe('grounding fails closed', () => {
  it('no asset ⇒ the NO-FIGURE contract, which claims nothing', () => {
    const none = resolveVisual({
      message: 'explain dimensional analysis',
      lessonConceptId: 'phys.meas.dimensional-analysis', subject: 'physics',
    })
    const block = buildVisualContractBlock(none)
    expect(block).toContain('NO FIGURE IS ATTACHED')
    expect(block).not.toContain('TEXT WRITTEN ON THE FIGURE')
    expect(block).not.toContain('GROUNDING: everything you say')
  })

  it('a retired binding yields no grounding at all', () => {
    for (const id of Object.keys(RETIRED_VISUAL_BINDINGS).filter((c) => getKGNode(c))) {
      const block = buildVisualContractBlock(decisionFor(id))
      expect(block, id).toContain('NO FIGURE IS ATTACHED')
    }
  })

  it('a resolver failure yields no grounding', () => {
    const failed = { ...noFigureDecision('resolver-error', 'phys.mech.viscosity', null, 'explain' as const), continuityReason: 'x', session: null }
    const block = buildVisualContractBlock(failed)
    expect(block).toContain('NO FIGURE IS ATTACHED')
    expect(block).not.toContain('velocity gradient')
  })

  it('a null decision produces no prompt text', () => {
    expect(buildVisualContractBlock(null)).toBe('')
  })

  it('malformed payloads describe nothing rather than guessing', () => {
    for (const bad of [null, undefined, {} as never, { renderer: 'scene' } as never]) {
      const s = describeVisualPayload(bad as never)
      expect(s.readable).toEqual([])
      expect(s.geometry).toEqual([])
      expect(s.equations).toEqual([])
    }
  })

  it('a domain illustration is never grounded as a concept figure', () => {
    const candidates = ['math.calc.derivative', 'math.calc.integral', 'math.geom.angle-types']
    const domainOne = candidates
      .map((id) => resolveVisual({ message: 'show me', lessonConceptId: id, subject: 'mathematics' }))
      .find((d) => d.asset?.scope === 'domain')
    if (!domainOne) return
    const block = buildVisualContractBlock(domainOne)
    expect(block).toContain('GENERAL ILLUSTRATION')
    expect(block).toMatch(/NOT a figure of/)
  })
})
