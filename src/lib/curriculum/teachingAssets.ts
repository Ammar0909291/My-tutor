/**
 * Teaching Asset registry — public entry point for the Teaching Assets Platform.
 *
 * Independent of knowledgeGraph.ts: this file is never imported by, and never
 * imports from, the Knowledge Graph's own registry. A subject can have a KG
 * with no assets yet (getTeachingAsset returns undefined) or assets layered
 * on top of an unmodified KG — the two registries compose, they don't merge.
 *
 * Consumers (route handlers, UI) call getTeachingAsset(subject, conceptId)
 * as a separate, optional lookup alongside whatever the Teaching Engine
 * (`decide()` in src/lib/teaching-engine) already returns. decide() itself
 * is untouched — it has no knowledge of this file.
 */

import { createTeachingAssetAdapter, type TeachingAssetAdapter } from './teachingAssetAdapter'
import type { TeachingAsset } from './teachingAssetSchema'

const TEACHING_ASSET_ADAPTERS: Record<string, TeachingAssetAdapter> = {
  mathematics:      createTeachingAssetAdapter('mathematics'),
  physics:          createTeachingAssetAdapter('physics'),
  chemistry:        createTeachingAssetAdapter('chemistry'),
  biology:          createTeachingAssetAdapter('biology'),
  computer_science: createTeachingAssetAdapter('computer-science'),
}

/** All teaching assets for a subject slug, or [] if the subject has none yet. */
export function getTeachingAssets(subjectSlug: string): TeachingAsset[] {
  return TEACHING_ASSET_ADAPTERS[subjectSlug]?.getAssets() ?? []
}

/** The teaching asset for a single concept ID, or undefined. */
export function getTeachingAsset(subjectSlug: string, conceptId: string): TeachingAsset | undefined {
  return TEACHING_ASSET_ADAPTERS[subjectSlug]?.getAssetForConcept(conceptId)
}

/** Routes a bare concept ID (e.g. "bio.cell.mitosis") to its subject slug via the ID prefix. */
const ID_PREFIX_TO_SUBJECT: Record<string, string> = {
  math: 'mathematics',
  phys: 'physics',
  chem: 'chemistry',
  bio:  'biology',
  cs:   'computer_science',
}

/** Looks up a teaching asset by concept ID alone, routing by ID prefix. */
export function getTeachingAssetById(conceptId: string): TeachingAsset | undefined {
  const subject = ID_PREFIX_TO_SUBJECT[conceptId.split('.')[0]]
  if (!subject) return undefined
  return getTeachingAsset(subject, conceptId)
}
