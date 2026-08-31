/**
 * PHASE 3 — GATE PROBE SELECTION (MatchOptions.requireMcq).
 *
 * ── THE MEASURED DEFECT ─────────────────────────────────────────────────────
 * Production, 2026-08-17: across 28 mastery-gate evaluations, 7 selected the
 * same asset — `phys.mech.displacement:short_answer:en:high:proficient`, a
 * short_answer probe with `choices: null`. `probeToMcq` refused it every time
 * and the gate spent the turn on the model. Selection had no way to know the
 * caller required an MCQ, so a probe the next mandatory layer must reject
 * could win on score.
 *
 * The invariant this pins:
 *   WHEN the gate requires an MCQ, findBestProbe returns a probe that
 *   probeToMcq accepts, or it returns nothing.
 *
 * ── WHY THESE TESTS DO NOT BOOT PRISMA ──────────────────────────────────────
 * findBestProbe's own query needs a database. What actually changed is a pure
 * predicate over candidate rows plus one call-site flag, so the filter is
 * tested directly against the REAL probeToMcq (never a copy — selection and
 * conversion agreeing is the entire point), and the wiring findBestProbe and
 * route.ts own is asserted against the real source, as the existing
 * route-wiring tests do.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { probeToMcq } from '@/lib/teaching/gateAssessment'
import { gradeMcqAnswer } from '@/lib/teaching/mcq'

const REPO = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')
const SELECTOR = REPO('src/lib/teaching/assets/teachingActionRepository.ts')
const MATCHER = REPO('src/lib/teaching/assets/matcher.ts')
const ROUTE = REPO('src/app/api/learn/chat/route.ts')

/** The real production defect, shaped exactly as the row that caused it. */
const SHORT_ANSWER_NO_CHOICES = {
  stem: 'TRANSFER: A train travels 120 km east, then 80 km west. Find its displacement and its distance.',
  choices: null,
}

const VALID_MCQ = {
  stem: 'A runner jogs 400 m around a circular track and returns to the start. What is the displacement?',
  choices: [
    { text: '0 m — the runner returns to the exact starting position', isCorrect: true },
    { text: '400 m — that is how far the runner ran', isCorrect: false },
  ],
}

/** The predicate findBestProbe applies when requireMcq is set. */
const gateCompatible = (p: { stem: string; choices: unknown }) =>
  probeToMcq({
    stem: p.stem,
    choices: (p.choices as Array<{ text: string; isCorrect: boolean }> | null) ?? null,
  }) !== null

describe('1-2 — an unconvertible probe can never win a gate selection', () => {
  it('the exact production offender is rejected by the gate predicate', () => {
    expect(gateCompatible(SHORT_ANSWER_NO_CHOICES)).toBe(false)
  })

  it('a valid MCQ beats it — it is the only survivor of the filter', () => {
    const survivors = [SHORT_ANSWER_NO_CHOICES, VALID_MCQ].filter(gateCompatible)
    expect(survivors).toHaveLength(1)
    expect(survivors[0].stem).toBe(VALID_MCQ.stem)
  })

  it('rejects every other shape probeToMcq refuses, not just missing choices', () => {
    // A familyKind allowlist would have missed all of these. Using the real
    // converter as the predicate means selection cannot drift from conversion.
    const bad = [
      { stem: 'q', choices: [{ text: 'a', isCorrect: true }, { text: 'b', isCorrect: true }] },   // two correct
      { stem: 'q', choices: [{ text: 'a', isCorrect: false }, { text: 'b', isCorrect: false }] }, // none correct
      { stem: 'q', choices: [{ text: 'a', isCorrect: true }] },                                   // one option
      { stem: 'q', choices: [{ text: 'same', isCorrect: true }, { text: 'same', isCorrect: false }] }, // duplicates
      { stem: '', choices: VALID_MCQ.choices },                                                   // no stem
    ]
    for (const b of bad) expect(gateCompatible(b)).toBe(false)
  })
})

