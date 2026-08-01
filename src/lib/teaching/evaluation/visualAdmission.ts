/**
 * WP-9 — Phase 2 Stages V3–V6, EVALUATED over recorded VisualIntent data.
 *
 *   V3  VD-1 admission test  — evaluated, never enforced
 *   V4  VisualIntent projection — landed in WP-7; audited here, not rebuilt
 *   V5  VD-7 fallback ladder — evaluated over the intent's own contract
 *   V6  VD-6 withdrawal probes + MG-1/MG-2 — evaluated over recorded evidence
 *
 * SHADOW ONLY. V3 is Phase 2's "first learner-visible change" when enforced;
 * this module returns verdicts and admits nothing, so no visual appears or
 * disappears because of it. Nothing in the runtime imports it.
 *
 * NEVER FABRICATE VISUAL EVIDENCE. The ten contraindications are HARD NOs
 * (§4.3), and a contraindication that was not recorded is UNKNOWN, never
 * cleared. An admission verdict computed against unknown contraindications
 * would assert safety nobody checked, so it is withheld.
 */
import type { VisualIntent } from '@/lib/teaching/visualIntent'

/** §4.3's enumerated contraindications. Each a hard no, not a preference. */
export const CONTRAINDICATIONS = ['N1','N2','N3','N4','N5','N6','N7','N8','N9','N10'] as const
export type ContraindicationCode = (typeof CONTRAINDICATIONS)[number]

export const CONTRAINDICATION_REASON: Record<ContraindicationCode, string> = {
  N1: 'The claim is definitional or conventional',
  N2: 'The visual would carry the answer the learner is currently owed',
  N3: 'Load is already at capacity',
  N4: 'An equivalent visual failed for this learner on this claim',
  N5: 'Assessment of unaided recall is in progress',
  N6: 'The learner is in RECOVERY',
  N7: 'Mastery target is symbolic fluency and the learner is at the symbolic rung',
  N8: 'The visual would be the learner\'s only route to the claim',
  N9: 'Accessibility profile precludes the channel with no equivalent alternative',
  N10: 'The turn is a CLOSING or SUMMARY act',
}

export type AdmissionVerdict = 'WOULD_ADMIT' | 'WOULD_REFUSE' | 'NOT_EVALUABLE'

export interface AdmissionResult {
  verdict: AdmissionVerdict
  /** The codes that fired. Empty on WOULD_ADMIT. */
  firedContraindications: ContraindicationCode[]
  /** Codes whose state was never recorded — the reason a verdict is withheld. */
  unknownContraindications: ContraindicationCode[]
  detail: string
  /** Invariant: this module admits nothing. */
  applied: false
}

export interface AdmissionInputs {
  intent: VisualIntent | null
  /** Recorded contraindication states. A code absent from this map is UNKNOWN,
   *  never cleared — §4.3 requires every no-visual outcome to carry its code,
   *  so silence is a gap in recording, not an all-clear. */
  contraindications?: Partial<Record<ContraindicationCode, boolean>>
}

/** V3 — VD-1's admission test, evaluated. */
export function evaluateAdmission(i: AdmissionInputs): AdmissionResult {
  const none = { firedContraindications: [], unknownContraindications: [], applied: false as const }

  if (i.intent === null) {
    return { ...none, verdict: 'NOT_EVALUABLE',
      detail: 'No VisualIntent recorded for this turn; admission is scored against an intent (§7.2).' }
  }
  if (i.contraindications === undefined) {
    return { ...none, verdict: 'NOT_EVALUABLE', unknownContraindications: [...CONTRAINDICATIONS],
      detail: 'No contraindication states recorded. All ten are UNKNOWN, and unknown is never cleared — a verdict here would assert safety nobody checked.' }
  }

  const fired: ContraindicationCode[] = []
  const unknown: ContraindicationCode[] = []
  for (const c of CONTRAINDICATIONS) {
    const state = i.contraindications[c]
    if (state === undefined) unknown.push(c)
    else if (state === true) fired.push(c)
  }

  if (fired.length > 0) {
    return { ...none, verdict: 'WOULD_REFUSE', firedContraindications: fired, unknownContraindications: unknown,
      detail: `Hard no: ${fired.map((c) => `${c} (${CONTRAINDICATION_REASON[c]})`).join('; ')}.` }
  }
  if (unknown.length > 0) {
    return { ...none, verdict: 'NOT_EVALUABLE', unknownContraindications: unknown,
      detail: `No contraindication fired, but ${unknown.length} were never recorded. Default is no (§4.3), so an admit verdict is not assertable.` }
  }
  return { ...none, verdict: 'WOULD_ADMIT',
    detail: 'All ten contraindications recorded and clear; the intent carries a purpose and a claim.' }
}

