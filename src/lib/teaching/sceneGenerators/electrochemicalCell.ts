/**
 * electrochemicalCell — a single, parametrized generator for both galvanic
 * (spontaneous) and electrolytic (externally driven) cells.
 *
 * Chemistry Visual Coverage programme (2026-09). `chem.elect`/`chem.thermo`'s
 * electrochemistry concepts (Daniell cell, standard electrode potential,
 * Nernst equation, concentration cells, electrolysis, industrial electrolysis,
 * batteries, cell thermodynamics) all share ONE genuine visual archetype: two
 * electrodes, an electrolyte, a wire carrying electrons between them, and
 * (for a divided galvanic cell) a salt bridge. `electricCircuit.pure.ts`
 * cannot stand in for this — it computes Ohm's law over resistors/capacitors
 * and has no concept of an electrode, an electrolyte or a half-reaction, so
 * binding it to electrochemistry concepts would draw a scientifically wrong
 * figure (a resistor network, not a cell). This is a NEW, small, reusable
 * renderer instead of eight concept-specific hacks.
 *
 * Pure: no network, no LLM, no randomness — safe to re-run in the browser,
 * following the same client-safety convention as every other generator's
 * `.pure.ts` half. This module has no LLM-extraction counterpart at all (it
 * is reached only through `conceptSceneParams.ts`'s canonical-parameter
 * path, never through the prose-keyword router that needs one), so it is
 * not itself named `.pure.ts` — see `physicsPilot.ts` for the same pattern.
 */

import type { SceneObject, SceneSpec } from '../sceneSpec'
import { ROLE, arrow, box, heading, label, line } from './visualDesign'
import { round, type ConsistencyResult } from './shared'

export type CellType = 'galvanic' | 'electrolytic'

export interface ElectrodeSpec {
  /** Display label for the electrode material, e.g. 'Zn', 'Cu', 'Pt (inert)'. */
  material: string
  /** The ion species in that half-cell's electrolyte, e.g. 'Zn2+', 'Cu2+'. */
  ion: string
  /** Standard reduction potential E° in volts. Omitted when not applicable (e.g. an inert electrolysis electrode). */
  standardPotential?: number
  /** Electrolyte concentration in mol/L — present only when the Nernst correction applies. */
  concentration?: number
}

export interface ElectrochemicalCellParams {
  cellType: CellType
  /** The oxidation half-cell (electrons are released here). */
  anode: ElectrodeSpec
  /** The reduction half-cell (electrons are consumed here). */
  cathode: ElectrodeSpec
  /** Moles of electrons transferred per formula unit — the n in ΔG = −nFE. */
  electronsTransferred: number
  /** Absolute temperature in K. Defaults to 298 (standard conditions). */
  temperature?: number
  /** Electrolytic cells only: the externally applied voltage driving the (non-spontaneous) reaction. */
  externalVoltage?: number
  /** Human-facing name, e.g. "Daniell Cell". */
  name: string
  /**
   * Container topology. Defaults to `cellType === 'galvanic'`: a divided cell
   * (two beakers + salt bridge) for a galvanic cell, one beaker for an
   * electrolytic cell. Override for a real galvanic cell that is NOT built
   * as two half-cells — a dry-cell battery has one paste electrolyte and no
   * salt bridge, so drawing one would misrepresent its construction.
   */
  divided?: boolean
}

const GAS_CONSTANT = 8.314
const FARADAY = 96485

function isFiniteNumber(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v)
}

function isElectrode(raw: unknown): raw is ElectrodeSpec {
  if (!raw || typeof raw !== 'object') return false
  const o = raw as Record<string, unknown>
  if (typeof o.material !== 'string' || !o.material.trim()) return false
  if (typeof o.ion !== 'string' || !o.ion.trim()) return false
  if (o.standardPotential !== undefined && !isFiniteNumber(o.standardPotential)) return false
  if (o.concentration !== undefined && (!isFiniteNumber(o.concentration) || o.concentration <= 0)) return false
  return true
}

