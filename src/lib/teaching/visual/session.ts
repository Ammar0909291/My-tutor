/**
 * Visual continuity — the active visualization session.
 *
 * THE BUG THIS EXISTS TO KILL (observed in production):
 *
 *   Tutor:   "What tells us the magnitude?"          [vector figure on screen]
 *   Student: "The starting point."
 *   → the visual switched from the 3D Vector visualization to Geometry Shapes.
 *
 * The student was ANSWERING A QUESTION ABOUT VECTORS. They were not requesting
 * a lesson on points. But per-turn concept resolution re-ran on their reply,
 * matched the KG title "Point", and swapped the figure mid-explanation — while
 * the tutor was still correcting a misconception about the vector.
 *
 * A visualization is not a per-turn output. It is a STANDING TEACHING SURFACE
 * that persists across turns until the topic genuinely changes. This module
 * holds that surface steady.
 *
 * THE CONTINUITY LAW: once a visualization is active, it stays until the
 * learner EXPLICITLY asks for something else, EXPLICITLY asks to go back, or
 * the lesson itself changes underneath it. An incidental concept mention inside
 * an answer, a follow-up question, or a correction NEVER switches the figure.
 *
 * Pure data + pure predicates. No LLM, no I/O.
 */

import type { Representation, RendererKind } from './types'

/** The standing visualization surface, persisted in contextSnapshot. */
export interface VisualSession {
  /** The concept the on-screen figure depicts. */
  conceptId: string
  /** Its teaching-language representation. */
  representation: Representation
  /** Which renderer is drawing it. */
  renderer: RendererKind
  /**
   * The lesson concept to return to once an excursion finishes, or null when
   * the active visual IS the lesson's own concept (no excursion in progress).
   */
  returnToConceptId: string | null
  /** Turns this figure has been continuously on screen (safety valve). */
  turns: number
}

/**
 * Hard ceiling on a single excursion. Not a teaching rule — a safety valve, so
 * a missed return signal can never strand a learner on the wrong figure for a
 * whole session.
 */
export const MAX_EXCURSION_TURNS = 40

// ── request detection ────────────────────────────────────────────────────────
// A concept only takes over the screen when the learner ASKS for it. These
// patterns are the difference between "teach me vectors" (a request) and
// "the starting point" (an answer). Deterministic, no scoring, no model.

const TOPIC_REQUEST_RE =
  /\b(teach|show|explain|describe|demonstrate|illustrate|draw|visuali[sz]e|what\s+(?:is|are|was|were)|what'?s|tell\s+me\s+about|help\s+me\s+(?:with|understand)|move\s+on\s+to|switch\s+to|change\s+to|let'?s\s+(?:do|try|learn|study)|now\s+(?:do|teach|explain)|i\s+want\s+to\s+learn|can\s+you\s+(?:teach|show|explain))\b/i

