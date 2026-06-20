import type { Profile, ProfileSubject, Subject, UserType } from '@prisma/client'
import { getGradeSubjects, SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'

export interface NavSubject {
  slug: string
  name: string
}

type ProfileForNav = Pick<Profile, 'educationBoard' | 'grade'> & {
  userType?: UserType
  subjects: (ProfileSubject & { subject: Subject })[]
}

/**
 * Single source of truth for "what subjects does this user have" — called by
 * both the dashboard (subject cards) and the Learn page (subject dropdown) so
 * the two views can never drift apart again. School students have no
 * per-subject enrollment row (ProfileSubject); their subject set is the
 * board/grade catalog. Everyone else (AI/library learners) is enrolled via
 * ProfileSubject rows.
 *
 * `isSchool` is passed in explicitly (rather than re-derived from
 * profile.userType) so callers that support a library-mode override for
 * school-capable accounts resolve consistently with the rest of their view.
 */
export function getUserNavSubjects(profile: ProfileForNav, isSchool: boolean): NavSubject[] {
  if (isSchool && profile.educationBoard && profile.grade) {
    return getGradeSubjects(profile.educationBoard, profile.grade).map((slug) => ({
      slug,
      name: SCHOOL_SUBJECT_META[slug]?.label ?? slug,
    }))
  }
  return profile.subjects.map((ps) => ({ slug: ps.subject.slug, name: ps.subject.name }))
}
