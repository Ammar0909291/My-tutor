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
    status: mastered && !budget.markForReview ? 'mastered' : 'needs_review',
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
