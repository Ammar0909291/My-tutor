/**
 * The `math.found.logic` failure, replayed.
 *
 * Every "REAL TURN" below is verbatim tutor output captured from production on
 * 2026-08-18 (session cmsyuv2tw0001lb04jgzr7jqk, learner claudeTest). Each was
 * answered correctly and each recorded no evidence, because the concept holds
 * two authored closed-choice probes and mastery needs three graded answers.
 */
import { describe, it, expect } from 'vitest'
import { withholdUngradedGateQuestion } from '@/lib/teaching/gateAssessment'
import { askedAnswerableQuestion } from '@/lib/teaching/answerableTurn'
import {
  evaluateAssetContract,
  canCertifyWithoutModelCompliance,
  MIN_CLOSED_CHOICE_PROBES,
} from '@/lib/teaching/assetContract'

// ── verbatim production turns ───────────────────────────────────────────────
const L9_SQUARES = `claudeTest, let's examine another conditional statement: **IF a figure is a square, THEN it is a rectangle.**

Suppose we are given a figure that is **not** a rectangle. Using valid logical deduction, what can we definitively conclude about this figure?

A) The figure is a square because squares and rectangles share four sides.
B) The figure is definitely not a square, because if it were a square, it would have to be a rectangle.
C) The figure might be a square or might not be, because the statement goes only one way.
D) The figure has five sides.`

const R3_APPLES = `claudeTest, excellent! Here is your first practice question.

In a fruit basket, there are 4 apples and 7 oranges. What is the ratio of apples to oranges?

A) 7:4
B) 4:7
C) 4:11
D) 11:4`

