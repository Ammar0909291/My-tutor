/**
 * CTO iteration — deterministic recovery triggering (decision-engine/03 §0
 * preemption + foundations/01 §3 scripts as retrieved content).
 */
import { describe, it, expect } from 'vitest'
import { detectFailureState, buildRecoveryBlock, isDontKnowSignal } from '@/lib/teaching/recoveryGuard'

describe('detectFailureState — strong utterances fire anywhere', () => {
  it.each([
    ['I give up', 'give_up'],
    ['ok fine I just give up on this whole thing honestly', 'give_up'],
    ["I'm so stupid, everyone else gets this", 'stupid'],
    ["i am scared of getting it wrong again", 'scared'],
    ['I hate maths and I always have', 'hate_subject'],
    ["this is just too hard for me", 'too_hard'],
    ["I can't do this", 'cant'],
  ])('%s → %s', (msg, key) => {
    expect(detectFailureState(msg)).toBe(key)
  })
})

describe('detectFailureState — mild utterances only when the message IS the utterance', () => {
  it('short "I don\'t know" fires', () => {
    expect(detectFailureState("I don't know")).toBe('dont_know')
    expect(detectFailureState("i dont know...")).toBe('dont_know')
  })
  it('long messages merely containing the phrase do NOT fire', () => {
    expect(detectFailureState(
      "I don't know if chapter 3 covers this but could you explain how photosynthesis relates to the carbon cycle in more detail please",
    )).toBeNull()
  })
  it("short \"I'm confused\" fires; incidental use in a long question does not", () => {
    expect(detectFailureState("I'm confused")).toBe('confused')
    expect(detectFailureState(
      "I'm confused about why the author of this very long historical passage decided to introduce the treaty before the war ended, can we go through the timeline",
    )).toBeNull()
  })
  it('honest guessing disclosure fires (Principle 8 reward path)', () => {
    expect(detectFailureState('that was a guess')).toBe('guessing')
  })
})

describe('detectFailureState — benign messages never fire', () => {
  it.each([
    "I can't wait to learn fractions!",
    'What is 3/4 of 80?',
    'yes',
    'The answer is 12',
    'Can we do harder ones?',
    // Substantive questions carry content and must not match the terse
    // one-word echo pattern.
    'Why does it fall down faster?',
    'What is the formula for kinetic energy?',
    'Where does the electron go after that?',
  ])('%s → null', (msg) => {
    expect(detectFailureState(msg)).toBeNull()
  })
})

// P1 (Student Confusion Detection & Teaching Strategy Adaptation):
// closes the detection gap the bug transcript surfaced — phrases the
// learner actually used that the pre-existing patterns missed entirely.
describe('detectFailureState — P1 coverage extension', () => {
  it.each([
    ['I know nothing', 'dont_know'],
    ["Don't know", 'dont_know'],
    ['dont know', 'dont_know'],
    ['dunno', 'dont_know'],
    ['Where?', 'dont_understand'],
    ['What?', 'dont_understand'],
    ['Why?', 'dont_understand'],
    ['This doesn\'t make sense', 'confused'],
    ["that doesn't make sense", 'confused'],
    ["I don't get it", 'dont_understand'],
    ["I still don't get it", 'dont_understand'],
  ] as const)('%s → %s', (msg, key) => {
    expect(detectFailureState(msg)).toBe(key)
  })

  it.each([
    'Why do you keep asking me questions?',
    'why are you asking me so many questions',
    'stop asking me questions',
    'quit asking so many questions',
    'too many questions',
    'why do you keep quizzing me',
  ])('too_many_questions: %s', (msg) => {
    expect(detectFailureState(msg)).toBe('too_many_questions')
  })

  it('a terse echo must be the WHOLE message, not part of a real question', () => {
    expect(detectFailureState('Where?')).toBe('dont_understand')
    expect(detectFailureState('Where does the river start?')).toBeNull()
    expect(detectFailureState('What am I supposed to do with this number?')).toBeNull()
  })

  it('a bare "don\'t know" (no subject pronoun) fires as its own short reply', () => {
    expect(detectFailureState("don't know")).toBe('dont_know')
    expect(detectFailureState('dunno')).toBe('dont_know')
  })
  it('the new bare-echo pattern does not fire on a longer message that merely starts with "don\'t know"', () => {
    // The existing "I don't know" MILD pattern (unchanged by this fix) still
    // fires within its 120-char window regardless of trailing content — this
    // asserts only that the NEW bare-echo pattern is whole-message-anchored
    // and contributes no additional false positives beyond that pre-existing
    // behavior. A message long enough to exceed MILD_MAX_LENGTH never fires.
    const over120Chars = "I don't know if that is really the right way to think about it, could you maybe walk through the whole derivation from the start please"
    expect(over120Chars.length).toBeGreaterThan(120)
    expect(detectFailureState(over120Chars)).toBeNull()
  })
})

