/**
 * Concept Understanding Engine — the canonical contract.
 *
 * NAMING. This repo already has a "Conversation Understanding Engine (CUE)"
 * at `src/lib/understanding/`. That subsystem understands the CONVERSATION
 * (affect, phase, placement, misconceptions). This one understands WHICH
 * CONCEPT the student is talking about. To avoid an ambiguous acronym, this
 * module is referred to by name — "Concept Understanding" — never as "CUE".
 * They are complementary: Conversation Understanding runs first and supplies
 * the context this engine reads.
 *
 * Everything here is data + enums. Behaviour lives in
 * `conceptUnderstandingEngine.ts`; resolution lives in `conceptIndex.ts`.
 */

// ── How a concept was identified ──────────────────────────────────────────

/** The evidence class behind a match. Ordered strongest-first in
 *  METHOD_CONFIDENCE below — the ranking is part of the contract. */
export const ExtractionMethod = {
  /** The message contained a literal canonical KG concept id. */
  CONCEPT_ID: 'CONCEPT_ID',
  /** The message contained the concept's exact KG title. */
  EXACT_TITLE: 'EXACT_TITLE',
  /** The message matched a registered alias for the concept. */
  ALIAS: 'ALIAS',
  /** Matched after normalization (case, punctuation, possessives, plurals). */
  NORMALIZED_TITLE: 'NORMALIZED_TITLE',
  /** Matched an uppercase acronym derived from a multi-word title. */
  ACRONYM: 'ACRONYM',
  /** No concept named; resolved from the conversation context supplied. */
  CONVERSATION_REFERENCE: 'CONVERSATION_REFERENCE',
  /** No concept named and no back-reference; fell back to the active lesson. */
  LESSON_CONTEXT: 'LESSON_CONTEXT',
  /** Nothing could be resolved. */
  UNRESOLVED: 'UNRESOLVED',
} as const
export type ExtractionMethod = (typeof ExtractionMethod)[keyof typeof ExtractionMethod]

/** Confidence attached to each extraction method. Deterministic constants,
 *  never computed at runtime — two identical matches always score identically. */
export const METHOD_CONFIDENCE: Readonly<Record<ExtractionMethod, number>> = {
  CONCEPT_ID: 1.0,
  EXACT_TITLE: 0.95,
  ALIAS: 0.9,
  NORMALIZED_TITLE: 0.85,
  ACRONYM: 0.7,
  CONVERSATION_REFERENCE: 0.6,
  LESSON_CONTEXT: 0.5,
  UNRESOLVED: 0,
}

// ── Index shapes ──────────────────────────────────────────────────────────

/** One concept, as the resolver sees it. Built from KG nodes — this engine
 *  never invents concept ids. */
export interface ConceptIndexEntry {
  conceptId: string
  title: string
  subject: string
  /** Additional surface forms that should resolve to this concept. */
  aliases?: readonly string[]
}

/** A single resolved mention of a concept in the message. */
export interface ConceptMatch {
  conceptId: string
  title: string
  subject: string
  method: ExtractionMethod
  confidence: number
  /** The literal text span that produced this match, for provenance. */
  matchedText: string
  /** Token length of the matched span — longer spans are more specific. */
  matchedTokenCount: number
}

// ── Engine inputs ─────────────────────────────────────────────────────────

/**
 * Conversation context, READ ONLY. This engine does not own, store, or
 * mutate conversation memory — the caller supplies what it already knows.
 */
export interface ConceptConversationContext {
  /** The concept the previous turn actually addressed, if any. */
  previousConceptId?: string | null
  /** Concepts referenced earlier this session, most recent first. */
  recentConceptIds?: readonly string[]
}

export interface ConceptUnderstandingInputs {
  message: string
  /** The concept the active lesson is teaching, or null. */
  activeLessonConceptId: string | null
  /** The searchable concept index (see `conceptIndex.ts`). */
  index: readonly ConceptIndexEntry[]
  context?: ConceptConversationContext
}

// ── Output ────────────────────────────────────────────────────────────────

/** A competing interpretation the engine deliberately did NOT silently
 *  discard. Populated when `ambiguityDetected` is true. */
export interface AmbiguityCandidate {
  conceptId: string
  title: string
  subject: string
  confidence: number
}

export interface ConceptUnderstanding {
  /** The concept this turn is most likely about. Null when unresolved. */
  primaryConceptId: string | null
  /** Other concepts genuinely mentioned, ranked, excluding the primary. */
  secondaryConceptIds: readonly string[]
  /** Populated only when the message compares two or more concepts.
   *  Includes the primary; ordered as ranked. */
  comparisonConceptIds: readonly string[]
  /** True when the message refers to the active lesson's own concept. */
  currentLessonReferenced: boolean
  /** True when the primary concept is NOT the active lesson's concept.
   *  False when no lesson is active — you cannot be off a topic you are
   *  not on. */
  offTopic: boolean
  /** True when two or more concepts compete for the SAME text span. */
  ambiguityDetected: boolean
  /** The competing readings, primary first. Empty when unambiguous. */
  ambiguityCandidates: readonly AmbiguityCandidate[]
  /** 0..1 confidence in `primaryConceptId`. */
  confidence: number
  /** How the primary was identified. */
  extractionMethod: ExtractionMethod
  /** Every match found, ranked. Provenance for the decision above. */
  matches: readonly ConceptMatch[]
  /** Human-readable trace — an unexplainable decision is an invented one. */
  reasoning: readonly string[]
}
