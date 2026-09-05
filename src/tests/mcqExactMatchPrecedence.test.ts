/**
 * P-9 — a verbatim option must resolve to ITSELF, whatever letters the author
 * wrote inside it.
 *
 * THE DEFECT THIS PINS (measured, ledger §9m/§9n). `resolveMcqChoice` ran its
 * labelled-letter rule (0a) BEFORE its exact-text rule (0). Tapping an option
 * sends that option's text verbatim, so when the text itself contained
 * standalone letters — `Wire A: 2R … Wire B: R/2` — the label scan read the
 * AUTHOR's letters as the LEARNER naming choices:
 *
 *   two labelled letters  -> "ambiguous" -> null   (the answer is discarded)
 *   one labelled letter   -> that letter's index   (a DIFFERENT option is graded)
 *
 * The second is the dangerous one: across the authored corpus it graded four
 * distractor taps as the correct answer. That is false mastery evidence, not a
 * missing grade.
 *
 * THE FIX is ordering only: rule 0 now runs first. Rule 0a is untouched and
 * still decides every message that is not verbatim an option, which is what the
 * negative controls below hold in place.
 *
 * These tests drive the REAL `resolveMcqChoice` against the REAL authored
 * corpus. Nothing is hand-copied, so a future edit to one of these probes is
 * exercised as written rather than against a stale transcription.
 */
import { describe, it, expect } from 'vitest'

import { resolveMcqChoice, type TutorMCQ } from '@/lib/teaching/mcq'
import { stripAuthoringLabel } from '@/lib/teaching/gateProbeContract'

import { SEED_PROBES } from '@/lib/teaching/assets/brainSeedAssets'
import { AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import { CHEMISTRY_PROBES } from '@/lib/teaching/assets/chemistrySeedAssets'
import { PHYSICS_BAND_GAP_PROBES } from '@/lib/teaching/assets/physicsBandGapAssets'
import { PHYSICS_DEPTH_PROBES } from '@/lib/teaching/assets/physicsDepthSeedAssets'
import { CHEMISTRY_DEPTH_PROBES } from '@/lib/teaching/assets/chemistryDepthSeedAssets'

/** The six modules production is actually seeded from (instrumentation.ts +
 *  scripts/brain/seed-knowledge-assets.ts + certification/answerSource.ts). */
const CORPUS: ReadonlyArray<{
  conceptId?: string
  stem?: string
  choices?: Array<{ text?: string; isCorrect?: boolean }>
}> = [
  ...SEED_PROBES, ...AUTHORED_PROBES, ...CHEMISTRY_PROBES,
  ...PHYSICS_BAND_GAP_PROBES, ...PHYSICS_DEPTH_PROBES, ...CHEMISTRY_DEPTH_PROBES,
] as never

/** Exactly the admission rules `probeToMcq` applies — a probe it would refuse
 *  is a probe production can never serve, so grading it proves nothing. */
function servable(p: (typeof CORPUS)[number]): TutorMCQ | null {
  const ch = p.choices
  if (!Array.isArray(ch) || ch.length < 2 || ch.length > 4) return null
  if (ch.filter((c) => c?.isCorrect === true).length !== 1) return null
  const options = ch.map((c) => String(c?.text ?? '').trim())
  if (options.some((o) => o.length === 0)) return null
  return {
    question: stripAuthoringLabel(String(p.stem ?? '')),
    options,
    correctIndex: ch.findIndex((c) => c?.isCorrect === true),
  } as TutorMCQ
}

const servableProbes = CORPUS
  .map((p) => ({ conceptId: String(p.conceptId ?? ''), mcq: servable(p) }))
  .filter((x): x is { conceptId: string; mcq: TutorMCQ } => x.mcq !== null)

/** The label scan rule 0a performs, replicated ONLY to classify a failure as
 *  "this defect" vs "some other cause". It never decides an assertion. */
const LABEL_SCAN = /(?:^|[\s(])([a-dA-D])(\s*[.)\],:;-])?(?=\s|$)/g
function labelledLetters(text: string): Set<string> {
  const out = new Set<string>()
  for (const m of text.matchAll(LABEL_SCAN)) if (m[2]) out.add(m[1].toLowerCase())
  return out
}

function byConcept(conceptId: string): TutorMCQ[] {
  return servableProbes.filter((p) => p.conceptId === conceptId).map((p) => p.mcq)
}

