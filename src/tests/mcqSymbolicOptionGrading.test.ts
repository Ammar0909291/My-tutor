/**
 * The symbolic-option grading failures P-9 ratcheted, closed.
 *
 * THE DEFECT. `norm()` keeps only [a-z0-9.- ] — right for prose, fatal for an
 * option whose ANSWER is the symbol. Measured over the 2,750 servable authored
 * probes, 16 correct options were ungradeable (chemistry 14, physics 2) because
 * two options collapsed to the same normalised string:
 *
 *   "+500 J" / "−500 J"       -> "500 j"    sign (9 of the 16)
 *   "MgCl₂"  / "MgCl"         -> "mgcl"     subscript
 *   "O₃ … O₂"/ "O₂ … O₃"      -> "o o"      subscript, both sides
 *   "α … β"  / "β … α"        -> ""         Greek: nothing survives at all
 *   "×√2"    / "×2"           -> "2"        radical
 *   "Δx·Δp ≥ ħ/2" / "≤ ħ/2"   -> "x p 2"    relational operator
 *
 * `resolveMcqChoice` then refused (`exact.length > 1` -> null), which is the
 * RIGHT call on the information it had. The defect is upstream: the fold threw
 * the distinguishing character away before comparing.
 *
 * WHY IT MATTERED TO A LEARNER, not just to the harness: a tap sends the option
 * text verbatim (`LessonScreen` -> `sendMessage(sessionId, option)`), so on all
 * 16 a learner tapping the RIGHT answer was graded nothing, no gate counter
 * moved, and the lesson could not close.
 *
 * THE FIX. When the lossy fold gives up, compare again with case and whitespace
 * folded and every symbol preserved. Strictly narrowing: it runs only where the
 * function already returned null, and returns an index only when exactly one
 * option matches character-for-character.
 *
 * The controls below are the point of this file. False credit is worse than
 * under-credit, so most of it is spent proving the fix cannot manufacture one.
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

/** The six modules production is seeded from — same set P-9's test uses. */
const CORPUS: ReadonlyArray<{
  conceptId?: string; stem?: string; choices?: Array<{ text?: string; isCorrect?: boolean }>
}> = [
  ...SEED_PROBES, ...AUTHORED_PROBES, ...CHEMISTRY_PROBES,
  ...PHYSICS_BAND_GAP_PROBES, ...PHYSICS_DEPTH_PROBES, ...CHEMISTRY_DEPTH_PROBES,
] as never

/** Exactly `probeToMcq`'s admission rules: a probe it refuses can never serve. */
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

/** Find a probe by a distinctive fragment of one of its options, NOT by concept
 *  id — several of these concepts carry more than one probe, and picking the
 *  wrong one is a mistake this investigation actually made before catching it. */
function probeWithOption(fragment: string): TutorMCQ {
  const hit = servableProbes.find(({ mcq }) => mcq.options.some((o) => o.includes(fragment)))
  if (!hit) throw new Error(`no servable probe carries an option containing ${fragment}`)
  return hit.mcq
}

describe('a tap on a symbolic option is graded', () => {
  // One per collision MECHANISM, addressed by content so the test states what
  // it is about. Each asserts the whole probe, not just the correct option:
  // every option must resolve to ITSELF, or the fix has merely moved the
  // ambiguity somewhere else.
  const cases: Array<[string, string]> = [
    ['sign (+ vs −)', '+500 J'],
    ['sign, decimals', '+2.0 J/K'],
    ['sign, negative correct answer', '−184 kJ/mol'],
    ['subscript', 'MgCl₂'],
    ['subscript on both sides', 'O₃ … O₂'],
    ['Greek only — folds to nothing', 'α … β'],
    ['radical', 'Energy ×2, speed ×√2'],
    ['relational operator', 'Δx · Δp ≥ ħ/2'],
    ['charge sign inside prose', 'Charge 3+, mass number 56'],
    ['oxidation states', '−1 and +5'],
  ]

  it.each(cases)('%s: every option resolves to its own index', (_label, fragment) => {
    const mcq = probeWithOption(fragment)
    mcq.options.forEach((option, i) => {
      expect(resolveMcqChoice(option, mcq), `option ${i}: ${option}`).toBe(i)
    })
  })

  it('the whole corpus: every correct option is now gradeable', () => {
    const broken = servableProbes
      .filter(({ mcq }) => resolveMcqChoice(mcq.options[mcq.correctIndex], mcq) !== mcq.correctIndex)
      .map(({ conceptId }) => conceptId)
    expect(broken).toEqual([])
  })

  it('the corpus is the real one — this is not passing on an empty set', () => {
    expect(servableProbes.length).toBeGreaterThanOrEqual(2750)
  })
})

