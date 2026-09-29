/**
 * What a learner did with a simulation, kept in memory in the browser only
 * (ADR 16, §7). A pure reducer; the component holds the log in React state.
 *
 * ── FOUR KINDS OF RECORD, NEVER MERGED ──────────────────────────────────────
 *   prediction      what the learner expected, before running (or a skip)
 *   action          what they pressed or set
 *   observation     what a run actually showed (readouts at a tick)
 *   interpretation  what a FAIR pair of runs says about a prediction
 *
 * A click is not understanding and a run is not a conclusion; keeping these
 * apart is what stops one being mistaken for the other.
 *
 * ── AN INTERPRETATION NEEDS A FAIR TEST ─────────────────────────────────────
 * An interpretation is derived only from two runs that differ in the
 * prediction's `vary` quantity and agree on every `holdConstant` one — the
 * control-of-variables rule. Its `observedRelation` comes from the MEASURED
 * values of those runs; `matchedPrediction` compares the learner's choice with
 * what the runs showed. No answer key is consulted, nothing is scored, and a
 * learner who made no prediction gets `null`, never "wrong".
 *
 * ── THE BOUNDARY ────────────────────────────────────────────────────────────
 * Nothing here is an EvidenceEvent, a PROBE_OUTCOME, mastery, progress or a
 * Tutor Max input, and this module never persists or sends anything. Wiring
 * any of it to the server is a separate, future decision (ADR 16, gate G5).
 */

import type { SceneParams, SimPrediction, SimReadout, SimRelation } from './parametricScenes'

export type SimAction = 'set' | 'run' | 'pause' | 'step' | 'reset'

export type SimEvent =
  | { kind: 'prediction'; id: string; at: number; predictionId: string; choice: number | null }
  | { kind: 'action'; id: string; at: number; action: SimAction; params: SceneParams }
  | { kind: 'observation'; id: string; at: number; runId: string; params: SceneParams; tick: number; readouts: SimReadout[]; terminal: boolean }
  | {
      kind: 'interpretation'; id: string; at: number; predictionId: string
      runIds: [string, string]; varyRatio: number; measureRatio: number
      observedRelation: SimRelation | null; matchedPrediction: boolean | null
    }

export interface SimEvidenceLog {
  events: readonly SimEvent[]
}

export type SimEvidenceInput =
  | { kind: 'prediction'; at: number; predictionId: string; choice: number | null }
  | { kind: 'action'; at: number; action: SimAction; params: SceneParams }
  | { kind: 'observation'; at: number; runId: string; params: SceneParams; tick: number; readouts: SimReadout[]; terminal: boolean }

export const EMPTY_SIM_EVIDENCE: SimEvidenceLog = { events: [] }

/** Relative tolerance for "these two values are the same". */
const SAME = 1e-6
/** Relative tolerance for "this ratio is the varied ratio (or its inverse)". */
const RATIO_TOLERANCE = 0.02

const sameValue = (a: unknown, b: unknown): boolean =>
  typeof a === 'number' && typeof b === 'number'
    ? Math.abs(a - b) <= SAME * Math.max(1, Math.abs(a), Math.abs(b))
    : a === b

const near = (x: number, target: number): boolean =>
  Math.abs(x - target) <= RATIO_TOLERANCE * Math.max(1, Math.abs(target))

/**
 * How the measured quantity moved relative to the varied one. `null` when the
 * pair shows none of the three clean relations (not a fair reading).
 */
export function relationOf(varyRatio: number, measureRatio: number): SimRelation | null {
  if (!Number.isFinite(varyRatio) || !Number.isFinite(measureRatio) || varyRatio <= 0 || measureRatio <= 0) return null
  if (near(measureRatio, 1)) return 'unchanged'
  if (near(measureRatio, varyRatio)) return 'proportional'
  if (near(measureRatio, 1 / varyRatio)) return 'inverse'
  return null
}

const readout = (o: Extract<SimEvent, { kind: 'observation' }>, key: string): number | null => {
  const r = o.readouts.find((x) => x.key === key)
  return r && Number.isFinite(r.value) ? r.value : null
}

/** The latest observation of each run that can be measured for `measure`. */
function latestMeasurableByRun(events: readonly SimEvent[], measure: string) {
  const byRun = new Map<string, Extract<SimEvent, { kind: 'observation' }>>()
  for (const e of events) {
    if (e.kind === 'observation' && readout(e, measure) !== null) byRun.set(e.runId, e)
  }
  return [...byRun.values()]
}

/** The learner's latest prediction for this id (a later choice replaces an earlier one). */
function latestPrediction(events: readonly SimEvent[], predictionId: string) {
  let found: Extract<SimEvent, { kind: 'prediction' }> | null = null
  for (const e of events) if (e.kind === 'prediction' && e.predictionId === predictionId) found = e
  return found
}

/**
 * Record one input and derive any interpretation it makes newly possible.
 * Pure: the same log and input always give the same log.
 */
export function recordSimEvidence(
  log: SimEvidenceLog,
  input: SimEvidenceInput,
  predictions: readonly SimPrediction[],
): SimEvidenceLog {
  const seq = log.events.length
  const recorded: SimEvent = { ...input, id: `${input.kind}-${seq}` } as SimEvent
  const events: SimEvent[] = [...log.events, recorded]
  if (recorded.kind !== 'observation') return { events }

  for (const prediction of predictions) {
    const { vary, holdConstant, measure } = prediction.tests
    const latest = latestMeasurableByRun(events, measure)
    const current = latest.find((o) => o.runId === recorded.runId)
    if (!current) continue
    const already = new Set(
      events
        .filter((e): e is Extract<SimEvent, { kind: 'interpretation' }> => e.kind === 'interpretation' && e.predictionId === prediction.id)
        .map((e) => e.runIds.join('|')),
    )
    // Pair the run just observed with the most recent earlier run that makes a fair test.
    for (let i = latest.length - 1; i >= 0; i -= 1) {
      const earlier = latest[i]
      if (earlier.runId === current.runId) continue
      const fair = !sameValue(earlier.params[vary], current.params[vary])
        && holdConstant.every((k) => sameValue(earlier.params[k], current.params[k]))
      if (!fair) continue
      const key = [earlier.runId, current.runId].join('|')
      if (already.has(key)) break
      const varyRatio = Number(current.params[vary]) / Number(earlier.params[vary])
      const measureRatio = readout(current, measure)! / readout(earlier, measure)!
      const observedRelation = relationOf(varyRatio, measureRatio)
      const choice = latestPrediction(events, prediction.id)?.choice ?? null
      const chosen = choice === null ? null : prediction.options[choice]?.relation ?? null
      events.push({
        kind: 'interpretation',
        id: `interpretation-${events.length}`,
        at: recorded.at,
        predictionId: prediction.id,
        runIds: [earlier.runId, current.runId],
        varyRatio,
        measureRatio,
        observedRelation,
        matchedPrediction: chosen === null || observedRelation === null ? null : chosen === observedRelation,
      })
      break
    }
  }
  return { events }
}
