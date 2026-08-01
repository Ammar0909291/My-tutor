/**
 * WP-8 / AH-11 — Phase 3's pressure and governor rules, authored in the
 * EXISTING policy pack's format.
 *
 * AH-11: "Phase 3's pressure and governor rules are authored into the existing
 * policy pack (`kernel/policy/basePack.ts`'s format, at Bands 2/4/5), NOT into
 * a new evaluator. Which wiring frame governs at implementation time — the EOS
 * band pipeline or the live pre-EOS prompt-assembly path — is the runtime
 * owner's sequencing decision, not an assumption of this document."
 *
 * Both halves are honoured literally:
 *
 *  · FORMAT, NOT A NEW EVALUATOR. Every rule below is a `Rule` from
 *    `kernel/policy/types.ts`, built with the same shape `basePack.ts` uses —
 *    ruleId, band, citation, guard{reads,match,describe}, effect, specificity.
 *    No second evaluator, no parallel rule type, no new matcher.
 *
 *  · WIRING IS THE OWNER'S CALL, SO NOTHING IS WIRED. These rules are exported
 *    as a pack fragment and are NOT merged into `basePack`. Merging them is the
 *    act that would let them govern a turn, and WP-8 is shadow-first. Nothing
 *    imports this module into the pack, so no rule can fire.
 *
 * BAND DISCIPLINE. Band 2 is legality and is SUBTRACTIVE only — Phase 3 §25.4:
 * no stage may "add a decision authority" or "make an illegal action legal".
 * The Band 2 rule below only ever contributes `bannedMoves`. Bands 4 and 5 are
 * selection and personalization surfaces, where the existing pack already
 * carries the D1 grid and beginner tuning.
 *
 * NO NUMBERS. Every guard tests availability and shape, never a threshold:
 * §19.3 publishes no numbers, and a threshold hardcoded here would be exactly
 * the "constants must not ship hardcoded" violation §25.3 forbids. Thresholds
 * arrive from `governor.ts` at evaluation time, or the rule stays inert.
 */
import type { PolicyInputs, Rule } from '@/lib/kernel/policy/types'

const P = (
  id: string,
  band: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  citation: string,
  guard: Rule['guard'],
  effect: Rule['effect'],
  opts: { specificity: number; mandatory?: boolean },
): Rule => ({
  ruleId: id, band, citation, guard, effect,
  specificity: opts.specificity, mandatory: opts.mandatory ?? false,
})

// ── Band 2 — legality (subtractive only) ────────────────────────────────────

/**
 * Recovery preempts adaptation. §25.4: no stage may "override the affect veto".
 * While an interrupt is active the governor must not be moving dials, so the
 * adaptation-bearing moves are removed from the candidate set — a subtraction,
 * never a grant.
 */
const b2AdaptationSuspendedInRecovery = P(
  'B2.phase3.adaptation.suspended-in-recovery.v1', 2,
  'Phase 3 §25.4 (affect veto) + foundations/01 §3',
  {
    reads: ['interruptActive'],
    match: (i: PolicyInputs) => i.interruptActive === true,
    describe: 'interrupt active — adaptation suspended',
  },
  { bannedMoves: ['ADAPT_DIFFICULTY' as never] },
  { specificity: 2 },
)

// ── Band 4 — selection pressure ─────────────────────────────────────────────

/**
 * D4 PACE / D5 LOAD pressure — S3's two dials, and the only two S3 covers.
 * The guard fires on a state the pack already carries; the EFFECT names no
 * number, because the element budget belongs to `governor.d5.elementBudget.max`
 * in the policy store. With that constant unset the stage is inert, which is
 * why this rule contributes a marker rather than a value.
 */
const b4PaceLoadPressure = P(
  'B4.phase3.pressure.pace-load.v1', 4,
  'Phase 3 §9 (D4 PACE, D5 LOAD) + §25.2 S3',
  {
    reads: ['consecutiveFailures', 'lastSignalCorrect'],
    match: (i: PolicyInputs) => i.consecutiveFailures > 0 || i.lastSignalCorrect === false,
    describe: 'recent failure — pace/load pressure toward consolidation',
  },
  { actionClass: 'PHASE3_PRESSURE_PACE_LOAD' },
  { specificity: 1 },
)

// ── Band 5 — personalization surface ────────────────────────────────────────

/**
 * D1 SCAFFOLD hold. §10.3's phase clamps bound the scaffold, and S4's rule is
 * that scaffold is COMPUTED but never changed at this stage. The effect
 * therefore carries a representation marker only; it moves no dial.
 */
const b5ScaffoldHold = P(
  'B5.phase3.scaffold.hold.v1', 5,
  'Phase 3 §9 (D1 SCAFFOLD) + §25.2 S4 + EOS_V2_RUNTIME_SPECIFICATION §3.4',
  {
    reads: ['phase', 'demonstrated'],
    match: (i: PolicyInputs) => i.demonstrated === true,
    describe: 'demonstrated — scaffold recommendation computable, not applied',
  },
  { representation: 'PHASE3_SCAFFOLD_HOLD' },
  { specificity: 1 },
)

/**
 * The pack fragment. Exported, and deliberately NOT registered: wiring is the
 * runtime owner's sequencing decision per AH-11, and registering it would end
 * shadow mode.
 */
export const PHASE3_GOVERNOR_RULES: readonly Rule[] = [
  b2AdaptationSuspendedInRecovery,
  b4PaceLoadPressure,
  b5ScaffoldHold,
]

/** Every rule cites the document that authored it, as `basePack.ts` requires. */
export function rulesCiteTheirSource(): boolean {
  return PHASE3_GOVERNOR_RULES.every((r) => r.citation.trim().length > 0)
}

/** Bands 2/4/5 only, per AH-11. Anything else would be a band this handoff
 *  does not authorise. */
export function rulesAreInAuthorisedBands(): boolean {
  return PHASE3_GOVERNOR_RULES.every((r) => r.band === 2 || r.band === 4 || r.band === 5)
}

/** Band 2 contributions must be subtractive — §25.4's "no stage may make an
 *  illegal action legal". */
export function band2IsSubtractiveOnly(): boolean {
  return PHASE3_GOVERNOR_RULES
    .filter((r) => r.band === 2)
    .every((r) => {
      const keys = Object.keys(r.effect)
      return keys.length > 0 && keys.every((k) => k === 'bannedMoves')
    })
}
