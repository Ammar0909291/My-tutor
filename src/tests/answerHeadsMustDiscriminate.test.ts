/**
 * An answer-head cut served two options that said the same thing.
 *
 * 2026-09-30 learner baseline, C1 (chem.elect.galvanic-cell, real account):
 * "Is copper therefore the anode?" was shown as  A "Yes"  /  B "Yes here".
 * The authored options differ only AFTER the dash ("Yes here — but the reason
 * is the COMPARISON …" vs "Yes — copper is more reactive …"), so cutting to
 * the heads left an item no learner could answer. When one head is another
 * plus only hedge words, the full text is served, exactly as before the cut.
 */
import { describe, it, expect } from 'vitest'
import { probeToMcq, splitAnswerHeads, splitAnswerHeadsPerOption } from '@/lib/teaching/gateAssessment'
import { CHEMISTRY_PROBES } from '@/lib/teaching/assets/chemistrySeedAssets'

const cuAg = CHEMISTRY_PROBES.find((p) => p.stem.startsWith('A cell is built from Cu (E° = +0.34 V) and Ag'))!

describe('the production item', () => {
  it('is on file with the two near-identical heads', () => {
    expect(cuAg).toBeTruthy()
    expect(cuAg.choices!.map((c) => c.text.split(' — ')[0])).toEqual(['Yes here', 'Yes'])
  })

  it('is served with its discriminating text, not "Yes" / "Yes here"', () => {
    const mcq = probeToMcq(cuAg)!
    expect(mcq).not.toBeNull()
    expect(mcq.options.some((o) => o === 'Yes' || o === 'Yes here')).toBe(false)
    expect(mcq.options.join(' ')).toContain('COMPARISON')
    expect(mcq.options[mcq.correctIndex]).toContain('COMPARISON')
  })
})

describe('the rule', () => {
  it('refuses heads that differ only by hedge words', () => {
    expect(splitAnswerHeads(['Yes here — a', 'Yes — b'])).toBeNull()
    expect(splitAnswerHeadsPerOption(['Yes here — a', 'Yes — b'])).toBeNull()
    expect(splitAnswerHeads(['No — a', 'No, not now — b', 'Yes — c'])).not.toBeNull()
  })

  it('keeps heads that differ by a real word, an article, a number or their order', () => {
    expect(splitAnswerHeads(['Dogs make great pets — a', 'The dogs make great pets — b'])).not.toBeNull()
    expect(splitAnswerHeads(['I visited — a', 'I have visited — b'])).not.toBeNull()
    expect(splitAnswerHeads(['6:10 — a', '10:6 — b'])).not.toBeNull()
    expect(splitAnswerHeads(['Equal — a', 'Not equal — b'])).not.toBeNull()
  })
})
