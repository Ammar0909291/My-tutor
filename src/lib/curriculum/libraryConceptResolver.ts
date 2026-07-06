/**
 * Library-mode concept seed resolver — server-only.
 *
 * Bridges the subjectCatalog module namespace (e.g. "mechanics") to the
 * canonical KG concept namespace (e.g. "phys.mech.displacement") so that
 * Writer B in route.ts can seed a valid `currentConceptNodeId` the Teaching
 * Engine can actually resolve (ADR 08 §4a, KG-authoritative architecture
 * decision 2026-07-06).
 *
 * Physics pilot (Phase 1) only. Extend MODULE_TO_KG_DOMAIN when additional
 * EB subjects need Library-mode Teaching Engine activation.
 */

import { createSubjectAdapter } from '@/lib/curriculum/subjectKgAdapter'

// Module slug → KG domain prefix.
// Many-to-one is intentional: motion, mechanics, and energy all map to
// phys.mech because the Brain owns concept sequencing within a domain once
// the learner enters via any of these modules (ADR 08 §4a).
const MODULE_TO_KG_DOMAIN: Readonly<Record<string, Record<string, string>>> = {
  physics: {
    foundations:    'phys.meas',
    motion:         'phys.mech',
    mechanics:      'phys.mech',
    energy:         'phys.mech',
    electricity:    'phys.em',
    magnetism:      'phys.em',
    waves:          'phys.wave',
    thermodynamics: 'phys.therm',
    modern_physics: 'phys.mod',
  },
}

/**
 * Returns the canonical KG concept ID that is the cross-domain entry point
 * for the given subject + module combination, or null if no mapping exists.
 *
 * "Cross-domain entry point" = first concept in the target domain whose
 * prerequisites are all outside that domain (i.e. no intra-domain deps
 * block it). Falls back to the first concept in the domain if no such
 * concept exists.
 */
export function resolveLibraryEntryConceptId(
  subjectCode: string,
  moduleSlug: string,
): string | null {
  const domainPrefix = MODULE_TO_KG_DOMAIN[subjectCode]?.[moduleSlug]
  if (!domainPrefix) return null

  const nodes = createSubjectAdapter(subjectCode).getNodes()
  const domainNodes = nodes.filter(n => n.domain === domainPrefix)
  if (domainNodes.length === 0) return null

  const domainIds = new Set(domainNodes.map(n => n.id))
  const entryPoints = domainNodes.filter(n =>
    n.prerequisites.every(prereq => !domainIds.has(prereq))
  )
  return entryPoints[0]?.id ?? domainNodes[0]?.id ?? null
}
