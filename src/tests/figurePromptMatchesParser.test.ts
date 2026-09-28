/**
 * THE GENERATION PROMPT MUST DESCRIBE WHAT THE VALIDATORS ACCEPT (2026-09-28).
 *
 * MEASURED over every fresh Tier 3 candidate in production
 * (visual_generation_outcome, 2026-09-28):
 *   - graphs: only 124 of 378 distinct generated equations compile. The prompt
 *     showed "2x + 1" but never said mathParser knows only x, numbers,
 *     + - * / ^, parentheses and sin/cos/exp, so the generator wrote t (44),
 *     π/pi (44), sqrt (52), log/ln (27), 1e-21 (30) and "=" (114) — and the
 *     critic rejected each as a blank plot before judging it. That is why
 *     phys.astro.gravitational-waves never got a figure: it always chose a
 *     strain-vs-TIME graph.
 *   - process flows: all 64 `structurally-invalid` process_flow candidates had
 *     a step title over the schema's 60 characters (phys.qm.perturbation-theory
 *     failed twice this way before a third attempt passed). The prompt stated
 *     the cap but offered nowhere else to put a formula, although the schema
 *     has an optional `note` (<= 140) and the renderer draws it.
 * The prompt now states both. These tests keep it honest: what it says is
 * accepted IS accepted.
 */
import { describe, expect, it } from 'vitest'
import { buildConceptFigurePrompt } from '@/lib/teaching/visual/visualEngine'
import { compileExpression } from '@/lib/visuals/mathParser'
import { processFlowSpecSchema } from '@/lib/visuals/visualSpec'

const prompt = buildConceptFigurePrompt({ conceptId: 'phys.astro.gravitational-waves', title: 'Gravitational Waves', description: 'Ripples in spacetime.' } as never)

describe('graph equations', () => {
  it('the prompt names the grammar the parser knows', () => {
    expect(prompt).toContain('ONLY')
    expect(prompt).toMatch(/the variable x, plain numbers, \+ - \* \/ \^, parentheses, and\s+sin cos exp/)
    expect(prompt).toMatch(/no other letter or symbol \(not t, π, pi, sqrt, log, k, A\)/)
  })

  it('every substitute it recommends compiles', () => {
    for (const e of ['2x + 1', 'sin(6.2832*x)', 'x^0.5', 'exp(-0.5*x)*cos(6.2832*x)']) expect(compileExpression(e), e).not.toBeNull()
  })

  it('what it forbids really does not compile (so the instruction is needed)', () => {
    for (const e of ['sin(2π*x)', 'sin(2*pi*x)', 'sin(t)', 'sqrt(x)', '1e-21*sin(x)', 'h = sin(x)']) expect(compileExpression(e), e).toBeNull()
  })
})

describe('process-flow steps', () => {
  it('the prompt offers a note for detail, with a valid example', () => {
    expect(prompt).toContain('Put\n                  any formula or detail in the step\'s optional "note"')
    const example = prompt.match(/\{"title":"First-order energy shift","note":"[^"]+"\}/)![0]
    const spec = processFlowSpecSchema.safeParse({ type: 'process_flow', title: 'T', steps: [JSON.parse(example), { title: 'Next' }] })
    expect(spec.success).toBe(true)
  })

  it('the real perturbation-theory candidate that failed would pass as title + note', () => {
    const failed = 'Compute first‑order state correction: |n¹⟩ = Σ_{m≠n} |m⁰⟩⟨m⁰|V|n⁰⟩/(Eₙ⁰−E_m⁰)'
    expect(processFlowSpecSchema.safeParse({ type: 'process_flow', title: 'T', steps: [{ title: failed }, { title: 'Next' }] }).success).toBe(false)
    const [title, note] = failed.split(': ')
    expect(processFlowSpecSchema.safeParse({ type: 'process_flow', title: 'T', steps: [{ title, note }, { title: 'Next' }] }).success).toBe(true)
  })
})
