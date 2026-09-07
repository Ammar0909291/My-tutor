/**
 * coordinationComplex — octahedral and square-planar coordination geometry.
 *
 * Chemistry Visual Coverage programme (2026-09). `moleculeGeometry.pure.ts`'s
 * existing VSEPR table only covers `linear | bent | trigonal_planar |
 * trigonal_pyramidal | tetrahedral` — the five geometries a school VSEPR
 * syllabus needs, and no more. Coordination chemistry needs two more
 * (octahedral, coordination number 6; square planar, coordination number 4)
 * and, for geometric isomerism, TWO ligand types on the same central metal —
 * `MoleculeDef` assumes one.
 *
 * Rather than widening `MoleculeDef`/`bondDirections`/`buildMoleculeScene`
 * (which would touch the already-correct, already-tested VSEPR molecule
 * feature for a shape it doesn't need), this is a small sibling module reusing
 * the same conventions (bond length, coordinate rounding, node/bond/label
 * scene primitives) with its own minimal data model. Nothing in
 * moleculeGeometry.pure.ts is modified.
 *
 * Pure: no network, no LLM, no randomness — reached only through
 * `conceptSceneParams.ts`'s canonical-parameter path, so (like
 * `physicsPilot.ts`) it has no LLM-extraction counterpart and is not named
 * `.pure.ts`.
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { round, type ConsistencyResult } from './shared'

export type CoordinationGeometry = 'octahedral' | 'square_planar'
export type Isomer = 'cis' | 'trans'

export interface LigandGroup {
  /** Display formula, e.g. "NH3", "Cl". */
  formula: string
  count: number
}

export interface CoordinationComplexDef {
  name: string
  centralMetal: string
  /** Overall charge, e.g. "3+", "2-", or "" for a neutral complex. */
  charge: string
  geometry: CoordinationGeometry
  /** One ligand type (homoleptic) or two (heteroleptic — required for cis/trans). */
  ligands: [LigandGroup] | [LigandGroup, LigandGroup]
  /** Required when `ligands` has two groups; ignored (and meaningless) for a homoleptic complex. */
  isomer?: Isomer
  /** Coordination-number classification, spelled out for the tutor's narration. */
  coordinationNumber: number
}

const BOND_LEN = 8

function directionsFor(geometry: CoordinationGeometry): Vec3[] {
  switch (geometry) {
    case 'octahedral':
      return [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]
    case 'square_planar':
      return [[1, 0, 0], [0, 1, 0], [-1, 0, 0], [0, -1, 0]]
  }
}

/**
 * Assign each direction to a ligand group. Homoleptic: every direction gets
 * the one group. Heteroleptic: the FIRST `count` directions in a hand-picked
 * cis/trans-correct order get group A, the rest get group B.
 *
 *   square_planar, cis:   [+x,+y] adjacent (90° apart)  = A;  [-x,-y] adjacent = B
 *   square_planar, trans: [+x,-x] opposite (180° apart) = A;  [+y,-y] opposite = B
 *   octahedral, cis:      [+z,+x] adjacent (90° apart)  = A;  the other four   = B
 *   octahedral, trans:    [+z,-z] opposite (180° apart) = A;  the other four   = B
 */
function assignLigands(def: CoordinationComplexDef): { direction: Vec3; group: LigandGroup }[] {
  const dirs = directionsFor(def.geometry)
  if (def.ligands.length === 1) {
    return dirs.map((direction) => ({ direction, group: def.ligands[0] }))
  }
  const [a, b] = def.ligands
  const order = def.geometry === 'square_planar'
    ? (def.isomer === 'trans' ? [0, 2, 1, 3] : [0, 1, 2, 3]) // trans: +x,-x,+y,-y | cis: +x,+y,-x,-y
    : (def.isomer === 'trans' ? [4, 5, 0, 1, 2, 3] : [4, 0, 1, 2, 3, 5]) // trans: +z,-z,rest | cis: +z,+x,rest
  const reordered = order.map((i) => dirs[i])
  return reordered.map((direction, i) => ({ direction, group: i < a.count ? a : b }))
}

