import { generateJSON } from '@/lib/ai/client'
import type { CheckpointEvaluation, CheckpointNode } from './checkpointTypes'

/**
 * Lightweight AI classifier (Sprint BS): looks at the tutor's previous
 * message and the student's latest reply, and decides whether the tutor
 * asked a conversational "understanding check" question — and if so,
 * whether the student's reply demonstrates understanding.
 *
 * Returns null if the classifier is unavailable or the previous message
 * did not contain a checkpoint question. Never throws.
 */
export async function evaluateCheckpointTurn(
  previousAssistantMessage: string,
  studentReply: string,
  nodes: CheckpointNode[],
): Promise<CheckpointEvaluation | null> {
  if (!previousAssistantMessage.trim() || !studentReply.trim()) return null

  const nodeList = nodes.length > 0
    ? `\nTopic ids for this chapter (use one of these for "nodeId" if relevant, else null): ${nodes.map((n) => `${n.id} (${n.title})`).join(', ')}`
    : ''

  const prompt = `You are analyzing one turn of a tutoring conversation to detect a lightweight "understanding check" — a short, conversational question the tutor asked the student to check if they understood a concept just explained. This is NOT a formal quiz, assessment, or numbered question list.

TUTOR'S PREVIOUS MESSAGE:
"""
${previousAssistantMessage.slice(0, 2000)}
"""

STUDENT'S REPLY:
"""
${studentReply.slice(0, 1000)}
"""
${nodeList}

Answer these:
1. checkpointAsked: did the tutor's message end with (or contain) ONE short conversational question checking comprehension of what was just taught? (true/false)
2. question: if yes, that question (verbatim or close paraphrase), else null.
3. expectedAnswer: if yes, a concise (1 sentence) correct/expected answer or key idea, else null.
4. passed: if yes, does the student's reply demonstrate understanding of that key idea? Be lenient — partial but on-track answers pass. Off-topic, "I don't know", or incorrect answers do not pass. Default false if checkpointAsked is false.
5. nodeId: if yes and the topic-id list is non-empty, the single best-matching id from that list, else null.

Return ONLY this JSON shape:
{"checkpointAsked": boolean, "question": string|null, "expectedAnswer": string|null, "passed": boolean, "nodeId": string|null}`

  const result = await generateJSON(prompt, 400)
  if (!result || typeof result !== 'object' || typeof result.checkpointAsked !== 'boolean') return null

  return {
    checkpointAsked: result.checkpointAsked,
    question: typeof result.question === 'string' ? result.question : null,
    expectedAnswer: typeof result.expectedAnswer === 'string' ? result.expectedAnswer : null,
    passed: typeof result.passed === 'boolean' ? result.passed : false,
    nodeId: typeof result.nodeId === 'string' && nodes.some((n) => n.id === result.nodeId) ? result.nodeId : null,
  }
}
