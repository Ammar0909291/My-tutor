/**
 * Entity-relationship (ER) diagram scene generator (25th parametric
 * generator), closing the "SQL / ER diagrams" gap noted in
 * docs/VISUAL_COVERAGE_GAP_ANALYSIS.md. Lays out a database schema's
 * entities (evenly spaced, with their attributes) and the relationships
 * between them (with cardinality labels), by formula — entity positions and
 * edge endpoints are derived, never invented. Same architecture as the other
 * generators: extractERDiagramParams (LLM, isolated) →
 * validateERDiagramParams (pure) → buildERDiagramScene (pure, deterministic
 * layout) → checkERDiagramConsistency (pure, independent re-derivation
 * safety net).
 */

import { generateJSON } from '@/lib/ai/client'
import type { SceneObject, SceneSpec, SceneStep, Vec3 } from '../sceneSpec'
import { round, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export type Cardinality = 'one-to-one' | 'one-to-many' | 'many-to-many'

export interface EREntity {
  name: string
  attributes: string[]
}

export interface ERRelationship {
  from: string
  to: string
  cardinality: Cardinality
}

export interface ERDiagramParams {
  entities: EREntity[]
  relationships: ERRelationship[]
}

const MAX_NAME_LEN = 60
const MIN_ENTITIES = 2
const MAX_ENTITIES = 6
const MAX_ATTRIBUTES = 6
const MAX_RELATIONSHIPS = 10
const VALID_CARDINALITIES: ReadonlySet<string> = new Set(['one-to-one', 'one-to-many', 'many-to-many'])

function isNonEmptyString(v: unknown, maxLen: number): v is string {
  return typeof v === 'string' && v.trim().length > 0 && v.length <= maxLen
}

function isValidEntity(raw: unknown): raw is EREntity {
  if (!raw || typeof raw !== 'object') return false
  const o = raw as Record<string, unknown>
  if (!isNonEmptyString(o.name, MAX_NAME_LEN)) return false
  if (!Array.isArray(o.attributes) || o.attributes.length === 0 || o.attributes.length > MAX_ATTRIBUTES) return false
  return o.attributes.every((a) => isNonEmptyString(a, MAX_NAME_LEN))
}

function isValidRelationship(raw: unknown, entityNames: Set<string>): raw is ERRelationship {
  if (!raw || typeof raw !== 'object') return false
  const o = raw as Record<string, unknown>
  if (!isNonEmptyString(o.from, MAX_NAME_LEN) || !isNonEmptyString(o.to, MAX_NAME_LEN)) return false
  if (!entityNames.has(o.from) || !entityNames.has(o.to)) return false
  if (typeof o.cardinality !== 'string' || !VALID_CARDINALITIES.has(o.cardinality)) return false
  return true
}

export function validateERDiagramParams(raw: unknown): ERDiagramParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>

  if (!Array.isArray(o.entities) || o.entities.length < MIN_ENTITIES || o.entities.length > MAX_ENTITIES) return null
  if (!o.entities.every(isValidEntity)) return null
  const entities = (o.entities as EREntity[]).map((e) => ({
    name: e.name.trim(),
    attributes: e.attributes.map((a) => a.trim()),
  }))

  const entityNames = new Set(entities.map((e) => e.name))
  if (entityNames.size !== entities.length) return null // duplicate entity names

  if (!Array.isArray(o.relationships) || o.relationships.length > MAX_RELATIONSHIPS) return null
  if (!o.relationships.every((r) => isValidRelationship(r, entityNames))) return null
  const relationships = (o.relationships as ERRelationship[]).map((r) => ({
    from: r.from.trim(), to: r.to.trim(), cardinality: r.cardinality,
  }))

  return { entities, relationships }
}

// ── Deterministic layout (pure leaf functions; never LLM-generated) ──────────

const SPACING = 10
const ATTR_LINE_HEIGHT = 1.2

const cardinalityLabel: Record<Cardinality, string> = {
  'one-to-one': '1:1',
  'one-to-many': '1:N',
  'many-to-many': 'N:N',
}

/** Evenly spaced x positions for `n` entities, centered on x=0. */
function entityPositions(n: number): number[] {
  return Array.from({ length: n }, (_, i) => round((i - (n - 1) / 2) * SPACING))
}

