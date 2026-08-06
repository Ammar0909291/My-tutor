/**
 * Physics authoring pack for the Visualization Authoring Pipeline (VAP).
 *
 * Physics is beta-ready (per the standing Physics KG/Blueprint/Explanation
 * Memory work), so it is the first subject the pipeline is built around.
 * This module supplies only PHYSICS-SPECIFIC data — domain-prefix
 * visualization defaults and a thin source-assembly helper — the pipeline
 * itself (`visualizationAuthoringPipeline.ts`) carries no subject-specific
 * knowledge, so every later subject reuses it by supplying its own pack in
 * the same shape.
 *
 * Offline only: `buildPhysicsAuthoringSource` takes already-fetched KG/
 * Explanation Memory/misconception data as arguments — it does not call
 * Prisma or the KG adapter itself, keeping the pipeline runnable in tests
 * and CI without a database.
 */

import type {
  AuthoringSource, AuthoringKgConcept, AuthoringExplanationSnippet,
  AuthoringMisconception, DomainVisualizationDefault,
} from './visualizationAuthoringPipeline'
import type { ConceptVisualKnowledge } from '../visualKnowledgeRegistry'

/**
 * Domain-prefix visualization defaults for Physics, longest-prefix-wins
 * (mirrors the discipline already used by `visualRegistry.ts`'s
 * DOMAIN_VISUALS). Deliberately conservative: only domains with a genuinely
 * uniform pedagogical shape get a default; a domain not listed here falls
 * through to the pipeline's own generic default (STRUCTURE-REVEAL /
 * labelled-static-diagram / pictorial) rather than a stretched guess.
 */
export const PHYSICS_DOMAIN_DEFAULTS: readonly DomainVisualizationDefault[] = [
  { prefix: 'phys.mech', purpose: 'PROCESS-TRACE', formClass: 'stepped-sequence', cpaRung: 'pictorial' },
  { prefix: 'phys.em', purpose: 'PROCESS-TRACE', formClass: 'schematic-with-named-parts', cpaRung: 'pictorial' },
  { prefix: 'phys.wave', purpose: 'PROCESS-TRACE', formClass: 'animation-with-prediction-points', cpaRung: 'pictorial' },
  { prefix: 'phys.opt', purpose: 'PROCESS-TRACE', formClass: 'stepped-sequence', cpaRung: 'pictorial' },
  { prefix: 'phys.qm', purpose: 'MODEL-EXTERNALIZE', formClass: 'schematic-with-named-parts', cpaRung: 'abstract' },
  { prefix: 'phys.mod', purpose: 'STRUCTURE-REVEAL', formClass: 'labelled-static-diagram', cpaRung: 'pictorial' },
  { prefix: 'phys.therm', purpose: 'QUANTITY-SENSE', formClass: 'plot', cpaRung: 'abstract' },
  { prefix: 'phys.stat', purpose: 'QUANTITY-SENSE', formClass: 'plot', cpaRung: 'abstract' },
  { prefix: 'phys.meas', purpose: 'STRUCTURE-REVEAL', formClass: 'labelled-static-diagram', cpaRung: 'pictorial' },
]

/**
 * Assemble one concept's AuthoringSource from already-fetched Physics
 * inputs. Pure: no I/O, no defaults beyond PHYSICS_DOMAIN_DEFAULTS above.
 */
export function buildPhysicsAuthoringSource(input: {
  kgConcept: AuthoringKgConcept
  explanationSnippets?: readonly AuthoringExplanationSnippet[]
  misconceptions?: readonly AuthoringMisconception[]
  existingKnowledge?: Partial<ConceptVisualKnowledge>
}): AuthoringSource {
  return {
    kgConcept: input.kgConcept,
    explanationSnippets: input.explanationSnippets ?? [],
    misconceptions: input.misconceptions ?? [],
    domainDefaults: PHYSICS_DOMAIN_DEFAULTS,
    existingKnowledge: input.existingKnowledge,
  }
}
