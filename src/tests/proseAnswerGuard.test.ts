/**
 * AN ANSWER TO A PROSE QUESTION IS NOT A REQUEST FOR AN EXPLANATION.
 *
 * ── WHAT A LEARNER ACTUALLY GOT (end-user smoke test, phys.mech.velocity) ───
 * The tutor asked, in prose: "if a car drives five hundred kilometres along a
 * winding mountain road and ends up two hundred kilometres from where it
 * started, which is larger — its average speed or the magnitude of its average
 * velocity?"
 *
 * The learner answered, correctly and with reasoning: "the speed would be
 * bigger i think, because the road winds around so you travel more than the
 * straight line distance."
 *
 * The runtime served a stored explanation essay. MEASURED in production:
 * teachingRuleId=D1-MEMORY-HIT, SERVE_EXPLANATION_MEMORY, EXPLANATION_MEMORY,
 * llmCallCount=0 — the same essay both times it happened. The learner had to
 * ask "was my answer right?" to get any reaction at all.
 *
 * ── ROOT CAUSE ──────────────────────────────────────────────────────────────
 * `answersPendingQuestion` is `mcqGradeHoisted !== null` — keyed on the MCQ
 * GRADE. It recognises an answer to a WIDGET question and is blind to an answer
 * to a PROSE one, so `serveFromMemory` stayed true.
 *
 * The decision engine has the same asymmetry: D4b-ANSWER-STUDENT-FIRST protects
 * learners who ASK ("a stored explanation keyed to the concept is not an answer
 * to the student's specific question") and there is no rule protecting learners
 * who ANSWER.
 *
 * ── SCOPE ───────────────────────────────────────────────────────────────────
 * This composes the two detectors that already exist — `repliesWithQuestion`
 * and `isBareAcknowledgement` — into the guard. No new detector, no change to
 * `answersPendingQuestion`, no change to D4b, no change to the ladder, and no
 * new provider call site.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { answersProseQuestion, isBareAcknowledgement } from '@/lib/teaching/masteryGate'
import { repliesWithQuestion, isLowSignalAcknowledgement } from '@/lib/teaching/conversationState'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

/** The real tutor turn, from the smoke test. */
const TUTOR_ASKED =
  'Notice how the average speed is larger than the magnitude of the average '
  + 'velocity. Let us test this: if a car drives five hundred kilometres along a '
  + 'winding mountain road and ends up two hundred kilometres straight-line '
  + 'distance from where it started, which one is larger for that trip?'

const TUTOR_DID_NOT_ASK =
  'Average speed is total distance divided by total time. Average velocity is '
  + 'total displacement divided by total time.'

describe('THE REAL DEFECT', () => {
  it('the learner\'s actual answer is recognised as an answer', () => {
    expect(answersProseQuestion({
      lastAssistantText: TUTOR_ASKED,
      learnerMessage: 'the speed would be bigger i think, because the road winds around so you travel more than the straight line distance',
    })).toBe(true)
  })

  it('a short answer counts too — reasoning is not required', () => {
    for (const answer of ['zero', 'the speed', 'B', 'about 2 metres per second']) {
      expect(answersProseQuestion({ lastAssistantText: TUTOR_ASKED, learnerMessage: answer })).toBe(true)
    }
  })
})

