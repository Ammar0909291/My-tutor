/**
 * The six Phase 0 control definitions — no approved set existed anywhere in
 * this repository before scripts/certification/controls.ts, so this pins
 * its shape: one row per required role, valid worker/subject assignment,
 * and every concept id genuinely present in the live knowledge graph it
 * claims to belong to (so a control can never target a slug that does not
 * exist).
 */
import { describe, expect, it } from 'vitest'
import { CONTROLS, controlByRole, type ControlRole } from '../../scripts/certification/controls'
import { getAllNodes, getKnowledgeGraph } from '../lib/curriculum/knowledgeGraph'

const REQUIRED_ROLES: ControlRole[] = [
  'positive-physics', 'positive-chemistry', 'physics-visual',
  'english-negative', 'mathematics-negative', 'duplicate-integrity',
]

describe('Phase 0 control definitions', () => {
  it('defines exactly the six required roles, no more, no fewer', () => {
    expect(CONTROLS.map((c) => c.role).sort()).toEqual([...REQUIRED_ROLES].sort())
  })

  it('every role is resolvable via controlByRole', () => {
    for (const role of REQUIRED_ROLES) expect(controlByRole(role).role).toBe(role)
  })

  it('assigns the worker mapping the protocol specifies', () => {
    expect(controlByRole('positive-physics').worker).toBe('w1')
    expect(controlByRole('positive-chemistry').worker).toBe('w2')
    expect(controlByRole('physics-visual').worker).toBe('w3')
    expect(controlByRole('english-negative').worker).toBe('w4')
    expect(controlByRole('mathematics-negative').worker).toBe('w4')
    expect(controlByRole('duplicate-integrity').worker).toBe('w1')
  })

  it('expects CERTIFIED for the two deterministic positive controls', () => {
    // physics-visual moved out of this group 2026-09-04 — see the dedicated
    // test below for why its expectation is UNMEASURED, not CERTIFIED.
    for (const role of ['positive-physics', 'positive-chemistry'] as const) {
      expect(controlByRole(role).expected).toBe('CERTIFIED')
    }
  })

  it('expects UNMEASURED for physics-visual — non-deterministic by architecture, not by contract shortfall', () => {
    // Corrected 2026-09-04 (remediation of run phase0-1788491363395, which
    // returned UNMEASURED-no-authored-match on kinetic-energy despite an
    // earlier run certifying the SAME concept cleanly). Root cause: this
    // concept's ACTIVE HIGH-band probe set mixes genuine closed-choice MCQs
    // with a `choices: null` short-answer formative probe; E1's design lets
    // a probe attach at GUIDE (below CHECK/PRACTICE), and when the model is
    // handed the short-answer one there and still emits a structured MCQ
    // tag around it, the harness correctly cannot verify it (it can only
    // verify closed-choice MCQs — see answerSource.ts). Checked, not
    // assumed, that a concept swap doesn't fix this: exactly one other
    // physics concept carries an ACTIVE VISUAL asset
    // (phys.meas.unit-conversion) and it has the identical short-answer +
    // closed-choice mix. CERTIFIED remains genuinely achievable (it has
    // happened) but nothing the v1 asset contract promises guarantees it.
    expect(controlByRole('physics-visual').expected).toBe('UNMEASURED')
  })

  it('expects UNMEASURED for the two negative controls', () => {
    // Corrected 2026-09-03 (remediation of run phase0-1788464620155): a
    // below-contract concept forces the model to improvise a fully-formed
    // structured MCQ tag, which resolveAnswer() correctly cannot verify —
    // certify.ts breaks with UNMEASURED-no-authored-match before
    // D2-ungradeable (bare prose, no MCQ tag) can ever fire. FAILED_CONTENT
    // was the wrong prediction, not the instrument.
    expect(controlByRole('english-negative').expected).toBe('UNMEASURED')
    expect(controlByRole('mathematics-negative').expected).toBe('UNMEASURED')
  })

  it('expects CERTIFIED for duplicate-integrity — a regression guard, not a dirty-state trigger', () => {
    // REDESIGNED 2026-09-04, after the session-cleanup fix (c12b6237) was
    // proven in production: this control used to expect DIRTY_STATE,
    // assuming W1 reusing the same (worker, subject) pair right after
    // positive-physics would hit a still-ACTIVE session. It does not
    // anymore — run phase0-1788491363395 showed W1's two sessions that run
    // carry completely different ids, both cleanly closed. detectDirtyState
    // itself was confirmed to read only the served session's own turn-1
    // signals, never topic_progress/lesson_attempts — it was never actually
    // catching this concept's lifetime history, only the session leak,
    // which is fixed. Nothing about detectDirtyState changed or weakened;
    // the control's old premise was simply wrong. It keeps targeting
    // phys.mech.newtons-first-law on w1, immediately after positive-physics
    // — the exact shape that exposed the original leak — so a CERTIFIED
    // result here is now the healthy expectation, and DIRTY_STATE
    // reappearing is the regression alarm.
    const dup = controlByRole('duplicate-integrity')
    expect(dup.expected).toBe('CERTIFIED')
    expect(dup.conceptId).toBe('phys.mech.newtons-first-law')
    expect(dup.worker).toBe('w1')
  })

  it('every concept id genuinely exists in its claimed subject\'s live knowledge graph', () => {
    for (const control of CONTROLS) {
      const graph = getKnowledgeGraph(control.subjectSlug)
      expect(graph, `${control.subjectSlug} has no knowledge graph`).toBeTruthy()
      if (!graph) continue
      const ids = new Set(getAllNodes(graph).map((n) => n.id))
      expect(ids.has(control.conceptId), `${control.conceptId} not found in ${control.subjectSlug} KG`).toBe(true)
    }
  })

  it('carries a non-empty, evidence-shaped rationale for every control — never "it was easy"', () => {
    for (const control of CONTROLS) {
      expect(control.rationale.length).toBeGreaterThan(80)
      expect(control.rationale.toLowerCase()).not.toMatch(/because it('s| is) easy/)
    }
  })
})
