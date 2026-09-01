/**
 * THE PROMPT MUST NOT CARRY TWO NAMES FOR ONE FIGURE.
 *
 * MEASURED in production on a Mirrors lesson (phys.opt.mirrors):
 *
 *   [cue] requiredVisualization: {"value":"force_diagram"}
 *   [visual-v2] representation: ray_optics        <- what was actually drawn
 *
 * The BRAIN DECISION block printed the first of those verbatim as
 * `- Visual: force_diagram`, alongside a VISUAL CONTRACT block that correctly
 * described a ray-optics figure of "Mirrors". Two names, one figure, one
 * prompt — and the one the brain block gave was false.
 *
 * It is not a one-off. The identifier is `visualRegistry`'s `primary` field,
 * which for whole families of concepts names a renderer that is not what gets
 * drawn: parsing the registry, 12 of the 29 physics concepts that carry a
 * scene generator have a `primary` sharing no word with it — five
 * orbital-mechanics concepts and five optics concepts, all labelled
 * `force_diagram`.
 *
 * The registry's values are curated content and are deliberately NOT edited
 * here. They are simply no longer quoted at the model as a description of the
 * picture. The VISUAL CONTRACT block, which reads the admitted asset, is the
 * single owner — and the brain block's own directive already defers to it.
 */
import { describe, it, expect } from 'vitest'
import { buildBrainExecutionBlock } from '@/lib/understanding/execution'
import { planDispatch, type DispatchPlan } from '@/lib/understanding/dispatcher'
import type { TeachingDecision } from '@/lib/understanding/decisionEngine'

function decisionOf(
  decision: TeachingDecision['decision'],
  parameters: Record<string, unknown>,
): TeachingDecision {
  return {
    version: 1,
    computedAt: new Date().toISOString(),
    shadow: true,
    decision,
    ruleId: 'D6-VISUAL-ON-REQUEST',
    rationale: ['test'],
    inputs: [],
    parameters,
  } as unknown as TeachingDecision
}

function blockFor(d: TeachingDecision): string {
  const plan: DispatchPlan = planDispatch(d, { assembledAvailable: false })
  return buildBrainExecutionBlock(plan, d)
}

describe('the brain execution block never names the figure', () => {
  it('the production case: a Mirrors lesson is not told "force_diagram"', () => {
    const block = blockFor(decisionOf('VISUALIZATION', {
      visualType: 'force_diagram',
      conceptId: 'phys.opt.mirrors',
    }))
    expect(block).not.toContain('force_diagram')
    expect(block).not.toMatch(/- Visual:/)
  })

  it('no renderer identifier of any kind reaches the prompt', () => {
    for (const visualType of ['force_diagram', 'ray_optics', 'coordinate_plane', 'circuit_diagram']) {
      const block = blockFor(decisionOf('VISUALIZATION', { visualType }))
      expect(block).not.toContain(visualType)
    }
  })

  it('but the VISUALIZATION directive itself survives — the block still directs the turn', () => {
    const block = blockFor(decisionOf('VISUALIZATION', { visualType: 'force_diagram' }))
    expect(block).toContain('BRAIN DECISION')
    expect(block).toContain('VISUALIZATION')
    // The directive that hands ownership to the visual block, verbatim.
    expect(block).toContain('the visual block above specifies')
  })

  it('the other parameter lines are untouched — this removed one line, not a feature', () => {
    const prereq = blockFor(decisionOf('REVIEW_PREREQUISITE', { prerequisiteId: 'phys.mech.newtons-laws' }))
    expect(prereq).toContain('- Prerequisite: phys.mech.newtons-laws')

    const misconception = blockFor(decisionOf('DETECT_MISCONCEPTION', { misconceptionLabel: 'heavier falls faster' }))
    expect(misconception).toContain('- Misconception: "heavier falls faster"')
  })
})
