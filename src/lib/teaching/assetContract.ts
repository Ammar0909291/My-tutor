/**
 * THE ASSET CONTRACT — what a concept must hold before a lesson on it can
 * reliably certify.
 *
 * ── WHY A CONTRACT EXISTS AT ALL ────────────────────────────────────────────
 * Measured 2026-08-18 against production, all 43 mathematics concepts that
 * currently serve content:
 *
 *     closed-choice authored probes per concept
 *       1 probe  ->  3 concepts
 *       2 probes -> 40 concepts
 *       3 probes ->  0 concepts
 *
 * Mastery needs THREE server-graded correct answers (`correctAtCheck >= 1` and
 * `correctAtPractice >= 2`), and the gate never re-asks a probe it has already
 * spent (`excludeProbeStem`). So a two-probe concept runs its pool dry before
 * the bar is met, every time, for every learner. The turn is then handed to the
 * model, whose `<!--MCQ-->` tag is an advisory prompt rule — and when it writes
 * prose options instead, `shouldSuppressSignalCorrectness` correctly refuses to
 * record correctness for a question with no server answer key.
 *
 * The learner's answer is right, and nothing counts it. Observed end to end on
 * `math.found.logic`: three correct answers after the pool ran dry, all
 * ungraded, the lesson unable to close.
 *
 * This module states the inventory that makes that impossible, so it can be
 * asserted by the generator, by validation, and by the certification harness
 * from ONE definition rather than three drifting copies.
 *
 * ── WHY THREE, AND NOT A ROUNDER NUMBER ─────────────────────────────────────
 * Three is the mastery bar itself (1 at CHECK + 2 at PRACTICE), not a margin
 * chosen for comfort. It is the minimum that lets a PERFECT learner finish
 * without the model volunteering anything. It is deliberately NOT padded for a
 * learner who answers wrongly: a wrong answer should cost a probe and route to
 * remediation, which is what the escalation machinery is for.
 *
 * Physics already meets it (745 closed-choice probes across 238 concepts,
 * ~3.13 each), which is the proof that the shortfall in mathematics, chemistry
 * and english is a property of the seed template that produced them, not of
 * the subject matter.
 *
 * ── WHAT THIS MODULE IS NOT ─────────────────────────────────────────────────
 * It does not lower, raise or reinterpret the mastery bar — it reads the bar
 * and states the inventory required to REACH it. It grades nothing, selects
 * nothing and writes nothing.
 *
 * Open-recall (short_answer) probes are counted and reported, never converted
 * and never substituted for a closed-choice probe. They are real teaching
 * assets served as prose follow-ups by `assembleLesson`; they simply cannot
 * carry a mastery gate, because correctness for free text has no deterministic
 * source.
 */

/**
 * Bumped whenever the required inventory changes. Stored alongside a concept's
 * certification so a PASS always names the contract that granted it — a
 * certification is only meaningful against a stated version.
 */
export const ASSET_CONTRACT_VERSION = 'v1'

/** At least one explanation the tutor can teach from, at the learner's band. */
export const MIN_EXPLANATIONS = 1

/**
 * Three: `correctAtCheck >= 1` plus `correctAtPractice >= 2`, with no re-asking.
 * See the header for why this is the bar rather than a margin.
 */
export const MIN_CLOSED_CHOICE_PROBES = 3

/** What a concept actually holds, at one band. Counts of ACTIVE assets only. */
export interface ConceptAssetInventory {
  explanations: number
  /** Probes with >= 2 authored choices — the only kind a gate can grade. */
  closedChoiceProbes: number
  /** Recorded for completeness; never counted toward the gate requirement. */
  openRecallProbes?: number
}

export interface AssetContractVerdict {
  satisfied: boolean
  version: string
  /** How many of each are still missing. Zero when satisfied. */
  missingExplanations: number
  missingClosedChoiceProbes: number
  /** One line naming what is short, or null when satisfied. */
  shortfall: string | null
}

/**
 * Does this inventory meet the contract? Pure, total, and defensive about its
 * input: a negative or non-finite count is treated as zero, so a corrupt
 * reading reports a shortfall rather than silently certifying a concept.
 */
export function evaluateAssetContract(inventory: ConceptAssetInventory): AssetContractVerdict {
  const count = (n: number | undefined): number =>
    typeof n === 'number' && Number.isFinite(n) && n > 0 ? Math.floor(n) : 0

  const missingExplanations = Math.max(0, MIN_EXPLANATIONS - count(inventory.explanations))
  const missingClosedChoiceProbes = Math.max(
    0,
    MIN_CLOSED_CHOICE_PROBES - count(inventory.closedChoiceProbes),
  )
  const satisfied = missingExplanations === 0 && missingClosedChoiceProbes === 0

  const parts: string[] = []
  if (missingExplanations > 0) parts.push(`${missingExplanations} explanation`)
  if (missingClosedChoiceProbes > 0) {
    parts.push(`${missingClosedChoiceProbes} closed-choice probe${missingClosedChoiceProbes === 1 ? '' : 's'}`)
  }

  return {
    satisfied,
    version: ASSET_CONTRACT_VERSION,
    missingExplanations,
    missingClosedChoiceProbes,
    shortfall: parts.length > 0 ? `short ${parts.join(' and ')}` : null,
  }
}

/**
 * Can a concept with this inventory reach mastery WITHOUT the model
 * volunteering a question? The one property the contract exists to guarantee,
 * named separately because it is what the certification harness asserts.
 */
export function canCertifyWithoutModelCompliance(inventory: ConceptAssetInventory): boolean {
  return evaluateAssetContract(inventory).satisfied
}
