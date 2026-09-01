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

import {
  isExplicitTopicRequest, isReturnRequest, isExplicitCorrection, looksLikeAnswer, MAX_EXCURSION_TURNS,
} from './visual/session'

export { MAX_EXCURSION_TURNS }

/**
 * How long a learner-named topic title may be once it is persisted.
 *
 * Matches `requestedTopic.ts`'s own MAX_TITLE_CHARS, which is where every
 * title reaching this module is produced. Restated rather than imported so a
 * corrupt snapshot is bounded by this module's own rule, not by a constant
 * that happens to live in the visual layer.
 */
const MAX_TOPIC_TITLE_CHARS = 90

/** The standing excursion, persisted in contextSnapshot.excursion. */
export interface ExcursionState {
  active: boolean
  /** The concept being taught while the excursion runs. */
  targetConceptId: string | null
  /**
   * WHAT THE LEARNER CALLED IT, when the curriculum has no concept for it.
   *
   * See the UNRESOLVED TOPICS note above `decideExcursion`. Exactly one of
   * this and `targetConceptId` is set while an excursion is open: a resolved
   * excursion carries the concept id, an unresolved one carries the title.
   */
  targetTopicTitle: string | null
  /** The lesson concept owed a return. Set once, at the start, never nested. */
  returnToConceptId: string | null
  /** Turns this excursion has been open (safety valve). */
  turns: number
  /**
   * Was this opened as a PREREQUISITE DETOUR (knowledgeGap.ts) rather than
   * because the learner asked to explore something?
   *
   * The two have different exits. A learner who chose a topic decides when
   * they are done with it. A learner who was DETOURED — "what is the normal
   * force… i dont get it" — did not choose the detour and is owed a route
   * back the moment they signal they want the lesson again.
   *
   * Optional so a snapshot persisted before this field reads as `false`,
   * which is the previous behaviour exactly.
   */
  openedAsKnowledgeGap?: boolean
}

