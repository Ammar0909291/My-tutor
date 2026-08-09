/**
 * OFF-LESSON CONCEPT EXCURSION — the Teaching Engine's lifecycle.
 *
 * THE FAILURE THIS EXISTS TO KILL (production, physics):
 *
 *   lesson:   "SI Units and Measurement"          (phys.meas.units)
 *   learner:  "explain Viscosity diagram"
 *   tutor:    talked about viscosity, showed nothing, then
 *             "now, back to SI Units and Measurement…"
 *
 * A real teacher takes the question, teaches it properly, checks the learner is
 * satisfied, and THEN walks back to the lesson. The runtime could not, because
 * a turn had exactly one concept identity — the lesson's — and every prompt
 * block was keyed to it.
 *
 * There are now two identities, and this module owns the boundary between them:
 *
 *   lessonConceptId  — the curriculum lesson in progress. Owns PROGRESS.
 *                      Never changed by anything here.
 *   targetConceptId  — the concept being taught right now. Owns TEACHING.
 *
 * WHAT AN EXCURSION MAY NEVER DO: advance StudentProgress.currentLesson, move
 * activeLessonSlug, write TopicProgress, or earn mastery for the lesson. It is
 * a teaching detour, not a curriculum event — this module returns state and a
 * prompt block and writes nothing at all.
 *
 * NO NESTING, EVER. A second off-lesson question during an excursion REPLACES
 * the target and keeps the original `returnToConceptId`, so the way back is
 * always one step and always the real lesson:
 *
 *   SI Units → Viscosity → Surface Tension → SI Units
 *
 * Pure data + pure predicates. No LLM, no I/O, no database.
 */

import { isExplicitTopicRequest, isReturnRequest, looksLikeAnswer, MAX_EXCURSION_TURNS } from './visual/session'

export { MAX_EXCURSION_TURNS }

/** The standing excursion, persisted in contextSnapshot.excursion. */
export interface ExcursionState {
  active: boolean
  /** The concept being taught while the excursion runs. */
  targetConceptId: string | null
  /** The lesson concept owed a return. Set once, at the start, never nested. */
  returnToConceptId: string | null
  /** Turns this excursion has been open (safety valve). */
  turns: number
}

export const NO_EXCURSION: ExcursionState = {
  active: false,
  targetConceptId: null,
  returnToConceptId: null,
  turns: 0,
}

/** Why the state moved. Logged, and used by the prompt block. */
export type ExcursionTransition =
  | 'none'                   // no excursion, none started
  | 'started'                // an off-lesson concept was requested
  | 'switched'               // a DIFFERENT off-lesson concept replaced the target
  | 'continued'              // the excursion is still running (doubt, follow-up)
  | 'closed-returned'        // the learner asked to go back
  | 'closed-satisfied'       // the learner signalled they are done
  | 'closed-on-lesson'       // the learner asked for the lesson's own concept
  | 'closed-lesson-changed'  // the lesson moved underneath the excursion
  | 'closed-turn-limit'      // safety valve

export interface ExcursionDecision {
  /** The state to persist for the next turn. */
  state: ExcursionState
  /** The concept this turn should TEACH. Never null when a lesson exists. */
  targetConceptId: string | null
  /** The lesson owed a return, while the excursion is open. */
  returnToConceptId: string | null
  transition: ExcursionTransition
  /** True when the excursion ended on THIS turn — the return turn. */
  justClosed: boolean
}

// ── satisfaction ─────────────────────────────────────────────────────────────
//
// The learner says they are done. This is what makes "no special command"
// possible: natural language closes the excursion, not "end excursion".
//
// Deliberately NARROW. Closing early only costs the learner one extra request
// to reopen; closing on a DOUBT would strand them back in the lesson holding an
// unanswered question, which is the failure this whole module exists to fix —
// so any doubt signal wins outright below.

const SATISFIED_RE =
  /\b(got\s+it|understood|makes\s+sense|that'?s\s+clear|all\s+clear|crystal\s+clear|no\s+doubts?|no\s+questions?|no\s+more\s+doubts?|i'?m\s+good|im\s+good|that\s+helps|thanks|thank\s+you|clear\s+now|understand\s+now)\b/i

const DOUBT_RE =
  /\b(don'?t\s+understand|do\s+not\s+understand|not\s+clear|unclear|confused|i'?m\s+lost|im\s+lost|no\s+idea|why\b|how\b|what\s+about|explain\s+again|one\s+more|still\b|but\b|doubt|question)\b/i

