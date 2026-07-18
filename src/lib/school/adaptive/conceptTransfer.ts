export type TransferLevel = 'TRANSFER_WEAK' | 'DEVELOPING_TRANSFER' | 'TRANSFER_STRONG'
export interface TransferProfile { level: TransferLevel }
export async function evaluateConceptTransfer(..._args: unknown[]): Promise<TransferProfile | null> { return null }
export function buildTransferReasoningBlock(..._args: unknown[]): string { return '' }
export function generateTransferPrompt(..._args: unknown[]): string { return '' }