export const NO_EXCURSION: ExcursionState = {
  active: false,
  targetConceptId: null,
  targetTopicTitle: null,
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
  | 'closed-wants-practice'  // detoured learner asked to be assessed again

export interface ExcursionDecision {
  /** The state to persist for the next turn. */
  state: ExcursionState
  /** The concept this turn should TEACH. Never null when a lesson exists. */
  targetConceptId: string | null
  /**
   * The title of the topic this turn should teach, when it has no concept id.
   * Null on every ordinary turn and on every resolved excursion.
   */
  targetTopicTitle: string | null
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
  /**
   * WHAT THE LEARNER CALLED THE TOPIC, when `requestedConceptId` is null.
   *
   * THE CALLER'S CONTRACT: pass a title ONLY for a request that genuinely
   * names something other than what is already being taught — i.e. the result
   * of `namedTopicUnknownTo`, which applies the three filters that make that
   * true (a name at all; not a medium noun; no vocabulary shared with the
   * topic in progress). This module cannot apply them itself: the third needs
   * the curriculum's text, and keeping this file free of the KG is what lets
   * the whole lifecycle stay pure and exhaustively testable.
   *
   * A caller that passes a raw phrase instead will open excursions on ordinary
   * follow-ups. `null` is always the safe value.
   *
   * Ignored whenever `requestedConceptId` is set: a topic the KG can name is
   * always better identified by its id.
   */
  requestedTopicTitle: string | null
  /**
   * THE LEARNER REPORTED MISSING THIS CONCEPT. (Phase 4.)
   *
   * A knowledge gap and an explicit request are the same DECISION — teach that
   * concept next, come back after — reached by two different sentences:
   *
   *     "explain the mole concept"                     -> a request
   *     "I don't know enough about the mole concept"   -> a gap
   *
   * MEASURED before this field existed: the resolver returned
   * `chem.found.mole-concept` for BOTH, and the second opened no excursion,
   * because the branch below also demands a request frame. The learner named
   * exactly what to teach and was answered with a recovery script instead,
   * while the turn spent their affect budget for saying it.
   *
   * THE CALLER'S CONTRACT — the same shape, and the same reason, as
   * `requestedTopicTitle` above: the qualifying test cannot live here. It needs
   * the failure-state partition (`isDontKnowSignal`) and the lesson's KG
   * prerequisites, and keeping both out of this file is what lets the whole
   * lifecycle stay pure and exhaustively testable. Pass
   * `classifyKnowledgeGap(...)?.conceptId ?? null` (knowledgeGap.ts) and
   * nothing else; `null` is always the safe value.
   *
   * It does not compete with a request: an explicit request already opens the
   * same branch, so this only ever ADDS a reason to open, never changes which
   * concept is opened.
   */
  knowledgeGapConceptId?: string | null
  /**
   * The learner asked to practise or be assessed THIS TURN (the route's own
   * `turnIntent.wantsPractice` — read here, never recomputed).
   *
   * A close signal for a prerequisite detour only. See the branch that uses
   * it for the measured failure.
   */
  wantsPractice?: boolean
  /** Whether the tutor's previous turn ended in a question. */
  lastAssistantAskedQuestion: boolean
  /**
   * The options currently offered to the learner (`pendingMcq.options`). A
   * message that IS one of them is a tap, not a request — see
   * `looksLikeAnswer`. Optional; omitting it is the previous behaviour.
   */
  offeredMcqOptions?: readonly string[] | null
  /**
   * THE TURN'S READING OF ITSELF DISAGREED. (Phase 2.)
   *
   * `TurnIntent.ambiguous` — true when two independent readings of the same
   * message contradict each other ("I'm done for today, but why does it
   * bend?" is both a stop and a question, and genuinely means both).
   *
   * Every branch below this module's safety valves reads the learner's text to
   * justify CHANGING what is being taught. When the reading of that text is
   * self-contradictory, no change it could justify is trustworthy — so the
   * turn changes nothing and the current teaching context stands. The learner
   * is still answered; only the CONTEXT is held.
   *
   * OPTIONAL ON PURPOSE: absent means "not ambiguous", so every existing
   * caller behaves exactly as before.
   */
  ambiguous?: boolean
}

/**
 * Decide this turn's teaching target and the excursion's next state.
 *
 * Ordered and deterministic. The order IS the design: a return beats a
 * satisfaction signal, satisfaction beats an explicit correction (F3 fix — a
 * negation of the current topic, "I meant X, not Y"), a correction beats the
 * answer-hold, and the answer-hold beats starting anything new — so a reply
 * to the tutor's own question can never be mistaken for a request to leave
 * the lesson.
 *
 * ── UNRESOLVED TOPICS: WHY AN EXCURSION MAY HAVE NO CONCEPT ID ──────────────
 * This used to open ONLY on a resolved `requestedConceptId`, i.e. only when the
 * learner asked about something the Knowledge Graph already contains. So the
 * deterministic protection — the whole reason this module exists — switched
 * itself OFF for precisely the questions that need it most:
 *
 *   lesson:  "Free Body Diagrams"     (phys.mech.free-body-diagrams)
 *   learner: "What is thermal conductivity?"
 *   tutor:   one correct sentence about heat, then "Now, let's connect this
 *            back to our current lesson on Free Body Diagrams"
 *
 * The physics KG genuinely has no thermal-conductivity concept, so
 * `requestedConceptId` was null, so no excursion opened, so every prompt block
 * above stayed anchored to the lesson and the model was steered back. Nothing
 * was broken — the protection simply never ran. Making the resolver stricter
 * (2026-08-11's qualifier fix, which correctly stopped "thermal conductivity"
 * resolving to ELECTRICAL conductivity) made this MORE common, not less.
 *
 * A teacher does not need a curriculum node to take a question seriously. The
 * excursion therefore targets a TITLE when it cannot target an id. Everything
 * the lifecycle does is unchanged and keyed to neither: the return anchor is
 * still the lesson, confusion still does not close it, satisfaction still does,
 * `turnCountsForLesson` still freezes the lesson's ladder. The only thing an
 * unresolved excursion cannot do is name a curriculum concept — so it draws no
 * figure and claims no asset, which is honest rather than degraded.
 */
export function decideExcursion(input: ExcursionInput): ExcursionDecision {
  const { state, message, lessonConceptId, requestedConceptId } = input
  // Truthiness, not `!== null`: a state literal written before this field
  // existed (a persisted snapshot, an older caller) carries `undefined`, and
  // `undefined !== null` would have declared every such excursion active with
  // nothing to teach. An empty string is no target either.
  const active = state.active && Boolean(state.targetConceptId || state.targetTopicTitle)

  // A topic title is only ever consulted when the curriculum could not name the
  // request. It never competes with a resolved concept.
  const requestedTopicTitle = requestedConceptId ? null : (input.requestedTopicTitle ?? null)

  const closed = (transition: ExcursionTransition): ExcursionDecision => ({
    state: NO_EXCURSION,
    targetConceptId: lessonConceptId,
    targetTopicTitle: null,
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
      targetTopicTitle: null,
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

  // ── AMBIGUOUS TURN = HOLD (Phase 2) ────────────────────────────────────────
  //
  // Placed HERE, and the position is the whole design:
  //
  //   ABOVE it sit the two structural valves — the lesson moved underneath us,
  //   and the turn limit. Neither reads the learner's text, both exist so a
  //   learner can never be stranded off-lesson, and an unreadable turn is
  //   exactly when a safety valve matters most. They keep their priority.
  //
  //   BELOW it sits every branch that reads the text to justify a CHANGE:
  //   return, satisfaction, correction, the answer-hold, a named concept, a
  //   named topic. All of them are downstream of a reading that just
  //   contradicted itself, so none of them may act on it.
  //
  // The outcome is the same shape the answer-hold already returns, because it
  // is the same idea: an open excursion continues (and its turn counter still
  // advances, so the safety valve above still converges), and an ordinary
  // lesson turn stays on the lesson. Nothing is closed, nothing is opened,
  // nothing switches. Mastery attribution is unaffected by construction —
  // `turnCountsForLesson` reads the state this returns, which is the state
  // that was already in force.
  if (input.ambiguous) {
    return active ? held(state, 'continued') : none(lessonConceptId)
  }

  // The learner asked to go back, in their own words.
  if (active && isReturnRequest(message)) return closed('closed-returned')

  // The learner said they are done.
  if (active && isSatisfactionSignal(message)) return closed('closed-satisfied')

  // A DETOURED LEARNER ASKING TO BE ASSESSED IS ASKING TO GO BACK.
  //
  // MEASURED (phys.mech.friction, 2026-09-01, real account, studied as a
  // learner). "what is the normal force… i dont get it" correctly opened a
  // knowledge-gap detour to phys.mech.normal-force. Four turns later the
  // learner had answered correctly twice and been told so, then wrote:
  //
  //   "the one pointing up. can you quiz me properly on friction now"
  //
  // The engine SAW it — that turn logged `wantsPractice: true` and
  // `practiceRequested: true` — and the detour stayed open, `transition:
  // 'continued'`, for two more turns. While it was open `notExcursion: false`
  // blocked every probe, so the lesson sat in OBSERVE with check 0 / practice
  // 0 and could not have reached mastery however well the learner answered.
  //
  // None of the existing exits could fire: it is not a return request, it
  // contains no satisfaction phrase, it is not a correction, the lesson did
  // not change, and the turn limit is 40. The one signal that WAS present went
  // unread.
  //
  // SCOPED TO A PREREQUISITE DETOUR. A learner who chose to explore a topic
  // and asks to be quizzed may well mean quizzed on THAT topic; the ambiguity
  // is real and is left alone. A learner who was detoured did not choose it,
  // and asking to be assessed is asking for the lesson back.
  if (active && state.openedAsKnowledgeGap === true && input.wantsPractice === true) {
    return closed('closed-wants-practice')
  }

  // F3 fix: the learner explicitly said the active excursion topic is NOT
  // what they meant ("I meant the book and table thing, not cesium"), and
  // named nothing else this turn that a later branch can redirect to. Same
  // priority tier as isReturnRequest/isSatisfactionSignal above (checked
  // before the answer-hold, never swallowed by it) — an explicit negation of
  // the current topic is exactly the opposite of "answering the tutor".
  // When the correction DOES name something new (requestedConceptId or
  // requestedTopicTitle resolved this turn), this falls through instead: the
  // branches below redirect to what was actually named rather than the
  // lesson, via the isExplicitCorrection addition to the concept branch.
  if (active && isExplicitCorrection(message) && !requestedConceptId && !requestedTopicTitle) {
    return closed('closed-returned')
  }

  // The learner is ANSWERING the tutor, not asking for a new topic. This is the
  // most common turn in a real lesson and must never start an excursion — the
  // same guard the visual layer already applies to the figure.
  if (looksLikeAnswer(message, input.lastAssistantAskedQuestion, input.offeredMcqOptions)) {
    return active ? held(state, 'continued') : none(lessonConceptId)
  }

  // A concept takes over the teaching target on an explicit request, OR on an
  // explicit correction ("I meant X, not Y") — the same negation signal
  // checked above, but this time paired with a concept the correction itself
  // named, so it redirects to what was actually meant instead of the lesson.
  // Phase 4 adds the third qualifying reason. A gap qualifies only for the
  // concept it actually named — `knowledgeGapConceptId === requestedConceptId`
  // — so a stale or mismatched gap can never redirect the detour to a concept
  // the resolver did not return for THIS message.
  const gapOpensThisConcept =
    requestedConceptId != null && input.knowledgeGapConceptId === requestedConceptId
  if (requestedConceptId
      && (isExplicitTopicRequest(message) || isExplicitCorrection(message) || gapOpensThisConcept)) {
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
        targetTopicTitle: null,
        returnToConceptId: lessonConceptId,
        turns: 0,
        // WHY it opened, recorded once at the start so the exit can differ.
        // A detour the learner did not choose is owed a route back; a topic
        // they asked for is theirs to leave.
        //
        // `gapOpensThisConcept` alone is the test, and the first version of
        // this line got that wrong: it also required the message NOT to look
        // like a topic request, which killed the flag on the very message that
        // opened the detour — "what is the normal force though … i dont get
        // it" is request-SHAPED and a reported gap at the same time. Caught by
        // the test built from that verbatim turn.
        //
        // The discriminator already lives upstream: `knowledgeGapConceptId`
        // comes from classifyKnowledgeGap, which fires only on a don't-know /
        // don't-understand signal (isDontKnowSignal). "I don't understand X"
        // versus "explain X" is exactly the distinction wanted, and it has
        // already been made by the time this branch runs.
        openedAsKnowledgeGap: gapOpensThisConcept,
      },
      targetConceptId: requestedConceptId,
      targetTopicTitle: null,
      returnToConceptId: lessonConceptId,
      transition: active && state.targetConceptId !== requestedConceptId ? 'switched' : 'started',
      justClosed: false,
    }
  }

  // THE SAME REQUEST, FOR A TOPIC THE CURRICULUM CANNOT NAME.
  //
  // The qualifying gate is the caller's `namedTopicUnknownTo` — see the field
  // doc on `requestedTopicTitle` for why it cannot live here. It is DIFFERENT
  // from `isExplicitTopicRequest` above, and deliberately: the strong family
  // matches "explain X" and "teach me X" but not "What causes friction?" or
  // "How does a catalyst work?", which is how learners actually ask, and which
  // this branch exists to stop losing.
  //
  // Everything that must not open an excursion is already excluded and cannot
  // reach this line: an answer to the tutor's own question (the answer-hold
  // above), a return request, a satisfaction signal, and — inside
  // `namedTopicUnknownTo` — "why?", "I am lost", "show me a diagram", and any
  // follow-up sharing vocabulary with the topic in progress.
  if (requestedTopicTitle) {
    const switched = active && state.targetTopicTitle !== requestedTopicTitle
    return {
      state: {
        active: true,
        targetConceptId: null,
        targetTopicTitle: requestedTopicTitle,
        returnToConceptId: lessonConceptId,
        turns: 0,
      },
      // Null on purpose: there is no concept, and inventing one — the lesson's
      // most of all — is the exact failure this branch exists to end.
      targetConceptId: null,
      targetTopicTitle: requestedTopicTitle,
      returnToConceptId: lessonConceptId,
      transition: switched ? 'switched' : 'started',
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
    targetTopicTitle: state.targetTopicTitle,
    returnToConceptId: state.returnToConceptId,
    transition,
    justClosed: false,
  }
}

function none(lessonConceptId: string | null): ExcursionDecision {
  return {
    state: NO_EXCURSION,
    targetConceptId: lessonConceptId,
    targetTopicTitle: null,
    returnToConceptId: null,
    transition: 'none',
    justClosed: false,
  }
}

/**
 * DOES THIS TURN'S EVIDENCE BELONG TO THE LESSON?
 *
 * The single attribution question, asked once per turn and answered in one
 * place. While an excursion is open the answer is NO: the learner is answering
 * questions about the side concept, so crediting those answers to the lesson's
 * ladder is a category error — and it was a load-bearing one. The lesson's
 * mastery counters are what the completion gate reads, so an excursion turn
 * could manufacture the very evidence that "finished" the lesson the learner
 * had stepped away from, while the side concept's figure was still on screen.
 *
 * Everything downstream of this reads one boolean rather than re-deciding:
 *
 *   false -> the lesson's conversation state is FROZEN (no phase advance, no
 *            mastery credit), its TopicProgress checkpoint is not written, and
 *            completion is not authorized.
 *   true  -> ordinary turn, every existing path behaves exactly as before.
 *
 * It says nothing about history: a lesson already completed before the
 * excursion opened stays completed. This only governs what THIS turn may
 * newly create.
 */
export function turnCountsForLesson(
  decision: Pick<ExcursionDecision, 'state' | 'justClosed'>,
): boolean {
  // `justClosed` is included on purpose. The closing turn is the RETURN turn:
  // the learner said "got it, thanks" and the tutor walks back to the lesson.
  // A turn that resumes a lesson cannot also finish it — otherwise satisfaction
  // with the side question would hand the lesson a completion it never earned,
  // which is the same fabrication one turn later.
  return !decision.state.active && !decision.justClosed
}

/** Narrow unknown JSONB back into an ExcursionState. */
export function parseExcursionState(raw: unknown): ExcursionState {
  if (!raw || typeof raw !== 'object') return NO_EXCURSION
  const v = raw as Record<string, unknown>
  if (v.active !== true) return NO_EXCURSION
  const targetConceptId =
    typeof v.targetConceptId === 'string' && v.targetConceptId ? v.targetConceptId : null
  // Trimmed and length-capped on the way back in: this reaches a prompt, and a
  // snapshot is a database row that outlives the code that wrote it.
  const rawTitle = typeof v.targetTopicTitle === 'string' ? v.targetTopicTitle.trim() : ''
  const targetTopicTitle = rawTitle ? rawTitle.slice(0, MAX_TOPIC_TITLE_CHARS) : null
  // An excursion with neither identity has nothing to teach — the same
  // "no target means no excursion" rule as before, now asked of both.
  if (!targetConceptId && !targetTopicTitle) return NO_EXCURSION
  return {
    active: true,
    targetConceptId,
    // A concept id always wins, so a hand-edited row cannot attach a title of
    // its own to a real concept and have the prompt announce it.
    targetTopicTitle: targetConceptId ? null : targetTopicTitle,
    returnToConceptId:
      typeof v.returnToConceptId === 'string' && v.returnToConceptId ? v.returnToConceptId : null,
    // Clamped at 0: a negative count (corrupt snapshot, hand-edited row) would
    // push the turn-limit safety valve further away instead of nearer.
    turns:
      typeof v.turns === 'number' && Number.isFinite(v.turns) && v.turns > 0
        ? Math.floor(v.turns)
        : 0,
    // WHY IT OPENED HAS TO SURVIVE A REFRESH, or the exit that depends on it
    // never fires for a learner who reloaded the page. This parser rebuilds
    // the state field by field, so a new field is DROPPED unless it is named
    // here — caught by the round-trip test, not by reading.
    //
    // Strict `=== true`: a snapshot written before this field existed, or a
    // hand-edited row, reads as "not a detour", which is the previous
    // behaviour and the conservative direction (the detour stays open rather
    // than closing on a signal it should not).
    openedAsKnowledgeGap: v.openedAsKnowledgeGap === true,
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
  // The learner named something the curriculum has no concept for. The
  // lifecycle is identical; two sentences of the directive are not — see
  // rule (6) and the opening below.
  const unresolvedTopic = decision.state.active && !decision.state.targetConceptId

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
    `THE LEARNER IS CURRENTLY LEARNING ${target}. THE LESSON ${lesson} IS PAUSED, ` +
    'NOT REPLACED — the learner has not left it and their progress in it is ' +
    'untouched. ' +
    // THIS OVERRIDE CLAUSE IS LOAD-BEARING. Blocks above this one are written
    // for an ordinary lesson turn and several of them name the lesson as the
    // thing to teach, resume or wrap up. Read together with a confused learner
    // they produced, in production, "we'll come back to this concept later"
    // and "next time we will return to our lesson on scalar and vector
    // quantities" — about a concept the learner had asked for and was still
    // asking about.
    'THIS BLOCK OVERRIDES every instruction above it that tells you to return ' +
    `to, continue, resume, wrap up, close or forecast ${lesson}, however it is ` +
    'worded. Where they disagree with this block, this block wins. ' +
    'RULES: (1) Teach ' + target + ' directly and properly, at the same standard as ' +
    'any lesson content — this is real teaching, not a two-line aside. ' +
    '(2) Do NOT teach, open, anchor, illustrate or ask a question belonging to ' +
    lesson + ' this turn, and do NOT steer back to it mid-explanation. It may be ' +
    'named ONLY as the paused destination you will return to later. ' +
    // THE BRIDGE SENTENCE. Measured in production on 2 of 5 real learner
    // questions, and it slipped past the clause above because the model was
    // not "steering back" — it kept teaching the side topic. It was
    // CONNECTING: "Connecting this back to our journey, understanding how
    // waves change direction at boundaries builds the precise spatial
    // reasoning you need for tracking forces in Free Body Diagrams." That
    // link is invented. Refraction does not build toward free-body diagrams,
    // and a learner told it does has been taught something false about how
    // the subject fits together — on the exact turn they trusted the tutor
    // enough to ask their own question.
    'In particular, do NOT build a BRIDGE between the two: do not say the ' +
    'side topic connects to, relates to, builds toward, prepares you for, ' +
    'reinforces or helps with ' + lesson + ', and do not open a sentence with ' +
    '"connecting this back to", "tying this back to", "as with our lesson on" ' +
    'or any equivalent. Two topics being in the same subject is NOT a ' +
    'connection. If a genuine, specific link exists the learner asked about, ' +
    'you may state it plainly — otherwise say nothing about the lesson at all. ' +
    // (3) USED TO READ: "ask whether they still have a doubt about <target>".
    // Measured at 17% of production turns, and it is not a check — a learner
    // who does not know what they misunderstood cannot answer it, and "no"
    // ends the detour on no evidence at all. The excursion still closes only
    // on a statement of understanding (rule 5); this just makes the question
    // one that produces some.
    '(3) After explaining, end with ONE short question that makes them USE ' +
    target + ' — predict an outcome, apply it to a new case, put it in their ' +
    'own words, or answer a one-step problem. Never ask "any doubts?", "is ' +
    'that clear?" or "do you still have a doubt" — those test nothing. ' +
    '(4) CONFUSION DOES NOT END THIS. If they say they do not understand, are ' +
    'confused, or still do not get it — however many times — that is a reason to ' +
    'teach ' + target + ' AGAIN with a different representation, never a reason to ' +
    'leave it. Do NOT defer, postpone or park it, do NOT promise it for another ' +
    'day or another session, do NOT wrap the session up, and do NOT pivot to the ' +
    'lesson or to a simpler point of the lesson. Re-explain, then ask again. ' +
    '(5) ONLY a clear statement of understanding from the learner ends this. When ' +
    'that comes, offer to go back to ' + lesson + ' — offer it, do not force it. ' +
    // (6) SPLITS ON WHETHER THE TARGET IS A CURRICULUM CONCEPT.
    //
    // The unqualified version of this clause used to run for every excursion,
    // and on an unresolved-topic excursion it was false: no figure OF that
    // topic can exist, because nothing authored or generated it. Any figure
    // present is the paused lesson's, still on screen from before the question
    // — so "any figure attached belongs to <target>" instructed the model to
    // relabel the lesson's picture as the learner's new topic. A correct
    // figure, presented as a figure of something it is not.
    (unresolvedTopic
      ? '(6) There is NO figure of ' + target + ' in this response. If a figure is ' +
        'present it belongs to ' + lesson + ' and was already on screen: do NOT ' +
        'describe it as, label it as, or explain it as a picture of ' + target + '. ' +
        'Either leave it alone or say plainly which one it is. Teach ' + target +
        ' in words. '
      : '(6) Any figure attached to this response belongs to ' + target + '; ' +
        'follow the VISUAL CONTRACT for it if one is present. ') +
    '(7) The lesson is NOT finished and cannot finish this turn: do NOT emit ' +
    '[LESSON_COMPLETE], do NOT write a lesson-closing summary, and do NOT ' +
    'congratulate the learner on completing ' + lesson + '. The server enforces ' +
    'this regardless of what you emit — a completion tag on this turn is ' +
    'stripped before the learner sees it.' +
    // (8) ONLY for a topic the curriculum does not contain. Measured in
    // production: after a correct answer about thermal conductivity the tutor
    // said "You've completed a key concept in your thermal physics roadmap."
    // There is no such concept and no such roadmap entry — nothing was
    // recorded, nothing advanced, and the learner was told otherwise. Praise
    // for understanding is right and stays; the invented bookkeeping is what
    // must go.
    (unresolvedTopic
      ? ' (8) ' + target + ' is NOT part of this learner\'s curriculum, so no ' +
        'progress of any kind is recorded for it. Praise their understanding ' +
        'freely, but do NOT say they have completed a concept, unlocked ' +
        'anything, advanced a roadmap or syllabus, or moved forward in any ' +
        'plan — none of that happened. Do not refer them to a progress screen ' +
        'or navigation control to find it.'
      : '')
  )
}

/**
 * PHASE B — A NEW ATTEMPT DOES NOT BEGIN MID-EXCURSION.
 *
 * `decideExcursion` already closes an excursion when the lesson moves
 * underneath it (`closed-lesson-changed`, gated on
 * `state.returnToConceptId !== lessonConceptId`). That valve cannot see a
 * RESTART: restarting lesson A keeps concept A, so `returnToConceptId` still
 * matches and an excursion opened in the previous attempt stays open into the
 * fresh one — the learner asks to start over and turn one is spent on a side
 * topic they left behind, with the lesson still marked "paused, owed a return".
 *
 * The same boundary Phase 7L used for the ladder: cleared only at the moment
 * lesson-init has already decided to open an attempt. A resume clears nothing,
 * so an excursion opened two turns ago survives a page refresh exactly as
 * before. Cross-lesson behaviour is untouched — the valve above still owns it.
 *
 * A DELTA for writeSnapshotDelta, which merges. `parseExcursionState` reads a
 * non-object as NO_EXCURSION, so no reader changes.
 */
export function clearExcursionForNewAttempt(): Record<string, unknown> {
  return { excursion: null }
}
