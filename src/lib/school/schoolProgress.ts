export interface ChapterProgressDetails { practiceStatus: string; masteryPct: number }
export async function getSchoolProgressForSubjects(..._args: unknown[]): Promise<unknown[]> { return [] }
export async function getChapterProgressDetails(..._args: unknown[]): Promise<ChapterProgressDetails> {
  return { practiceStatus: 'NOT_STARTED', masteryPct: 0 }
}
