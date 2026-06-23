/**
 * Part 2 (option C) — crystal lattice (cubic unit cell) scene generator. 8TH type.
 *
 * Data-driven like electron shells: the three cubic Bravais unit cells (simple,
 * body-centred, face-centred) are textbook-fixed geometries. The LLM only
 * EXTRACTS which lattice type is meant; code places the atoms at the exact
 * fractional positions, correct by construction.
 *
 * SCOPE: the three CUBIC unit cells only (simple cubic, BCC, FCC). Other Bravais
 * lattices (tetragonal, hexagonal, etc.) and compound lattices (rock-salt NaCl,
 * etc.) are deliberately out of scope — they need their own curated data and a
 * scope decision, not a quick add.
 *
 * Independent-derivation checker: the scene is BUILT from a position table; the
 * checker re-derives the EFFECTIVE atoms-per-unit-cell from the drawn positions
 * using the corner/face/body SHARING RULE (corner=1/8, face=1/2, body=1), which
 * must equal the known value (SC=1, BCC=2, FCC=4) — a different derivation than
 * the raw count.
 *
 * NEW, separate code path — does not touch generateSceneSpec.ts. Pure-data parts
 * are Groq-free and unit-tested; only extractLattice() calls the LLM.
 */

import { generateJSON } from '@/lib/ai/client'
import { validateSceneSpec } from '../sceneSpecValidator'
import type { SceneSpec, Vec3 } from '../sceneSpec'
import { round, type ConsistencyResult } from './shared'

// ── Curated reference data: the three cubic unit cells ───────────────────────

export type LatticeKind = 'simple_cubic' | 'bcc' | 'fcc'

interface LatticeDef {
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

// ── LLM lattice extraction (NEEDS A LIVE GROQ TEST — isolated) ────────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and identify which cubic crystal unit cell it describes, if any.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isLattice": true|false, "lattice": "simple cubic" | "body-centered cubic" | "face-centered cubic"}
- isLattice is false if the text is not about one of these three cubic unit cells.
- Only these three cubic lattices are supported.`
}

/**
 * Extract a known cubic lattice from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractLattice(text: string): Promise<LatticeDef | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 100).catch(() => null)
  if (!raw || raw.isLattice !== true) return null
  return lookupLattice(raw.lattice)
}

/**
 * Full pipeline: extract lattice (LLM) → build (data-driven) → structural
 * validation → independent sharing-rule check. Returns null unless every stage
 * passes. Extraction stage NEEDS a live Groq test.
 */
export async function generateLatticeScene(text: string): Promise<SceneSpec | null> {
  const def = await extractLattice(text)
  if (!def) return null
  const spec = buildLatticeScene(def)
  if (!validateSceneSpec(spec).valid) return null
  if (!checkLatticeConsistency(spec, def).ok) return null
  return spec
}