// P0-3: frustration detection, deliberately NOT a static phrase list —
// mixes emphatic-repetition patterns (still regex, but pattern-shaped not
// exact-phrase), structural ALL-CAPS shouting, and cross-turn repeated-
// answer comparison.
describe('detectFailureState — P0-3 frustration', () => {
  it.each([
    'I SAID NO',
    'i already said no',
    'no. no. no.',
    'How many times do I have to say this',
    'For the third time, no',
    'omg',
    'ugh',
    "this is fucking annoying",
    'what the hell, wtf',
  ])('%s → frustrated', (msg) => {
    expect(detectFailureState(msg)).toBe('frustrated')
  })

  it('structural ALL-CAPS shouting fires without any phrase match', () => {
    expect(detectFailureState('STOP TELLING ME THE SAME THING')).toBe('frustrated')
    expect(detectFailureState('WHY ARE WE STILL DOING THIS')).toBe('frustrated')
  })

  it('a short legitimate caps answer never fires (no phrase, short, no false shout)', () => {
    expect(detectFailureState('NO')).toBeNull()
    expect(detectFailureState('TRUE')).toBeNull()
    expect(detectFailureState('DNA')).toBeNull()
  })

  it('normal sentence capitalization never fires', () => {
    expect(detectFailureState('Can we do harder ones?')).toBeNull()
    expect(detectFailureState('The mitochondria is the powerhouse of the cell')).toBeNull()
  })

  it('repeated identical answer across turns fires, given the prior message', () => {
    expect(detectFailureState('the answer is 12', 'The answer is 12.')).toBe('frustrated')
    expect(detectFailureState('I dont know', "I don't know")).toBe('frustrated')
  })

  it('repeated-answer check never fires without the prior-message argument (backward compatible)', () => {
    // Every pre-existing call site calls detectFailureState with one
    // argument — this must reproduce the exact prior behavior.
    expect(detectFailureState('the answer is 12')).toBeNull()
  })

  it('a different answer on consecutive turns never fires', () => {
    expect(detectFailureState('the answer is 14', 'the answer is 12')).toBeNull()
  })

  it('trivial short repeats (acknowledgements) do not fire — handled elsewhere', () => {
    expect(detectFailureState('ok', 'ok')).toBeNull()
    expect(detectFailureState('yes', 'yes')).toBeNull()
  })

  it('benign messages with incidental repetition-adjacent words never fire', () => {
    expect(detectFailureState('Why does this happen every time the ball falls?')).toBeNull()
    expect(detectFailureState('What is the third derivative of this function?')).toBeNull()
  })
})