const RETURN_REQUEST_RE =
  /\b(back\s+to|go\s+back|return\s+to|resume|carry\s+on\s+with|continue\s+(?:with|the\s+lesson)|finish\s+the\s+lesson|done\s+with\s+(?:this|that)|got\s+it,?\s+(?:back|continue)|let'?s\s+get\s+back)\b/i

/**
 * Did the learner actually ASK to be taught something? Only a true here may
 * move the visualization to a different concept.
 */
export function isExplicitTopicRequest(message: string): boolean {
  return TOPIC_REQUEST_RE.test(message ?? '')
}

/** Did the learner ask to go back to what they were doing before? */
export function isReturnRequest(message: string): boolean {
  return RETURN_REQUEST_RE.test(message ?? '')
}

/**
 * Is this message a reply to the tutor rather than a new request?
 *
 * Short, verb-less messages arriving straight after a tutor question are
 * answers — the single most common turn in a real lesson, and the exact shape
 * that caused the production switch. Treated conservatively: when in doubt,
 * HOLD the current figure. Showing the right figure for one turn too long is a
 * far smaller failure than swapping it mid-correction.
 */
export function looksLikeAnswer(message: string, lastAssistantAskedQuestion: boolean): boolean {
  const text = (message ?? '').trim()
  if (!text) return true
  if (isExplicitTopicRequest(text) || isReturnRequest(text)) return false
  if (!lastAssistantAskedQuestion) return false
  // A reply to a question, with no request of its own, in few words.
  return text.split(/\s+/).length <= 12
}

// ── session transitions ──────────────────────────────────────────────────────

export type ContinuityAction =
  /** Keep the on-screen figure exactly as it is. */
  | { kind: 'hold'; session: VisualSession; reason: string }
  /** Resolve a new figure for this concept, ending any excursion. */
  | { kind: 'switch'; targetConceptId: string | null; reason: string }

/**
 * Decide whether the active visualization survives this turn.
 *
 * Ordered, deterministic, and biased toward holding. Every branch names itself
 * so the reason lands in the logs alongside the decision.
 */
export function decideContinuity(input: {
  session: VisualSession | null
  message: string
  lessonConceptId: string | null
  requestedConceptId: string | null
  lastAssistantAskedQuestion: boolean
}): ContinuityAction {
  const { session, message, lessonConceptId, requestedConceptId, lastAssistantAskedQuestion } = input

  // Nothing on screen yet — resolve freshly.
  if (!session) return { kind: 'switch', targetConceptId: requestedConceptId ?? lessonConceptId, reason: 'no-active-session' }

  // The lesson itself moved on (learner navigated to a different lesson). The
  // excursion's anchor no longer exists, so the surface is stale.
  if (
    lessonConceptId &&
    session.returnToConceptId &&
    lessonConceptId !== session.returnToConceptId &&
    lessonConceptId !== session.conceptId
  ) {
    return { kind: 'switch', targetConceptId: lessonConceptId, reason: 'lesson-changed' }
  }

  // Safety valve.
  if (session.turns >= MAX_EXCURSION_TURNS) {
    return { kind: 'switch', targetConceptId: lessonConceptId, reason: 'excursion-turn-limit' }
  }

  // The learner asked to go back.
  if (isReturnRequest(message)) {
    return {
      kind: 'switch',
      targetConceptId: session.returnToConceptId ?? lessonConceptId,
      reason: 'learner-requested-return',
    }
  }

  // The learner is answering the tutor, not asking for a new topic. THE FIX.
  if (looksLikeAnswer(message, lastAssistantAskedQuestion)) {
    return { kind: 'hold', session, reason: 'learner-answering-not-requesting' }
  }

  // A different concept may take the screen ONLY on an explicit request.
  if (requestedConceptId && requestedConceptId !== session.conceptId && isExplicitTopicRequest(message)) {
    return { kind: 'switch', targetConceptId: requestedConceptId, reason: 'explicit-new-topic-request' }
  }

  // Everything else — follow-ups, corrections, "why?", "I don't get it",
  // incidental concept mentions — keeps the current figure on screen.
  return { kind: 'hold', session, reason: 'continuity' }
}

/** Advance the turn counter on a held session. */
export function tickSession(session: VisualSession): VisualSession {
  return { ...session, turns: session.turns + 1 }
}

/** Narrow unknown JSONB back into a VisualSession, or null. */
export function parseVisualSession(raw: unknown): VisualSession | null {
  if (!raw || typeof raw !== 'object') return null
  const v = raw as Record<string, unknown>
  if (typeof v.conceptId !== 'string' || !v.conceptId) return null
  if (typeof v.representation !== 'string') return null
  if (typeof v.renderer !== 'string') return null
  return {
    conceptId: v.conceptId,
    representation: v.representation as Representation,
    renderer: v.renderer as RendererKind,
    returnToConceptId: typeof v.returnToConceptId === 'string' ? v.returnToConceptId : null,
    turns: typeof v.turns === 'number' && Number.isFinite(v.turns) ? v.turns : 0,
  }
}
