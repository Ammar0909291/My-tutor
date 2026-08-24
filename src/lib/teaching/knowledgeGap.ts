/**
 * KNOWLEDGE GAP — the learner named a concept they are missing. Phase 4.
 *
 * ── THE DEFECT THIS EXISTS FOR ──────────────────────────────────────────────
 * MEASURED against the real modules, chemistry, lesson `chem.found.pure-substances`:
 *
 *     "I don't know enough about the mole concept"
 *       readTurnIntent -> failureState: 'dont_know'    ... and NOTHING else.
 *
 * `TurnIntent` keeps the PREDICATE ("don't know") and drops the OBJECT ("the
 * mole concept"). Everything downstream then behaves correctly on what it was
 * given, and the outcome is wrong at every step:
 *
 *   CUE classifies RECOVERY
 *   -> route.ts folds a SYNTHETIC FAILURE into the episode
 *        { correctness: false, confusion: true }
 *      so `visibleFailures` rises and TWO such turns reach CLOSING
 *      (ONE in lesson one)
 *   -> `sessionFailureCount++`
 *   -> a MistakeRecord is written against the LESSON concept — a weakness
 *      recorded for a concept the learner never claimed to be weak at
 *
 * A learner reporting an absent foundation is not in distress and has not
 * failed. They have told the tutor precisely what to teach next, and the
 * runtime spends their affect budget for saying so.
 *
 * This is the Phase 1 defect class one level deeper: Phase 1 made the message
 * be read ONCE. It did not make the reading KEEP what it read.
 *
 * ── WHY THIS MODULE HOLDS NO DETECTOR AND NO REGEX ──────────────────────────
 * Both inputs already exist and are already computed on every turn:
 *
 *   · `isDontKnowSignal` (recoveryGuard) — the EXISTING partition separating
 *     the explain-me family {dont_know, dont_understand, confused} from the
 *     affective family {give_up, stupid, scared, too_hard, cant, frustrated}.
 *     Its own docblock names it "the SINGLE owner" of that membership.
 *
 *   · `resolveRequestedConceptId` (concept/requestedConcept) — a deterministic,
 *     confidence-floored resolver that returns null rather than guessing.
 *     MEASURED: it does NOT need a request frame; it scans the whole message.
 *         "I don't know enough about the mole concept" -> chem.found.mole-concept
 *         "I need to learn the mole concept first"     -> chem.found.mole-concept
 *         "I don't know what the mole concept means"   -> chem.found.mole-concept
 *         "I don't know" / "I don't understand"        -> null  (nothing named)
 *     The route ALREADY calls it on every turn and already hands the result to
 *     `decideExcursion`. Nothing new is read; a question is simply asked that
 *     was never asked before.
 *
 * So this module classifies. It does not detect, and it must never grow a
 * pattern list — see the SCOPE note below for the case that is deliberately
 * left unsolved rather than solved with one.
 *
 * ── SCOPE: RESOLVED GAPS ONLY, AND THAT IS A REAL LIMIT ─────────────────────
 * The resolver matches near-full concept titles and is deliberately strict —
 * loosening it produced the L1 qualifier defect ("thermal conductivity" served
 * as electrical resistivity). MEASURED, it returns null for "atoms",
 * "compounds", "moles", "periodic table", "chemical equilibrium" and for
 * "compound structures".
 *
 * So a learner who names something the KG cannot title gets EXACTLY today's
 * behaviour: a recovery turn that spends the affect budget. That case is NOT
 * solved here, is not papered over, and is not worth guessing a concept for —
 * a wrong prerequisite is worse than none. Carrying an unresolvable name needs
 * a gap-frame extension to the existing topic extractor, which is a separate,
 * owner-approved scope (Phase 5).
 *
 * Pure. Total. No I/O, no regex, no model calls.
 */
import { isDontKnowSignal, type FailureStateKey } from './recoveryGuard'

/**
 * How the named concept stands to the lesson in progress.
 *
 * Read from the KG's own `prerequisites` array — never inferred, never walked
 * transitively. One hop, because that is the only claim the data supports
 * directly: a deeper search would start ranking ancestors, and an invented
 * ranking is how a detour ends up teaching the wrong thing.
 */
export type GapRelationship =
  /** The KG lists the named concept as a direct prerequisite of the lesson. */
  | 'prerequisite'
  /** A real KG concept, but not a listed prerequisite of this lesson. */
  | 'related'

export interface KnowledgeGap {
  /** The concept the learner named, as the KG names it. Never invented. */
  conceptId: string
  /** Its standing relative to the lesson (see GapRelationship). */
  relationship: GapRelationship
  /** The failure state that carried it — kept for telemetry and provenance. */
  signal: FailureStateKey
}

export interface KnowledgeGapInput {
  /** recoveryGuard's reading of this turn (route's `recoveryKey`). */
  failureState: FailureStateKey | null
  /**
   * What `resolveRequestedConceptId` returned for this message.
   *
   * THE CALLER'S CONTRACT, and it matters: pass the resolver's output
   * unmodified. This module must not be handed a "best guess" — the resolver's
   * null IS the answer whenever the learner named nothing the curriculum can
   * title, and substituting anything for it reintroduces exactly the defect
   * class the resolver's strictness exists to prevent.
   */
  resolvedConceptId: string | null
  /** The lesson in progress. */
  lessonConceptId: string | null
  /** `KGNode.prerequisites` for the lesson concept, or null when unavailable. */
  lessonPrerequisites: readonly string[] | null
}

/**
 * Is this turn a learner reporting a missing concept, rather than distress?
 *
 * Returns null for everything else — including a bare "I don't know", which
 * names nothing and stays exactly what it is today.
 */
export function classifyKnowledgeGap(input: KnowledgeGapInput): KnowledgeGap | null {
  const { failureState, resolvedConceptId, lessonConceptId } = input
  // An explain-me signal, not an affective one. The partition is not restated
  // here; it is asked of its owner.
  if (!isDontKnowSignal(failureState)) return null
  if (!resolvedConceptId) return null
  // Naming the concept you are already being taught is not a gap — it is the
  // ordinary "I don't understand THIS" that recovery already handles well.
  // Treating it as a gap would open a detour from a concept to itself.
  if (lessonConceptId && resolvedConceptId === lessonConceptId) return null

  const prerequisites = input.lessonPrerequisites ?? []
  return {
    conceptId: resolvedConceptId,
    relationship: prerequisites.includes(resolvedConceptId) ? 'prerequisite' : 'related',
    // Non-null by construction: isDontKnowSignal rejected null above.
    signal: failureState as FailureStateKey,
  }
}
