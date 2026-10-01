'use client'
/**
 * The client host for a time-stepped simulation (ADR 16, G2).
 *
 * Everything that DECIDES lives in pure modules — the time model on the
 * registry entry, the controls in `simulationControl.ts`, the evidence in
 * `simulationEvidence.ts`. This hook only owns what a pure module cannot:
 *
 *   the clock       requestAnimationFrame, feeding wall-clock milliseconds to
 *                   the reducer, which turns them into whole fixed ticks
 *   the page        visibilitychange → pause, so a background tab never runs
 *   the log         the evidence log, in React state and nowhere else
 *
 * ── EVIDENCE IS RECORDED ON TRANSITIONS, NEVER PER FRAME ────────────────────
 * An action when the learner presses or sets something; an observation when a
 * run stops (pause, step, seek, finish, hidden tab) — the moments at which
 * there is something to read off. Nothing is written to storage and nothing is
 * sent anywhere: the log dies with the component (ADR 16 §7).
 *
 * For a kind with no simulation the hook is inert: no clock, no listener, no
 * state changes, and `active` is false.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { simulationFor, simulationFrame, variablesFor, type SceneParams, type SimReadout, type TimeSimulation } from '@/lib/teaching/visual/parametricScenes'
import {
  initialSimControl, paramsLocked, simulationControl, type SimControlEvent, type SimControlState,
} from '@/lib/teaching/visual/simulationControl'
import {
  EMPTY_SIM_EVIDENCE, recordSimEvidence, type SimAction, type SimEvidenceInput, type SimEvidenceLog,
} from '@/lib/teaching/visual/simulationEvidence'

export interface SimulationHost {
  active: boolean
  sim: TimeSimulation | null
  control: SimControlState | null
  /** The figure at the current tick, through the registry's own gate; null if refused. */
  frame: SceneSpec | null
  readouts: SimReadout[]
  evidence: SimEvidenceLog
  locked: boolean
  /** What a screen reader hears — updated only on pause, step, seek, finish and reset. */
  announcement: string
  run: () => void
  pause: () => void
  step: () => void
  reset: () => void
  seek: (tick: number) => void
  predict: (predictionId: string, choice: number | null) => void
}

const paramsKey = (p: SceneParams) => JSON.stringify(Object.keys(p).sort().map((k) => [k, p[k]]))

/** What a screen reader hears when a run comes to rest; readouts that only echo a slider are left out. */
function describeReadouts(readouts: SimReadout[], inputKeys: ReadonlySet<string>): string {
  return readouts
    .filter((r) => !inputKeys.has(r.key))
    .map((r) => `${r.label} ${formatReadout(r)}`)
    .join(', ')
}

/** A value and its unit; a degree sign sits against the number (10°, not 10 °). */
export function withUnit(value: string, unit: string): string {
  if (!unit) return value
  return unit === '°' ? `${value}°` : `${value} ${unit}`
}

export function formatReadout(r: SimReadout): string {
  const text = r.value.toFixed(r.dp ?? 2)
  return withUnit(text, r.unit)
}

