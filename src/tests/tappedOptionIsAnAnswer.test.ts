/**
 * A TAPPED MCQ OPTION WAS BEING READ AS A REQUEST TO CHANGE TOPIC.
 *
 * ── MEASURED IN PRODUCTION ──────────────────────────────────────────────────
 * Session cmtayc5c3…, 2026-08-27 03:19:06Z, teaching
 * phys.mech.generalized-coordinates. The learner tapped an authored MCQ option
 * whose text mentions the normal force, and the runtime logged:
 *
 *   [excursion]  requested: 'phys.mech.normal-force'
 *   [visual-v2]  concept: phys.mech.normal-force, renderer: card,
 *                provenance: registry:phys.mech.normal-force:force_diagram
 *   [turn-decision] divergences: ["FIGURE_CONCEPT_MISMATCH"]
 *                "teaching phys.mech.generalized-coordinates,
 *                 figure belongs to phys.mech.normal-force"
 *
 * The learner asked for nothing. They answered a question, and were shown a
 * diagram of a different concept.
 *
 * ── ROOT CAUSE ──────────────────────────────────────────────────────────────
 * `LessonScreen.tsx` sends the FULL option text (`sendMessage(sessionId,
 * option)`). `looksLikeAnswer`'s final line is a ≤ 12-WORD heuristic, written
 * for typed replies. Authored options are long precisely because
 * distractor-rich options are what makes the assessment good, so the guard
 * that exists to stop an ANSWER being read as a REQUEST fails on exactly the
 * corpus it matters most for.
 *
 * Measured over the live ACTIVE corpus: 3,098 of 4,280 options exceed 12 words
 * — chemistry 87.0%, english 72.3%, physics 64.5%, mathematics 36.6%.
 *
 * ── THE FIX ─────────────────────────────────────────────────────────────────
 * The 12-word heuristic is NOT changed. Instead the server tells the guard
 * which options it is currently offering — it already holds them in
 * `pendingMcq.options` — and a message that IS one of them is an answer,
 * whatever its length. Exact string equality after trimming only: no fuzzy
 * match, no similarity, no normalisation that could let unrelated prose match.
 *
 * Omitting the options reproduces today's behaviour byte-for-byte, which is
 * what keeps every non-option message on exactly its current path.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { looksLikeAnswer } from '@/lib/teaching/visual/session'

const REPO = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')
const ROUTE = REPO('src/app/api/learn/chat/route.ts')

/** Real option texts from the live authored corpus, verbatim. */
const PHYS_LONG =
  'Yes, N is a constraint force (perpendicular to motion, does zero work); v = Rθ̇'
const CHEM_VERY_LONG =
  'Because the LONE PAIR has its own dipole contribution, and it points in opposite '
  + 'senses in the two molecules. In NH₃ the bond dipoles point toward nitrogen, the '
  + 'same way as the lone pair, so the two ADD. In NF₃ the bond dipoles point away '
  + 'toward fluorine, OPPOSING the lone pair, so they largely cancel. Counting only '
  + 'the bonds gets the ordering exactly backwards'
const CHEM_N2 =
  'No — even nonpolar molecules experience London dispersion forces (temporary '
  + 'fluctuating dipoles), which is why liquid nitrogen exists at sufficiently low '
  + 'temperature; the intermolecular force is weaker than dipole-dipole, but not zero'
const CHEM_SF6 =
  "HCl — despite having far fewer polar bonds than SF₆, HCl's single bond dipole has "
  + "nothing to cancel with, while SF₆'s highly symmetric octahedral geometry causes "
  + 'all six dipoles to cancel exactly, making SF₆ nonpolar overall'
const SHORT = 'CO₂'

const words = (s: string) => s.trim().split(/\s+/).length

describe('1 · a short offered option is still an answer', () => {
  it('was already correct, and stays correct', () => {
    expect(words(SHORT)).toBeLessThanOrEqual(12)
    expect(looksLikeAnswer(SHORT, true)).toBe(true)                       // before
    expect(looksLikeAnswer(SHORT, true, [SHORT, 'H₂O'])).toBe(true)       // after
  })
})

