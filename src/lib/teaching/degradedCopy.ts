/**
 * P19 — the single catalog of learner-facing DEGRADED TEACHING copy.
 *
 * SCOPE, stated as a boundary because the audit turned on it. This module owns
 * the words the tutor says INSIDE the chat transcript when it could not teach.
 * It deliberately does NOT own, and must never absorb:
 *   · authentication      401/403 from route guards — not tutor speech
 *   · load shedding       AIBudgetExceededError -> 429 "High demand right now"
 *                         — a deliberate refusal, not a failure
 *   · UI diagnostics      i18n.ts load/save/quiz/onboarding strings — interface
 *                         status rendered outside the transcript
 *   · feature errors      e.g. vision's "Image analysis is unavailable"
 * Those are correctly separate and folding them in here would be wrong.
 *
 * WHY A CATALOG AND NOT A SINGLE FUNCTION CALL SITE. Two execution paths reach
 * a learner with degraded copy, and they are irreducibly distinct:
 *
 *   server_degraded    /api/learn/chat COMPLETED and returned 200 with
 *                      provider='degraded'. The model failed; the request did
 *                      not. Rendered server-side, persisted as a message.
 *   client_transport   the request never completed — a 504 from the function
 *                      budget, or a dead network. The server's bytes never
 *                      arrive, so the browser must render something itself.
 *
 * Neither can serve the other: the first cannot reach a learner whose request
 * died in flight, and the second cannot know what the teaching engine wanted to
 * say. What was NOT justified — and what a production transcript exposed when
 * both appeared in one session — is two independent sets of WORDING and two
 * independent ESCALATION RULES. Both now live here. The paths stay separate;
 * the copy has one owner.
 *
 * The two channels also differ in what the learner should DO, which is why the
 * wording differs rather than being deduplicated into one string: a
 * server-degraded turn is worth retrying in place and the learner's progress is
 * saved; an unreachable server may genuinely need a page refresh.
 *
 * Pure module, ZERO imports. That is a requirement, not a stylistic
 * preference: the client half must render correctly when the server is
 * unreachable, so this file has to bundle for the browser with nothing behind
 * it. Every string below is carried over verbatim from the two ladders it
 * replaces — no wording was redesigned.
 */

export type TeachingLang = 'ru' | 'en' | 'hi'

export type DegradedChannel =
  /** The route answered; no provider could produce a teaching turn. */
  | 'server_degraded'
  /** The route never answered: 504, or the fetch itself failed. */
  | 'client_transport'

/**
 * The one escalation rule both channels share. Repeating identical text is the
 * single worst signal a broken tutor can send — it is what made six
 * byte-identical replies land in a row in the transcript that started this —
 * so the rung advances with consecutive failures and both channels read it the
 * same way. Junk input (0, negative, NaN) normalises to the first rung rather
 * than throwing, because a copy lookup must never be able to break a turn.
 */
export function degradedRung(consecutiveFailures: number): number {
  return Number.isFinite(consecutiveFailures)
    ? Math.max(1, Math.floor(consecutiveFailures))
    : 1
}

export interface DegradedCopyRequest {
  channel: DegradedChannel
  /** How many degraded turns have happened in a row (1 = the first). */
  consecutiveFailures: number
  /** Only consulted for client_transport — see the note on SERVER_COPY. */
  lang?: TeachingLang
}

/**
 * Server-degraded copy is English-only, exactly as it was before this catalog
 * existed. Translating it would mean inventing four new strings, which is a UX
 * change this task explicitly excludes. Recorded here as a known asymmetry
 * rather than silently papered over: the client channel is localised because
 * it always was, and the server channel is not because it never was.
 *
 * Rung 1 is absent on purpose. The first server-degraded turn is served by the
 * K5 teaching TEMPLATE ladder (renderFallback: SHOW_EASIEST_LEGAL /
 * ECHO_MICROWIN / WARM_CLOSE), which is teaching-shaped content chosen from the
 * policy chain — not apology copy — and therefore stays owned by
 * templateFallback.ts. This catalog owns only the escalation past that point.
 */
const SERVER_COPY: Record<'second' | 'later', string> = {
  second:
    "I'm still getting my thoughts together on that one — give me a moment and try again.",
  // Third and beyond: stop pretending this is a teaching turn. Silence about an
  // outage reads as a broken product, which is exactly what happened.
  later:
    "Something on my side isn't responding right now, so I can't teach this properly yet. " +
    "This isn't anything you did. Please try again in a moment — your progress is saved.",
}

const CLIENT_COPY: Record<TeachingLang, { first: string; later: string }> = {
  en: {
    first:
      "Sorry, I got cut off there for a second. Go ahead and try again — I'm still here.",
    later:
      "I'm still not able to reach the server — this looks like a connection problem on our side, not yours. Give it a moment and send again, and refresh the page if it keeps happening.",
  },
  ru: {
    first:
      'Ой, связь прервалась на секунду. Можешь повторить или просто отправь сообщение ещё раз — я на месте.',
    later:
      'Похоже, я никак не могу связаться с сервером — это неполадка на нашей стороне, не у тебя. Подожди пару секунд и отправь ещё раз, а если не пройдёт — обнови страницу.',
  },
  hi: {
    first:
      'Oops, connection ek second ke liye ruk gaya. Dobara try karo — main yahin hoon.',
    later:
      'Lagta hai main server se connect nahin kar pa raha — yeh humari taraf ki dikkat hai, aapki nahin. Do second ruk kar phir se bhejein, aur na chale to page refresh karein.',
  },
}

/**
 * The one lookup both channels use. Never throws.
 *
 * server_degraded at rung 1 returns null — the caller must render the K5
 * teaching template instead (see SERVER_COPY's note). Returning null rather
 * than a string keeps that decision explicit at the call site instead of
 * hiding a teaching template inside a copy catalog.
 */
export function degradedCopy(req: DegradedCopyRequest): string | null {
  const n = degradedRung(req.consecutiveFailures)

  if (req.channel === 'server_degraded') {
    if (n === 1) return null
    return n === 2 ? SERVER_COPY.second : SERVER_COPY.later
  }

  const lang: TeachingLang = req.lang && CLIENT_COPY[req.lang] ? req.lang : 'en'
  return n >= 2 ? CLIENT_COPY[lang].later : CLIENT_COPY[lang].first
}
