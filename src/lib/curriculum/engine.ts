export interface LessonContext {
  topicSlug: string
  lessonIndex: number
  totalLessons: number
}

export function buildLessonContext(_params: Record<string, unknown>): LessonContext {
  return { topicSlug: '', lessonIndex: 0, totalLessons: 0 }
}

export function getNextLesson(_ctx: LessonContext): LessonContext | null {
  return null
}

export interface Roadmap {
  subject: string
  currentLevel: string
  targetLevel: string | null
  milestones: string[]
}

export function generateRoadmap(
  _subjectCode: string,
  _currentLevel: string,
  _targetLevel: string | null
): Roadmap | null {
  return null
}

export function buildTutorRoadmapContext(_roadmap: Roadmap): string {
  return ''
}