export function validateElectrochemicalCellParams(raw: unknown): ElectrochemicalCellParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (o.cellType !== 'galvanic' && o.cellType !== 'electrolytic') return null
  if (!isElectrode(o.anode) || !isElectrode(o.cathode)) return null
  if (!isFiniteNumber(o.electronsTransferred) || o.electronsTransferred <= 0) return null
  if (typeof o.name !== 'string' || !o.name.trim()) return null
  if (o.temperature !== undefined && (!isFiniteNumber(o.temperature) || o.temperature <= 0)) return null
  if (o.externalVoltage !== undefined && !isFiniteNumber(o.externalVoltage)) return null

  return {
    cellType: o.cellType,
    anode: o.anode as ElectrodeSpec,
    cathode: o.cathode as ElectrodeSpec,
    electronsTransferred: o.electronsTransferred as number,
    temperature: (o.temperature as number | undefined) ?? 298,
    externalVoltage: o.externalVoltage as number | undefined,
    divided: typeof o.divided === 'boolean' ? o.divided : undefined,
    name: (o.name as string).trim(),
  }
}

// ── Deterministic electrochemistry (never LLM-generated) ─────────────────────

export interface CellDerivation {
  /** E°cell = E°cathode − E°anode. Null when either standard potential is unknown (e.g. an electrolysis pair). */
  standardEmf: number | null
  /** Nernst-corrected EMF when concentrations are supplied; otherwise equal to standardEmf. */
  cellEmf: number | null
  /** cellEmf > 0. Null when cellEmf could not be computed. */
  spontaneous: boolean | null
  /** ΔG = −nFE in kJ/mol. Null when cellEmf could not be computed. */
  deltaGkJ: number | null
}

/**
 * Reaction quotient convention: Q = [anode ion] / [cathode ion]. For a
 * two-metal cell (Zn | Zn²⁺ ‖ Cu²⁺ | Cu) the anode ion is the product formed
 * and the cathode ion is the reactant consumed, which is exactly Q for that
 * cell reaction. For a concentration cell (identical electrodes) the same
 * ratio is the textbook Q for equalising two compartments at different
 * concentrations — one formula serves both taught cases.
 */
export function deriveCell(p: ElectrochemicalCellParams): CellDerivation {
  const hasStandardPotentials = isFiniteNumber(p.anode.standardPotential) && isFiniteNumber(p.cathode.standardPotential)
  const standardEmf = hasStandardPotentials
    ? round(p.cathode.standardPotential! - p.anode.standardPotential!, 3)
    : null

  let cellEmf = standardEmf
  if (standardEmf !== null && isFiniteNumber(p.anode.concentration) && isFiniteNumber(p.cathode.concentration)) {
    const temperature = p.temperature ?? 298
    const quotient = p.anode.concentration! / p.cathode.concentration!
    const correction = (GAS_CONSTANT * temperature) / (p.electronsTransferred * FARADAY) * Math.log(quotient)
    cellEmf = round(standardEmf - correction, 3)
  }

  const spontaneous = cellEmf !== null ? cellEmf > 0 : null
  const deltaGkJ = cellEmf !== null ? round((-p.electronsTransferred * FARADAY * cellEmf) / 1000, 2) : null

  return { standardEmf, cellEmf, spontaneous, deltaGkJ }
}

// ── Scene construction ────────────────────────────────────────────────────────

const BEAKER_Y0 = -3
const BEAKER_Y1 = 1.4
const LIQUID_Y1 = 0.6

function beaker(x0: number, x1: number): SceneObject[] {
  return [
    ...box(x0, BEAKER_Y0, x1, LIQUID_Y1, ROLE.reference),
    line([x0, LIQUID_Y1, 0], [x1, LIQUID_Y1, 0], ROLE.reference, 0.02),
  ]
}