function isLigandGroup(raw: unknown): raw is LigandGroup {
  if (!raw || typeof raw !== 'object') return false
  const o = raw as Record<string, unknown>
  return typeof o.formula === 'string' && !!o.formula.trim() && typeof o.count === 'number' && o.count > 0
}

export function validateCoordinationComplexParams(raw: unknown): CoordinationComplexDef | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (typeof o.name !== 'string' || !o.name.trim()) return null
  if (typeof o.centralMetal !== 'string' || !o.centralMetal.trim()) return null
  if (typeof o.charge !== 'string') return null
  if (o.geometry !== 'octahedral' && o.geometry !== 'square_planar') return null
  if (!Array.isArray(o.ligands) || o.ligands.length < 1 || o.ligands.length > 2 || !o.ligands.every(isLigandGroup)) return null
  const totalLigands = (o.ligands as LigandGroup[]).reduce((sum, g) => sum + g.count, 0)
  const expected = o.geometry === 'octahedral' ? 6 : 4
  if (totalLigands !== expected) return null
  if (o.ligands.length === 2 && o.isomer !== 'cis' && o.isomer !== 'trans') return null
  if (typeof o.coordinationNumber !== 'number' || o.coordinationNumber !== expected) return null

  return {
    name: o.name.trim(),
    centralMetal: o.centralMetal.trim(),
    charge: o.charge,
    geometry: o.geometry,
    ligands: o.ligands as [LigandGroup] | [LigandGroup, LigandGroup],
    isomer: o.isomer as Isomer | undefined,
    coordinationNumber: o.coordinationNumber,
  }
}

// ── Scene construction ────────────────────────────────────────────────────────

const LIGAND_COLOR_A = '#3b82f6'
const LIGAND_COLOR_B = '#f59e0b'
const METAL_COLOR = '#ef4444'

