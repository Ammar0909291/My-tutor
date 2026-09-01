/**
 * Lesson summary (P6 requirement 6) — built from what the learner actually
 * demonstrated, not from what the model remembers saying.
 *
 * Root cause of generic summaries: the model was asked to summarise from the
 * transcript, so it summarised its own OUTPUT ("we covered fractions") rather
 * than the learner's EVIDENCE. The runtime already holds the evidence —
 * correctAtCheck / correctAtPractice, misconceptionsSeen, remediationCount —
 * so the summary can be assembled deterministically and the model asked only
 * to voice it.
 *
 * Pure functions over state the engine already owns. No new store.
 */

import type { ConversationState } from './conversationState'
import { evaluateConceptBudget, hasDemonstratedMastery } from './conceptBudget'
import { masteryVerifiedStrict } from './masteryGate'
import { safeConceptTitle } from '@/lib/curriculum/knowledgeGraph'

export interface ConceptOutcome {
  conceptId: string
  /** Learner-facing name when one is known; falls back to the id. */
  title: string
  status: 'mastered' | 'needs_review'
  /** Misconception ids surfaced on this concept, whether or not repaired. */
  misconceptions: string[]
  /** True when a misconception was surfaced AND the concept still reached
   *  mastery — i.e. the repair demonstrably worked. */
  misconceptionsCorrected: boolean
}

/** Derive one concept's outcome from its end-of-lesson conversation state. */
/**
 * True when this concept's mastery would rest on an answer key the model
 * invented. See the note inside `conceptOutcome` for the measured failure.
 *
 * No invented grades at all -> always false, so nothing changes for a lesson
 * the model did not write its own graded item into.
 */
function launderedEvidence(state: ConversationState): boolean {
  if ((state.unauthoredKeyGrades ?? 0) === 0) return false
  return !masteryVerifiedStrict(state)
}

export function conceptOutcome(
  state: ConversationState,
  title?: string | null,
  /** Learner's teaching language. Defaults to 'en' so existing callers are
   *  unchanged; supplying it localizes the concept name. */
  lang: string = 'en',
): ConceptOutcome {
  const mastered = hasDemonstratedMastery(state)
  const budget = evaluateConceptBudget(state)
  return {
    conceptId: state.conceptId ?? 'unknown',
    // NEVER falls back to the concept id. It used to (`|| state.conceptId`),
    // which is how internal ids like `chem.found.states-of-matter` reached the
    // learner's completion screen: this title is rendered verbatim into the
    // lesson close and the summary block. safeConceptTitle resolves a
    // localized name, then the KG's English name, and rejects an id at every
    // step; when nothing presentable exists the generic phrase is used, since
    // an unnamed concept reads as prose while a leaked id reads as a bug.
    title: safeConceptTitle(state.conceptId, title, lang) ?? 'this concept',
    // A concept is only "mastered" on the server's own evidence; anything
    // else — including a spent budget — is honestly reported as needing
    // review rather than quietly counted as done.
    //
    // AND THE RECORD IS A SECOND AUTHORITY, WHICH IS HOW AN INVENTED KEY GOT
    // THROUGH. MEASURED live 2026-09-01, real account, phys.mech.friction, on
    // the deploy that shipped the invented-key fix. Final state:
    //
    //   correctAtCheck 1   verifiedCorrectAtCheck 0
    //   correctAtPractice 2   verifiedCorrectAtPractice 2
    //   unauthoredKeyGrades 2
    //
    // `gateLessonCompletion` consults `masteryVerifiedStrict`, which is FALSE
    // there, so the [LESSON_COMPLETE] tag was correctly ungated. But the
    // permanent record does not run through that gate at all: it runs through
    // `isConceptClosed` -> here, and `hasDemonstratedMastery` reads the PLAIN
    // `correctAtPractice`, or merely `phase === 'TRANSFER'`, which needs no
    // verified evidence whatsoever. So the lesson was written to
    // lesson_attempts COMPLETED and markConceptMastered, and the learner was
    // told "You mastered: Friction Forces" — on evidence including a graded
    // item whose key the model invented AND got wrong (it keyed 7.9 N where
    // μ·mg·cos30 = 10.4 N, a value not among its own four options).
    //
    // SCOPED SO IT CANNOT BREAK ORDINARY LESSONS. The strict test is required
    // ONLY when this session actually graded against an invented key. With
    // `unauthoredKeyGrades` at zero — every lesson where the model did not
    // invent a graded item — this expression is byte-identical to what it was.
    // Making strict mastery a universal precondition here would be a far
    // larger change, and this codebase has repeatedly measured over-blocking
    // doing more harm than the thing it blocked.
    status: mastered && !budget.markForReview && !launderedEvidence(state)
      ? 'mastered'
      : 'needs_review',
    misconceptions: [...state.misconceptionsSeen],
    misconceptionsCorrected: mastered && state.misconceptionsSeen.length > 0,
  }
}

export interface LessonSummary {
  mastered: ConceptOutcome[]
  needsReview: ConceptOutcome[]
  corrected: ConceptOutcome[]
  /** True when every concept reached mastery. */
  complete: boolean
  totalConcepts: number
}

export function buildLessonSummary(outcomes: ConceptOutcome[]): LessonSummary {
  const mastered = outcomes.filter((o) => o.status === 'mastered')
  const needsReview = outcomes.filter((o) => o.status === 'needs_review')
  const corrected = outcomes.filter((o) => o.misconceptionsCorrected)
  return {
    mastered,
    needsReview,
    corrected,
    complete: outcomes.length > 0 && needsReview.length === 0,
    totalConcepts: outcomes.length,
  }
}

/**
 * Render the summary as a prompt contract. The model is given the FACTS and
 * told to voice them — it is explicitly forbidden from adding concepts, since
 * inventing coverage is the exact failure this replaces.
 *
 * Returns '' when there is nothing evidenced yet, so a lesson that never got
 * started does not produce a fabricated summary.
 */
export function buildLessonSummaryBlock(summary: LessonSummary): string {
  if (summary.totalConcepts === 0) return ''
  const lines: string[] = [
    '\n\nLESSON SUMMARY (mandatory — these are the facts, voice them naturally '
    + 'in 3-5 sentences; do NOT add any concept that is not listed here, and do '
    + 'NOT claim they mastered something listed as needing review):',
  ]

  if (summary.mastered.length > 0) {
    lines.push(`- Mastered: ${summary.mastered.map((o) => o.title).join(', ')}.`)
  } else {
    lines.push('- Nothing reached full mastery this session — say so kindly, and name what they did move forward on.')
  }

  if (summary.corrected.length > 0) {
    lines.push(
      `- Misconceptions corrected: ${summary.corrected.map((o) => o.title).join(', ')}. `
      + 'Name this as real progress — fixing a wrong idea is harder than learning a new one.',
    )
  }

  if (summary.needsReview.length > 0) {
    lines.push(
      `- Worth another look later: ${summary.needsReview.map((o) => o.title).join(', ')}. `
      + 'Frame this as normal planning, never as failure.',
    )
  }

  lines.push(
    summary.complete
      ? '- Close by confirming the lesson is complete.'
      : '- Close by forecasting what comes next in one sentence.',
  )

  return lines.join('\n')
}
