/**
 * Concept Understanding Engine.
 *
 * `understandConcepts()` determines WHICH concept(s) the student is talking
 * about, before any teaching decision is made. Pure, synchronous,
 * deterministic. No teaching, no rendering, no LLM, no Prisma, no lesson
 * execution, no side effects.
 *
 * It READS conversation context supplied by the caller; it never owns or
 * stores it.
 */

import {
  ExtractionMethod, METHOD_CONFIDENCE,
  type ConceptUnderstandingInputs, type ConceptUnderstanding,
  type ConceptMatch, type AmbiguityCandidate,
} from './conceptUnderstanding'
import { resolveConceptMatches, normalizeKey } from './conceptIndex'

/** Comparison framing. Mirrors the Teaching Planner's own marker set — the
 *  planner decides the INTENT, this engine only decides whether the concept
 *  set is a comparison pair. */
const COMPARISON_RE = /\b(compare|comparison|difference[s]?\s+between|versus|vs\.?|contrast|as\s+opposed\s+to)\b/i

/** A message that refers back rather than naming something new. */
const BACK_REFERENCE_RE = /\b(it|that|this|them|those|these|again|same\s+(thing|one)|previous)\b/i

/** Multiplier applied when two readings compete for the same span. The
 *  engine surfaces both rather than guessing silently, and says so by
 *  lowering confidence rather than by reporting a false certainty. */
const AMBIGUITY_PENALTY = 0.6

/** Matches tied at the top of the ranking — same confidence AND same matched
 *  span length — are genuinely competing readings, not a ranked list. */
function topCompetingGroup(ranked: readonly ConceptMatch[]): readonly ConceptMatch[] {
  if (ranked.length === 0) return []
  const top = ranked[0]
  return ranked.filter(m =>
    m.confidence === top.confidence &&
    m.matchedTokenCount === top.matchedTokenCount &&
    normalizeKey(m.matchedText) === normalizeKey(top.matchedText))
}

function toCandidate(m: ConceptMatch): AmbiguityCandidate {
  return { conceptId: m.conceptId, title: m.title, subject: m.subject, confidence: m.confidence }
}

function unresolvedResult(
  inputs: ConceptUnderstandingInputs,
  reasoning: string[],
): ConceptUnderstanding {
  return {
    primaryConceptId: null,
    secondaryConceptIds: [],
    comparisonConceptIds: [],
    currentLessonReferenced: false,
    offTopic: false,
    ambiguityDetected: false,
    ambiguityCandidates: [],
    confidence: METHOD_CONFIDENCE.UNRESOLVED,
    extractionMethod: ExtractionMethod.UNRESOLVED,
    matches: [],
    reasoning: [...reasoning, `Active lesson concept: ${inputs.activeLessonConceptId ?? 'none'}.`],
  }
}

/**
 * Understand the concepts in one student turn.
 *
 * Resolution order:
 *   1. Concepts explicitly named in the message (strongest evidence wins).
 *   2. A back-reference ("explain it again") resolved from supplied context.
 *   3. The active lesson concept, as an explicit last-resort fallback.
 *   4. Unresolved — reported honestly, never guessed.
 */
