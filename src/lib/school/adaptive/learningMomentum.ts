export type MomentumLevel = 'DECLINING_MOMENTUM' | 'STABLE' | 'STABLE_MOMENTUM' | 'BUILDING_MOMENTUM' | 'STRONG_MOMENTUM' | 'DISENGAGEMENT_RISK'
export interface MomentumProfile { level: MomentumLevel }
export async function getLearningMomentum(..._args: unknown[]): Promise<MomentumProfile | null> { return null }
export function buildMomentumBlock(..._args: unknown[]): string { return '' }
export function getMomentumPriorityWeight(..._args: unknown[]): number { return 0 }
