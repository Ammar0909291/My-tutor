/**
 * PHASE 2 — DETERMINISTIC GATE-ASSESSMENT RENDERER, regression suite.
 *
 * The success condition is narrow and worth restating, because it is what
 * these tests are actually checking: SAME educational decision, SAME
 * assessment, SAME grading, SAME evidence, SAME mastery semantics, FEWER LLM
 * calls. Only the sentence above the question may change.
 *
 * The probe payload is therefore tested through the REAL `probeToMcq` and the
 * REAL `gradeMcqAnswer` — not a copy — because "same question / same choices /
 * same order / same correctIndex / same grading" is only meaningful if it is
 * the production converter and the production grader being asserted.
 *
 * route.ts itself needs auth, a database and a live model and cannot be booted
 * here, so the wiring it owns (which branch serves, what is skipped) is
 * asserted against the real route source — the same approach the existing
 * signal/evidence route-wiring tests take.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { renderGateLeadIn } from '@/lib/teaching/gateAssessmentRenderer'
import { probeToMcq } from '@/lib/teaching/gateAssessment'
import { gradeMcqAnswer } from '@/lib/teaching/mcq'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

/** A realistic authored probe, shaped exactly as the corpus stores one. */
const PROBE = {
  stem: 'A runner jogs 400 m around a circular track and ends up back at the starting line. What is the runner’s displacement?',
  choices: [
    { text: '0 m — the runner returns to the exact starting position', isCorrect: true },
    { text: '400 m — that is how far the runner ran', isCorrect: false },
  ],
}

const baseInput = {
  question: PROBE.stem,
  conceptTitle: 'Displacement',
  teachingLanguage: 'en',
  hasPendingAnswerToReactTo: false,
  hasAttachedFigure: false,
}

describe('the assessment itself is untouched (1-5)', () => {
  it('the deterministic path serves the SAME probe payload the model path would', () => {
    // The renderer never sees or returns the payload — it cannot alter it by
    // construction. This pins that the payload the route attaches is produced
    // by probeToMcq alone, identically on both paths.
    const mcq = probeToMcq(PROBE)
    expect(mcq).not.toBeNull()
    expect(mcq!.question).toBe(PROBE.stem)
    expect(mcq!.options).toEqual([
      '0 m — the runner returns to the exact starting position',
      '400 m — that is how far the runner ran',
    ])
    expect(mcq!.correctIndex).toBe(0)
  })

  it('choice ORDER is the authored order, not re-sorted', () => {
    const mcq = probeToMcq(PROBE)!
    expect(mcq.options[0]).toContain('0 m')
    expect(mcq.options[1]).toContain('400 m')
  })

  it('correctIndex follows the authored key when the correct option is not first', () => {
    const reversed = {
      stem: PROBE.stem,
      choices: [...PROBE.choices].reverse(),
    }
    expect(probeToMcq(reversed)!.correctIndex).toBe(1)
  })

  it('the lead-in never contains the question or the options', () => {
    // Restating them reads as a stutter — the question renders as buttons
    // directly beneath the sentence.
    const lead = renderGateLeadIn(baseInput)!
    expect(lead).not.toContain(PROBE.stem)
    for (const o of PROBE.choices) expect(lead).not.toContain(o.text)
  })

  it('an ungradeable probe is refused BEFORE any of this runs', () => {
    // Two correct answers, no correct answer, and a five-option list are all
    // refused by the converter, so the deterministic path can never be handed
    // an unsafe assessment.
    expect(probeToMcq({ stem: 'q', choices: [{ text: 'a', isCorrect: true }, { text: 'b', isCorrect: true }] })).toBeNull()
    expect(probeToMcq({ stem: 'q', choices: [{ text: 'a', isCorrect: false }, { text: 'b', isCorrect: false }] })).toBeNull()
    expect(probeToMcq({ stem: 'q', choices: null })).toBeNull()
  })
})

describe('server grading is unchanged (6)', () => {
  it('grades against the authored key exactly as on the model path', () => {
    const mcq = probeToMcq(PROBE)!
    expect(gradeMcqAnswer('A', mcq).correct).toBe(true)
    expect(gradeMcqAnswer('B', mcq).correct).toBe(false)
    // An unparseable reply is ungraded, not wrong — unchanged by this phase.
    expect(gradeMcqAnswer('I have no idea', mcq).correct).toBeNull()
  })

  it('the renderer has no access to grading at all', () => {
    // Structural, not behavioural: the module must not touch the key or the
    // grader, so "the renderer changed grading" cannot become true in a later
    // edit. Comments are stripped first — the header legitimately DISCUSSES
    // correctIndex and grading to explain what it leaves alone, and an
    // assertion that forbids describing the contract would be a bad test.
    const src = readFileSync(join(process.cwd(), 'src/lib/teaching/gateAssessmentRenderer.ts'), 'utf8')
    const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')
    for (const forbidden of ['gradeMcqAnswer', 'correctIndex', 'isCorrect', 'options']) {
      expect(code).not.toContain(forbidden)
    }
  })
})

