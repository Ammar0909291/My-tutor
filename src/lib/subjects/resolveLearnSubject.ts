import { findLibrarySubject, type LibrarySubject } from '@/lib/curriculum/subjectCatalog'

/** The fields of a ProfileSubject (with its Subject) this decision reads. */
export interface EnrollmentLike {
  isActive: boolean
  subject: { id: string; slug: string; name: string }
}

export type LearnSubjectResolution<E extends EnrollmentLike> =
  /** Open this enrolled subject (or the default one when none was asked for). */
  | { kind: 'open'; enrollment: E | undefined }
  /**
   * `?subject=` named a subject the learner is not enrolled in. MEASURED in a
   * real browser (2026-09-27): the page used to fall back silently to the
   * learner's first subject, so /learn?subject=biology opened a Chemistry
   * lesson with nothing on screen saying why. The learner is now told, and
   * offered what the Library offers.
   */
  | {
      kind: 'not-enrolled'
      requestedSlug: string
      /** The catalogue entry, when the slug is a real subject. */
      librarySubject: LibrarySubject | undefined
      /** Exactly the enroll endpoint's own rule: a known subject not hidden from new enrollments. */
      canEnroll: boolean
      /** Where the learner would otherwise have landed, offered as a way back. */
      fallback: E | undefined
    }

/**
 * Which subject /learn opens.
 *
 * "Enrolled" means an ACTIVE enrollment — the same definition the Library
 * (`profile.subjects.filter((ps) => ps.isActive)`) and the dashboard
 * (`where: { isActive: true }`) use. Unenrolling only sets `isActive = false`,
 * so matching on the row alone reopened a subject the learner had removed.
 *
 * Deliberately never enrolls: a GET page render that wrote an enrollment
 * would re-add a removed subject from any stale link or bookmark. Enrolling
 * stays an explicit act, as it is everywhere else in the app.
 */
export function resolveLearnSubject<E extends EnrollmentLike>(
  enrollments: readonly E[],
  requestedSlug: string | undefined,
): LearnSubjectResolution<E> {
  const active = enrollments.filter((e) => e.isActive)
  // Unchanged when nothing is active: the page's own auto-heal handles an
  // empty profile, and a profile whose only rows are inactive keeps opening
  // its first row exactly as before.
  const byDefault = active[0] ?? enrollments[0]

  const slug = requestedSlug?.trim()
  if (!slug) return { kind: 'open', enrollment: byDefault }

  const requested = active.find((e) => e.subject.slug === slug)
  if (requested) return { kind: 'open', enrollment: requested }

  const librarySubject = findLibrarySubject(slug)
  return {
    kind: 'not-enrolled',
    requestedSlug: slug,
    librarySubject,
    canEnroll: Boolean(librarySubject) && librarySubject!.visible !== false,
    fallback: byDefault,
  }
}
