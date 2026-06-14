import type { EducationBoard } from './educationTypes'

// Sprint AT: subjects lists only what has a catalog in BOARD_CATALOGS —
// keeping the list honest prevents anything from advertising coverage that
// doesn't exist yet. Sprint AW (English) completes the CBSE foundation set.
export const CBSE_BOARD: EducationBoard = {
  id: 'cbse',
  name: 'Central Board of Secondary Education',
  shortName: 'CBSE',
  country: 'India',
  // Sprint DC: senior-secondary (11–12) streams are first-class subjects.
  // Science/Social Science cover grades 5–10; the streams below cover 11–12.
  // Grade-aware listing (getGradeSubjects) ensures each student only sees the
  // subjects that have chapters at their grade.
  subjects: [
    'mathematics', 'science', 'social_science', 'english', 'hindi', 'sanskrit',
    'physics', 'chemistry', 'biology',
    'history', 'geography', 'political_science', 'economics',
    'accountancy', 'business_studies', 'computer_science', 'information_technology', 'sociology',
  ],
  grades: [5, 6, 7, 8, 9, 10, 11, 12],
}