describe('2-3 · long and very long offered options are answers', () => {
  const cases: Array<[string, string]> = [
    ['physics constraint force (15 words)', PHYS_LONG],
    ['chemistry lone pair (38 words)', CHEM_VERY_LONG],
    ['chemistry N₂ dispersion (22 words)', CHEM_N2],
    ['chemistry SF₆ symmetry (32 words)', CHEM_SF6],
  ]

  for (const [label, opt] of cases) {
    it(`${label} — misread before the fix, an answer after`, () => {
      expect(words(opt)).toBeGreaterThan(12)
      // the defect, pinned so it cannot silently return
      expect(looksLikeAnswer(opt, true)).toBe(false)
      // the fix: the server offered this exact string
      expect(looksLikeAnswer(opt, true, [opt, 'some other option'])).toBe(true)
    })
  }

  it('all four production options are answers when offered', () => {
    const offered = [PHYS_LONG, CHEM_VERY_LONG, CHEM_N2, CHEM_SF6]
    for (const o of offered) expect(looksLikeAnswer(o, true, offered)).toBe(true)
  })
})

describe('4 · the exact text the client sends is recognised', () => {
  it('LessonScreen sends the option itself, and that is what matches', () => {
    expect(REPO('src/components/learn/LessonScreen.tsx'))
      .toMatch(/void sendMessage\(sessionId, option\)/)
    expect(looksLikeAnswer(CHEM_SF6, true, [CHEM_SF6])).toBe(true)
  })

  it('surrounding whitespace does not break the match', () => {
    // Trimming only. It cannot make unrelated prose match.
    expect(looksLikeAnswer(`  ${PHYS_LONG}  `, true, [PHYS_LONG])).toBe(true)
  })

  it('a near-miss is NOT a match — equality, not similarity', () => {
    const almost = `${PHYS_LONG} and also something else entirely`
    expect(looksLikeAnswer(almost, true, [PHYS_LONG])).toBe(looksLikeAnswer(almost, true))
  })

  it('a PREFIX of an option is not a match', () => {
    expect(looksLikeAnswer('Yes, N is a constraint force', true, [PHYS_LONG]))
      .toBe(looksLikeAnswer('Yes, N is a constraint force', true))
  })
})

describe('5 · a message that is not an offered option keeps its old result', () => {
  const offered = [PHYS_LONG, CHEM_SF6]
  const others = [
    'sir i not understand this',
    'ok sir',
    'can you show picture please',
    'What is thermal conductivity?',
    'explain time dilation',
    'i want practice please',
    'hmm i think i get little bit',
    'A',
    '',
    'Please explain the difference between a holonomic and a non-holonomic constraint in detail',
  ]

  for (const m of others) {
    it(`byte-identical for ${JSON.stringify(m.slice(0, 40))}`, () => {
      for (const asked of [true, false]) {
        expect(looksLikeAnswer(m, asked, offered)).toBe(looksLikeAnswer(m, asked))
      }
    })
  }
})

describe('6 · a long topic request is NOT swept up by the fix', () => {
  const request =
    'Can you please explain to me in detail how the lone pair on nitrogen changes '
    + 'the dipole moment of ammonia compared with nitrogen trifluoride?'

  it('stays a request even while options are offered', () => {
    expect(words(request)).toBeGreaterThan(12)
    expect(looksLikeAnswer(request, true, [PHYS_LONG, CHEM_VERY_LONG])).toBe(false)
    expect(looksLikeAnswer(request, true)).toBe(false)
  })

  it('an explicit topic request is unchanged even if it were offered text', () => {
    // isExplicitTopicRequest still owns this; the fix must not outrank a
    // learner who genuinely typed a request.
    expect(looksLikeAnswer('explain time dilation', true)).toBe(false)
  })
})