describe('buildRecoveryBlock — frustrated (P0-3)', () => {
  it('acknowledges briefly, apologizes when appropriate, and forbids repeating the question', () => {
    const block = buildRecoveryBlock('frustrated', false)
    expect(block).toMatch(/Acknowledge it briefly/i)
    expect(block).toMatch(/apology is appropriate/i)
    expect(block).toMatch(/do NOT ask the same question again/i)
    expect(block).toMatch(/not verbatim, not rephrased/i)
  })
  it('changes strategy to direct demonstration with an example, no question attached', () => {
    const block = buildRecoveryBlock('frustrated', false)
    expect(block).toMatch(/direct demonstration or explanation with a/i)
    expect(block).toMatch(/no question attached/i)
  })
  it('never matches their intensity or chides their tone', () => {
    const block = buildRecoveryBlock('frustrated', false)
    expect(block).toMatch(/never matching their intensity/i)
    expect(block).toMatch(/never chiding them/i)
  })
  it('lesson-one variant apologizes once then bans questions this turn and the next', () => {
    const block = buildRecoveryBlock('frustrated', true)
    expect(block).toMatch(/Apologize once/i)
    expect(block).toMatch(/this turn and the next/i)
  })
  it('still preempts everything and bans answering with a question, like every other script', () => {
    const block = buildRecoveryBlock('frustrated', false)
    expect(block).toMatch(/PREEMPTS EVERYTHING/)
    expect(block).toMatch(/never answer it with a question/i)
  })
  it('participates in the same escalation ladder as every other failure state', () => {
    const block = buildRecoveryBlock('frustrated', false, 2)
    expect(block).toMatch(/REPEATED STRUGGLE/i)
  })
})

describe('buildRecoveryBlock — too_many_questions (P1)', () => {
  it('stops questioning and switches to direct demonstration, general script', () => {
    const block = buildRecoveryBlock('too_many_questions', false)
    expect(block).toMatch(/STOP asking questions/i)
    expect(block).toMatch(/no question attached/i)
    expect(block).toMatch(/never asked to infer|not already been taught/i)
  })
  it('lesson-one variant bans questions for this turn and the next', () => {
    const block = buildRecoveryBlock('too_many_questions', true)
    expect(block).toMatch(/this turn and the next/i)
  })
  it('still preempts and bans answering with a question, like every other script', () => {
    const block = buildRecoveryBlock('too_many_questions', false)
    expect(block).toMatch(/PREEMPTS EVERYTHING/)
    expect(block).toMatch(/never answer it with a question/i)
  })
})

describe('buildRecoveryBlock — authored scripts, preemption, deltas', () => {
  it('preempts everything and bans questions-as-answers', () => {
    const block = buildRecoveryBlock('give_up', false)
    expect(block).toMatch(/PREEMPTS EVERYTHING/)
    expect(block).toMatch(/never answer it with a question/i)
    expect(block).toMatch(/No new content this turn/i)
  })
  it('general give-up: tutor takes over, no pep talk, no hand-back', () => {
    const block = buildRecoveryBlock('give_up', false)
    expect(block).toMatch(/NO pep talk/i)
    expect(block).toMatch(/Do not hand it back this turn/i)
  })
  it('lesson-one give-up ends the session on a win (first-lesson/05)', () => {
    expect(buildRecoveryBlock('give_up', true)).toMatch(/Teaching is over for this session/i)
  })
  it("lesson-one don't-know shrinks to echo, not two-choice", () => {
    expect(buildRecoveryBlock('dont_know', true)).toMatch(/ECHO/)
    expect(buildRecoveryBlock('dont_know', false)).toMatch(/two-choice/)
  })
  it('"I\'m stupid" answers with evidence, never bare reassurance', () => {
    const block = buildRecoveryBlock('stupid', false)
    expect(block).toMatch(/WITH EVIDENCE/i)
    expect(block).toMatch(/Reassurance .* is an opinion/i)
  })
  it('matched-energy guard on every script (mockery effect)', () => {
    expect(buildRecoveryBlock('confused', false)).toMatch(/reads as mockery/i)
  })
})

describe('detectFailureState — rephrase requests bypass mild patterns (BUG-02 regression)', () => {
  it('"explain differently" with "I don\'t understand" does NOT fire recovery', () => {
    expect(detectFailureState("I don't understand. Can you explain it differently?")).toBeNull()
  })
  it('"explain it another way" with confusion does NOT fire recovery', () => {
    expect(detectFailureState("I'm confused. Can you explain it another way?")).toBeNull()
  })
  it('"try explaining differently" does NOT fire recovery', () => {
    expect(detectFailureState("I don't get it. Try explaining differently")).toBeNull()
  })
  it('"say it in a different way" does NOT fire recovery', () => {
    expect(detectFailureState("Can you say it in a different way?")).toBeNull()
  })
  it('"show me another way" does NOT fire recovery', () => {
    expect(detectFailureState("I don't understand. Show me another way")).toBeNull()
  })
  it('bare "I don\'t understand" (no rephrase request) still fires', () => {
    expect(detectFailureState("I don't understand")).toBe('dont_understand')
  })
  it('bare "I\'m confused" (no rephrase request) still fires', () => {
    expect(detectFailureState("I'm confused")).toBe('confused')
  })
  it('strong patterns still fire even with a rephrase request', () => {
    expect(detectFailureState("I give up, explain it differently")).toBe('give_up')
    expect(detectFailureState("I hate maths, explain another way")).toBe('hate_subject')
  })
})

