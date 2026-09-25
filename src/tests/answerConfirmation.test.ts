/**
 * Criterion 5 — a correct answer is explicitly confirmed as correct.
 *
 * Measured before this existed: 39% of server-graded-correct answers in
 * physics and 57% in chemistry were met with any acknowledgement at all.
 * The gate is >= 90%.
 *
 * The cases that matter most here are the NEGATIVE ones. A confirmation
 * attached to a wrong answer is worse than the defect it fixes, so most of
 * this file is about what must never happen.
 */
import { readFileSync } from 'fs'
import { describe, it, expect } from 'vitest'
import { confirmCorrectAnswer, CONFIRMS_CORRECT, stripLeadingFalseConfirmation, statesCorrect } from '@/lib/teaching/answerConfirmation'

const REAL_UNCONFIRMED = 'Here is a question to check your understanding:'
const REAL_REMEDIATION =
  "Let's take one small step together. I'll walk through it with you and pause whenever it helps."

describe('a correct answer is confirmed', () => {
  it('prepends a confirmation to the captured spring-mass T15 turn', () => {
    const r = confirmCorrectAnswer({ text: REAL_UNCONFIRMED, correct: true })
    expect(r.added).toBe(true)
    expect(r.text).toBe("That's right. Here is a question to check your understanding:")
  })

  it('fixes the turn that offered remediation for a correct answer', () => {
    const r = confirmCorrectAnswer({ text: REAL_REMEDIATION, correct: true })
    expect(r.added).toBe(true)
    expect(CONFIRMS_CORRECT.test(r.text)).toBe(true)
    // the tutor's own words survive intact
    expect(r.text.endsWith(REAL_REMEDIATION)).toBe(true)
  })

  it('rotates phrasing so a run of correct answers is not one canned sentence', () => {
    const said = [0, 1, 2, 3].map(
      (n) => confirmCorrectAnswer({ text: 'Next question.', correct: true, priorConfirmations: n }).text,
    )
    expect(new Set(said.slice(0, 3)).size).toBe(3)
    expect(said[3]).toBe(said[0])           // deterministic, not random
  })
})

describe('it never speaks twice', () => {
  const already = [
    "That's right. Let me check your thinking with this.",   // the real T14
    'That’s right. Let me check your thinking with this.', // U+2019 — the encoding that made the scorer read 2%
    'Great, you picked the correct restoring-force rule!',
    'You’re right—gravity just shifts the equilibrium.',
    'Exactly. Now try this one.',
    'Yes, that follows from the same rule.',
  ]
  for (const t of already) {
    it(`leaves an already-confirming reply untouched: ${t.slice(0, 34)}…`, () => {
      const r = confirmCorrectAnswer({ text: t, correct: true })
      expect(r.added).toBe(false)
      expect(r.text).toBe(t)
    })
  }

  it('is idempotent — running it twice adds one confirmation, not two', () => {
    const once = confirmCorrectAnswer({ text: REAL_UNCONFIRMED, correct: true })
    const twice = confirmCorrectAnswer({ text: once.text, correct: true })
    expect(twice.added).toBe(false)
    expect(twice.text).toBe(once.text)
  })
})

describe('NEGATIVE CONTROLS — it must never congratulate a wrong answer', () => {
  it('does nothing on a graded-WRONG answer', () => {
    const r = confirmCorrectAnswer({ text: REAL_UNCONFIRMED, correct: false })
    expect(r.added).toBe(false)
    expect(r.text).toBe(REAL_UNCONFIRMED)
  })

  it('does nothing when nothing was graded this turn', () => {
    const r = confirmCorrectAnswer({ text: REAL_UNCONFIRMED, correct: null })
    expect(r.added).toBe(false)
  })

  it('there is no input other than correct===true that produces a confirmation', () => {
    for (const correct of [false, null, undefined as unknown as null]) {
      for (const priorConfirmations of [0, 1, 2, 99, -1, NaN]) {
        expect(
          confirmCorrectAnswer({ text: 'anything at all', correct, priorConfirmations }).added,
        ).toBe(false)
      }
    }
  })

  it('adds nothing to an empty reply rather than inventing a turn', () => {
    for (const text of ['', '   ', '\n']) {
      const r = confirmCorrectAnswer({ text, correct: true })
      expect(r.added).toBe(false)
      expect(r.text).toBe(text)
    }
  })

  it('survives a hostile count without throwing or misindexing', () => {
    for (const n of [NaN, -5, Infinity, 1e9, 2.7]) {
      const r = confirmCorrectAnswer({ text: 'Next.', correct: true, priorConfirmations: n })
      expect(r.added).toBe(true)
      expect(CONFIRMS_CORRECT.test(r.text)).toBe(true)
    }
  })
})

