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
