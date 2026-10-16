/**
 * M2 — the figure self-description reads out only what is written on the figure.
 *
 * Production six-lesson QA run (2026-10-15), math.real.convergence-sequences:
 * asked what the picture shows, the tutor answered
 *   titled “Convergence of a sequence (ε–N) — Show the ε–N definition on
 *   aₙ = 2 + (−1)ⁿ/n → 2: given ε = 0.3, from the 4th term on … ”
 *   The words written on it are: “3”, … “The sequence aₙ = 2 + (−1)ⁿ/n: 1, 2.5,
 *   1.67, 2.25, 1.8, … It swings above and below 2 by e…
 * i.e. the semantics layer's "<title> — <teaching goal>" caption (the goal is an
 * authoring note, clipped at 160) and the step narration (sentences, clipped at
 * 120 in the stored copy) were both read out as figure text, cut mid-sentence.
 */
import { describe, it, expect } from 'vitest'
import { evidenceFromPayload, evidenceForLog, figureEvidenceAnswer, type FigureEvidence } from '@/lib/teaching/figureReference'
import { describeVisualPayload } from '@/lib/teaching/visual/visualSemantics'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'

function evidenceOf(conceptId: string): FigureEvidence {
  const d = resolveVisual({
    subject: 'mathematics', message: 'show me a diagram', lessonConceptId: conceptId, learnerRequest: 'diagram',
  } as never) as unknown as { payload: { renderer?: string; sceneSpec?: unknown } | null }
  expect(d.payload, conceptId).toBeTruthy()
  return evidenceFromPayload(d.payload as never, describeVisualPayload as never)
}

const CONVERGENCE = evidenceOf('math.real.convergence-sequences')
const EVEN_ODD = evidenceOf('math.func.even-odd-functions')

describe('M2 · figure self-description', () => {
  it('names only the figure title, not the authoring note after the dash', () => {
    const a = figureEvidenceAnswer(CONVERGENCE, null, 'this-message', null)
    expect(a).toContain('titled “Convergence of a sequence (ε–N)”.')
    expect(a).not.toMatch(/Show the ε–N definition|—/)
  })

  it('reads out labels, never narration sentences', () => {
    const a = figureEvidenceAnswer(CONVERGENCE, null, 'this-message', null)
    expect(a).toContain('“L = 2”')
    expect(a).toContain('“ε₁ = 0.3”')
    expect(a).not.toMatch(/The sequence aₙ|Pick ε|A smaller ε/)
  })

  it.each([['live evidence', (e: FigureEvidence) => e], ['stored (clipped) copy', evidenceForLog]] as const)(
    'quotes nothing that is cut mid-sentence — %s',
    (_name, shape) => {
      for (const ev of [CONVERGENCE, EVEN_ODD]) {
        const a = figureEvidenceAnswer(shape(ev), null, 'earlier', null)
        const quoted = [...a.matchAll(/“([^”]*)”/g)].map((m) => m[1]).slice(1) // [0] is the title
        expect(quoted.length).toBeGreaterThan(0)
        for (const q of quoted) {
          expect(q.length, q).toBeLessThanOrEqual(48)
          expect(q, q).not.toMatch(/…$|\.\.\.$/)
        }
      }
    },
  )

  it('still reads out the labels of a figure that has no narration', () => {
    const a = figureEvidenceAnswer(EVEN_ODD, null, 'this-message', null)
    expect(a).toContain('“f(−x) = f(x)”')
    expect(a).toContain('“g(−x) = −g(x)”')
    expect(a).toContain('Tell me which of those parts is confusing')
  })

  it('a figure whose only text is narration falls back to the no-labels sentence', () => {
    const a = figureEvidenceAnswer(
      { caption: 'Rate law — an authoring note', text: ['Step one explains the idea in a full sentence. It is long enough to be narration.'] },
      null, 'earlier', null,
    )
    expect(a).toBe('The picture for this lesson is further up in our chat. It is titled “Rate law”. Tell me which part of it is confusing and I will explain it.')
  })
})