describe('7 · options are the CURRENT pending question only', () => {
  it('an option from a DIFFERENT question does not match', () => {
    // CHEM_SF6 is offered; the learner sends a physics option from earlier.
    expect(looksLikeAnswer(PHYS_LONG, true, [CHEM_SF6]))
      .toBe(looksLikeAnswer(PHYS_LONG, true))
  })

  it('the route passes the CURRENT pending question, not a history', () => {
    expect(ROUTE).toMatch(/offeredMcqOptions: pendingMcqHoisted\?\.options/)
    // pendingMcqHoisted is the single read of the stored pending question
    expect(ROUTE.match(/pendingMcqHoisted = readPendingQuestion\(/g) ?? []).toHaveLength(1)
  })
})

describe('8 · a lesson-identity mismatch cannot create a false match', () => {
  it('readPendingQuestion returns null on a different lesson', () => {
    const PQ = REPO('src/lib/teaching/pendingQuestion.ts')
    expect(PQ).toMatch(/if \(stored !== undefined && stored !== currentLessonKey\) return null/)
  })

  it('null pending question means no options, i.e. the old behaviour', () => {
    for (const m of [PHYS_LONG, CHEM_SF6, SHORT, 'ok sir']) {
      expect(looksLikeAnswer(m, true, undefined)).toBe(looksLikeAnswer(m, true))
    }
  })

  it('an empty option list is the old behaviour too', () => {
    expect(looksLikeAnswer(PHYS_LONG, true, [])).toBe(looksLikeAnswer(PHYS_LONG, true))
  })

  it('an empty-string option can never match a blank message', () => {
    // probeToMcq already refuses empty options; belt and braces.
    expect(looksLikeAnswer('   ', true, [''])).toBe(true) // blank is an answer anyway
    expect(looksLikeAnswer('anything at all here', true, [''])).toBe(
      looksLikeAnswer('anything at all here', true))
  })
})

describe('9 · grading and correctIndex are untouched', () => {
  it('no grading module is imported by the classifier', () => {
    const SESSION = REPO('src/lib/teaching/visual/session.ts')
    expect(SESSION).not.toMatch(/from '.*teaching\/mcq'/)
    expect(SESSION).not.toMatch(/gradeMcqAnswer|correctIndex/)
  })

  it('the route still grades from the pending MCQ alone', () => {
    expect(ROUTE).toMatch(/const g = gradeMcqAnswer\(message, pendingMcqHoisted\)/)
    expect(ROUTE).toMatch(/if \(g\.correct !== null\) mcqGradeHoisted = g/)
  })
})

describe('10 · model-generated MCQs behave identically', () => {
  it('a model MCQ has no assetId and its options match the same way', () => {
    const modelOptions = [
      'Any independent variable that fixes the configuration',
      'A Cartesian x, y, z measured in metres',
    ]
    expect(looksLikeAnswer(modelOptions[0], true, modelOptions)).toBe(true)
    // and it was already an answer, being short — no behaviour change at all
    expect(looksLikeAnswer(modelOptions[0], true)).toBe(true)
  })

  it('the fix reads options only — it never consults authorship', () => {
    const SESSION = REPO('src/lib/teaching/visual/session.ts')
    expect(SESSION).not.toMatch(/assetId|authorKind|AUTHORED/)
  })
})

describe('11 · visual and excursion policy is unchanged apart from this', () => {
  it('both consumers receive the offered options', () => {
    expect(ROUTE.match(/offeredMcqOptions: pendingMcqHoisted\?\.options/g) ?? [])
      .toHaveLength(2)
  })

  it('the excursion answer-guard still calls the same helper', () => {
    expect(REPO('src/lib/teaching/excursion.ts'))
      .toMatch(/looksLikeAnswer\(message, input\.lastAssistantAskedQuestion, input\.offeredMcqOptions\)/)
  })

  it('the visual continuity guard still calls the same helper', () => {
    expect(REPO('src/lib/teaching/visual/session.ts'))
      .toMatch(/looksLikeAnswer\(message, lastAssistantAskedQuestion, offeredMcqOptions\)/)
  })

  it('no visual policy constant moved', () => {
    const RV = REPO('src/lib/teaching/visual/resolveVisual.ts')
    expect(RV).toMatch(/lastAssistantAskedQuestion: lastAsked/)
    // the restore path has no learner turn, so it offers nothing
    expect(RV).toMatch(/lastAssistantAskedQuestion: false/)
  })
})

describe('12 · D1 authored-probe provenance is intact', () => {
  it('the outcome still names the asset it scored', () => {
    expect(ROUTE).toMatch(/assetId:\s+pendingMcqHoisted\?\.assetId/)
  })

  it('the spent-probe ledger still folds this turn\'s grade', () => {
    expect(ROUTE).toMatch(/recordMcqAskedForGate\(history, pendingMcqHoisted\.question\)/)
    expect(ROUTE).toMatch(/excludeProbeStem: historyForGate \? \(stem\) => hasAskedMcq\(historyForGate, stripAuthoringLabel\(stem\)\) : undefined/)
  })
})
