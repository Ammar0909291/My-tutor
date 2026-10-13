/**
 * moleculeGeometry — the PURE half (curated reference data, geometry, consistency check).
 *
 * Split out of the module of the same name for the reason given there: these
 * builders and their lookup tables must be runnable in a BROWSER so a figure can
 * be re-derived and re-focused on the client, and `@/lib/ai/client` reaches the
 * provider router, the AI budget and the rate limiter.
 *
 * Nothing about the data or the geometry changed in the split. Enforced by
 * src/tests/sceneGeneratorPurity.test.ts.
 */

import type { SceneSpec, Vec3 } from '../sceneSpec'
import { round, type ConsistencyResult } from './shared'

// ── VSEPR table: textbook geometries for common school-curriculum molecules ──

type GeometryType = 'linear' | 'bent' | 'trigonal_pyramidal' | 'tetrahedral' | 'trigonal_planar'

export interface MoleculeDef {
  /** Canonical display name. */
  name: string
  /** Accepted aliases / formulae (lowercased) for matching extracted text. */
  aliases: string[]
  central: string
  peripheral: string
  /** Number of bonded peripheral atoms. */
  count: number
  geometry: GeometryType
  /** Bond angle in degrees (the value the probe got wrong for water). */
  bondAngle: number
  /** Bond order of every central–peripheral bond (omitted = single). CO₂ is O=C=O. */
  bondOrder?: number
  /** Lone pairs on the CENTRAL atom — what makes the shape bent / pyramidal rather than the ideal domain geometry. */
  lonePairs: number
}

const MOLECULES: MoleculeDef[] = [
  { name: 'Water', aliases: ['water', 'h2o', 'h₂o'], central: 'O', peripheral: 'H', count: 2, geometry: 'bent', bondAngle: 104.5, lonePairs: 2 },
  { name: 'Hydrogen Sulfide', aliases: ['hydrogen sulfide', 'hydrogen sulphide', 'h2s', 'h₂s'], central: 'S', peripheral: 'H', count: 2, geometry: 'bent', bondAngle: 92, lonePairs: 2 },
  { name: 'Carbon Dioxide', aliases: ['carbon dioxide', 'co2', 'co₂'], central: 'C', peripheral: 'O', count: 2, geometry: 'linear', bondAngle: 180, bondOrder: 2, lonePairs: 0 },
  { name: 'Ammonia', aliases: ['ammonia', 'nh3', 'nh₃'], central: 'N', peripheral: 'H', count: 3, geometry: 'trigonal_pyramidal', bondAngle: 107, lonePairs: 1 },
  { name: 'Methane', aliases: ['methane', 'ch4', 'ch₄'], central: 'C', peripheral: 'H', count: 4, geometry: 'tetrahedral', bondAngle: 109.5, lonePairs: 0 },
  { name: 'Boron Trifluoride', aliases: ['boron trifluoride', 'bf3', 'bf₃'], central: 'B', peripheral: 'F', count: 3, geometry: 'trigonal_planar', bondAngle: 120, lonePairs: 0 },
]

const BOND_LEN = 8
/** Find a molecule by name/formula in free text. Longest alias first to avoid partial shadowing. */
export function lookupMolecule(raw: unknown): MoleculeDef | null {
  if (typeof raw !== 'string') return null
  const lower = raw.toLowerCase()
  let best: { def: MoleculeDef; len: number } | null = null
  for (const def of MOLECULES) {
    for (const a of def.aliases) {
      if (lower.includes(a) && (!best || a.length > best.len)) best = { def, len: a.length }
    }
  }
  return best?.def ?? null
}

// ── Deterministic geometry from the VSEPR bond angle ─────────────────────────

/** Unit bond directions for `count` peripheral atoms at the given bond angle. */
function bondDirections(geometry: GeometryType, count: number, bondAngleDeg: number): [number, number, number][] {
  const θ = (bondAngleDeg * Math.PI) / 180
  switch (geometry) {
    case 'linear':
      return [[1, 0, 0], [-1, 0, 0]]
    case 'bent': {
      const h = θ / 2 // symmetric about +y
      return [[Math.sin(h), Math.cos(h), 0], [-Math.sin(h), Math.cos(h), 0]]
    }
    case 'trigonal_planar':
      return [0, 1, 2].map((i) => {
        const φ = (i * 120 * Math.PI) / 180 + Math.PI / 2
        return [Math.cos(φ), Math.sin(φ), 0] as [number, number, number]
      })
    case 'trigonal_pyramidal': {
      // Three equivalent bonds with mutual angle θ around the +y axis.
      // cosθ = 1.5·cos²β − 0.5  →  solve the polar angle β from the axis.
      const cosBeta2 = (Math.cos(θ) + 0.5) / 1.5
      const beta = Math.acos(Math.sqrt(Math.max(0, cosBeta2)))
      return [0, 1, 2].map((i) => {
        const φ = (i * 120 * Math.PI) / 180
        return [Math.sin(beta) * Math.cos(φ), Math.cos(beta), Math.sin(beta) * Math.sin(φ)] as [number, number, number]
      })
    }
    case 'tetrahedral': {
      // Classic tetrahedral directions (mutual angle 109.47°), normalized.
      const r = 1 / Math.sqrt(3)
      return [[r, r, r], [r, -r, -r], [-r, r, -r], [-r, -r, r]]
    }
  }
}

