/**
 * ENG-D02 / ENG-D03 regression coverage.
 *
 * Every phrasing below is quoted verbatim from
 * `docs/architecture/ENGLISH_MCQ_REOFFER_FALSE_POSITIVE_FINDING.md` and
 * `docs/qa/ENGLISH_REAL_STUDENT_DEFECTS.md`. The probes are built in the REAL
 * `TutorMCQ` shape and driven through the REAL exported functions — no
 * re-implementation of the route's predicate beyond the one positive term
 * under test, which is asserted against route source separately below.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import {
  engagesPendingOptions,
  resolveMcqChoice,
  type TutorMCQ,
} from '@/lib/teaching/mcq'
import { stripContradictingProseOptions, hasProseMultipleChoice } from '@/lib/teaching/proseMcqGuard'
import { stripLeadingFalseConfirmation } from '@/lib/teaching/answerConfirmation'
import { detectLearnerQuestion } from '@/lib/teaching/conversationState'
import { isBareAcknowledgement } from '@/lib/teaching/masteryGate'
import { readTurnIntent } from '@/lib/teaching/turnIntent'

/** A real English probe of the kind the campaign ran against. */
const verbsProbe: TutorMCQ = {
  question: 'Which word in "The dog seems happy" is the verb?',
  options: ['The word dog', 'The word seems', 'The word happy', 'There is no verb'],
  correctIndex: 1,
  assetId: 'probe-verbs',
}

const povProbe: TutorMCQ = {
  question: 'Which sentence uses a compound subject?',
  options: [
    'Dogs are popular pets.',
    'Dogs and cats are popular pets.',
    'Dogs run quickly in the park.',
  ],
  correctIndex: 1,
  assetId: 'probe-compound-subject',
}

describe('ENG-D02: the disambiguation lead-in requires positive option engagement', () => {
  // The three classes no existing exclusion can see, quoted verbatim.
  const documentedFalsePositives = [
    "wait, what about words like 'is' or 'seems', those arent actions",
    'hmm i think i picked the wrong one, let me think again',
    'thanks that helped',
    'can you try a different way to explain it',
    'oh wait, i think i see my mistake now',
    'thank you, that makes more sense',
    'hold on, let me reconsider that',
    'oh wait, i think i need to rethink that',
    'thanks that makes sense',
    'i dont understand irregular verbs, can you explain',
  ]

  it.each(documentedFalsePositives)('does not read %j as an answer attempt', (msg) => {
    expect(engagesPendingOptions(msg, verbsProbe)).toBe(false)
  })

  // NEGATIVE CONTROL — without this the suite above proves nothing. Measured
  // 2026-09-12: 9 of the 10 phrasings escape EVERY pre-existing exclusion, so
  // the old predicate genuinely fired the lead-in on them. If a future change
  // makes one of them excludable some other way that is fine; what must never
  // happen is this control silently passing because the messages were never
  // reaching the predicate in the first place.
  it('the pre-existing exclusions do not catch these (why a positive term was needed)', () => {
    const escapes = documentedFalsePositives.filter((m) => {
      const ti = readTurnIntent(m) as { wantsPractice: boolean; failureState: unknown; learnerRequest: unknown }
      return !isBareAcknowledgement(m)
        && !ti.wantsPractice
        && !detectLearnerQuestion(m)
        && ti.failureState === null
        && ti.learnerRequest === null
    })
    expect(escapes.length).toBeGreaterThanOrEqual(9)
  })

  it('still recognises a genuine but ungradeable attempt (the I1 case)', () => {
    // Reaches for two options at once: real engagement, and the strict
    // resolver correctly refuses to pick between them.
    const msg = 'i think its the dog or maybe the happy one'
    expect(engagesPendingOptions(msg, verbsProbe)).toBe(true)
  })

  it('recognises a bare letter, an ordinal, and two discriminating words', () => {
    expect(engagesPendingOptions('B', verbsProbe)).toBe(true)
    expect(engagesPendingOptions('the second one', verbsProbe)).toBe(true)
    expect(engagesPendingOptions('there is no verb here', verbsProbe)).toBe(true)
  })

  it('does not fire on shared option vocabulary alone', () => {
    // "word" occurs in three options, so it discriminates nothing.
    expect(engagesPendingOptions('what does word mean again', verbsProbe)).toBe(false)
  })

  it('the article "a" is not an option letter', () => {
    expect(engagesPendingOptions('a dog is an animal though', verbsProbe)).toBe(false)
    expect(engagesPendingOptions('A. because it starts there', verbsProbe)).toBe(true)
  })

  it('never grades, and never contradicts the strict resolver', () => {
    // A true return grants no credit: the resolver still refuses this message.
    const msg = 'i think its the dog or maybe the happy one'
    expect(engagesPendingOptions(msg, verbsProbe)).toBe(true)
    expect(resolveMcqChoice(msg, verbsProbe)).toBeNull()
  })

  it('returns false with no pending probe at all', () => {
    expect(engagesPendingOptions('B', null)).toBe(false)
  })

  it('an out-of-range letter is not engagement', () => {
    const two: TutorMCQ = { question: 'q', options: ['alpha thing', 'beta thing'], correctIndex: 0 }
    expect(engagesPendingOptions('D', two)).toBe(false)
    expect(engagesPendingOptions('the third one', two)).toBe(false)
  })
})

