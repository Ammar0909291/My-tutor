/**
 * Civics organizational-chart scene generator (14th parametric generator).
 *
 * Lays out an institution's hierarchy as a tree: an implicit root (the
 * institution itself) at the top, level-1 nodes evenly spaced below it, and
 * level-2 nodes evenly spaced below that, round-robin-assigned to level-1
 * parents. Same architecture as the other generators: extractOrgChartParams
 * (LLM, isolated) → validateOrgChartParams (pure) → buildOrgChartScene (pure,
 * deterministic tree layout) → checkOrgChartConsistency (pure, independent
 * re-derivation safety net).
 */

import { generateJSON } from '@/lib/ai/client'
import type { SceneObject, SceneSpec, SceneStep, Vec3 } from '../sceneSpec'
import { round, strictNumber, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export interface OrgChartNode {
  /** 1 or 2 — the root (the institution itself) is the implicit level 0. */
  level: number
  name: string
  role: string
}

export interface OrgChartParams {
  institutionName: string
  nodes: OrgChartNode[]
}

const MAX_NAME_LEN = 100
const MAX_TOTAL_NODES = 8
const MIN_NODES = 1
/** root (1) + nodes — kept ≤ MAX_TOTAL_NODES. */
const MAX_NODES = MAX_TOTAL_NODES - 1

function isValidNode(raw: unknown): raw is OrgChartNode {
  if (!raw || typeof raw !== 'object') return false
  const o = raw as Record<string, unknown>
  const level = strictNumber(o.level)
  if (level !== 1 && level !== 2) return false
  if (typeof o.name !== 'string' || !o.name.trim() || o.name.length > MAX_NAME_LEN) return false
  if (typeof o.role !== 'string' || !o.role.trim() || o.role.length > MAX_NAME_LEN) return false
  return true
}

export function validateOrgChartParams(raw: unknown): OrgChartParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>

  if (typeof o.institutionName !== 'string' || !o.institutionName.trim() || o.institutionName.length > MAX_NAME_LEN) return null

  if (!Array.isArray(o.nodes) || o.nodes.length < MIN_NODES || o.nodes.length > MAX_NODES) return null
  if (!o.nodes.every(isValidNode)) return null
  const nodes = o.nodes.map((n: OrgChartNode) => ({ level: n.level, name: n.name.trim(), role: n.role.trim() }))

  const level1Count = nodes.filter((n) => n.level === 1).length
  const level2Count = nodes.filter((n) => n.level === 2).length
  // A level-2 node needs at least one level-1 parent to round-robin onto.
  if (level2Count > 0 && level1Count === 0) return null

  return { institutionName: o.institutionName.trim(), nodes }
}

// ── Deterministic tree layout (pure leaf functions; never LLM-generated) ─────

const ROOT_Y = 10
const LEVEL1_Y = 0
const LEVEL2_Y = -10
const SPACING = 6

/** Evenly spaced x positions for `n` siblings, centered on x=0. */
function xPositions(n: number): number[] {
  return Array.from({ length: n }, (_, i) => (i - (n - 1) / 2) * SPACING)
}

interface LevelGroups {
  level1: OrgChartNode[]
  level2: OrgChartNode[]
}

function groupByLevel(params: OrgChartParams): LevelGroups {
  return {
    level1: params.nodes.filter((n) => n.level === 1),
    level2: params.nodes.filter((n) => n.level === 2),
  }
}

/** Round-robin: level-2 node i's parent is level1[i % level1.length]. */
function parentIndexFor(i: number, level1Count: number): number {
  return i % level1Count
}

