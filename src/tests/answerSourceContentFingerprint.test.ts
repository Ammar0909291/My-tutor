/**
 * THE ANSWER-SOURCE FINGERPRINT MUST MOVE WHEN A GRADEABLE ANSWER MOVES.
 *
 * MEASURED, and this test exists because the old fingerprint did not.
 * Commit 7f7b34a6 rewrote the correct option TEXT of 48 chemistry probes and
 * changed no stem. The fingerprint hashed stems only, so it stayed
 * `probes:2750:h5e86a3a9` across the change — the same value three earlier
 * certification batches had recorded. Production's database still held the
 * pre-commit option text, and a repo/DB inventory then measured 50 chemistry
 * probes whose option text disagreed (48 from that commit, 2 older). The first
 * run after the commit returned `UNMEASURED-options-mismatch` on
 * chem.elect.electrolysis, and nothing in the artifact identity hinted why.
 *
 * `resolveAnswer` admits an answer only when the AUTHORED CORRECT TEXT is
 * present among the served options, so the corpus facts a measurement depends
 * on are exactly: the normalised stem, and the correct option's text. The
 * fingerprint now covers both.
 *
 * Distractor-only edits deliberately do NOT move it: no distractor can cause
 * `options-mismatch`, so moving the marker for one would signal a change that
 * has no measurement consequence. That is asserted below as a decision, not
 * left as an accident.
 */
import { describe, it, expect } from 'vitest'

import { indexFrom, type CorpusProbe } from '../../scripts/certification/answerSource'

const probe = (
  stem: string,
  correct: string,
  wrong = 'a wrong option',
): CorpusProbe => ({
  conceptId: 'chem.test.concept',
  stem,
  choices: [{ text: correct, isCorrect: true }, { text: wrong, isCorrect: false }],
})

const BASE: CorpusProbe[] = [
  probe('What is the charge on an electron?', 'Negative'),
  probe('Which vitamin is fat-soluble?', 'Vitamin D'),
]

const fp = (probes: CorpusProbe[]) => indexFrom(probes).fingerprint

describe('the fingerprint covers what resolveAnswer actually depends on', () => {
  it('changes when a CORRECT option text changes — the 7f7b34a6 class', () => {
    const edited = [
      BASE[0],
      probe('Which vitamin is fat-soluble?', 'Vitamin D, stored in the liver'),
    ]
    expect(fp(edited)).not.toBe(fp(BASE))
  })

  it('does NOT move for a case-only or whitespace-only edit', () => {
    // Not a loophole: `resolveAnswer` compares via the same normalisation, so a
    // case/whitespace edit cannot change which option is admitted. The marker
    // tracks grading consequence, not bytes.
    const a = [probe('Which vitamin is fat-soluble?', 'Vitamin D')]
    const b = [probe('Which vitamin is fat-soluble?', '  VITAMIN   D ')]
    expect(fp(b)).toBe(fp(a))
  })

  it('changes when a correct option is merely SHORTENED, stem untouched', () => {
    // Literally what the commit did: same stem, same option count, same
    // isCorrect, shorter correct text.
    const long = [probe('Why do fat-soluble vitamins accumulate?',
      'They are stored in body fat because there is no efficient renal excretion pathway for them')]
    const short = [probe('Why do fat-soluble vitamins accumulate?',
      'They are stored in body fat')]
    expect(fp(short)).not.toBe(fp(long))
  })

  it('changes when a stem changes', () => {
    expect(fp([probe('Q one?', 'A')])).not.toBe(fp([probe('Q two?', 'A')]))
  })

  it('is STABLE when nothing content-bearing changes', () => {
    expect(fp(BASE)).toBe(fp([...BASE]))
  })

  it('is order-independent — a corpus module reorder must not move it', () => {
    expect(fp([BASE[1], BASE[0]])).toBe(fp(BASE))
  })

  it('does NOT move for a distractor-only edit — a decision, not an oversight', () => {
    // No distractor can produce `options-mismatch`, so this edit cannot change
    // any measurement. If a future change makes distractors gradeable-relevant,
    // this expectation is the one that must be revisited.
    const a = [probe('Same stem?', 'Correct', 'wrong text one')]
    const b = [probe('Same stem?', 'Correct', 'wrong text two')]
    expect(fp(b)).toBe(fp(a))
  })

  it('moves when a stem is poisoned into ambiguity', () => {
    // Two probes, same stem, different answers -> the stem indexes to null and
    // becomes unanswerable. The marker must reflect that loss.
    const clean = [probe('Ambiguous?', 'Answer A')]
    const poisoned = [probe('Ambiguous?', 'Answer A'), probe('Ambiguous?', 'Answer B')]
    expect(fp(poisoned)).not.toBe(fp(clean))
  })

  it('still reports the usable-probe count in the marker', () => {
    expect(fp(BASE)).toMatch(/^probes:2:h[0-9a-f]+$/)
  })
})

describe('the real corpus produces a fingerprint that reflects current content', () => {
  it('no longer equals the stem-only value recorded before 7f7b34a6', async () => {
    // probes:2750:h5e86a3a9 was recorded by chemistry batches 1-4 AND by the
    // run taken after the option text had already changed. A marker that
    // survives a content change is the defect this test pins.
    const { buildAnswerIndex } = await import('../../scripts/certification/answerSource')
    const idx = await buildAnswerIndex()
    expect(idx.fingerprint).not.toBe('probes:2750:h5e86a3a9')
    expect(idx.fingerprint).toMatch(/^probes:\d+:h[0-9a-f]+$/)
  })
})