/**
 * Did the learner signal they are finished with the excursion topic?
 *
 * A doubt anywhere in the message vetoes it: "got it, but why does the
 * gradient matter?" is a doubt wearing an acknowledgement's clothes.
 */
export function isSatisfactionSignal(message: string): boolean {
  const text = (message ?? '').trim()
  if (!text) return false
  if (text.includes('?')) return false
  if (DOUBT_RE.test(text)) return false
  // A long message carries real content — it is teaching material, not a
  // sign-off, even when it happens to contain "thanks".
  if (text.split(/\s+/).length > 12) return false
  return SATISFIED_RE.test(text)
}

export interface ExcursionInput {
  /** The excursion carried in from the previous turn. */
  state: ExcursionState
  /** The learner's raw message this turn. */
  message: string
  /** The curriculum lesson's concept. NEVER modified by this module. */
  lessonConceptId: string | null
  /** The concept the learner explicitly named, from requestedConcept.ts. */
  requestedConceptId: string | null
  /** Whether the tutor's previous turn ended in a question. */
  lastAssistantAskedQuestion: boolean
}

/**
 * Decide this turn's teaching target and the excursion's next state.
 *
 * Ordered and deterministic. The order IS the design: a return beats a
 * satisfaction signal, satisfaction beats the answer-hold, and the answer-hold
 * beats starting anything new — so a reply to the tutor's own question can
 * never be mistaken for a request to leave the lesson.
 */
export function decideExcursion(input: ExcursionInput): ExcursionDecision {
  const { state, message, lessonConceptId, requestedConceptId } = input
  const active = state.active && state.targetConceptId !== null

  const closed = (transition: ExcursionTransition): ExcursionDecision => ({
    state: NO_EXCURSION,
    targetConceptId: lessonConceptId,
    returnToConceptId: null,
    transition,
    justClosed: active,
  })

  // No lesson at all (free chat / Library browsing): there is nothing to
  // excurse FROM, so a named concept is simply the topic.
  if (!lessonConceptId) {
    return {
      state: NO_EXCURSION,
      targetConceptId: requestedConceptId,
      returnToConceptId: null,
      transition: 'none',
      justClosed: false,
    }
  }

  // The lesson moved underneath us (the learner navigated elsewhere). The
  // anchor the excursion owed a return to no longer exists.
  if (active && state.returnToConceptId && state.returnToConceptId !== lessonConceptId) {
    return closed('closed-lesson-changed')
  }

  // Safety valve — a missed close can never strand a learner off-lesson.
  if (active && state.turns >= MAX_EXCURSION_TURNS) return closed('closed-turn-limit')

  // The learner asked to go back, in their own words.
  if (active && isReturnRequest(message)) return closed('closed-returned')

  // The learner said they are done.
  if (active && isSatisfactionSignal(message)) return closed('closed-satisfied')

  // The learner is ANSWERING the tutor, not asking for a new topic. This is the
  // most common turn in a real lesson and must never start an excursion — the
  // same guard the visual layer already applies to the figure.
  if (looksLikeAnswer(message, input.lastAssistantAskedQuestion)) {
    return active ? held(state, 'continued') : none(lessonConceptId)
  }

  // A concept takes over the teaching target ONLY on an explicit request.
  if (requestedConceptId && isExplicitTopicRequest(message)) {
    // They asked for the lesson's own concept — the detour is over.
    if (requestedConceptId === lessonConceptId) {
      return active ? closed('closed-on-lesson') : none(lessonConceptId)
    }
    // NO NESTING: the return anchor is the lesson, whether this is the first
    // off-lesson concept or the fourth.
    return {
      state: {
        active: true,
        targetConceptId: requestedConceptId,
        returnToConceptId: lessonConceptId,
        turns: 0,
      },
      targetConceptId: requestedConceptId,
      returnToConceptId: lessonConceptId,
      transition: active && state.targetConceptId !== requestedConceptId ? 'switched' : 'started',
      justClosed: false,
    }
  }

  // Everything else — follow-ups, doubts, "why?", "I don't get it", a bare
  // "show me a diagram" — stays where the teaching already is.
  return active ? held(state, 'continued') : none(lessonConceptId)
}

