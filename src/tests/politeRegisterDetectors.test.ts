/**
 * PHASE E — THE POLITE LEARNER MUST BE HEARD.
 *
 * The measured defect (docs/architecture/PHASE_E_MASTERY_FAILURE_ROOT_CAUSE.md):
 * the ladder climbs on exactly two inputs — a graded-correct answer or an
 * acknowledgement — and below GUIDE the authored probe gate cannot fire, so the
 * acknowledgement is the only deterministic rung-mover there. Both detectors
 * that could hear this learner were deaf to a single word:
 *
 *   isLowSignalAcknowledgement('ok')     true
 *   isLowSignalAcknowledgement('ok sir') FALSE
 *   asksForPractice('give me one more question sir')  FALSE
 *
 * Twelve live lessons across three runs: the two that were asked six questions
 * mastered, the ten asked three or fewer did not, and not one lesson landed in
 * between — because the state below GUIDE is a fixed point for this learner.
 *
 * These tests are written to FAIL on the code as it stood, and they pin the
 * boundary the fix must not cross: an acknowledgement, however polite, still
 * cannot buy mastery.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  advanceConversationState,
  initialConversationState,
  isLowSignalAcknowledgement,
  type ConversationState,
  type TeachingPhase,
} from '@/lib/teaching/conversationState'
import { asksForPractice, masteryVerifiedStrict } from '@/lib/teaching/masteryGate'

const SRC = (p: string) => readFileSync(join(process.cwd(), 'src', p), 'utf8')

// ── A. ACKNOWLEDGEMENT ──────────────────────────────────────────────────────
describe('A. an acknowledgement is still an acknowledgement when it is polite', () => {
  const heard = [
    'ok', 'ok sir', 'got it', 'got it sir', 'yes', 'yes sir',
    'okay sir', 'okay ma\'am', 'yeah teacher', 'ok miss',
    'ok madam', 'got it, thanks', 'yes please',
  ]
  it.each(heard)('reads "%s" as an acknowledgement', (m) => {
    expect(isLowSignalAcknowledgement(m)).toBe(true)
  })

  // THE PAIR THAT NAMES THE DEFECT. Both halves must agree.
  it.each([
    ['ok', 'ok sir'], ['got it', 'got it sir'],
    ['yes', 'yes sir'], ['okay', 'okay sir'],
  ])('"%s" and "%s" are read the same way', (plain, polite) => {
    expect(isLowSignalAcknowledgement(polite)).toBe(isLowSignalAcknowledgement(plain))
  })

  const notHeard = [
    'sir i not understand this',
    'ok but why it happen like that',
    'sorry sir can you say more simple',
    'i am bit confused sir',
    'can you show picture please',
    'is it ok sir to use this formula',
    'ok so the answer is 3.1 m/s because the cylinder rolls',
    'yes the electron sits in the lower orbital sir',
    'please explain one more time simple words',
  ]
  it.each(notHeard)('does NOT read "%s" as a bare acknowledgement', (m) => {
    expect(isLowSignalAcknowledgement(m)).toBe(false)
  })

  it('a question is never an acknowledgement, however polite', () => {
    expect(isLowSignalAcknowledgement('ok sir?')).toBe(false)
    expect(isLowSignalAcknowledgement('yes sir, but why?')).toBe(false)
  })

  /**
   * PRE-EXISTING BEHAVIOUR, PINNED RATHER THAN CHANGED.
   *
   * "thanks" is deliberately absent from LOW_SIGNAL_TOKENS_RE (it lives in
   * ACK_PHRASES, which drives the DIFFERENT predicate isBareAcknowledgement).
   * So bare "thanks" was never a low-signal acknowledgement, and after the
   * strip "thanks sir" is not one either — which is exactly the property
   * asked for: the polite form behaves like the plain form. Adding "thanks"
   * to that vocabulary would be widening the token list, which this change
   * deliberately does not do.
   */
  it('a message made only of politeness is not an acknowledgement', () => {
    expect(isLowSignalAcknowledgement('thanks')).toBe(false)
    expect(isLowSignalAcknowledgement('thanks sir')).toBe(isLowSignalAcknowledgement('thanks'))
    expect(isLowSignalAcknowledgement('sir')).toBe(false)
    expect(isLowSignalAcknowledgement('please')).toBe(false)
  })
})

// ── B. PRACTICE REQUESTS ────────────────────────────────────────────────────
describe('B. a request for a question is heard in the learner\'s own words', () => {
  // The three phrasings the live Phase E run actually sent, all previously deaf.
  const requests = [
    'ask me a question',
    'sir can you give me one question to try',
    'i want practice please',
    'give me one more question sir',
    'give me one question',
    'quiz me sir',
    'can you give me a practice question please',
    'i need practice sir',
    'i want practice',
  ]
  it.each(requests)('reads "%s" as a request for a question', (m) => {
    expect(asksForPractice(m)).toBe(true)
  })

  it('the pre-existing phrasings are unchanged', () => {
    for (const m of ['quiz me', 'test me', 'ask me another question',
      'give me a practice problem', 'lets practice', 'i want to practice',
      'give me something to solve', 'one more please']) {
      expect(asksForPractice(m)).toBe(true)
    }
  })
})

