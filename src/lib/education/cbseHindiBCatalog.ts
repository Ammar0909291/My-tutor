import type { BoardSubjectCatalog } from './educationTypes'
import { SPARSH_BHAG1_CHAPTERS } from './hindi/sparshBhag1'
import { SPARSH_BHAG2_CHAPTERS } from './hindi/sparshBhag2'
import { SANCHAYAN_BHAG1_CHAPTERS } from './hindi/sanchayanBhag1'
import { SANCHAYAN_BHAG2_CHAPTERS } from './hindi/sanchayanBhag2'

/**
 * CBSE Hindi B — Grades 9–10.
 * Track: Hindi B (secondary/elective stream)
 *   Grade 9  : स्पर्श भाग–1 + संचयन भाग–1
 *   Grade 10 : स्पर्श भाग–2 + संचयन भाग–2
 *
 * Sprint EU.2. Do NOT modify onboarding — track selection is deferred.
 */
export const CBSE_HINDI_B_CATALOG: BoardSubjectCatalog = {
  boardId: 'cbse',
  subjectSlug: 'hindi-b',
  subjectName: 'Hindi B',
  grades: [
    {
      grade: 9,
      chapters: [...SPARSH_BHAG1_CHAPTERS, ...SANCHAYAN_BHAG1_CHAPTERS],
    },
    {
      grade: 10,
      chapters: [...SPARSH_BHAG2_CHAPTERS, ...SANCHAYAN_BHAG2_CHAPTERS],
    },
  ],
}

export function getCBSEHindiBChapters(grade: number) {
  return CBSE_HINDI_B_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}
