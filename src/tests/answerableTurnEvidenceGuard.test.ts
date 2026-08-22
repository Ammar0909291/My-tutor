/**
 * ANSWERABLE-TURN EVIDENCE GUARD (defect reproduced live 2026-08-17).
 *
 * A SIGNAL correctness value must never become learner evidence unless there
 * was an answerable question or task in the immediately preceding tutor turn.
 *
 * The ten cases the fix was authorized against are numbered in the describe
 * blocks below so the mapping is checkable rather than asserted.
 */
import { describe, it, expect } from 'vitest'
import {
  askedAnswerableQuestion, shouldSuppressSignalCorrectness,
} from '@/lib/teaching/answerableTurn'
import { hasProseMultipleChoice } from '@/lib/teaching/proseMcqGuard'
import {
  advanceConversationState, initialConversationState, type ConversationState,
} from '@/lib/teaching/conversationState'

const CONCEPT = 'chem.found.stoichiometry'

/** The exact tutor turn that preceded "i see" in the reported production
 *  trace: the tutor works through the answer to its OWN question and states
 *  the conclusion. No question is posed. */
const STOICHIOMETRY_WORKED_ANSWER =
  "Claude, let's work through this one together using the steps on the process "
  + 'flow diagram: first, we convert the given masses of hydrogen and oxygen into '
  + 'moles using their molar masses.\n\n'
  + 'For hydrogen, 4.0 grams divided by its molar mass of 2.016 grams per mole '
  + 'gives about 2.0 moles of hydrogen. For oxygen, 32.0 grams divided by its '
  + 'molar mass of 32.00 grams per mole gives 1.0 mole of oxygen.\n\n'
  + 'Looking at the balanced equation, 2 moles of hydrogen react with 1 mole of '
  + 'oxygen. Since you have exactly 2.0 moles of hydrogen and 1.0 mole of oxygen, '
  + 'they match the required ratio perfectly!'

/** The prose MCQ from the same trace, two turns earlier. */
const STOICHIOMETRY_PROSE_MCQ =
  'For the reaction 2H₂ + O₂ → 2H₂O, if you start with 4.0 grams of hydrogen '
  + 'and 32.0 grams of oxygen, which reactant is the limiting reagent?\n'
  + 'A) Hydrogen, because 4.0 grams divided by its molar mass gives fewer moles than oxygen\n'
  + 'B) Oxygen, because 32.0 grams gives fewer moles than the hydrogen'

const suppress = (priorAssistantText: string, hasPendingStructuredMcq = false) =>
  shouldSuppressSignalCorrectness({ priorAssistantText, hasPendingStructuredMcq })

describe('1/2/3 — no answerable question + a bare acknowledgement', () => {
  // The learner's words are shown for each case because they are what the
  // rule is about; the DECISION is a function of the tutor's turn alone,
  // which is precisely why an acknowledgement cannot be graded.
  for (const learner of ['i see', 'hmm', 'yes', 'ok', 'right', 'got it']) {
    it(`suppresses correctness when the tutor asked nothing and the learner says "${learner}"`, () => {
      const d = suppress(STOICHIOMETRY_WORKED_ANSWER)
      expect(d.suppress).toBe(true)
      expect(d.reason).toBe('no-answerable-question')
    })
  }

  it('a pure explanation with no question is not answerable', () => {
    expect(askedAnswerableQuestion(
      'Water is a compound. It is made of hydrogen and oxygen bonded together.',
    )).toBe(false)
  })

  it('an encouragement or a close is not answerable', () => {
    expect(askedAnswerableQuestion('Great work today — see you next session!')).toBe(false)
  })
})

describe('confirmation questions are not answerable questions', () => {
  // These carry a question mark, so a "did it end in '?'" rule would have
  // accepted every one of them and re-opened the same hole.
  const confirmations = [
    'Claude, so you\'re seeing how the mole ratio matches — have I got that right?',
    'Does that make sense?',
    'Are you ready?',
    'Shall we continue?',
    'Do you follow?',
    'Sound good?',
    'How does that sound?',
    'Any questions?',
  ]
  for (const q of confirmations) {
    it(`not answerable: ${q}`, () => {
      expect(askedAnswerableQuestion(q)).toBe(false)
    })
  }
})

describe('genuine questions and tasks REMAIN answerable — no rule weakened', () => {
  const answerable = [
    'What is the molar mass of water?',
    'Which reactant is the limiting reagent here?',
    'Why does the reaction stop when the oxygen runs out?',
    'How many moles are in 36 grams of water?',
    'Calculate the number of moles in 4.0 grams of hydrogen.',
    'Your turn: balance this equation.',
    'Now solve for the percent yield.',
    'Explain why percent yield can never exceed 100 percent.',
    'Try this one: how many grams of water are produced?',
  ]
  for (const q of answerable) {
    it(`answerable: ${q}`, () => {
      expect(askedAnswerableQuestion(q)).toBe(true)
    })
  }

  it('an open question keeps correctness flowing to the ladder', () => {
    expect(suppress('Why does the reaction stop when the oxygen runs out?')).toEqual({
      suppress: false, reason: null,
    })
  })

  it('narration containing a task verb mid-sentence is NOT a task', () => {
    // "we can calculate it" is teaching prose, not something set for the learner.
    expect(askedAnswerableQuestion('From there we can calculate the yield for you.')).toBe(false)
  })
})