describe('ENG-D03: fabricated MCQ content must not masquerade as the pending probe', () => {
  it('strips a lettered run whose options are not the pending probe (Group 12)', () => {
    const reply =
      "I couldn't tell which option your answer matched — tap the choice you mean from the list below.\n" +
      'A) First person\nB) Second person\nC) Third person limited\nD) Third person omniscient'
    expect(hasProseMultipleChoice(reply)).toBe(true)
    const out = stripContradictingProseOptions(reply, povProbe)
    expect(out).not.toContain('Third person omniscient')
    expect(out).toContain("I couldn't tell which option your answer matched")
  })

  it('leaves a FAITHFUL prose restatement of the real options untouched', () => {
    const reply =
      'Let me put the choices again.\n' +
      'A) Dogs are popular pets.\nB) Dogs and cats are popular pets.\nC) Dogs run quickly in the park.'
    expect(stripContradictingProseOptions(reply, povProbe)).toBe(reply)
  })

  it('does nothing without a pending probe, or without an MCQ shape', () => {
    const reply = 'A) one thing\nB) another thing'
    expect(stripContradictingProseOptions(reply, null)).toBe(reply)
    expect(stripContradictingProseOptions('plain teaching text', povProbe)).toBe('plain teaching text')
  })

  it('never returns an empty reply', () => {
    const reply = 'A) First person\nB) Second person'
    const out = stripContradictingProseOptions(reply, povProbe)
    expect(out.trim().length).toBeGreaterThan(0)
  })

  it('an unbacked opening confirmation is strippable (Group 9)', () => {
    const reply = "That's right. Let me know which one you pick."
    expect(stripLeadingFalseConfirmation(reply)).toBe('Let me know which one you pick.')
  })
})

describe('route wiring', () => {
  const src = fs.readFileSync(
    path.join(process.cwd(), 'src/app/api/learn/chat/route.ts'),
    'utf8',
  )

  it('the positive term is part of genuineUnmappedAttempt', () => {
    expect(src).toContain('&& engagesPendingOptions(message, servedReoffer ?? pendingMcqHoisted)')
    const at = src.indexOf('const genuineUnmappedAttempt')
    const end = src.indexOf('engagesPendingOptions(message', at)
    expect(at).toBeGreaterThan(0)
    expect(end).toBeGreaterThan(at)
  })

  it('the unbacked-confirmation strip is no longer gated on genuineUnmappedAttempt', () => {
    expect(src).toContain('if (isReoffer && mcqGradeHoisted === null) {')
    expect(src).toContain('[mcq-reoffer-unbacked-confirmation]')
  })

  it('the fabricated-option strip runs on re-offer turns', () => {
    expect(src).toContain('stripContradictingProseOptions')
    expect(src).toContain('[mcq-reoffer-fabricated-options]')
  })
})
