/**
 * K4 — TSM: transition logic (RS §5.2 concept-layer table).
 *
 * Pure state machine. Given a machine state + this turn's evidence, returns
 * the next state. Every upward edge is evidence-gated; failures drop one
 * step (floor DEMONSTRATE once demonstrated); recovery preempts and exits
 * one below entry.
 *
 * STATUS, corrected by the final audit. This module has NO callers — not in
 * production, not behind a flag, not in tests. An earlier version of this
 * header claimed it "runs alongside behind ENABLE_POLICY_PACKS and its
 * outputs feed the Policy Engine"; that was never true, and the policy path
 * that DID ship (eos-runtime/policyGate) reads the legacy phase verbatim
 * because BASE_PACK's guards accept both vocabularies.
 *
 * It is retained rather than deleted because it is the declared landing pad
 * for the masterplan's K3 item "conversationState.ts → kernel/tsm.ts (with
 * state migration)" — the work that unifies the 6-phase and 10-state
 * ladders. Until that migration runs, treat this as a specification of the
 * target machine, not as live code.
 *
 * `./phases.ts` beside it IS live: basePack imports getStageCeiling from it.
 *
 * ⚠ DO NOT WIRE THIS AS THE LIVE LADDER. BLOCKED — see
 * `docs/architecture/ISS_01_LADDER_RECONCILIATION.md` and the exhaustive
 * evidence in `src/tests/ladderConformance.test.ts`.
 *
 * The `phases.ts` mapping round-trips to identity, which makes promoting
 * this machine look mechanical. It is not. Three verified defects:
 *
 *   D1  The mapping INVERTS the CHECK/PRACTICE order relation (legacy CHECK
 *       precedes PRACTICE; canonical ASSESS(8) follows INDEPENDENT(6)) —
 *       and order is what every ±1 transition below is computed from.
 *   D2  This machine and the legacy ladder write the SAME fields
 *       (correctAtCheck / correctAtPractice) under INVERTED thresholds.
 *       Walking this ladder to TRANSFER yields check=2/practice=1, but
 *       masteryGate requires check>=1/practice>=2 — so promoting this
 *       machine would make masteryVerified() permanently false and NO
 *       LESSON COULD EVER COMPLETE. Silent: no throw, no type error.
 *   D3  7 of 12 transitions diverge from the shipping ladder, including
 *       CHECK+correct → TRANSFER (skips practice entirely).
 *
 * These are a pedagogical decision (formative check vs summative gate), not
 * a refactor. Resolve ISS-01 first; the exit criteria are in §5 of that doc.
 */
import { legacyToCanonical, PHASE_ORDER_10, type CanonicalPhase } from './phases'

export interface MachineState {
  phase: CanonicalPhase
  scaffoldDial: 0 | 1 | 2 | 3 | 4
  demonstrated: boolean
  namedGate: boolean          // learner restated in own words at NAME
  formulaAnchored: boolean    // for concepts with FORMALIZE
  correctAtCheck: number
  correctAtPractice: number
  consecutiveFailuresAtPhase: number
  representationChanges: number
}

export interface TurnEvidence {
  signalCorrect: boolean | null
  signalConfidence: 'low' | 'medium' | 'high' | null
  recoveryFired: boolean
  learnerRestated: boolean    // own-words gate (NAME→FORMALIZE/GUIDED)
}

export interface TransitionResult {
  from: CanonicalPhase
  to: CanonicalPhase
  direction: 'up' | 'down' | 'lateral' | 'none'
  gate: string                // authoring citation for provenance
}

export function initialMachineState(entryPhase: CanonicalPhase = 'ANCHOR'): MachineState {
  return {
    phase: entryPhase, scaffoldDial: 0,
    demonstrated: false, namedGate: false, formulaAnchored: false,
    correctAtCheck: 0, correctAtPractice: 0,
    consecutiveFailuresAtPhase: 0, representationChanges: 0,
  }
}

/** Read from legacy 6-phase persisted state — the bridge that lets K4 run
 *  alongside conversationState.ts without duplicating state (masterplan
 *  §K3 discipline: "Do not duplicate state"). */
export function machineFromLegacy(legacyPhase: string, opts: { demonstrated?: boolean; consecutiveFailures?: number } = {}): MachineState {
  const canonical = legacyToCanonical(legacyPhase)
  return {
    ...initialMachineState(canonical),
    demonstrated: opts.demonstrated ?? (canonical !== 'ANCHOR' && canonical !== 'DIAGNOSE'),
    consecutiveFailuresAtPhase: opts.consecutiveFailures ?? 0,
  }
}

function phaseIndex(p: CanonicalPhase): number {
  return PHASE_ORDER_10.indexOf(p)
}

