export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export function validateSubjectAnswer(
  _answer: string,
  _expectedType: string
): ValidationResult {
  return { valid: true, errors: [] }
}

export interface AssessmentRequirement {
  required: boolean
  minScore: number
  type: string
  questionFocus: string[]
  mathAnswerInstruction?: string
  codeOutputInstruction?: string
  deterministicNote?: string
}

export function getAssessmentRequirement(_subjectCode: string): AssessmentRequirement {
  return {
    required: false,
    minScore: 70,
    type: 'quiz',
    questionFocus: ['conceptual understanding'],
  }
}
