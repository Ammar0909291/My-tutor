export interface PrerequisiteGap { chapterId: string; title: string; confidence: 'high' | 'medium' | 'low'; missingPrereqId: string | null }
export async function detectPrerequisiteGap(..._args: unknown[]): Promise<PrerequisiteGap | null> { return null }
export function buildPrerequisiteRecoveryBlock(..._args: unknown[]): string { return '' }
export function buildPrerequisiteAlertBlock(..._args: unknown[]): string { return '' }
export function findPrerequisiteChapter(..._args: unknown[]): unknown { return null }
