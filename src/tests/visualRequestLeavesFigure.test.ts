/**
 * ASKING TO SEE PART OF THE THING IS NOT LEAVING IT.
 *
 * MEASURED live on phys.opt.mirrors, twice, in a struggling-learner session
 * (`scripts/qa/verify-diagram-under-struggle.ts mirrors`): 2 of 3 explicit
 * figure requests were answered with a figure and one was not. The one that
 * failed, verbatim from the transcript:
 *
 *   learner: "show me a picture of the rays"
 *   tutor:   "Imagine the three standard rays you'd trace for a concave
 *             mirror: • One ray runs straight from the object, parallel to
 *             the mirror's principal axis. …"          [NO FIGURE ATTACHED]
 *
 * The figure being held was a concave-mirror ray diagram — literally a picture
 * of the rays. `requestLeavesActiveFigure` released it, because the words it
 * compares against are the KG node's title and description, and this concept's
 * are one sentence about the FORMULA:
 *
 *   "Spherical Mirrors and Mirror Formula. The mirror formula 1/f = 1/v + 1/u
 *    relates focal length, image distance, and object distance for spherical
 *    mirrors."
 *
 * Nothing there says rays, light or reflection, so a learner asking to see any
 * of them read as a change of subject.
 *
 * THE COUNTS. Across a 22-case table run against the real function and the real
 * KG, the domain-vocabulary evidence takes it from 17/22 to 20/22 with no case
 * moving the wrong way. The three it fixes are all real learner phrasings; the
 * two it does not are recorded below rather than asserted away.
 */
import { describe, it, expect } from 'vitest'
import { requestLeavesActiveFigure } from '@/lib/teaching/visual/resolveVisualTarget'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'

/** Exactly what resolveVisual builds and passes as `activeFigureText`. */
function figureText(conceptId: string): string {
  const node = getKGNode(conceptId) as { title?: string; description?: string } | undefined
  return `${node?.title ?? ''} ${node?.description ?? ''}`
}

const leaves = (message: string, conceptId: string) =>
  requestLeavesActiveFigure(message, figureText(conceptId), conceptId)

describe('a request that stays inside the figure’s own domain HOLDS it', () => {
  for (const message of [
    'show me a picture of the reflection',
    'can you draw the light rays',
    'what is total internal reflection',
    'show me the image formation',
    'draw the focal point',
    'show me the mirror formula',
  ]) {
    it(`holds the mirrors figure: ${JSON.stringify(message)}`, () => {
      expect(leaves(message, 'phys.opt.mirrors')).toBe(false)
    })
  }

  it('holds for the two other concepts the same probe drives', () => {
    expect(leaves('show me a picture of the forces', 'phys.mech.friction')).toBe(false)
    expect(leaves('show me a picture of the energy changing', 'phys.mech.kinetic-energy')).toBe(false)
  })
})

describe('everything this rule exists for still RELEASES the figure', () => {
  it('the production failure it was written for: SI units over a kinetic-energy graph', () => {
    // "Look at the plotted curve on your screen: the mass of two kilograms
    // uses the SI unit for mass…" — narrated over axes of Velocity and
    // Kinetic Energy, for three consecutive turns.
    expect(leaves('What are SI units and why do we need them?', 'phys.mech.kinetic-energy')).toBe(true)
  })

  it('an off-curriculum topic', () => {
    expect(leaves('Explain Kubernetes pod scheduling', 'phys.meas.units')).toBe(true)
  })

  it('another SUBJECT entirely', () => {
    expect(leaves('what is the periodic table', 'phys.opt.mirrors')).toBe(true)
    expect(leaves('tell me about the periodic table', 'phys.opt.mirrors')).toBe(true)
  })

  it('PRE-EXISTING and unrelated: "what about X" names nothing to the extractor', () => {
    // Measured while writing the case above, which I first wrote wrong.
    // `extractRequestedTopic` returns null for this phrasing, so the figure
    // is held — before this change and after it, identically. Recorded here
    // because a future reader will otherwise read the hold as this rule's
    // doing. Widening the extractor's request forms is separate work.
    expect(leaves('what about chemical structures', 'phys.opt.mirrors')).toBe(false)
    expect(leaves('what about nuclear fission', 'phys.opt.mirrors')).toBe(false)
  })

  it('DOMAIN, not subject — a different physics domain still releases', () => {
    // This is the boundary the scope choice rests on. A subject-wide
    // vocabulary would hold the mirrors figure for both of these, because
    // both are physics; neither is what this figure shows.
    expect(leaves('what is nuclear fission', 'phys.opt.mirrors')).toBe(true)
    expect(leaves('explain electric current', 'phys.opt.mirrors')).toBe(true)
    expect(leaves('can you show me a graph of the velocity', 'phys.opt.mirrors')).toBe(true)
  })
})

describe('unchanged behaviour', () => {
  it('a message that names no topic can never release a figure', () => {
    for (const message of ['explain that again', 'show me a diagram', 'i dont get it']) {
      expect(leaves(message, 'phys.opt.mirrors')).toBe(false)
    }
  })

  it('the two-argument form is byte-identical to before — no caller is changed by default', () => {
    // Every existing caller passes two arguments. Without a concept id there
    // is no domain to consult, so the new evidence cannot fire.
    expect(requestLeavesActiveFigure('show me a picture of the reflection', figureText('phys.opt.mirrors')))
      .toBe(true)
    expect(requestLeavesActiveFigure('what is kinetic energy', figureText('phys.mech.kinetic-energy')))
      .toBe(false)
  })
})

/**
 * THE RESIDUE, ASSERTED AS IT ACTUALLY IS.
 *
 * The exact phrasing that started this is STILL released, and this case says
 * so rather than hiding it. `contentWords` drops every word shorter than four
 * characters and folds a trailing plural only above that length, so "rays"
 * stays "rays" while the domain's own word, from "Ray Optics", is "ray" — three
 * characters, discarded before it reaches any vocabulary.
 *
 * Fixing it means lowering that minimum for the entire visual engine, which
 * also governs scene anchoring and asset admission. One phrasing is not
 * evidence enough for that. When this assertion starts failing, the minimum
 * has changed and this comment is the record of why it mattered.
 */
describe('KNOWN LIMIT — a three-letter domain word is invisible', () => {
  it('"show me a picture of the rays" is still released, and that is measured, not intended', () => {
    expect(leaves('show me a picture of the rays', 'phys.opt.mirrors')).toBe(true)
  })
})
