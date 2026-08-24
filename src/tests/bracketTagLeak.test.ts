/**
 * PHASE 6 — the bracket-shaped machine-tag leak.
 *
 * OBSERVED LIVE during Phase 6 certification (eng.grammar.nouns, disposable QA
 * account, deployed app): a learner's chat bubble ended with
 *
 *   …affect article use and quantifiers. [ASSESSMENT_RESULT correctness=1 …]
 *
 * route.ts instructs the model to emit that tag and had no stripper for it on
 * the Library path, and `hasResidualMachineTag` reported the text as CLEAN, so
 * the repository's own residual-tag assertion was blind to the whole shape.
 *
 * The P0 hazard in fixing it — and the reason the negative control below is the
 * most important test in this file — is `[LESSON_COMPLETE]`, which is NOT
 * residue: LessonScreen.tsx parses it out of the response text to trigger the
 * completion transition. A generic SHOUTED-bracket sweep would have silently
 * broken lesson completion for every subject.
 */
import { describe, it, expect } from 'vitest'
import { stripResidualMachineTags, hasResidualMachineTag } from '@/lib/teaching/residualTagSweep'

const OBSERVED_LIVE =
  'You’re right—"advice" is an uncountable noun, so we say "a piece of advice" instead of '
  + '"an advice." This shows you understand how countable and uncountable nouns affect '
  + 'article use and quantifiers. [ASSESSMENT_RESULT correctness=1 reasoning=2 confidence=3]'

describe('Phase 6 — the observed bracket leak is closed', () => {
  it('strips the exact tag observed in production', () => {
    const out = stripResidualMachineTags(OBSERVED_LIVE)
    expect(out).not.toMatch(/\[ASSESSMENT_RESULT/i)
    // The teaching prose is preserved intact — the sweep removes markup only.
    expect(out).toContain('uncountable noun')
    expect(out).toContain('article use and quantifiers')
  })

  it('strips a bare bracket tag with no attributes', () => {
    expect(stripResidualMachineTags('Nice work. [ASSESSMENT_RESULT]')).not.toMatch(/ASSESSMENT_RESULT/)
  })

  it('strips a leftover [HINT] the hint parser did not consume', () => {
    expect(stripResidualMachineTags('Try this. [HINT]')).not.toMatch(/\[HINT\]/)
  })

  it('NEGATIVE CONTROL: the pre-fix sweep genuinely let it through', () => {
    // The pre-fix implementation, verbatim: comment shape + visual element only.
    const MACHINE_TAG_RE = /<!--\s*[A-Z][A-Z0-9_]{2,}\b[\s\S]*?(?:-->|\/>)/g
    const RAW_VISUAL_ELEMENT_RE = /<visual\b[^>]*>[\s\S]*?<\/visual\s*>|<visual\b[^>]*\/?>/gi
    const preFix = OBSERVED_LIVE.replace(MACHINE_TAG_RE, '').replace(RAW_VISUAL_ELEMENT_RE, '')
    expect(preFix).toMatch(/\[ASSESSMENT_RESULT/i)          // the regression, reproduced
    expect(stripResidualMachineTags(OBSERVED_LIVE)).not.toMatch(/\[ASSESSMENT_RESULT/i)
  })

  it('the detector is no longer blind to the bracket shape', () => {
    expect(hasResidualMachineTag(OBSERVED_LIVE)).toBe(true)
    expect(hasResidualMachineTag(stripResidualMachineTags(OBSERVED_LIVE))).toBe(false)
  })
})

describe('Phase 6 — P0 GUARD: [LESSON_COMPLETE] is a client control tag and MUST survive', () => {
  it('survives the sweep verbatim — LessonScreen parses it to complete the lesson', () => {
    const text = 'That is the whole idea, and you have it. [LESSON_COMPLETE]'
    expect(stripResidualMachineTags(text)).toContain('[LESSON_COMPLETE]')
  })

  it('survives even alongside a tag that IS swept', () => {
    const text = 'Well done. [ASSESSMENT_RESULT correctness=3] [LESSON_COMPLETE]'
    const out = stripResidualMachineTags(text)
    expect(out).toContain('[LESSON_COMPLETE]')
    expect(out).not.toMatch(/\[ASSESSMENT_RESULT/i)
  })

  it('the detector does not report a legitimate completion tag as residue', () => {
    expect(hasResidualMachineTag('Great work. [LESSON_COMPLETE]')).toBe(false)
  })
})

describe('Phase 6 — the sweep does not eat legitimate prose', () => {
  it('leaves markdown links alone (a tutor may cite a source)', () => {
    const text = 'Read more at [NASA](https://nasa.gov) for the full data set.'
    expect(stripResidualMachineTags(text)).toBe(text)
  })

  it('leaves ordinary lowercase bracketed prose alone', () => {
    const text = 'The result [see figure 2] follows directly.'
    expect(stripResidualMachineTags(text)).toBe(text)
  })

  it('leaves short acronyms below the SHOUTED-name floor alone', () => {
    const text = 'The [EU] directive applies here.'
    expect(stripResidualMachineTags(text)).toBe(text)
  })

  it('leaves a bracketed citation number alone', () => {
    const text = 'This was first measured in 1887 [1].'
    expect(stripResidualMachineTags(text)).toBe(text)
  })

  it('is idempotent and never throws on odd input', () => {
    const once = stripResidualMachineTags(OBSERVED_LIVE)
    expect(stripResidualMachineTags(once)).toBe(once)
    expect(stripResidualMachineTags('')).toBe('')
    expect(() => stripResidualMachineTags('[' as string)).not.toThrow()
  })

  it('still strips the comment-shaped families it always did (no regression)', () => {
    expect(stripResidualMachineTags('Hi.<!--SIGNAL correctness="true"-->')).not.toMatch(/SIGNAL/)
    expect(stripResidualMachineTags('Hi.<visual type="graph"/>')).not.toMatch(/visual/i)
  })
})
