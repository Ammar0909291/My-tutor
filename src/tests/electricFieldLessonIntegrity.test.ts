import { describe, it, expect } from 'vitest'
import { gradeMcqAnswer, resolveMcqChoice } from '@/lib/teaching/mcq'
import { masteryVerifiedStrict } from '@/lib/teaching/masteryGate'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { lookupConceptVisual } from '@/lib/teaching/visualRegistry'
import { stageView } from '@/lib/teaching/visual/sceneStage'
import { fitSceneToFrame, frameReport, MIN_FRAME_FILL } from '@/lib/teaching/visual/layout'
import { ROLE } from '@/lib/teaching/sceneGenerators/visualDesign'
import { PHYSICS_DEPTH_PROBES } from '@/lib/teaching/assets/physicsDepthSeedAssets'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

/**
 * "Electric Field and Field Lines" — the lesson reviewed on 2026-09-06.
 *
 * The report raised eight findings (L1-L8). This file pins what was VERIFIED,
 * because five of them turned out to be correct behaviour and the value of the
 * investigation is only kept if the behaviour cannot silently regress.
 *
 * NOTHING here asserts a fix that was not made. Where a finding is a genuine
 * open gap it is recorded in the report, not faked as a passing test.
 */

const EF = 'phys.em.electric-field'

// The authored ADVANCED probe, read from the corpus rather than restated, so
// this file cannot drift from the content it claims to verify.
const MIDPOINT = PHYSICS_DEPTH_PROBES.find(
  (p) => p.conceptId === EF && p.stem.includes('midpoint'),
)!
const CORRECT = MIDPOINT.choices.find((c) => c.isCorrect)!.text

// ── L2 · THE PHYSICS ────────────────────────────────────────────────────────
describe('L2 — the authored problem, and the learner answer, are correct', () => {
  it('the probe exists and states the two-charge midpoint problem', () => {
    expect(MIDPOINT).toBeDefined()
    expect(MIDPOINT.stem).toContain('+4.0 nC')
    expect(MIDPOINT.stem).toContain('−4.0 nC')
    expect(MIDPOINT.stem).toContain('x = 0.10 m')
  })

  it('7.2 × 10³ N/C is the physically correct answer — recomputed, not trusted', () => {
    // Superposition at the midpoint. Each charge is 0.10 m away.
    //   E_single = k|q|/r² = 8.99e9 × 4.0e-9 / 0.10² = 3596 N/C
    // The +q field points AWAY from + (towards −); the −q field points TOWARDS
    // − (the same direction). They therefore ADD, not cancel.
    const k = 8.99e9, q = 4.0e-9, r = 0.10
    const single = (k * q) / (r * r)
    const net = 2 * single
    expect(single).toBeCloseTo(3596, 0)
    expect(net).toBeCloseTo(7192, 0)
    // The authored key, to the significant figures it is stated in.
    expect(Math.round(net / 100) / 10).toBeCloseTo(7.2, 5)
    expect(MIDPOINT.correctValue).toBe('7.2e3 N/C from + to -')
  })

  it('the learner sentence IS the authored correct option, verbatim', () => {
    expect(CORRECT).toContain('7.2 × 10³ N/C')
    expect(CORRECT).toContain('both contributions point the same way, so they ADD')
  })

  it('the "only the nearer charge" distractor is the single-charge value', () => {
    const single = (8.99e9 * 4.0e-9) / 0.01
    expect(Math.round(single / 100) / 10).toBeCloseTo(3.6, 5)
    expect(MIDPOINT.choices.some((c) => !c.isCorrect && c.text.includes('3.6 × 10³'))).toBe(true)
  })

  it('exactly one option is keyed correct', () => {
    expect(MIDPOINT.choices.filter((c) => c.isCorrect)).toHaveLength(1)
  })
})