function held(state: ExcursionState, transition: ExcursionTransition): ExcursionDecision {
  return {
    state: { ...state, turns: state.turns + 1 },
    targetConceptId: state.targetConceptId,
    returnToConceptId: state.returnToConceptId,
    transition,
    justClosed: false,
  }
}

function none(lessonConceptId: string | null): ExcursionDecision {
  return {
    state: NO_EXCURSION,
    targetConceptId: lessonConceptId,
    returnToConceptId: null,
    transition: 'none',
    justClosed: false,
  }
}

/** Narrow unknown JSONB back into an ExcursionState. */
export function parseExcursionState(raw: unknown): ExcursionState {
  if (!raw || typeof raw !== 'object') return NO_EXCURSION
  const v = raw as Record<string, unknown>
  if (v.active !== true) return NO_EXCURSION
  if (typeof v.targetConceptId !== 'string' || !v.targetConceptId) return NO_EXCURSION
  return {
    active: true,
    targetConceptId: v.targetConceptId,
    returnToConceptId:
      typeof v.returnToConceptId === 'string' && v.returnToConceptId ? v.returnToConceptId : null,
    // Clamped at 0: a negative count (corrupt snapshot, hand-edited row) would
    // push the turn-limit safety valve further away instead of nearer.
    turns:
      typeof v.turns === 'number' && Number.isFinite(v.turns) && v.turns > 0
        ? Math.floor(v.turns)
        : 0,
  }
}

// ── the prompt block ─────────────────────────────────────────────────────────

/**
 * The EXCURSION DIRECTIVE.
 *
 * Deliberately INDEPENDENT of the visual contract. The old excursion wording
 * lived inside `buildVisualContractBlock()`, after its NO-FIGURE early return —
 * so a concept with no authored figure (most of the curriculum) got no
 * excursion guidance at all, which is exactly the case that failed in
 * production. An excursion is a teaching state; it must work with or without a
 * picture.
 *
 * Returns '' when no excursion is running, so callers can append it
 * unconditionally.
 */
export function buildExcursionDirective(input: {
  decision: ExcursionDecision
  /** Human titles, for a prompt the model can actually act on. */
  targetTitle: string | null
  lessonTitle: string | null
}): string {
  const { decision, targetTitle, lessonTitle } = input
  const target = targetTitle ? `"${targetTitle}"` : 'the concept the learner asked about'
  const lesson = lessonTitle ? `"${lessonTitle}"` : 'the current lesson'

  if (decision.justClosed) {
    return (
      '\n\nEXCURSION CLOSED (server-decided): the learner is finished with the ' +
      `side question and this turn RETURNS to the lesson, ${lesson}. Acknowledge ` +
      'the return in one short clause, then continue the lesson from where it ' +
      'was paused. Do NOT re-teach the side concept, do NOT summarise it again, ' +
      'and do NOT restart the lesson from the beginning — it was paused, not lost.'
    )
  }

  if (!decision.state.active) return ''

  const opening =
    decision.transition === 'switched'
      ? `CONCEPT EXCURSION (server-decided): the learner has moved the side question to ${target}. Teach that now.`
      : decision.transition === 'started'
        ? `CONCEPT EXCURSION (server-decided): the learner asked to learn ${target}, which is NOT the current lesson's concept. Take the question — do not refuse it and do not defer it.`
        : `CONCEPT EXCURSION (server-decided, in progress): you are teaching ${target}, which is NOT the current lesson's concept.`

  return (
    `\n\n${opening} ` +
    `THE LESSON ${lesson} IS PAUSED, NOT REPLACED — the learner has not left it and their ` +
    'progress in it is untouched. ' +
    'RULES: (1) Teach ' + target + ' directly and properly, at the same standard as ' +
    'any lesson content — this is real teaching, not a two-line aside. ' +
    '(2) Do NOT open, anchor, or illustrate this turn with ' + lesson + ', and do NOT ' +
    'steer back to it mid-explanation. (3) After explaining, ask whether they have ' +
    'any doubts about ' + target + ' specifically. (4) If they raise a doubt, stay ' +
    'here and re-explain differently — the lesson keeps waiting. (5) Only when they ' +
    'signal they are satisfied, offer to go back to ' + lesson + ' — offer it, do not ' +
    'force it. (6) Any figure attached to this response belongs to ' + target + '; ' +
    'follow the VISUAL CONTRACT for it if one is present.'
  )
}
