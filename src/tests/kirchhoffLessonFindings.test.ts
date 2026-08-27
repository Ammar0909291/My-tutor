/**
 * FOUR DEFECTS MET WHILE DOING A REAL LESSON, AS THE LEARNER.
 *
 * Production account, phys.em.kirchhoffs-laws (lesson 132 of 238), ten turns
 * from "hi, i'm ready to start" to verified mastery. Every case below is the
 * real payload from that session, not a constructed one.
 *
 *   A  the tutor could not see the numbers the figure was drawn from
 *   B  four options the learner could not tap
 *   C  "can you show me a diagram" answered with no diagram
 *   D  the lesson closed itself twice before it was finished
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { buildCircuitScene } from '@/lib/teaching/sceneGenerators/electricCircuit'
import { describeVisualPayload } from '@/lib/teaching/visual/visualSemantics'
import { withholdUngradedGateQuestion } from '@/lib/teaching/gateAssessment'
import { claimsCompletionInProse, stripCompletionClaims } from '@/lib/teaching/stanceEnforcement'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

/** The exact circuit the lesson served on turn 1. */
const REAL_CIRCUIT = {
  voltage: 12,
  connection: 'parallel',
  components: [
    { type: 'resistor', value: 10, unit: 'ohm' },
    { type: 'resistor', value: 20, unit: 'ohm' },
  ],
} as never

describe('A — the tutor was blind to the numbers the figure was drawn from', () => {
  // The generator computed 10Ω/1.2A and 20Ω/0.6A, and VALIDATED them (it even
  // asserts KCL). It then drew both resistors as identical blue dots, because
  // a `node` renders as position+radius+colour and its `properties` reach no
  // one. The learner saw two indistinguishable dots and one totals caption;
  // asked why the current splits, the tutor invented "a larger resistance
  // value like ten ohms", which is backwards. Nothing on screen could have
  // corrected it, and `fromScene` reads LABELS, so the tutor was blind too.
  const spec = buildCircuitScene(REAL_CIRCUIT)
  const labels = (spec.steps ?? []).flatMap((s) => (s.objects ?? []).filter((o) => o.type === 'label'))
  const texts = labels.map((l) => String(l.text))

  it('every branch now carries its own resistance, so the two are distinguishable', () => {
    expect(texts).toContain('R1 = 10 Ω')
    expect(texts).toContain('R2 = 20 Ω')
  })

  it('every branch now carries the current it actually carries', () => {
    expect(texts).toContain('I1 = 1.2 A')
    expect(texts).toContain('I2 = 0.6 A')
  })

  it('THE TUTOR IS TOLD THE SAME STRINGS THE LEARNER READS', () => {
    // The whole point of fixing this at the generator: a label is drawn AND is
    // read into the semantics the tutor is given, so one change serves both.
    const readable = describeVisualPayload({ renderer: 'scene', sceneSpec: spec } as never).readable
    for (const t of ['R1 = 10 Ω', 'R2 = 20 Ω', 'I1 = 1.2 A', 'I2 = 0.6 A']) {
      expect(readable).toContain(t)
    }
  })

  it('the smaller resistor genuinely carries the larger current — the fact the tutor got backwards', () => {
    const i1 = Number(/I1 = ([\d.]+)/.exec(texts.join(' '))?.[1])
    const i2 = Number(/I2 = ([\d.]+)/.exec(texts.join(' '))?.[1])
    expect(i1).toBeGreaterThan(i2)
  })

  it('the totals label is untouched, and the walkthrough still builds up', () => {
    expect(texts).toContain('R_total = 6.67 Ω, I_total = 1.8 A')
    // Values with the circuit; currents with the step that teaches the split.
    const step1 = (spec.steps?.[0]?.objects ?? []).filter((o) => o.type === 'label').map((o) => String(o.text))
    expect(step1).toContain('R1 = 10 Ω')
    expect(step1).not.toContain('I1 = 1.2 A')
  })

  it('no label lands on top of the component it names', () => {
    const nodes = (spec.steps ?? []).flatMap((s) => (s.objects ?? []).filter((o) => o.type === 'node'))
    for (const l of labels) {
      for (const n of nodes) {
        const [lx, ly] = l.position ?? [0, 0, 0]
        const [nx, ny] = n.position ?? [0, 0, 0]
        expect(Math.hypot(lx - nx, ly - ny)).toBeGreaterThan(0.5)
      }
    }
  })

  it('a single-resistor circuit is still coherent (no divide-by-zero, no NaN)', () => {
    const one = buildCircuitScene({ voltage: 9, connection: 'series',
      components: [{ type: 'resistor', value: 3, unit: 'ohm' }] } as never)
    const ls = (one.steps ?? []).flatMap((s) => (s.objects ?? []).filter((o) => o.type === 'label'))
    expect(ls.map((l) => String(l.text))).toContain('R1 = 3 Ω')
    for (const l of ls) for (const c of l.position ?? []) expect(Number.isFinite(c)).toBe(true)
  })
})