// ── L5 · GRADING AND MASTERY ────────────────────────────────────────────────
describe('L5 — completion was earned, and prose alone cannot earn it', () => {
  const MCQ = {
    question: MIDPOINT.stem,
    options: MIDPOINT.choices.map((c) => c.text),
    correctIndex: MIDPOINT.choices.findIndex((c) => c.isCorrect),
    assetId: 'authored-ef-advanced',
  } as never

  it('the learner tap resolves to the keyed option and grades CORRECT', () => {
    expect(resolveMcqChoice(CORRECT, MCQ)).toBe(0)
    expect(gradeMcqAnswer(CORRECT, MCQ)).toEqual({ chosenIndex: 0, correct: true })
  })

  it('every distractor grades WRONG — including the plausible "they cancel"', () => {
    for (const c of MIDPOINT.choices.filter((x) => !x.isCorrect)) {
      expect(gradeMcqAnswer(c.text, MCQ).correct, `graded true: ${c.text}`).toBe(false)
    }
  })

  it('prose that maps to no option is UNGRADED — it banks nothing', () => {
    expect(gradeMcqAnswer('i think it adds up', MCQ)).toEqual({ chosenIndex: null, correct: null })
  })

  it('mastery needs CHECK ≥ 1 AND PRACTICE ≥ 2 — no other combination passes', () => {
    const m = (checkCorrect: number, practiceCorrect: number) =>
      masteryVerifiedStrict({ correctAtCheck: checkCorrect, correctAtPractice: practiceCorrect } as never)
    expect(m(0, 0)).toBe(false)
    expect(m(1, 0)).toBe(false)
    expect(m(1, 1)).toBe(false)
    expect(m(0, 3)).toBe(false)   // practice alone can never close a concept
    expect(m(1, 2)).toBe(true)
  })
})

// ── L1 · THE FIGURE MATCHES THE CONTEXT IT CLAIMS ───────────────────────────
describe('L1 — the visual is bound to the taught concept, and holds across a tap', () => {
  const OPTIONS = MIDPOINT.choices.map((c) => c.text)
  const SESSION = {
    conceptId: EF, representation: 'labelled_figure', renderer: 'scene_spec',
    returnToConceptId: null, turns: 1,
  } as never

  it('the concept is deliberately UNMAPPED in the curated registry', () => {
    // Its own comment: no visual type models a field-lines diagram, so these
    // concepts are left unmapped rather than stretched onto a circuit picture.
    // Pinned because a future blanket domain default would silently give this
    // lesson a battery-and-wire figure again.
    expect(lookupConceptVisual(EF)).toBeNull()
  })

  it('tapping an MCQ option HOLDS the figure — an answer never moves it', () => {
    const d = resolveVisual({
      message: OPTIONS[0], lessonConceptId: EF, subject: 'physics',
      activeSession: SESSION, lastAssistantAskedQuestion: true, offeredMcqOptions: OPTIONS,
    } as never)
    expect(d.continuityReason).toBe('learner-answering-not-requesting')
    expect(d.conceptId).toBe(EF)
  })

  it('an ordinary follow-up also holds it', () => {
    const d = resolveVisual({
      message: 'explain field lines again', lessonConceptId: EF, subject: 'physics',
      activeSession: SESSION, lastAssistantAskedQuestion: false,
    } as never)
    expect(d.continuityReason).toBe('continuity')
    expect(d.conceptId).toBe(EF)
  })

  it('a genuine new topic RELEASES it — continuity is not a trap', () => {
    const d = resolveVisual({
      message: 'explain photosynthesis', lessonConceptId: EF, subject: 'physics',
      activeSession: SESSION, lastAssistantAskedQuestion: false,
    } as never)
    expect(d.continuityReason).toBe('explicit-new-topic-request')
    expect(d.conceptId).toBe('bio.plant.photosynthesis')
  })

  it('the figure is concept-scoped by construction — it never claims to be the probe', () => {
    // The report asked whether the figure depicts the exact assessment problem.
    // It does not, and cannot: the visual layer is given the CONCEPT being
    // taught and has no probe input at all. A +Q/test-charge field-lines figure
    // is a faithful figure of "Electric Field and Field Lines"; the two-charge
    // midpoint problem is one PROBE about that concept. Pinned as an
    // architectural fact so a future change that starts binding figures to
    // probes has to confront this test deliberately.
    const d = resolveVisual({
      message: OPTIONS[0], lessonConceptId: EF, subject: 'physics',
      activeSession: SESSION, lastAssistantAskedQuestion: true, offeredMcqOptions: OPTIONS,
    } as never)
    expect(d.conceptId).toBe(EF)
    expect(Object.keys(d)).not.toContain('probeId')
  })
})

