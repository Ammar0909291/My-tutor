export interface ExamReadiness { subjectSlug: string; score: number }
export async function getExamReadinessForSubject(..._args: unknown[]): Promise<ExamReadiness | null> { return null }
export function buildExamReadinessBlock(_readiness: unknown, _idMapper?: (id: string) => string): string { return '' }
