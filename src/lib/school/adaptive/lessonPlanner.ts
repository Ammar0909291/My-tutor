export interface LessonPlan {
  chapterId: string
  objectives: string[]
  steps: unknown[]
  currentStep?: unknown
  currentConcept: { nodeId: string } | null
  nextConcept: { nodeId: string } | null
}
export async function buildLessonPlan(..._args: unknown[]): Promise<LessonPlan> {
  return { chapterId: '', objectives: [], steps: [], currentConcept: null, nextConcept: null }
}
export function buildLessonPlanBlock(..._args: unknown[]): string { return '' }
export function getCurrentLessonStep(..._args: unknown[]): unknown { return null }
export function getLessonPlanCardItems(..._args: unknown[]): unknown[] { return [] }
export type ConceptStatus = string