// ── V4 audit — the projection landed in WP-7; this checks it, not rebuilds it ──

export interface ProjectionAudit {
  hasPurpose: boolean
  hasClaim: boolean
  /** VI-2: the intent is the sole interface. A renderer name here would mean
   *  the tier boundary leaked. */
  leaksProductionIdentifier: boolean
  detail: string
}

const RENDERER_NAMES = ['scene_spec', 'visual_spec', 'dynamic_component', 'interactive_widget']

export function auditProjection(intent: VisualIntent | null): ProjectionAudit {
  if (intent === null) {
    return { hasPurpose: false, hasClaim: false, leaksProductionIdentifier: false, detail: 'No intent recorded.' }
  }
  const blob = JSON.stringify(intent).toLowerCase()
  return {
    hasPurpose: typeof intent.purpose === 'string' && intent.purpose.length > 0,
    hasClaim: typeof intent.claim === 'string' && intent.claim.trim().length > 0,
    leaksProductionIdentifier: RENDERER_NAMES.some((r) => blob.includes(r)),
    detail: 'V4 audit of the WP-7 projection; nothing rebuilt.',
  }
}

// ── V5 — VD-7's fallback ladder ─────────────────────────────────────────────

export type FallbackVerdict = 'AUTHORIZED' | 'UNAUTHORIZED_DEGRADATION' | 'NOT_EVALUABLE'

export interface FallbackResult {
  verdict: FallbackVerdict
  detail: string
  applied: false
}

/**
 * V5. The contract is decided ABOVE and executed BELOW: the production tier
 * must not improvise a degradation, because it lacks the pedagogical context
 * to know which loss is acceptable. So a fallback that was taken is legal only
 * if the intent authorized it.
 */
export function evaluateFallback(
  intent: VisualIntent | null,
  fallbackTaken: string | null,
): FallbackResult {
  if (intent === null) {
    return { verdict: 'NOT_EVALUABLE', detail: 'No intent recorded; the authorized ladder is unknown.', applied: false }
  }
  if (fallbackTaken === null) {
    return { verdict: 'NOT_EVALUABLE', detail: 'No fallback recorded for this turn.', applied: false }
  }
  const contract = intent.fallbackContract
  if (contract === undefined) {
    return { verdict: 'NOT_EVALUABLE', detail: 'The intent declared no fallbackContract; an unstated ladder authorizes nothing and forbids nothing.', applied: false }
  }
  return (contract as readonly string[]).includes(fallbackTaken)
    ? { verdict: 'AUTHORIZED', detail: `${fallbackTaken} is in the intent's authorized ladder.`, applied: false }
    : { verdict: 'UNAUTHORIZED_DEGRADATION', detail: `${fallbackTaken} is not in the intent's authorized ladder — an improvised degradation (VD-7).`, applied: false }
}

// ── V6 — withdrawal probes and mastery gates MG-1/MG-2 ──────────────────────

export type GateVerdict = 'PASS' | 'FAIL' | 'NOT_EVALUABLE'

export interface WithdrawalResult {
  /** MG-1: no gate passed with a supporting visual present. */
  mg1: GateVerdict
  /** MG-2: simulation success re-verified outside the sim. */
  mg2: GateVerdict
  detail: string
  /** MG-3: Phase 2 never certifies mastery — `C-29` does. Always false here. */
  certifiesMastery: false
}

export interface WithdrawalInputs {
  /** Was a supporting visual present when the gate was attempted? Undefined
   *  when unrecorded. */
  visualPresentAtGate?: boolean
  /** Did the learner pass the gate? Undefined when unrecorded. */
  gatePassed?: boolean
  /** Was a simulation success re-verified outside the simulation? */
  reverifiedOutsideSim?: boolean
  /** Was the success obtained inside a simulation at all? */
  successInsideSim?: boolean
}

export function evaluateWithdrawal(i: WithdrawalInputs): WithdrawalResult {
  let mg1: GateVerdict = 'NOT_EVALUABLE'
  if (i.gatePassed !== undefined && i.visualPresentAtGate !== undefined) {
    // A pass with the visual still present does not satisfy MG-1.
    mg1 = i.gatePassed && i.visualPresentAtGate ? 'FAIL' : 'PASS'
  }

  let mg2: GateVerdict = 'NOT_EVALUABLE'
  if (i.successInsideSim === false) mg2 = 'PASS'                      // MG-2 does not apply
  else if (i.successInsideSim === true && i.reverifiedOutsideSim !== undefined) {
    mg2 = i.reverifiedOutsideSim ? 'PASS' : 'FAIL'
  }

  return {
    mg1, mg2, certifiesMastery: false,
    detail: 'V6 evaluated over recorded evidence. Phase 2 never certifies mastery — `C-29` does (MG-3).',
  }
}
