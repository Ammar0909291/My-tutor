export interface CheckpointResult {
  passed: boolean
  score: number
  checkpointAsked: boolean
  question: string
  expectedAnswer: string
  nodeId: string | null
  engagement: 'substantive' | 'deflect' | 'vague'
}
export async function evaluateCheckpoint(..._args: unknown[]): Promise<CheckpointResult> {
  return { passed: false, score: 0, checkpointAsked: false, question: '', expectedAnswer: '', nodeId: null, engagement: 'deflect' }
}
export async function evaluateCheckpointTurn(..._args: unknown[]): Promise<CheckpointResult | null> {
  return null
}