// Rule 2 coverage extension: utterances from the escalation list that the
// pre-existing patterns missed entirely.
describe('detectFailureState — Rule 2 coverage extension', () => {
  it.each([
    ['I never learned this', 'dont_know'],
    ['we never studied that in school', 'dont_know'],
    ["I've never been taught it", 'dont_know'],
    ["I can't say", 'dont_know'],
    ["can't say...", 'dont_know'],
  ] as const)('%s → %s', (msg, key) => {
    expect(detectFailureState(msg)).toBe(key)
  })

  it.each([
    'Explain',
    'please explain',
    'Explain it.',
    'explain this',
  ])('bare imperative "%s" → too_many_questions (teach me, not a question)', (msg) => {
    expect(detectFailureState(msg)).toBe('too_many_questions')
  })

  it('content questions starting with "explain" never fire the bare-imperative pattern', () => {
    expect(detectFailureState('explain why the sky is blue')).toBeNull()
    expect(detectFailureState('Explain the difference between speed and velocity')).toBeNull()
  })

  it('"I can\'t say" with trailing content never fires (whole-message anchored)', () => {
    expect(detectFailureState("I can't say whether it's A or B, both look right")).toBeNull()
  })
})

// Rule 2 pre-demonstration escalation: before anything has been shown,
// dont_know/confused must escalate to direct demonstration — never to a
// smaller question the learner still cannot answer.
describe('buildRecoveryBlock — pre-demonstration delta (Rule 2)', () => {
  it("pre-demonstration don't-know explains directly, never shrinks to two-choice", () => {
    const block = buildRecoveryBlock('dont_know', false, 0, true)
    expect(block).toMatch(/haven'?t shown you yet/i)
    expect(block).toMatch(/No questions this turn/i)
    expect(block).not.toMatch(/two-choice/)
  })
  it("post-demonstration don't-know keeps the existing two-choice shrink", () => {
    expect(buildRecoveryBlock('dont_know', false, 0, false)).toMatch(/two-choice/)
  })
  it('pre-demonstration confused skips localization and demonstrates', () => {
    const block = buildRecoveryBlock('confused', false, 0, true)
    expect(block).toMatch(/SKIP localization/i)
    expect(block).toMatch(/No questions this turn/i)
  })
  it('the lesson-one delta outranks the pre-demonstration delta', () => {
    expect(buildRecoveryBlock('dont_know', true, 0, true)).toMatch(/ECHO/)
  })
  it('keys without a pre-demonstration delta fall back to their general script', () => {
    expect(buildRecoveryBlock('forgot', false, 0, true)).toMatch(/CUED RETRIEVAL/i)
  })
  it('omitting the parameter reproduces the exact prior behavior (backward compatible)', () => {
    expect(buildRecoveryBlock('dont_know', false)).toBe(buildRecoveryBlock('dont_know', false, 0, false))
  })
})

// Rule 2 escalation membership — the single owner of the decision that was
// previously inlined twice in route.ts.
describe('isDontKnowSignal — single-owner escalation membership', () => {
  it.each(['dont_know', 'dont_understand', 'confused'] as const)('%s counts', (key) => {
    expect(isDontKnowSignal(key)).toBe(true)
  })
  it.each(['frustrated', 'too_many_questions', 'give_up', 'guessing', 'forgot', 'scared', 'stupid', 'cant', 'too_hard', 'hate_subject'] as const)('%s does not count', (key) => {
    expect(isDontKnowSignal(key)).toBe(false)
  })
  it('null never counts', () => {
    expect(isDontKnowSignal(null)).toBe(false)
  })
})
