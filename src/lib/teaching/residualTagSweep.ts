/**
 * LAST LINE OF DEFENCE — no machine markup ever reaches a learner.
 *
 * ── THE DEFECT THIS EXISTS FOR (observed live, 2026-08-16) ──────────────────
 * A real production turn on a real account ended with this in the chat bubble,
 * and it was saved to the message history, so it came back on every reload:
 *
 *   <!--ATMPT channel="verbal" representation="narrative" … -->
 *   <!--OBSERVATION signal="false" confidence="low" confusion="true" phrase="A"-->
 *
 * The prompts ask the model for `<!--ATTEMPT …-->` (attemptVectorSignal.ts) and
 * `<!--SIGNAL …-->` (signals.ts). The parsers match exactly those names. The
 * model abbreviated one to ATMPT and renamed the other to OBSERVATION — it even
 * renamed the attribute `correctness` to `signal`. No parser keyed to a tag
 * NAME can ever recover from the model choosing a different name.
 *
 * That has two costs, and the quiet one is worse:
 *   (1) raw markup in front of a learner, persisted;
 *   (2) the signal is never parsed, so PROBE_OUTCOME / MISCONCEPTION_DETECTED
 *       and the attempt vector are silently not written for that turn. The
 *       evidence spine records nothing and every count still looks healthy.
 *
 * This module cannot fix (2) — a misnamed tag carries no recoverable contract,
 * and guessing at one would fabricate evidence, which is worse than losing it.
 * It fixes (1) absolutely, for every tag family, including ones not invented
 * yet.
 *
 * ── SCOPE, MEASURED ────────────────────────────────────────────────────────
 * Across all 1,986 assistant messages in production (2026-07-08 → 2026-08-16),
 * 9 contain raw `<!--` markup — 0.45%. They are not one bug but five families:
 *   4 × <!--SIGNAL …/>   ← CORRECTLY named and still leaked
 *   2 × <!--MCQ q="…"-->
 *   1 × <!--VISUAL type="three_crystal_lattice"-->
 *   1 × <!--LESSON_COMPLETE-->
 *   1 × <!--ATMPT-->/<!--OBSERVATION-->
 * So name-specific parsers are necessary but demonstrably not sufficient. This
 * runs AFTER all of them, deletes only what they left behind, and is the reason
 * a sixth family cannot become a sixth incident.
 *
 * ── WHY A BLANKET SWEEP IS SAFE HERE ───────────────────────────────────────
 * Checked before writing it: no client feature reads `<!--` out of chat text.
 * The MCQ wizard renders from the separate `mcq` JSON field, visuals from
 * `visual`/`sceneSpec`/`visualSpec`. LessonScreen already strips stray SIGNAL
 * tags client-side (defence in depth) — the codebase already treats residual
 * tags as garbage, not content. The one `<!--` literal in the client is a
 * placeholder inside the CODE EDITOR's default document, which never passes
 * through here.
 */

/**
 * Machine tags are SHOUTED: ATTEMPT, SIGNAL, MCQ, VISUAL, LESSON_COMPLETE,
 * ATMPT, OBSERVATION. Requiring an uppercase opening token of three or more
 * characters catches every family seen and any plausible future one, while
 * leaving an ordinary lowercase HTML comment alone — this deletes text from a
 * learner's message, so it should delete only what is unmistakably markup.
 */
const MACHINE_TAG_RE = /<!--\s*[A-Z][A-Z0-9_]{2,}\b[\s\S]*?(?:-->|\/>)/g

/**
 * An UNTERMINATED tag at the very end — the model ran out of tokens mid-tag.
 * attemptVectorSignal.ts documents the same hazard for its own tag and resolves
 * it the same way: a visible `<!--ATTEMPT` fragment is worse than over-deleting
 * a trailing line that was never prose to begin with. Anchored to end-of-text
 * so it can only ever eat the tail.
 */
const UNTERMINATED_TRAILING_RE = /\n?[ \t]*<!--\s*[A-Z][A-Z0-9_]{2,}\b[^>]*$/

/**
 * Remove any machine markup the named parsers left behind.
 *
 * Total: never throws, and never returns null/undefined for a string input.
 * Idempotent, and applied repeatedly until stable so that a tag reconstructed
 * by the removal of an overlapping one cannot survive — the same nesting
 * hazard attemptVectorSignal.ts guards against.
 */
export function stripResidualMachineTags(text: string): string {
  if (typeof text !== 'string' || !text.includes('<!--')) return text
  let out = text
  for (let pass = 0; pass < 4; pass++) {
    const next = out.replace(MACHINE_TAG_RE, '')
    if (next === out) break
    out = next
  }
  out = out.replace(UNTERMINATED_TRAILING_RE, '')
  // Collapse the blank-line crater a removed tag block leaves mid-message.
  out = out.replace(/\n{3,}/g, '\n\n')
  return out.trimEnd()
}

/** True when the text still carries machine markup. For assertions and tests. */
export function hasResidualMachineTag(text: string): boolean {
  return typeof text === 'string' && /<!--\s*[A-Z][A-Z0-9_]{2,}\b/.test(text)
}