/** Build a 2-step ER-diagram SceneSpec: the entities and their attributes, then the relationships. */
export function buildERDiagramScene(params: ERDiagramParams): SceneSpec {
  const xs = entityPositions(params.entities.length)
  const indexByName = new Map(params.entities.map((e, i) => [e.name, i]))

  const entityNodes: SceneObject[] = params.entities.map((e, i) => ({
    type: 'node',
    id: `entity-${i}`,
    position: [xs[i], 0, 0] as Vec3,
    color: '#3b82f6',
    text: e.name,
    properties: { attributeCount: e.attributes.length },
  }))

  const attributeLabels: SceneObject[] = params.entities.flatMap((e, i) =>
    e.attributes.map((attr, j) => ({
      type: 'label' as const,
      id: `attr-${i}-${j}`,
      position: [xs[i], round(-2 - j * ATTR_LINE_HEIGHT), 0] as Vec3,
      text: attr,
      color: '#94a3b8',
    })),
  )

  const relationshipObjects: SceneObject[] = params.relationships.flatMap((r, i) => {
    const fromIdx = indexByName.get(r.from)!
    const toIdx = indexByName.get(r.to)!
    const from: Vec3 = [xs[fromIdx], 0, 0]
    const to: Vec3 = [xs[toIdx], 0, 0]
    const midX = round((xs[fromIdx] + xs[toIdx]) / 2)
    return [
      { type: 'bond' as const, id: `rel-${i}`, from, to },
      { type: 'label' as const, id: `rel-label-${i}`, position: [midX, 1.5, 0] as Vec3, text: cardinalityLabel[r.cardinality], color: '#f59e0b' },
    ]
  })

  const steps: SceneStep[] = [
    {
      narration: `This schema has ${params.entities.length} entities: ${params.entities.map((e) => e.name).join(', ')}, each with its own attributes.`,
      objects: [...entityNodes, ...attributeLabels],
    },
  ]

  if (params.relationships.length > 0) {
    steps.push({
      narration: `Relationships connect the entities: ${params.relationships.map((r) => `${r.from} to ${r.to} (${cardinalityLabel[r.cardinality]})`).join('; ')}.`,
      objects: relationshipObjects,
    })
  }

  return {
    id: `er-diagram-${params.entities.map((e) => e.name).join('-')}`,
    title: `ER Diagram: ${params.entities.map((e) => e.name).join(', ')}`,
    sceneType: 'diagram',
    teachingGoal: 'Show how a database schema\'s entities relate to each other, including each relationship\'s cardinality.',
    cameraDistance: SPACING * params.entities.length + 20,
    ariaLabel: `An entity-relationship diagram with ${params.entities.length} entities and ${params.relationships.length} relationships.`,
    steps,
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkERDiagramConsistency(spec: SceneSpec, params: ERDiagramParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const xs = entityPositions(params.entities.length)
  const indexByName = new Map(params.entities.map((e, i) => [e.name, i]))

  params.entities.forEach((e, i) => {
    const node = objs.find((o) => o.id === `entity-${i}`)
    if (!node) {
      errors.push(`missing entity-${i}`)
      return
    }
    if (node.text !== e.name) errors.push(`entity-${i} text "${node.text}" does not match name "${e.name}"`)
    if (!node.position || Math.abs(node.position[0] - xs[i]) > 0.01) {
      errors.push(`entity-${i} position does not match re-derived x=${xs[i]}`)
    }
    e.attributes.forEach((attr, j) => {
      const label = objs.find((o) => o.id === `attr-${i}-${j}`)
      if (!label || label.text !== attr) errors.push(`attr-${i}-${j} text "${label?.text}" does not match "${attr}"`)
    })
  })

  params.relationships.forEach((r, i) => {
    const rel = objs.find((o) => o.id === `rel-${i}`)
    if (!rel) {
      errors.push(`missing rel-${i}`)
      return
    }
    const fromIdx = indexByName.get(r.from)!
    const toIdx = indexByName.get(r.to)!
    if (!rel.from || Math.abs(rel.from[0] - xs[fromIdx]) > 0.01) errors.push(`rel-${i} "from" endpoint does not match entity "${r.from}"`)
    if (!rel.to || Math.abs(rel.to[0] - xs[toIdx]) > 0.01) errors.push(`rel-${i} "to" endpoint does not match entity "${r.to}"`)

    const label = objs.find((o) => o.id === `rel-label-${i}`)
    if (label?.text !== cardinalityLabel[r.cardinality]) {
      errors.push(`rel-label-${i} text "${label?.text}" does not match re-derived "${cardinalityLabel[r.cardinality]}"`)
    }
  })

  return { ok: errors.length === 0, errors }
}

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ─────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the database schema (entities, attributes, and relationships) being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isERDiagram": true|false, "entities": [{"name": "<string>", "attributes": [<1-6 strings>]}], "relationships": [{"from": "<entity name>", "to": "<entity name>", "cardinality": "one-to-one"|"one-to-many"|"many-to-many"}]}
- isERDiagram is false if the text is not about a database schema / entity-relationship model.
- entities has 2-6 items with distinct names; relationships' from/to must reference entity names that appear in entities.
- Use the entities, attributes, and relationships actually stated in the text — do not invent any.`
}

/**
 * Extract validated ER-diagram parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractERDiagramParams(text: string): Promise<ERDiagramParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 500).catch(() => null)
  if (!raw || raw.isERDiagram !== true) return null
  return validateERDiagramParams(raw)
}
