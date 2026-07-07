/**
 * Generic subject KG adapter — platform infrastructure, not subject-specific code.
 *
 * createSubjectAdapter(subject) bridges any docs/{subject}/kg/graph.json to the
 * two type shapes the rest of the application uses:
 *
 *   KnowledgeNode  — curriculum layer  (resolveNodes → groupIntoModules → KGModule[])
 *   ConceptNode    — teaching engine   (decide() → /api/teaching-engine)
 *
 * Field derivation (NOT stored in graph.json — derived at runtime):
 *   domain        — inferred from ID prefix:  "math.found.xxx" → "math.found"
 *   concept_type  — inferred from bloom:      remember/understand → conceptual
 *                                             apply              → application
 *                                             analyze/evaluate/create → problem_solving
 *
 * Adding a new subject:
 *   1. Add docs/{subject}/kg/graph.json
 *   2. Add one entry to SUBJECT_ADAPTERS in knowledgeGraph.ts
 *   No new adapter code is required.
 */

import fs from 'fs'
import path from 'path'
import type { KnowledgeNode } from '@/lib/education/educationTypes'
import type { ConceptNode, ConceptType } from '@/lib/teaching-engine/types'

// ── Raw KG concept shape (the 10-field canonical schema) ─────────────────────

export interface RawKGConcept {
  id: string
  name: string
  description: string
  difficulty: string
  bloom: string
  requires: string[]
  unlocks: string[]
  cross_links: string[]
  mastery_threshold: number
  estimated_hours: number
  [key: string]: unknown        // tolerate extra fields in existing graphs (math/physics)
}

// ── Domain and concept_type derivation (shared by all subjects) ──────────────

export function inferDomain(id: string): string {
  // "math.found.mathematical-thinking" → "math.found"
  // "chem.atomic.bohr-model"           → "chem.atomic"
  // "physics"                          → "physics"  (legacy single-segment IDs)
  const parts = id.split('.')
  return parts.length >= 3 ? `${parts[0]}.${parts[1]}` : parts[0]
}

export function inferConceptType(bloom: string): ConceptType {
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

// ── Adapter interface ─────────────────────────────────────────────────────────

export interface SubjectAdapter {
  /** All concepts as KnowledgeNode[] for the curriculum / KG module layer. */
  getNodes(): KnowledgeNode[]
  /** Single concept as ConceptNode for the Teaching Engine, or undefined. */
  getConceptNode(id: string): ConceptNode | undefined
}

// ── Factory ───────────────────────────────────────────────────────────────────

/**
 * Creates a lazy-loading, process-lifetime-cached adapter for a subject.
 *
 * @param subject  The subject directory name under docs/ — e.g. "mathematics",
 *                 "physics", "chemistry".  The JSON is loaded from
 *                 docs/{subject}/kg/graph.json on first access.
 */
export function createSubjectAdapter(subject: string): SubjectAdapter {
  let cache: RawKGConcept[] | null = null

  function getRaw(): RawKGConcept[] {
    if (cache) return cache
    const filePath = path.join(process.cwd(), `docs/${subject}/kg/graph.json`)
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as { concepts: RawKGConcept[] }
    cache = raw.concepts
    return cache
  }

  return {
    getNodes(): KnowledgeNode[] {
      return getRaw().map(c => ({
        id:              c.id,
        domain:          inferDomain(c.id),
        title:           c.name,
        description:     c.description,
        difficulty:      c.difficulty as KnowledgeNode['difficulty'],
        prerequisites:   c.requires,
        estimated_hours: c.estimated_hours,
      }))
    },

    getConceptNode(id: string): ConceptNode | undefined {
      const raw = getRaw().find(c => c.id === id)
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
    },
  }
}