describe('the renderer REFUSES rather than degrading an assessment (10)', () => {
  it('refuses when an answer is still waiting to be reacted to', () => {
    // The biggest teaching risk in this phase. A lead-in alone would drop the
    // reaction the learner earned by answering.
    expect(renderGateLeadIn({ ...baseInput, hasPendingAnswerToReactTo: true })).toBeNull()
  })

  it('refuses when a figure is attached to the turn', () => {
    expect(renderGateLeadIn({ ...baseInput, hasAttachedFigure: true })).toBeNull()
  })

  it('refuses in every non-English teaching language', () => {
    for (const lang of ['hi', 'ru', 'HI', '']) {
      expect(renderGateLeadIn({ ...baseInput, teachingLanguage: lang })).toBeNull()
    }
  })

  it('refuses on an empty question', () => {
    expect(renderGateLeadIn({ ...baseInput, question: '   ' })).toBeNull()
  })

  it('null means "the model keeps this turn" — the route branch requires text', () => {
    // The serve branch is conditional on the rendered text being non-null, so a
    // refusal cannot produce an empty assessment turn.
    expect(ROUTE).toContain('gateLeadInHoisted && gateMcqHoisted')
  })
})

describe('lead-in quality (no robotic repetition)', () => {
  it('names the concept when the KG has a usable title', () => {
    expect(renderGateLeadIn(baseInput)!).toContain('Displacement')
  })

  it('two different questions in a lesson do not open the same way', () => {
    const a = renderGateLeadIn(baseInput)!
    const b = renderGateLeadIn({ ...baseInput, question: 'Which quantity is a vector: distance or displacement?' })!
    expect(a).not.toBe(b)
  })

  it('the SAME probe always renders identically (a re-read must not change)', () => {
    expect(renderGateLeadIn(baseInput)).toBe(renderGateLeadIn(baseInput))
  })

  it('falls back to a neutral frame rather than printing a concept id', () => {
    const lead = renderGateLeadIn({ ...baseInput, conceptTitle: 'phys.mech.displacement' })!
    expect(lead).not.toContain('phys.mech')
    expect(lead.length).toBeGreaterThan(10)
  })

  it('every frame is a real sentence', () => {
    const seen = new Set<string>()
    for (let i = 0; i < 40; i++) {
      const lead = renderGateLeadIn({ ...baseInput, question: `question number ${i}?` })!
      expect(lead.trim().length).toBeGreaterThan(15)
      expect(lead.trim().endsWith('.')).toBe(true)
      seen.add(lead)
    }
    expect(seen.size).toBeGreaterThan(1)
  })
})

describe('route wiring — fewer LLM calls, nothing else changed (7,8,9,11,12)', () => {
  it('the deterministic branch makes NO provider call', () => {
    // Three routeAI() sites is the pre-Phase-2 count; this phase adds none.
    expect((ROUTE.match(/await routeAI\(/g) ?? []).length).toBe(3)
    expect(ROUTE).toContain("provider = 'gate'")
  })

  it('a gate-rendered turn skips output verification, whose remedy calls a provider', () => {
    // Without this the verifier's `rerender` would spend the very call this
    // path exists to save, and could overwrite the authored framing.
    expect(ROUTE).toContain("const servedByGateRenderer = provider === 'gate'")
    // Phase 4 added lesson-complete to the same exclusion; the gate term must
    // still be present, which is what this guards.
    expect(ROUTE).toContain('servedFromMemory || servedByGateRenderer')
    expect(ROUTE).toContain('if (!servedDeterministically) {')
  })

  it('the fixed template is never captured as a DRAFT explanation asset', () => {
    // A gate turn always has a memoryState, so without the guard the six-word
    // template would be decomposed and could be approved into the ACTIVE slot
    // and served to every matching learner forever.
    expect(ROUTE).toContain("if (memoryState && !assembled && provider !== 'gate') {")
  })

  it('a gate turn is not counted as an LLM turn in the brain metrics', () => {
    expect(ROUTE).toContain("const llmUsed = provider !== 'memory' && provider !== 'gate'")
  })

  it('the MCQ attach line is shared with the model path (same evidence + ladder)', () => {
    // Evidence, mastery counters and the ladder transition all hang off the
    // attached MCQ and the server grade. Both paths reach this one line, so
    // there is no second evidence route to diverge.
    expect(ROUTE).toContain('mcqHoisted = gateMcqHoisted ?? mcqParse.mcq')
  })

  it('the existing LLM fallback branch still exists after the new one', () => {
    expect(ROUTE).toContain('} else if (!serveLessonComplete) {')
    expect(ROUTE.indexOf('gateLeadInHoisted && gateMcqHoisted'))
      .toBeLessThan(ROUTE.lastIndexOf('} else if (!serveLessonComplete) {'))
  })

  it('gate eligibility (recovery / first lesson / excursion exclusions) is unchanged', () => {
    for (const guard of ['!recoveryKeyHoisted', '!firstLessonActiveHoisted', '!excursionActiveHoisted']) {
      expect(ROUTE).toContain(guard)
    }
  })
})

describe('provenance is not misreported to the learner', () => {
  it("a server-rendered turn never mounts the 'AI Generated' badge", () => {
    // Phase 4 replaced the provider-string rule with an execution-based one:
    // the badge now derives from llmCallCount, and a gate turn spends 0 calls,
    // so it still lands on MemoryBadge. The provider fallback survives for
    // legacy rows written before the column existed.
    const screen = readFileSync(join(process.cwd(), 'src/components/learn/LessonScreen.tsx'), 'utf8')
    expect(screen).toContain('const spent = msg.llmCallCount')
    expect(screen).toContain("if (msg.provider === 'memory' || msg.provider === 'gate') return <MemoryBadge />")
  })
})
