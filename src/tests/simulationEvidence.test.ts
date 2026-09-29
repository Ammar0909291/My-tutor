/**
 * ADR 16 (G1) — the client-side evidence reducer.
 *
 * Pins: four record kinds stay separate; an interpretation needs a FAIR pair
 * of runs (vary one thing, hold the rest); the observed relation comes from the
 * runs' measurements, not an answer key; no prediction means `null`, never
 * "wrong"; and nothing here persists, sends or grades.
 */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  EMPTY_SIM_EVIDENCE, recordSimEvidence, relationOf, type SimEvidenceInput, type SimEvidenceLog, type SimEvent,
} from '@/lib/teaching/visual/simulationEvidence'
import { simulationFor, type SceneParams } from '@/lib/teaching/visual/parametricScenes'

const sim = simulationFor('newton_second_law')!
const PREDICTIONS = sim.predictions
const DOUBLE_MASS = PREDICTIONS.findIndex((p) => p.id === 'double-mass')
const HALVES = PREDICTIONS[DOUBLE_MASS].options.findIndex((o) => o.relation === 'inverse')
const DOUBLES = PREDICTIONS[DOUBLE_MASS].options.findIndex((o) => o.relation === 'proportional')

let clock = 0
const obs = (runId: string, params: SceneParams, tick: number): SimEvidenceInput => ({
  kind: 'observation', at: ++clock, runId, params, tick, readouts: sim.observe(params, tick)!, terminal: tick >= sim.terminalTick(params)!,
})
const record = (...inputs: SimEvidenceInput[]): SimEvidenceLog =>
  inputs.reduce((log, input) => recordSimEvidence(log, input, PREDICTIONS), EMPTY_SIM_EVIDENCE)
const interpretations = (log: SimEvidenceLog) =>
  log.events.filter((e): e is Extract<SimEvent, { kind: 'interpretation' }> => e.kind === 'interpretation')

describe('record kinds stay separate', () => {
  it('a prediction, an action and an observation are three records, never merged', () => {
    const log = record(
      { kind: 'prediction', at: 1, predictionId: 'double-mass', choice: HALVES },
      { kind: 'action', at: 2, action: 'run', params: { force: 10, mass: 2 } },
      obs('r1', { force: 10, mass: 2 }, 100),
    )
    expect(log.events.map((e) => e.kind)).toEqual(['prediction', 'action', 'observation'])
    expect(new Set(log.events.map((e) => e.id)).size).toBe(3)
  })

  it('actions alone never produce an interpretation', () => {
    const log = record(
      { kind: 'action', at: 1, action: 'run', params: { force: 10, mass: 2 } },
      { kind: 'action', at: 2, action: 'run', params: { force: 10, mass: 4 } },
    )
    expect(interpretations(log)).toEqual([])
  })
})

