/**
 * D1 — THE SAME AUTHORED QUESTION, ASKED FOUR TIMES, COUNTED AS MASTERY.
 *
 * ── MEASURED IN PRODUCTION ──────────────────────────────────────────────────
 * Session cmtan7xg5…, phys.mech.generalized-coordinates, 2026-08-26. Four
 * assistant messages, provider=gate, byte-identical (md5 46b57bce…, 384 chars),
 * at 22:08:26 · 22:09:09 · 22:09:50 · 22:11:12. `evidence_events` holds THREE
 * PROBE_OUTCOME rows for that session, all `pass`, all carrying the SAME
 * assetId 0c6f384c-…. The lesson closed check=1 practice=2 verified=true.
 *
 * One question, answered three times, certified as three pieces of independent
 * evidence. That is the hollow advancement the whole evidence architecture
 * exists to prevent.
 *
 * Across production: 15 of the 73 sessions that used the deterministic gate
 * re-served an identical probe (20.5%), worst case six times.
 *
 * ── ROOT CAUSE: TWO KEYS FOR ONE LEDGER ─────────────────────────────────────
 * The ledger has exactly one writer and one reader, and they disagree.
 *
 *   WRITE (route.ts)  recordMcqAsked(h, pendingMcqHoisted.question)
 *                     where probeToMcq set
 *                       question = stripAuthoringLabel(probe.stem)
 *   READ  (route.ts)  excludeProbeStem: (stem) => hasAskedMcq(h, stem)
 *                     where `stem` is the RAW authored stem
 *
 * `hasAskedMcq` fingerprints via `memoryFingerprint`, which lowercases, drops
 * punctuation, discards filler words and SORTS the remaining tokens. The label's
 * words survive that as extra tokens, so a labelled stem's raw fingerprint can
 * never equal its stripped one. The probe is invisible to the ledger and is
 * offered again on the next gate turn, forever.
 *
 * The offending stem, read from production `probe_assets`:
 *   "DIAGNOSTIC (Prerequisite PD-1/PD-2): Is the normal force on a
 *    frictionless ramp a constraint force? …"
 *
 * ── SCOPE, MEASURED NOT ASSUMED ─────────────────────────────────────────────
 * 425 of the 1,860 authored probes in `AUTHORED_PROBES` carry a label (22.9%),
 * and for ALL 425 the raw fingerprint differs from the stripped one — i.e.
 * every labelled probe in the corpus is affected, none by luck exempt.
 * In production ACTIVE assets: physics 239/1,219, chemistry 133/687,
 * english 0/430, mathematics 0/83.
 *
 * ── WHY THE FIX IS ON THE READ SIDE ONLY ────────────────────────────────────
 * `stripAuthoringLabel` is idempotent and is the identity on any stem without a
 * label, so normalising the lookup cannot change an unlabelled probe. It is
 * applied at the gate call site, where the input is known to be an authored
 * stem, rather than inside `hasAskedMcq`/`recordMcqAsked`:
 *
 *   · the WRITE side already stores the stripped form for authored probes, so
 *     the fix matches ledger entries recorded BEFORE it shipped — no migration;
 *   · the write side also stores MODEL questions, which are never label-shaped
 *     but could coincidentally begin "PRACTICE:". Normalising the writer would
 *     change the key of already-persisted model entries and could let a model
 *     question be re-asked — a regression in exchange for nothing.
 *
 * Nothing here changes grading, mastery counters, the ladder, CLOSE, or which
 * probes exist. It changes which probes are ELIGIBLE, in exactly the direction
 * the exclusion was always documented to enforce.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { stripAuthoringLabel } from '@/lib/teaching/gateProbeContract'
import {
  recordMcqAsked, hasAskedMcq, memoryFingerprint, initialTeachingHistory,
} from '@/lib/teaching/teachingHistory'
import { probeToMcq } from '@/lib/teaching/gateAssessment'
import { gradeMcqAnswer } from '@/lib/teaching/mcq'
import { AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'

const REPO = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')
const ROUTE = REPO('src/app/api/learn/chat/route.ts')
const SELECTOR = REPO('src/lib/teaching/assets/teachingActionRepository.ts')

/** The exact production stem that exposed D1 (probe_assets 0c6f384c-…). */
const D1_STEM =
  'DIAGNOSTIC (Prerequisite PD-1/PD-2): Is the normal force on a frictionless ramp '
  + 'a constraint force? A particle moves in a circle of radius R. What is its speed '
  + 'in terms of the angle?'

const D1_CHOICES = [
  { text: 'Yes, it is a constraint force, and v = Rθ̇', isCorrect: true },
  { text: 'No, it does work, and v = R/θ̇', isCorrect: false },
]

/** The ledger key the SERVING side writes, reproduced from the real modules. */
const servedKey = (stem: string) => probeToMcq({ stem, choices: D1_CHOICES })!.question

/** The exclusion predicate the gate builds, AFTER the fix. */
const excludes = (h: ReturnType<typeof initialTeachingHistory>) =>
  (stem: string) => hasAskedMcq(h, stripAuthoringLabel(stem))

