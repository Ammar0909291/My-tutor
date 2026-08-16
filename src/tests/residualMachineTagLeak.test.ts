/**
 * TWO LIVE RUNTIME DEFECTS, observed on a real account on 2026-08-16 and fixed
 * at source. Both were invisible to every existing test because both tests and
 * parsers were written against CORRECTLY-FORMED input.
 *
 * DEFECT 1 — machine markup reached the learner and was persisted.
 *   The tutor's reply ended with:
 *     <!--ATMPT channel="verbal" … interleaving="blocked"-->
 *     <!--OBSERVATION signal="false" confidence="low" confusion="true" phrase="A"-->
 *   The prompt asks for <!--ATTEMPT …--> and <!--SIGNAL …-->; the parsers match
 *   exactly those. The model abbreviated one and renamed the other (and renamed
 *   `correctness` to `signal`), so no name-keyed parser could strip it.
 *   Production scale: 9 of 1,986 assistant messages carry raw markup (0.45%),
 *   across FIVE families — SIGNAL (4, correctly named and still leaked), MCQ (2),
 *   VISUAL (1), LESSON_COMPLETE (1), ATMPT/OBSERVATION (1).
 *
 * DEFECT 2 — the multiple-choice question was stored twice.
 *   appendMcqToHistoryText assumed stripMcqTags() had removed the question from
 *   cleanText. On this turn the model wrote the question inline AS PROSE *and*
 *   emitted the tag, so the append produced a second copy. Invisible live (the
 *   client draws its wizard from the separate `mcq` field) and visible only
 *   after a reload — precisely when history is all the learner has.
 */
import { describe, it, expect } from 'vitest'
import {
  stripResidualMachineTags,
  hasResidualMachineTag,
} from '@/lib/teaching/residualTagSweep'
import { appendMcqToHistoryText } from '@/lib/teaching/mcq'

// The exact text captured from the live session, verbatim.
const LIVE_LEAK = `That's a really common place to get tripped up — let me show you why.

Even though we use grams every day for smaller things, the official base unit is actually the kilogram.

A) Gram (g)
B) Kilogram (kg)

<!--ATMPT channel="verbal" representation="narrative" concreteness="symbolic" entry="definition-first" granularity="decomposed" agency="tutor-does" scaffold="1" hint="H0" difficulty="1" paceRate="1" paceDensity="1" paceWait="1" loadBudget="1" loadDecomposition="decomposed" interleaving="blocked"-->
<!--OBSERVATION signal="false" confidence="low" confusion="true" phrase="A"-->`