describe('the four cases the guard must separate', () => {
  it('ANSWER to the tutor\'s question -> guard fires (memory must not serve)', () => {
    expect(answersProseQuestion({ lastAssistantText: TUTOR_ASKED, learnerMessage: 'zero, because it ends where it started' })).toBe(true)
  })

  it('"why?" / "explain more" -> guard does NOT fire, D4b keeps the turn', () => {
    // These are questions, not answers. D4b already owns them and its
    // behaviour is deliberately untouched by this change.
    for (const q of ['why?', 'why is that?', 'can you explain more?', 'i dont understand, can you explain that again?']) {
      expect(answersProseQuestion({ lastAssistantText: TUTOR_ASKED, learnerMessage: q })).toBe(false)
    }
  })

  it('bare "ok" / "go on" -> guard does NOT fire, existing behaviour unchanged', () => {
    for (const ack of ['ok', 'okay', 'got it', 'yes', 'go on', 'continue']) {
      expect(isBareAcknowledgement(ack)).toBe(true)
      expect(answersProseQuestion({ lastAssistantText: TUTOR_ASKED, learnerMessage: ack })).toBe(false)
    }
  })

  it('readiness phrases are low-signal acks, NOT bare acks', () => {
    for (const phrase of ['ready', 'yes ready', 'im ready', "i'm ready", 'ok ready',
      "let's go", 'lets go', 'go ahead', 'yes im ready']) {
      expect(isLowSignalAcknowledgement(phrase)).toBe(true)
      expect(isBareAcknowledgement(phrase)).toBe(false)
    }
  })

  it('NO PREVIOUS QUESTION -> memory remains available', () => {
    // The critical negative. Explanation Memory is the zero-call authored path;
    // suppressing it on turns the tutor never asked about would be a
    // significant and unjustified regression.
    expect(repliesWithQuestion(TUTOR_DID_NOT_ASK)).toBe(false)
    expect(answersProseQuestion({
      lastAssistantText: TUTOR_DID_NOT_ASK,
      learnerMessage: 'tell me more about displacement',
    })).toBe(false)
  })

  it('no previous assistant turn at all -> guard does not fire', () => {
    expect(answersProseQuestion({ lastAssistantText: null, learnerMessage: 'anything' })).toBe(false)
    expect(answersProseQuestion({ lastAssistantText: '', learnerMessage: 'anything' })).toBe(false)
  })

  it('an empty learner message is not an answer', () => {
    expect(answersProseQuestion({ lastAssistantText: TUTOR_ASKED, learnerMessage: '   ' })).toBe(false)
  })

  it('reuses the EXISTING detectors — the question test is repliesWithQuestion', () => {
    // A tutor turn with no question mark cannot arm the guard, whatever the
    // learner says, because that is exactly what repliesWithQuestion reports.
    expect(answersProseQuestion({ lastAssistantText: 'Speed is distance over time.', learnerMessage: 'ten' })).toBe(false)
  })

  it('never throws', () => {
    for (const t of [null, '', '?', '```?```']) {
      expect(() => answersProseQuestion({ lastAssistantText: t, learnerMessage: 'x' })).not.toThrow()
    }
  })
})

describe('THE GATE RESIDUAL — a widget question is still a question', () => {
  // Measured in production AFTER the first version of this guard shipped.
  // The gate lead-in carried no '?', and gradeMcqAnswer refused to parse the
  // learner's answer, so BOTH guards missed and the stored essay served.
  const GATE_LEAD_IN = "Now let's tackle our first practice question to lock this in."

  it('the real lead-in genuinely contains no question mark', () => {
    expect(repliesWithQuestion(GATE_LEAD_IN)).toBe(false)
  })

  it('THE DEFECT: without the pending-question signal the guard is blind', () => {
    expect(answersProseQuestion({
      lastAssistantText: GATE_LEAD_IN,
      learnerMessage: 'A. 400 over 80 is 5 for the speed, and the velocity is 0 because they end at the start line',
    })).toBe(false)
  })

  it('THE FIX: a pending widget question arms the guard', () => {
    expect(answersProseQuestion({
      lastAssistantText: GATE_LEAD_IN,
      learnerMessage: 'A. 400 over 80 is 5 for the speed, and the velocity is 0 because they end at the start line',
      pendingQuestionOnScreen: true,
    })).toBe(true)
  })

  it('a pending question does NOT swallow a genuine question — D4b keeps it', () => {
    expect(answersProseQuestion({
      lastAssistantText: GATE_LEAD_IN, learnerMessage: 'what does displacement mean?', pendingQuestionOnScreen: true,
    })).toBe(false)
  })

  it('a pending question does NOT swallow a bare acknowledgement', () => {
    expect(answersProseQuestion({
      lastAssistantText: GATE_LEAD_IN, learnerMessage: 'ok', pendingQuestionOnScreen: true,
    })).toBe(false)
  })

  it('no pending question and no prose question -> memory still available', () => {
    expect(answersProseQuestion({
      lastAssistantText: 'Speed is distance over time.', learnerMessage: 'ten', pendingQuestionOnScreen: false,
    })).toBe(false)
  })

  it('the route passes the pending-MCQ signal', () => {
    expect(ROUTE).toContain('pendingQuestionOnScreen: pendingMcqHoisted !== null,')
  })

  it('GRADING IS UNTOUCHED — the guard never inspects or moves a grade', () => {
    expect(ROUTE).toContain('const answersPendingQuestion = mcqGradeHoisted !== null')
    expect(ROUTE).toContain('const g = gradeMcqAnswer(message, pendingMcqHoisted)')
  })
})