describe('the detector matches the one the scorer measures with', () => {
  it('does not treat a bare directional "right" as praise', () => {
    // "the right-hand side" must not read as a confirmation, or the criterion
    // scores itself green on physics prose.
    expect(CONFIRMS_CORRECT.test('Move the term to the right-hand side.')).toBe(false)
    expect(CONFIRMS_CORRECT.test('The force points to the right.')).toBe(false)
  })

  it('does match the phrasings the tutor actually produced', () => {
    for (const t of ["That's right.", 'Correct — well done.', 'Yes, exactly right.']) {
      expect(CONFIRMS_CORRECT.test(t)).toBe(true)
    }
  })
})

describe('the route actually applies it', () => {
  const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

  it('is wired on the shipping text path, not merely imported', () => {
    expect(route).toMatch(/cleanText = confirmed\.text/)
  })

  it('is fed the SERVER grade, never a model self-report', () => {
    // The one input that may produce a confirmation is gradeMcqAnswer's
    // verdict. If this ever reads a SIGNAL field instead, the guarantee in
    // answerConfirmation.ts's header is void.
    //
    // UPDATED 2026-09-14: the original literal here was
    // `mcqGradeHoisted?.correct ?? null` — a real-account run found this
    // guarantee incomplete, not wrong: `mcqGradeHoisted.correct` is `true`
    // whenever ANY probe was graded correct, authored or model-invented, so
    // a self-graded invented question ("🎉 Great job!") could still trigger
    // a confident confirmation. `correctForConfirmation` is now the actual
    // input — it equals the server grade EXCEPT it is forced to `null`
    // whenever `unauthoredKeyGradeHoisted` is true, so the guarantee this
    // test names ("never a model self-report") now also covers "never an
    // unauthored-key server grade", which is the sharper version of the same
    // claim, not a different one.
    //
    // UPDATED 2026-09-15 (Typed Turn Contract Batch 3): the RHS collapsed to
    // `gradeForVerdict?.correct ?? null` — see unauthoredKeyConfidenceSoftened
    // .test.ts for the equivalence proof. Same claim, new source.
    expect(route).toMatch(/correct: correctForConfirmation/)
    expect(route).toMatch(/const correctForConfirmation = gradeForVerdict\?\.correct \?\? null/)
    const call = route.slice(route.indexOf('confirmCorrectAnswer({'), route.indexOf('cleanText = confirmed.text'))
    expect(call).not.toMatch(/signal/i)
  })

  it('rotates on persisted pre-turn state, not on this turn', () => {
    // UPDATED 2026-09-15 (Typed Turn Contract Batch 3): the call itself now
    // reads `resolvedPriorConfirmations` (a Batch-3 "resolved" const,
    // provably equal to `priorConfirmationsHoisted` — CONTRACT-classified,
    // single write site, see route.ts's own comment beside it). The literal
    // `priorConfirmations: priorConfirmationsHoisted` string this test used
    // to pin still exists elsewhere in the file (the contract-input
    // construction, Batch 1, an unrelated site) — asserted directly against
    // the actual call site below so this test cannot pass by coincidence.
    const call = route.slice(route.indexOf('confirmCorrectAnswer({'), route.indexOf('cleanText = confirmed.text'))
    expect(call).toMatch(/priorConfirmations: resolvedPriorConfirmations/)
    expect(route).toMatch(/const resolvedPriorConfirmations = turnContractShadow\?\.liveness\.priorConfirmations \?\? priorConfirmationsHoisted/)
    expect(route).toMatch(/priorConfirmationsHoisted = Number\.isFinite/)
  })

  it('PCD-029 — emits telemetry gated on the SAME precondition the enforcer itself gates on', () => {
    // Observability only: a live re-measurement of the confirmation rate was
    // never completed after the payload change that broke the transcript
    // scorer's own denominator (mcqForClient stripping correctIndex). This
    // reads the enforcer's own denominator directly instead. Must fire only
    // when `correct === true` — the exact condition confirmCorrectAnswer
    // itself requires — never unconditionally.
    //
    // UPDATED 2026-09-14: the condition used to read `mcqGradeHoisted?.correct
    // === true`, which drifted from the enforcer's own actual input the moment
    // `correctForConfirmation` was introduced (immediately above) — an
    // unauthored-key turn would then have logged `confirmed: false` as if the
    // enforcer had failed to fire, when it was deliberately withheld. Reading
    // `correctForConfirmation` keeps this test's own claim ("the SAME
    // precondition the enforcer itself gates on") literally true.
    const callStart = route.indexOf('confirmCorrectAnswer({')
    // Widened 2026-09-14 (1600 -> 1900): the comment explaining
    // `correctForConfirmation` pushed the telemetry block past the old
    // window. Margin left for future comments rather than pinning the exact
    // current distance again.
    const block = route.slice(callStart, callStart + 1900)
    expect(block).toContain("console.log('[c5] '")
    expect(block).toContain("event: 'servedGradedCorrect'")
    expect(block).toMatch(/if \(correctForConfirmation === true\)/)
    // 2026-09-25: telemetry reads `statesCorrect` (statements only) so "Is that
    // correct?" no longer counts as a confirmation — same detector as the enforcer.
    expect(block).toContain('confirmed.added || statesCorrect(confirmed.text)')
  })
})