// ── C. NEGATIVE CONTROLS — the widening must not swallow ordinary sentences ──
describe('C. what must still NOT read as a request for a question', () => {
  const notRequests = [
    // The explicit refusal named in the brief.
    'don\'t ask me questions sir',
    'please don\'t ask me any more questions',
    'stop quizzing me sir',
    'i don\'t want practice',
    'i don\'t want to practice sir',
    'no more questions please',
    // Ordinary subject vocabulary containing the trigger nouns.
    'the research question is interesting sir',
    'best practice for balancing equations is to start with carbon',
    'is this a practice of the same rule sir',
    'i practice every day sir',
    'that question was hard sir',
    // "one" as a quantifier of something that is not a question.
    'give me one minute sir',
    'i need one more minute please',
    'give me one example of a lever',
    'can you explain one more time please',
    'please explain one more time simple words',
    // A confusion statement is a request for teaching, not for a quiz.
    'sir i not understand this',
    'i am bit confused sir',
  ]
  it.each(notRequests)('does NOT read "%s" as a request for a question', (m) => {
    expect(asksForPractice(m)).toBe(false)
  })

  it('an acknowledgement is not a request for a question', () => {
    for (const m of ['ok sir', 'got it sir', 'yes sir', 'thanks sir']) {
      expect(asksForPractice(m)).toBe(false)
    }
  })
})

// ── D. MASTERY SAFETY — the boundary the fix must never cross ───────────────
describe('D. no acknowledgement, however phrased, can buy mastery', () => {
  const atGate = (phase: TeachingPhase): ConversationState => ({
    ...initialConversationState('demo.concept'),
    phase, demonstrated: true,
  })
  const ackTurn = (prev: ConversationState, said: string) =>
    advanceConversationState(prev, {
      askedQuestion: false, questionSanctioned: true, signalCorrect: null,
      recoveryFired: false, learnerRequest: null, misconceptionDetected: false,
      isPriorKnowledgeProbe: false, dontKnowSignal: false,
      learnerIssuedDirective: false, degradedTurn: false, deliveredTeaching: true,
      acknowledgement: isLowSignalAcknowledgement(said),
    } as Parameters<typeof advanceConversationState>[1])

  const phrasings = ['ok', 'ok sir', 'got it sir', 'yes sir', 'thanks sir', 'okay ma\'am']

  it.each(phrasings)('"%s" never increments checkCorrect at CHECK', (said) => {
    const next = ackTurn(atGate('CHECK'), said)
    expect(next.correctAtCheck).toBe(0)
    expect(next.practiceCorrect ?? next.correctAtPractice).toBe(0)
    expect(next.phase).toBe('CHECK')
  })

  it.each(phrasings)('"%s" never increments practiceCorrect at PRACTICE', (said) => {
    const next = ackTurn(atGate('PRACTICE'), said)
    expect(next.correctAtPractice).toBe(0)
    expect(next.phase).toBe('PRACTICE')
  })

  it('a hundred polite acknowledgements at the gate never verify mastery', () => {
    let s = atGate('CHECK')
    for (let i = 0; i < 100; i++) s = ackTurn(s, 'ok sir')
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
    expect(masteryVerifiedStrict(s)).toBe(false)
  })
})

