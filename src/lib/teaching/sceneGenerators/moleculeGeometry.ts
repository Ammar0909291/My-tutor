/**
 * Part 2 (option C) — molecular geometry scene generator. THIRD scene type.
 *
 * Probe failure addressed: the free-form generator drew "a linear water molecule
 * instead of bent ~104.5°". Molecular shape is NOT something to generate from raw
 * coordinates — it's a small set of textbook (VSEPR) constants. So the LLM only
 * EXTRACTS the molecule name; code looks up the real bond angle and places the
 * atoms at it, correct by construction.
 *
 * NEW, separate code path — does not touch generateSceneSpec.ts. The lookup +
 * placement + checker are Groq-free and unit-tested; only extractMoleculeName()
 * calls the LLM and needs a live test later.
 */

import { generateJSON } from '@/lib/ai/client'
import type { SceneSpec, Vec3 } from '../sceneSpec'
import { round, type ConsistencyResult } from './shared'

// ── VSEPR table: textbook geometries for common school-curriculum molecules ──

type GeometryType = 'linear' | 'bent' | 'trigonal_pyramidal' | 'tetrahedral' | 'trigonal_planar'

interface MoleculeDef {
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
}

const MOLECULES: MoleculeDef[] = [
  { name: 'Water', aliases: ['water', 'h2o', 'h₂o'], central: 'O', peripheral: 'H', count: 2, geometry: 'bent', bondAngle: 104.5 },
  { name: 'Hydrogen Sulfide', aliases: ['hydrogen sulfide', 'hydrogen sulphide', 'h2s', 'h₂s'], central: 'S', peripheral: 'H', count: 2, geometry: 'bent', bondAngle: 92 },
  { name: 'Carbon Dioxide', aliases: ['carbon dioxide', 'co2', 'co₂'], central: 'C', peripheral: 'O', count: 2, geometry: 'linear', bondAngle: 180 },
  { name: 'Ammonia', aliases: ['ammonia', 'nh3', 'nh₃'], central: 'N', peripheral: 'H', count: 3, geometry: 'trigonal_pyramidal', bondAngle: 107 },
  { name: 'Methane', aliases: ['methane', 'ch4', 'ch₄'], central: 'C', peripheral: 'H', count: 4, geometry: 'tetrahedral', bondAngle: 109.5 },
  { name: 'Boron Trifluoride', aliases: ['boron trifluoride', 'bf3', 'bf₃'], central: 'B', peripheral: 'F', count: 3, geometry: 'trigonal_planar', bondAngle: 120 },
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

/** Build a molecule SceneSpec with the textbook-correct bond angle. Pure. */
export function buildMoleculeScene(def: MoleculeDef): SceneSpec {
  const geo = computeGeometry(def)
  const bonds = geo.atoms.map((a, i) => ({
    type: 'bond' as const, id: `bond${i}`, from: geo.centralPos, to: a.pos, color: '#94a3b8',
  }))
  const atomNodes = geo.atoms.map((a, i) => ({
    type: 'node' as const, id: `p${i}`, position: a.pos, text: a.label, color: '#3b82f6', radius: 0.5,
  }))

  return {
    id: `molecule-${def.name.toLowerCase().replace(/\s+/g, '-')}`,
    title: `${def.name} — ${def.geometry.replace(/_/g, ' ')} (${def.bondAngle}° bond angle)`,
    sceneType: 'diagram',
    teachingGoal: `Show the real ${def.geometry.replace(/_/g, ' ')} shape of ${def.name}, with its ${def.bondAngle}° bond angle.`,
    cameraDistance: BOND_LEN * 3,
    ariaLabel: `${def.name} molecule: a central ${def.central} atom bonded to ${def.count} ${def.peripheral} atoms in a ${def.geometry.replace(/_/g, ' ')} arrangement with a ${def.bondAngle} degree bond angle.`,
    steps: [
      {
        narration: `${def.name} has a central ${def.central} atom.`,
        objects: [{ type: 'node', id: 'central', position: geo.centralPos, text: def.central, color: '#ef4444', radius: 0.7 }],
      },
      {
        narration: `It bonds to ${def.count} ${def.peripheral} atom${def.count > 1 ? 's' : ''}.`,
        objects: [...bonds, ...atomNodes],
      },
      {
        narration: `The shape is ${def.geometry.replace(/_/g, ' ')}: the ${def.peripheral}–${def.central}–${def.peripheral} bond angle is ${def.bondAngle}°, not a straight line.`,
        objects: [{ type: 'label', id: 'angle', position: [0, -BOND_LEN * 0.4, 0], text: `${def.bondAngle}° bond angle`, color: '#f59e0b' }],
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

// ── LLM molecule-name extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and identify the single molecule whose shape/bonding it is describing, if any.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isMolecule": true|false, "molecule": "<common name or formula, e.g. water / H2O>"}
- isMolecule is false if no specific molecule's geometry is being discussed.
- Give the molecule actually discussed; do not guess one that isn't mentioned.`
}

/**
 * Extract a known molecule from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractMolecule(text: string): Promise<MoleculeDef | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 100).catch(() => null)
  if (!raw || raw.isMolecule !== true) return null
  return lookupMolecule(raw.molecule)
}