describe('an interpretation needs a fair test', () => {
  it('doubling the mass at the same force: observed INVERSE, prediction matched', () => {
    const log = record(
      { kind: 'prediction', at: 1, predictionId: 'double-mass', choice: HALVES },
      obs('r1', { force: 10, mass: 2 }, 100),
      obs('r2', { force: 10, mass: 4 }, 100),
    )
    const [i] = interpretations(log).filter((x) => x.predictionId === 'double-mass')
    expect(i.runIds).toEqual(['r1', 'r2'])
    expect(i.varyRatio).toBe(2)
    expect(i.measureRatio).toBeCloseTo(0.5, 12)
    expect(i.observedRelation).toBe('inverse')
    expect(i.matchedPrediction).toBe(true)
  })

  it('a prediction the runs contradict is reported as not matching — not as a grade', () => {
    const log = record(
      { kind: 'prediction', at: 1, predictionId: 'double-mass', choice: DOUBLES },
      obs('r1', { force: 10, mass: 2 }, 100),
      obs('r2', { force: 10, mass: 4 }, 100),
    )
    const i = interpretations(log).find((x) => x.predictionId === 'double-mass')!
    expect(i.observedRelation).toBe('inverse')
    expect(i.matchedPrediction).toBe(false)
    expect(Object.keys(i)).not.toContain('correct')
    expect(Object.keys(i)).not.toContain('score')
  })

  it('no prediction made → matchedPrediction is null, never "wrong"', () => {
    const log = record(obs('r1', { force: 10, mass: 2 }, 100), obs('r2', { force: 10, mass: 4 }, 100))
    const i = interpretations(log).find((x) => x.predictionId === 'double-mass')!
    expect(i.observedRelation).toBe('inverse')
    expect(i.matchedPrediction).toBeNull()
  })

  it('changing BOTH force and mass is not a fair test for either prediction', () => {
    const log = record(obs('r1', { force: 10, mass: 2 }, 100), obs('r2', { force: 20, mass: 4 }, 100))
    expect(interpretations(log)).toEqual([])
  })

  it('doubling the force at the same mass: observed PROPORTIONAL', () => {
    const log = record(obs('r1', { force: 5, mass: 2 }, 100), obs('r2', { force: 10, mass: 2 }, 100))
    const [i] = interpretations(log)
    expect(i.predictionId).toBe('double-force')
    expect(i.observedRelation).toBe('proportional')
  })

  it('a relation is read from the runs, whatever the ratio: mass ×3 gives a ×⅓', () => {
    const log = record(obs('r1', { force: 12, mass: 1 }, 60), obs('r2', { force: 12, mass: 3 }, 60))
    expect(interpretations(log)[0].observedRelation).toBe('inverse')
  })

  it('a run that has not started (t = 0) cannot be measured, so it pairs with nothing', () => {
    const log = record(obs('r1', { force: 10, mass: 2 }, 0), obs('r2', { force: 10, mass: 4 }, 100))
    expect(interpretations(log)).toEqual([])
  })

  it('the same pair is interpreted once, however often it is observed', () => {
    const log = record(
      obs('r1', { force: 10, mass: 2 }, 100),
      obs('r2', { force: 10, mass: 4 }, 50),
      obs('r2', { force: 10, mass: 4 }, 100),
    )
    expect(interpretations(log).filter((x) => x.predictionId === 'double-mass')).toHaveLength(1)
  })

  it('a later prediction replaces an earlier one', () => {
    const log = record(
      { kind: 'prediction', at: 1, predictionId: 'double-mass', choice: DOUBLES },
      { kind: 'prediction', at: 2, predictionId: 'double-mass', choice: HALVES },
      obs('r1', { force: 10, mass: 2 }, 100),
      obs('r2', { force: 10, mass: 4 }, 100),
    )
    expect(interpretations(log)[0].matchedPrediction).toBe(true)
  })
})

describe('relationOf', () => {
  it('reads the three clean relations and refuses anything else', () => {
    expect(relationOf(2, 2)).toBe('proportional')
    expect(relationOf(2, 0.5)).toBe('inverse')
    expect(relationOf(2, 1)).toBe('unchanged')
    expect(relationOf(2, 1.4)).toBeNull()
    expect(relationOf(0, 1)).toBeNull()
    expect(relationOf(2, Number.NaN)).toBeNull()
  })
})

describe('purity and the boundary', () => {
  it('is deterministic: the same inputs give the same log', () => {
    const inputs: SimEvidenceInput[] = [
      { kind: 'prediction', at: 1, predictionId: 'double-mass', choice: HALVES },
      { kind: 'observation', at: 2, runId: 'a', params: { force: 10, mass: 2 }, tick: 90, readouts: sim.observe({ force: 10, mass: 2 }, 90)!, terminal: false },
      { kind: 'observation', at: 3, runId: 'b', params: { force: 10, mass: 4 }, tick: 90, readouts: sim.observe({ force: 10, mass: 4 }, 90)!, terminal: false },
    ]
    const run = () => inputs.reduce((log, i) => recordSimEvidence(log, i, PREDICTIONS), EMPTY_SIM_EVIDENCE)
    expect(run()).toEqual(run())
  })

  it('never mutates the log it was given', () => {
    const before = record(obs('r1', { force: 10, mass: 2 }, 100))
    const snapshot = JSON.stringify(before)
    recordSimEvidence(before, obs('r2', { force: 10, mass: 4 }, 100), PREDICTIONS)
    expect(JSON.stringify(before)).toBe(snapshot)
  })

  it('imports only types, and reaches no storage, network, server or Tutor Max path', () => {
    const src = readFileSync(join(process.cwd(), 'src/lib/teaching/visual/simulationEvidence.ts'), 'utf8')
    const imports = [...src.matchAll(/^import[^']*'([^']+)'/gm)].map((m) => m[0])
    expect(imports).toEqual(["import type { SceneParams, SimPrediction, SimReadout, SimRelation } from './parametricScenes'"])
    const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')
    expect(code).not.toMatch(/localStorage|sessionStorage|indexedDB|fetch\(|prisma|EvidenceEvent|PROBE_OUTCOME|recordEvidence|mastery/i)
  })
})