describe('1 · a labelled probe resolves to ONE spent identity', () => {
  it('the raw stem and the stripped stem are the same spent probe', () => {
    let h = initialTeachingHistory('phys.mech.generalized-coordinates')
    h = recordMcqAsked(h, servedKey(D1_STEM))
    expect(excludes(h)(D1_STEM)).toBe(true)
    expect(excludes(h)(stripAuthoringLabel(D1_STEM))).toBe(true)
  })

  it('and the un-normalised lookup is exactly what missed it', () => {
    // The pre-fix behaviour, pinned so the defect cannot silently return.
    let h = initialTeachingHistory('phys.mech.generalized-coordinates')
    h = recordMcqAsked(h, servedKey(D1_STEM))
    expect(hasAskedMcq(h, D1_STEM)).toBe(false)              // the bug
    expect(hasAskedMcq(h, stripAuthoringLabel(D1_STEM))).toBe(true) // the fix
  })

  it('every labelled probe in the real corpus fingerprints differently raw', () => {
    const labelled = AUTHORED_PROBES.filter((p) => stripAuthoringLabel(p.stem) !== p.stem.trim())
    expect(labelled.length).toBeGreaterThan(400)
    // None of them were accidentally safe: this is the blast radius.
    const accidentallySafe = labelled.filter(
      (p) => memoryFingerprint(p.stem) === memoryFingerprint(stripAuthoringLabel(p.stem)),
    )
    expect(accidentallySafe).toHaveLength(0)
  })

  it('and every one of them round-trips once the lookup is normalised', () => {
    const labelled = AUTHORED_PROBES.filter((p) => stripAuthoringLabel(p.stem) !== p.stem.trim())
    for (const p of labelled) {
      let h = initialTeachingHistory('phys.mech.generalized-coordinates')
      h = recordMcqAsked(h, stripAuthoringLabel(p.stem))
      expect(excludes(h)(p.stem)).toBe(true)
    }
  })
})

describe('2 · once served, the same asset cannot be selected again', () => {
  /** The selector's real filter step, over candidate rows. */
  const survivors = (stems: string[], exclude: (s: string) => boolean) =>
    stems.filter((s) => !exclude(s))

  it('the spent probe is gone from the candidate set', () => {
    let h = initialTeachingHistory('phys.mech.generalized-coordinates')
    h = recordMcqAsked(h, servedKey(D1_STEM))
    expect(survivors([D1_STEM], excludes(h))).toEqual([])
  })

  it('answering it a second time cannot be offered at all', () => {
    let h = initialTeachingHistory('phys.mech.generalized-coordinates')
    h = recordMcqAsked(h, servedKey(D1_STEM))
    // three consecutive gate turns, as the production session had
    for (let turn = 0; turn < 3; turn += 1) {
      expect(survivors([D1_STEM], excludes(h))).toEqual([])
    }
  })
})

describe('3 · a spent probe is skipped, a fresh one is still chosen', () => {
  const OTHER = 'FORMATIVE: Which coordinate uniquely fixes a pendulum bob on its arc?'

  it('the unused probe survives while the spent one does not', () => {
    let h = initialTeachingHistory('phys.mech.generalized-coordinates')
    h = recordMcqAsked(h, servedKey(D1_STEM))
    const left = [D1_STEM, OTHER].filter((s) => !excludes(h)(s))
    expect(left).toEqual([OTHER])
  })

  it('and after that one is spent too, nothing is left', () => {
    let h = initialTeachingHistory('phys.mech.generalized-coordinates')
    h = recordMcqAsked(h, stripAuthoringLabel(D1_STEM))
    h = recordMcqAsked(h, stripAuthoringLabel(OTHER))
    expect([D1_STEM, OTHER].filter((s) => !excludes(h)(s))).toEqual([])
  })
})

describe('4 · an exhausted corpus yields NOTHING, never a duplicate', () => {
  it('the exclusion runs BEFORE scoring, so an empty set stays empty', () => {
    // Source-level, because that ordering is the guarantee: filtering after
    // pickBest would serve the same question with a lower confidence attached.
    const filterAt = SELECTOR.indexOf('excludeProbeStem?.(row.probeAsset!.stem)')
    const pickAt = SELECTOR.indexOf('const best = pickBest(')
    expect(filterAt).toBeGreaterThan(0)
    expect(pickAt).toBeGreaterThan(filterAt)
  })

  it('the grade-band fallback reuses the ALREADY-FILTERED rows', () => {
    // A fallback that re-queried would resurrect the spent probe.
    const fb = SELECTOR.slice(SELECTOR.indexOf('Grade-band fallback'))
    expect(fb).toMatch(/pickBest\(state, rows, options, 0\)/)
    expect(fb.slice(0, fb.indexOf('return null'))).not.toMatch(/excludeProbeStem/)
  })

  it('nothing in the selector re-admits an excluded stem', () => {
    expect(SELECTOR).not.toMatch(/excludeProbeStem[^)]*\)\s*===\s*false\s*\?/)
  })
})

