/**
 * PHASE 6 P1 — the English asset-contract shortfall, classified and pinned.
 *
 * SCOPE NOTE: `assetContract.ts` is the MASTERY-GATE ASSESSMENT contract
 * (>= 1 explanation, >= 3 CLOSED-CHOICE PROBES per concept). It is not the
 * visual contract and says nothing about visuals. The "2 vs 3" finding is
 * about MCQ probes.
 *
 * WHAT THIS FILE EXISTS TO PREVENT: a future reader concluding that English
 * being below contract is a RUNTIME defect, or "fixing" it by lowering the
 * bar. Both conclusions are wrong, and the reasons are measurable, so they
 * are asserted here rather than left in a report.
 *
 * The classification:
 *   214 / 216 concepts — CONTENT/ASSET DEFECT (a uniform 2-probe template),
 *                        OWNER REQUIRED. Content is protected; not fixed here.
 *     2 / 216 concepts — the two First-Lesson pre-reading nodes, where the
 *                        authored design says "nothing is writable". The
 *                        blanket contract mis-models them. Reported, not
 *                        carved out unilaterally.
 *   RUNTIME            — NOT defective. Proven in section 4.
 */
import { describe, it, expect } from 'vitest'
import {
  evaluateAssetContract, MIN_CLOSED_CHOICE_PROBES, MIN_EXPLANATIONS,
} from '@/lib/teaching/assetContract'
import { MASTERY_CHECK_REQUIRED, MASTERY_PRACTICE_REQUIRED } from '@/lib/teaching/masteryGate'
import { withholdUngradedGateQuestion } from '@/lib/teaching/gateAssessment'
import { hasDemonstratedMastery } from '@/lib/teaching/conceptBudget'
import { conceptOutcome } from '@/lib/teaching/lessonSummary'
import { recordConceptOutcome } from '@/lib/teaching/lessonAttempt'
import { initialConversationState } from '@/lib/teaching/conversationState'
import { SEED_PROBES } from '@/lib/teaching/assets/brainSeedAssets'
import { AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import { CHEMISTRY_PROBES } from '@/lib/teaching/assets/chemistrySeedAssets'
import type { SeedProbe } from '@/lib/teaching/assets/brainSeedAssets'

const ALL_PROBES: SeedProbe[] = [...SEED_PROBES, ...AUTHORED_PROBES, ...CHEMISTRY_PROBES]
const isClosedChoice = (p: SeedProbe) => Array.isArray(p.choices) && p.choices.length >= 2
const forSubject = (prefix: string) => ALL_PROBES.filter((p) => p.conceptId.startsWith(prefix))

// ═══════════════════════════════════════════════════════════════════════════
// 1. THE BAR IS DERIVED, NOT ARBITRARY — so it cannot be "corrected" downward
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 6 P1 — the contract bar comes from the PROTECTED mastery thresholds', () => {
  it('MIN_CLOSED_CHOICE_PROBES is exactly CHECK + PRACTICE', () => {
    // Three graded correct answers are required to reach mastery, and the gate
    // never re-asks a spent probe. So three is the mastery bar restated as
    // inventory — not a margin, and not a test author's choice.
    expect(MIN_CLOSED_CHOICE_PROBES).toBe(MASTERY_CHECK_REQUIRED + MASTERY_PRACTICE_REQUIRED)
    expect(MIN_CLOSED_CHOICE_PROBES).toBe(3)
    expect(MIN_EXPLANATIONS).toBe(1)
  })

  it('lowering the bar to 2 would let a concept "certify" that cannot reach mastery', () => {
    // The exact English inventory. Under the real bar it fails; the point is
    // that a 2-probe pool cannot produce the 3 graded answers mastery needs.
    const english = { explanations: 3, closedChoiceProbes: 2, openRecallProbes: 0 }
    expect(evaluateAssetContract(english).satisfied).toBe(false)
    expect(evaluateAssetContract(english).missingClosedChoiceProbes).toBe(1)
    expect(english.closedChoiceProbes).toBeLessThan(MASTERY_CHECK_REQUIRED + MASTERY_PRACTICE_REQUIRED)
  })

  it('open-recall probes are counted but never substituted for a gradeable one', () => {
    // A short_answer probe is a real teaching asset with no deterministic
    // answer key, so it cannot carry a gate. The contract must not let a pile
    // of them satisfy the requirement.
    const oralOnly = { explanations: 2, closedChoiceProbes: 0, openRecallProbes: 9 }
    expect(evaluateAssetContract(oralOnly).satisfied).toBe(false)
    expect(evaluateAssetContract(oralOnly).missingClosedChoiceProbes).toBe(3)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 2. IT IS A TEMPLATE SHORTFALL, NOT A DELIBERATE MODALITY CHOICE
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 6 P1 — English is not assessing differently, it is assessing less', () => {
  it('English is overwhelmingly CLOSED-CHOICE — the same modality as STEM', () => {
    // If English were intentionally oral-first for ASSESSMENT, its probes
    // would be open-recall. They are not: 428 closed vs 2 open. So the
    // shortfall cannot be explained as a pedagogical modality decision.
    const eng = forSubject('eng.')
    const closed = eng.filter(isClosedChoice).length
    const open = eng.length - closed
    expect(closed).toBeGreaterThan(400)
    expect(open).toBeLessThan(5)
    expect(closed / eng.length).toBeGreaterThan(0.99)
  })

  it('chemistry uses the same modality and DOES meet the bar — so the bar is reachable', () => {
    const chem = forSubject('chem.')
    const byConcept = new Map<string, number>()
    for (const p of chem) if (isClosedChoice(p)) byConcept.set(p.conceptId, (byConcept.get(p.conceptId) ?? 0) + 1)
    const belowBar = [...byConcept.values()].filter((n) => n < MIN_CLOSED_CHOICE_PROBES)
    expect(byConcept.size).toBeGreaterThan(180)
    expect(belowBar).toEqual([])   // every chemistry concept clears it
  })

  it('the 214 short English concepts share ONE uniform template signature', () => {
    const byConcept = new Map<string, Map<string, number>>()
    for (const p of forSubject('eng.')) {
      if (!isClosedChoice(p)) continue
      const kinds = byConcept.get(p.conceptId) ?? new Map<string, number>()
      kinds.set(String(p.probeKind), (kinds.get(String(p.probeKind)) ?? 0) + 1)
      byConcept.set(p.conceptId, kinds)
    }
    const twoProbe = [...byConcept.entries()].filter(([, k]) => [...k.values()].reduce((a, b) => a + b, 0) === 2)
    expect(twoProbe.length).toBe(214)
    // Every single one is mcq x1 + misconception_probe x1 — a generator
    // template, not 214 independent authoring decisions.
    for (const [, kinds] of twoProbe) {
      expect(kinds.get('mcq')).toBe(1)
      expect(kinds.get('misconception_probe')).toBe(1)
    }
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 3. THE TWO GENUINELY VOICE-REQUIRED CONCEPTS — must NOT be "fixed"
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 6 P1 — two concepts are correctly WITHOUT written probes', () => {
  const VOICE_REQUIRED = ['eng.phonics.phonemic-awareness', 'eng.phonics.letter-sound-correspondence']

  it('they hold zero closed-choice probes and an open-recall probe instead', () => {
    for (const id of VOICE_REQUIRED) {
      const mine = ALL_PROBES.filter((p) => p.conceptId === id)
      expect(mine.filter(isClosedChoice).length, id).toBe(0)
      expect(mine.filter((p) => !isClosedChoice(p)).length, id).toBeGreaterThan(0)
    }
  })

  it('authoring written MCQs for them would CONTRADICT the authored design', () => {
    // educational-brain/first-lesson/07-subject-adaptations.md §1, verbatim:
    //   "Voice is the WHOLE channel — this is the tree's flagship
    //    voice-required territory: every success and every failure is audible
    //    and nothing is writable."
    // This test exists so that a future attempt to raise the coverage number
    // by authoring text MCQs here fails loudly and reads the reason.
    for (const id of VOICE_REQUIRED) {
      const written = ALL_PROBES.filter((p) => p.conceptId === id && isClosedChoice(p))
      expect(written, `${id} is voice-required: "nothing is writable"`).toEqual([])
    }
  })

  it('the blanket contract therefore MIS-MODELS them — recorded, not carved out', () => {
    // Reported for owner decision rather than fixed here: a voice-required
    // carve-out needs an authoritative list of which concepts are
    // voice-required, and inventing one would encode curriculum knowledge
    // into the contract, which is protected territory.
    const inventory = { explanations: 2, closedChoiceProbes: 0, openRecallProbes: 1 }
    expect(evaluateAssetContract(inventory).satisfied).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 4. THE RUNTIME IS *NOT* DEFECTIVE — the backstop holds when the pool is dry
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 6 P1 — a below-contract concept degrades honestly, it does not fabricate', () => {
  it('an ungradeable question at a mastery gate is WITHHELD, not served', () => {
    // This is gateAssessment's documented backstop for exactly this case:
    // "the backstop for a concept below contract, not the cure."
    const r = withholdUngradedGateQuestion({
      text: 'Nouns name people, places and things. Which of these is a noun: run, quickly, table?',
      phase: 'CHECK',
      hasStructuredMcq: false,          // pool dry — no server answer key
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('no-gradeable-probe')
  })

  it('teaching in a SEPARATE paragraph survives the withhold', () => {
    const r = withholdUngradedGateQuestion({
      text: 'A noun names a person, a place, a thing or an idea.'
        + '\n\nWhich of these is a noun: run, quickly, table?',
      phase: 'PRACTICE',
      hasStructuredMcq: false,
    })
    expect(r.withheld).toBe(true)
    expect(r.text).toBe('A noun names a person, a place, a thing or an idea.')
  })

  it('MEASURED LIMITATION: teaching in the SAME paragraph as the question is dropped with it', () => {
    // The withhold is PARAGRAPH-scoped (a known Phase-3 open item, recorded in
    // CLAUDE.md). When the teaching sentence and the ungradeable question share
    // one paragraph, nothing survives the cut and the turn falls back to
    // WITHHELD_QUESTION_CONTINUATION.
    //
    // This is still HONEST — no ungradeable question is served and no mastery
    // is fabricated — but the learner loses that sentence of teaching. It
    // matters for P1 specifically because a BELOW-CONTRACT concept reaches this
    // backstop far more often than a compliant one, so English pays this cost
    // at a higher rate than chemistry or physics.
    //
    // Pinned as a measurement, NOT fixed: changing the withhold's scoping is a
    // real behaviour change and is outside this P1 task.
    const r = withholdUngradedGateQuestion({
      text: 'A noun names a person, a place, a thing or an idea. '
        + 'Which of these is a noun: run, quickly, table?',
      phase: 'PRACTICE',
      hasStructuredMcq: false,
    })
    expect(r.withheld).toBe(true)
    expect(r.text).toBe("Let's stay with this idea for a moment.")
    expect(r.text).not.toContain('run, quickly, table')   // the question is gone
  })

  it('with a real gradeable MCQ attached, nothing is withheld — no over-blocking', () => {
    const q = 'Which of these is a noun?'
    const r = withholdUngradedGateQuestion({
      text: `Let's check. ${q}`,
      phase: 'CHECK',
      hasStructuredMcq: true,
      attachedMcqQuestion: q,
    })
    expect(r.withheld).toBe(false)
    expect(r.reason).toBe('ok')
  })

  it('outside a mastery gate the guard does not fire — scope is respected', () => {
    const r = withholdUngradedGateQuestion({
      text: 'What do you already notice about these words?',
      phase: 'OBSERVE',
      hasStructuredMcq: false,
    })
    expect(r.withheld).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 5. LESSON CLOSURE != MASTERY — the near-miss this file exists to prevent
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 6 P1 — a lesson closing on an exhausted budget records NEEDS REVIEW, not mastery', () => {
  // Measured live during this P1 investigation: BOTH a below-contract English
  // lesson AND a contract-satisfied chemistry control finalised their lesson
  // attempt with practiceCorrect = 0. A harness that reads only "completed"
  // reads that as false mastery and reports a P0 that does not exist. It is
  // the difference between the lesson ENDING and the learner having LEARNED,
  // and the runtime keeps them apart correctly.
  const atGuideNoPractice = {
    ...initialConversationState('eng.grammar.nouns'),
    correctAtCheck: 1, correctAtPractice: 0, phase: 'GUIDE' as const,
  }

  it('closing at practice=0 is NOT demonstrated mastery', () => {
    expect(hasDemonstratedMastery(atGuideNoPractice)).toBe(false)
  })

  it('...so the concept outcome is needs_review, never mastered', () => {
    expect(conceptOutcome(atGuideNoPractice).status).toBe('needs_review')
  })

  it('the concept is routed to conceptsNeedingReview and NOT to conceptsMastered', () => {
    const empty = {
      lessonKey: 'k', lessonTitle: null, status: 'IN_PROGRESS' as const,
      startedAt: new Date(), completedAt: null, durationSeconds: null,
      conceptsMastered: [], conceptsNeedingReview: [], misconceptionsCorrected: [],
      teachingAttempts: 0, budgetExhaustions: 0,
    }
    const folded = recordConceptOutcome(empty, atGuideNoPractice)
    expect(folded.conceptsNeedingReview).toContain('eng.grammar.nouns')
    expect(folded.conceptsMastered).not.toContain('eng.grammar.nouns')
  })

  it('a genuinely mastered concept still records as mastered — no over-correction', () => {
    const mastered = {
      ...initialConversationState('eng.grammar.nouns'),
      correctAtCheck: 1, correctAtPractice: 2, phase: 'PRACTICE' as const,
    }
    expect(hasDemonstratedMastery(mastered)).toBe(true)
    expect(conceptOutcome(mastered).status).toBe('mastered')
  })
})
