/**
 * PROBE OPTION QUALITY — a candidate-surfacing lint for one narrow shape of
 * MCQ authoring defect, NOT a corpus-wide pass/fail gate. Read this whole
 * header before adding a caller that treats a non-empty result as "broken".
 *
 * ── THE DEFECT THIS WAS BUILT FOR ───────────────────────────────────────────
 * Found in a live-account role-play QA session (2026-09-08),
 * `chem.elect.galvanic-cell`'s Nernst-`n` step_check probe:
 *
 *   correct:   "6 — the number of electrons ACTUALLY TRANSFERRED once the
 *               half-reactions are balanced against each other... n is not
 *               read off the coefficients of the species in the overall
 *               equation; it is the electron count that the two
 *               half-reactions had to share to cancel"
 *   incorrect: "3 — take the largest coefficient in the balanced equation
 *               as written, which is the 3 in front of Cu²⁺"
 *
 * A guessing learner could pick the first option because it reads like a
 * worked explanation, without knowing any chemistry. That probe was fixed
 * directly (see chemistrySeedAssets.ts, same commit) via the normal
 * authoring path. This module is what came out of trying to generalise the
 * fix into a reusable check — and what it found on the way is as much the
 * result as the code below.
 *
 * ── WHAT WAS MEASURED, AND WHY THIS IS NOT A HARD GATE ──────────────────────
 * Two broader rules were tried and DISCARDED after being run against the
 * real corpus (thousands of probes, every subject) rather than assumed to
 * work:
 *
 *  1. Length ratio alone (correct option > 2.2x the longest distractor):
 *     180 "violations", median correct-option length 105 characters — short
 *     numeric options ("6" vs "the number of grams...") where the ratio is
 *     real but meaningless. The exact "shape heuristic" trap this
 *     codebase's own validation.ts warns about in its vocative-detection
 *     comment.
 *  2. Length ratio + a "not X, but Y" cue: 47 violations, the overwhelming
 *     majority ordinary contrastive teaching prose ("does not overshoot,
 *     but takes longer"). "not...but" is the standard shape for teaching a
 *     distinction and carries no signal on its own.
 *
 * Narrowing to the cue set below (`actually`, `the reason`, `is not read
 * off`) plus a length ratio cuts this to ~19 candidates — and READING them
 * (not just counting them) showed most are NOT the reported defect: they are
 * `misconception_probe`/`step_check` items whose correct option explains a
 * mechanism and whose distractor states the misconception plainly — an
 * established, intentional, otherwise well-written authoring convention in
 * this corpus (see e.g. the SF4/lone-pair-geometry, water/hydrogen-bonding,
 * and Chromium/electron-configuration probes in chemistrySeedAssets.ts,
 * which read as genuinely good pedagogy despite matching the same shape as
 * the Nernst probe did). Asserting zero matches corpus-wide would therefore
 * either force rewriting dozens of good probes on a bot's say-so, or need
 * tuning so narrow it stops finding anything new — the same dead end four
 * separate iterations of this exact investigation reached. Recorded here so
 * a future session does not re-walk the same four iterations.
 *
 * ── WHAT THIS MODULE IS FOR, THEN ────────────────────────────────────────────
 * A precise, low-noise DETECTOR of the specific shape (self-referential
 * "not the obvious reading; it is the other one" language with no matching
 * distractor), for a human author to read and judge — not an automated
 * rewrite trigger and not a corpus-wide CI gate. `probeOptionQualityScan
 * .test.ts` runs it as a reporting pass, not an assertion of zero.
 *
 * ── WHAT IT DELIBERATELY DOES NOT DO ─────────────────────────────────────────
 * It does not judge whether the CONTENT is correct (mathematicsAssetContract
 * .test.ts's arithmetic re-derivation is a different, complementary check).
 * It does not touch grading, `correctIndex`, or any served payload — this is
 * an AUTHORING-TIME lint, run over the corpus, never over a live request.
 * It is scoped to single-correct-answer choice sets (every seed probe is);
 * a set with zero or more than one `isCorrect` entry is out of scope and
 * returns no findings — that shape is a different defect this module does
 * not own.
 */

export interface ProbeOptionLike {
  text: string
  isCorrect: boolean
}

export type ProbeOptionQualityReason = 'correct-option-self-justifying'

export interface ProbeOptionQualityFinding {
  reason: ProbeOptionQualityReason
  detail: string
}

/**
 * Phrases that argue FOR the option carrying them, typically against a named
 * alternative. Narrow and explanation-shaped on purpose — plain factual
 * language ("gains electrons", "increases with temperature") never matches,
 * and the broader "not X, but Y" contrastive shape was tried and dropped
 * (see the module header) because it matches ordinary good teaching prose.
 */
const JUSTIFICATION_CUES: RegExp[] = [
  /\bactually\b/i,
  /\bthe reason\b/i,
  /\bis not read off\b/i,
]

const CUE_LENGTH_RATIO_THRESHOLD = 1.6

function hasJustificationCue(text: string): boolean {
  return JUSTIFICATION_CUES.some((re) => re.test(text))
}

/**
 * Scan one choice set. Pure, synchronous, no I/O — safe to run over an
 * entire corpus in a test.
 */
export function checkProbeOptionBalance(
  choices: readonly ProbeOptionLike[],
): ProbeOptionQualityFinding[] {
  const findings: ProbeOptionQualityFinding[] = []
  const correct = choices.filter((c) => c.isCorrect)
  const incorrect = choices.filter((c) => !c.isCorrect)
  // Scoped to the standard single-answer shape every seed probe uses. A
  // choice set with 0 or >1 correct answers is a different defect class
  // (or not an MCQ at all) and is silently out of scope here.
  if (correct.length !== 1 || incorrect.length === 0) return findings

  const correctText = correct[0].text
  const correctLen = correctText.length
  const incorrectLens = incorrect.map((c) => c.text.length)
  const avgIncorrectLen = incorrectLens.reduce((a, b) => a + b, 0) / incorrectLens.length

  const correctHasCue = hasJustificationCue(correctText)
  const anyIncorrectHasCue = incorrect.some((c) => hasJustificationCue(c.text))

  if (correctHasCue && !anyIncorrectHasCue && correctLen > avgIncorrectLen * CUE_LENGTH_RATIO_THRESHOLD) {
    findings.push({
      reason: 'correct-option-self-justifying',
      detail:
        `the correct option (${correctLen} chars) uses self-referential justification language `
        + `("actually"/"the reason"/"is not read off") that no distractor uses, and is `
        + `${(correctLen / avgIncorrectLen).toFixed(1)}x the average distractor length `
        + `(${Math.round(avgIncorrectLen)} chars) — worth a human read, not an automatic rewrite`,
    })
  }

  return findings
}
