/**
 * R1-R4 — the approved excursion fixes (proposal revision 3,
 * docs/architecture/EXCURSION_GATE_OWNERSHIP_PROPOSAL.md).
 *
 * Every positive case below is built from a VERBATIM learner message captured
 * on the deployed app on 2026-09-02 (sessions cmtkg1u74… physics and
 * cmtkgdnkg… chemistry), where the excursion stayed open and
 * `[gate-eligibility] blockedBy:["notExcursion"]` blocked every authored probe.
 *
 * The negative controls are the point of the file: they pin the things R1-R4
 * must NOT have changed.
 */
import { describe, it, expect } from 'vitest'
import { decideExcursion, NO_EXCURSION, MAX_EXCURSION_TURNS } from '@/lib/teaching/excursion'
import { withholdUngradedGateQuestion } from '@/lib/teaching/gateAssessment'

const LESSON = 'phys.mech.newtons-second-law'
const OTHER = 'phys.mech.acceleration'

const open = (over: Partial<Parameters<typeof decideExcursion>[0]> = {}) =>
  decideExcursion({
    state: { active: true, targetConceptId: OTHER, targetTopicTitle: null, returnToConceptId: LESSON, turns: 2 },
    message: '',
    lessonConceptId: LESSON,
    requestedConceptId: null,
    lastAssistantAskedQuestion: true,
    ...over,
  } as Parameters<typeof decideExcursion>[0])

describe('R1.1 — the on-lesson exit is reachable from any sentence shape', () => {
  it('closes when an ANSWER-shaped turn names the lesson concept (the measured defect)', () => {
    // Verbatim, phys.mech.newtons-second-law 18:45:59Z. Production logged
    // requested:'phys.mech.newtons-second-law' with transition:'continued'.
    const d = open({
      message: "No — speed doesn't matter for F=ma, only the net force and mass do. "
        + 'So acceleration would stay the same at 2 m/s^2 even if it were already moving.',
      requestedConceptId: LESSON,
    })
    expect(d.transition).toBe('closed-on-lesson')
    expect(d.state.active).toBe(false)
    expect(d.targetConceptId).toBe(LESSON)
  })

  it('closes on a statement-shaped turn naming the lesson concept', () => {
    const d = open({
      message: 'so F=ma means the net force equals mass times acceleration',
      requestedConceptId: LESSON,
    })
    expect(d.transition).toBe('closed-on-lesson')
  })

  it('an explicit return request still closes FIRST, as closed-returned', () => {
    // Ordering check, not a regression: isReturnRequest sits above the hoisted
    // on-lesson exit and keeps its priority, so this reports the truer reason.
    const d = open({ message: 'can we go back to F=ma please', requestedConceptId: LESSON })
    expect(d.transition).toBe('closed-returned')
    expect(d.state.active).toBe(false)
  })

  it('NEGATIVE CONTROL: an answer naming a DIFFERENT concept does not close', () => {
    const d = open({ message: 'I think it is the acceleration one', requestedConceptId: OTHER })
    expect(d.transition).toBe('continued')
    expect(d.state.active).toBe(true)
  })

  it('NEGATIVE CONTROL: an ordinary answer resolving to nothing still holds the detour', () => {
    const d = open({ message: 'I think it is 2 metres per second squared', requestedConceptId: null })
    expect(d.state.active).toBe(true)
    expect(d.transition).toBe('continued')
  })
})

describe('R1.2 — wants-practice closes a detour however it was opened', () => {
  it('closes a TOPIC-opened excursion (the measured defect)', () => {
    // Verbatim, phys.mech.newtons-second-law 18:47:04Z, turns=5, stayed open.
    const d = open({
      message: "Can you give me one more practice question to check I've got it?",
      wantsPractice: true,
    })
    expect(d.transition).toBe('closed-wants-practice')
    expect(d.state.active).toBe(false)
  })

  it('still closes a knowledge-gap-opened excursion (prior behaviour preserved)', () => {
    const d = open({
      state: { active: true, targetConceptId: OTHER, targetTopicTitle: null, returnToConceptId: LESSON, turns: 3, openedAsKnowledgeGap: true },
      message: 'can you quiz me properly now',
      wantsPractice: true,
    } as never)
    expect(d.transition).toBe('closed-wants-practice')
  })

  it('NEGATIVE CONTROL: without a practice request the detour continues', () => {
    const d = open({ message: 'ok tell me more about that', wantsPractice: false })
    expect(d.state.active).toBe(true)
  })
})

describe('R2 — the excursion is bounded at 6 turns', () => {
  it('the constant is 6', () => {
    expect(MAX_EXCURSION_TURNS).toBe(6)
  })

  it('closes at the bound, and returns to the LESSON (not abandonment)', () => {
    const d = open({
      state: { active: true, targetConceptId: OTHER, targetTopicTitle: null, returnToConceptId: LESSON, turns: MAX_EXCURSION_TURNS },
      message: 'and what about when it speeds up',
    } as never)
    expect(d.transition).toBe('closed-turn-limit')
    expect(d.targetConceptId).toBe(LESSON)
  })

  it('does not close one turn early', () => {
    const d = open({
      state: { active: true, targetConceptId: OTHER, targetTopicTitle: null, returnToConceptId: LESSON, turns: MAX_EXCURSION_TURNS - 1 },
      message: 'and what about when it speeds up',
    } as never)
    expect(d.transition).not.toBe('closed-turn-limit')
  })

  it('an unresolved-title excursion is bounded too (the Bohr shape)', () => {
    const d = decideExcursion({
      state: { active: true, targetConceptId: null, targetTopicTitle: 'emission lines work', returnToConceptId: 'chem.atomic.bohr-model', turns: MAX_EXCURSION_TURNS },
      message: 'so what happens next',
      lessonConceptId: 'chem.atomic.bohr-model',
      requestedConceptId: null,
      lastAssistantAskedQuestion: true,
    } as never)
    expect(d.transition).toBe('closed-turn-limit')
  })
})

