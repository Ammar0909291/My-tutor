/**
 * 194-node Physics KG → application type adapter
 *
 * Bridges docs/physics/kg/graph.json to the two type shapes the app needs:
 *   - KnowledgeNode  → curriculum layer  (resolveNodes, groupIntoModules)
 *   - ConceptNode    → teaching engine   (decide(), /api/teaching-engine)
 *
 * Field mapping
 *   KG json field   → app field
 *   name            → title
 *   requires        → prerequisites
 *   id prefix       → domain  (e.g. "phys.mech.xxx" → "phys.mech")
 *   bloom heuristic → concept_type (absent in KG; inferred here)
 */

import fs from 'fs'
import path from 'path'
import type { KnowledgeNode } from '@/lib/education/educationTypes'
import type { ConceptNode, ConceptType } from '@/lib/teaching-engine/types'

// ── Raw KG shape ──────────────────────────────────────────────────────────────

interface RawConcept {
  id: string
  name: string
  description: string
  difficulty: string
  bloom: string
  requires: string[]
  unlocks: string[]
  estimated_hours: number
  mastery_threshold: number
  [key: string]: unknown
}

// ── Module-level cache (loaded once per server process) ───────────────────────

let _cache: RawConcept[] | null = null

function getRawConcepts(): RawConcept[] {
  if (_cache) return _cache
  const filePath = path.join(process.cwd(), 'docs/physics/kg/graph.json')
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as { concepts: RawConcept[] }
  _cache = raw.concepts
  return _cache
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function inferDomain(id: string): string {
  // "phys.mech.kinematics-1d" → "phys.mech"
  const parts = id.split('.')
  return parts.length >= 3 ? `${parts[0]}.${parts[1]}` : parts[0]
}

function inferConceptType(bloom: string): ConceptType {
  switch (bloom) {
    case 'remember':
    case 'understand': return 'conceptual'
    case 'apply':      return 'application'
    case 'analyze':
    case 'evaluate':
    case 'create':     return 'problem_solving'
    default:           return 'conceptual'
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Returns all 194 Physics KG concepts as KnowledgeNode[].
 * Used by resolveNodes('physics') in knowledgeGraph.ts.
 */
export function getPhysicsKgNodes(): KnowledgeNode[] {
  return getRawConcepts().map(c => ({
    id:              c.id,
    domain:          inferDomain(c.id),
    title:           c.name,
    description:     c.description,
    difficulty:      c.difficulty as KnowledgeNode['difficulty'],
    prerequisites:   c.requires,
    estimated_hours: c.estimated_hours,
  }))
}

/**
 * Looks up one concept by id and returns it as a ConceptNode for the Teaching
 * Engine.  Returns undefined if the id is not in the 194-node Physics KG.
 */
export function getPhysicsConceptNode(id: string): ConceptNode | undefined {
  const raw = getRawConcepts().find(c => c.id === id)
  if (!raw) return undefined
  return {
    id:              raw.id,
    domain:          inferDomain(raw.id),
    prerequisites:   raw.requires,
    unlocks:         raw.unlocks,
    difficulty:      raw.difficulty as ConceptNode['difficulty'],
    concept_type:    inferConceptType(raw.bloom),
    estimated_hours: raw.estimated_hours,
    bloom:           raw.bloom,
    name:            raw.name,
  }
}