describe('defect 1 — no machine markup reaches the learner', () => {
  it('removes the exact tags captured from the live production turn', () => {
    const out = stripResidualMachineTags(LIVE_LEAK)
    expect(out).not.toContain('<!--')
    expect(out).not.toContain('ATMPT')
    expect(out).not.toContain('OBSERVATION')
    expect(hasResidualMachineTag(out)).toBe(false)
  })

  it('keeps every word of the actual teaching', () => {
    // Over-deletion would be its own defect: this must remove markup, not prose.
    const out = stripResidualMachineTags(LIVE_LEAK)
    expect(out).toContain('really common place to get tripped up')
    expect(out).toContain('the official base unit is actually the kilogram')
    expect(out).toContain('A) Gram (g)')
    expect(out).toContain('B) Kilogram (kg)')
  })

  it.each([
    ['misnamed attempt', '<!--ATMPT a="1"-->'],
    ['misnamed signal', '<!--OBSERVATION signal="false"-->'],
    ['correctly named signal, self-closing', '<!--SIGNAL correctness="true" confidence="high"/>'],
    ['correctly named attempt', '<!--ATTEMPT channel="verbal"-->'],
    ['mcq', '<!--MCQ q="What unit?" a="Gram" b="Kilogram"-->'],
    ['visual', '<!--VISUAL type="three_crystal_lattice"-->'],
    ['lesson complete', '<!--LESSON_COMPLETE-->'],
    ['a family that does not exist yet', '<!--FUTURE_TAG foo="bar"-->'],
  ])('strips %s — all five leaked families plus an unknown one', (_label, tag) => {
    const out = stripResidualMachineTags(`Teaching prose.\n\n${tag}`)
    expect(out).toBe('Teaching prose.')
  })

  it('strips an UNTERMINATED tag at the end — a truncated generation', () => {
    // A visible `<!--ATTEMPT` fragment is worse than losing a trailing line
    // that was never prose; attemptVectorSignal.ts resolves this the same way.
    const out = stripResidualMachineTags('Real teaching.\n<!--ATTEMPT channel="verbal" scaffold=')
    expect(out).toBe('Real teaching.')
  })

  it('leaves ordinary lowercase HTML comments alone', () => {
    // The sweep deletes text from a learner's message, so it must delete only
    // what is unmistakably machine markup. Machine tags are SHOUTED.
    const s = 'Some prose <!-- a normal note --> more prose'
    expect(stripResidualMachineTags(s)).toBe(s)
  })

  it('is idempotent and safe on text with no markup at all', () => {
    const plain = 'Just teaching, no tags here.'
    expect(stripResidualMachineTags(plain)).toBe(plain)
    const once = stripResidualMachineTags(LIVE_LEAK)
    expect(stripResidualMachineTags(once)).toBe(once)
  })

  it('survives overlapping/nested tags that reconstruct on removal', () => {
    // '<!--SIG<!--ATTEMPT a="1"-->NAL correctness="true"-->' is the hazard
    // attemptVectorSignal.ts documents: removing the inner tag can CREATE an
    // outer one. Repeated passes are why this cannot survive.
    const out = stripResidualMachineTags('Text <!--SIG<!--ATTEMPT a="1"-->NAL correctness="true"--> end')
    expect(hasResidualMachineTag(out)).toBe(false)
    expect(out).not.toContain('<!--')
  })

  it('does not throw on non-string or empty input', () => {
    expect(stripResidualMachineTags('')).toBe('')
    expect(() => stripResidualMachineTags(undefined as unknown as string)).not.toThrow()
  })
})

describe('defect 2 — the MCQ is stored once, not twice', () => {
  const mcq = {
    question: 'Which of the following is the official SI base unit for mass?',
    options: ['Gram', 'Kilogram', 'Pound', 'Newton'],
    correctIndex: 1,
  }

  it('does not append when the tutor already asked the question in prose', () => {
    // The live case: model wrote the question inline AND emitted the tag.
    const prose = `Let's check this idea: ${mcq.question}\n\nA) Gram\nB) Kilogram\nC) Pound\nD) Newton`
    const out = appendMcqToHistoryText(prose, mcq as never)
    expect(out).toBe(prose)
    // the question must appear exactly once in the stored history
    const occurrences = out.toLowerCase().split(mcq.question.toLowerCase()).length - 1
    expect(occurrences).toBe(1)
  })

  it('still appends when the prose does NOT contain the question', () => {
    // The behaviour this helper exists for must be preserved: `mcq` is never
    // persisted as JSON, so without this the question is lost on reload.
    const prose = 'Here is some teaching with no question in it.'
    const out = appendMcqToHistoryText(prose, mcq as never)
    expect(out).toContain(mcq.question)
    expect(out).toContain('A) Gram')
    expect(out).toContain('D) Newton')
  })

  it('matches across differing whitespace and capitalisation', () => {
    // The prose copy and the tag copy routinely differ by wrapping/case; an
    // exact comparison would miss the very case this guard exists for.
    const prose = 'which of the following is the official si base unit\n   for mass?'
    expect(appendMcqToHistoryText(prose, mcq as never)).toBe(prose)
  })

  it('appends normally for a very short question', () => {
    // Guarded against false positives: a tiny string could appear incidentally.
    const tiny = { question: 'Why?', options: ['A', 'B'], correctIndex: 0 }
    const out = appendMcqToHistoryText('Why? Because of inertia.', tiny as never)
    expect(out).toContain('A) A')
  })

  it('returns text unchanged when there is no MCQ', () => {
    expect(appendMcqToHistoryText('Plain teaching.', null)).toBe('Plain teaching.')
  })
})
