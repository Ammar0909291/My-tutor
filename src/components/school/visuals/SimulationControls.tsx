'use client'
/**
 * The experiment controls for a time-stepped simulation (ADR 16, G2).
 *
 * Predict → run → observe → explain, inside the figure. The learner may make a
 * prediction first (or skip it); runs are compared only when they make a FAIR
 * test — one quantity changed, the rest held — and only then does the frame
 * show what the runs measured and the authored explanation. Nothing here
 * grades: a prediction is compared with what the runs SHOWED, not with an
 * answer key, and the result never leaves this component (ADR 16 §6, §7).
 *
 * Under reduced motion there is no Run: the learner steps or drags through time
 * with a scrubber, which shows the identical states without movement. The
 * readouts are announced only when a run comes to rest, never per frame.
 */
import type { CSSProperties } from 'react'
import { Pause, Play, RotateCcw, SkipForward } from 'lucide-react'
import styles from './ExplainerFigure.module.css'
import { variablesFor, type SimPrediction, type SimRelation } from '@/lib/teaching/visual/parametricScenes'
import { canPause, canReset, canRun, canStep } from '@/lib/teaching/visual/simulationControl'
import type { SimEvent } from '@/lib/teaching/visual/simulationEvidence'
import { formatReadout, type SimulationHost } from './useSimulation'

const RELATION_TEXT: Record<SimRelation, string> = {
  proportional: 'it changed in direct proportion',
  inverse: 'it changed in inverse proportion',
  unchanged: 'it did not change',
}

const visuallyHidden: CSSProperties = {
  position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0,
}

const cell: CSSProperties = { padding: '2px 12px 2px 0', textAlign: 'left' }

type Interpretation = Extract<SimEvent, { kind: 'interpretation' }>
type Observation = Extract<SimEvent, { kind: 'observation' }>

const ratio = (n: number) => (Math.abs(n - Math.round(n)) < 1e-6 ? `×${Math.round(n)}` : `×${n.toFixed(2)}`)

