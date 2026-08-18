/**
 * ONE ASSESSMENT TURN = ONE CANONICAL QUESTION.
 *
 * ── WHAT A LEARNER ACTUALLY SAW (end-user smoke test, phys.mech.velocity) ───
 * Turn 7 — the tutor's prose asked "A car drives 60 km east then 60 km west,
 * what is the average velocity?" with options A-D, while the tappable buttons
 * beneath asked "60 km/h vs 60 km/h northbound — which is speed and which is
 * velocity?" with options A-B. Whatever they tapped would have been graded
 * against a question they never read.
 *
 * Turn 8 — they said so. The tutor replied "please answer the question on your
 * screen about the car driving east and west, options A, B, C and D" while the
 * screen had by then moved to a THIRD probe, about a swimmer.
 *
 * Two independent causes, fixed and tested independently:
 *   P0-a  the gate selected a NEW probe on every gate-eligible turn, because
 *         `findBestProbe`'s excludeProbeStem guarantees a fresh one and nothing
 *         checked whether one was already on screen unanswered.
 *   P0-b  the model wrote its own assessment beside the canonical one. The
 *         prompt already forbids this in capitals; it is advisory, so the
 *         runtime enforces it the way buildLessonCloseText already does.
 *
 * Also covered: authoring labels ("DIAGNOSTIC:", "FORMATIVE:") reaching the
 * learner as the first word of their practice question, and a readiness
 * confirmation being answered with a stored explanation essay.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import {
  containsOptionList,
  enforceGateProbeContract,
  stripAuthoringLabel,
} from '@/lib/teaching/gateProbeContract'
import { probeToMcq } from '@/lib/teaching/gateAssessment'
import { gradeMcqAnswer } from '@/lib/teaching/mcq'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

/** The canonical probe, shaped exactly as the corpus stores one. */
const PROBE = {
  stem: 'FORMATIVE: 60 km/h vs. 60 km/h northbound — which is a speed and which a velocity?',
  choices: [
    { text: 'The first is speed (scalar, no direction); the second is velocity (vector, has direction)', isCorrect: true },
    { text: 'They are the same quantity just phrased differently', isCorrect: false },
  ],
}

/** The real violating turn, reproduced from the smoke test. */
const VIOLATING_PROSE = [
  'Claude, that is completely correct! Here is your second and final practice question:',
  '',
  "A car drives 60 km east in 1 hour, and then drives 60 km west in 1 hour. What is the car's average velocity for the entire trip?",
  'A) 60 kilometres per hour',
  'B) 0 kilometres per hour',
  'C) 120 kilometres per hour',
  'D) 30 kilometres per hour',
].join('\n')

describe('P0-b — the model cannot put a second assessment on the turn', () => {
  it('THE REAL TURN: a model-authored option list is detected', () => {
    expect(containsOptionList(VIOLATING_PROSE)).toBe(true)
  })

  it('THE REAL TURN: the competing question and its options are removed', () => {
    const r = enforceGateProbeContract({
      text: VIOLATING_PROSE,
      leadIn: 'Let us see whether that idea holds in a new situation.',
      canonicalQuestion: PROBE.stem,
    })
    expect(r.replaced).toBe(true)
    expect(r.reason).toBe('model_wrote_own_options')
    expect(r.text).not.toContain('60 km east')
    expect(containsOptionList(r.text)).toBe(false)
    // THE REACTION SURVIVES. The first version of this repair replaced the whole
    // turn, so a learner's correct answer came back with no acknowledgement at
    // all — a worse turn than the one being fixed. Caught in verification.
    expect(r.text).toContain('completely correct')
  })

  it('REGRESSION: a restatement of the CANONICAL question is not a competing one', () => {
    // Observed in production: the learner asked for a reminder and the tutor
    // helpfully repeated the same question and its options. That is duplication,
    // not contradiction, and the explanation around it must survive.
    const restated = [
      'Claude, no problem at all. Average velocity is displacement over time.',
      '',
      'Now, with that in mind, let us look at the question again:',
      '',
      '60 km/h vs. 60 km/h northbound - which is a speed and which a velocity?',
      'A) The first is speed; the second is velocity',
      'B) They are the same quantity',
    ].join('\n')
    const r = enforceGateProbeContract({ text: restated, leadIn: null, canonicalQuestion: PROBE.stem })
    expect(r.text).toContain('Average velocity is displacement over time')
    expect(containsOptionList(r.text)).toBe(false)
  })

  it('falls back to a content-free lead-in when the renderer refused', () => {
    // The renderer refuses on a non-English lesson, an attached figure, or an
    // answer still owed a reaction. A broken turn still must not ship two
    // questions, and the repair must not invent praise or progress.
    // Only when NOTHING survives the cut - i.e. the whole turn was the
    // competing assessment.
    const bare = 'What is the average velocity?\nA) zero\nB) two'
    const r = enforceGateProbeContract({ text: bare, leadIn: null, canonicalQuestion: PROBE.stem })
    expect(r.replaced).toBe(true)
    expect(r.text).toBe('Here is your next question.')
    expect(r.text).not.toMatch(/you (mastered|got|did)|well done|excellent/i)
  })

  it('ORDINARY LEAD-IN PROSE IS NEVER TOUCHED — the important negative', () => {
    for (const good of [
      'Let us check that idea against a round trip.',
      'This next one is the case people usually get wrong, so take your time.',
      'Claude, you nailed the arithmetic. Here is one that pushes it a bit further.',
      'A. Einstein noticed the same thing about trains.',
      'Try these in order: 1) walk out, 2) walk back.',
    ]) {
      expect(containsOptionList(good)).toBe(false)
      expect(enforceGateProbeContract({ text: good, leadIn: 'x', canonicalQuestion: PROBE.stem }).replaced).toBe(false)
    }
  })

  it('a code fence containing letters is not an option list', () => {
    expect(containsOptionList('Look at this:\n```\nA) foo\nB) bar\n```\nWhat do you notice.')).toBe(false)
  })

  it('needs BOTH A and B — one stray letter is not an assessment', () => {
    expect(containsOptionList('C) this is a fragment')).toBe(false)
    expect(containsOptionList('A) only one option')).toBe(false)
  })

  it('never throws, whatever the input', () => {
    for (const t of ['', '   ', 'A)\nB)', '```', ' ']) {
      expect(() => enforceGateProbeContract({ text: t, leadIn: null, canonicalQuestion: '' })).not.toThrow()
    }
  })
})

