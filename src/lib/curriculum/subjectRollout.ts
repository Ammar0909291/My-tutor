/**
 * Educational Brain rollout list — single source of truth.
 *
 * To enable the next subject: add its slug to EDUCATIONAL_BRAIN_SUBJECTS.
 * No other file needs to change except OnboardingWizard.tsx's own
 * FALLBACK_SUBJECTS (its comment explains why — the pre-fetch/fetch-failure
 * window has no other source of truth to read from). Every other consumer —
 * VISIBLE_SUBJECT_LIBRARY / findLibrarySubject in subjectCatalog.ts, the
 * ebEnabled gate in chat/route.ts, and the enrolled-subject filters in
 * getUserNavSubjects.ts / getDashboardV2Data.ts — reads from here directly.
 *
 * biology added 2026-09-23 (owner-authorized rollout): content was already
 * complete (KG/Educational Brain/asset-contract all 199/199, runtime QA
 * passed) and the subject catalog/i18n/onboarding-translation entries for it
 * already existed — this was the one remaining switch.
 */

export const EDUCATIONAL_BRAIN_SUBJECTS: ReadonlySet<string> = new Set([
  'mathematics',
  'physics',
  'english',
  'chemistry',
  'biology',
])

export function isEduBrainEnabled(slug: string): boolean {
  return EDUCATIONAL_BRAIN_SUBJECTS.has(slug)
}
