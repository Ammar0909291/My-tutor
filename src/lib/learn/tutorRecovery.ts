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

export type TeachingLang = 'ru' | 'en' | 'hi'

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
  const escalate = consecutiveFailures >= 2
  if (lang === 'ru') {
    return escalate
      ? 'Похоже, я никак не могу связаться с сервером — это неполадка на нашей стороне, не у тебя. Подожди пару секунд и отправь ещё раз, а если не пройдёт — обнови страницу.'
      : 'Ой, связь прервалась на секунду. Можешь повторить или просто отправь сообщение ещё раз — я на месте.'
  }
  if (lang === 'hi') {
    return escalate
      ? 'Lagta hai main server se connect nahin kar pa raha — yeh humari taraf ki dikkat hai, aapki nahin. Do second ruk kar phir se bhejein, aur na chale to page refresh karein.'
      : 'Oops, connection ek second ke liye ruk gaya. Dobara try karo — main yahin hoon.'
  }
  return escalate
    ? "I'm still not able to reach the server — this looks like a connection problem on our side, not yours. Give it a moment and send again, and refresh the page if it keeps happening."
    : "Sorry, I got cut off there for a second. Go ahead and try again — I'm still here."
}