export function buildCoordinationComplexScene(def: CoordinationComplexDef): SceneSpec {
  const assigned = assignLigands(def)
  const heteroleptic = def.ligands.length === 2
  const ligandA = def.ligands[0]
  const ligandB: LigandGroup = heteroleptic ? (def.ligands[1] as LigandGroup) : ligandA

  const bonds: SceneObject[] = assigned.map((a, i) => ({
    type: 'bond',
    id: `bond${i}`,
    from: [0, 0, 0],
    to: [round(a.direction[0] * BOND_LEN), round(a.direction[1] * BOND_LEN), round(a.direction[2] * BOND_LEN)],
    color: '#94a3b8',
  }))
  const ligandNodes: SceneObject[] = assigned.map((a, i) => ({
    type: 'node',
    id: `lig${i}`,
    position: [round(a.direction[0] * BOND_LEN), round(a.direction[1] * BOND_LEN), round(a.direction[2] * BOND_LEN)],
    text: a.group.formula,
    color: a.group === def.ligands[0] ? LIGAND_COLOR_A : LIGAND_COLOR_B,
    radius: 0.5,
  }))

  const geometryName = def.geometry === 'octahedral' ? 'octahedral' : 'square planar'
  const isomerNote = heteroleptic && def.isomer ? ` (${def.isomer})` : ''

  return {
    id: `coord-${def.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    title: `${def.name}${isomerNote} — ${geometryName}`,
    sceneType: 'diagram',
    teachingGoal: heteroleptic
      ? `Show the ${def.isomer} arrangement of ${ligandA.formula} and ${ligandB.formula} around ${def.centralMetal} — the ${def.isomer === 'cis' ? 'adjacent' : 'opposite'} placement is the whole difference between the two isomers.`
      : `Show the ${geometryName} arrangement of ${def.coordinationNumber} ${ligandA.formula} ligands around ${def.centralMetal}, coordination number ${def.coordinationNumber}.`,
    cameraDistance: BOND_LEN * 3,
    ariaLabel: `${def.name}: a central ${def.centralMetal} atom${def.charge ? ` (${def.charge})` : ''} bonded to ${def.coordinationNumber} ligands in a ${geometryName} arrangement${isomerNote}.`,
    steps: [
      {
        narration: `${def.name}: a central ${def.centralMetal}${def.charge} ion.`,
        objects: [{ type: 'node', id: 'central', position: [0, 0, 0], text: def.centralMetal, color: METAL_COLOR, radius: 0.7 }],
      },
      {
        narration: heteroleptic
          ? `${ligandA.count} ${ligandA.formula} and ${ligandB.count} ${ligandB.formula} ligands coordinate to it, ${def.coordinationNumber === 4 ? 'in a plane' : 'in three dimensions'}.`
          : `${def.coordinationNumber} ${ligandA.formula} ligands coordinate to it, ${geometryName}.`,
        objects: [...bonds, ...ligandNodes],
      },
      ...(heteroleptic
        ? [{
            narration: `The ${def.ligands[0].formula} ligands are ${def.isomer === 'cis' ? 'next to each other' : 'directly across from each other'} — that is what "${def.isomer}" means here.`,
            objects: [{
              type: 'label' as const,
              id: 'isomer-note',
              position: [0, -BOND_LEN * 0.5, 0] as Vec3,
              text: `${def.isomer}-isomer: ${def.ligands[0].formula} ${def.isomer === 'cis' ? 'adjacent' : 'opposite'}`,
              color: '#22c55e',
            }],
          }]
        : []),
    ],
  }
}

// ── Safety-net consistency checker (deterministic) ────────────────────────────

function angleBetween(a: Vec3, b: Vec3): number {
  const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
  const mag = Math.hypot(...a) * Math.hypot(...b)
  if (mag === 0) return NaN
  return (Math.acos(Math.max(-1, Math.min(1, dot / mag))) * 180) / Math.PI
}

export function checkCoordinationComplexConsistency(spec: SceneSpec, def: CoordinationComplexDef): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const central = objs.find((o) => o.id === 'central')?.position
  const ligandObjs = objs.filter((o) => /^lig\d+$/.test(o.id ?? ''))

  if (!central) return { ok: false, errors: ['no central atom found'] }
  if (ligandObjs.length !== def.coordinationNumber) {
    return { ok: false, errors: [`expected ${def.coordinationNumber} ligands, found ${ligandObjs.length}`] }
  }

  const groupACount = ligandObjs.filter((o) => o.color === LIGAND_COLOR_A).length
  const groupBCount = ligandObjs.filter((o) => o.color === LIGAND_COLOR_B).length
  const expectedA = def.ligands[0].count
  const expectedB = def.ligands.length === 2 ? def.ligands[1].count : 0
  if (groupACount !== expectedA || (def.ligands.length === 2 && groupBCount !== expectedB)) {
    errors.push(`ligand group counts do not match: A=${groupACount} (expected ${expectedA}), B=${groupBCount} (expected ${expectedB})`)
  }

  if (def.ligands.length === 2) {
    const groupAPositions = ligandObjs.filter((o) => o.color === LIGAND_COLOR_A).map((o) => o.position!) as Vec3[]
    if (groupAPositions.length === 2) {
      const angle = angleBetween(groupAPositions[0], groupAPositions[1])
      const expectedAngle = def.isomer === 'trans' ? 180 : 90
      if (Math.abs(angle - expectedAngle) > 1) {
        errors.push(`${def.isomer} isomer: expected the two ${def.ligands[0].formula} ligands at ${expectedAngle}°, measured ${round(angle, 1)}°`)
      }
    }
  }

  const expectedGeomAngle = def.geometry === 'octahedral' || def.geometry === 'square_planar' ? 90 : NaN
  for (let i = 0; i < ligandObjs.length; i++) {
    for (let j = i + 1; j < ligandObjs.length; j++) {
      const angle = angleBetween(ligandObjs[i].position as Vec3, ligandObjs[j].position as Vec3)
      if (angle < expectedGeomAngle - 1) {
        errors.push(`two ligands at ${round(angle, 1)}° — closer than the minimum ${expectedGeomAngle}° for ${def.geometry}`)
      }
    }
  }

  return { ok: errors.length === 0, errors }
}
