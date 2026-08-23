/**
 * Session Lifecycle — the runtime session state machine.
 *
 * Implements, as deterministic code, the Educational Brain rules that are
 * defined against "the session" as a unit and were previously
 * unenforceable because the runtime never delimited one:
 *
 *  - decision-engine/07 §8   session boundaries in an asynchronous medium
 *                            (Correction 4): boundary = generous inactivity
 *                            gap (~30 min default); within = same session,
 *                            budgets continue, no re-greet; past = new
 *                            session, budgets reset; abandoned CLOSE is a
 *                            debt paid at next return; failure-then-vanish
 *                            flagged, return opens with an engineered win.
 *  - decision-engine/07 §1   the session shape: OPENING (due-review
 *                            retrieval FIRST, before ANY new content) →
 *                            CORE → CLOSE.
 *  - decision-engine/07 §6   hard end triggers: affect budget spent
 *                            (2 visible failures; 1 in lesson one) → end
 *                            via a win and the close script.
 *  - first-lesson/02 §2      lesson-one failure budget of 1.
 *
 * Pure functions + prompt-block builders only. No I/O. The caller
 * (route.ts) persists the episode in contextSnapshot and measures the
 * inactivity gap from real message timestamps — never from LLM claims.
 */

export type SessionPhase = 'OPENING' | 'CORE' | 'CLOSING'

export interface SessionEpisode {
  startedAt: string          // ISO — when this episode began
  phase: SessionPhase
  visibleFailures: number    // signals with correctness=false this episode
  /** set at boundary when the PREVIOUS episode's last signal was a failure
   *  (decision-engine/07 §8 rule 3: failure-then-vanish) */
  retroWinOwed: boolean
  /** OPENING exit bookkeeping: an answered signal during OPENING moves to CORE */
  openingSatisfied: boolean
}

/** decision-engine/07 §8 rule 1: ~30 minutes, deliberately generous —
 * the failure modes are asymmetric (over-splitting costs a greeting;
 * under-splitting carries spent affect budget into a rested learner).
 * Attention-span scaling (student-state/05 §4) needs per-learner data
 * the runtime will only have after real usage. */
export const SESSION_GAP_MS = 30 * 60 * 1000

export interface LastSignalLike {
  correctness?: boolean
}

/** True when the inactivity gap since the last message crosses the boundary. */
export function isNewEpisode(lastMessageAtMs: number | null, nowMs: number): boolean {
  if (lastMessageAtMs === null) return true
  return nowMs - lastMessageAtMs > SESSION_GAP_MS
}

/**
 * Episode for THIS turn: either the running one continues (budgets and
 * phase intact — no re-greeting, no reset; §8 rule 1), or a fresh one
 * starts (budgets reset; failure-then-vanish carried in from the previous
 * episode's final signal; §8 rules 1+3).
 */
export function deriveEpisode(
  prev: SessionEpisode | null,
  newBoundary: boolean,
  nowMs: number,
  prevLastSignal: LastSignalLike | null,
): SessionEpisode {
  if (!newBoundary && prev) return prev
  return {
    startedAt: new Date(nowMs).toISOString(),
    phase: 'OPENING',
    visibleFailures: 0,
    retroWinOwed: prevLastSignal?.correctness === false,
    openingSatisfied: false,
  }
}

/**
 * The SECOND affect budget, scoped to the same boundary as the first.
 *
 * `sessionEpisode.visibleFailures` (reset by deriveEpisode above) and
 * contextSnapshot's `sessionFailureCount` (persisted by route.ts, and read by
 * recoveryGuard.buildRecoveryBlock to pick an escalation rung) both count
 * "failures this session". Only the first was reset at a boundary. The second
 * had no reset anywhere, so it accumulated for the whole LearnSession row —
 * and a row is resumed for up to 24 hours while a boundary is 30 minutes, so
 * one row spans many episodes.
 *
 * Two counters over one fact, with different lifetimes, is the defect; this
 * function is the missing half, placed next to deriveEpisode so the reset rule
 * has a single owner and the two budgets cannot drift apart again.
 *
 * §8 rule 1 is explicit that a boundary resets budgets — "past = new session,
 * budgets reset" — and says nothing about exempting one of them.
 */
export function episodeFailureCount(persisted: unknown, newBoundary: boolean): number {
  if (newBoundary) return 0
  return typeof persisted === 'number' && Number.isFinite(persisted) && persisted > 0
    ? Math.floor(persisted)
    : 0
}

