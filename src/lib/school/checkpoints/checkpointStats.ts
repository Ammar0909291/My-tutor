export interface CheckpointStats { attempts: number; passRate: number }
export async function getCheckpointStats(..._args: unknown[]): Promise<CheckpointStats> { return { attempts: 0, passRate: 0 } }
export async function recordCheckpoint(..._args: unknown[]): Promise<void> {}
export async function getPendingRetry(..._args: unknown[]): Promise<unknown> { return null }