describe('5 · model-generated MCQs are untouched', () => {
  it('normalising is the identity on a model question', () => {
    for (const q of [
      'Which digit repeats in the decimal expansion of 1/6?',
      'What is the torque when a 20 N force acts at 0.3 m from the pivot?',
      'A car travels 120 km in 2 h. What is its speed?',
    ]) {
      expect(stripAuthoringLabel(q)).toBe(q)
    }
  })

  it('a model question keeps a single ledger identity either way', () => {
    const q = 'A car travels 120 km in 2 h. What is its speed?'
    let h = initialTeachingHistory('phys.mech.generalized-coordinates')
    h = recordMcqAsked(h, q)
    expect(hasAskedMcq(h, q)).toBe(true)
    expect(excludes(h)(q)).toBe(true)
  })

  it('the exclusion is only ever built for the authored gate selection', () => {
    // One reader, at the gate. A second call site would be a second policy.
    expect(ROUTE.match(/hasAskedMcq\(/g) ?? []).toHaveLength(1)
  })
})

describe('6 · unlabelled authored probes are untouched', () => {
  it('their key is unchanged by the normalisation', () => {
    const plain = AUTHORED_PROBES.filter((p) => stripAuthoringLabel(p.stem) === p.stem.trim())
    expect(plain.length).toBeGreaterThan(1000)
    for (const p of plain.slice(0, 300)) {
      expect(memoryFingerprint(stripAuthoringLabel(p.stem))).toBe(memoryFingerprint(p.stem))
    }
  })

  it('a stem that is only a label is left alone rather than emptied', () => {
    expect(stripAuthoringLabel('DIAGNOSTIC:')).toBe('DIAGNOSTIC:')
  })
})

describe('7 · pending-question and lesson identity guards are intact', () => {
  it('the ledger still has exactly one writer', () => {
    expect(ROUTE.match(/recordMcqAsked\(memoryHistory/g) ?? []).toHaveLength(1)
  })

  it('a probe is still spent on the GRADE, not on being shown', () => {
    expect(ROUTE).toMatch(/if \(pendingMcqHoisted\?\.question && mcqGradeHoisted\) \{/)
  })

  it('the pending question is still lesson-scoped', () => {
    expect(ROUTE).toMatch(/lessonKeyThisTurnHoisted/)
  })
})

describe('8 · Phase F assetId provenance is intact', () => {
  it('probeToMcq still carries the authored identity forward', () => {
    const mcq = probeToMcq({ stem: D1_STEM, choices: D1_CHOICES, assetId: 'abc-123' })
    expect(mcq?.assetId).toBe('abc-123')
  })

  it('and a probe without one stays anonymous', () => {
    const mcq = probeToMcq({ stem: D1_STEM, choices: D1_CHOICES })
    expect(mcq && 'assetId' in mcq).toBe(false)
  })

  it('the outcome still names the asset it scored', () => {
    expect(ROUTE).toMatch(/assetId:\s+pendingMcqHoisted\?\.assetId/)
  })
})

describe('9 · grading is byte-identical', () => {
  it('the label never reached the grader and still does not', () => {
    const mcq = probeToMcq({ stem: D1_STEM, choices: D1_CHOICES })!
    expect(mcq.question.startsWith('DIAGNOSTIC')).toBe(false)
    expect(gradeMcqAnswer('A', mcq)).toEqual({ chosenIndex: 0, correct: true })
    expect(gradeMcqAnswer('B', mcq)).toEqual({ chosenIndex: 1, correct: false })
  })

  it('the correct index still comes from the authored key alone', () => {
    expect(probeToMcq({ stem: D1_STEM, choices: D1_CHOICES })!.correctIndex).toBe(0)
  })
})

describe('10 · mastery still requires independent graded evidence', () => {
  it('the bar is untouched by this change', () => {
    const gate = REPO('src/lib/teaching/conversationState.ts')
    expect(gate).toMatch(/correctAtCheck\s*>=\s*1/)
    expect(gate).toMatch(/correctAtPractice\s*>=\s*2/)
  })

  it('and the fix removes the only way one probe could supply all three', () => {
    let h = initialTeachingHistory('phys.mech.generalized-coordinates')
    h = recordMcqAsked(h, servedKey(D1_STEM))
    // The production session answered THIS probe three times. It can now be
    // offered zero further times, so three graded answers need three probes.
    expect([D1_STEM, D1_STEM, D1_STEM].filter((s) => !excludes(h)(s))).toEqual([])
  })
})

describe('the wiring is real, not just the helper', () => {
  it('route.ts normalises the exclusion key at the gate', () => {
    expect(ROUTE).toMatch(/excludeProbeStem: history \? \(stem\) => hasAskedMcq\(history, stripAuthoringLabel\(stem\)\) : undefined/)
  })

  it('and imports stripAuthoringLabel to do it', () => {
    expect(ROUTE).toMatch(/stripAuthoringLabel/)
  })

  it('the two sides of the ledger derive their key the same way', () => {
    // Drift here is the entire defect. If either expression changes, this fails.
    expect(ROUTE).toMatch(/recordMcqAsked\(memoryHistory, pendingMcqHoisted\.question\)/)
    expect(ROUTE).toMatch(/hasAskedMcq\(history, stripAuthoringLabel\(stem\)\)/)
  })
})