/**
 * Fold this turn's parsed signal into the episode — the only mutation path.
 * OPENING → CORE on the first answered item (the due retrieval, or the
 * engineered win). CORE → CLOSING when the affect budget is spent
 * (07 §6; budget 1 in lesson one per first-lesson/02 §2).
 */
export function applySignalToEpisode(
  ep: SessionEpisode,
  signal: { correctness?: boolean } | null,
  opts: { isFirstLesson: boolean },
): SessionEpisode {
  if (!signal || signal.correctness === undefined) return ep
  const failures = ep.visibleFailures + (signal.correctness === false ? 1 : 0)
  const budget = opts.isFirstLesson ? 1 : 2
  let phase: SessionPhase = ep.phase
  let openingSatisfied = ep.openingSatisfied
  let retroWinOwed = ep.retroWinOwed
  if (phase === 'OPENING') {
    openingSatisfied = true
    phase = 'CORE'
    if (signal.correctness === true) retroWinOwed = false // the win landed
  }
  if (failures >= budget && phase !== 'CLOSING') {
    phase = 'CLOSING'
  }
  return { ...ep, phase, visibleFailures: failures, openingSatisfied, retroWinOwed }
}

/**
 * OPENING block (07 §1 + §8 rules 2–3), injected only at the start of a
 * fresh episode. Deterministic ordering the LLM cannot reorder: engineered
 * win first when owed → retro-close continuity in one breath → due-review
 * retrieval BEFORE any new content.
 */
/**
 * P0-1 (lesson introduction defect): identity of the lesson this OPENING
 * belongs to, so a returning learner starting a NEW lesson (not lesson
 * one — that is firstLessonGuard's block) gets an explicit objective,
 * rationale, and bridge from the previous lesson, not just a one-line
 * greeting. Callers pass null for lesson one (firstLessonGuard already
 * owns that introduction in full) or when no lesson identity is resolved.
 */
export interface LessonOpeningIntro {
  lessonTitle: string
  lessonGoal: string
  previousLessonTitle: string | null
}

export function buildOpeningBlock(opts: {
  dueReviewCount: number
  retroWinOwed: boolean
  isFreshBoundary: boolean
  hadPreviousEpisode: boolean
  lessonIntro?: LessonOpeningIntro | null
}): string {
  if (!opts.isFreshBoundary) return ''
  const lines: string[] = [
    '\n\nSESSION OPENING (mandatory ordering — a new session is starting):',
  ]
  if (opts.retroWinOwed) {
    lines.push(
      '- FIRST, before anything else: the previous session ended on a ' +
      'failure with no proper close. Open with one engineered, near-certain ' +
      'win (an easy, genuine item they will get right) BEFORE any review or ' +
      'new content. Do not mention the previous failure or their absence.',
    )
  }
  if (opts.hadPreviousEpisode) {
    lines.push(
      '- Greet with continuity in ONE breath: name one specific thing they ' +
      'did well last time, then move on. Never remark on how long they were ' +
      'away, and never interrogate the absence.',
    )
  }
  if (opts.dueReviewCount > 0) {
    lines.push(
      `- Due reviews come BEFORE any new content: run brief retrieval of the ` +
      `${opts.dueReviewCount} due review item(s) listed in the revision block ` +
      'above — produce-the-answer prompts with context-rich cues, never ' +
      '"do you remember X?". Only after the learner has attempted them do you ' +
      'proceed to new material.',
    )
  } else {
    lines.push('- No reviews are due — proceed to the main content after the greeting.')
  }
  if (opts.lessonIntro) {
    const { lessonTitle, lessonGoal, previousLessonTitle } = opts.lessonIntro
    lines.push(
      `- Once the above is satisfied, open lesson "${lessonTitle}" covering ` +
      'these required elements, in order, before teaching any new content: ' +
      `(1) state the lesson objective — what they will be able to do by the ` +
      `end (goal: "${lessonGoal}"); (2) state briefly why this lesson matters ` +
      '— one concrete reason it is worth learning; ' +
      (previousLessonTitle
        ? `(3) connect it to the previous lesson, "${previousLessonTitle}" — one sentence on how the two relate.`
        : '(3) connect it to what the learner already knows, if anything relevant came up above.') +
      ' Keep this to a few sentences — it is an orientation, not a lecture.',
    )
  }
  return lines.join('\n')
}

