/**
 * WHEN NOTHING IS ON SCREEN, THE TUTOR MUST NOT BE TOLD TO SHOW SOMETHING.
 *
 * Found on the real deployed tutor with the owner's account, 2026-08-14,
 * lesson `chem.found.states-of-matter`. That concept's visual binding is
 * RETIRED, so the resolver served no figure and the NO-FIGURE contract WAS
 * injected. The tutor said:
 *
 *   "Looking at the figure on your screen showing the Interconversion of
 *    States of Matter, you can see how a substance moves between solid,
 *    liquid, and gas phases... it reaches the Melting (Heating) step shown
 *    on screen"
 *
 * No such figure exists anywhere in this repository — the phrase does not
 * appear in any scene, card, asset or blueprint. It was invented from the
 * concept's own KG description, "interconversion via heating and cooling".
 *
 * WHY the model did it, rather than a bare compliance failure: the SAME
 * prompt contained the opposite instruction. Blueprints drive the teaching
 * sequence and are written for a human tutor at a whiteboard —
 * `chem.found.states-of-matter.md` says "TA-1 [DEMONSTRATE + EXPLAIN]: Demo 1
 * (same-molecule three-states particle diagram) alongside Explanation A" and
 * "Draw the particle-size-vs-spacing contrast diagram". The model was told
 * both "show this diagram" and "no figure is attached", and resolved the
 * contradiction by fabricating the picture.
 *
 * This is not one concept's problem. Measured across every physics and
 * chemistry concept that has a blueprint: 231 of 424 instruct a demo or a
 * diagram while the resolver serves NOTHING for them. The conflicting prompt
 * is the MAJORITY case.
 *
 * The blueprint is not wrong — describing a demonstration is good teaching,
 * and stripping demos out of the teaching sequence would discard pedagogy to
 * fix phrasing. What had to be settled is which instruction wins about what
 * is ON SCREEN, and that is the visual contract's own subject, so rule (6)
 * settles it there rather than in a second place.
 */
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import { noFigureDecision } from '@/lib/teaching/visual/types'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { getConceptSceneGenerator, lookupConceptVisualBinding } from '@/lib/teaching/visualRegistry'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'

const noFigureBlock = (opts: { learnerAskedForAVisual?: boolean } = {}) =>
  buildVisualContractBlock(
    noFigureDecision('retired-binding', 'chem.found.states-of-matter', 'States of Matter', 'explain', false),
    opts as never,
  )

describe('the no-figure contract settles the conflict', () => {
  it('is emitted at all for a retired binding', () => {
    // A null decision emits nothing, which would leave the model unconstrained.
    // Retired bindings must produce a DECISION, not null.
    expect(noFigureBlock()).toContain('NO FIGURE IS ATTACHED')
  })

  it('names the conflicting instruction and wins against it', () => {
    const block = noFigureBlock()
    expect(block).toMatch(/RUN A DEMO/i)
    expect(block).toMatch(/DRAW A DIAGRAM/i)
    expect(block).toMatch(/wins on the question of what is on screen/i)
  })

  it('keeps the demonstration as teaching rather than deleting it', () => {
    // The fix must not tell the tutor to skip the demo — only to speak it.
    const block = noFigureBlock()
    expect(block).toMatch(/IN WORDS/i)
    expect(block).toMatch(/carry the demonstration verbally/i)
  })

  it('still forbids the exact phrasing that was observed', () => {
    const block = noFigureBlock()
    expect(block).toContain('on your screen')       // named as forbidden
    expect(block).toMatch(/NEVER say or imply it is displayed/i)
  })

  it('applies whether or not the learner asked for a visual', () => {
    for (const asked of [true, false]) {
      expect(noFigureBlock({ learnerAskedForAVisual: asked })).toMatch(/RUN A DEMO/i)
    }
  })
})

describe('the rule is scoped to the no-figure case only', () => {
  it('does not appear when a figure IS attached', () => {
    // With a real figure on screen the tutor SHOULD point at it, and this
    // clause would be actively wrong. It must not leak into that branch.
    const conceptWithScene = 'phys.mech.torque'
    const scene = buildCanonicalScene(getConceptSceneGenerator(conceptWithScene), conceptWithScene)
    expect(scene, 'fixture concept must still have a scene').not.toBeNull()
    // Build the attached-figure branch through the same entry point.
    const attached = buildVisualContractBlock(
      {
        ...noFigureDecision('n/a', conceptWithScene, 'Torque', 'explain', false),
        graphical: true,
        asset: {
          assetId: 'test', conceptId: conceptWithScene, conceptTitle: 'Torque',
          representation: 'diagram', renderer: 'scene', provenance: 'generator',
          identity: 'declared', scope: 'concept',
          semantics: { caption: 'Torque', elements: [], readable: [], geometry: [], equations: [], steps: [] },
          payload: { renderer: 'scene', sceneSpec: scene },
        },
      } as never,
      {} as never,
    )
    expect(attached).toContain('A FIGURE IS ALREADY BEING RENDERED')
    expect(attached).not.toMatch(/RUN A DEMO/i)
  })
})

describe('the conflict this exists for is real and measured', () => {
  const DEMO = /\b(demo\s*\d|\[DEMONSTRATE|run demo|draw the|diagram\b)/i

  function survey() {
    let servesFigure = 0, servesNothing = 0, conflicting = 0
    for (const f of ['docs/physics/kg/graph.json', 'docs/chemistry/kg/graph.json']) {
      for (const c of JSON.parse(fs.readFileSync(f, 'utf8')).concepts as { id: string }[]) {
        const bp = path.join('docs/curriculum/blueprints', `${c.id}.md`)
        if (!fs.existsSync(bp)) continue
        const instructsDemo = DEMO.test(fs.readFileSync(bp, 'utf8'))
        const hasFigure = !isRetiredVisualBinding(c.id) &&
          (buildCanonicalScene(getConceptSceneGenerator(c.id), c.id) !== null ||
            lookupConceptVisualBinding(c.id) !== null)
        if (hasFigure) servesFigure++; else servesNothing++
        if (!hasFigure && instructsDemo) conflicting++
      }
    }
    return { servesFigure, servesNothing, conflicting }
  }

  it('a large share of phys/chem concepts have a demo instruction and no figure', () => {
    const { servesNothing, conflicting } = survey()
    // Non-vacuity: if this ever reads zero the survey has broken, not the
    // corpus. The number itself is documentation, not a target — it falls
    // when figures are authored, and this must not be "fixed" by loosening it.
    expect(conflicting).toBeGreaterThan(100)
    expect(conflicting).toBeLessThanOrEqual(servesNothing)
  })

  it('states-of-matter is one of them', () => {
    const bp = 'docs/curriculum/blueprints/chem.found.states-of-matter.md'
    expect(fs.existsSync(bp)).toBe(true)
    expect(fs.readFileSync(bp, 'utf8')).toMatch(/Demo 1/)
    expect(isRetiredVisualBinding('chem.found.states-of-matter')).toBe(true)
  })
})