describe('R3 — a self-excursion never opens (exact identity only)', () => {
  it('refuses to open when the requested concept IS the lesson concept', () => {
    const d = decideExcursion({
      state: NO_EXCURSION,
      message: 'can you explain F=ma again',
      lessonConceptId: LESSON,
      requestedConceptId: LESSON,
      lastAssistantAskedQuestion: false,
    } as never)
    expect(d.state.active).toBe(false)
    expect(d.transition).toBe('none')
    expect(d.targetConceptId).toBe(LESSON)
  })

  it('still opens for a genuinely different concept (the feature is intact)', () => {
    const d = decideExcursion({
      state: NO_EXCURSION,
      message: 'can you explain acceleration',
      lessonConceptId: LESSON,
      requestedConceptId: OTHER,
      lastAssistantAskedQuestion: false,
    } as never)
    expect(d.state.active).toBe(true)
    expect(d.state.targetConceptId).toBe(OTHER)
    expect(d.state.returnToConceptId).toBe(LESSON)
  })

  it('NO FUZZY CONTAINMENT: an unresolved title is not compared to the lesson', () => {
    // The Bohr shape. R3 is exact-identity only and deliberately does NOT
    // inspect the title's words, so this still opens — stated openly in the
    // proposal (§5-R3) and bounded by R2 rather than papered over.
    const d = decideExcursion({
      state: NO_EXCURSION,
      message: 'Can we move on to how the emission lines work?',
      lessonConceptId: 'chem.atomic.bohr-model',
      requestedConceptId: null,
      requestedTopicTitle: 'emission lines work',
      lastAssistantAskedQuestion: false,
    } as never)
    expect(d.state.active).toBe(true)
    expect(d.state.targetConceptId).toBeNull()
  })
})

describe('R4 — the withhold does not fire when the gate never looked', () => {
  const socratic = 'What happens to the acceleration if the mass doubles?'

  it('keeps the model question when the gate was blocked by an excursion', () => {
    const r = withholdUngradedGateQuestion({
      text: socratic,
      phase: 'GUIDE',
      hasStructuredMcq: false,
      gateSoughtThisTurn: true,
      gateBlockedByExcursion: true,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(socratic)
    expect(r.text).not.toBe("Let's stay with this idea for a moment.")
  })

  it('NEGATIVE CONTROL: probe STARVATION still withholds, unchanged', () => {
    // The gate ran and found nothing (the English below-contract case). This is
    // the function's whole purpose and R4 does not touch it.
    const r = withholdUngradedGateQuestion({
      text: socratic,
      phase: 'PRACTICE',
      hasStructuredMcq: false,
      gateSoughtThisTurn: true,
      gateBlockedByExcursion: false,
    })
    expect(r.withheld).toBe(true)
    expect(r.text).toBe("Let's stay with this idea for a moment.")
  })

  it('NEGATIVE CONTROL: omitting the flag reproduces prior behaviour exactly', () => {
    const withFlag = withholdUngradedGateQuestion({
      text: socratic, phase: 'PRACTICE', hasStructuredMcq: false, gateSoughtThisTurn: true, gateBlockedByExcursion: false,
    })
    const withoutFlag = withholdUngradedGateQuestion({
      text: socratic, phase: 'PRACTICE', hasStructuredMcq: false, gateSoughtThisTurn: true,
    })
    expect(withoutFlag).toEqual(withFlag)
  })

  it('NEGATIVE CONTROL: a stray question alongside an attached MCQ is still repaired', () => {
    const r = withholdUngradedGateQuestion({
      text: 'Good. Now, separately, what is your favourite unit of force?',
      phase: 'CHECK',
      hasStructuredMcq: true,
      attachedMcqQuestion: 'In F = ma, which force does the F stand for?',
      gateBlockedByExcursion: false,
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('stray-question-alongside-mcq')
  })

  it('NEGATIVE CONTROL: a completed lesson is still untouched', () => {
    const r = withholdUngradedGateQuestion({
      text: socratic, phase: 'CHECK', hasStructuredMcq: false, gateSoughtThisTurn: true, lessonCompleted: true,
    })
    expect(r.withheld).toBe(false)
  })
})

describe('safety invariants R1-R4 must not have touched', () => {
  it('the return anchor is always the lesson — no nesting', () => {
    const d = open({ message: 'now explain kinetic energy instead', requestedConceptId: 'phys.mech.kinetic-energy' })
    expect(d.state.returnToConceptId).toBe(LESSON)
  })

  it('confusion does not close an excursion', () => {
    const d = open({ message: "i don't understand this at all" })
    expect(d.state.active).toBe(true)
  })

  it('an ambiguous turn still holds rather than switching', () => {
    const d = open({ message: 'im done for today but why does it bend', ambiguous: true } as never)
    expect(d.state.active).toBe(true)
    expect(d.transition).toBe('continued')
  })

  it('a lesson change under the excursion still releases it', () => {
    const d = open({ lessonConceptId: 'phys.mech.kinetic-energy', message: 'ok' })
    expect(d.transition).toBe('closed-lesson-changed')
  })
})
