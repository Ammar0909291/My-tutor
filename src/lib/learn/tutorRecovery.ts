/**
 * Tutor Max failure-recovery messaging (Stability sprint, P0).
 *
 * Root cause this addresses: every failed chat turn rendered the SAME warm
 * "Sorry, I got cut off…" line. When the provider is genuinely down, the
 * student retries, fails again, and sees the identical sentence over and over
 * — a loop that looks like the tutor is stuck rather than a real outage. These
 * pure helpers let the caller (a) recognise a soft AI fallback response and
 * (b) escalate the wording once failures repeat, so the second failure
 * explains the real situation and points at a recovery instead of repeating.
 */

import { degradedCopy, type TeachingLang } from '@/lib/teaching/degradedCopy'

export type { TeachingLang }

/**
 * True when the server returned a soft AI fallback (the model timed out and
 * the router substituted a canned "try again" string with `provider:
 * 'fallback'`). These are `success:true` on the wire but are NOT a real
 * teaching turn, so the caller treats them as retryable failures rather than
 * showing the canned string to the student.
 */
export function isFallbackResponse(
  data: { provider?: string | null } | null | undefined,
): boolean {
  return !!data && data.provider === 'fallback'
}

/**
 * The message shown after a failed turn. The first failure gets the warm,
 * "I got cut off, try again" line (a transient hiccup — most failures are).
 * From the second consecutive failure on, the copy changes to name the real
 * problem (a connection issue on our side) and offer a concrete recovery, so
 * the student never sees the same sentence looping.
 */
export function pickRecoveryMessage(consecutiveFailures: number, lang: TeachingLang): string {
  // P19: this function no longer owns any wording. It used to carry its own
  // copy of the escalation ladder in three languages, in parallel with the
  // server ladder in templateFallback.ts — and a production transcript showed
  // both reaching the same learner in one session, because the two ladders
  // fire on opposite sides of the HTTP boundary and neither knew about the
  // other. The strings moved to lib/teaching/degradedCopy.ts verbatim; this
  // stays as the client channel's entry point so LessonScreen is untouched.
  //
  // The catalog is a pure, zero-import module, so it bundles for the browser
  // and still renders correct copy when the server is unreachable — precisely
  // when this path runs.
  return degradedCopy({
    channel: 'client_transport',
    consecutiveFailures,
    lang,
  }) as string // client_transport always returns copy; only rung-1 server is null
}