export function SimulationControls({ host, kind, reducedMotion }: {
  host: SimulationHost
  kind: string
  reducedMotion: boolean
}) {
  const { sim, control, readouts, evidence } = host
  if (!host.active || !sim || !control) return null

  const labelOf = (key: string) => variablesFor(kind).find((v) => v.key === key)?.label ?? key
  const events = evidence.events
  const predictionOf = (id: string) => [...events].reverse().find((e) => e.kind === 'prediction' && e.predictionId === id) as
    Extract<SimEvent, { kind: 'prediction' }> | undefined
  const interpretationOf = (id: string) => [...events].reverse().find((e) => e.kind === 'interpretation' && e.predictionId === id) as
    Interpretation | undefined

  // One prediction at a time: the first one the runs have not answered yet.
  const open = sim.predictions.find((p) => !interpretationOf(p.id))
  const answered = sim.predictions.filter((p) => interpretationOf(p.id))

  // The latest observation of each run, in run order, for the table.
  const runs = new Map<string, Observation>()
  for (const e of events) if (e.kind === 'observation') runs.set(e.runId, e)

  const seconds = (sim.stepTicks * sim.fixedDt).toFixed(1)
  const end = control.terminalTick ?? 0
  const status = control.terminalTick === null
    ? 'These values cannot be simulated.'
    : control.phase === 'running' ? 'Running…'
      : control.phase === 'finished'
        ? (control.tick >= sim.maxTicks ? 'Finished — 10 s have passed.' : 'Finished — the block reached the end of the track.')
        : control.phase === 'paused' ? 'Paused.' : 'Ready.'

  return (
    <section
      className={styles.predict}
      style={{ marginTop: 10 }}
      aria-label="Experiment"
      data-testid="simulation"
      data-phase={control.phase}
      data-tick={control.tick}
    >
      {open && <PredictionBlock prediction={open} chosen={predictionOf(open.id)} labelOf={labelOf} onPredict={host.predict} />}

      <div className={styles.predictOptions} role="group" aria-label="Simulation controls">
        {!reducedMotion && (
          <button type="button" className={`${styles.chip} ${styles.chipActive}`} disabled={!canRun(control)} onClick={host.run} aria-label="Run">
            <span className={styles.chipIcon} aria-hidden="true"><Play size={11} /></span>Run
          </button>
        )}
        <button type="button" className={styles.chip} disabled={!canPause(control)} onClick={host.pause} aria-label="Pause">
          <span className={styles.chipIcon} aria-hidden="true"><Pause size={11} /></span>Pause
        </button>
        <button type="button" className={styles.chip} disabled={!canStep(control)} onClick={host.step} aria-label={`Step ${seconds} s`}>
          <span className={styles.chipIcon} aria-hidden="true"><SkipForward size={11} /></span>Step +{seconds} s
        </button>
        <button type="button" className={styles.chip} disabled={!canReset(control)} onClick={host.reset} aria-label="Reset">
          <span className={styles.chipIcon} aria-hidden="true"><RotateCcw size={11} /></span>Reset
        </button>
      </div>

      {reducedMotion && control.terminalTick !== null && (
        <div className={styles.animationPanel}>
          <p className={styles.note} style={{ margin: 0 }}>Motion is off — step or drag through time.</p>
          <div className={styles.control} style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(70px, auto)', marginTop: 6 }}>
            <input
              className={styles.slider}
              type="range"
              min={0}
              max={end}
              step={1}
              value={control.tick}
              aria-label="Time"
              onChange={(e) => host.seek(Number(e.target.value))}
            />
            <output className={styles.controlValue}>{(control.tick * sim.fixedDt).toFixed(2)} s</output>
          </div>
        </div>
      )}

      <p className={styles.note} data-testid="simulation-status">{status}{host.locked ? ' Values are locked while it runs.' : ''}</p>

      <dl className={styles.panelLines} aria-label="Readings" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 10, margin: '6px 0 0' }}>
        {readouts.filter((r) => r.key !== 'force' && r.key !== 'mass').map((r) => (
          <div key={r.key} style={{ display: 'contents' }}>
            <dt>{r.label}</dt>
            <dd style={{ margin: 0 }} data-testid={`readout-${r.key}`}>{formatReadout(r)}</dd>
          </div>
        ))}
      </dl>
      <p style={visuallyHidden} role="status" aria-live="polite">{host.announcement}</p>

      {runs.size > 0 && (
        <table aria-label="Your runs" data-testid="simulation-runs" style={{ marginTop: 8, borderCollapse: 'collapse', fontSize: 12, color: 'var(--text-secondary)' }}>
          <thead>
            <tr>{['Run', labelOf('force'), labelOf('mass'), 'a (measured)'].map((h) => <th key={h} scope="col" style={cell}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {[...runs.values()].map((o, i) => {
              const a = o.readouts.find((r) => r.key === 'a_measured')
              return (
                <tr key={o.runId}>
                  <td style={cell}>{i + 1}</td>
                  <td style={cell}>{String(o.params.force)} N</td>
                  <td style={cell}>{String(o.params.mass)} kg</td>
                  <td style={cell}>{a ? `${a.value.toFixed(2)} m/s²` : '—'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}

      {answered.map((p) => (
        <InterpretationBlock key={p.id} prediction={p} interpretation={interpretationOf(p.id)!} labelOf={labelOf} />
      ))}
    </section>
  )
}

function PredictionBlock({ prediction, chosen, labelOf, onPredict }: {
  prediction: SimPrediction
  chosen: Extract<SimEvent, { kind: 'prediction' }> | undefined
  labelOf: (key: string) => string
  onPredict: (predictionId: string, choice: number | null) => void
}) {
  const { vary, holdConstant } = prediction.tests
  if (!chosen) {
    return (
      <div data-testid="prediction" data-prediction-id={prediction.id}>
        <p className={styles.panelBody} style={{ color: 'var(--text-primary)' }}>{prediction.question}</p>
        <div className={styles.predictOptions} role="group" aria-label="Your prediction">
          {prediction.options.map((o, i) => (
            <button key={o.label} type="button" className={styles.chip} onClick={() => onPredict(prediction.id, i)}>{o.label}</button>
          ))}
          <button type="button" className={styles.chip} onClick={() => onPredict(prediction.id, null)}>Skip — just experiment</button>
        </div>
      </div>
    )
  }
  const said = chosen.choice === null ? 'No prediction.' : `Your prediction: ${prediction.options[chosen.choice]?.label}.`
  return (
    <div data-testid="prediction" data-prediction-id={prediction.id} data-predicted="true">
      <p className={styles.panelBody} style={{ color: 'var(--text-primary)' }}>{said}</p>
      <p className={styles.note} style={{ margin: '2px 0 6px' }}>
        Test it fairly: change only {labelOf(vary)}, keep {holdConstant.map(labelOf).join(' and ')} the same, and compare two runs.
      </p>
    </div>
  )
}

function InterpretationBlock({ prediction, interpretation, labelOf }: {
  prediction: SimPrediction
  interpretation: Interpretation
  labelOf: (key: string) => string
}) {
  const { vary } = prediction.tests
  const observed = interpretation.observedRelation
  return (
    <div className={styles.panel} style={{ marginTop: 8 }} role="status" data-testid="interpretation" data-prediction-id={prediction.id}>
      <p className={styles.panelBody}>
        {labelOf(vary)} {ratio(interpretation.varyRatio)} → measured a {ratio(interpretation.measureRatio)}
        {observed ? `: ${RELATION_TEXT[observed]}.` : '.'}
        {interpretation.matchedPrediction === true && ' That matches your prediction.'}
        {interpretation.matchedPrediction === false && ' That is not what you predicted — the runs are the evidence.'}
      </p>
      <p className={styles.note} style={{ margin: '4px 0 0' }}>{prediction.explanation}</p>
    </div>
  )
}
