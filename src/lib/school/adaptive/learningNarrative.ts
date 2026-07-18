export type LearningTrend = 'IMPROVING' | 'STABLE' | 'DECLINING'
export interface LearningNarrative { trend: LearningTrend; summary: string }
export async function getLearningNarrative(..._args: unknown[]): Promise<LearningNarrative | null> { return null }
export function buildLearningNarrativeBlock(..._args: unknown[]): string { return '' }
export function classifyLearningTrend(..._args: unknown[]): LearningTrend { return 'STABLE' }