export function understandConcepts(inputs: ConceptUnderstandingInputs): ConceptUnderstanding {
  const message = inputs.message ?? ''
  const lessonId = inputs.activeLessonConceptId
  const reasoning: string[] = []

  if (message.trim() === '') {
    return unresolvedResult(inputs, ['Empty message — nothing to resolve.'])
  }

  const matches = resolveConceptMatches(message, inputs.index)

  // ── 1. Concepts named in the message ────────────────────────────────────
  if (matches.length > 0) {
    const competing = topCompetingGroup(matches)
    const ambiguityDetected = competing.length > 1
    const primary = matches[0]

    const secondaryConceptIds = matches
      .slice(1)
      .filter(m => !ambiguityDetected || !competing.some(c => c.conceptId === m.conceptId))
      .map(m => m.conceptId)

    const distinctIds = Array.from(new Set(matches.map(m => m.conceptId)))
    const isComparison = COMPARISON_RE.test(message) && distinctIds.length >= 2
    const confidence = ambiguityDetected
      ? Number((primary.confidence * AMBIGUITY_PENALTY).toFixed(4))
      : primary.confidence

    reasoning.push(`Resolved ${matches.length} concept mention(s) from the message text.`)
    reasoning.push(`Primary: ${primary.conceptId} via ${primary.method} on "${primary.matchedText}".`)
    if (ambiguityDetected) {
      reasoning.push(`Ambiguous: ${competing.length} concepts compete for the same span "${primary.matchedText}" — candidates surfaced, confidence reduced by the ambiguity penalty rather than a silent guess.`)
    }
    if (isComparison) {
      reasoning.push(`Comparison framing detected across ${distinctIds.length} concepts.`)
    }

    const currentLessonReferenced = lessonId !== null && matches.some(m => m.conceptId === lessonId)
    const offTopic = lessonId !== null && primary.conceptId !== lessonId
    if (offTopic) reasoning.push(`Off-topic: primary concept differs from the active lesson concept (${lessonId}).`)

    return {
      primaryConceptId: primary.conceptId,
      secondaryConceptIds,
      comparisonConceptIds: isComparison ? distinctIds : [],
      currentLessonReferenced,
      offTopic,
      ambiguityDetected,
      ambiguityCandidates: ambiguityDetected ? competing.map(toCandidate) : [],
      confidence,
      extractionMethod: primary.method,
      matches,
      reasoning,
    }
  }

  // ── 2. Back-reference resolved from supplied context ────────────────────
  const previousConceptId = inputs.context?.previousConceptId ?? null
  if (previousConceptId && BACK_REFERENCE_RE.test(message)) {
    const known = inputs.index.find(e => e.conceptId === previousConceptId)
    reasoning.push('No concept named; the message refers back to the previous turn.')
    reasoning.push(`Resolved from supplied conversation context to ${previousConceptId} (context is read, never stored).`)
    const offTopic = lessonId !== null && previousConceptId !== lessonId
    return {
      primaryConceptId: previousConceptId,
      secondaryConceptIds: [],
      comparisonConceptIds: [],
      currentLessonReferenced: lessonId !== null && previousConceptId === lessonId,
      offTopic,
      ambiguityDetected: false,
      ambiguityCandidates: [],
      confidence: METHOD_CONFIDENCE.CONVERSATION_REFERENCE,
      extractionMethod: ExtractionMethod.CONVERSATION_REFERENCE,
      matches: known
        ? [{
            conceptId: known.conceptId, title: known.title, subject: known.subject,
            method: ExtractionMethod.CONVERSATION_REFERENCE,
            confidence: METHOD_CONFIDENCE.CONVERSATION_REFERENCE,
            matchedText: '(back-reference)', matchedTokenCount: 0,
          }]
        : [],
      reasoning,
    }
  }

  // ── 3. Active lesson fallback ───────────────────────────────────────────
  if (lessonId) {
    reasoning.push('No concept named and no resolvable back-reference — falling back to the active lesson concept.')
    reasoning.push('This fallback is explicit and low-confidence by design: it is the assumption the lesson-locked runtime made silently for every turn.')
    return {
      primaryConceptId: lessonId,
      secondaryConceptIds: [],
      comparisonConceptIds: [],
      currentLessonReferenced: true,
      offTopic: false,
      ambiguityDetected: false,
      ambiguityCandidates: [],
      confidence: METHOD_CONFIDENCE.LESSON_CONTEXT,
      extractionMethod: ExtractionMethod.LESSON_CONTEXT,
      matches: [],
      reasoning,
    }
  }

  // ── 4. Unresolved ───────────────────────────────────────────────────────
  return unresolvedResult(inputs, ['No concept named, no resolvable back-reference, and no active lesson.'])
}
