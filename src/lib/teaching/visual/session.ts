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
  /**
   * The topic's own words, for a figure of something the curriculum does not
   * contain.
   *
   * A KG figure is restored by RE-DERIVING it: `resolveVisual` is deterministic,
   * so the concept id alone is enough and the payload never needs storing. A
   * runtime topic has no curriculum entry to re-derive from, and its id is a
   * hash of its title — which cannot be turned back into words. Without this,
   * a generated figure survived every follow-up turn and then vanished on
   * refresh, mid-explanation, with the tutor still talking about it.
   *
   * Present ONLY for runtime topics. It is not trusted on sight: the id is
   * re-derived from this title and must match, so a hand-edited snapshot cannot
   * attach an arbitrary description to a cached figure.
   */
  topic?: { title: string; description: string }
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

/**
 * QUESTION FORMS — weaker than a request to be taught, and deliberately kept
 * separate from it.
 *
 * A 40-topic production run showed six ordinary phrasings were invisible to
 * TOPIC_REQUEST_RE: "What happens during electrolysis?", "Why does light bend
 * when it enters water?", "How does a catalyst work?", "What causes friction?"
 * and friends. Every guard built on "did the learner name a topic" was
 * therefore skipped for them — including the one that stops the LESSON's
 * figure being served for somebody else's topic.
 *
 * WHY THEY ARE NOT SIMPLY ADDED TO THE LIST ABOVE. Measured: doing that broke
 * `visualSessionRestore` — "why does temperature change it?", a follow-up
 * ABOUT the viscosity figure on screen, became a topic request and released
 * the figure the learner was reading. The strong forms mean "teach me
 * something"; these mean "I have a question", and a question is very often
 * about what is already in front of them.
 *
 * So: these NEVER move the teaching target and NEVER evict a figure. They are
 * consulted only where the question is whether a NEW figure may claim to be
 * what the learner asked about.
 *
 * Each requires something to follow the verb, so "Why?", "Why is that?",
 * "How come?" and "why not?" stay out; and each matches as a LOOKAHEAD past
 * the verb, so the topic's own first word is never consumed.
 */
const QUESTION_FORM_RE =
  /\b(?:what\s+happens\s+(?:to|during|when|if|in|after)\s+|what\s+causes\s+|why\s+(?:does|do|did|is|are|was|were)\s+(?!(?:that|this|it|there|they|he|she|we|you)\b)|how\s+(?:does|do|did)\s+(?!(?:that|this|it|they|we|you)\b))/i

/**
 * Did the learner ask a QUESTION ABOUT a topic, in the weaker sense above?
 * True for the strong request forms too, so callers get one answer.
 */
export function isTopicQuestion(message: string): boolean {
  return TOPIC_REQUEST_RE.test(message ?? '') || QUESTION_FORM_RE.test(message ?? '')
}

/** The question phrase and where it ends — the weak family's counterpart. */
export function matchTopicQuestion(message: string): { phrase: string; end: number } | null {
  const strong = matchTopicRequest(message ?? '')
  if (strong) return strong
  const m = QUESTION_FORM_RE.exec(message ?? '')
  return m ? { phrase: m[0], end: m.index + m[0].length } : null
}

