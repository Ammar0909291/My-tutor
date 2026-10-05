/**
 * CHEM Batch D (2026-10-05, chemistry real-learner run) — text the lesson
 * screen cannot show, and praise the grade does not back. Every input string
 * below is quoted from docs/qa/CHEMISTRY_REAL_LEARNER_DEFECTS.md.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { plainNotation, typesetCaretNotation, flattenPipeTables } from '@/lib/text/plainNotation'
import { parseMcqTag } from '@/lib/teaching/mcq'
import { stripResidualMachineTags } from '@/lib/teaching/residualTagSweep'
import { affirmsTheLearner, stripLeadingFalseConfirmation } from '@/lib/teaching/answerConfirmation'
import { authoredProseForLearner } from '@/lib/teaching/authoredProseForLearner'
import { CHEMISTRY_EXPLANATIONS } from '@/lib/teaching/assets/chemistrySeedAssets'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

describe('CHEM-129 caret/brace notation is typeset', () => {
  it('ions, subscripts and constants from the observed cards', () => {
    expect(typesetCaretNotation('Which species is being oxidized in the half‑reaction Fe^{2+} → Fe^{3+}?'))
      .toBe('Which species is being oxidized in the half‑reaction Fe²⁺ → Fe³⁺?')
    expect(typesetCaretNotation('MnO_4^-')).toBe('MnO₄⁻')
    expect(typesetCaretNotation('Mn^{2+}')).toBe('Mn²⁺')
    expect(typesetCaretNotation('Compare Q_sp with K_sp')).toBe('Compare Qₛₚ with Kₛₚ')
    expect(typesetCaretNotation('K_n')).toBe('Kₙ')
    expect(typesetCaretNotation('Δn_gas = 1')).toBe('Δn(gas) = 1')
    expect(typesetCaretNotation('H_2O and 10^{-3} M')).toBe('H₂O and 10⁻³ M')
  })
  it('never touches math the client typesets, code, or snake_case words', () => {
    for (const t of ['\\(Fe^{2+}\\)', '$$K_{sp} = [Ag^+][Cl^-]$$', '`max_value`', 'the max_value field', 'https://x.org/a_b']) {
      expect(typesetCaretNotation(t)).toBe(t)
    }
  })
  it('a model-written card is typeset before it is persisted, so the tap still grades', () => {
    const { mcq } = parseMcqTag('Check.\n<!--MCQ q="Which is oxidised: Fe^{2+} → Fe^{3+}?" a="Fe^{2+}" b="Fe^{3+}" c="MnO_4^-" d="Mn^{2+}" correct="A"-->')
    expect(mcq?.question).toBe('Which is oxidised: Fe²⁺ → Fe³⁺?')
    expect(mcq?.options).toEqual(['Fe²⁺', 'Fe³⁺', 'MnO₄⁻', 'Mn²⁺'])
    expect(mcq?.correctIndex).toBe(0)
  })
})

describe('CHEM-065 pipe tables become plain lines', () => {
  it('the observed ionisation-energy table', () => {
    const t = 'Here are numbers:\n| Element | Symbol | First ionization energy (kJ mol⁻¹) |\n|---------|--------|-----------------------------------|\n| Sodium | Na | 496 |\n| Magnesium| Mg | 738 |\nSee the jump?'
    const out = flattenPipeTables(t)
    expect(out).not.toMatch(/\||---/)
    expect(out).toBe('Here are numbers:\nElement · Symbol · First ionization energy (kJ mol⁻¹)\nSodium · Na · 496\nMagnesium · Mg · 738\nSee the jump?')
  })
  it('a lone pipe in prose is not a table', () => {
    expect(flattenPipeTables('|x| is the absolute value')).toBe('|x| is the absolute value')
  })
  it('the final sweep applies both rewrites to every reply', () => {
    expect(ROUTE).toMatch(/cleanText = stripResidualMachineTags\(cleanText\)\n[\s\S]{0,200}cleanText = \(await import\('@\/lib\/text\/plainNotation'\)\)\.plainNotation\(cleanText\)/)
    expect(plainNotation('| a | b |\n|---|---|\n| Fe^{2+} | 1 |')).toBe('a · b\nFe²⁺ · 1')
  })
})

describe('CHEM-143 orphaned card markup with the answer key', () => {
  it('the observed reply is removed whole (PHYS-023 backstop, 72abee7)', () => {
    const t = '<!" a="Filter precipitate" b="Wash precipitate" c="Dry/ignite to constant mass" d="Dissolve sample in solvent" correct="A"-->'
    expect(stripResidualMachineTags(t).trim()).toBe('')
  })
  it('CHEM-032: the same shape after prose keeps the prose and drops the key', () => {
    const t = 'Chlorine (Cl) fills the p-block on the right side of the table. <!" a="s-block" b="p-block" c="d-block" d="f-block" correct="B"-->'
    const out = stripResidualMachineTags(t)
    expect(out).not.toMatch(/correct=|<!/)
    expect(out).toContain('Chlorine (Cl) fills the p-block on the right side of the table.')
  })
})

describe('CHEM-134/CHEM-075 praise the grade does not back', () => {
  it('each observed opening is stripped as unbacked praise', () => {
    for (const s of [
      'That’s a solid observation—you’ve picked out the chloride ion as the leaving group in the SN1 pathway.',
      "Great, you've captured the key idea.",
      "You've hit on the exact mechanism behind sacrificial protection.",
      'That calculation is spot‑on – the numbers line up correctly.',
      'Great, you’ve followed the calculations so far.',
    ]) expect(stripLeadingFalseConfirmation(`${s} Chloride is the leaving group here.`), s).toBe('Chloride is the leaving group here.')
  })
  it('the C5 confirmation detector itself is unchanged (scorer parity)', () => {
    expect(affirmsTheLearner('That’s a solid observation.')).toBe(false)
  })
  it('the SN1 reply loses its opening, keeps the teaching', () => {
    const r = stripLeadingFalseConfirmation('That’s a solid observation—you’ve picked out the chloride ion as the leaving group in the SN1 pathway. When the C–Cl bond breaks, the carbon temporarily becomes a carbocation.')
    expect(r).toBe('When the C–Cl bond breaks, the carbon temporarily becomes a carbocation.')
  })
  it('ordinary teaching prose is not praise', () => {
    for (const s of ['The chloride ion leaves first.', 'Each step follows the same pattern.', 'This point on the curve is the equivalence point.']) {
      expect(stripLeadingFalseConfirmation(`${s} More teaching follows.`), s).toBe(`${s} More teaching follows.`)
    }
  })
  it('route: an ungraded ack/request turn has its opening praise stripped (not a typed yes/no)', () => {
    expect(ROUTE).toMatch(/if \(resolvedGrade === null && !\/\^\\s\*\(\?:yes\|yeah\|yep\|no\|nope\)\\b\/i\.test\(learnerAuthoredMessage\)\)/)
    expect(ROUTE).toMatch(/isBareAcknowledgement\(learnerAuthoredMessage\) \|\| readsAsRequestToTutor\(learnerAuthoredMessage\)/)
  })
})

describe('CHEM-003 authored explanation text served to a learner', () => {
  const phenol = CHEMISTRY_EXPLANATIONS.find((e) => e.conceptId === 'chem.alc.phenols' && e.familyKind === 'core_explanation')!.content
  it('the observed phenol dump: no capitals-for-emphasis, no "covered earlier" pointer', () => {
    const out = authoredProseForLearner(phenol)
    expect(out).not.toMatch(/\b(?:LOOKS|DELOCALIZE|STRONGER|ACID|ORTHO|PARA|DIRECTING|PHENOXIDE|ACTIVATED|TWO|BOTH|AND)\b/)
    expect(out).not.toMatch(/covered earlier|connecting (?:directly )?to the/)
    expect(out).toContain('looks like an alcohol')
    expect(out).toContain('(resonance)')
    expect(out).toContain('pKa ~10 vs. ~16-18 for alcohols')
    expect(out).toContain('NaHCO₃')
    expect(out).toContain('(RO⁻)')
  })
  it('acronyms, formulas and names stay readable', () => {
    expect(authoredProseForLearner('VSEPR and IUPAC rules; RCHO and COOH groups; BOYLE found it; group VIII; SN2 and EAS.'))
      .toBe('VSEPR and IUPAC rules; RCHO and COOH groups; Boyle found it; group VIII; SN2 and EAS.')
  })
  it('sentence-initial emphasis keeps its capital', () => {
    expect(authoredProseForLearner('Trap: "Phenol is weak." FALSE — it is acidic. OZONE (O₃) is an allotrope (covered earlier in the atmosphere chemistry unit).'))
      .toBe('Trap: "Phenol is weak." False — it is acidic. Ozone (O₃) is an allotrope.')
  })
  it('route: both memory-serve paths pass through it', () => {
    expect(ROUTE).toMatch(/authoredProseForLearner\(remediationCardText\)/)
    expect(ROUTE).toMatch(/authoredProseForLearner\(assembled\.text\)/)
  })
})

describe('CHEM-004 a two-option model card that asks why', () => {
  it('is not served; a two-option factual card still is', () => {
    expect(parseMcqTag('Compare them.\n<!--MCQ q="He or NH₃ — which has the higher boiling point? Why?" a="He" b="NH₃" correct="B"-->').mcq).toBeNull()
    expect(parseMcqTag('Check.\n<!--MCQ q="Can oxygen form OF6?" a="Yes" b="No" correct="B"-->').mcq?.options).toEqual(['Yes', 'No'])
  })
})
