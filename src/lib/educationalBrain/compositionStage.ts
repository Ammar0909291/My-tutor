/**
 * Stage 3 — Composition (pure, no LLM).
 * Formats the retrieved concept context into a compact tutor context note.
 * Sets TurnContext.composedContextNote. Skipped when conceptContext is null.
 */
import type { TurnContext } from './types'

export function compositionStage(ctx: TurnContext): TurnContext {
  if (ctx.shortCircuit || !ctx.conceptContext) {
    return {
      ...ctx,
      composedContextNote: null,
      spans: [...ctx.spans, { stage: 'composition', startedAt: Date.now(), durationMs: 0, notes: 'skipped' }],
    }
  }

  const start = Date.now()
  const { title, description, neighbors } = ctx.conceptContext

  const prereqs = neighbors
    .filter((n) => n.direction === 'prerequisite')
    .slice(0, 3)
    .map((n) => `  • ${n.title}`)

  const lines = [
    `\n\nCONCEPT CONTEXT [Educational Brain — internal, do not surface to student]`,
    `Concept: ${title}`,
    `Summary: ${description.slice(0, 200)}${description.length > 200 ? '…' : ''}`,
  ]
  if (prereqs.length > 0) {
    lines.push(`Prerequisites:\n${prereqs.join('\n')}`)
  }

  return {
    ...ctx,
    composedContextNote: lines.join('\n'),
    spans: [...ctx.spans, { stage: 'composition', startedAt: start, durationMs: Date.now() - start }],
  }
}
