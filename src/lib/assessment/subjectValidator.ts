import { findLibrarySubject } from '@/lib/curriculum/subjectCatalog'

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

const CATEGORY_REQUIREMENTS: Record<string, AssessmentRequirement> = {
  programming: {
    required: true,
    minScore: 70,
    type: 'code',
    questionFocus: ['code correctness', 'output prediction', 'debugging'],
    codeOutputInstruction: 'Ask the learner to predict the exact output or fix a bug in a short code snippet.',
    deterministicNote: 'Grade strictly against the actual program output — there is only one correct answer.',
  },
  computer_science: {
    required: true,
    minScore: 70,
    type: 'code',
    questionFocus: ['algorithmic reasoning', 'complexity analysis', 'tracing'],
    codeOutputInstruction: 'Ask the learner to trace an algorithm or analyze its time/space complexity.',
    deterministicNote: 'Grade strictly against the actual program output — there is only one correct answer.',
  },
  ai: {
    required: true,
    minScore: 65,
    type: 'mixed',
    questionFocus: ['conceptual understanding', 'applied reasoning'],
  },
  mathematics: {
    required: true,
    minScore: 70,
    type: 'quiz',
    questionFocus: ['problem solving', 'numerical accuracy'],
    mathAnswerInstruction: 'Require the learner to show the final numeric or symbolic answer, not just describe the method.',
    deterministicNote: 'Grade strictly against the exact computed answer — there is only one correct answer.',
  },
  physics: {
    required: true,
    minScore: 70,
    type: 'quiz',
    questionFocus: ['problem solving', 'numerical accuracy', 'unit correctness'],
    mathAnswerInstruction: 'Require the learner to show the final numeric answer with correct units.',
    deterministicNote: 'Grade strictly against the exact computed answer — there is only one correct answer.',
  },
  chemistry: {
    required: true,
    minScore: 70,
    type: 'quiz',
    questionFocus: ['problem solving', 'reaction prediction'],
    mathAnswerInstruction: 'Require the learner to show the final numeric or chemical-equation answer.',
    deterministicNote: 'Grade strictly against the exact correct answer — there is only one correct answer.',
  },
  biology: {
    required: false,
    minScore: 65,
    type: 'quiz',
    questionFocus: ['conceptual understanding', 'process explanation'],
  },
  languages: {
    required: false,
    minScore: 65,
    type: 'quiz',
    questionFocus: ['grammar', 'vocabulary', 'comprehension'],
  },
}

const DEFAULT_REQUIREMENT: AssessmentRequirement = {
  required: false,
  minScore: 70,
  type: 'quiz',
  questionFocus: ['conceptual understanding'],
}

export function getAssessmentRequirement(subjectCode: string): AssessmentRequirement {
  const subject = findLibrarySubject(subjectCode)
  if (!subject) return DEFAULT_REQUIREMENT
  return CATEGORY_REQUIREMENTS[subject.category] ?? DEFAULT_REQUIREMENT
}