describe('B — a competing question WITHOUT an option list', () => {
  // Observed in production after the option-list repair shipped: the widget
  // asked "You walk 6 m north and then 6 m south in 12 s…" while the model's
  // prose asked about a train travelling 120 miles. No A/B/C/D list, so the
  // option-list detector did not fire and the learner was asked two different
  // things at once.
  const TRAIN = [
    'Suppose a train travels 120 miles due north in 2 hours, and then turns around',
    'and travels 120 miles due south back to its exact starting point.',
    '',
    'In your own words, what is the train average speed for the entire journey?',
  ].join('\n')

  it('THE DEFECT SHAPE: no option list is present', () => {
    expect(containsOptionList(TRAIN)).toBe(false)
  })

  it('THE FIX: the competing question is removed anyway', () => {
    const r = enforceGateProbeContract({
      text: TRAIN, leadIn: null,
      canonicalQuestion: 'You walk 6 m north and then 6 m south in 12 s. What is your average speed?',
    })
    expect(r.replaced).toBe(true)
    expect(r.text).not.toContain('train average speed for the entire journey')
  })

  it('a RESTATEMENT of the canonical question is still kept', () => {
    const restated = 'Let us look at it again.\n\nYou walk 6 m north and then 6 m south in 12 s. What is your average speed?'
    const r = enforceGateProbeContract({
      text: restated, leadIn: null,
      canonicalQuestion: 'You walk 6 m north and then 6 m south in 12 s. What is your average speed?',
    })
    expect(r.replaced).toBe(false)
    expect(r.text).toBe(restated)
  })

  it('ordinary lead-in prose with no question is untouched', () => {
    const lead = 'Let us check that idea against a round trip.'
    expect(enforceGateProbeContract({ text: lead, leadIn: null, canonicalQuestion: 'x y z' }).replaced).toBe(false)
  })
})

describe('P0 safety contract — the probe itself is untouched', () => {
  it('selected probe P produces widget P, options and key intact', () => {
    const mcq = probeToMcq(PROBE)!
    expect(mcq.options).toEqual([
      'The first is speed (scalar, no direction); the second is velocity (vector, has direction)',
      'They are the same quantity just phrased differently',
    ])
    expect(mcq.correctIndex).toBe(0)
  })

  it('grading still evaluates against P after the prose was replaced', () => {
    const mcq = probeToMcq(PROBE)!
    enforceGateProbeContract({ text: VIOLATING_PROSE, leadIn: null, canonicalQuestion: mcq.question })
    expect(gradeMcqAnswer('A', mcq).correct).toBe(true)
    expect(gradeMcqAnswer('B', mcq).correct).toBe(false)
    expect(gradeMcqAnswer('who knows', mcq).correct).toBeNull()
  })

  it('an unconvertible probe still yields NO widget — no fabricated question', () => {
    expect(probeToMcq({ stem: 'q', choices: null })).toBeNull()
    expect(probeToMcq({ stem: 'q', choices: [{ text: 'a', isCorrect: true }, { text: 'b', isCorrect: true }] })).toBeNull()
  })
})

