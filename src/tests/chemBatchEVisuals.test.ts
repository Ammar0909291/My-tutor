/**
 * CHEM Batch E (2026-10-05, chemistry real-learner run) — figures.
 * CHEM-086 phase diagram: no figure at all. CHEM-046 real gases: the ideal
 * Boyle hyperbola. CHEM-022 nucleic acids: a DNA-replication flow chart.
 * CHEM-060 ionization energy: a generic three-shell atom. Each now gets a
 * curated Tier-0 figure from an existing generator, labels from its EB entry.
 * CHEM-036/117: "i dont understand this picture" with no figure on screen.
 * CHEM-139: a yes/no card whose wrong option read "Correct".
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { answerFigureQuestionWithoutFigure, NO_FIGURE_ON_SCREEN } from '@/lib/teaching/figureReference'
import { CHEMISTRY_PROBES } from '@/lib/teaching/assets/chemistrySeedAssets'

const text = (id: string) => JSON.stringify(buildCanonicalScene(null, id))

describe('curated figures', () => {
  const cases: Array<[string, RegExp[], RegExp]> = [
    ['chem.state.phase-diagram', [/Triple point/, /Critical point/, /273\.16 K, 611 Pa/, /sublimation/], /Boyle/],
    ['chem.state.real-gases', [/Z < 1/, /Z > 1/, /a\/Vm²/, /\(P \+ a\/Vm²\)\(Vm − b\) = RT/], /10 \/ x|Boyle/],
    ['chem.bio.nucleic-acids', [/deoxyribose/, /bases A, U, G, C/, /G–C: 3 hydrogen bonds/], /[Rr]eplication|helicase/],
    ['chem.period.ionization-energy', [/Na 496/, /Al 577/, /S 999/, /Ar 1520/], /three_electron_shells|shell model/],
  ]
  for (const [id, must, mustNot] of cases) {
    it(`${id}: curated, valid, deterministic, on topic`, () => {
      expect(CONCEPT_SCENE_OVERRIDES).toContain(id)
      const spec = buildCanonicalScene(null, id)
      expect(spec).not.toBeNull()
      expect(validateSceneSpec(spec as never).valid).toBe(true)
      expect(text(id)).toBe(text(id))
      for (const m of must) expect(text(id)).toMatch(m)
      expect(text(id)).not.toMatch(mustNot)
    })
  }
})

describe('CHEM-036/117: a question about a picture that is not there', () => {
  it('the observed reply says there is no picture and stops talking about one', () => {
    const r = answerFigureQuestionWithoutFigure("I hear you—it can be confusing when the picture seems to say “nothing is happening” while the chemistry is actually busy. At equilibrium both reactions keep running at the same rate. We'll circle back to the picture in a moment.")
    expect(r.changed).toBe(true)
    expect(r.text).toBe(`${NO_FIGURE_ON_SCREEN} At equilibrium both reactions keep running at the same rate.`)
  })
  it('a reply that already says so is left alone', () => {
    const t = "There's no picture in this lesson, but here is the idea: both reactions keep going."
    expect(answerFigureQuestionWithoutFigure(t)).toEqual({ text: t, changed: false })
  })
  it('route: only when no figure is on screen and the learner asked about one', () => {
    const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(ROUTE).toMatch(/if \(!figureOnScreen && figureQuestionHoisted\) \{\n\s+const \{ answerFigureQuestionWithoutFigure \}/)
  })
})

describe('CHEM-139: a yes/no question is answered yes or no', () => {
  it('the hexane card offers "Yes —", not "Correct —"', () => {
    const p = CHEMISTRY_PROBES.find((x) => x.stem.startsWith('Hexane is a non-polar hydrocarbon'))!
    expect(p.choices!.map((c) => c.text.split(' — ')[0])).toEqual(['No', 'Yes'])
  })
})
