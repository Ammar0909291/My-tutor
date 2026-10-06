/**
 * "Always tap the first option" must not pass a mastery gate.
 *
 * MEASURED 2026-09-27: the authored corpus lists the correct choice first in
 * 6,280 of 6,281 multiple-choice items across every subject, and probeToMcq
 * served that order unchanged — so a learner who tapped A every time was
 * graded correct on every authored question. probeToMcq now presents a
 * deterministic, question-keyed permutation.
 */
import { lowerEmphasis } from '@/lib/teaching/authoredProseForLearner'
import { isVerdictHead, plainVerdictHead } from '@/lib/teaching/gateAssessment'
import { describe, expect, it } from 'vitest'
import { presentationOrder, probeToMcq } from '@/lib/teaching/gateAssessment'
import { BIOLOGY_PROBES } from '@/lib/teaching/assets/biologySeedAssets'
import { BIOLOGY_DEPTH_PROBES } from '@/lib/teaching/assets/biologyDepthSeedAssets'
import { BIOLOGY_EXTENSION_PROBES } from '@/lib/teaching/assets/biologyExtensionSeedAssets'
import { CHEMISTRY_PROBES } from '@/lib/teaching/assets/chemistrySeedAssets'
import { AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'

type P = Parameters<typeof probeToMcq>[0]
const CORPUS = [...BIOLOGY_PROBES, ...BIOLOGY_DEPTH_PROBES, ...BIOLOGY_EXTENSION_PROBES, ...CHEMISTRY_PROBES, ...AUTHORED_PROBES] as unknown as P[]

describe('the served order', () => {
  const served = CORPUS.map((p) => ({ p, m: probeToMcq(p) })).filter((x) => x.m !== null)

  it('the corpus really is authored correct-first (the reason this exists)', () => {
    const authoredFirst = served.filter(({ p }) => p.choices?.[0]?.isCorrect === true).length
    expect(authoredFirst / served.length).toBeGreaterThan(0.99)
  })

  it('tapping the first option every time no longer passes', () => {
    for (const n of [2, 3, 4]) {
      const items = served.filter(({ m }) => m!.options.length === n)
      if (items.length < 50) continue
      const firstWins = items.filter(({ m }) => m!.correctIndex === 0).length / items.length
      // Chance is 1/n; allow sampling slack, forbid anything near "always".
      expect(firstWins, `${n}-option items`).toBeLessThan(1 / n + 0.1)
    }
  })

  it('every slot holds the correct answer for some question', () => {
    const fours = served.filter(({ m }) => m!.options.length === 4)
    expect(new Set(fours.map(({ m }) => m!.correctIndex))).toEqual(new Set([0, 1, 2, 3]))
  })

  it('the key moves with its choice — the served correct option is the authored correct option', () => {
    // Since task #2 (2026-09-30) an option may be served as its answer head,
    // with the authored working held in `rationales`; rejoined, it is the
    // authored text exactly, so the key still moves with its choice.
    const full = (m: NonNullable<typeof served[number]['m']>, i: number) =>
      m.rationales?.[i] ? `${m.options[i]} — ${m.rationales[i]}` : m.options[i]
    // The author's capitals-for-emphasis are lowered at serve (CHEM-003,
    // 2026-10-05, lowerEmphasis); the text is otherwise the authored text.
    for (const { p, m } of served) {
      // Compared case-insensitively: a split rationale starts its own sentence.
      // BIO-007 (2026-10-06): a bare verdict head is served as a plain answer
      // ("Correct" -> "Yes, that is correct"); the rationale is unchanged.
      const asServed = (t: string) => { const h = t.match(/^([\s\S]+?)\s[—–]\s([\s\S]+)$/); return h && isVerdictHead(h[1]) ? `${plainVerdictHead(h[1])} — ${h[2]}` : t }
      const authored = asServed(p.choices!.find((c) => c.isCorrect)!.text.trim()).toLowerCase()
      expect(asServed(full(m!, m!.correctIndex)).replace(/\s[—–]\s/, ' — ').toLowerCase()).toBe(authored.replace(/\s[—–]\s/, ' — '))
      expect(m!.options.map((_, i) => asServed(full(m!, i)).replace(/\s[—–]\s/, ' — ').toLowerCase()).sort())
        .toEqual(p.choices!.map((c) => asServed(c.text.trim()).toLowerCase().replace(/\s[—–]\s/, ' — ')).sort())
      expect(full(m!, m!.correctIndex)).toBe(lowerEmphasis(full(m!, m!.correctIndex)))
    }
  })

  it('is stable: the same question always shows the same order', () => {
    for (const { p, m } of served.slice(0, 200)) expect(probeToMcq(p)).toEqual(m)
  })

  it('a re-ask (choices rotated by the selector) is shown in a different order', () => {
    let moved = 0
    const fours = served.filter(({ m }) => m!.options.length === 4).slice(0, 100)
    for (const { p, m } of fours) {
      const c = p.choices!
      const again = probeToMcq({ ...p, choices: [...c.slice(1), c[0]] })!
      expect(again.options[again.correctIndex]).toBe(m!.options[m!.correctIndex])
      if (again.correctIndex !== m!.correctIndex) moved++
    }
    expect(moved).toBe(fours.length)
  })
})

describe('presentationOrder', () => {
  it('is a permutation', () => {
    for (const key of ['a', 'Which branch…?', '']) {
      for (const n of [1, 2, 3, 4]) expect([...presentationOrder(key, n)].sort()).toEqual(Array.from({ length: n }, (_, i) => i))
    }
  })
})