describe('P-9: the three real probes rule 0a mis-read', () => {
  // Named because P-9 measured them, not chosen for convenience: these are
  // every corpus probe whose CORRECT option carried two or more labelled
  // letters. If authoring ever removes the construction from one of them the
  // fixture disappears and this test says so, rather than passing vacuously.
  for (const conceptId of [
    'phys.em.resistivity',
    'chem.equil.solubility',
    'chem.bio.nucleic-acids',
  ]) {
    it(`${conceptId}: every option resolves to its own index`, () => {
      const probes = byConcept(conceptId)
      expect(probes.length).toBeGreaterThan(0)
      for (const mcq of probes) {
        mcq.options.forEach((option, i) => {
          expect(resolveMcqChoice(option, mcq)).toBe(i)
        })
      }
    })
  }

  it('phys.em.resistivity still carries the construction that broke it', () => {
    // Guards the fixture itself. Without this the test above could go green
    // because the content was rewritten, not because the parser was fixed.
    const probes = byConcept('phys.em.resistivity')
    const withTwoLabels = probes.filter(
      (m) => labelledLetters(m.options[m.correctIndex]).size > 1,
    )
    expect(withTwoLabels.length).toBeGreaterThan(0)
  })
})

describe('P-9: rule 0a is unchanged for everything that is not a verbatim option', () => {
  const mcq: TutorMCQ = {
    question: 'Which one?',
    options: ['first option text', 'second option text', 'third option text'],
    correctIndex: 0,
  }

  it('"A." — a bare labelled letter still selects A', () => {
    expect(resolveMcqChoice('A.', mcq)).toBe(0)
  })

  it('"ok i think A. but sir explain" — the 2026-08-25 production case still grades', () => {
    expect(resolveMcqChoice('ok i think A. but sir explain', mcq)).toBe(0)
  })

  it('"A or B, i am not sure" — weighing two options still selects neither', () => {
    expect(resolveMcqChoice('A or B, i am not sure', mcq)).toBeNull()
  })

  it('"a lens bends light" — the English article is still not option A', () => {
    expect(resolveMcqChoice('a lens bends light', mcq)).toBeNull()
  })

  it('two labelled letters in the LEARNER\'s own sentence are still ambiguous', () => {
    // The behaviour rule 0a exists for. Only the author's letters were ever the
    // problem, and the fix distinguishes them by exact match, not by weakening
    // this.
    expect(resolveMcqChoice('maybe A. or maybe B.', mcq)).toBeNull()
  })

  it('an option that normalises like another still selects neither', () => {
    const twins: TutorMCQ = {
      question: 'Which one?', options: ['Same text', 'same   TEXT'], correctIndex: 0,
    }
    expect(resolveMcqChoice('Same text', twins)).toBeNull()
  })
})

describe('P-9 corpus guard: a tap must never be attributed to another option', () => {
  // The false-evidence half of the defect, and the assertion that matters most:
  // a mis-attribution can grade a distractor as correct. Measured at 6 before
  // the fix (4 of them false credit) and 0 after. This one is NOT ratcheted —
  // the only acceptable number is zero.
  it('no option in the authored corpus resolves to a DIFFERENT option', () => {
    const misattributed: string[] = []
    for (const { conceptId, mcq } of servableProbes) {
      mcq.options.forEach((option, i) => {
        const got = resolveMcqChoice(option, mcq)
        if (got !== null && got !== i) misattributed.push(`${conceptId} opt${i} -> ${got}`)
      })
    }
    expect(misattributed).toEqual([])
  })

  it('no correct option is left ungradeable by the labelled-letter rule', () => {
    // Scoped deliberately to THIS defect. P-9 also measured 16 correct options
    // that resolve to null for an unrelated reason — short symbolic text such
    // as "+500 J", "MgCl₂", "Δx · Δp ≥ ħ/2". Those are real and out of P-9's
    // scope; asserting on them here would either fail for something this fix
    // never claimed to address, or invite someone to edit the corpus to make a
    // test pass. They are counted below instead.
    const stillBroken: string[] = []
    for (const { conceptId, mcq } of servableProbes) {
      const correct = mcq.options[mcq.correctIndex]
      if (resolveMcqChoice(correct, mcq) === mcq.correctIndex) continue
      if (labelledLetters(correct).size > 1) stillBroken.push(conceptId)
    }
    expect(stillBroken).toEqual([])
  })

  it('records the unrelated symbolic-option population as a ratchet, not a pass', () => {
    // A number, kept honest: it must not grow. Lowering it is a separate piece
    // of work (P-9 §9m "18 have a different cause"), and this assertion is the
    // thing that will notice if that work happens — or if new authoring makes
    // it worse.
    const unresolvable = servableProbes.filter(
      ({ mcq }) => resolveMcqChoice(mcq.options[mcq.correctIndex], mcq) !== mcq.correctIndex,
    ).length
    expect(servableProbes.length).toBeGreaterThanOrEqual(2750)
    expect(unresolvable).toBeLessThanOrEqual(16)
  })
})