// ── E. TOPIC SAFETY — the normalised string must never leave the detectors ──
describe('E. the normalised form is detector-local', () => {
  const conv = SRC('lib/teaching/conversationState.ts')
  const gate = SRC('lib/teaching/masteryGate.ts')
  const NAME = 'stripAddressTokens'

  it('is defined once and used only by the two detectors that need it', () => {
    const defined = (conv.match(new RegExp(`function ${NAME}\\b`, 'g')) ?? []).length
    expect(defined).toBe(1)
    // Exactly one CALL in each file — isLowSignalAcknowledgement's and
    // asksForPractice's. The declaration is excluded by the lookbehind.
    const calls = (f: string) =>
      (f.match(new RegExp(`(?<!function )\\b${NAME}\\(`, 'g')) ?? []).length
    expect(calls(conv)).toBe(1)
    expect(calls(gate)).toBe(1)
  })

  it('no other module in src/ mentions it', () => {
    const offenders: string[] = []
    const walk = (dir: string) => {
      for (const e of require('node:fs').readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, e.name)
        if (e.isDirectory()) { walk(p); continue }
        if (!/\.tsx?$/.test(e.name)) continue
        if (/conversationState\.ts$|masteryGate\.ts$/.test(p)) continue
        if (p.includes(`${require('node:path').sep}tests${require('node:path').sep}`)) continue
        if (readFileSync(p, 'utf8').includes(NAME)) offenders.push(p)
      }
    }
    walk(join(process.cwd(), 'src'))
    expect(offenders).toEqual([])
  })

  it('the topic resolver still receives the learner\'s own words', async () => {
    // Structural: the route resolves the requested concept from `message`,
    // never from a normalised form. If this ever changes, the L1 qualifier
    // defect is one edit away.
    const route = SRC('app/api/learn/chat/route.ts')
    expect(route).not.toContain(NAME)

    // Behavioural half: the resolver reads the learner's own words, and a
    // vocative in them changes nothing about what it finds. If the strip ever
    // leaked into this path, a rewritten message would be resolving concepts —
    // which is precisely the shape of the L1 qualifier defect.
    const { resolveRequestedConceptId } =
      await import('@/lib/teaching/concept/requestedConcept')
    const withVocative = resolveRequestedConceptId('sir explain vsepr theory please', null, 'chemistry')
    const without = resolveRequestedConceptId('explain vsepr theory', null, 'chemistry')
    expect(withVocative).toBe('chem.bond.vsepr')
    expect(withVocative).toBe(without)
  })

  it('grading, excursion and visual detection are untouched by this change', () => {
    for (const f of ['lib/teaching/gateAssessment.ts', 'lib/teaching/excursion.ts',
      'lib/teaching/visual/requestedTopic.ts', 'lib/teaching/concept/conceptIndex.ts', 'lib/teaching/concept/requestedConcept.ts']) {
      expect(SRC(f)).not.toContain(NAME)
    }
  })
})

// ── F. THE ONE-WORD EXPERIMENT ──────────────────────────────────────────────
describe('F. the same twelve turns, said politely, reach the same place', () => {
  /** The real supply rule, read out of production and not invented:
   *  gateAssessment.isProbeAttachablePhase allows an authored probe at GUIDE /
   *  CHECK / PRACTICE only, and at GUIDE only when the learner asked for one. */
  const questionOnScreen = (phase: TeachingPhase, said: string): boolean =>
    phase === 'CHECK' || phase === 'PRACTICE' || phase === 'TRANSFER'
      ? true
      : phase === 'GUIDE' ? asksForPractice(said) : false

  function run(script: string[]) {
    let s = initialConversationState('demo.concept')
    let questions = 0
    for (let i = 0; i < 20; i++) {
      const said = script[i % script.length]
      const gradeable = questionOnScreen(s.phase, said)
      if (gradeable) questions++
      s = advanceConversationState(s, {
        askedQuestion: true, questionSanctioned: true,
        signalCorrect: gradeable ? true : null,
        recoveryFired: false, learnerRequest: null, misconceptionDetected: false,
        isPriorKnowledgeProbe: false, dontKnowSignal: false,
        learnerIssuedDirective: false, degradedTurn: false, deliveredTeaching: true,
        acknowledgement: isLowSignalAcknowledgement(said),
      } as Parameters<typeof advanceConversationState>[1])
      if (masteryVerifiedStrict(s)) break
    }
    return { phase: s.phase, check: s.correctAtCheck, practice: s.correctAtPractice, questions,
      mastered: masteryVerifiedStrict(s) }
  }

  const plain = ['ok', 'ok', 'ok', 'ask me a question', 'ok', 'ok']
  const polite = ['ok sir', 'ok sir', 'ok sir', 'give me one more question sir', 'ok sir', 'ok sir']

  it('the polite learner reaches exactly what the plain learner reaches', () => {
    expect(run(polite)).toEqual(run(plain))
  })

  it('and both of them actually finish', () => {
    const r = run(polite)
    expect(r.mastered).toBe(true)
    expect(r.phase).toBe('TRANSFER')
    expect(r.check).toBeGreaterThanOrEqual(1)
    expect(r.practice).toBeGreaterThanOrEqual(2)
  })

  it('the ladder below GUIDE is no longer a fixed point for this learner', () => {
    // The latch: 100 turns with the budget ignored used to move nothing.
    let s = initialConversationState('demo.concept')
    let firstMove: number | null = null
    for (let i = 0; i < 100 && firstMove === null; i++) {
      const before = s.phase
      s = advanceConversationState(s, {
        askedQuestion: true, questionSanctioned: true, signalCorrect: null,
        recoveryFired: false, learnerRequest: null, misconceptionDetected: false,
        isPriorKnowledgeProbe: false, dontKnowSignal: false,
        learnerIssuedDirective: false, degradedTurn: false, deliveredTeaching: true,
        acknowledgement: isLowSignalAcknowledgement('ok sir'),
      } as Parameters<typeof advanceConversationState>[1])
      if (before !== s.phase) firstMove = i + 1
    }
    expect(firstMove).not.toBeNull()
    expect(firstMove).toBeLessThanOrEqual(2)
  })
})