describe('withholdUngradedGateQuestion — the Phase B failures', () => {
  it('withholds the ungradeable PRACTICE question and keeps the teaching', () => {
    const r = withholdUngradedGateQuestion({
      text: L9_SQUARES, phase: 'PRACTICE', hasStructuredMcq: false,
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('no-gradeable-probe')
    // The teaching survives...
    expect(r.text).toContain('IF a figure is a square, THEN it is a rectangle')
    // ...and nothing the learner could answer remains.
    expect(r.text).not.toContain('B) The figure is definitely not a square')
    expect(r.text).not.toMatch(/what can we definitively conclude/i)
  })

  it('withholds an ungradeable CHECK question (the ratios case)', () => {
    const r = withholdUngradedGateQuestion({
      text: R3_APPLES, phase: 'CHECK', hasStructuredMcq: false,
    })
    expect(r.withheld).toBe(true)
    expect(r.text).not.toContain('A) 7:4')
    expect(r.text).not.toMatch(/ratio of apples to oranges/i)
  })

  it('never emits an empty turn when the whole turn was the question', () => {
    const r = withholdUngradedGateQuestion({
      text: 'What is the ratio of 6 to 10?', phase: 'PRACTICE', hasStructuredMcq: false,
    })
    expect(r.withheld).toBe(true)
    expect(r.text.trim().length).toBeGreaterThan(0)
    expect(r.text).not.toMatch(/\?/)
  })
})

describe('withholdUngradedGateQuestion — what it must NOT touch', () => {
  it('leaves the turn alone when a structured MCQ IS attached', () => {
    const r = withholdUngradedGateQuestion({
      text: L9_SQUARES, phase: 'PRACTICE', hasStructuredMcq: true,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(L9_SQUARES)
  })

  it('leaves GUIDE alone when the gate never went looking for a probe this turn (TEACH move)', () => {
    const r = withholdUngradedGateQuestion({
      text: L9_SQUARES, phase: 'GUIDE', hasStructuredMcq: false,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(L9_SQUARES)
  })

  it('leaves GUIDE alone even with gateSoughtThisTurn explicitly false', () => {
    const r = withholdUngradedGateQuestion({
      text: L9_SQUARES, phase: 'GUIDE', hasStructuredMcq: false, gateSoughtThisTurn: false,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(L9_SQUARES)
  })

  it.each(['OBSERVE', 'DEMONSTRATE', 'TRANSFER'])('leaves %s alone', (phase) => {
    const r = withholdUngradedGateQuestion({ text: L9_SQUARES, phase, hasStructuredMcq: false })
    expect(r.withheld).toBe(false)
  })

  it('keeps a confirmation tail — "does that make sense?" is not a mastery question', () => {
    const text = 'A ratio compares two quantities by division.\n\nDoes that make sense so far?'
    const r = withholdUngradedGateQuestion({ text, phase: 'PRACTICE', hasStructuredMcq: false })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(text)
  })

  it('keeps a pure teaching turn untouched', () => {
    const text = 'Simplifying 6:10 to 3:5 changes the terms of the comparison, not the quantities.'
    const r = withholdUngradedGateQuestion({ text, phase: 'CHECK', hasStructuredMcq: false })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(text)
  })

  it('is idempotent — repairing an already-repaired turn changes nothing', () => {
    const once = withholdUngradedGateQuestion({
      text: L9_SQUARES, phase: 'PRACTICE', hasStructuredMcq: false,
    })
    const twice = withholdUngradedGateQuestion({
      text: once.text, phase: 'PRACTICE', hasStructuredMcq: false,
    })
    expect(twice.text).toBe(once.text)
  })

  it('never throws, whatever it is handed', () => {
    for (const bad of [null, undefined, 42, {}, []]) {
      expect(() =>
        withholdUngradedGateQuestion({
          text: bad as unknown as string, phase: 'PRACTICE', hasStructuredMcq: false,
        }),
      ).not.toThrow()
    }
  })
})

describe('withholdUngradedGateQuestion — GUIDE, when the gate sought a probe (the chemistry root cause)', () => {
  // Reproduces the actual production mechanism: `evidenceMoveHoisted === 'ask'`
  // at GUIDE made the gate look for an authored probe (`phaseAllowsProbe`
  // true), none converted (`gateMcqHoisted` stayed null — pool exhaustion or
  // no authored probe), and the model wrote its own ungradeable prose
  // question. GUIDE→CHECK then advanced off that turn's self-reported
  // SIGNAL, with zero withholding, because the guard's old phase check never
  // looked at GUIDE at all.
  it('withholds an ungradeable GUIDE question when the gate sought a probe this turn', () => {
    const r = withholdUngradedGateQuestion({
      text: R3_APPLES, phase: 'GUIDE', hasStructuredMcq: false, gateSoughtThisTurn: true,
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('no-gradeable-probe')
    expect(r.text).not.toContain('A) 7:4')
    expect(r.text).not.toMatch(/ratio of apples to oranges/i)
  })

  it('also catches a stray question alongside a GUIDE-attached MCQ', () => {
    const attached = 'Which of the following best describes matter?'
    const strayTurn = `Nice work so far.\n\n**Quick check:** How would you describe what happens when ice melts into water?`
    const r = withholdUngradedGateQuestion({
      text: strayTurn,
      phase: 'GUIDE',
      hasStructuredMcq: true,
      attachedMcqQuestion: attached,
      gateSoughtThisTurn: true,
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('stray-question-alongside-mcq')
  })

  it('leaves a confirmation tail alone at GUIDE even when the gate sought a probe', () => {
    const text = 'A ratio compares two quantities by division.\n\nDoes that make sense so far?'
    const r = withholdUngradedGateQuestion({
      text, phase: 'GUIDE', hasStructuredMcq: false, gateSoughtThisTurn: true,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(text)
  })
})

describe('withholdUngradedGateQuestion — GUIDE folding into CHECK/PRACTICE (math.func.function-concept)', () => {
  // Confirmed live, twice, on production (2026-08-21): a GUIDE turn reacting
  // to a just-graded CORRECT answer folds straight to CHECK
  // (conversationState.ts's `case 'GUIDE': if (next.demonstrated) next.phase
  // = 'CHECK'`), independent of this turn's decided move. Reacting to a
  // graded answer is routinely 'teach', not 'ask', so `gateSoughtThisTurn`
  // (which only covers move==='ask') is correctly false, and — before this
  // fix — `isMasteryGatePhase('GUIDE')` was also false, so the guard no-opped
  // entirely on an ungradeable question. Real production `[ladder]` log for
  // the exact failing request: `{ phaseBefore: 'GUIDE', phaseAfter: 'CHECK',
  // move: 'teach', mcqAsked: false }`, with no `[gate-assessment]` log at all
  // for that request (gateSoughtThisTurn genuinely false).
  const reactiveTurn =
    'It looks like you chose **B) Codomain**.\n' +
    'Could you walk me through why you think the set of all possible ages is the codomain, rather than something else?'

  it('withholds an ungradeable question on a GUIDE turn that folds to CHECK, even though gateSoughtThisTurn is false', () => {
    const r = withholdUngradedGateQuestion({
      text: reactiveTurn,
      phase: 'GUIDE',
      phaseAfter: 'CHECK',
      hasStructuredMcq: false,
      gateSoughtThisTurn: false,
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('no-gradeable-probe')
    expect(r.text).not.toMatch(/walk me through why/i)
  })

  it('withholds identically on a GUIDE turn that folds to PRACTICE (the interface supports it symmetrically, even though the real fold never produces this transition directly)', () => {
    const r = withholdUngradedGateQuestion({
      text: reactiveTurn,
      phase: 'GUIDE',
      phaseAfter: 'PRACTICE',
      hasStructuredMcq: false,
      gateSoughtThisTurn: false,
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('no-gradeable-probe')
  })

  it('negative 1 — a GUIDE turn that stays in GUIDE (no fold) is unaffected: existing teach behaviour is untouched', () => {
    const r = withholdUngradedGateQuestion({
      text: reactiveTurn,
      phase: 'GUIDE',
      phaseAfter: 'GUIDE',
      hasStructuredMcq: false,
      gateSoughtThisTurn: false,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(reactiveTurn)
  })

  it('negative 2 — a GUIDE turn with gateSoughtThisTurn=true (move==="ask", no probe found) keeps its existing behaviour regardless of phaseAfter', () => {
    const r = withholdUngradedGateQuestion({
      text: R3_APPLES,
      phase: 'GUIDE',
      phaseAfter: 'GUIDE',
      hasStructuredMcq: false,
      gateSoughtThisTurn: true,
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('no-gradeable-probe')
  })

  it('negative 3 — CHECK with no MCQ is unaffected by phaseAfter (already unconditionally covered)', () => {
    const r = withholdUngradedGateQuestion({
      text: reactiveTurn,
      phase: 'CHECK',
      phaseAfter: 'PRACTICE',
      hasStructuredMcq: false,
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('no-gradeable-probe')
  })

  it('negative 4 — PRACTICE with no MCQ is unaffected by phaseAfter (already unconditionally covered)', () => {
    const r = withholdUngradedGateQuestion({
      text: reactiveTurn,
      phase: 'PRACTICE',
      phaseAfter: 'TRANSFER',
      hasStructuredMcq: false,
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('no-gradeable-probe')
  })

  it('negative 5 — a GUIDE->CHECK fold with an attached structured MCQ still only strips a stray, non-restated question, never the MCQ itself', () => {
    const attached = 'What is the codomain of the function f(x)=2x+1?'
    const r = withholdUngradedGateQuestion({
      text: reactiveTurn,
      phase: 'GUIDE',
      phaseAfter: 'CHECK',
      hasStructuredMcq: true,
      attachedMcqQuestion: attached,
      gateSoughtThisTurn: false,
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('stray-question-alongside-mcq')
  })

  it('negative 6 — a normal GUIDE teaching turn with no fold and no question is untouched', () => {
    const text = 'A function assigns exactly one output to every input in its domain.'
    const r = withholdUngradedGateQuestion({
      text, phase: 'GUIDE', phaseAfter: 'GUIDE', hasStructuredMcq: false, gateSoughtThisTurn: false,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(text)
  })

  it('omitting phaseAfter entirely reproduces the exact prior behaviour (backward compatible)', () => {
    const r = withholdUngradedGateQuestion({
      text: reactiveTurn, phase: 'GUIDE', hasStructuredMcq: false, gateSoughtThisTurn: false,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(reactiveTurn)
  })
})

describe('withholdUngradedGateQuestion — a stray question alongside an attached MCQ', () => {
  // Verbatim shape of the chemistry CHECK-phase turn from the 2026-08-21
  // certification sweep (`chem.found.matter`): an authored MCQ WAS attached
  // this turn, and the model asked its OWN separate open-ended question
  // anyway, in violation of `buildGateAssessmentBlock`'s "do NOT ask any
  // other question" instruction.
  const ATTACHED_MCQ_QUESTION =
    'Which of the following best describes matter?'
  const STRAY_QUESTION_TURN = `Great, let's build on that.

**Question (Stage 2 – Recognition):** Have you ever seen a situation where two everyday materials can be pulled apart with a magnet, but after heating they become a single solid that no longer responds to the magnet?`

  it('strips a genuinely different question the model asked alongside the attached MCQ', () => {
    const r = withholdUngradedGateQuestion({
      text: STRAY_QUESTION_TURN,
      phase: 'CHECK',
      hasStructuredMcq: true,
      attachedMcqQuestion: ATTACHED_MCQ_QUESTION,
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('stray-question-alongside-mcq')
    expect(r.text).toContain("Great, let's build on that.")
    expect(r.text).not.toMatch(/Have you ever seen a situation/i)
    expect(r.text).not.toMatch(/\?/)
  })

  it('leaves the turn alone when the prose merely restates the attached MCQ', () => {
    const text = `Here's your question.\n\n${ATTACHED_MCQ_QUESTION}\n\nA) Foo\nB) Bar`
    const r = withholdUngradedGateQuestion({
      text, phase: 'CHECK', hasStructuredMcq: true, attachedMcqQuestion: ATTACHED_MCQ_QUESTION,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(text)
  })

  it('is backward-compatible: omitting attachedMcqQuestion reproduces the prior no-op', () => {
    const r = withholdUngradedGateQuestion({
      text: STRAY_QUESTION_TURN, phase: 'CHECK', hasStructuredMcq: true,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(STRAY_QUESTION_TURN)
  })

  it('leaves a pure lead-in (no stray question) alone even with an MCQ attached', () => {
    const text = "Let's check one thing about the states of matter before we go further."
    const r = withholdUngradedGateQuestion({
      text, phase: 'CHECK', hasStructuredMcq: true, attachedMcqQuestion: ATTACHED_MCQ_QUESTION,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(text)
  })
})

describe('askedAnswerableQuestion / withholdUngradedGateQuestion — self-answered rhetorical "why" (chem.thermo.third-law)', () => {
  // `chem.thermo.third-law` FAILED a chemistry certification sweep with
  // `D2-ungradeable` (2026-08-21) on a turn whose only "question" was a
  // rhetorical one the tutor answered itself in the very next sentence — the
  // same shape a human lecturer uses ("Why is that? Because …"). No MCQ was
  // attached, phase was CHECK both turns, and the served text was reported
  // unchanged, containing the "Why is that?" verbatim.
  const TRAILING = `The Third Law of Thermodynamics states that as a system approaches absolute zero, its entropy approaches a well-defined minimum.

Why is that? Because at absolute zero a perfect crystal has only one possible microstate, so its entropy is exactly zero.`

  const MID_TEXT = `The Third Law of Thermodynamics states that as a system approaches absolute zero, its entropy approaches a well-defined minimum.

Why is that? Because at absolute zero a perfect crystal has only one possible microstate, so its entropy is exactly zero.

This has major implications: it means absolute zero can never actually be reached in a finite number of steps.`

  it('askedAnswerableQuestion does not flag a self-answered rhetorical "why...because"', () => {
    expect(askedAnswerableQuestion(TRAILING)).toBe(false)
    expect(askedAnswerableQuestion(MID_TEXT)).toBe(false)
  })

  it('a genuine "why" question with no self-answer is still flagged', () => {
    expect(askedAnswerableQuestion(
      'Ice floats on water because ice is less dense than liquid water.\n\n'
      + 'Why do you think a metal ring expands when heated?',
    )).toBe(true)
    expect(askedAnswerableQuestion('Why does the sky appear blue during the day?')).toBe(true)
  })

  it('does not withhold — and does not lose the trailing self-answered explanation — at CHECK', () => {
    // Before this fix, the rhetorical pair being the TRAILING paragraph made
    // `dropTrailingQuestion` pop the entire paragraph, deleting the actual
    // physics answer along with the question that answered it in the same
    // breath — a genuine content-loss defect, not a benign no-op.
    const r = withholdUngradedGateQuestion({ text: TRAILING, phase: 'CHECK', hasStructuredMcq: false })
    expect(r.withheld).toBe(false)
    expect(r.reason).toBe('ok')
    expect(r.text).toBe(TRAILING)
  })

  it('does not withhold — reason "ok", not a mislabeled unchanged "withheld" — when the rhetorical pair is mid-turn', () => {
    // Reproduces the production shape exactly: before this fix, `poses` was
    // true (full-text scan) but `dropTrailingQuestion` is tail-anchored and
    // this content is not trailing, so the text came back byte-identical
    // while still reporting `withheld: true` — this is the confirmed root
    // cause of the reported production failure.
    const r = withholdUngradedGateQuestion({ text: MID_TEXT, phase: 'CHECK', hasStructuredMcq: false })
    expect(r.withheld).toBe(false)
    expect(r.reason).toBe('ok')
    expect(r.text).toBe(MID_TEXT)
  })

  it('still withholds when a genuinely ungradeable, non-rhetorical question follows the same shape', () => {
    const text = 'Absolute zero is the theoretical minimum temperature.\n\n'
      + 'Why do you think no real system can ever fully reach it?'
    const r = withholdUngradedGateQuestion({ text, phase: 'CHECK', hasStructuredMcq: false })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('no-gradeable-probe')
  })
})

describe('withholdUngradedGateQuestion — detection scope === removal scope (math.arith.column-addition, math.nt.extended-euclidean-algorithm)', () => {
  // Confirmed live, 2026-08-21/22: `poses` scans the WHOLE text, but the
  // removal function this replaced (`dropTrailingQuestion`) only ever
  // examined the TRAILING paragraph — so an answerable paragraph anywhere
  // else survived completely unchanged while the function still reported
  // `withheld: true`. Fixed by `dropAnswerableContent`, which removes every
  // paragraph that is independently answerable, wherever it sits.

  // Verbatim (whitespace-preserved) production text, chem/math batch 2
  // certification sweep, math.arith.column-addition.
  const COLUMN_ADDITION = `**Demonstration: Why we add from right to left**

Let's add 58 and 74 the standard way.

\`\`\`
 58
+74
────
\`\`\`

1. **Ones column** (rightmost):
   8 + 4 = 12.
   Write the 2 in the ones place and carry the 1 to the tens column.

2. **Tens column** (next to the left), including the carry:
   5 + 7 + 1 = 13.
   Write the 3 in the tens place and carry the 1 to a new hundreds column.

3. **Hundreds column** (no original digits there):
   1.

Result: **132**.

If we had started with the tens column first (5 + 7 = 12) and written 2 in the tens place, we would have missed the carry from the ones column, ending with 112 instead of 132. That shows why we always start with the rightmost (ones) column and work leftward.

---`

  // Verbatim production text, math.nt.extended-euclidean-algorithm.
  const EXTENDED_EUCLIDEAN =
    "Let's try another example. Use the extended Euclidean algorithm on the pair 35 and 12. \n"
    + 'Find integers x and y such that \n\n'
    + '35x + 12y = gcd(35,12).\n\n'
    + '(You can also think of it as finding the modular inverse of 35 modulo 12 once you know the gcd.)'

  it('1/2 — an answerable imperative in a NON-trailing paragraph, with prose after it, is actually removed', () => {
    const r = withholdUngradedGateQuestion({ text: COLUMN_ADDITION, phase: 'CHECK', hasStructuredMcq: false })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('no-gradeable-probe')
    expect(r.text).not.toMatch(/write the 3 in the tens place/i)
    // The rest of the demonstration survives — this is a removal-scope fix,
    // not a delete-the-whole-turn fix.
    expect(r.text).toMatch(/ones column/i)
    expect(r.text).toMatch(/hundreds column/i)
    expect(r.text).toMatch(/Result.*132/i)
    expect(r.text).toMatch(/work leftward/i)
  })

  it('the standalone practice-problem paragraph is removed even though it precedes an aside', () => {
    const r = withholdUngradedGateQuestion({ text: EXTENDED_EUCLIDEAN, phase: 'PRACTICE', hasStructuredMcq: false })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('no-gradeable-probe')
    expect(r.text).not.toMatch(/find integers x and y/i)
    expect(r.text).toMatch(/modular inverse/i)
  })

  it('3 — an answerable question in the FINAL paragraph is still removed (pre-existing behaviour preserved)', () => {
    const text = 'A ratio compares two quantities by division.\n\nWhat is the ratio of 4 to 7?'
    const r = withholdUngradedGateQuestion({ text, phase: 'CHECK', hasStructuredMcq: false })
    expect(r.withheld).toBe(true)
    expect(r.text).not.toMatch(/ratio of 4 to 7/i)
    expect(r.text).toMatch(/compares two quantities/i)
  })

  it('4 — multiple answerable paragraphs are ALL removed, not just the first or last found', () => {
    const text =
      'Calculate the sum of 3 and 4.\n\n'
      + 'This is how addition works in general.\n\n'
      + 'Now find the sum of 5 and 6.'
    const r = withholdUngradedGateQuestion({ text, phase: 'CHECK', hasStructuredMcq: false })
    expect(r.withheld).toBe(true)
    expect(r.text).not.toMatch(/calculate the sum of 3 and 4/i)
    expect(r.text).not.toMatch(/find the sum of 5 and 6/i)
    expect(r.text).toMatch(/how addition works/i)
  })

  it('5 — an answerable paragraph followed by SEVERAL teaching paragraphs is still removed', () => {
    const text =
      'Solve for x: 2x = 10.\n\n'
      + 'This kind of equation appears throughout algebra.\n\n'
      + 'It is called a linear equation because x appears to the first power.\n\n'
      + 'Linear equations always have at most one solution.'
    const r = withholdUngradedGateQuestion({ text, phase: 'PRACTICE', hasStructuredMcq: false })
    expect(r.withheld).toBe(true)
    expect(r.text).not.toMatch(/solve for x/i)
    expect(r.text).toMatch(/throughout algebra/i)
    expect(r.text).toMatch(/linear equation because/i)
    expect(r.text).toMatch(/at most one solution/i)
  })

  it('6 — legitimate instructional narrative containing "write"/"find"/"calculate" mid-sentence is NOT touched (negative control)', () => {
    const text =
      'We use estimation to check our arithmetic.\n\n'
      + 'Understanding place value helps us find where each digit belongs, '
      + 'and lets us calculate sums quickly in our heads.'
    const r = withholdUngradedGateQuestion({ text, phase: 'CHECK', hasStructuredMcq: false })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(text)
  })

  it('7 — a valid structured MCQ turn (hasStructuredMcq, no stray text) is left completely alone', () => {
    const r = withholdUngradedGateQuestion({
      text: 'Here is your next question.',
      phase: 'CHECK',
      hasStructuredMcq: true,
      attachedMcqQuestion: 'What is 4 + 3?',
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe('Here is your next question.')
  })

  it('8 — mixed MCQ + a stray ungradeable question: the MCQ survives, only the stray paragraph is removed', () => {
    const text =
      'Nice work so far.\n\n'
      + 'Quick check: how would you describe what happens when ice melts?'
    const r = withholdUngradedGateQuestion({
      text,
      phase: 'CHECK',
      hasStructuredMcq: true,
      attachedMcqQuestion: 'Which of the following best describes matter?',
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('stray-question-alongside-mcq')
    expect(r.text).not.toMatch(/how would you describe/i)
  })

  it('9 — normal GUIDE prose (no fold, no gate sought) remains unchanged even when it contains an imperative line', () => {
    const text = 'Write down the formula for area: A = length × width.'
    const r = withholdUngradedGateQuestion({ text, phase: 'GUIDE', hasStructuredMcq: false })
    // GUIDE with no gateSoughtThisTurn and no fold into CHECK/PRACTICE is
    // simply not gate-active — untouched regardless of content, exactly as
    // before this change.
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(text)
  })

  it('10 — normal CHECK/PRACTICE prose with nothing answerable is unchanged', () => {
    const check = 'Great progress. Let\'s keep going with the next idea.'
    const practice = 'You are building real fluency with this concept.'
    expect(withholdUngradedGateQuestion({ text: check, phase: 'CHECK', hasStructuredMcq: false }).withheld).toBe(false)
    expect(withholdUngradedGateQuestion({ text: practice, phase: 'PRACTICE', hasStructuredMcq: false }).withheld).toBe(false)
  })

  it('11/12 — withheld and reason metadata are truthful: false only when the text is genuinely unchanged, true only when it genuinely changed', () => {
    const unaffected = 'Estimation helps us check whether an answer is reasonable.'
    const r1 = withholdUngradedGateQuestion({ text: unaffected, phase: 'CHECK', hasStructuredMcq: false })
    expect(r1.withheld).toBe(false)
    expect(r1.text).toBe(unaffected)

    const r2 = withholdUngradedGateQuestion({ text: COLUMN_ADDITION, phase: 'CHECK', hasStructuredMcq: false })
    expect(r2.withheld).toBe(true)
    expect(r2.text).not.toBe(COLUMN_ADDITION)
    expect(r2.reason).toBe('no-gradeable-probe')
  })

  it('13 — no raw answerable prompt remains in the returned text after withholding, for any of the fixed shapes', () => {
    for (const [text, phase] of [
      [COLUMN_ADDITION, 'CHECK'],
      [EXTENDED_EUCLIDEAN, 'PRACTICE'],
    ] as const) {
      const r = withholdUngradedGateQuestion({ text, phase, hasStructuredMcq: false })
      expect(r.withheld).toBe(true)
      // The result itself must never be re-flagged as answerable — otherwise
      // the repair produced a new ungradeable turn instead of removing one.
      expect(askedAnswerableQuestion(r.text)).toBe(false)
    }
  })

  it('14 — the earlier self-answered rhetorical-question regression still passes unchanged', () => {
    const text = 'The Third Law states entropy approaches a minimum.\n\n'
      + 'Why is that? Because at absolute zero a perfect crystal has only one microstate.'
    const r = withholdUngradedGateQuestion({ text, phase: 'CHECK', hasStructuredMcq: false })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(text)
  })

  it('15 — the earlier GUIDE->CHECK gate regression (math.func.function-concept) still passes unchanged', () => {
    const text =
      'It looks like you chose **B) Codomain**.\n'
      + 'Could you walk me through why you think the set of all possible ages is the codomain, rather than something else?'
    const r = withholdUngradedGateQuestion({
      text, phase: 'GUIDE', phaseAfter: 'CHECK', hasStructuredMcq: false, gateSoughtThisTurn: false,
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('no-gradeable-probe')
  })

  it('a generalized synthetic example proves this is not merely a fix for the two named concepts', () => {
    const text =
      'Determine the boiling point of water at sea level.\n\n'
      + 'This matters because phase changes depend on pressure.\n\n'
      + 'Explain why the boiling point drops at high altitude.\n\n'
      + 'Altitude affects atmospheric pressure directly.'
    const r = withholdUngradedGateQuestion({ text, phase: 'CHECK', hasStructuredMcq: false })
    expect(r.withheld).toBe(true)
    expect(r.text).not.toMatch(/determine the boiling point/i)
    expect(r.text).not.toMatch(/explain why the boiling point drops/i)
    expect(r.text).toMatch(/phase changes depend on pressure/i)
    expect(r.text).toMatch(/altitude affects atmospheric pressure/i)
  })
})

describe('withholdUngradedGateQuestion — GUIDE folding to CHECK via a bare acknowledgement (math.arith.counting-sequence)', () => {
  // Confirmed live via production [ladder] log, 2026-08-22: `{ signalTag:
  // false, correctness: null, ack: true, phaseBefore: 'GUIDE', phaseAfter:
  // 'CHECK' }`, with NO [gate-assessment] log at all for that request. The
  // 2026-08-21 GUIDE->CHECK fix (math.func.function-concept) only peeked at
  // the `succeeded` (teachingSignal.correctness === true) fold path;
  // conversationState.ts has a SECOND, independent path to the identical
  // fold — a bare acknowledgement ("ready"/"got it") with NO signal at all,
  // via `case 'GUIDE': if (next.demonstrated) next.phase = 'CHECK'` inside
  // the `else if (evidence.acknowledgement)` branch. This is the route.ts
  // call-site peek (`guideFoldsToGateThisTurn`), which is not itself unit-
  // testable in isolation from the route — this suite instead pins the
  // GUIDE+phaseAfter='CHECK' shape at the withholdUngradedGateQuestion level
  // (the same interface contract the route now correctly feeds for this
  // case), proving the guard-level fix behaves correctly for it.
  it('withholds the exact production text when phaseAfter is CHECK, regardless of which transition path produced it', () => {
    const text =
      "Let's try a quick check. \n"
      + 'Suppose you have **7** books on a shelf. \n'
      + 'You start at the first book and give it the number 1, then the next book the number 2, and so on, always adding 1 each time. \n'
      + 'What number will you write on the last book? \n\n'
      + "Give me your answer when you're ready."
    const r = withholdUngradedGateQuestion({
      text, phase: 'GUIDE', phaseAfter: 'CHECK', hasStructuredMcq: false, gateSoughtThisTurn: false,
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('no-gradeable-probe')
    expect(r.text).not.toMatch(/what number will you write/i)
  })
})

describe('asset contract — the inventory that stops this happening at all', () => {
  it('the two concepts that failed in production are BELOW contract', () => {
    // math.found.logic and math.arith.ratios each hold exactly 2 closed-choice
    // probes and 1 explanation, measured against production 2026-08-18.
    const verdict = evaluateAssetContract({ explanations: 1, closedChoiceProbes: 2 })
    expect(verdict.satisfied).toBe(false)
    expect(verdict.missingClosedChoiceProbes).toBe(1)
    expect(verdict.shortfall).toMatch(/1 closed-choice probe/)
    expect(canCertifyWithoutModelCompliance({ explanations: 1, closedChoiceProbes: 2 })).toBe(false)
  })

  it('three closed-choice probes satisfies it — the mastery bar, not a margin', () => {
    expect(MIN_CLOSED_CHOICE_PROBES).toBe(3)
    const verdict = evaluateAssetContract({ explanations: 1, closedChoiceProbes: 3 })
    expect(verdict.satisfied).toBe(true)
    expect(verdict.shortfall).toBeNull()
  })

  it('open-recall probes never substitute for closed-choice ones', () => {
    const verdict = evaluateAssetContract({
      explanations: 1, closedChoiceProbes: 2, openRecallProbes: 9,
    })
    expect(verdict.satisfied).toBe(false)
    expect(verdict.missingClosedChoiceProbes).toBe(1)
  })

  it('a corrupt reading reports a shortfall rather than certifying', () => {
    for (const bad of [-1, NaN, Infinity, undefined]) {
      expect(
        evaluateAssetContract({
          explanations: 1, closedChoiceProbes: bad as unknown as number,
        }).satisfied,
      ).toBe(false)
    }
  })
})
