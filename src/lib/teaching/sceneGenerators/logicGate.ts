/**
 * Logic-gate scene generator (24th parametric generator), closing the
 * "Logic gates / flowcharts" gap noted in docs/VISUAL_COVERAGE_GAP_ANALYSIS.md.
 * Builds the gate symbol, its input lines, and its computed output from a
 * gate type and a set of boolean inputs, deriving the output strictly by the
 * gate's truth-table definition (never invented). Same architecture as the
 * other generators: extractLogicGateParams (LLM, isolated) →
 * validateLogicGateParams (pure) → buildLogicGateScene (pure, deterministic
 * truth-table evaluation) → checkLogicGateConsistency (pure, independent
 * re-derivation safety net).
 */

import { generateJSON } from '@/lib/ai/client'
import type { SceneObject, SceneSpec } from '../sceneSpec'
import { round, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export type LogicGateType = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR'

const UNARY_GATES: ReadonlySet<LogicGateType> = new Set(['NOT'])
const VALID_GATES: ReadonlySet<string> = new Set(['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'])

export interface LogicGateParams {
  gateType: LogicGateType
  /** Exactly 1 input for NOT, exactly 2 for every other gate type. */
  inputs: boolean[]
}

export function validateLogicGateParams(raw: unknown): LogicGateParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>

  if (typeof o.gateType !== 'string') return null
  const gateType = o.gateType.toUpperCase()
  if (!VALID_GATES.has(gateType)) return null

  if (!Array.isArray(o.inputs) || !o.inputs.every((v) => typeof v === 'boolean')) return null
  const inputs = o.inputs as boolean[]
  const expectedArity = UNARY_GATES.has(gateType as LogicGateType) ? 1 : 2
  if (inputs.length !== expectedArity) return null

  return { gateType: gateType as LogicGateType, inputs }
}

// ── Deterministic boolean logic (truth tables; never LLM-generated) ──────────

/** The output for a gate type given its inputs, per its truth-table definition. */
function computeOutput(gateType: LogicGateType, inputs: boolean[]): boolean {
  switch (gateType) {
    case 'AND': return inputs[0] && inputs[1]
    case 'OR': return inputs[0] || inputs[1]
    case 'NOT': return !inputs[0]
    case 'NAND': return !(inputs[0] && inputs[1])
    case 'NOR': return !(inputs[0] || inputs[1])
    case 'XOR': return inputs[0] !== inputs[1]
    case 'XNOR': return inputs[0] === inputs[1]
  }
}

const bit = (v: boolean) => (v ? '1' : '0')

/** Build a 2-step logic-gate SceneSpec: the gate with its labelled inputs, then the computed output. */
export function buildLogicGateScene(params: LogicGateParams): SceneSpec {
  const output = computeOutput(params.gateType, params.inputs)

  const inputObjects: SceneObject[] = params.inputs.map((v, i) => ({
    type: 'label',
    id: `input-${i}`,
    position: [-6, round(2 - i * 4), 0],
    text: bit(v),
    color: v ? '#22c55e' : '#94a3b8',
  }))

  const gateObject: SceneObject = {
    type: 'node',
    id: 'gate',
    position: [0, 0, 0],
    text: params.gateType,
    color: '#3b82f6',
  }

  const outputObject: SceneObject = {
    type: 'label',
    id: 'output',
    position: [6, 0, 0],
    text: bit(output),
    color: output ? '#22c55e' : '#94a3b8',
  }

  const inputsDesc = params.inputs.map(bit).join(', ')

  return {
    id: `logic-gate-${params.gateType}-${params.inputs.map(bit).join('')}`,
    title: `${params.gateType} Gate`,
    sceneType: 'diagram',
    teachingGoal: `Show how a ${params.gateType} gate computes its output from its input(s) using its truth table.`,
    cameraDistance: 24,
    ariaLabel: `A ${params.gateType} logic gate with input(s) ${inputsDesc}, producing output ${bit(output)}.`,
    steps: [
      {
        narration: `This is a ${params.gateType} gate with input${params.inputs.length > 1 ? 's' : ''} ${inputsDesc}.`,
        objects: [gateObject, ...inputObjects],
      },
      {
        narration: `Following the ${params.gateType} truth table, the output is ${bit(output)}.`,
        objects: [outputObject],
      },
    ],
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkLogicGateConsistency(spec: SceneSpec, params: LogicGateParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const expectedOutput = computeOutput(params.gateType, params.inputs)

  params.inputs.forEach((v, i) => {
    const obj = objs.find((o) => o.id === `input-${i}`)
    if (!obj) {
      errors.push(`missing input-${i}`)
      return
    }
    if (obj.text !== bit(v)) {
      errors.push(`input-${i} text "${obj.text}" does not match expected "${bit(v)}"`)
    }
  })

  const output = objs.find((o) => o.id === 'output')
  if (output?.text !== bit(expectedOutput)) {
    errors.push(`output text "${output?.text}" does not match re-derived "${bit(expectedOutput)}"`)
  }

  return { ok: errors.length === 0, errors }
}

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ─────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the logic gate being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isLogicGate": true|false, "gateType": "AND"|"OR"|"NOT"|"NAND"|"NOR"|"XOR"|"XNOR", "inputs": [<booleans>]}
- isLogicGate is false if the text is not about a logic gate / boolean circuit.
- inputs has exactly 1 boolean for NOT, exactly 2 booleans for every other gate type — use the values actually stated in the text, do not invent any.`
}

/**
 * Extract validated logic-gate parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractLogicGateParams(text: string): Promise<LogicGateParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch(() => null)
  if (!raw || raw.isLogicGate !== true) return null
  return validateLogicGateParams(raw)
}