describe('B — four options the learner could not tap (NOT FIXED, and why)', () => {
  // Real turn 5, phase GUIDE, `mcq: undefined`: the model wrote A) B) C) D) in
  // prose, so the learner saw four tappable-looking options that could not be
  // tapped and had to retype one by hand.
  //
  // WIDENING THE WITHHOLDER TO EVERY PHASE WAS TRIED HERE AND BACKED OUT.
  // Measured on the real turn, it cut the question and left the turn ending on
  // a bare "$$\sum \Delta V = 0$$" — the tutor set up a check and then never
  // asked it, which is a worse turn than the one being repaired. The gate-phase
  // scope is also a considered decision with its own rationale (GUIDE advances
  // on a give, so an ungraded question there costs a turn, not a lesson), and
  // `ungradedGateQuestion.test.ts` pins a real production option list surviving
  // at GUIDE on purpose.
  //
  // The remaining defect is presentational — untappable options — and the
  // honest fix is to RENDER a keyless option list as tappable at non-gate
  // phases, not to delete the question. That touches the MCQ payload, the
  // client and the grader, which is the most defect-prone path in this
  // codebase, so it is left as recorded work rather than forced in this pass.
  const PROSE_OPTIONS = [
    'When a charge leaves the positive terminal it gains twelve volts of potential.',
    '',
    'To check how this applies, if a twelve-volt battery provides a twelve-volt rise, what must be the total voltage drop?',
    'A) Zero volts, because all energy must be used up.',
    'B) Twelve volts, because the total drops must balance the rise from the battery.',
    'C) Twenty-four volts, because the voltage doubles in a loop.',
    'D) Six volts, because the voltage is split in half.',
  ].join('\n')

  it('AT A GATE it is still withheld — that behaviour is unchanged', () => {
    const r = withholdUngradedGateQuestion({ text: PROSE_OPTIONS, phase: 'CHECK', hasStructuredMcq: false })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('no-gradeable-probe')
  })

  it('AT GUIDE it still survives — the scope was deliberately left alone', () => {
    expect(withholdUngradedGateQuestion({ text: PROSE_OPTIONS, phase: 'GUIDE', hasStructuredMcq: false }).withheld)
      .toBe(false)
  })

  it('a real widget is never touched, at any phase', () => {
    for (const phase of ['GUIDE', 'CHECK', 'PRACTICE']) {
      expect(withholdUngradedGateQuestion({ text: PROSE_OPTIONS, phase, hasStructuredMcq: true }).withheld).toBe(false)
    }
  })
})

describe('C — "can you show me a diagram" answered with no diagram', () => {
  // "Held" means "already on the learner's screen", which in this UI expires:
  // a figure is attached to a MESSAGE, not pinned to the viewport. Four turns
  // later the tutor said "let's look at the circuit on your screen" and sent
  // nothing; on a phone that figure was several screens above.
  it('an explicit diagram request re-attaches the held figure', () => {
    expect(ROUTE).toContain('const reattachOnExplicitRequest =')
    expect(ROUTE).toContain("!figureIntroducedThisTurn && learnerRequestHoisted === 'diagram'")
    expect(ROUTE).toContain('if (figureIntroducedThisTurn || reattachOnExplicitRequest) {')
  })

  it('the held-session bookkeeping is NOT touched — only the client payload', () => {
    // figureIntroducedThisTurn still derives from the session's own turn count;
    // re-attaching must not redefine what "introduced" means.
    expect(ROUTE).toMatch(/const figureIntroducedThisTurn =\s*\n\s*visualDecisionHoisted\?\.session \? visualDecisionHoisted\.session\.turns === 0 : true/)
  })

  it('NO NEW PROVIDER CALL — the figure is re-derived, never regenerated', () => {
    // H3 (2026-08-27): 3 -> 4. The fourth is the remediation output floor's
    // single regeneration — a reviewed, deliberate call site, counted here
    // exactly as this guard intends. It fires only when a remediation turn's
    // draft explained nothing at all, and it never loops (one attempt, then a
    // deterministic branch). See remediationOutputContract.test.ts.
    expect((ROUTE.match(/await routeAI\(/g) ?? []).length).toBe(4)
  })
})

describe('D — the lesson closed itself before it was finished', () => {
  // Real turn 9: practiceCorrect=1, verified=false — not finished — and the
  // tutor wrote the full closing summary, then attached another question.
  const PREMATURE_CLOSE = [
    "Claude, that's correct — going against the current means moving uphill.",
    '',
    '✓ What you mastered — You can now successfully apply Kirchhoff\'s Current Law and Voltage Law, including traversal signs.',
    '✓ Common mistakes — A common error is treating resistors as always dropping potential regardless of direction.',
    'Next up: Wheatstone Bridge.',
    "✓ What's coming — Mastering Wheatstone Bridge will show you how these laws measure unknown resistances.",
  ].join('\n')

  it('the closing summary is recognised as a completion claim', () => {
    expect(claimsCompletionInProse(PREMATURE_CLOSE)).toBe(true)
  })

  it('"Next up:" — the colon form the model actually wrote — is caught', () => {
    expect(claimsCompletionInProse('Next up: Wheatstone Bridge.')).toBe(true)
    // The form already covered stays covered.
    expect(claimsCompletionInProse('Next up is Wheatstone Bridge.')).toBe(true)
  })

  it('the forward-movement claim goes', () => {
    expect(stripCompletionClaims(PREMATURE_CLOSE)).not.toContain('Next up:')
  })

  it('THE RECAP AND THE PRAISE STAY — this module\'s existing policy, not overturned', () => {
    // `completionClaimInProse.test.ts` ("keeps the praise and the recap")
    // already decided these bullets are recap rather than bookkeeping. They ARE
    // a claim about unearned mastery and remain an open question, but changing
    // them is a policy decision, not a bug fix, so this pass leaves them.
    const out = stripCompletionClaims(PREMATURE_CLOSE)
    expect(out).toContain("that's correct")
    expect(out).toContain('Common mistakes')
    expect(out).toContain('What you mastered')
  })

  it('ordinary teaching prose is never mistaken for a close', () => {
    for (const good of [
      'You have mastered the trick of spotting the junction first.',
      'What is coming out of the junction must equal what went in.',
      'Next, look at the twenty-ohm branch.',
      'That is the most common mistake on this topic.',
    ]) {
      expect(claimsCompletionInProse(good)).toBe(false)
    }
  })
})