describe('P1 — authoring labels never reach a learner', () => {
  it('strips the labels the corpus actually carries', () => {
    expect(stripAuthoringLabel('DIAGNOSTIC: A car travels at 60 km/h. Is that a scalar or a vector?'))
      .toBe('A car travels at 60 km/h. Is that a scalar or a vector?')
    expect(stripAuthoringLabel('FORMATIVE: 60 km/h vs. 60 km/h northbound'))
      .toBe('60 km/h vs. 60 km/h northbound')
  })

  it('is applied at the single choke point, so the widget is already clean', () => {
    expect(probeToMcq(PROBE)!.question).toBe(
      '60 km/h vs. 60 km/h northbound — which is a speed and which a velocity?',
    )
  })

  it('strips PRACTICE: — met live in a production lesson', () => {
    // Observed as a real learner, phys.em.kirchhoffs-laws, PRACTICE phase: the
    // tappable widget's first word was the authoring label.
    //   "PRACTICE: While writing a KVL loop you traverse a resistor OPPOSITE…"
    // Every other label in the corpus was already covered; this one was simply
    // missing from the list.
    expect(stripAuthoringLabel('PRACTICE: While writing a KVL loop you traverse a resistor OPPOSITE to the assumed current direction. What sign does the IR term take?'))
      .toBe('While writing a KVL loop you traverse a resistor OPPOSITE to the assumed current direction. What sign does the IR term take?')
  })

  it('does not eat the word "practice" used normally', () => {
    const stem = 'Practice makes perfect. Which law applies at a junction?'
    expect(stripAuthoringLabel(stem)).toBe(stem)
  })

  it('leaves a normal stem completely alone', () => {
    const stem = 'What is the average velocity for the round trip?'
    expect(stripAuthoringLabel(stem)).toBe(stem)
  })

  it('does not eat a word that merely starts with a label name', () => {
    expect(stripAuthoringLabel('Diagnostics are used by mechanics. What does the reading mean?'))
      .toBe('Diagnostics are used by mechanics. What does the reading mean?')
  })

  it('strips parenthetical authoring metadata', () => {
    expect(stripAuthoringLabel('DIAGNOSTIC (Prerequisite Diagnostic PD-2): A 2 kg object moves in a curve…'))
      .toBe('A 2 kg object moves in a curve…')
    expect(stripAuthoringLabel('FORMATIVE (Mastery Probe MP-1, axis independence): A ball rolls off a table'))
      .toBe('A ball rolls off a table')
    expect(stripAuthoringLabel('DIAGNOSTIC (pre-teaching entry check): Is the SI base unit for temperature the degree Celsius?'))
      .toBe('Is the SI base unit for temperature the degree Celsius?')
    expect(stripAuthoringLabel('DIAGNOSTIC (P4-a, prereq: Q=mcΔT): How much heat is needed?'))
      .toBe('How much heat is needed?')
  })

  it('is idempotent and never empties a stem', () => {
    expect(stripAuthoringLabel(stripAuthoringLabel('PROBE: x'))).toBe('x')
    expect(stripAuthoringLabel('DIAGNOSTIC:')).toBe('DIAGNOSTIC:')
  })
})

describe('route wiring — the two runtime rules', () => {
  it('P0-a: the gate does NOT run while an unanswered probe is on screen', () => {
    expect(ROUTE).toContain('const unansweredProbeOnScreen = pendingMcqHoisted !== null && mcqGradeHoisted === null')
    expect(ROUTE).toContain('!unansweredProbeOnScreen &&')
  })

  it('P1: a bare readiness ack at a gate does not serve a stored explanation', () => {
    expect(ROUTE).toContain('let serveFromMemory = assembled !== null && !answersPendingQuestion && !readinessAtGate')
  })

  it('the readiness guard is SCOPED — bare ack AND a mastery gate, not every "yes"', () => {
    expect(ROUTE).toMatch(/const readinessAtGate = isBareAckHoisted && isGatePhase\(/)
  })

  it('answersPendingQuestion is unchanged — it still gates on the grade alone', () => {
    expect(ROUTE).toContain('const answersPendingQuestion = mcqGradeHoisted !== null')
  })

  it('the contract runs only with a canonical probe attached', () => {
    expect(ROUTE).toContain('if (gateMcqHoisted && mcqHoisted) {')
    expect(ROUTE).toContain('enforceGateProbeContract')
  })

  it('no provider call was added by any of this', () => {
    expect((ROUTE.match(/await routeAI\(/g) ?? []).length).toBe(3)
  })

  it('mastery, grading and the attach line are untouched', () => {
    expect(ROUTE).toContain('mcqHoisted = gateMcqHoisted ?? mcqParse.mcq')
    expect(ROUTE).toContain('servedFromMemory || servedByGateRenderer || servedByLessonComplete')
  })
})