interface MoleculeGeometry {
  centralPos: Vec3
  atoms: { pos: Vec3; label: string }[]
}

function computeGeometry(def: MoleculeDef): MoleculeGeometry {
  const dirs = bondDirections(def.geometry, def.count, def.bondAngle).slice(0, def.count)
  return {
    centralPos: [0, 0, 0],
    atoms: dirs.map((d) => ({
      pos: [round(d[0] * BOND_LEN), round(d[1] * BOND_LEN), round(d[2] * BOND_LEN)] as Vec3,
      label: def.peripheral,
    })),
  }
}

/** Where a lone pair is drawn: inside the bonded atoms (they sit at BOND_LEN), on the central atom's own side. */
const LONE_PAIR_RADIUS = 2.6
/** Half the angle between the two lone pairs of a bent AX₂E₂ centre: the tetrahedral domain angle 109.47° / 2. */
const AX2E2_HALF = (Math.acos(-1 / 3) / 2)

/**
 * Unit directions of the central atom's lone pairs, from VSEPR electron-domain geometry:
 *   one lone pair (AX₃E, NH₃)  — straight opposite the three bonds, −y;
 *   two lone pairs (AX₂E₂, H₂O) — in the plane PERPENDICULAR to the H–X–H plane (z), ±54.7° either side of −y,
 *                                 so every domain (2 bonds + 2 lone pairs) is tetrahedral.
 * Any other count has no lone pair drawn (CH₄, BF₃, CO₂ have none on the centre).
 */
export function lonePairDirections(def: MoleculeDef): Vec3[] {
  if (def.lonePairs === 1 && def.geometry === 'trigonal_pyramidal') return [[0, -1, 0]]
  if (def.lonePairs === 2 && def.geometry === 'bent') {
    const c = Math.cos(AX2E2_HALF), sn = Math.sin(AX2E2_HALF)
    return [[0, -c, sn], [0, -c, -sn]] as Vec3[]   // each makes 54.7° with -y, so the pair is 109.47° apart
  }
  return []
}

