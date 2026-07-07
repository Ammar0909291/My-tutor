/**
 * Part 2 (option C) — electron-shell (Bohr model) scene generator. SEVENTH type.
 *
 * Unlike the formula-driven generators, this is DATA-driven: the shell electron
 * counts are curated, textbook-fixed reference data (the Bohr–Bury scheme), not a
 * geometric formula. The LLM only EXTRACTS which element is meant; code looks up
 * its electron configuration and draws concentric shells, correct by construction.
 *
 * SCOPE: elements Z = 1–20 only. This is the range where the simple "2, 8, 8, 2"
 * Bohr–Bury rule is exactly what school curricula teach; from Z = 21 (Sc) onward
 * d-orbital filling makes the simple shell picture wrong, so we deliberately do
 * NOT cover it (returning null) rather than draw a misleading diagram.
 *
 * Independent-derivation checker: the scene is BUILT from the lookup table; the
 * checker (a) re-derives the shell distribution ALGORITHMICALLY from the Bohr–Bury
 * filling rule and compares, and (b) counts the actual electron dots and confirms
 * the total equals the element's atomic number Z — a fact independent of the
 * per-shell split.
 *
 * NEW, separate code path — does not touch generateSceneSpec.ts. Pure-data parts
 * are Groq-free and unit-tested; only extractElement() calls the LLM.
 */

import { generateJSON } from '@/lib/ai/client'
import type { SceneSpec, Vec3 } from '../sceneSpec'
import { round, strictNumber, type ConsistencyResult } from './shared'

// ── Curated reference data: Z = 1–20, Bohr–Bury shell electron counts ────────

interface ElementDef {
  z: number
  symbol: string
  name: string
  /** Electrons per shell K, L, M, N… (Bohr–Bury scheme). Sums to z. */
  shells: number[]
}

const ELEMENTS: ElementDef[] = [
  { z: 1, symbol: 'H', name: 'Hydrogen', shells: [1] },
  { z: 2, symbol: 'He', name: 'Helium', shells: [2] },
  { z: 3, symbol: 'Li', name: 'Lithium', shells: [2, 1] },
  { z: 4, symbol: 'Be', name: 'Beryllium', shells: [2, 2] },
  { z: 5, symbol: 'B', name: 'Boron', shells: [2, 3] },
  { z: 6, symbol: 'C', name: 'Carbon', shells: [2, 4] },
  { z: 7, symbol: 'N', name: 'Nitrogen', shells: [2, 5] },
  { z: 8, symbol: 'O', name: 'Oxygen', shells: [2, 6] },
  { z: 9, symbol: 'F', name: 'Fluorine', shells: [2, 7] },
  { z: 10, symbol: 'Ne', name: 'Neon', shells: [2, 8] },
  { z: 11, symbol: 'Na', name: 'Sodium', shells: [2, 8, 1] },
  { z: 12, symbol: 'Mg', name: 'Magnesium', shells: [2, 8, 2] },
  { z: 13, symbol: 'Al', name: 'Aluminium', shells: [2, 8, 3] },
  { z: 14, symbol: 'Si', name: 'Silicon', shells: [2, 8, 4] },
  { z: 15, symbol: 'P', name: 'Phosphorus', shells: [2, 8, 5] },
  { z: 16, symbol: 'S', name: 'Sulfur', shells: [2, 8, 6] },
  { z: 17, symbol: 'Cl', name: 'Chlorine', shells: [2, 8, 7] },
  { z: 18, symbol: 'Ar', name: 'Argon', shells: [2, 8, 8] },
  { z: 19, symbol: 'K', name: 'Potassium', shells: [2, 8, 8, 1] },
  { z: 20, symbol: 'Ca', name: 'Calcium', shells: [2, 8, 8, 2] },
]

const SHELL_NAMES = ['K', 'L', 'M', 'N']
const VISUAL_MAX = 16
/**
 * Independent algorithmic Bohr–Bury fill (for Z ≤ 20): fill K(2), then each further
 * shell up to 8 (the outermost-≤8 rule that holds through calcium). Used by the
 * checker to cross-validate the lookup table — a DIFFERENT derivation than the table.
 */
export function bohrBuryFill(z: number): number[] {
  const caps = [2, 8, 8, 2] // exact for Z = 1–20
  const shells: number[] = []
  let remaining = z
  for (const cap of caps) {
    if (remaining <= 0) break
    const n = Math.min(cap, remaining)
    shells.push(n)
    remaining -= n
  }
  return shells
}