export function useSimulation(
  kind: string | null | undefined,
  params: SceneParams,
  reducedMotion: boolean,
): SimulationHost {
  const sim = simulationFor(kind)
  const inputKeys = useMemo(() => new Set(variablesFor(kind).map((v) => v.key)), [kind])

  const [control, setControl] = useState<SimControlState | null>(() =>
    sim ? initialSimControl({ params, terminalTick: sim.terminalTick(params), fixedDt: sim.fixedDt, stepTicks: sim.stepTicks }) : null,
  )
  const [evidence, setEvidence] = useState<SimEvidenceLog>(EMPTY_SIM_EVIDENCE)
  const [announcement, setAnnouncement] = useState('')

  // The reducer state is also mirrored in a ref so a transition is computed
  // synchronously from the true current state, never from a stale closure.
  const controlRef = useRef(control)
  controlRef.current = control
  const runSeq = useRef(0)
  const runId = useRef<string | null>(null)

  const record = useCallback((input: SimEvidenceInput) => {
    if (!sim) return
    setEvidence((log) => recordSimEvidence(log, input, sim.predictions))
  }, [sim])

  const observe = useCallback((s: SimControlState) => {
    if (!sim || !runId.current) return
    const readouts = sim.observe(s.params, s.tick) ?? []
    record({ kind: 'observation', at: Date.now(), runId: runId.current, params: s.params, tick: s.tick, readouts, terminal: s.phase === 'finished' })
    setAnnouncement(describeReadouts(readouts, inputKeys))
  }, [sim, record, inputKeys])

  const dispatch = useCallback((event: SimControlEvent, action?: SimAction) => {
    const prev = controlRef.current
    if (!sim || !prev) return
    const next = simulationControl(prev, event)
    if (next === prev) return
    controlRef.current = next
    setControl(next)

    const startsRun = prev.tick === 0 && (next.tick > 0 || event.type === 'run')
    if (startsRun && !runId.current) runId.current = `run-${++runSeq.current}`
    if (action) record({ kind: 'action', at: Date.now(), action, params: next.params })

    if (event.type === 'reset' || event.type === 'setParams') {
      runId.current = null
      setAnnouncement(event.type === 'reset' ? 'Reset to the start.' : '')
      return
    }
    // An observation whenever a run comes to rest.
    if (next.phase !== 'running' && (prev.phase === 'running' || event.type === 'step' || event.type === 'seek')) observe(next)
  }, [sim, record, observe])

  // A different figure (another kind) gets a fresh host: no state or evidence
  // carries across figures.
  const hostKind = useRef(kind)
  useEffect(() => {
    if (hostKind.current === kind) return
    hostKind.current = kind
    runId.current = null
    const fresh = sim ? initialSimControl({ params, terminalTick: sim.terminalTick(params), fixedDt: sim.fixedDt, stepTicks: sim.stepTicks }) : null
    controlRef.current = fresh
    setControl(fresh)
    setEvidence(EMPTY_SIM_EVIDENCE)
    setAnnouncement('')
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset only when the kind changes
  }, [kind])

  // New values from the sliders start a fresh run (the reducer refuses them while running).
  const key = paramsKey(params)
  useEffect(() => {
    if (!sim || !controlRef.current) return
    if (paramsKey(controlRef.current.params) === key) return
    dispatch({ type: 'setParams', params, terminalTick: sim.terminalTick(params) }, 'set')
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on the values, not the object identity
  }, [key, sim, dispatch])

  // The clock. Under reduced motion nothing is ever driven.
  const running = control?.phase === 'running'
  useEffect(() => {
    if (!running) return
    if (reducedMotion) { dispatch({ type: 'pause' }, 'pause'); return }
    let frame = 0
    let last = 0
    const tick = (now: number) => {
      if (last) dispatch({ type: 'elapsed', ms: now - last })
      last = now
      if (controlRef.current?.phase === 'running') frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [running, reducedMotion, dispatch])

  // A background tab pauses the run.
  useEffect(() => {
    if (!sim) return
    const onVisibility = () => { if (document.visibilityState === 'hidden') dispatch({ type: 'hidden' }, 'pause') }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [sim, dispatch])

  const frame = useMemo(
    () => (sim && control ? simulationFrame(kind, control.params, control.tick) : null),
    [sim, kind, control],
  )
  const readouts = useMemo(
    () => (sim && control ? sim.observe(control.params, control.tick) ?? [] : []),
    [sim, control],
  )

  const run = useCallback(() => dispatch({ type: 'run' }, 'run'), [dispatch])
  const pause = useCallback(() => dispatch({ type: 'pause' }, 'pause'), [dispatch])
  const step = useCallback(() => dispatch({ type: 'step' }, 'step'), [dispatch])
  const reset = useCallback(() => dispatch({ type: 'reset' }, 'reset'), [dispatch])
  const seek = useCallback((tick: number) => dispatch({ type: 'seek', tick }, 'seek'), [dispatch])
  const predict = useCallback(
    (predictionId: string, choice: number | null) => record({ kind: 'prediction', at: Date.now(), predictionId, choice }),
    [record],
  )

  // One object per real change, so a consumer's effect on it cannot loop.
  return useMemo(() => ({
    active: Boolean(sim && control),
    sim,
    control,
    frame,
    readouts,
    evidence,
    locked: control ? paramsLocked(control) : false,
    announcement,
    run, pause, step, reset, seek, predict,
  }), [sim, control, frame, readouts, evidence, announcement, run, pause, step, reset, seek, predict])
}