describe('NEGATIVE CONTROLS — the fix cannot manufacture credit', () => {
  it('no option anywhere resolves to a DIFFERENT option', () => {
    // The false-evidence half. P-9 drove this to 0 and it must stay 0: this is
    // the assertion that would catch the fallback crediting the wrong index.
    const misattributed: string[] = []
    for (const { conceptId, mcq } of servableProbes) {
      mcq.options.forEach((option, i) => {
        const got = resolveMcqChoice(option, mcq)
        if (got !== null && got !== i) misattributed.push(`${conceptId} opt${i} -> ${got}`)
      })
    }
    expect(misattributed).toEqual([])
  })

  it('every DISTRACTOR still resolves to itself, so it is graded WRONG', () => {
    // The fix makes previously-ungradeable distractors resolve too. That must
    // land on the distractor's own index — never the correct one.
    let creditedAsCorrect = 0
    for (const { mcq } of servableProbes) {
      mcq.options.forEach((option, i) => {
        if (i === mcq.correctIndex) return
        if (resolveMcqChoice(option, mcq) === mcq.correctIndex) creditedAsCorrect++
      })
    }
    expect(creditedAsCorrect).toBe(0)
  })

  it('omitting the sign earns nothing — the sign IS the answer', () => {
    // "+500 J" and "−500 J" are different answers. A learner who types the
    // magnitude has not chosen, and must not be credited.
    for (const fragment of ['+500 J', '−184 kJ/mol', '+2.0 J/K', '+300 J']) {
      const mcq = probeWithOption(fragment)
      const stripped = fragment.replace(/^[+−-]\s*/, '')
      expect(resolveMcqChoice(stripped, mcq), `bare "${stripped}"`).not.toBe(mcq.correctIndex)
    }
  })

  it('two options identical once whitespace and case are folded still refuse', () => {
    // The ambiguity refusal is preserved, not bypassed: if the verbatim
    // comparison cannot separate them either, the answer is still null.
    const mcq: TutorMCQ = {
      question: 'Which?', options: ['+500 J', '+500  J', 'something else'], correctIndex: 0,
    } as TutorMCQ
    expect(resolveMcqChoice('+500 J', mcq)).toBeNull()
  })

  it('a hedge is refused even when it folds to nothing', () => {
    // NON_COMMITTAL must outrank the fallback. A hedge always contains letters
    // so it cannot reach the empty-fold path in practice, but the ordering is
    // asserted rather than assumed.
    const mcq = probeWithOption('α … β')
    expect(resolveMcqChoice('i dont know', mcq)).toBeNull()
    expect(resolveMcqChoice('not sure', mcq)).toBeNull()
  })

  it('a message matching no option is still refused', () => {
    const mcq = probeWithOption('+500 J')
    for (const msg of ['≥', '±', '   ', 'the third one is nice']) {
      expect(resolveMcqChoice(msg, mcq), msg).not.toBe(mcq.correctIndex)
    }
  })
})

describe('P-9 behaviour is untouched (exact match still precedes the label scan)', () => {
  const resistivity = probeWithOption('Wire A:')

  it('the rule-0a probes still resolve every option to itself', () => {
    resistivity.options.forEach((o, i) => expect(resolveMcqChoice(o, resistivity)).toBe(i))
  })

  it('the fixture still carries two labelled letters', () => {
    // Without this, the test above could go green because the CONTENT was
    // rewritten rather than the parser kept correct. Copied from P-9's file
    // deliberately: it guards this file's premise too.
    const correct = resistivity.options[resistivity.correctIndex]
    const labels = new Set<string>()
    for (const m of correct.matchAll(/(?:^|[\s(])([a-dA-D])(\s*[.)\],:;-])?(?=\s|$)/g)) {
      if (m[2]) labels.add(m[1].toLowerCase())
    }
    expect(labels.size).toBeGreaterThan(1)
  })

  it.each([
    ['A.', 0],
    ['ok i think A. but sir explain', 0],
    ['A or B, i am not sure', null],
    ['a lens bends light', null],
    ['maybe A. or maybe B.', null],
  ])('%s -> %s', (message, expected) => {
    expect(resolveMcqChoice(message as string, resistivity)).toBe(expected)
  })
})