function electrodeRod(x: number, topY: number, color: string): SceneObject {
  return line([x, BEAKER_Y0 + 0.4, 0], [x, topY, 0], color, 0.09)
}

export function buildElectrochemicalCellScene(p: ElectrochemicalCellParams): SceneSpec {
  const d = deriveCell(p)
  const divided = p.divided ?? (p.cellType === 'galvanic')

  // Divided cell: two beakers with a gap for the salt bridge. Undivided
  // (electrolytic): one beaker, both electrodes in the same electrolyte.
  const anodeX = divided ? -4 : -2
  const cathodeX = divided ? 4 : 2
  const wireTopY = 2.6

  // Built as separate per-step arrays (rather than one array sliced
  // afterward) so a change to one step's content can never silently shift
  // the object boundary of another step.
  const step1: SceneObject[] = []
  const step2: SceneObject[] = []
  const step3: SceneObject[] = []

  if (divided) {
    step1.push(...beaker(-6, -2))
    step1.push(...beaker(2, 6))
    // Salt bridge — a simple U-shaped connector above the liquid line.
    step1.push(line([-2, LIQUID_Y1 + 0.6, 0], [2, LIQUID_Y1 + 0.6, 0], ROLE.aid, 0.05))
    step1.push(line([-2, LIQUID_Y1, 0], [-2, LIQUID_Y1 + 0.6, 0], ROLE.aid, 0.05))
    step1.push(line([2, LIQUID_Y1, 0], [2, LIQUID_Y1 + 0.6, 0], ROLE.aid, 0.05))
    step1.push(label('salt bridge', [0, LIQUID_Y1 + 1.05, 0], ROLE.aid, 'detail'))
  } else {
    step1.push(...beaker(-5, 5))
    step1.push(label(`electrolyte`, [0, BEAKER_Y0 + 1, 0], ROLE.reference, 'detail'))
  }

  step2.push(electrodeRod(anodeX, wireTopY, ROLE.input))
  step2.push(electrodeRod(cathodeX, wireTopY, ROLE.output))
  step2.push(label(`${p.anode.material} (anode)`, [anodeX, wireTopY + 0.5, 0], ROLE.input, 'primary'))
  step2.push(label(`${p.cathode.material} (cathode)`, [cathodeX, wireTopY + 0.5, 0], ROLE.output, 'primary'))
  step2.push(label(`${p.anode.ion} in solution`, [anodeX, BEAKER_Y0 + 0.7, 0], ROLE.input, 'detail'))
  step2.push(label(`${p.cathode.ion} in solution`, [cathodeX, BEAKER_Y0 + 0.7, 0], ROLE.output, 'detail'))

  // Wire connecting the electrode tops, routed above the salt bridge label so
  // nothing overlaps, plus the external-circuit electron flow arrow.
  const wireY = wireTopY + (divided ? 1.9 : 1.2)
  step3.push(line([anodeX, wireTopY, 0], [anodeX, wireY, 0], ROLE.reference, 0.045))
  step3.push(line([cathodeX, wireTopY, 0], [cathodeX, wireY, 0], ROLE.reference, 0.045))
  step3.push(line([anodeX, wireY, 0], [cathodeX, wireY, 0], ROLE.reference, 0.045))
  step3.push(arrow([anodeX + 0.6, wireY, 0], [cathodeX - 0.6, wireY, 0], ROLE.result))
  step3.push(label('e⁻ flow', [(anodeX + cathodeX) / 2, wireY + 0.45, 0], ROLE.result, 'detail'))

  if (p.cellType === 'electrolytic' && isFiniteNumber(p.externalVoltage)) {
    step3.push(label(`external source: ${p.externalVoltage} V`, [0, wireY + 0.9, 0], ROLE.aid, 'primary'))
  }

  const resultParts: string[] = []
  if (d.cellEmf !== null) {
    resultParts.push(`E${p.cellType === 'galvanic' ? 'cell' : ''} = ${d.cellEmf > 0 ? '+' : ''}${d.cellEmf} V`)
    resultParts.push(d.spontaneous ? 'spontaneous' : 'non-spontaneous')
  }
  if (d.deltaGkJ !== null) resultParts.push(`ΔG = ${d.deltaGkJ} kJ/mol`)

  const steps = [
    {
      narration: `${p.name}: ${divided ? 'two half-cells joined by a salt bridge' : 'two electrodes in one electrolyte'}.`,
      objects: step1,
      intent: 'establish' as const,
    },
    {
      narration: `Oxidation happens at the ${p.anode.material} anode (it loses electrons); reduction happens at the ${p.cathode.material} cathode (it gains them).`,
      objects: step2,
      intent: 'relate' as const,
    },
    {
      narration: `Electrons leave the anode, travel through the external wire, and arrive at the cathode — that direction never reverses, whether the cell drives the flow itself or a battery forces it.`,
      objects: step3,
      intent: 'vary' as const,
    },
    ...(resultParts.length > 0
      ? [{
          narration: resultParts.join(', ') + '.',
          objects: [heading(resultParts.join('  ·  '), [0, BEAKER_Y1 + 2, 0], d.spontaneous === false ? ROLE.input : ROLE.result)],
          intent: 'resolve' as const,
        }]
      : []),
  ]

  return {
    id: `electrochemical-cell-${p.name.toLowerCase().replace(/\s+/g, '-')}`,
    title: p.name,
    sceneType: 'diagram',
    teachingGoal: `Show ${divided ? 'a divided galvanic cell' : 'an electrolytic cell'}: the anode/cathode half-reactions, the direction of electron flow, and ${d.cellEmf !== null ? 'the resulting cell EMF' : 'how the cell is driven'}.`,
    cameraDistance: 18,
    ariaLabel: `${p.name}: an electrochemical cell with a ${p.anode.material} anode and a ${p.cathode.material} cathode${divided ? ', connected by a salt bridge' : ''}, with electrons flowing from anode to cathode through the external wire.${d.cellEmf !== null ? ` Cell EMF is ${d.cellEmf} volts, ${d.spontaneous ? 'spontaneous' : 'non-spontaneous'}.` : ''}`,
    steps,
  }
}

