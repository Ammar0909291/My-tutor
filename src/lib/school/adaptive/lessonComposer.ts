export interface LessonPlan {
  stages: Array<{ stage_type: string }>
  concept_id: string
  currentConcept: { nodeId: string } | null
  nextConcept: { nodeId: string } | null
}
export interface ComposedLesson { intro: string; steps: string[] }
export async function composeLesson(..._args: unknown[]): Promise<ComposedLesson | null> { return null }
export function buildLessonComposerBlock(..._args: unknown[]): string { return '' }
export async function getLessonPlan(..._args: unknown[]): Promise<LessonPlan> {
  return { stages: [], concept_id: '', currentConcept: null, nextConcept: null }
}
export function buildLessonPlanBlock(..._args: unknown[]): string { return '' }
export function parseLessonProgressTag(..._args: unknown[]): { stageIndex: number | null; cleanText: string } {
  return { stageIndex: null, cleanText: '' }
}
