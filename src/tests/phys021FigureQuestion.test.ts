/**
 * PHYS-021 / PHYS-003 / PHYS-005 / PHYS-015 (2026-10-05, physics real-learner run).
 *
 * "i dont understand this picture. what is it showing?" was answered, in 16 of
 * 61 lessons, by a definition of the word "showing", a generic story ("think
 * of a weather map"), or "Could you tell me what you see in it?" — never by the
 * figure's own labels, which were in the prompt.
 *
 * Three causes, all reproduced:
 *  1. detectLearnerRequest -> 'explain_differently' (confusion outranks a named
 *     medium — kept, pinned elsewhere), so the server picked a re-explain
 *     STRATEGY that ignores the figure: 1 SIMPLER WORDING ("define every term"),
 *     2 ANALOGY, 5 GUIDED DISCOVERY.
 *  2. The RECOVERY block (dont_understand) preempts everything and said
 *     "CHANGE REPRESENTATION entirely — concrete example, demonstration, story".
 *  3. On a HELD figure the visual contract said "Do NOT re-describe it".
 *
 * And openings referred to a figure that was not attached ("Looking at the two
 * watches in the car-and-kitchen picture, …"), which the locator stripper
 * missed because of the compound modifier.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { asksAboutTheFigure, detectLearnerRequest } from '@/lib/teaching/masteryGate'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import { buildRecoveryBlock } from '@/lib/teaching/recoveryGuard'
import { stripUnbackedFigureReferences } from '@/lib/teaching/figureReference'
import type { VisualDecision } from '@/lib/teaching/visual/types'

const PERSONA = 'i dont understand this picture. what is it showing?'

describe('asksAboutTheFigure', () => {
  it('reads the persona message and its variants as a question about the figure', () => {
    for (const m of [PERSONA, 'i dont understand this picture. what is the picture showing?', 'what is this picture showing',
      'what does the graph mean?', "I don't understand the diagram", 'im confused by this diagram', 'explain me this picture',
      'what am i looking at', 'the picture is confusing', "i can't read the graph"]) {
      expect(asksAboutTheFigure(m), m).toBe(true)
    }
  })
  it('does not read a request for a picture, a bare confusion, or ordinary talk as one', () => {
    for (const m of ['show me a picture', 'can you draw a diagram', 'what does it mean?', 'i dont understand', 'give me example',
      'what is momentum', 'picture this', 'the answer is the graph of y=x', 'explain simpler', 'yes']) {
      expect(asksAboutTheFigure(m), m).toBe(false)
    }
  })
  it('leaves the request kind exactly as it was (pinned elsewhere)', () => {
    expect(detectLearnerRequest(PERSONA)).toBe('explain_differently')
    expect(detectLearnerRequest("I don't understand the diagram")).toBe('explain_differently')
  })
})

function heldScene(turns: number): VisualDecision {
  return {
    conceptId: 'phys.opt.youngs-experiment', conceptTitle: "Young's Double-Slit Experiment",
    graphical: true, excursion: false, purpose: 'explain', representation: 'labelled_figure',
    payload: { renderer: 'scene', sceneSpec: {} } as never, allowed: [], provenance: 'registry', continuityReason: null,
    session: { turns },
    asset: {
      conceptId: 'phys.opt.youngs-experiment', conceptTitle: "Young's Double-Slit Experiment",
      representation: 'labelled_figure', renderer: 'scene', scope: 'concept', provenance: 'curated',
      semantics: { elements: ['slit S₁', 'slit S₂', 'screen', 'bright fringe', 'dark fringe'], text: ['β = λD/d'] },
    } as never,
  } as unknown as VisualDecision
}

describe('the visual contract answers a figure question from the figure', () => {
  it('held figure: the read-the-figure rule replaces "do NOT re-describe it"', () => {
    const b = buildVisualContractBlock(heldScene(3), { learnerAskedAboutTheFigure: true })
    expect(b).toMatch(/ASKING WHAT THE FIGURE ON THEIR SCREEN SHOWS/)
    expect(b).toMatch(/Do NOT define English words/)
    expect(b).toMatch(/do NOT ask the learner what they see/)
    expect(b).not.toMatch(/ALREADY INTRODUCED/)
  })
  it('an ordinary held turn keeps the anti-repetition rule', () => {
    const b = buildVisualContractBlock(heldScene(3), {})
    expect(b).toMatch(/ALREADY INTRODUCED/)
    expect(b).not.toMatch(/ASKING WHAT THE FIGURE/)
  })
  it('no figure on screen: says so instead of pretending', () => {
    const none = { ...heldScene(0), graphical: false, asset: null } as unknown as VisualDecision
    const b = buildVisualContractBlock(none, { learnerAskedAboutTheFigure: true })
    expect(b).toMatch(/NO FIGURE IS ATTACHED/)
    expect(b).toMatch(/Acknowledge that in ONE short clause/)
  })
})

describe('the recovery script reads the figure instead of telling a story', () => {
  it('figure on screen: no "CHANGE REPRESENTATION" story, no move-on rung', () => {
    const b = buildRecoveryBlock('dont_understand', false, 2, false, { figureOnScreenQuestion: true })
    expect(b).toMatch(/go through the picture together/)
    expect(b).toMatch(/do NOT swap it for a story/)
    expect(b).not.toMatch(/CHANGE REPRESENTATION/)
    expect(b).not.toMatch(/move to a simpler related point/)
  })
  it('without the flag the script is unchanged', () => {
    expect(buildRecoveryBlock('dont_understand', false, 0, false)).toMatch(/CHANGE REPRESENTATION/)
  })
})

describe('route wiring (source)', () => {
  const SRC = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
  it('reads the flag, passes it to the contract and recovery, and forces the visual strategy', () => {
    expect(SRC).toMatch(/figureQuestionHoisted = \(await import\('@\/lib\/teaching\/masteryGate'\)\)\.asksAboutTheFigure\(learnerAuthoredMessage\)/)
    expect(SRC.match(/learnerAskedAboutTheFigure: figureQuestionHoisted/g)?.length).toBe(2)
    expect(SRC).toMatch(/if \(figureQuestionHoisted && visualDecisionHoisted\?\.graphical\) selectedStrategyHoisted = 3/)
    expect(SRC).toMatch(/figureOnScreenQuestion: figureQuestionHoisted && visualDecisionHoisted\?\.graphical === true/)
  })
})

describe('an opening never points at a picture that is not there (PHYS-005/015)', () => {
  it('strips a locator with a compound modifier and the pointer it leaves', () => {
    const t = 'Time runs differently for things that move fast. Looking at the two watches in the car-and-kitchen picture, which one do you think ticks slower?'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.stripped).toBe(true)
    expect(r.text).not.toMatch(/picture|Looking at/)
    expect(r.text).toContain('which one do you think ticks slower?')
  })
  it('a figure that is attached is never touched', () => {
    const t = 'Looking at the two watches in the car-and-kitchen picture, which one ticks slower?'
    expect(stripUnbackedFigureReferences(t, true).text).toBe(t)
  })
})