/** Build a molecule SceneSpec with the textbook-correct bond angle. Pure. */
export function buildMoleculeScene(def: MoleculeDef): SceneSpec {
  const geo = computeGeometry(def)
  const order = def.bondOrder ?? 1
  const bonds = geo.atoms.map((a, i) => ({
    type: 'bond' as const, id: `bond${i}`, from: geo.centralPos, to: a.pos, color: '#94a3b8',
    ...(order > 1 ? { properties: { order } } : {}),
  }))
  // Lone pairs on the central atom. One carries the words "lone pair" so the drawing says what the amber markers are
  // (the others are the same class, same size and colour — not told apart by colour alone).
  const lonePairNodes = lonePairDirections(def).map((d, i) => ({
    type: 'particle' as const, id: `lp${i}`, position: [round(d[0] * LONE_PAIR_RADIUS), round(d[1] * LONE_PAIR_RADIUS), round(d[2] * LONE_PAIR_RADIUS)] as Vec3,
    // The words sit BESIDE the marker (labelOffset), never on it: text over a saturated amber sphere cannot hold 4.5:1 (R16).
    color: '#fbbf24', radius: 0.38, ...(i === 0 ? { text: 'lone pair' } : {}),
    properties: { kind: 'lone-pair', on: 'central', ...(i === 0 ? { labelOffset: [1.9, -0.3, 0] } : {}) },
  }))
  // With lone pairs drawn under the central atom the labels move down so they never sit on a marker.
  const belowY = def.lonePairs > 0 ? -BOND_LEN * 0.58 : -BOND_LEN * 0.4
  const atomNodes = geo.atoms.map((a, i) => ({
    type: 'node' as const, id: `p${i}`, position: a.pos, text: a.label, color: '#3b82f6', radius: 0.5,
  }))

  return {
    id: `molecule-${def.name.toLowerCase().replace(/\s+/g, '-')}`,
    title: `${def.name} — ${def.geometry.replace(/_/g, ' ')} (${def.bondAngle}° bond angle)`,
    sceneType: 'diagram',
    // The x/y/z triad names no quantity in this figure (a molecule / lattice / shell has no meaningful axes) and its letters
    // collided with the atom labels at the origin (measured 2026-10-08: x|y|z|O stacked at stage 1). Grid left as it was.
    // R16: the floor grid ran under the bottom label and was the pixels it measured against (3.9–4.5:1 in a minority bucket); a
    // molecule / unit cell has no floor and the grid names no quantity, so the stage draws neither grid nor axes.
    stage: { grid: false, axes: false },
    teachingGoal: `Show the real ${def.geometry.replace(/_/g, ' ')} shape of ${def.name}, with its ${def.bondAngle}° bond angle.`,
    cameraDistance: BOND_LEN * 3,
    ariaLabel: `${def.name} molecule: a central ${def.central} atom bonded to ${def.count} ${def.peripheral} atoms in a ${def.geometry.replace(/_/g, ' ')} arrangement with a ${def.bondAngle} degree bond angle.`,
    steps: [
      {
        narration: `${def.name} has a central ${def.central} atom.`,
        objects: [{ type: 'node', id: 'central', position: geo.centralPos, text: def.central, color: '#ef4444', radius: 0.7 }],
      },
      {
        narration: `It bonds to ${def.count} ${def.peripheral} atom${def.count > 1 ? 's' : ''}${order === 2 ? ' with double bonds' : order === 3 ? ' with triple bonds' : ''}.`,
        objects: [...bonds, ...atomNodes],
      },
      ...(lonePairNodes.length ? [{
        narration: `${def.central} also carries ${def.lonePairs} lone pair${def.lonePairs > 1 ? 's' : ''}: non-bonding electrons that take up room around ${def.central} and push the bonds together.`,
        objects: lonePairNodes,
      }] : []),
      {
        narration: `The shape is ${def.geometry.replace(/_/g, ' ')}: the ${def.peripheral}–${def.central}–${def.peripheral} bond angle is ${def.bondAngle}°, not a straight line.`,
        objects: [
          { type: 'label', id: 'angle', position: [0, belowY, 0], text: `${def.bondAngle}° bond angle`, color: '#f59e0b' },
          { type: 'label', id: 'lone-pair-count', position: [0, belowY - 1.6, 0], text: def.lonePairs === 0 ? `no lone pairs on ${def.central}` : `${def.lonePairs} lone pair${def.lonePairs > 1 ? 's' : ''} on ${def.central}`, color: '#f59e0b' },
        ],
      },
    ],
  }
}

// ── Safety-net consistency checker (deterministic) ───────────────────────────

function angleBetween(c: Vec3, a: Vec3, b: Vec3): number {
  const u = [a[0] - c[0], a[1] - c[1], a[2] - c[2]]
  const w = [b[0] - c[0], b[1] - c[1], b[2] - c[2]]
  const dot = u[0] * w[0] + u[1] * w[1] + u[2] * w[2]
  const mag = Math.hypot(...u) * Math.hypot(...w)
  if (mag === 0) return NaN
  return (Math.acos(Math.max(-1, Math.min(1, dot / mag))) * 180) / Math.PI
}

/**
 * Recompute the bond angle(s) from the actual atom coordinates and confirm they
 * match the textbook VSEPR value — i.e. water really is bent at 104.5°, not
 * linear, which is the exact error the free-form probe output made.
 */
export function checkMoleculeConsistency(spec: SceneSpec, def: MoleculeDef): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const central = objs.find((o) => o.id === 'central')?.position
  const peripheral = objs.filter((o) => /^p\d+$/.test(o.id ?? '')).map((o) => o.position!) as Vec3[]
  if (!central || peripheral.length !== def.count) {
    return { ok: false, errors: [`expected 1 central + ${def.count} peripheral atoms, got ${peripheral.length} peripheral`] }
  }

  const tol = 0.5 // degrees
  // For these symmetric geometries every ADJACENT pair shares the same bond angle.
  // Collect the minimum pairwise angle (adjacent) and verify it equals the table.
  let minAngle = Infinity
  for (let i = 0; i < peripheral.length; i++) {
    for (let j = i + 1; j < peripheral.length; j++) {
      minAngle = Math.min(minAngle, angleBetween(central, peripheral[i], peripheral[j]))
    }
  }
  if (Math.abs(minAngle - def.bondAngle) > tol) {
    errors.push(`measured bond angle ${round(minAngle, 2)}° != textbook ${def.bondAngle}° for ${def.name}`)
  }
  // Guard against the specific probe failure: a 2-atom molecule must not be linear unless it should be.
  if (def.count === 2 && def.geometry !== 'linear' && minAngle > 175) {
    errors.push(`${def.name} rendered ~linear (${round(minAngle, 1)}°) but should be ${def.geometry}`)
  }

  return { ok: errors.length === 0, errors }
}