// ── Safety-net consistency checker (deterministic) ────────────────────────────

export function checkElectrochemicalCellConsistency(spec: SceneSpec, p: ElectrochemicalCellParams): ConsistencyResult {
  const errors: string[] = []
  const d = deriveCell(p)
  const allText = spec.steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).join(' | ')

  if (!allText.includes(p.anode.material) || !allText.includes(p.cathode.material)) {
    errors.push('scene does not name both electrode materials')
  }
  if (!/anode/i.test(allText) || !/cathode/i.test(allText)) {
    errors.push('scene does not label anode and cathode')
  }
  if (d.cellEmf !== null) {
    const emfText = `${d.cellEmf > 0 ? '+' : ''}${d.cellEmf} V`
    if (!allText.includes(emfText)) {
      errors.push(`scene EMF label does not match the derived value ${emfText}`)
    }
    const expectedSpontaneity = d.spontaneous ? 'spontaneous' : 'non-spontaneous'
    if (!allText.includes(expectedSpontaneity)) {
      errors.push(`scene does not state the derived spontaneity (${expectedSpontaneity})`)
    }
  }

  // The electron-flow arrow must point from the anode's side of the diagram
  // toward the cathode's — this generator always places the anode on the
  // left (negative x) and the cathode on the right (positive x).
  const flowArrow = spec.steps.flatMap((s) => s.objects).find((o) => o.type === 'arrow' && o.color === ROLE.result)
  if (!flowArrow || !flowArrow.from || !flowArrow.to) {
    errors.push('no electron-flow arrow found')
  } else if (flowArrow.from[0] >= flowArrow.to[0]) {
    errors.push('electron-flow arrow does not run from the anode side (left) to the cathode side (right)')
  }

  return { ok: errors.length === 0, errors }
}
