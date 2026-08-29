/**
 * crystalLattice — the PURE half (curated reference data, geometry, consistency check).
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

// ── Curated reference data: the three cubic unit cells ───────────────────────

export type LatticeKind = 'simple_cubic' | 'bcc' | 'fcc'

export interface LatticeDef {
  kind: LatticeKind
  name: string
  aliases: string[]
  /** Effective atoms per unit cell (textbook constant) — the value the checker re-derives. */
  atomsPerCell: number
}

const LATTICES: LatticeDef[] = [
  { kind: 'simple_cubic', name: 'Simple Cubic', aliases: ['simple cubic', 'primitive cubic'], atomsPerCell: 1 },
  { kind: 'bcc', name: 'Body-Centred Cubic (BCC)', aliases: ['body-centered cubic', 'body centred cubic', 'body-centred cubic', 'body centered cubic', 'bcc'], atomsPerCell: 2 },
  { kind: 'fcc', name: 'Face-Centred Cubic (FCC)', aliases: ['face-centered cubic', 'face centred cubic', 'face-centred cubic', 'face centered cubic', 'fcc', 'cubic close packed', 'ccp'], atomsPerCell: 4 },
]

const HALF = 8 // half the cube side in scene units (cube spans ±8)
/** Find a lattice type in free text. Longest alias first to avoid partial shadowing. */
export function lookupLattice(raw: unknown): LatticeDef | null {
  if (typeof raw !== 'string') return null
  const lower = raw.toLowerCase()
  let best: { def: LatticeDef; len: number } | null = null
  for (const def of LATTICES) {
    for (const a of def.aliases) {
      if (lower.includes(a) && (!best || a.length > best.len)) best = { def, len: a.length }
    }
  }
  return best?.def ?? null
}

// ── Deterministic geometry ───────────────────────────────────────────────────

const CORNERS: Vec3[] = [
  [-HALF, -HALF, -HALF], [HALF, -HALF, -HALF], [HALF, HALF, -HALF], [-HALF, HALF, -HALF],
  [-HALF, -HALF, HALF], [HALF, -HALF, HALF], [HALF, HALF, HALF], [-HALF, HALF, HALF],
]

const FACE_CENTERS: Vec3[] = [
  [0, 0, -HALF], [0, 0, HALF], [0, -HALF, 0], [0, HALF, 0], [-HALF, 0, 0], [HALF, 0, 0],
]

const BODY_CENTER: Vec3 = [0, 0, 0]

/** The 12 cube edges as corner-index pairs (differ in exactly one coordinate). */
function cubeEdges(): [number, number][] {
  const edges: [number, number][] = []
  for (let i = 0; i < CORNERS.length; i++) {
    for (let j = i + 1; j < CORNERS.length; j++) {
      const diff = CORNERS[i].reduce((d, c, k) => d + (c !== CORNERS[j][k] ? 1 : 0), 0)
      if (diff === 1) edges.push([i, j])
    }
  }
  return edges
}

interface LatticeAtom { pos: Vec3; role: 'corner' | 'face' | 'body' }

function latticeAtoms(def: LatticeDef): LatticeAtom[] {
  const atoms: LatticeAtom[] = CORNERS.map((p) => ({ pos: p, role: 'corner' as const }))
  if (def.kind === 'bcc') atoms.push({ pos: BODY_CENTER, role: 'body' })
  if (def.kind === 'fcc') for (const p of FACE_CENTERS) atoms.push({ pos: p, role: 'face' })
  return atoms
}

