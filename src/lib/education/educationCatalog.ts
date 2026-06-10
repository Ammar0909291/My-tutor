// India Education Knowledge Graph — Country & Board Registry
//
// To add a new board (CBSE, ICSE, Maharashtra, etc.):
//   1. Create src/lib/education/<board>Catalog.ts  (board metadata)
//   2. Create src/lib/education/<board>MathCatalog.ts  (chapters + kgNodeIds)
//   3. Add the board to INDIA.boards below
//   4. Register the catalog in educationGraph.ts BOARD_CATALOGS array
//
// No architecture changes needed — only data additions.

import type { EducationCountry } from './educationTypes'
import { UP_BOARD } from './upBoardCatalog'

export const INDIA: EducationCountry = {
  id: 'india',
  name: 'India',
  boards: [
    UP_BOARD,
    // Future: CBSE_BOARD, ICSE_BOARD, MAHARASHTRA_BOARD, KARNATAKA_BOARD, ...
  ],
}

/** All countries in the IEKG */
export const EDUCATION_COUNTRIES: EducationCountry[] = [INDIA]

/** Look up a board by id across all countries */
export function getBoard(boardId: string) {
  for (const country of EDUCATION_COUNTRIES) {
    const board = country.boards.find((b) => b.id === boardId)
    if (board) return board
  }
  return undefined
}

/** All registered boards */
export function getAllBoards() {
  return EDUCATION_COUNTRIES.flatMap((c) => c.boards)
}
