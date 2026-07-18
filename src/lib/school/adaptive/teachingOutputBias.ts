export type HintBiasKind = 'PREFERRED' | 'SUPPRESSED' | 'NEUTRAL'
export interface OutputBias { kind: 'SUPPRESS_OPTIONAL' | 'VISUAL' | 'TEXT' | 'BALANCED' }
export function deriveOutputBias(..._args: unknown[]): OutputBias { return { kind: 'BALANCED' } }
export function deriveHintBias(..._args: unknown[]): HintBiasKind | null { return null }
export function getOutputBias(..._args: unknown[]): OutputBias { return { kind: 'BALANCED' } }
export function getHintBias(..._args: unknown[]): HintBiasKind | null { return null }
export function buildOutputBiasBlock(..._args: unknown[]): string { return '' }
export function applyHintBias(..._args: unknown[]): string { return '' }
export function applyOutputBias(..._args: unknown[]): string { return '' }
export function isOptionalInlinePractice(..._args: unknown[]): boolean { return false }
export function isOptionalVisual(..._args: unknown[]): boolean { return false }
export function isOptionalVisualTag(..._args: unknown[]): boolean { return false }
export function isRequiredSceneSpec(..._args: unknown[]): boolean { return true }