function phaseAt(idx: number): CanonicalPhase {
  const clamped = Math.max(0, Math.min(PHASE_ORDER_10.length - 1, idx))
  return PHASE_ORDER_10[clamped]
}

/** The floor for a downward transition (RS §5.2: once DEMONSTRATE has
 *  occurred, floor = DEMONSTRATE; ANCHOR only re-entered on long decay). */
function downFloor(state: MachineState): CanonicalPhase {
  return state.demonstrated ? 'DEMONSTRATE' : 'ANCHOR'
}

/** Advance the machine by one turn's evidence. Pure. */
export function step(state: MachineState, ev: TurnEvidence): { state: MachineState; result: TransitionResult } {
  const from = state.phase

  // Recovery preempts (RS §5.1 Layer-3): drop one step below entry, floor rules.
  if (ev.recoveryFired) {
    const floorIdx = phaseIndex(downFloor(state))
    const dropped = phaseAt(Math.max(floorIdx, phaseIndex(from) - 1))
    return {
      state: { ...state, phase: dropped, consecutiveFailuresAtPhase: state.consecutiveFailuresAtPhase + 1 },
      result: { from, to: dropped, direction: dropped === from ? 'lateral' : 'down', gate: 'RS §5.1 Layer-3 recovery preempt' },
    }
  }

  // Failure drops exactly one state (one-dimension-per-rung law).
  if (ev.signalCorrect === false) {
    const floorIdx = phaseIndex(downFloor(state))
    const dropped = phaseAt(Math.max(floorIdx, phaseIndex(from) - 1))
    return {
      state: { ...state, phase: dropped, consecutiveFailuresAtPhase: state.consecutiveFailuresAtPhase + 1 },
      result: { from, to: dropped, direction: dropped === from ? 'lateral' : 'down', gate: 'RS §5.2 failure → drop one' },
    }
  }

  // Success at appropriate phase advances one step (evidence gates).
  if (ev.signalCorrect === true) {
    let next = state
    let gate = 'no-advance'
    switch (from) {
      case 'DIAGNOSE':
        next = { ...state, phase: 'ANCHOR' }
        gate = 'diagnose → anchor: placement resolved'
        break
      case 'ANCHOR':
        next = { ...state, phase: 'DEMONSTRATE', demonstrated: true }
        gate = 'anchor → demonstrate: substantive engagement'
        break
      case 'DEMONSTRATE':
        next = { ...state, phase: 'NAME' }
        gate = 'demonstrate → name: instances shown, prediction correct'
        break
      case 'NAME':
        if (ev.learnerRestated) {
          next = { ...state, phase: 'FORMALIZE', namedGate: true }
          gate = 'name → formalize: own-words restatement'
        } else {
          gate = 'name held: awaiting own-words gate'
        }
        break
      case 'FORMALIZE':
        next = { ...state, phase: 'GUIDED', formulaAnchored: true }
        gate = 'formalize → guided: formula anchored'
        break
      case 'GUIDED': {
        // Fluency gate — approximated in K4 v1 as high stated confidence.
        const fluent = ev.signalConfidence !== 'low'
        if (fluent) { next = { ...state, phase: 'INDEPENDENT' }; gate = 'guided → independent: fluent success' }
        else gate = 'guided held: hesitant success (FRAGILE hold)'
        break
      }
      case 'INDEPENDENT': {
        const nCheck = state.correctAtCheck + 1
        if (nCheck >= 2) { next = { ...state, phase: 'REFLECT', correctAtCheck: nCheck }; gate = 'independent → reflect: ≥2 unaided correct' }
        else { next = { ...state, correctAtCheck: nCheck }; gate = 'independent held: 1 of 2 unaided correct' }
        break
      }
      case 'REFLECT':
        next = { ...state, phase: 'ASSESS' }
        gate = 'reflect → assess'
        break
      case 'ASSESS': {
        const nPr = state.correctAtPractice + 1
        if (nPr >= 1) { next = { ...state, phase: 'TRANSFER', correctAtPractice: nPr }; gate = 'assess → transfer: gate item passed' }
        else { next = { ...state, correctAtPractice: nPr }; gate = 'assess held' }
        break
      }
      case 'TRANSFER':
        gate = 'transfer: certification eligible; Mastery module owns exit'
        break
    }
    const direction: TransitionResult['direction'] =
      next.phase === from ? 'none' :
      phaseIndex(next.phase) > phaseIndex(from) ? 'up' : 'down'
    return {
      state: { ...next, consecutiveFailuresAtPhase: 0 },
      result: { from, to: next.phase, direction, gate },
    }
  }

  // Null signal (unanswered / no-signal turn): no advancement.
  return {
    state,
    result: { from, to: from, direction: 'none', gate: 'no signal — machine held' },
  }
}