/** Find an element by symbol, name, or atomic number in free text / a value. */
export function lookupElement(raw: unknown): ElementDef | null {
  if (raw == null) return null
  // numeric atomic number — strictNumber() restricts coercion to actual
  // number/string inputs, since bare Number(raw) has surprising coercions for
  // other types (Number(true) === 1, Number([5]) === 5) that would silently
  // resolve a malformed LLM field to the wrong element instead of rejecting it.
  const asNum = strictNumber(raw)
  if (Number.isInteger(asNum) && asNum >= 1 && asNum <= 20) {
    return ELEMENTS.find((e) => e.z === asNum) ?? null
  }
  if (typeof raw !== 'string') return null
  const lower = raw.toLowerCase().trim()
  // exact symbol (case-insensitive) — most specific
  const bySymbol = ELEMENTS.find((e) => e.symbol.toLowerCase() === lower)
  if (bySymbol) return bySymbol
  // name substring
  let best: { def: ElementDef; len: number } | null = null
  for (const e of ELEMENTS) {
    if (lower.includes(e.name.toLowerCase()) && (!best || e.name.length > best.len)) best = { def: e, len: e.name.length }
  }
  return best?.def ?? null
}

/** Reject elements outside the curriculum-safe Z = 1–20 Bohr–Bury range. */
export function validateElement(def: ElementDef | null): ElementDef | null {
  if (!def) return null
  if (def.z < 1 || def.z > 20) return null
  if (def.shells.reduce((a, b) => a + b, 0) !== def.z) return null // table integrity
  return def
}

// ── Deterministic geometry ───────────────────────────────────────────────────

interface ShellGeometry {
  nucleus: Vec3
  shellRings: { radius: number; points: Vec3[] }[]
  electrons: { pos: Vec3; shell: number }[]
}

function computeGeometry(def: ElementDef): ShellGeometry {
  const nShells = def.shells.length
  const maxRadius = VISUAL_MAX
  const ringR = (k: number) => (maxRadius * (k + 1)) / nShells // k = 0-based shell index

  const ringSamples = 40
  const shellRings = def.shells.map((_, k) => {
    const r = ringR(k)
    const points: Vec3[] = []
    for (let i = 0; i <= ringSamples; i++) {
      const a = (2 * Math.PI * i) / ringSamples
      points.push([round(r * Math.cos(a)), round(r * Math.sin(a)), 0])
    }
    return { radius: r, points }
  })

  const electrons: { pos: Vec3; shell: number }[] = []
  def.shells.forEach((count, k) => {
    const r = ringR(k)
    for (let j = 0; j < count; j++) {
      const a = (2 * Math.PI * j) / count + Math.PI / 4 // offset so dots don't sit on the axis
      electrons.push({ pos: [round(r * Math.cos(a)), round(r * Math.sin(a)), 0], shell: k })
    }
  })

  return { nucleus: [0, 0, 0], shellRings, electrons }
}

/** Build an electron-shell SceneSpec for an element. Pure, deterministic. */
export function buildElectronShellScene(def: ElementDef): SceneSpec {
  const geo = computeGeometry(def)
  const valence = def.shells[def.shells.length - 1]
  const config = def.shells.map((c, k) => `${SHELL_NAMES[k] ?? `shell ${k + 1}`}:${c}`).join(', ')

  return {
    id: `electron-shells-${def.symbol.toLowerCase()}`,
    title: `${def.name} (${def.symbol}, Z=${def.z}) — electron configuration ${def.shells.join(', ')}`,
    sceneType: 'diagram',
    teachingGoal: `Show the Bohr-model electron shells of ${def.name}: ${config}, with ${valence} valence electron${valence === 1 ? '' : 's'}.`,
    cameraDistance: VISUAL_MAX * 2.6,
    ariaLabel: `${def.name}, atomic number ${def.z}, with electrons arranged in shells of ${def.shells.join(', ')}.`,
    steps: [
      {
        narration: `${def.name} has atomic number ${def.z}: a nucleus with ${def.z} protons, surrounded by ${def.z} electrons.`,
        objects: [
          { type: 'node', id: 'nucleus', position: geo.nucleus, text: `${def.symbol} (${def.z}+)`, color: '#ef4444', radius: 0.8 },
        ],
      },
      {
        narration: `The electrons occupy shells filling from the inside out: ${config}.`,
        objects: [
          ...geo.shellRings.map((ring, k) => ({ type: 'path' as const, id: `shell${k}`, points: ring.points, color: '#cbd5e1' })),
          ...geo.electrons.map((e, i) => ({ type: 'node' as const, id: `e${i}`, position: e.pos, color: '#3b82f6', radius: 0.3, properties: { shell: e.shell } })),
        ],
      },
      {
        narration: `The outermost shell holds ${valence} valence electron${valence === 1 ? '' : 's'} — these determine how ${def.name} bonds.`,
        objects: [
          { type: 'label', id: 'valence', position: [0, -VISUAL_MAX - 2, 0], text: `${valence} valence electron${valence === 1 ? '' : 's'}`, color: '#f59e0b', properties: { valence } },
        ],
      },
    ],
  }
}

