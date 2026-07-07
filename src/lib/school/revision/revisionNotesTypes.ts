/** Client-safe types and constants for revision notes (no server imports). */

export type RevisionNoteType = 'quick' | 'exam' | 'formula'

export interface TermDefinition {
  term: string
  definition: string
}

export interface RecallQuestion {
  question: string
  answer: string
}

export interface FormulaEntry {
  formula: string
  meaning: string
  example: string
}

export interface QuickRevisionNotes {
  type: 'quick'
  summary: string
  keyConcepts: string[]
  importantTerms: TermDefinition[]
  commonMistakes: string[]
  recallQuestions: RecallQuestion[]
}

export interface ExamRevisionNotes {
  type: 'exam'
  highWeightTopics: string[]
  likelyMistakes: string[]
  definitions: TermDefinition[]
  fastRevisionPoints: string[]
}

export interface FormulaSheetNotes {
  type: 'formula'
  formulas: FormulaEntry[]
}

export type RevisionNotes = QuickRevisionNotes | ExamRevisionNotes | FormulaSheetNotes

/** Formula sheets only make sense for quantitative subjects. */
const FORMULA_SUBJECTS = new Set(['mathematics', 'science'])

export function isFormulaSheetAvailable(subjectSlug: string): boolean {
  return FORMULA_SUBJECTS.has(subjectSlug)
}

export const REVISION_NOTE_META: Record<RevisionNoteType, { label: string; icon: string; description: string }> = {
  quick:   { label: 'Quick Revision', icon: '📝', description: 'Summary, key concepts, terms & recall questions' },
  exam:    { label: 'Exam Revision',  icon: '🎯', description: 'High-yield topics, definitions & fast points' },
  formula: { label: 'Formula Sheet',  icon: '🔢', description: 'Key formulas with meaning & example usage' },
}
