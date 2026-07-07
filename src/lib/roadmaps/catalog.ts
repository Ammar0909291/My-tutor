export interface RoadmapEntry {
  id: string
  slug: string
  subjectSlug: string
  title: string
  description: string
  outcome: string
  milestones: string[]
  requiredSubjects: string[]
  estimatedWeeks: number
  capstone: {
    slug: string
    title: string
    description: string
    requirements?: string[]
    estimatedHours?: number
    submissions?: unknown[]
  }
}

export const ROADMAP_CATALOG: RoadmapEntry[] = []

export function findRoadmap(slugOrSubject: string): RoadmapEntry | undefined {
  return ROADMAP_CATALOG.find((r) => r.slug === slugOrSubject || r.subjectSlug === slugOrSubject)
}
