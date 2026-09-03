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

  it('expects CERTIFIED for the three positive controls', () => {
    for (const role of ['positive-physics', 'positive-chemistry', 'physics-visual'] as const) {
      expect(controlByRole(role).expected).toBe('CERTIFIED')
    }
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

  it('expects DIRTY_STATE for the duplicate/integrity control, on a concept W1 genuinely has history on', () => {
    // duplicate-integrity deliberately targets phys.mech.newtons-first-law,
    // NOT whatever positive-physics currently uses — positive-physics moved
    // to phys.mech.angular-momentum (2026-09-03 remediation) specifically
    // because W1 had contaminating prior history on newtons-first-law; that
    // same history is exactly what this control exists to prove
    // detectDirtyState catches, so it stays on the known-dirty concept.
    const dup = controlByRole('duplicate-integrity')
    expect(dup.expected).toBe('DIRTY_STATE')
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