/** Build a cubic-unit-cell SceneSpec. Pure, deterministic. */
export function buildLatticeScene(def: LatticeDef): SceneSpec {
  const atoms = latticeAtoms(def)
  const edges = cubeEdges()
  const colorFor = (role: LatticeAtom['role']) => role === 'corner' ? '#3b82f6' : role === 'body' ? '#ef4444' : '#f59e0b'

  const steps: SceneSpec['steps'] = [
      {
        narration: `The unit cell is a cube. Atoms sit at the 8 corners.`,
        objects: [
          ...edges.map(([i, j], k) => ({ type: 'bond' as const, id: `edge${k}`, from: CORNERS[i], to: CORNERS[j], color: '#cbd5e1' })),
          ...CORNERS.map((p, i) => ({ type: 'node' as const, id: `corner${i}`, position: p, color: '#3b82f6', radius: 0.6, properties: { role: 'corner' } })),
        ],
      },
      {
        narration: def.kind === 'simple_cubic'
          ? `In a simple cubic cell there are no extra atoms — only the 8 shared corners.`
          : def.kind === 'bcc'
            ? `Body-centred cubic adds one atom at the very centre of the cube.`
            : `Face-centred cubic adds one atom at the centre of each of the 6 faces.`,
        objects: atoms.filter((a) => a.role !== 'corner').map((a, i) => ({
          type: 'node' as const, id: `extra${i}`, position: a.pos, color: colorFor(a.role), radius: 0.6, properties: { role: a.role },
        })),
      },
      {
        narration: `Counting shares — each corner counts 1/8, each face 1/2, a body atom 1 — gives ${def.atomsPerCell} atom${def.atomsPerCell === 1 ? '' : 's'} per unit cell.`,
        objects: [
          { type: 'label' as const, id: 'count', position: [0, -HALF - 3, 0] as Vec3, text: `${def.atomsPerCell} atom${def.atomsPerCell === 1 ? '' : 's'} / cell`, color: '#22c55e', properties: { atomsPerCell: def.atomsPerCell } },
        ],
      },
    ]
    // Simple cubic has no extra atoms, so its middle step would be empty (the
    // validator requires ≥1 object per step) — drop any empty step.
    .filter((s) => s.objects.length > 0)

  return {
    id: `lattice-${def.kind}`,
    title: `${def.name} unit cell — ${def.atomsPerCell} atom${def.atomsPerCell === 1 ? '' : 's'} per cell`,
    sceneType: 'diagram',
    teachingGoal: `Show the ${def.name} unit cell and how corner/face/body sharing gives ${def.atomsPerCell} effective atom${def.atomsPerCell === 1 ? '' : 's'} per cell.`,
    cameraDistance: HALF * 5,
    ariaLabel: `A ${def.name} unit cell with ${atoms.length} atoms drawn, equivalent to ${def.atomsPerCell} atoms per cell after sharing.`,
    steps,
  }
}

// ── Safety-net consistency checker (independent: the sharing rule) ────────────

export function checkLatticeConsistency(spec: SceneSpec, def: LatticeDef): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const corners = objs.filter((o) => /^corner\d+$/.test(o.id ?? ''))
  const extras = objs.filter((o) => /^extra\d+$/.test(o.id ?? ''))

  // 1. exactly 8 corners.
  if (corners.length !== 8) errors.push(`expected 8 corner atoms, got ${corners.length}`)

  // 2. corners form a cube of side 2·HALF (all coords ±HALF, 12 unit-edges).
  for (const c of corners) {
    const [x, y, z] = c.position!
    if ([x, y, z].some((v) => Math.abs(Math.abs(v) - HALF) > 0.01)) { errors.push('a corner is not at a cube vertex'); break }
  }

  // 3. role counts match the lattice type.
  const faces = extras.filter((e) => (e.properties as Record<string, unknown>)?.role === 'face').length
  const bodies = extras.filter((e) => (e.properties as Record<string, unknown>)?.role === 'body').length
  const expectFaces = def.kind === 'fcc' ? 6 : 0
  const expectBodies = def.kind === 'bcc' ? 1 : 0
  if (faces !== expectFaces) errors.push(`expected ${expectFaces} face atoms, got ${faces}`)
  if (bodies !== expectBodies) errors.push(`expected ${expectBodies} body atom(s), got ${bodies}`)

  // 4. INDEPENDENT derivation: effective atoms per cell via the sharing rule
  //    (corner 1/8, face 1/2, body 1) must equal the textbook constant + the label.
  const effective = corners.length * (1 / 8) + faces * (1 / 2) + bodies * 1
  if (Math.abs(effective - def.atomsPerCell) > 1e-9) {
    errors.push(`sharing-rule atoms/cell = ${round(effective, 3)} != textbook ${def.atomsPerCell}`)
  }
  const labelled = Number((objs.find((o) => o.id === 'count')?.properties as Record<string, unknown> | undefined)?.atomsPerCell)
  if (labelled !== def.atomsPerCell) errors.push(`label atoms/cell ${labelled} != ${def.atomsPerCell}`)

  // 5. body atom (if any) at the centroid; face atoms (if any) on face centres.
  if (def.kind === 'bcc') {
    const b = extras[0]?.position
    if (!b || Math.hypot(b[0], b[1], b[2]) > 0.01) errors.push('body atom is not at the cube centre')
  }
  if (def.kind === 'fcc') {
    for (const e of extras) {
      const p = e.position!
      const onFace = p.filter((v) => Math.abs(Math.abs(v) - HALF) < 0.01).length === 1 &&
        p.filter((v) => Math.abs(v) < 0.01).length === 2
      if (!onFace) { errors.push('a face atom is not at a face centre'); break }
    }
  }

  return { ok: errors.length === 0, errors }
}

