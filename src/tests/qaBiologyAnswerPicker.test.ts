/**
 * The live Biology mastery harness answers like a learner who read the lesson
 * (scripts/qa/biologyAnswerPicker.ts). Its verdicts are only as good as its
 * answers, so its measured accuracy is pinned here: if a change to the picker
 * or to the seed content drags it back toward guessing, a "mastery not
 * reached" result would stop meaning anything about the product.
 *
 * Measured when written (all 597 Biology seed probes, options shuffled):
 * authored probe 99.5%; held-out (leave-one-out, ad-hoc tier) 72.9%;
 * random baseline 35.0%.
 */
import { describe, expect, it } from 'vitest'
import { BIOLOGY_PROBES } from '@/lib/teaching/assets/biologySeedAssets'
import { BIOLOGY_DEPTH_PROBES } from '@/lib/teaching/assets/biologyDepthSeedAssets'
import { BIOLOGY_EXTENSION_PROBES } from '@/lib/teaching/assets/biologyExtensionSeedAssets'
import { answerFreeResponse, biologyCanonicalContent, pickAnswer, proseOptions } from '../../scripts/qa/biologyAnswerPicker'

const probes = [...BIOLOGY_PROBES, ...BIOLOGY_DEPTH_PROBES, ...BIOLOGY_EXTENSION_PROBES]
  .filter((p) => p.subjectSlug === 'biology' && (p.choices?.length ?? 0) > 1)

/** Deterministic shuffle, so the correct option is never simply first. */
function shuffle<T>(items: T[], seed: number): T[] {
  const out = [...items]
  let s = seed
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280
    const j = Math.floor((s / 233280) * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

describe('biologyAnswerPicker', () => {
  it('covers the whole Biology probe bank', () => {
    expect(probes.length).toBeGreaterThanOrEqual(590)
  })

  it('an authored probe is answered by its canonical key (>= 99%)', () => {
    let correct = 0
    probes.forEach((p, i) => {
      const options = shuffle(p.choices!, i + 1)
      const pick = pickAnswer(p.stem, options.map((o) => o.text), biologyCanonicalContent(p.conceptId))
      if (pick.tier === 'authored' && options[pick.index].isCorrect) correct++
    })
    expect(correct / probes.length).toBeGreaterThanOrEqual(0.99)
  })

  it('a question it has never seen is answered from the taught content, well above chance', () => {
    let correct = 0
    let chance = 0
    probes.forEach((p, i) => {
      const options = shuffle(p.choices!, i + 1)
      const full = biologyCanonicalContent(p.conceptId)
      const heldOut = { ...full, probes: full.probes.filter((q) => q.stem !== p.stem) }
      const pick = pickAnswer(p.stem, options.map((o) => o.text), heldOut)
      if (options[pick.index].isCorrect) correct++
      chance += 1 / options.length
    })
    expect(correct / probes.length).toBeGreaterThanOrEqual(0.65)
    expect(correct / probes.length).toBeGreaterThan(1.8 * (chance / probes.length))
  })

  it('a prose question is answered by quoting the lesson, not by a canned line', () => {
    const content = biologyCanonicalContent('bio.physio.homeostasis-thermoregulation')
    const answer = answerFreeResponse('What does negative feedback do when body temperature rises?', content)
    expect(content.taught.join(' ')).toContain(answer)
    expect(answer.length).toBeGreaterThan(20)
  })

  it('refuses a concept with no canonical content rather than guessing', () => {
    expect(() => biologyCanonicalContent('bio.not.a-concept')).toThrow()
  })
})

describe('proseOptions — a question asked in prose with lettered options', () => {
  it('reads inline "A. … B. … C. …" options', () => {
    const r = proseOptions('A. It enlarges the heart. B. It raises mitochondrial density. C. It adds muscle mass.')
    expect(r?.options).toEqual(['It enlarges the heart', 'It raises mitochondrial density', 'It adds muscle mass'])
  })

  it('reads bold "A)" options after a question', () => {
    const r = proseOptions('Which is right?\n**A)** Glucose\n**B)** Oxygen\n**C)** Water')
    expect(r).toEqual({ question: 'Which is right?', options: ['Glucose', 'Oxygen', 'Water'] })
  })

  it('ignores ordinary prose', () => {
    expect(proseOptions('Plain text with no options. A bit of text.')).toBeNull()
  })
})
