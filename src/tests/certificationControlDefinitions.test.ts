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

  it('expects FAILED_CONTENT for the two negative controls', () => {
    expect(controlByRole('english-negative').expected).toBe('FAILED_CONTENT')
    expect(controlByRole('mathematics-negative').expected).toBe('FAILED_CONTENT')
  })

  it('expects DIRTY_STATE for the duplicate/integrity control, reusing control 1 exactly', () => {
    const dup = controlByRole('duplicate-integrity')
    const positive = controlByRole('positive-physics')
    expect(dup.expected).toBe('DIRTY_STATE')
    expect(dup.conceptId).toBe(positive.conceptId)
    expect(dup.worker).toBe(positive.worker)
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