describe('a question is not a confirmation (synthetic run, 2026-09-25)', () => {
  const PROD = 'So you calculated the train’s average acceleration as 3 metres per second squared, right? Is that correct?'
  it('the production reply gets a verdict prepended', () => {
    expect(statesCorrect(PROD)).toBe(false)
    const r = confirmCorrectAnswer({ text: PROD, correct: true })
    expect(r.added).toBe(true)
    expect(statesCorrect(r.text)).toBe(true)
  })
  it('a stated confirmation is still recognised, with or without a question after it', () => {
    expect(statesCorrect('That’s correct — 18 m/s over 6 s is 3 m/s².')).toBe(true)
    expect(statesCorrect('Exactly. Can you try the next one?')).toBe(true)
    expect(confirmCorrectAnswer({ text: 'Correct! Ready for another?', correct: true }).added).toBe(false)
  })
  it('the regex itself is unchanged (scorer parity)', () => {
    expect(CONFIRMS_CORRECT.test('Is that correct?')).toBe(true)
  })
})

describe('stripLeadingFalseConfirmation — the reoffer-guard contradiction fix', () => {
  it('strips the exact reproduced shape: "Exactly right — <content>" ahead of an ungraded hedge', () => {
    const text = 'Exactly right—magnetization is the order parameter for a ferromagnet.\n\n' +
      'The order parameter is simply a quantity that is zero in the disordered phase.'
    const out = stripLeadingFalseConfirmation(text)
    expect(out).not.toMatch(CONFIRMS_CORRECT)
    expect(out).toContain('The order parameter is simply a quantity')
  })

  it('strips "Great job" even though it is not in the middle of a sentence with "good job"', () => {
    const text = "Great job—your answer shows you've got the idea. Now let's move on."
    const out = stripLeadingFalseConfirmation(text)
    expect(out).toBe("Now let's move on.")
  })

  it('strips "Well done" and "That\'s right" the same way', () => {
    expect(stripLeadingFalseConfirmation("Well done—your choice matches the correct description. Next.")).toBe('Next.')
    expect(stripLeadingFalseConfirmation("That's right—a node is a region. Now let's see how nodes relate."))
      .toBe("Now let's see how nodes relate.")
  })

  it('leaves ordinary teaching alone — does not touch a sentence merely mentioning "correct" later in the reply', () => {
    // The whole reason this is scoped to the OPENING sentence only: a wrong-
    // answer remediation routinely says "the correct answer was X" deep in
    // the reply, and that must survive untouched.
    const text = 'Not quite. The correct answer was the minimum energy needed to remove an electron.'
    expect(stripLeadingFalseConfirmation(text)).toBe(text)
  })

  it('leaves text alone when the opening sentence is not a confirmation', () => {
    const text = "Let's think about this differently. Consider a ball rolling down a hill."
    expect(stripLeadingFalseConfirmation(text)).toBe(text)
  })

  it('is null/empty-safe', () => {
    expect(stripLeadingFalseConfirmation('')).toBe('')
    expect(stripLeadingFalseConfirmation('   ')).toBe('   ')
  })
})

describe('the I1 disambiguation guard applies the strip before prepending its lead-in', () => {
  const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

  it('imports and calls stripLeadingFalseConfirmation inside the genuineUnmappedAttempt branch', () => {
    const guardStart = route.indexOf('if (genuineUnmappedAttempt && !cleanText.includes(MCQ_REOFFER_DISAMBIGUATION))')
    expect(guardStart).toBeGreaterThan(-1)
    const guardBlock = route.slice(guardStart, guardStart + 1400)
    expect(guardBlock).toMatch(/await import\('@\/lib\/teaching\/answerConfirmation'\)/)
    expect(guardBlock).toContain('cleanText = stripLeadingFalseConfirmation(cleanText)')
    // The strip must run BEFORE the lead-in is prepended, not after.
    const stripAt = guardBlock.indexOf('stripLeadingFalseConfirmation(cleanText)')
    const prependAt = guardBlock.indexOf('MCQ_REOFFER_DISAMBIGUATION}\\n\\n')
    expect(stripAt).toBeGreaterThan(-1)
    expect(prependAt).toBeGreaterThan(stripAt)
  })
})