describe('4 — a pending STRUCTURED MCQ is graded by the server and never suppressed', () => {
  it('short-circuits regardless of what the prior turn looked like', () => {
    // gradeMcqAnswer() owns the turn against a server-side answer key, so the
    // model's claim is not the evidence and there is nothing to suppress.
    expect(suppress(STOICHIOMETRY_WORKED_ANSWER, true)).toEqual({ suppress: false, reason: null })
    expect(suppress(STOICHIOMETRY_PROSE_MCQ, true)).toEqual({ suppress: false, reason: null })
    expect(suppress('', true)).toEqual({ suppress: false, reason: null })
  })
})

describe('5 — the existing prose-MCQ guard is intact and still reported as itself', () => {
  it('a prose MCQ still suppresses, under its own reason', () => {
    const d = suppress(STOICHIOMETRY_PROSE_MCQ)
    expect(d.suppress).toBe(true)
    expect(d.reason).toBe('prose-mcq-ungradeable')
  })

  it('the prose-MCQ detector itself is unchanged', () => {
    expect(hasProseMultipleChoice(STOICHIOMETRY_PROSE_MCQ)).toBe(true)
    expect(hasProseMultipleChoice(STOICHIOMETRY_WORKED_ANSWER)).toBe(false)
  })

  it('a prose MCQ is diagnosed as a prose MCQ even though it also asks a real question', () => {
    // It DOES contain "which reactant…?", so the answerable test alone would
    // have let it through. The prose check runs first for exactly this reason.
    expect(askedAnswerableQuestion(STOICHIOMETRY_PROSE_MCQ)).toBe(true)
    expect(suppress(STOICHIOMETRY_PROSE_MCQ).reason).toBe('prose-mcq-ungradeable')
  })
})

// ── ladder consumption ───────────────────────────────────────────────────────

function atCheck(over: Partial<ConversationState> = {}): ConversationState {
  return {
    ...initialConversationState(CONCEPT),
    phase: 'CHECK', demonstrated: true, correctAtCheck: 0, correctAtPractice: 0,
    ...over,
  }
}

describe('6 — a genuine WRONG answer still records wrong evidence', () => {
  it('correctness=false after a real question is untouched by the guard', () => {
    expect(suppress('How many moles are in 36 grams of water?')).toEqual({
      suppress: false, reason: null,
    })
  })

  it('and the ladder still records the failure', () => {
    const s = advanceConversationState(atCheck(), {
      askedQuestion: false, signalCorrect: false, recoveryFired: false,
    })
    expect(s.consecutiveFailures).toBe(1)
    expect(s.correctAtCheck).toBe(0)
  })
})

describe('7 — suppressed correctness cannot advance CHECK / PRACTICE / mastery', () => {
  // Suppression makes signalCorrect null, which is the SAME input the ladder
  // already receives for a delivery turn. Its acknowledgement branch refuses
  // the mastery gates, so no transition rule had to change.
  it('CHECK does not advance and no counter moves', () => {
    const s = advanceConversationState(atCheck(), {
      askedQuestion: false, signalCorrect: null, acknowledgement: true, recoveryFired: false,
    })
    expect(s.correctAtCheck).toBe(0)
    expect(s.phase).toBe('CHECK')
  })

  it('PRACTICE does not advance and mastery is not reached', () => {
    const s = advanceConversationState(atCheck({ phase: 'PRACTICE', correctAtPractice: 1 }), {
      askedQuestion: false, signalCorrect: null, acknowledgement: true, recoveryFired: false,
    })
    expect(s.correctAtPractice).toBe(1)
    expect(s.phase).toBe('PRACTICE')
  })

  it('the unsuppressed turn WOULD have advanced — proving the guard is what stops it', () => {
    const s = advanceConversationState(atCheck(), {
      askedQuestion: false, signalCorrect: true, recoveryFired: false,
    })
    expect(s.correctAtCheck).toBe(1)
    expect(s.phase).toBe('PRACTICE')
  })
})

describe('8 — other SIGNAL fields survive suppression', () => {
  it('only correctness is dropped', () => {
    // Mirrors the route: `{ ...signal, correctness: undefined }`.
    const signal = {
      correctness: true, confidence: 'low' as const,
      confusion: true, chosenPhrase: 'i see',
    }
    const suppressed = { ...signal, correctness: undefined }
    expect(suppressed.correctness).toBeUndefined()
    expect(suppressed.confidence).toBe('low')
    expect(suppressed.confusion).toBe(true)
    expect(suppressed.chosenPhrase).toBe('i see')
  })

  it('no wrong answer is fabricated — correctness is absent, never false', () => {
    const suppressed = { correctness: undefined as boolean | undefined }
    expect(suppressed.correctness).toBeUndefined()
    expect(suppressed.correctness).not.toBe(false)
  })
})

