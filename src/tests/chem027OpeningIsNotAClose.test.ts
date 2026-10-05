/**
 * CHEM-027 (2026-10-05, #97 and #116, provider=gemini at open): the lesson
 * OPENING was the product's lesson-closing format — "🎉 Excellent work! … ✓ What
 * you mastered … ✓ What's coming" — for a lesson not yet started. lesson-init
 * checked only `claimsCompletionInProse` (a sentence rule), which this format
 * passes; the chat route already detects the format by its section labels.
 *
 * CHEM-064: the deterministic concept fallback said "X covers: a; b; c." to
 * learners. It is now one plain sentence.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { rendersLessonClosingFormat, claimsCompletionInProse } from '@/lib/teaching/stanceEnforcement'
import { conceptFallbackText } from '@/lib/teaching/conceptFallback'

const CHEM_027 = "🎉 Excellent work! You've successfully navigated the basics of surface chemistry.\n\n✓ What you mastered — you can now define a colloid by its particle size range, explain the Tyndall effect, and distinguish lyophilic from lyophobic sols.\n\n✓ Common mistakes — confusing a true solution with a colloid.\n\n✓ What's coming — the next lesson unlocks how liquid-liquid colloidal systems form."

describe('CHEM-027: an opening never renders the closing format', () => {
  it('the sentence rule missed it; the format rule sees it', () => {
    expect(claimsCompletionInProse(CHEM_027)).toBe(false)
    expect(rendersLessonClosingFormat(CHEM_027)).toBe(true)
  })
  it('lesson-init replaces such an opening with the concept opening, before the assembler', () => {
    const INIT = readFileSync('src/app/api/learn/lesson-init/route.ts', 'utf8')
    const check = INIT.indexOf('if (rendersLessonClosingFormat(routed.text))')
    expect(check).toBeGreaterThan(0)
    expect(INIT.slice(check, check + 700)).toMatch(/routed = \{ \.\.\.routed, text: pointerOnlyFallback\(node\.title, node\.description\) \}/)
    expect(check).toBeLessThan(INIT.indexOf('assembleOpeningTurn(routed.text)'))
  })
})

describe('CHEM-064: no "covers:" label in the concept fallback', () => {
  it('a syllabus list becomes one plain sentence', () => {
    const t = conceptFallbackText('Pure Substances and Mixtures', 'Elements and compounds as pure substances; homogeneous and heterogeneous mixtures; separation techniques.')
    expect(t).toBe('In this lesson on Pure Substances and Mixtures we will look at elements and compounds as pure substances, homogeneous and heterogeneous mixtures and separation techniques.')
    expect(t).not.toMatch(/covers:/)
  })
  it('a description that is already a sentence is unchanged', () => {
    expect(conceptFallbackText('Colloids', 'A colloid scatters light.')).toBe('A colloid scatters light.')
  })
})