// ── L4 · "SHOW ALL" ─────────────────────────────────────────────────────────
describe('L4 — "Show all" reveals stages, never withheld answers', () => {
  const SPEC = {
    id: 'ef', title: 'Electric Field and Field Lines', sceneType: 'diagram',
    teachingGoal: 'g', cameraDistance: 10, ariaLabel: 'a',
    steps: [
      { narration: '1', objects: [{ type: 'label', id: 'Ql', position: [-2, 0.5, 0], text: '+Q', color: ROLE.ink }] },
      { narration: '2', objects: [{ type: 'label', id: 'law', position: [0, 1, 0], text: 'F = q₀E', color: ROLE.ink }] },
      { narration: '3', objects: [
        { type: 'label', id: 'ans', position: [0, -1, 0], text: 'E = 7.2 × 10³ N/C', color: ROLE.result },
        { type: 'label', id: 'qty', position: [0, -1.5, 0], text: 'r = 0.10 m', color: ROLE.ink },
      ] },
    ],
  } as unknown as SceneSpec
  const shown = (mode: 'explain' | 'practice' | 'assess' | 'predict') =>
    stageView(SPEC, Infinity, mode).objects.map((o) => (o as { id?: string }).id)

  it('EXPLAIN shows everything — nothing is being asked', () => {
    expect(shown('explain')).toEqual(['Ql', 'law', 'ans', 'qty'])
  })

  it('PRACTICE still withholds the result label at Show all', () => {
    expect(shown('practice')).not.toContain('ans')
    expect(stageView(SPEC, Infinity, 'practice').withheldCount).toBe(1)
  })

  it('ASSESS withholds the result AND every stated quantity at Show all', () => {
    expect(shown('assess')).toEqual(['Ql', 'law'])
    expect(stageView(SPEC, Infinity, 'assess').withheldCount).toBe(2)
  })

  it('PREDICT stops one stage short even at Show all', () => {
    expect(shown('predict')).toEqual(['Ql', 'law'])
  })
})

// ── L7 · FRAME FITTING, where it is applied ─────────────────────────────────
describe('L7 — fitSceneToFrame corrects a sparse figure without altering it', () => {
  const SPARSE = {
    id: 'ef', title: 'Electric Field and Field Lines', sceneType: 'diagram',
    teachingGoal: 'g', cameraDistance: 10, ariaLabel: 'a',
    steps: [{ narration: 'n', objects: [
      { type: 'point', id: 'Q', position: [-1, 0, 0], radius: 0.2, color: ROLE.input },
      { type: 'label', id: 'Ql', position: [-1, 0.5, 0], text: '+Q', color: ROLE.ink },
      { type: 'point', id: 'q0', position: [1, 0, 0], radius: 0.12, color: ROLE.output },
      { type: 'label', id: 'law', position: [0, -0.8, 0], text: 'F = q₀E', color: ROLE.result },
    ] }],
  } as unknown as SceneSpec

  it('a small figure in a large frame measures BELOW the fill floor', () => {
    expect(frameReport(SPARSE).fill).toBeLessThan(MIN_FRAME_FILL)
  })

  it('re-framing fixes the fill and preserves every object and every word', () => {
    const after = fitSceneToFrame(SPARSE)
    expect(after.cameraDistance).toBeLessThan(SPARSE.cameraDistance!)
    expect(after.steps[0].objects).toHaveLength(SPARSE.steps[0].objects.length)
    const text = (s: SceneSpec) => s.steps[0].objects.filter((o) => o.type === 'label').map((o) => o.text).join('|')
    expect(text(after)).toBe(text(SPARSE))
    expect(frameReport(after).fill).toBeGreaterThanOrEqual(MIN_FRAME_FILL)
  })

  it('a well-framed figure is returned UNCHANGED, by identity', () => {
    const good = fitSceneToFrame(SPARSE)
    expect(fitSceneToFrame(good)).toBe(good)
  })
})
