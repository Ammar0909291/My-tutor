/**
 * Pure priority decision for GET /api/curriculum — extracted so the exact
 * bug that shadowed English's canonical Knowledge Graph behind stale legacy
 * `Curriculum` DB rows (seeded once for c/cpp/python/english by
 * scripts/seed-curriculum.ts) is permanently regression-tested without
 * needing a live database in CI.
 *
 * Priority: canonical KG > legacy Curriculum DB rows > Subject Library
 * catalog > none. The canonical KG must always win when one exists for a
 * subject — that's what makes every subject with a docs/{subject}/kg/graph.json
 * resolve through the same production pipeline regardless of what legacy
 * data might still exist in the database.
 */
export type CurriculumSource = 'kg' | 'legacy-db' | 'library-catalog' | 'none'

export function resolveCurriculumSource(
  hasCanonicalGraph: boolean,
  legacyRowCount: number,
  hasLibraryCatalog: boolean,
): CurriculumSource {
  if (hasCanonicalGraph) return 'kg'
  if (legacyRowCount > 0) return 'legacy-db'
  if (hasLibraryCatalog) return 'library-catalog'
  return 'none'
}
