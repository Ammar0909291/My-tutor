export type TeachingStyleType = 'SOCRATIC' | 'DIRECT' | 'COLLABORATIVE'
export async function getTeachingStyle(..._args: unknown[]): Promise<TeachingStyleType> { return 'DIRECT' }
export function buildTeachingStyleBlock(..._args: unknown[]): string { return '' }
