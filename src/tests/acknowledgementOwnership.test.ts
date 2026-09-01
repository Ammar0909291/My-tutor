/**
 * ACKNOWLEDGEMENT PREDICATES — ONE OWNER PER DECISION (census target #2).
 *
 * Two predicates answer "is this a substantive learner contribution?":
 *   isBareAcknowledgement       (masteryGate)        strict, whole-message exact
 *   isLowSignalAcknowledgement  (conversationState)  looser, strip-then-match
 *
 * The investigation (docs/architecture/ACKNOWLEDGEMENT_PREDICATE_OWNERSHIP.md)
 * determined they are DIFFERENT questions and must NOT be merged: the
 * disagreement is masked at every high-stakes site, and the remaining
 * disagreements sit on genuinely ambiguous tokens ("right", "done") a merge
 * would misclassify. This file PINS the reconciliation prior sessions built so
 * it cannot silently re-fork — which is the recurring "fixed one utterance at a
 * time" defect the census named.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { isBareAcknowledgement } from '@/lib/teaching/masteryGate'
import { isLowSignalAcknowledgement } from '@/lib/teaching/conversationState'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

describe('A. the two predicates are DISTINCT — neither is a copy of the other', () => {
  // If a future refactor makes them identical, that is a real decision to make
  // deliberately (and would break the strict-vs-loose split); this asserts the
  // current, intended distinctness so no reader assumes interchangeability.
  it('strict ⊄ loose: "thanks"/"done" are bare acks the ladder predicate does NOT catch', () => {
    for (const m of ['thanks', 'done']) {
      expect(isBareAcknowledgement(m)).toBe(true)
      expect(isLowSignalAcknowledgement(m)).toBe(false)
    }
  })
  it('loose ⊄ strict: natural multi-word receipts the strict predicate misses', () => {
    for (const m of ['yeah that makes sense', 'i see', 'i follow', 'ok what next']) {
      expect(isLowSignalAcknowledgement(m)).toBe(true)
      expect(isBareAcknowledgement(m)).toBe(false)
    }
  })
})

describe('B. the ladder predicate is the OWNER of the grading-null decision', () => {
  // A prior session switched this gate FROM isBareAcknowledgement TO the ladder
  // predicate to end a demotion bug ("I understand" being graded). Pin it: the
  // grading gate must read the ladder predicate, so it cannot re-fork.
  it('route.ts nulls the teaching signal on isLowSignalAcknowledgement, not the strict predicate', () => {
    expect(ROUTE).toMatch(/if \(isLowSignalAcknowledgement\(message\)\) teachingSignal = null/)
    // The strict predicate must NOT be the one gating the signal null.
    expect(ROUTE).not.toMatch(/if \(isBareAcknowledgement\(message\)\) teachingSignal = null/)
  })
})

describe('C. the masking invariant at serveFromMemory', () => {
  // answersProseQuestion (strict, internally isBareAcknowledgement) is consumed
  // ONLY alongside ackToQuestion (= isLowSignalAcknowledgement), ANDed. Because
  // the ladder predicate catches every low-ONLY receipt, the strict predicate's
  // miss can never change the serveFromMemory outcome. Two things must hold:

  it('the ladder predicate catches every low-ONLY receipt (the masking premise)', () => {
    const lowOnly = [
      'i see', 'ok, i think i follow so far', 'yeah that makes sense',
      'right, i understand that', 'ok what next', 'i follow', "i'm with you",
      'that makes sense', 'ok got it thanks', 'mhm', 'right',
    ]
    for (const m of lowOnly) {
      // low-ONLY by definition: loose true, strict false — and the loose true is
      // what masks the strict false wherever the two are ANDed.
      expect(isLowSignalAcknowledgement(m)).toBe(true)
      expect(isBareAcknowledgement(m)).toBe(false)
    }
  })

  it('every serveFromMemory expression ANDs ackToQuestion alongside answersProse', () => {
    // If ackToQuestion is ever dropped from this expression (believing the prose
    // detector covers receipts), the low-ONLY divergence stops being masked.
    const lines = ROUTE.split('\n').filter((l) => l.includes('serveFromMemory ='))
    expect(lines.length).toBeGreaterThan(0)
    for (const l of lines) {
      expect(l).toContain('!answersProse')
      expect(l).toContain('!ackToQuestion')
    }
  })

  it('ackToQuestion is bound to the ladder predicate', () => {
    expect(ROUTE).toMatch(/const ackToQuestion = isLowSignalAcknowledgement\(message\)/)
  })
})
