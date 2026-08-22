/**
 * P0-B — the tutor must not describe a figure other than the one attached.
 *
 * This is NOT the phantom-reference defect. A figure IS attached, so every
 * fabrication guard correctly stays silent. The false claim is not "a figure
 * exists" — it is "the figure is a disk", when the figure is a graph.
 *
 * Measured live, Lesson 39 Angular Kinematics, on the turn AFTER the figure
 * was introduced:
 *
 *   learner  "Can you give me a diagram to visualize this?"
 *   attached (unchanged from the previous turn)
 *            {"type":"graph","title":"Angular Displacement vs Time",
 *             "xLabel":"Time (s)","yLabel":"Angular Displacement (rad)"}
 *   tutor    "Here's a diagram that shows a disk with a marked point
 *             indicating angular displacement ... an arrow from the center to
 *             a point on the rim labeled θ."
 *
 * ROOT CAUSE: a directive collision. When the learner asks to be shown
 * something the engine HOLDS the figure it already has (continuity, correct),
 * so heldTurns > 0 and the contract said "Do NOT re-introduce or re-describe
 * it" — while the learner had just asked for a picture. Both cannot be obeyed.
 * The model answered the request by describing an imaginary figure.
 *
 * `learnerAskedForAVisual` was already passed into the contract but was
 * consulted only in the NO-FIGURE branch.
 */
import { describe, it, expect } from 'vitest'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import type { VisualDecision } from '@/lib/teaching/visual/types'

/** A held GRAPH — the exact shape captured live. */
function graphDecision(heldTurns: number): VisualDecision {
  return {
    conceptId: 'phys.mech.angular-kinematics',
    conceptTitle: 'Angular Kinematics',
    graphical: true,
    excursion: false,
    purpose: 'explain',
    representation: 'graph',
    payload: { renderer: 'spec', visualSpec: { type: 'graph' } as never },
    allowed: [],
    provenance: 'generator',
    continuityReason: null,
    session: { turns: heldTurns },
    asset: {
      conceptId: 'phys.mech.angular-kinematics',
      conceptTitle: 'Angular Displacement vs Time',
      representation: 'graph',
      renderer: 'spec',
      scope: 'concept',
      provenance: 'engine-runtime-topic',
      semantics: { elements: [], text: [] },
    } as never,
  } as unknown as VisualDecision
}

describe('P0-B — a held figure answers the request it already satisfies', () => {
  it('when the learner asks to be shown something, the tutor is pointed at the REAL figure', () => {
    const block = buildVisualContractBlock(graphDecision(2), { learnerAskedForAVisual: true })
    expect(block).toMatch(/ALREADY ON THEIR SCREEN/i)
    expect(block).toMatch(/already beside this message/i)
    expect(block).toMatch(/do NOT describe a different picture/i)
    expect(block).toMatch(/do NOT invent a second figure/i)
  })

  it('and the suppression that caused the drift is lifted on exactly that turn', () => {
    const block = buildVisualContractBlock(graphDecision(2), { learnerAskedForAVisual: true })
    expect(block).not.toMatch(/Do NOT re-introduce or re-describe it/i)
  })

  it('the figure is still named as what it actually is', () => {
    // The whole point: the tutor must be able to say "graph", not "disk".
    const block = buildVisualContractBlock(graphDecision(2), { learnerAskedForAVisual: true })
    expect(block).toContain('A graph of "Angular Displacement vs Time"')
  })

  // ── NEGATIVE CONTROLS ────────────────────────────────────────────────────
  it('an ordinary held turn KEEPS the anti-repetition rule', () => {
    // The defect that rule exists for: five of six production turns
    // re-describing the same number line. It must not be weakened.
    const block = buildVisualContractBlock(graphDecision(2), { learnerAskedForAVisual: false })
    expect(block).toMatch(/ALREADY INTRODUCED/)
    expect(block).toMatch(/Do NOT re-introduce or re-describe it/i)
    expect(block).not.toMatch(/ALREADY ON THEIR SCREEN/i)
  })

  it('omitting the flag entirely behaves exactly as before', () => {
    const withFlagOff = buildVisualContractBlock(graphDecision(2), { learnerAskedForAVisual: false })
    const withNoOpts = buildVisualContractBlock(graphDecision(2))
    expect(withNoOpts).toBe(withFlagOff)
    expect(withNoOpts).toMatch(/ALREADY INTRODUCED/)
  })

  it('the FIRST turn a figure appears is untouched by either branch', () => {
    const block = buildVisualContractBlock(graphDecision(0), { learnerAskedForAVisual: true })
    expect(block).not.toMatch(/ALREADY INTRODUCED/)
    expect(block).not.toMatch(/ALREADY ON THEIR SCREEN/i)
    // It still introduces the real figure.
    expect(block).toContain('A graph of "Angular Displacement vs Time"')
  })

  it('NO FIGURE + a request still gets the honest no-figure answer, not this', () => {
    const none = { graphical: false, asset: null } as unknown as VisualDecision
    const block = buildVisualContractBlock(none, { learnerAskedForAVisual: true })
    expect(block).toMatch(/NO FIGURE IS ATTACHED/)
    expect(block).toMatch(/THE LEARNER ASKED TO BE SHOWN SOMETHING/)
    expect(block).not.toMatch(/ALREADY ON THEIR SCREEN/i)
  })

  it('mental-imagery prose is still explicitly allowed when nothing is attached', () => {
    const none = { graphical: false, asset: null } as unknown as VisualDecision
    const block = buildVisualContractBlock(none, {})
    expect(block).toMatch(/ordinary spatial language to build a mental picture/i)
  })
})