const RETURN_REQUEST_RE =
  /\b(back\s+to|go\s+back|return\s+to|resume|carry\s+on\s+with|continue\s+(?:with|the\s+lesson)|finish\s+the\s+lesson|done\s+with\s+(?:this|that)|got\s+it,?\s+(?:back|continue)|let'?s\s+get\s+back)\b/i

/**
 * Did the learner actually ASK to be taught something? Only a true here may
 * move the visualization to a different concept.
 */
export function isExplicitTopicRequest(message: string): boolean {
  return TOPIC_REQUEST_RE.test(message ?? '')
}

/**
 * The request phrase itself — "explain", "teach me", "what is" — and where it
 * ends.
 *
 * Exported so that naming the requested TOPIC uses the same rule that decides
 * a request happened at all. Two rules would eventually disagree about what a
 * request is, and then the engine could name a topic from an utterance it does
 * not consider a request, or refuse to name one from an utterance it does.
 */
export function matchTopicRequest(message: string): { phrase: string; end: number } | null {
  const m = TOPIC_REQUEST_RE.exec(message ?? '')
  return m ? { phrase: m[0], end: m.index + m[0].length } : null
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
  /** True when the turn is an explicit visual request ("show me a graph"). */
  visualRequested?: boolean
  /**
   * True when the learner named a topic that shares no vocabulary with the
   * figure currently on screen — see `requestLeavesActiveFigure`.
   *
   * Passed in rather than computed here for two reasons. This module is pure
   * predicates over its inputs and knows nothing of the Knowledge Graph, and
   * the words of the on-screen figure live with the caller; and naming a topic
   * is already defined once, in `requestedTopic`, which imports from this file
   * — deriving it here would close that loop.
   */
  requestLeftActiveFigure?: boolean
}): ContinuityAction {
  const { session, message, lessonConceptId, requestedConceptId, lastAssistantAskedQuestion } = input

  // Nothing on screen yet — resolve freshly.
  if (!session) return { kind: 'switch', targetConceptId: requestedConceptId ?? lessonConceptId, reason: 'no-active-session' }

  // The lesson itself moved on (learner navigated to a different lesson), so
  // the figure on screen belongs to a lesson nobody is in any more.
  //
  // This used to require `session.returnToConceptId`, which quietly limited it
  // to EXCURSION figures. An anchor is only set when a figure is introduced for
  // a concept that is NOT the lesson's own (see resolveVisual: "an excursion
  // begins when the new figure is NOT the lesson's own concept"), so a plain
  // LESSON figure has none — and when the lesson moved on, nothing released it.
  //
  // PRODUCTION DEFECT this fixes (measured 2026-08-16, real learner account):
  // the learner left `chem.found.states-of-matter` for
  // `chem.found.pure-substances` and the States-of-Matter process flow stayed
  // on screen for every turn of the new lesson —
  //   [visual-v2] concept: 'chem.found.states-of-matter'
  //               provenance: 'generated:chem.found.states-of-matter:cached'
  //               continuity: 'continuity'
  // while `resolvedConceptId` was `chem.found.pure-substances`. It reached the
  // catch-all hold at the bottom of this function, which exists for follow-ups
  // and corrections, not for a lesson change. The tutor narrates whatever is on
  // screen ("Let's look at the figure on your screen showing…"), so this is the
  // same mis-narration failure the two defects recorded below already describe,
  // arriving by a third route.
  //
  // Testing the anchor by VALUE rather than existence keeps every excursion
  // case identical: an open excursion anchored to the current lesson still
  // holds (its returnTo IS lessonConceptId), and an excursion whose lesson
  // changed underneath it still releases, exactly as before.
  if (
    lessonConceptId &&
    lessonConceptId !== session.conceptId &&
    lessonConceptId !== session.returnToConceptId
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

  // A visual request that names NO concept means "draw what we are studying".
  //
  // PRODUCTION DEFECT this fixes (observed 17:42:23Z, session cmsj5569t): the
  // learner was in a Calorimetry lesson with a vector excursion still open
  // from three turns earlier, typed "Show me graph", and the screen kept the
  // 3D vector figure — heldTurns 2 — while the tutor talked about thermal
  // exchange. Three things disagreed at once: the request, the figure and the
  // lesson.
  //
  // Cause: once medium words stopped resolving to concepts (they used to
  // hijack to graph THEORY), `requestedConceptId` for "show me a graph" is
  // correctly null — and a null request fell through to the catch-all hold,
  // which silently extended an unrelated excursion. Asking for a picture is
  // an ACTIVE request, not a passive turn: it targets the lesson, and it ends
  // the excursion. Only fires when the figure is actually somewhere else, so
  // a request while already on the lesson concept still holds.
  if (
    input.visualRequested &&
    !requestedConceptId &&
    lessonConceptId &&
    session.conceptId !== lessonConceptId
  ) {
    return { kind: 'switch', targetConceptId: lessonConceptId, reason: 'visual-request-returns-to-lesson' }
  }

  // THE LEARNER ASKED ABOUT SOMETHING THIS FIGURE IS NOT.
  //
  // The switch branch above can only fire when the curriculum can NAME what
  // they asked for. When it cannot — "What are SI units and why do we need
  // them?" sits below the excursion confidence floor — the turn used to fall
  // into the catch-all hold below and keep an unrelated figure on screen,
  // which the tutor then narrated as though it depicted the new topic.
  // Measured in production: a kinetic-energy graph explained, over three
  // consecutive turns, as a figure about base units.
  //
  // A hold is for follow-ups, answers and corrections. A request to be taught
  // a different subject is none of those, so the figure is RELEASED — to the
  // concept they named if one is known, and otherwise to nothing at all. An
  // empty screen with a correct explanation is this engine's preferred
  // outcome; a confidently mis-narrated figure is the failure it exists to
  // prevent.
  if (input.requestLeftActiveFigure) {
    return {
      kind: 'switch',
      targetConceptId: requestedConceptId,
      reason: 'named-topic-left-the-figure',
    }
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
    // Clamped at 0: a negative count (corrupt snapshot, hand-edited row) would
    // push the MAX_EXCURSION_TURNS safety valve further away instead of nearer.
    turns:
      typeof v.turns === 'number' && Number.isFinite(v.turns) && v.turns > 0
        ? Math.floor(v.turns)
        : 0,
    ...parseTopic(v.topic),
  }
}

/** The runtime topic's words, when the snapshot carries a usable pair. */
function parseTopic(raw: unknown): { topic?: { title: string; description: string } } {
  if (!raw || typeof raw !== 'object') return {}
  const t = raw as Record<string, unknown>
  if (typeof t.title !== 'string' || !t.title.trim()) return {}
  if (typeof t.description !== 'string' || !t.description.trim()) return {}
  return { topic: { title: t.title, description: t.description } }
}
