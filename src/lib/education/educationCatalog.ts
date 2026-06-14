import type { EducationCountry } from './educationTypes'
import { UP_BOARD } from './upBoardCatalog'
import { CBSE_BOARD } from './cbseBoardCatalog'

export const INDIA: EducationCountry = {
  id: 'india',
  name: 'India',
  boards: [UP_BOARD, CBSE_BOARD],
}

export const EDUCATION_COUNTRIES: EducationCountry[] = [INDIA]

export function getBoard(boardId: string) {
  for (const country of EDUCATION_COUNTRIES) {
    const board = country.boards.find((b) => b.id === boardId)
    if (board) return board
  }
  return undefined
}

export function getAllBoards() {
  return EDUCATION_COUNTRIES.flatMap((c) => c.boards)
}
