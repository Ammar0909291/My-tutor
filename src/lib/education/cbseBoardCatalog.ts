import type { EducationBoard } from './educationTypes'

// Sprint AT: subjects lists only what has a catalog in BOARD_CATALOGS.
// science / english / social_science are added in later sprints — keeping
// the list honest prevents anything from advertising coverage that
// doesn't exist yet.
export const CBSE_BOARD: EducationBoard = {
  id: 'cbse',
  name: 'Central Board of Secondary Education',
  shortName: 'CBSE',
  country: 'India',
  subjects: ['mathematics', 'science'],
  grades: [5, 6, 7, 8, 9, 10, 11, 12],
}