describe('3 — short-answer probes remain selectable where they are legitimate', () => {
  it('the filter is OFF unless the caller asks for it', () => {
    // Guards the one way this fix could do damage: assembleLesson accepts a
    // non-MCQ probe and renders it as a prose follow-up, so a global MCQ-only
    // retrieval would silently delete short-answer practice from that path.
    expect(SELECTOR).toContain('if (!options.requireMcq) return true')
  })

  it('assembleLesson still has its prose path for an unconvertible probe', () => {
    expect(SELECTOR).toContain('if (!probeMcq) text += formatProbeAsFollowUp(probe)')
  })

  it('assembleLesson does NOT request requireMcq', () => {
    // The only requireMcq in production code is the gate call site.
    expect((ROUTE.match(/requireMcq: true/g) ?? []).length).toBe(1)
    expect(SELECTOR).not.toContain('requireMcq: true')
  })
})

describe('4 — no compatible probe means null, not a bad probe', () => {
  it('a concept whose only probes are unconvertible yields no survivors', () => {
    const onlyBad = [SHORT_ANSWER_NO_CHOICES, { stem: 'q2', choices: null }]
    expect(onlyBad.filter(gateCompatible)).toHaveLength(0)
  })

  it('the gate already falls back to the model when selection returns nothing', () => {
    // `converted` is null-checked before gateMcqHoisted is ever set, so an
    // empty selection leaves the turn on the existing LLM path untouched.
    // E1 added ONE conjunct: a probe below the mastery gates is refused when
    // spending it would leave fewer than three behind (mayAttachProbeBelowGuide).
    // The guarantee this case exists for is unchanged and is what is asserted —
    // selection returning nothing still yields `null` and hands the turn to the
    // model, never a half-built or unconvertible question.
    expect(ROUTE).toContain('const converted = probe && !belowGuideBlocked ? probeToMcq(probe) : null')
    expect(ROUTE).toContain('if (converted) {')
  })
})

describe('5-6 — existing selection behaviour is untouched', () => {
  it('the filter runs BEFORE ranking, so the best CONVERTIBLE probe wins', () => {
    // Filtering after pickBest would still lose the turn whenever an
    // unconvertible probe outscored a usable one — which is what production did.
    const filterAt = SELECTOR.indexOf('if (!options.requireMcq) return true')
    const rankAt = SELECTOR.indexOf('const best = pickBest(state, rows, options)')
    expect(filterAt).toBeGreaterThan(-1)
    expect(rankAt).toBeGreaterThan(filterAt)
  })

  it('ranking, difficulty and grade-band fallback are unchanged', () => {
    expect(SELECTOR).toContain('const best = pickBest(state, rows, options)')
    expect(SELECTOR).toContain('difficulty: c.probeAsset!.difficulty')
    // The fallback reuses the SAME filtered rows, so it cannot reintroduce an
    // unconvertible probe by the back door.
    expect(SELECTOR).toContain('const fallback = pickBest(state, rows, options, 0)')
  })

  it('the already-asked exclusion still applies, and still before ranking', () => {
    const excludeAt = SELECTOR.indexOf('options.excludeProbeStem?.(row.probeAsset!.stem)')
    const rankAt = SELECTOR.indexOf('const best = pickBest(state, rows, options)')
    expect(excludeAt).toBeGreaterThan(-1)
    expect(rankAt).toBeGreaterThan(excludeAt)
  })

  it('the learner admission boundary (author scaffolding) still applies', () => {
    expect(SELECTOR).toContain('findAuthorScaffolding(text)')
  })

  it('requireMcq is documented as probe-retrieval-only on MatchOptions', () => {
    expect(MATCHER).toContain('requireMcq?: boolean')
  })
})

describe('7-8 — conversion and grading contracts are unchanged', () => {
  it('probeToMcq behaves exactly as before for a valid probe', () => {
    const mcq = probeToMcq(VALID_MCQ)!
    expect(mcq.question).toBe(VALID_MCQ.stem)
    expect(mcq.options).toHaveLength(2)
    expect(mcq.correctIndex).toBe(0)
  })

  it('server grading against the authored key is unchanged', () => {
    const mcq = probeToMcq(VALID_MCQ)!
    expect(gradeMcqAnswer('A', mcq).correct).toBe(true)
    expect(gradeMcqAnswer('B', mcq).correct).toBe(false)
    expect(gradeMcqAnswer('no idea', mcq).correct).toBeNull()
  })

  it('selection reuses the real converter rather than redefining gradeability', () => {
    expect(SELECTOR).toContain("import { probeToMcq } from '../gateAssessment'")
    // No parallel familyKind allowlist introduced by this phase.
    expect(SELECTOR).not.toContain("familyKind === 'mcq'")
  })
})
