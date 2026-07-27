/**
 * ISS-18 (masterplan P0) — verbatim redaction for minors.
 *
 * THE LEAK. The SIGNAL tag may carry `phrase="…"`: the learner's own words,
 * quoted verbatim, when they voiced a misconception. That phrase is persisted
 * as MISCONCEPTION_DETECTED evidence, where it becomes cross-learner
 * authoring input. For an adult that is the evidence moat working. For a
 * nine-year-old it is a child's unedited sentences sitting in an analytics
 * table, and no teaching value justifies keeping them readable.
 *
 * WHAT THIS PRESERVES. Redaction here is a HASH, not a deletion, and it
 * applies only to the PERSISTED copy:
 *
 *   · the in-session repair is untouched — student-state/03's contract
 *     ("the learner's own phrasing is the elicit-step script for the repair")
 *     reads the live signal in memory, not this row;
 *   · cross-learner grouping survives — learningAnalytics buckets by
 *     normalized phrase, and identical phrases still hash identically, so
 *     "how many learners said this" remains answerable;
 *   · what is lost is exactly what should be: the ability for anyone reading
 *     the table later to reconstruct a child's sentence.
 *
 * AGE SOURCE, and its honest limit. The schema has no birth date; the only
 * age proxy is `Profile.grade`, set at School-Mode onboarding. Grade N is
 * roughly age N+5/N+6, so grade ≤ 10 covers "under 16" with a margin.
 * Library learners typically have no grade at all — see MODE below for how
 * that unknown is handled, because it is a policy choice and not a detail to
 * bury.
 */
import { createHash } from 'node:crypto'

/**
 *  · 'off'    — no redaction (opt-out; the flag exists so a deployment can
 *               choose this deliberately rather than by omission).
 *  · 'minors' — DEFAULT. Redact when the learner is a known minor (grade ≤
 *               MINOR_GRADE_CEILING). An unknown grade is not treated as a
 *               minor: doing so would redact every Library adult and empty
 *               the misconception corpus, which is a real cost, not a free
 *               safety margin.
 *  · 'strict' — Redact unless the learner is a known adult. Choose this when
 *               the deployment cannot vouch for its population's age. The
 *               residual risk under 'minors' — an under-16 learner using
 *               Library mode with no grade set — is exactly what this closes.
 */
export type RedactionMode = 'off' | 'minors' | 'strict'

/** Grade ≤ 10 ≈ age ≤ 16 (masterplan ISS-18: "default redact <16"). */
export const MINOR_GRADE_CEILING = 10

/** Read at call time (never cached) so the flag stays hot-swappable, matching
 *  readEosFlags' contract. Unset ⇒ 'minors': the protection is ON by default,
 *  and turning it off is the act that requires a decision. */
export function readRedactionMode(): RedactionMode {
  const raw = (process.env.REDACT_MINOR_VERBATIMS ?? '').trim().toLowerCase()
  if (raw === 'off' || raw === '0' || raw === 'false') return 'off'
  if (raw === 'strict' || raw === 'all') return 'strict'
  return 'minors'
}

/** Pure. Given the mode and what is known about the learner, may this
 *  learner's verbatim text be stored readable? */
export function shouldRedact(mode: RedactionMode, grade: number | null | undefined): boolean {
  if (mode === 'off') return false
  if (grade == null) return mode === 'strict'
  return grade <= MINOR_GRADE_CEILING
}

/**
 * The redacted form. Stable and deterministic: the same phrase always yields
 * the same token, so grouping survives; the token is prefixed so a reader can
 * never mistake it for text the learner wrote.
 *
 * Normalized (lowercased, whitespace-collapsed) before hashing so trivial
 * spacing differences do not fragment the buckets — the same normalization
 * learningAnalytics already applies when it keys by phrase.
 */
export function redactedToken(phrase: string): string {
  const normalized = phrase.trim().toLowerCase().replace(/\s+/g, ' ')
  return `redacted:${createHash('sha256').update(normalized).digest('hex').slice(0, 16)}`
}

/** The one call site helper: returns the string that may be persisted. Pure
 *  in (phrase, mode, grade) — the flag read is the caller's, so this stays
 *  testable without touching the environment. */
export function persistableVerbatim(
  phrase: string,
  opts: { grade: number | null | undefined; mode?: RedactionMode },
): string {
  return shouldRedact(opts.mode ?? readRedactionMode(), opts.grade)
    ? redactedToken(phrase)
    : phrase
}