describe('route wiring — narrowly scoped, nothing else moved', () => {
  it('the guard is applied to serveFromMemory alongside the existing guards', () => {
    expect(ROUTE).toContain(
      'let serveFromMemory = assembled !== null && !answersPendingQuestion && !readinessAtGate && !answersProse && !ackToQuestion',
    )
  })

  it('answersPendingQuestion is UNCHANGED — still the MCQ grade alone', () => {
    expect(ROUTE).toContain('const answersPendingQuestion = mcqGradeHoisted !== null')
  })

  it('the MCQ answer path is untouched', () => {
    expect(ROUTE).toContain('mcqHoisted = gateMcqHoisted ?? mcqParse.mcq')
    expect(ROUTE).toContain('const g = gradeMcqAnswer(message, pendingMcqHoisted)')
  })

  it('the gate readiness guard from the previous fix still stands', () => {
    expect(ROUTE).toMatch(/const readinessAtGate = isBareAckHoisted && isGatePhase\(/)
  })

  it('a low-signal ack to a question suppresses memory in ANY phase', () => {
    expect(ROUTE).toContain('const ackToQuestion = isLowSignalAcknowledgement(message)')
    expect(ROUTE).toContain('repliesWithQuestion(lastAssistantText)')
  })

  it('the catch-block fallback carries every guard the primary line does', () => {
    expect(ROUTE).toContain(
      'serveFromMemory = assembled !== null && !answersPendingQuestion && !readinessAtGate && !answersProse && !ackToQuestion',
    )
  })

  it('NO ADDITIONAL PROVIDER CALL SITE', () => {
    expect((ROUTE.match(/await routeAI\(/g) ?? []).length).toBe(3)
  })

  it('D1-MEMORY-HIT is still reachable — the decision engine is not touched', () => {
    const ENGINE = readFileSync(join(process.cwd(), 'src/lib/understanding/decisionEngine.ts'), 'utf8')
    expect(ENGINE).toContain("'SERVE_EXPLANATION_MEMORY', 'D1-MEMORY-HIT'")
    // D4b keeps its own trigger set, unchanged.
    expect(ENGINE).toContain("u.studentIntent.value === 'asking_question' || u.studentIntent.value === 'requesting_help'")
  })

  it('the mastery ladder and grading semantics are not referenced by this change', () => {
    const GUARD = readFileSync(join(process.cwd(), 'src/lib/teaching/masteryGate.ts'), 'utf8')
    // Comments stripped first: the header legitimately EXPLAINS what the guard
    // leaves alone (grading, mastery counters), and a test that forbade
    // describing the contract would be a bad test.
    const raw = GUARD.slice(GUARD.indexOf('export function answersProseQuestion'))
    const fn = raw.slice(0, raw.indexOf('\n}') + 2)
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '')
    for (const forbidden of ['correctAtCheck', 'correctAtPractice', 'gradeMcqAnswer', 'phase']) {
      expect(fn).not.toContain(forbidden)
    }
  })
})