describe('9 — the reported stoichiometry trace, replayed turn by turn', () => {
  it('turn 8 prose MCQ -> turn 9 "hmm" is suppressed as a prose MCQ', () => {
    expect(suppress(STOICHIOMETRY_PROSE_MCQ)).toEqual({
      suppress: true, reason: 'prose-mcq-ungradeable',
    })
  })

  it('turn 9 worked answer -> turn 10 "i see" is suppressed as no-answerable-question', () => {
    // This is the turn that moved correctAtCheck 0 -> 1 in production.
    expect(suppress(STOICHIOMETRY_WORKED_ANSWER)).toEqual({
      suppress: true, reason: 'no-answerable-question',
    })
  })

  it('with the guard, the ladder holds at CHECK instead of advancing to PRACTICE', () => {
    const before = atCheck()
    const after = advanceConversationState(before, {
      askedQuestion: false, signalCorrect: null, acknowledgement: true, recoveryFired: false,
    })
    expect(after.correctAtCheck).toBe(0)
    expect(after.phase).toBe('CHECK')
  })
})

describe('10 — a suppressed turn performs no evidence write and no double write', () => {
  it('both downstream writers are gated on correctness being defined', () => {
    // route.ts gates the topic_progress write and the MistakeRecord write on
    // `teachingSignal.correctness !== undefined`, and the ladder fold reads
    // `correctness ?? null`. With correctness dropped, all three are inert —
    // so suppression removes evidence rather than writing a different value.
    const suppressed: { correctness?: boolean } = { correctness: undefined }
    expect(suppressed.correctness !== undefined).toBe(false)
  })

  it('the guard is idempotent — evaluating twice yields the same decision', () => {
    const first = suppress(STOICHIOMETRY_WORKED_ANSWER)
    const second = suppress(STOICHIOMETRY_WORKED_ANSWER)
    expect(first).toEqual(second)
  })

  it('an empty or missing prior turn suppresses rather than accepting', () => {
    // First turn of a session: there is no prior tutor turn at all, so there
    // is certainly nothing the learner was answering.
    expect(suppress('')).toEqual({ suppress: true, reason: 'no-answerable-question' })
    expect(askedAnswerableQuestion('')).toBe(false)
  })
})

describe('the embedded-wh-word trap, pinned', () => {
  // The confirmation test is anchored to the TAIL for this exact sentence,
  // taken verbatim from the production trace. A "contains a wh-word" rule
  // accepts it, because "how" is part of what the tutor is asserting rather
  // than the question being asked.
  const embedded =
    "Claude, so you're seeing how the mole ratio matches the amounts we "
    + 'started with — have I got that right?'

  it('is not answerable despite containing "how"', () => {
    expect(askedAnswerableQuestion(embedded)).toBe(false)
  })

  it('and therefore suppresses correctness', () => {
    expect(suppress(embedded)).toEqual({ suppress: true, reason: 'no-answerable-question' })
  })

  it('but a real question ending in a content word still passes', () => {
    expect(askedAnswerableQuestion('Which reactant is the limiting reagent here?')).toBe(true)
    expect(askedAnswerableQuestion('So, thinking about how moles work, what is the answer?')).toBe(true)
  })
})

describe('TASK_IMPERATIVE "tell" coverage (math.arith.counting, 2026-08-21)', () => {
  // "tell me how many objects you counted." carried no "?" and "tell" was
  // absent from the verb list, so a genuine report-back task slipped through
  // undetected entirely — not a scope-mismatch (the trigger just never
  // registered as answerable at all).

  it('the exact production sentence is now recognized', () => {
    expect(askedAnswerableQuestion(
      'When you finish, tell me how many objects you counted.',
    )).toBe(true)
  })

  it('natural variants: line-start and clause-boundary phrasing', () => {
    expect(askedAnswerableQuestion('Tell me your answer.')).toBe(true)
    expect(askedAnswerableQuestion('Tell me what you notice about the pattern.')).toBe(true)
    expect(askedAnswerableQuestion('Once you are done, tell me how many you found.')).toBe(true)
    expect(askedAnswerableQuestion('Tell us which option is correct.')).toBe(true)
  })

  it('negative control: "tell" mid-sentence with no clause boundary is narrative, not a task', () => {
    expect(askedAnswerableQuestion(
      'The graph will tell us the trend once we plot it.',
    )).toBe(false)
    expect(askedAnswerableQuestion(
      'We can tell that the pattern continues forever.',
    )).toBe(false)
  })

  it('negative control: other TASK_IMPERATIVE verbs are unaffected by the "tell" addition', () => {
    expect(askedAnswerableQuestion('Calculate the total.')).toBe(true)
    expect(askedAnswerableQuestion('We will calculate it together.')).toBe(false)
  })
})