/** Build a tree-layout SceneSpec: root + level-1 nodes (and their edges) in step 1, level-2 nodes (and their edges) in step 2. */
export function buildOrgChartScene(params: OrgChartParams): SceneSpec {
  const { level1, level2 } = groupByLevel(params)

  const rootPos: Vec3 = [0, ROOT_Y, 0]
  const root: SceneObject = {
    type: 'node',
    id: 'node-root',
    position: rootPos,
    color: '#3b82f6',
    radius: 0.6,
    properties: { level: 0, name: params.institutionName, role: 'root' },
  }

  const level1Xs = xPositions(level1.length)
  const level1Nodes: SceneObject[] = level1.map((n, i) => ({
    type: 'node',
    id: `node-1-${i}`,
    position: [round(level1Xs[i]), LEVEL1_Y, 0] as Vec3,
    color: '#22c55e',
    radius: 0.5,
    properties: { level: 1, name: n.name, role: n.role, parentId: 'node-root' },
  }))
  const level1Edges: SceneObject[] = level1.map((_, i) => ({
    type: 'bond',
    id: `edge-root-1-${i}`,
    from: rootPos,
    to: [round(level1Xs[i]), LEVEL1_Y, 0] as Vec3,
  }))

  const steps: SceneStep[] = [
    {
      narration: `${params.institutionName} is led by ${level1.length} body${level1.length === 1 ? '' : 'ies'} directly below it.`,
      objects: [root, ...level1Nodes, ...level1Edges],
    },
  ]

  if (level2.length > 0) {
    const level2Xs = xPositions(level2.length)
    const level2Nodes: SceneObject[] = level2.map((n, i) => {
      const parentIdx = parentIndexFor(i, level1.length)
      return {
        type: 'node',
        id: `node-2-${i}`,
        position: [round(level2Xs[i]), LEVEL2_Y, 0] as Vec3,
        color: '#f59e0b',
        radius: 0.4,
        properties: { level: 2, name: n.name, role: n.role, parentId: `node-1-${parentIdx}` },
      }
    })
    const level2Edges: SceneObject[] = level2.map((_, i) => {
      const parentIdx = parentIndexFor(i, level1.length)
      return {
        type: 'bond',
        id: `edge-1-2-${i}`,
        from: [round(level1Xs[parentIdx]), LEVEL1_Y, 0] as Vec3,
        to: [round(level2Xs[i]), LEVEL2_Y, 0] as Vec3,
      }
    })
    steps.push({
      narration: `Each of those bodies oversees further levels of ${params.institutionName}'s structure.`,
      objects: [...level2Nodes, ...level2Edges],
    })
  }

  return {
    id: `civics-orgchart-${params.institutionName}-${params.nodes.length}`,
    title: `${params.institutionName} — organizational hierarchy`,
    sceneType: 'diagram',
    teachingGoal: 'Show the hierarchical structure of an institution, including who reports to whom.',
    cameraDistance: 40,
    ariaLabel: `An organizational chart of ${params.institutionName} with ${level1.length} level-1 and ${level2.length} level-2 nodes.`,
    steps,
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkOrgChartConsistency(spec: SceneSpec, params: OrgChartParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const root = objs.find((o) => o.id === 'node-root')
  if (!root || !root.properties) return { ok: false, errors: ['missing node-root'] }

  const { level1, level2 } = groupByLevel(params)
  const tol = 0.01

  const rootProps = root.properties as { name?: string }
  if (rootProps.name !== params.institutionName) {
    errors.push(`root name "${rootProps.name}" does not match institutionName "${params.institutionName}"`)
  }

  // Total node count must match: root + every params node, no fewer, no extra.
  const sceneNodeCount = objs.filter((o) => o.type === 'node').length
  if (sceneNodeCount !== 1 + params.nodes.length) {
    errors.push(`scene has ${sceneNodeCount} node objects, expected ${1 + params.nodes.length} (root + ${params.nodes.length} nodes)`)
  }

  const level1Xs = xPositions(level1.length)
  for (let i = 0; i < level1.length; i++) {
    const node = objs.find((o) => o.id === `node-1-${i}`)
    if (!node || !node.position || !node.properties) {
      errors.push(`missing node-1-${i}`)
      continue
    }
    const props = node.properties as { parentId?: string; name?: string; role?: string }
    // Exactly one parent, and that parent must be the (strictly higher) root.
    if (props.parentId !== 'node-root') {
      errors.push(`node-1-${i} has parentId="${props.parentId}", expected "node-root"`)
    }
    if (props.name !== level1[i].name || props.role !== level1[i].role) {
      errors.push(`node-1-${i} name/role does not match params`)
    }
    const expectedPos: Vec3 = [round(level1Xs[i]), LEVEL1_Y, 0]
    if (Math.abs(node.position[0] - expectedPos[0]) > tol || Math.abs(node.position[1] - expectedPos[1]) > tol) {
      errors.push(`node-1-${i} position (${node.position[0]}, ${node.position[1]}) does not match re-derived (${expectedPos[0]}, ${expectedPos[1]})`)
    }
    if (!objs.find((o) => o.id === `edge-root-1-${i}`)) {
      errors.push(`missing edge-root-1-${i}`)
    }
  }

  const level2Xs = xPositions(level2.length)
  for (let i = 0; i < level2.length; i++) {
    const node = objs.find((o) => o.id === `node-2-${i}`)
    if (!node || !node.position || !node.properties) {
      errors.push(`missing node-2-${i}`)
      continue
    }
    const parentIdx = parentIndexFor(i, level1.length)
    const expectedParentId = `node-1-${parentIdx}`
    const props = node.properties as { parentId?: string; name?: string; role?: string }
    // Exactly one parent, and it must reference a real, strictly-higher-level node — proves no cycle.
    if (props.parentId !== expectedParentId) {
      errors.push(`node-2-${i} has parentId="${props.parentId}", expected "${expectedParentId}"`)
    }
    if (!objs.find((o) => o.id === expectedParentId)) {
      errors.push(`node-2-${i}'s parent "${expectedParentId}" does not exist in the scene`)
    }
    if (props.name !== level2[i].name || props.role !== level2[i].role) {
      errors.push(`node-2-${i} name/role does not match params`)
    }
    const expectedPos: Vec3 = [round(level2Xs[i]), LEVEL2_Y, 0]
    if (Math.abs(node.position[0] - expectedPos[0]) > tol || Math.abs(node.position[1] - expectedPos[1]) > tol) {
      errors.push(`node-2-${i} position (${node.position[0]}, ${node.position[1]}) does not match re-derived (${expectedPos[0]}, ${expectedPos[1]})`)
    }
    if (!objs.find((o) => o.id === `edge-1-2-${i}`)) {
      errors.push(`missing edge-1-2-${i}`)
    }
  }

  return { ok: errors.length === 0, errors }
}

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the institutional hierarchy being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isOrgChart": true|false, "institutionName": "<string>", "nodes": [{"level": 1|2, "name": "<string>", "role": "<string>"}]}
- isOrgChart is false if the text is not about an institution's hierarchy or organizational structure.
- institutionName is the top-level body (e.g. "the Parliament of India", "the Federal Government").
- nodes is the bodies/roles below it: level 1 for those reporting directly to the institution, level 2 for those reporting to a level-1 body. Use at most 3 levels overall (root + levels 1-2) and at most 7 nodes.
- Do not invent bodies not stated in the text.`
}

/**
 * Extract validated org-chart parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractOrgChartParams(text: string): Promise<OrgChartParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 300).catch(() => null)
  if (!raw || raw.isOrgChart !== true) return null
  return validateOrgChartParams(raw)
}
