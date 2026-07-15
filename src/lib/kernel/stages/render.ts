/**
 * Stage 11 — RENDER. Owner: driver (RS §8; probabilistic-recorded).
 *
 * The ONLY stage that may call an LLM (RS P-R2). K3 provides a driver
 * interface so the pipeline is testable with a stub driver, and adapts to
 * generateAIResponse for production use.
 */
import type { KernelState, Stage, RenderDraft } from '../types'
import { newId } from '../context'

export interface RenderDriver {
  render(plan: {
    systemPrompt: string
    history: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>
  }): Promise<{ text: string; provider: string; latencyMs: number }>
}

/** Adapter around generateAIResponse. Uses a dynamic import so tests can
 *  load this module without Groq credentials configured. */
export function makeLlmDriver(opts?: { lang?: 'en' | 'ru' | 'hi'; maxTokens?: number }): RenderDriver {
  return {
    async render(plan) {
      const started = Date.now()
      const { generateAIResponse } = await import('@/lib/ai/client')
      const messages = plan.history.filter((m) => m.role !== 'system')
        .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))
      const text = await generateAIResponse(messages, plan.systemPrompt, opts?.maxTokens ?? 800, opts?.lang ?? 'en')
      return { text, provider: 'llm', latencyMs: Date.now() - started }
    },
  }
}

export function renderStage(driver: RenderDriver): Stage<KernelState, KernelState> {
  return {
    name: 'RENDER',
    async run(state) {
      const plan = state.plan
      if (!plan) throw new Error('RENDER: plan artifact missing')
      const out = await driver.render({ systemPrompt: plan.systemPrompt, history: plan.history })
      const draft: RenderDraft = {
        draftId: newId('r'),
        turnId: state.context.turnId,
        text: out.text,
        provider: out.provider,
        attempts: 1,
        latencyMs: out.latencyMs,
      }
      return { ...state, draft }
    },
  }
}
