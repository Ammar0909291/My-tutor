export interface AssessmentDecision { shouldAssess: boolean; reason: string }
export async function getAssessmentDecision(..._args: unknown[]): Promise<AssessmentDecision> { return { shouldAssess: false, reason: '' } }
export function buildAssessmentIntelligenceBlock(..._args: unknown[]): string { return '' }