/**
 * decision-engine/07 §6 extension: an explicit, unambiguous request to stop
 * ("finish it now", "let's wrap this up") is a HARDER signal than the
 * affect-failure-budget trigger above — it must close the session
 * immediately, regardless of visibleFailures. Root cause this fixes: a real
 * transcript where the student said "Finish it now." and the tutor replied
 * "Let's wrap this up, Roni!" — then immediately opened a brand-new,
 * unresolved scenario (two hikers on different paths) instead of actually
 * closing. The CLOSING phase previously only ever triggered from the
 * failure budget (applySignalToEpisode) — an explicit stop request was not
 * a recognized trigger at all.
 *
 * Deliberately conservative (whole-phrase patterns, not "finish"/"stop"
 * alone) so a request to finish a PROBLEM or WORKED EXAMPLE ("let's finish
 * this equation", "can we finish this problem") never misfires into ending
 * the whole session — only unambiguous session-level stop requests match.
 */
const FINISH_REQUEST_PATTERNS: RegExp[] = [
  /\bfinish\s+it\s+now\b/i,
  // "let's finish/wrap/end it/this/up" only counts as a SESSION stop when
  // nothing else follows the pronoun (optionally "now" + punctuation) — this
  // is what excludes "let's finish this equation"/"this problem" (a real
  // object follows "this", breaking the end-anchor) while still matching
  // "let's finish this.", "let's wrap this up", "let's end it now".
  /\blet'?s\s+(finish|end)\s+(it|this)(\s+now)?[.!?…\s]*$/i,
  /\blet'?s\s+wrap\s+(it|this)\s+up(\s+now)?[.!?…\s]*$/i,
  /\bwrap\s+(it|this)\s+up\b/i,
  /\b(i'?m|i\s+am)\s+done\s+for\s+(today|now)\b/i,
  /\b(stop|end)\s+(the\s+lesson|the\s+session|here|for\s+now|for\s+today)\b/i,
  /\bi\s+(have\s+to|need\s+to|gotta)\s+go\b/i,
  /\bthat'?s\s+enough\s+for\s+(today|now)\b/i,
  /\bcan\s+we\s+(stop|end|finish)\s+(here|now|for\s+today)\b/i,

  // ── F2 (real-student session, 2026-08-22): the patterns above caught only
  // 8 whole-phrase shapes and missed the most natural stop phrasings a
  // student types — "I want to stop", "I'm done", "bye", "enough", "I need
  // a break", and every Russian/Hindi equivalent. Measured: 1 of 35 natural
  // phrasings matched. The discriminator between a session-stop and a
  // method-complaint ("stop asking me questions") is what follows "stop":
  // nothing (or generic filler) = session; a specific object = method, and
  // that is handled by recoveryGuard's too_many_questions family.

  // Bare "I want/need to stop" or "I wanna stop" — session intent when nothing specific follows
  /\bi\s+(want|need)\s+to\s+stop[.!?\s]*$/i,
  /\bi\s+wanna\s+stop[.!?\s]*$/i,
  // "please stop" / "just stop" / "ok stop" as the whole message
  /^(?:ok(?:ay)?|please|just)?[\s,.]*stop[\s,.]*(?:please|now)?[.!?\s]*$/i,
  // "I'm done" / "I am done" without "for today/now" (the "for today" form
  // is already covered above — this catches the bare form)
  /^(?:ok(?:ay)?[\s,.]*)?(?:i'?m|i\s+am)\s+done[.!?\s]*$/i,
  // Bare "done" as the whole message
  /^done[.!?\s]*$/i,
  // "enough" / "ok enough" as the whole message
  /^(?:ok(?:ay)?[\s,.]*)?(?:that'?s\s+)?enough[.!?\s]*$/i,
  // "bye" / "goodbye" / "ok bye" — the clearest exit signal
  /^(?:ok(?:ay)?[\s,.]*)?(?:good\s*bye|bye(?:\s*bye)?)[.!?\s]*$/i,
  // "I'm leaving" / "I'm going" — departure signal, but NOT "I'm going to
  // try..." (a continuation, not departure). The $ anchor (with optional
  // "now" and trailing filler) ensures nothing meaningful follows.
  /\bi(?:'?m|\s+am)\s+(leaving|going)(\s+now)?[.!?\s]*$/i,
  // "I'm tired" / "I am tired" — fatigue-driven exit
  /\bi(?:'?m|\s+am)\s+(so\s+|really\s+)?tired[.!?\s]*$/i,
  // "I need a break" / "let me take a break"
  /\b(i\s+need|let\s+me\s+(take|have))\s+a\s+break\b/i,
  // "let's stop" (with or without "here"/"now")
  /\blet'?s\s+stop(\s+(here|now|for\s+today))?[.!?\s]*$/i,
  // "can we stop" (without "here/now/for today" — the "here/now" form is
  // already covered above, this catches the bare form)
  /\bcan\s+we\s+stop[.!?\s]*$/i,
  // "I don't want to continue" / "I don't want to do this anymore"
  /\bi\s+(don'?t|do\s+not)\s+want\s+to\s+(continue|do\s+this|keep\s+going|go\s+on)\b/i,
  // "no more" / "no more questions" / "no more please" as the whole message
  /^no\s+more(\s+(questions|please))?[.!?\s]*$/i,
  // Defer intent: "let's continue/do this later/another time"
  /\b(let'?s|can\s+we)\s+(continue|do\s+this|come\s+back)\s+(later|another\s+time|tomorrow|next\s+time)\b/i,
  /\b(i'?ll|i\s+will)\s+(come\s+back|continue|do\s+this)\s+(later|another\s+time|tomorrow|next\s+time)\b/i,
  // "that's it for today" / "that's all for today"
  /\bthat'?s\s+(it|all)\s+for\s+(today|now)\b/i,
  // "not now" / "not right now" as the whole message
  /^not\s+(right\s+)?now[.!?\s]*$/i,

  // ── Russian stop/defer patterns ────────────────────────────────────────
  // Script-discriminated (Cyrillic can never collide with Latin patterns).
  /(?<!\p{L})хватит(?!\p{L})/iu,
  /(?<!\p{L})всё(?!\p{L})/iu,
  /(?<!\p{L})мне\s+пора(?!\p{L})/iu,
  /(?<!\p{L})давай\s+(закончим|остановимся)(?!\p{L})/iu,
  /(?<!\p{L})я\s+(ухожу|пошёл|пошла)(?!\p{L})/iu,
  /(?<!\p{L})(хочу|надо)\s+(остановиться|закончить|перерыв)(?!\p{L})/iu,
  /(?<!\p{L})пока(?!\p{L})/iu,
  /(?<!\p{L})до\s+свидания(?!\p{L})/iu,
  /(?<!\p{L})устал[аи]?(?!\p{L})/iu,

  // ── Hindi (Devanagari) stop/defer patterns ─────────────────────────────
  /मुझे\s+जाना\s+है/u,
  /बस\s+कर(ो|ें)?/u,
  /रुक(ो|ें)?/u,
  /काफ़?ी\s+है/u,
  /बंद\s+कर(ो|ें)?/u,
  /थक\s+गय[ाीे]/u,

  // ── Romanized Hindi (Hinglish) ─────────────────────────────────────────
  /\bbas\s+kar(o|en)?\b/i,
  /\bband\s+kar(o|en)?\b/i,
  /\bmujhe\s+(?:jaana|jana)\s+hai\b/i,
  /\bthak\s+gay[aie]\b/i,
]

export function detectExplicitFinishRequest(message: string): boolean {
  const text = message.trim()
  if (!text) return false
  return FINISH_REQUEST_PATTERNS.some((re) => re.test(text))
}

/**
 * MUST THIS TURN'S EPISODE BE WRITTEN BACK?
 *
 * The one question the persistence site should ask: does this turn's episode
 * DIVERGE FROM THE STORED ONE? Not "did the last subsystem to touch it return
 * a new object reference" — which is the question the call site used to ask,
 * and the reason an explicit stop was discarded.
 *
 * THE DEFECT THIS REPLACES. route.ts derives the episode, force-closes it on an
 * explicit stop, and ~3,940 lines later folds this turn's signal in and decides
 * whether to persist. That decision compared the folded value against the
 * ALREADY-FORCE-CLOSED value, so it only ever detected changes made by the fold
 * itself. `applySignalToEpisode` returns the SAME reference when there is no
 * graded signal, and a stop turn has none (a bare acknowledgement sets the
 * signal to null outright) — so CLOSING was computed, used for that turn, and
 * dropped. The learner's explicit request to stop lasted exactly one turn,
 * while their confusion — persisted unconditionally on the recovery branch —
 * was remembered.
 *
 * WHY REFERENCE COMPARISON IS EXACT HERE, not a heuristic. `deriveEpisode`
 * returns `prev` ITSELF when there is no boundary, and every mutation path
 * (`forceClosing`, `applySignalToEpisode`) constructs a new object. So
 * `next !== persisted` is true if and only if something genuinely changed —
 * which is also why an unchanged turn still writes nothing.
 *
 * `freshBoundary` keeps its own clause: a new episode must be written even
 * though it legitimately differs from nothing that came before.
 */
export function episodeNeedsPersist(input: {
  /** The episode as loaded from the snapshot at the START of this turn. */
  persisted: SessionEpisode | null
  /** This turn's episode after every authoritative mutation. */
  next: SessionEpisode
  /** A 30-minute inactivity boundary opened a new episode this turn. */
  freshBoundary: boolean
}): boolean {
  if (input.freshBoundary) return true
  return input.next !== input.persisted
}

/** Force the episode into CLOSING this turn — idempotent, never downgrades
 * an already-CLOSING episode, never re-opens/rewinds visibleFailures. */
export function forceClosing(ep: SessionEpisode): SessionEpisode {
  if (ep.phase === 'CLOSING') return ep
  return { ...ep, phase: 'CLOSING' }
}

/**
 * MAY THE SESSION-CLOSE BLOCK SPEAK THIS TURN? (Phase 4.)
 *
 * The close block orders the tutor to introduce no new content and no new
 * questions, and to forecast the next session. That is right when the session
 * is genuinely over, and wrong whenever the learner still has something
 * outstanding — so it is DEFERRED, never removed. The episode stays CLOSING and
 * the close fires on the first turn that has nothing outstanding.
 *
 * Two things count as outstanding, and they are the same failure twice:
 *
 *   · AN OPEN EXCURSION. Measured in production: the block rendered as "let's
 *     pause on that for today — next time we will return to our lesson on
 *     scalar and vector quantities" while the learner was still asking about
 *     the side concept they had requested.
 *
 *   · AN AMBIGUOUS TURN. "I'm done for today, but what is a compound?" is BOTH
 *     a stop (so the episode is forced to CLOSING) and a question (so the
 *     decision layer routes ANSWER-STUDENT-FIRST). Ambiguity HOLDs the teaching
 *     context, so no excursion opens and the excursion guard above is false by
 *     construction — the case that most needs the deferral was the one the
 *     guard could not see. The prompt then carried "do NOT introduce new
 *     content, new questions" alongside a routing to answer the student, with
 *     nothing telling the model the turn was ambiguous; which side won was the
 *     model's to decide.
 *
 * The stop is honoured either way. It is simply not honoured by discarding the
 * question asked in the same breath.
 *
 * Pure predicate, extracted rather than left inline for the same reason
 * `shouldRepairFillerTurn` was — an inline boolean governing a real teaching
 * behaviour cannot be tested.
 */
export function shouldInjectAffectClose(input: {
  phase: SessionPhase
  excursionActive: boolean
  ambiguousTurn: boolean
  /**
   * PHASE 3 — the turn-arbitration verdict's answer for SESSION_CLOSE.
   *
   * Defect D4: this predicate encoded a private, two-term subset of a
   * precedence order that two other sites also encoded differently
   * (`gateEligible` had four terms, `shouldRepairFillerTurn` three). None had
   * a recovery term, so a CLOSING turn that was ALSO a recovery turn emitted
   * the close block AND the recovery block and left the model to choose.
   *
   * Optional so every existing caller and test behaves exactly as before when
   * omitted — the route is the only thing that supplies it.
   */
  arbitrationAllowsClose?: boolean
}): boolean {
  if (input.phase !== 'CLOSING') return false
  if (input.excursionActive) return false
  if (input.ambiguousTurn) return false
  if (input.arbitrationAllowsClose === false) return false
  return true
}

/**
 * CLOSING block (07 §6): the affect budget is spent — end via a win and
 * the close script. No new content is legal past this point this session.
 */
export function buildAffectCloseBlock(): string {
  return (
    '\n\nSESSION CLOSE (mandatory — the failure budget for this session is ' +
    'spent): do NOT introduce new content, new questions, or another attempt ' +
    'at the item that failed. Give the learner one immediately achievable ' +
    'success (echo-level if needed), then close warmly in ~2 sentences: name ' +
    'one specific thing they did today, and forecast the next session in one ' +
    'sentence. Encourage them to come back; never frame the ending as caused ' +
    'by their mistakes.'
  )
}
