import type { Profile, ProfileSubject, Subject, UserType } from '@prisma/client'
import { isEduBrainEnabled } from '@/lib/curriculum/subjectRollout'

export interface NavSubject {
  slug: string
  name: string
}

type ProfileForNav = Pick<Profile, 'educationBoard' | 'grade'> & {
  userType?: UserType
  subjects: (ProfileSubject & { subject: Subject })[]
}

export function getUserNavSubjects(profile: ProfileForNav, _isSchool: boolean): NavSubject[] {
  return profile.subjects
    .filter((ps) => isEduBrainEnabled(ps.subject.slug))
    .map((ps) => ({ slug: ps.subject.slug, name: ps.subject.name }))
}
