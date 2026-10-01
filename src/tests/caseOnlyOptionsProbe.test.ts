/**
 * AN AUTHORED QUESTION ABOUT LETTER CASE MUST BE SERVABLE AND GRADEABLE.
 *
 * MEASURED live (2026-09-28, 182-concept Biology mastery run, production):
 * bio.found.binomial-nomenclature answered both served authored probes
 * correctly, then sat at PRACTICE for seven turns of content-free fallback
 * text and paused unmastered. Its third authored probe — "Which of the
 * following correctly writes a scientific name?" with options that differ ONLY
 * by case — was never served: probeToMcq compared options with case folded and
 * refused them as duplicates. Had it been served, the grader would have
 * refused every tap the same way (all four options fold to "homo sapiens").
 * It is the only probe in the production corpus whose options collide with
 * case folded but not with case kept (SQL over probe_assets, 2026-09-28).
 */
import { describe, expect, it } from 'vitest'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { probeToMcq } from '@/lib/teaching/gateAssessment'
import { gradeMcqAnswer, resolveMcqChoice } from '@/lib/teaching/mcq'
import { BIOLOGY_PROBES } from '@/lib/teaching/assets/biologySeedAssets'

const binomial = BIOLOGY_PROBES.find((p) =>
  p.conceptId === 'bio.found.binomial-nomenclature' && p.stem.startsWith('Which of the following correctly writes a scientific name'))!

describe('options that differ only by case', () => {
  it('the authored capitalisation probe is on file with case-only options', () => {
    expect(binomial).toBeTruthy()
    const texts = binomial.choices!.map((c) => c.text)
    expect(new Set(texts.map((t) => t.toLowerCase())).size).toBe(1)
    expect(new Set(texts).size).toBe(texts.length)
  })

  it('is served (probeToMcq no longer refuses it)', () => {
    const mcq = probeToMcq({ stem: binomial.stem, choices: binomial.choices! })
    expect(mcq).not.toBeNull()
    expect(mcq!.options).toHaveLength(4)
    expect(mcq!.options[mcq!.correctIndex]).toBe('Homo sapiens')
  })

  it('every tap resolves to its own option; only the right one is correct', () => {
    const mcq = probeToMcq({ stem: binomial.stem, choices: binomial.choices! })!
    mcq.options.forEach((o, i) => {
      expect(resolveMcqChoice(o, mcq), o).toBe(i)
      expect(gradeMcqAnswer(o, mcq).correct, o).toBe(o === 'Homo sapiens')
    })
  })

  it('still refuses genuinely identical options', () => {
    expect(probeToMcq({ stem: 'Q?', choices: [
      { text: 'Homo sapiens', isCorrect: true }, { text: ' Homo  sapiens ', isCorrect: false },
    ] })).toBeNull()
  })

  it('an answer matching no option by case stays ungradeable, not guessed', () => {
    const mcq = probeToMcq({ stem: binomial.stem, choices: binomial.choices! })!
    expect(resolveMcqChoice('hOMO sAPIENS', mcq)).toBeNull()
  })

  it('options that differ by more than case grade exactly as before', () => {
    const mcq = { question: 'Q?', options: ['Mitosis', 'Meiosis'], correctIndex: 0 }
    expect(resolveMcqChoice('mitosis', mcq)).toBe(0)
    expect(resolveMcqChoice('MEIOSIS', mcq)).toBe(1)
  })
})

describe('corpus guard: a case-only option pair must be deliberate', () => {
  it('the capitalisation probe is the only authored probe whose options differ only by case', async () => {
    // Folding case used to refuse such probes outright, which also caught an
    // ACCIDENTAL pair ("kelvin" / "Kelvin"). Serving them is right for a question
    // about case and wrong for a typo, so a new one must be looked at: add it
    // here only if the question is about case.
    const dir = join(process.cwd(), 'src/lib/teaching/assets')
    const offenders: string[] = []
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.ts'))) {
      const mod = (await import(`../lib/teaching/assets/${file.replace(/\.ts$/, '')}`)) as Record<string, unknown>
      for (const value of Object.values(mod)) {
        if (!Array.isArray(value)) continue
        for (const p of value as Array<{ conceptId?: string; stem?: string; choices?: Array<{ text: string }> | null }>) {
          if (!p || typeof p.stem !== 'string' || !Array.isArray(p.choices)) continue
          const kept = p.choices.map((c) => c.text.trim().replace(/\s+/g, ' '))
          const folded = kept.map((t) => t.toLowerCase())
          if (new Set(kept).size === kept.length && new Set(folded).size < folded.length) {
            offenders.push(`${p.conceptId}: ${p.stem.slice(0, 60)}`)
          }
        }
      }
    }
    expect([...new Set(offenders)]).toEqual([
      'bio.found.binomial-nomenclature: Which of the following correctly writes a scientific name?',
    ])
  }, 60_000)
})
