import type { EducationBoard } from './educationTypes'

export const UP_BOARD: EducationBoard = {
  id: 'up_board',
  name: 'Uttar Pradesh Madhyamik Shiksha Parishad',
  shortName: 'UP Board',
  country: 'India',
  state: 'Uttar Pradesh',
  // Sprint DC: senior-secondary (11–12) streams are first-class subjects.
  // Science/Social Science cover grades 5–10; the streams below cover 11–12.
  // NOTE: UP Grade 12 Economics has no chapters yet (catalog gap, Sprint DB) —
  // the Economics subject exposes only Grade 11 until backfilled.
  subjects: [
    'mathematics', 'science', 'english', 'social_science',
    'physics', 'chemistry', 'biology',
    'history', 'geography', 'political_science', 'economics',
  ],
  grades: [5, 6, 7, 8, 9, 10, 11, 12],
}
