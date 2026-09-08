import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import { noFigureDecision } from '@/lib/teaching/visual/types'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'

/**
 * AN ASK THAT GOES UNANSWERED READS AS NOT BEING LISTENED TO.
 *
 * Measured in a real six-turn beginner session: the student asked to be shown
 * a picture twice and received another analogy each time, with no
 * acknowledgement that they had asked for anything at all. From their side the
 * request simply vanished.
 *
 * The cause was a rule that is correct on an ordinary turn and wrong the
 * moment somebody asks — the NO-FIGURE contract told the tutor "do not
 * apologise for the absence of a diagram; a clear explanation is the complete
 * answer". Nothing distinguished a turn where a figure merely happened not to
 * exist from a turn where the learner had explicitly requested one.
 *
 * Rule 5 now depends on that. It claims nothing false: the figure is still
 * absent, the explanation still carries the teaching, and promising one later
 * is still forbidden.
 *
 * OWNER-APPROVED. This is the one change in this work that touches what the
 * tutor says, and it was proposed and approved before being written.
 */

const noFigure = () => ({
  ...noFigureDecision('no-faithful-visual', 'phys.meas.units', 'SI Units and Measurement', 'demonstrate' as const),
  continuityReason: 'no-figure',
  session: null,
})

describe('When the learner asked and no figure exists', () => {
  it('the tutor is told to acknowledge the request', () => {
    const block = buildVisualContractBlock(noFigure(), { learnerAskedForAVisual: true })
    expect(block).toContain('NO FIGURE IS ATTACHED')
    expect(block).toMatch(/LEARNER ASKED TO BE SHOWN SOMETHING/i)
    expect(block).toMatch(/ONE short clause/i)
  })

  it('and is still forbidden from promising one later', () => {
    // Acknowledging is not a licence to write a cheque the engine cannot cash.
    const block = buildVisualContractBlock(noFigure(), { learnerAskedForAVisual: true })
    expect(block).toMatch(/do NOT\s+promise a diagram later/i)
  })

  it('and is still forbidden from describing a figure that is not there', () => {
    // Every existing NO-FIGURE rule survives the new branch.
    const block = buildVisualContractBlock(noFigure(), { learnerAskedForAVisual: true })
    expect(block).toMatch(/Do NOT say "look at the figure/i)
    expect(block).toMatch(/Do NOT describe arrows, colours, axes/i)
  })

  it('and is forbidden from answering with generic study advice about diagrams instead of the concept', () => {
    // Reproduced live (2026-09-08, low-IQ-persona QA): "can u show me a
    // picture or diagram, i learn better with pictures cuz im not smart with
    // just words" got a subject-less tutorial on HOW TO DRAW DIAGRAMS AS A
    // STUDY TECHNIQUE ("draw a box, label the parts, connect with arrows") —
    // zero content about the actual lesson, on two different chemistry
    // concepts. The word-picture this rule already requires must be scoped
    // to the concept, not to diagramming as a skill.
    const block = buildVisualContractBlock(noFigure(), { learnerAskedForAVisual: true })
    expect(block).toMatch(/Do NOT respond with general study advice/i)
    expect(block).toMatch(/ABOUT THE CONCEPT ITSELF, not about diagramming as a technique/i)
  })
})

describe('When nobody asked', () => {
  it('the old rule is unchanged — no apology for a figure nobody wanted', () => {
    const block = buildVisualContractBlock(noFigure())
    expect(block).toMatch(/Do not apologise for the absence of a diagram/i)
    expect(block).not.toMatch(/LEARNER ASKED TO BE SHOWN SOMETHING/i)
  })

  it('omitting the option behaves exactly as before', () => {
    // Every existing caller passes one argument; none of them may change.
    expect(buildVisualContractBlock(noFigure())).toBe(
      buildVisualContractBlock(noFigure(), { learnerAskedForAVisual: false }),
    )
  })

  it('a null decision is still an empty block', () => {
    expect(buildVisualContractBlock(null, { learnerAskedForAVisual: true })).toBe('')
  })
})

describe('When a figure IS attached', () => {
  it('nothing is acknowledged, because nothing was withheld', () => {
    const d = resolveVisual({
      message: 'show me a diagram',
      lessonConceptId: 'phys.meas.vector-addition',
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    expect(d.graphical).toBe(true)
    const block = buildVisualContractBlock(d, { learnerAskedForAVisual: true })
    expect(block).not.toMatch(/LEARNER ASKED TO BE SHOWN SOMETHING/i)
    expect(block).not.toContain('NO FIGURE IS ATTACHED')
  })

  it('is told to describe THIS figure, not give generic diagramming advice', () => {
    // Same reproduced defect as the no-figure case above, but measured on a
    // turn where a real visual asset WAS resolved (chem.atomic.orbitals,
    // hasVisual:true) — the model still produced the identical off-topic
    // "draw a box, label it, connect with arrows" text, disconnected from
    // the actual attached figure. Belt and braces with the no-figure rule.
    const d = resolveVisual({
      message: 'show me a diagram',
      lessonConceptId: 'phys.meas.vector-addition',
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    const block = buildVisualContractBlock(d, { learnerAskedForAVisual: true })
    expect(block).toMatch(/Describe and use THIS figure/i)
    expect(block).toMatch(/never respond with generic advice about how diagrams help someone study or learn/i)
  })
})

describe('The route supplies the signal on every no-figure path', () => {
  const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

  it('the normal path passes it', () => {
    expect(ROUTE).toMatch(/buildVisualContractBlock\(decision, \{\s*\n?\s*learnerAskedForAVisual: learnerRequestHoisted === 'diagram'/)
  })

  it('the resolver-crash path passes it too', () => {
    // A crash is still a turn where they asked. Silence there would read to the
    // learner exactly like being ignored, and the failure is ours.
    const calls = ROUTE.match(/buildVisualContractBlock\(/g) ?? []
    const withSignal = ROUTE.match(/learnerAskedForAVisual: learnerRequestHoisted === 'diagram'/g) ?? []
    expect(calls.length).toBe(withSignal.length)
  })
})