// ── Safety-net consistency checker (independent derivation) ───────────────────

export function checkElectronShellConsistency(spec: SceneSpec, def: ElementDef): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const nucleus = objs.find((o) => o.id === 'nucleus')
  const electrons = objs.filter((o) => /^e\d+$/.test(o.id ?? ''))
  if (!nucleus) return { ok: false, errors: ['missing nucleus'] }

  // 1. total electrons drawn == Z (independent of the per-shell split).
  if (electrons.length !== def.z) errors.push(`drew ${electrons.length} electrons, expected Z=${def.z}`)

  // 2. per-shell distribution matches an INDEPENDENT algorithmic Bohr–Bury fill.
  const expected = bohrBuryFill(def.z)
  const bucket = new Map<number, number>()
  for (const e of electrons) {
    const k = Number((e.properties as Record<string, unknown> | undefined)?.shell)
    bucket.set(k, (bucket.get(k) ?? 0) + 1)
  }
  const drawn = [...bucket.entries()].sort((a, b) => a[0] - b[0]).map(([, n]) => n)
  if (drawn.length !== expected.length || drawn.some((n, i) => n !== expected[i])) {
    errors.push(`shell distribution drawn [${drawn}] != Bohr–Bury [${expected}]`)
  }

  // 3. electrons on the same shell are equidistant from the nucleus (geometric).
  const radii = new Map<number, number[]>()
  for (const e of electrons) {
    const k = Number((e.properties as Record<string, unknown> | undefined)?.shell)
    const r = Math.hypot(e.position![0], e.position![1])
    radii.set(k, [...(radii.get(k) ?? []), r])
  }
  for (const [k, rs] of radii) {
    if (Math.max(...rs) - Math.min(...rs) > VISUAL_MAX * 0.02) {
      errors.push(`shell ${k} electrons are not at a single radius`)
      break
    }
  }

  // 4. shells nest outward: each shell's radius strictly greater than the previous.
  const ordered = [...radii.entries()].sort((a, b) => a[0] - b[0]).map(([, rs]) => rs[0])
  for (let i = 1; i < ordered.length; i++) {
    if (ordered[i] <= ordered[i - 1]) { errors.push('shells do not nest outward'); break }
  }

  return { ok: errors.length === 0, errors }
}

// ── LLM element extraction (NEEDS A LIVE GROQ TEST — isolated) ────────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and identify the single chemical element whose atomic structure / electron shells it is describing, if any.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isElement": true|false, "element": "<name, symbol, or atomic number, e.g. Sodium / Na / 11>"}
- isElement is false if no specific element's electron arrangement is being discussed.
- Only elements with atomic number 1 to 20 are supported; if the element is heavier, still report it and code will reject it.`
}

/**
 * Extract a known element (Z = 1–20) from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractElement(text: string): Promise<ElementDef | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 100).catch((err) => {
    // TEMP DEBUG (scene-extraction debug sprint — remove once diagnosed)
    console.error('[extractElement DEBUG] generateJSON threw:', err)
    return null
  })
  console.error('[extractElement DEBUG] raw from generateJSON:', JSON.stringify(raw))
  if (!raw || raw.isElement !== true) {
    console.error('[extractElement DEBUG] -> null: raw falsy or isElement !== true (got', JSON.stringify(raw?.isElement), ')')
    return null
  }
  const looked = lookupElement(raw.element)
  if (!looked) console.error('[extractElement DEBUG] -> null: lookupElement found no match for', JSON.stringify(raw.element))
  const validated = validateElement(looked)
  if (looked && !validated) console.error('[extractElement DEBUG] -> null: validateElement rejected', JSON.stringify(looked))
  return validated
}
