/**
 * Educational Brain rollout list — single source of truth.
 *
 * To enable the next subject: add its slug to EDUCATIONAL_BRAIN_SUBJECTS.
 * No other file needs to change — the two consumption points
 * (VISIBLE_SUBJECT_LIBRARY filter in subjectCatalog.ts and the
 * ebEnabled gate in route.ts) both read from here.
 */

export const EDUCATIONAL_BRAIN_SUBJECTS: ReadonlySet<string> = new Set([
  'mathematics',
  'physics',
  'english',
])

export function isEduBrainEnabled(slug: string): boolean {
  return EDUCATIONAL_BRAIN_SUBJECTS.has(slug)
}
