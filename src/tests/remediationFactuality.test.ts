/**
 * PHASE H4 — WHERE FACTUAL CORRECTNESS STOPS BEING DECIDABLE.
 *
 * ── WHY THIS FILE IS A BOUNDARY, NOT A FIX ──────────────────────────────────
 * H3 shipped a structural floor: a remediation turn that explains nothing is
 * regenerated once and, failing that, replaced by the curriculum's own
 * sentence. It works, and it was proven live. It also cannot tell truth from
 * falsehood, and it never claimed to.
 *
 * Three learner-visible chemistry responses measured in H3 were short,
 * concrete, on-concept, question-free, formula-free — and wrong:
 *   · stirring sugar into tea offered as an example of CATALYSIS
 *   · a soda bottle described as still at equilibrium at the moment it is
 *     OPENED (opening is exactly what destroys it)
 *   · initiation / propagation / termination — radical-chain vocabulary —
 *     used as the mechanism of an acid–base reaction
 *
 * This file does two things and no more:
 *   1. reads the REAL authoritative material the repository holds for those
 *      concepts, so what exists is measured rather than assumed;
 *   2. proves that structural validity is not factual validity, by showing the
 *      shipped floor accepts all three.
 *
 * It deliberately does NOT contain a hand-built fact database, and it does not
 * introduce a checker. See the closing block for invariant #6 and the reason
 * it is recorded UNMEASURABLE.
 */
import { describe, it, expect } from 'vitest'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import { loadBlueprintContent, loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import { checkRemediationOutput, isRemediationTurn } from '@/lib/teaching/remediationOutputContract'
import { classifyConversation } from '@/lib/teaching/conversationDecision'
import { detectLearnerRequest } from '@/lib/teaching/masteryGate'
import { responseBudget } from '@/lib/teaching/conversationState'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

/**
 * The corpus. REAL concept ids, and the false claim MEASURED in production for
 * each — not invented failure modes. `mustRemainTrue` records the single fact
 * each false claim contradicts, in the curriculum's own terms.
 */
const CORPUS = [
  {
    id: 'chem.kinet.catalysis',
    falseButWellFormed:
      'A catalyst speeds a reaction up without being used up. When you stir sugar into hot tea '
      + 'the sugar dissolves faster, and the sugar is still there to use again later.',
    mustRemainTrue: 'a catalyst provides a lower-activation-energy pathway for a chemical '
      + 'reaction; dissolving is not a chemical reaction and the sugar is consumed into solution',
  },
  {
    id: 'chem.equil.kc-kp',
    falseButWellFormed:
      'Think of a sealed soda bottle. When you open it, the gas inside balances between dissolved '
      + 'carbon dioxide and the bubbles that rise to the surface, and that balance is what Kc measures.',
    mustRemainTrue: 'the dissolved-gas equilibrium holds while the bottle is SEALED; opening it '
      + 'drops the partial pressure and drives the system away from equilibrium',
  },
  {
    id: 'chem.kinet.mechanism',
    falseButWellFormed:
      'A reaction mechanism has three parts. Initiation: the acid protonates the bicarbonate ion. '
      + 'Propagation: the complex collapses and releases carbon dioxide. Termination: the reaction '
      + 'stops when all the bicarbonate is used up.',
    mustRemainTrue: 'initiation / propagation / termination is the structure of a RADICAL CHAIN '
      + 'reaction, not of a general mechanism, and certainly not of an acid–base proton transfer',
  },
  {
    id: 'phys.therm.phase-transitions',
    // The physics control: a real production remediation turn that was correct.
    falseButWellFormed: null,
    correctSimplified:
      'When a substance changes from one state to another, heat is absorbed or released while the '
      + 'temperature stays fixed; this heat is called latent heat. If you heat ice at 0 °C, the '
      + 'temperature stays at 0 °C until all the ice has melted, even though energy is still '
      + 'flowing into it.',
    mustRemainTrue: 'temperature is constant during a phase change while latent heat is absorbed',
  },
] as const

// ── PART 1 — what authoritative knowledge actually exists ───────────────────

describe('H4-1 — the authoritative material, measured not assumed', () => {
  for (const c of CORPUS) {
    it(`${c.id} — every authored source is present and typed`, () => {
      const kg = getKGNode(c.id)
      expect(kg, 'the KG node').toBeTruthy()
      // The KG description is the ONE learner-facing sentence the curriculum
      // states for every concept. It is what H3's fallback speaks.
      expect((kg!.description ?? '').length).toBeGreaterThan(40)

      const bp = loadBlueprintContent(c.id)
      expect(bp.found, 'a Blueprint').toBe(true)
      expect(bp.content.misconceptions.length, 'authored misconceptions').toBeGreaterThan(0)

      const eb = loadEBConceptContext(c.id)
      expect(eb.found, 'an Educational Brain entry').toBe(true)
    })
  }

  it('THE DECISIVE FINDING — the authored misconception registers do not contain the errors the model made', () => {
    /**
     * The registers are real, curated and correct. They are also a list of
     * anticipated STUDENT errors, not a set of constraints on generated TUTOR
     * prose. Measured, verbatim, from the repository:
     *
     *   catalysis  → "shifts the equilibrium position" · "is consumed during
     *                 the reaction" · "rate enhancement is proportional to Ea
     *                 reduction"
     *   kc-kp      → "coefficients appear as multipliers, not exponents" ·
     *                 "pure solids and liquids must appear in Kc/Kp" ·
     *                 "Kp always equals Kc"
     *   mechanism  → "rate law derived from the overall stoichiometry" ·
     *                 "the intermediate can appear in the final rate law" ·
     *                 "a mechanism is proved by giving the correct rate law"
     *
     * Not one of them is the sugar-in-tea analogy, the opened bottle, or the
     * radical-chain scheme. So even a mechanism that compared the draft
     * against the register would have passed all three.
     */
    const errorFingerprints: Record<string, RegExp> = {
      'chem.kinet.catalysis': /sugar|dissolv|tea/i,
      'chem.equil.kc-kp': /open(ing|ed)?\s+(the\s+)?bottle|soda/i,
      'chem.kinet.mechanism': /initiation|propagation|termination/i,
    }
    for (const [id, fingerprint] of Object.entries(errorFingerprints)) {
      const bp = loadBlueprintContent(id)
      const eb = loadEBConceptContext(id)
      const authored = [
        ...bp.content.misconceptions.map((m) => `${m.title} ${m.characteristicPhrase ?? ''}`),
        ...eb.context.ebMisconceptions.map((m) => `${m.title} ${m.symptom ?? ''} ${m.recovery ?? ''}`),
      ].join(' ')
      expect(authored.length, `${id} has authored misconception text`).toBeGreaterThan(0)
      expect(fingerprint.test(authored), `${id}: the register does NOT anticipate this error`).toBe(false)
    }
  })

  it('antiAnalogies — CORRECTED BY H5: empty for the three chemistry failures, authored for physics', () => {
    /**
     * H4 asserted this was empty for ALL FOUR concepts and concluded the
     * content was absent. H5's investigation proved that measurement was
     * reading the PARSER, not the corpus: `phys.therm.phase-transitions`
     * carries an authored `### Anti-analogy — "Condensation cools things
     * down"` that `parseEBAntiAnalogies` could not see, and 182 of the 654
     * authored anti-analogies across the tree were unreachable the same way.
     *
     * The assertion is corrected to the measured truth rather than relaxed:
     * the three CHEMISTRY concepts genuinely have no authored anti-analogy in
     * any form (verified by searching their source files), and physics now
     * returns the one it always had.
     */
    for (const id of ['chem.kinet.catalysis', 'chem.equil.kc-kp', 'chem.kinet.mechanism']) {
      const anti = (loadEBConceptContext(id).context as { antiAnalogies?: unknown[] }).antiAnalogies ?? []
      expect(anti.length, `${id} antiAnalogies — a real content gap`).toBe(0)
    }
    const physics = (loadEBConceptContext('phys.therm.phase-transitions')
      .context as { antiAnalogies?: unknown[] }).antiAnalogies ?? []
    expect(physics.length, 'phys.therm.phase-transitions — authored, and now reachable')
      .toBeGreaterThan(0)
    // …and the field is genuinely usable when authored, so the chemistry
    // absence is a content gap and not a broken loader.
    const authored = loadEBConceptContext('eng.phonics.phonemic-awareness')
    expect(((authored.context as { antiAnalogies?: unknown[] }).antiAnalogies ?? []).length)
      .toBeGreaterThan(0)
  })

  it('E — retrieved material is not uniformly learner-safe, which is why H3 gates it', () => {
    // The Blueprint spine is written for an AUTHOR. For the physics concept in
    // this corpus it degrades to a stub that says nothing teachable, which is
    // exactly why H3's fallback prefers the KG description and applies a
    // reads-as-prose test before speaking anything.
    const stub = loadBlueprintContent('phys.therm.phase-transitions').content.conceptSpine?.definition ?? ''
    expect(stub.length).toBeLessThan(120)
    expect(stub).toMatch(/is a concept in/i)
    // The KG description for the same concept is a real, speakable sentence.
    expect((getKGNode('phys.therm.phase-transitions')?.description ?? '').length).toBeGreaterThan(100)
  })
})

// ── PARTS 4 + 9 — structural validity is NOT factual validity ───────────────

describe('H4-4/9 — the shipped floor accepts every one of the measured false answers', () => {
  for (const c of CORPUS) {
    if (!c.falseButWellFormed) continue
    it(`${c.id} — short, concrete, on-concept, question-free… and false`, () => {
      const text = c.falseButWellFormed
      // It satisfies every property H1/H2/H3 can measure.
      expect(text.includes('?'), 'asks no question').toBe(false)
      expect(text.split(/\n\s*\n/).length, 'within the paragraph budget').toBeLessThanOrEqual(7)
      expect(/\\[a-z]+|\$\$|=\s*\d/.test(text), 'no formula dump').toBe(false)
      // And the floor accepts it.
      expect(checkRemediationOutput({ remediationTurn: true, text }).violation).toBeNull()
    })
  }

  it('the floor treats a CORRECT explanation and a FALSE one identically', () => {
    const correct = CORPUS[3].correctSimplified!
    const wrong = CORPUS[0].falseButWellFormed!
    const v = (t: string) => checkRemediationOutput({ remediationTurn: true, text: t }).violation
    expect(v(correct)).toBeNull()
    expect(v(wrong)).toBeNull()
    // Same verdict. That equality IS the boundary this phase reports.
    expect(v(correct)).toEqual(v(wrong))
  })

  it('STRUCTURAL PASS and FACTUAL PASS are different properties, and only one is computable here', () => {
    const structuralPass = (t: string) =>
      checkRemediationOutput({ remediationTurn: true, text: t }).violation === null
    // Structural: decidable, deterministic, shipped.
    expect(structuralPass(CORPUS[0].falseButWellFormed!)).toBe(true)
    // Factual: NOT decidable by anything in this repository — see the
    // UNMEASURABLE block below. No assertion is made about it here, because
    // asserting one would require a mechanism that does not exist.
  })
})

// ── PART 11 — the invariants that must survive this phase ──────────────────

describe('H4-11 — every prior invariant, re-pinned', () => {
  const base = {
    recoveryKey: null, studentIntent: 'requesting_help',
    lastAssistantAskedQuestion: false, lastSignalCorrectness: null, hedged: false,
    helpRequestKind: 'explain_differently' as string | null,
  }

  it('1 — "sir i not understand this" remains CONFUSION', () => {
    expect(detectLearnerRequest('sir i not understand this')).toBe('explain_differently')
    expect(classifyConversation('sir i not understand this', base).type).toBe('CONFUSION')
  })

  it('2 — FOUNDATION_REBUILD is still what the strategy engine selects for a struggling learner', async () => {
    const { getStrategyPriority } = await import('@/lib/school/adaptive/teachingStrategy')
    // The type is still first priority; selection itself is exercised live and
    // logged in production as recommendedTeachingMode.
    expect(getStrategyPriority({ type: 'FOUNDATION_REBUILD', priority: 1 } as never)).toBe(1)
  })

  it('3/4/5 — the H3 structural floor is still active and still rejects both shapes', () => {
    expect(isRemediationTurn('CONFUSION')).toBe(true)
    expect(checkRemediationOutput({
      remediationTurn: true, text: 'What do you notice about the crowd when someone leaves the room?',
    }).violation).toBe('question-only')
    const prior = 'A catalyst lowers the activation energy of a reaction.'
    expect(checkRemediationOutput({
      remediationTurn: true, text: prior, previousAssistantText: `Some lead-in. ${prior} And more.`,
    }).violation).toBe('repeats-previous-turn')
    expect(ROUTE).toContain('[remediation-floor]')
  })

  it('7 — an authoritative, simplified explanation is accepted', () => {
    expect(checkRemediationOutput({ remediationTurn: true, text: CORPUS[3].correctSimplified! }).violation)
      .toBeNull()
  })

  it('8/9 — ordinary and non-remediation turns are unchanged', () => {
    expect(checkRemediationOutput({
      remediationTurn: false, text: 'What do you notice about the crowd?',
    }).violation).toBeNull()
    expect(isRemediationTurn('NEUTRAL')).toBe(false)
  })

  it('10/11 — "ok sir" is an acknowledgement and does not clear the struggle', () => {
    const d = classifyConversation('ok sir', { ...base, studentIntent: 'answering', helpRequestKind: null })
    expect(isRemediationTurn(d.type)).toBe(false)
    expect(d.type).not.toBe('CONFIDENCE')
  })

  it('12 — the H1 budget is untouched', () => {
    expect(responseBudget('expert', 1, 0)).toBe(7)
    expect(responseBudget('expert', 2, 0)).toBe(6)
  })

  it('13/14 — D1 and D2 invariants are untouched', () => {
    expect(ROUTE).toContain('excludeProbeStem: historyForGate ? (stem) => hasAskedMcq(historyForGate, stripAuthoringLabel(stem)) : undefined')
    expect((ROUTE.match(/offeredMcqOptions: pendingMcqHoisted\?\.options/g) ?? []).length)
      .toBeGreaterThanOrEqual(2)
  })

  it('15/16 — no mastery/grading/ladder change and no extra regeneration was added by H4', () => {
    // H4 ships NO production change. The call-site count is exactly H3's.
    expect((ROUTE.match(/await routeAI\(/g) ?? []).length).toBe(4)
  })
})

// ── PART 2 + PART 11 #6 — the mechanism sweep, and the UNMEASURABLE verdict ─

describe('H4-6 — UNMEASURABLE: no existing mechanism can establish factual correctness', () => {
  /**
   * Every candidate was read from source before being ruled out. None of these
   * assertions activates anything; each records what the mechanism IS.
   */

  it('the K5 verifier carries no concept definition, so no rule can compare a claim against one', async () => {
    const types = readFileSync(join(process.cwd(), 'src/lib/kernel/verifier/types.ts'), 'utf8')
    // The ONLY curriculum field on the context.
    expect(types).toContain('knownMisconceptionText')
    for (const absent of ['conceptDefinition', 'authoritativeText', 'spineDefinition', 'groundingText']) {
      expect(types, absent).not.toContain(absent)
    }
  })

  it('vAffirm — the closest rule — says in its own source that truth is not decidable there', () => {
    const rules = readFileSync(join(process.cwd(), 'src/lib/kernel/verifier/rules.ts'), 'utf8')
    expect(rules).toContain('It does NOT decide whether the learner was right')
    // And what it judges is the reply's stance toward the LEARNER's proposal,
    // never the truth of the reply's own claims.
    expect(rules).toContain('LEARNER_PROPOSES_RE')
  })

  it('the K5 gate is env-gated OFF, and its flags cannot be set from a session', async () => {
    const flags = readFileSync(join(process.cwd(), 'src/lib/eos-runtime/flags.ts'), 'utf8')
    expect(flags).toContain('ENABLE_OUTPUT_VERIFIER')
    expect(flags).toMatch(/return master \? 'log' : 'off'/)
  })

  it('the ONE correctness judge in the repository judges FIGURES, and its contract is figure-shaped', () => {
    const critic = readFileSync(join(process.cwd(), 'src/lib/teaching/visual/figureCritic.ts'), 'utf8')
    // It really does judge correctness — with a model, fail-closed on unsure.
    expect(critic).toContain("'correctness'")
    expect(critic).toContain('Uncertainty resolves to HOLD, never to promote')
    // …of a GeneratedFigure. Its inputs, its static checks and its prompt are
    // all about a drawn payload. Reusing it for prose would mean a new input
    // type, a new prompt and new dimensions — that is authoring a second
    // critic, not reusing this one.
    expect(critic).toContain('GeneratedFigure')
    expect(critic).toContain('drawnElementCount')
    expect(critic).toContain('checkSceneLayoutAllViewports')
  })

  it('protocol compliance is measurement only, by its own declaration', () => {
    const exec = readFileSync(join(process.cwd(), 'src/lib/understanding/execution.ts'), 'utf8')
    expect(exec).toContain('MEASUREMENT ONLY')
  })

  it('INVARIANT #6 IS RECORDED UNMEASURABLE — and this test is the record', () => {
    // "A short but factually wrong response is NOT accepted IF an existing
    //  verification mechanism can actually detect it."
    // No existing mechanism can. The condition is false, so the invariant is
    // vacuous, and H4 does not invent a mechanism to make it true.
    const wrong = CORPUS[0].falseButWellFormed!
    expect(checkRemediationOutput({ remediationTurn: true, text: wrong }).violation).toBeNull()
  })
})

// ── PART 7/8 — the adjacent findings, recorded where they were measured ────

describe('H4-7/8 — output integrity and the unwired metric, characterized', () => {
  it('7A — the paragraph budget has an enforcement rule, and the route hands it null', () => {
    const rules = readFileSync(join(process.cwd(), 'src/lib/kernel/verifier/rules.ts'), 'utf8')
    // V-LEN exists and is a REJECT rule…
    expect(rules).toContain('export function vLen')
    expect(rules).toContain("code: 'V-LEN', severity: 'REJECT'")
    expect(rules).toContain('if (ctx.budgets.maxParagraphs === null) return null')
    // …and the one place the route builds a verifier context passes null, so
    // the rule is disabled even when the (off-by-default) gate runs. The budget
    // therefore reaches the model as prompt text and nothing else.
    expect(ROUTE).toContain('maxParagraphs: null,')
  })

  it('7B — the leaked headings are the EXPLANATION SEQUENCING LAW, which is model scaffolding', () => {
    const client = readFileSync(join(process.cwd(), 'src/lib/ai/client.ts'), 'utf8')
    expect(client).toContain('EXPLANATION SEQUENCING LAW')
    expect(client).toContain('concrete everyday object')
    // It is an ORDER, written with arrows — not headings, and not learner-
    // facing. The model rendered its step names as literal markdown headings.
  })

  it('7B — no existing stripper owns markdown headings, and the closest one says why', () => {
    const sweep = readFileSync(join(process.cwd(), 'src/lib/teaching/residualTagSweep.ts'), 'utf8')
    // The residual sweep is scoped to HTML-comment machine markup. A heading
    // is legitimate formatting a good turn may use, so extending this sweep to
    // headings would delete real teaching structure.
    expect(sweep).toContain('<!--')
    expect(sweep).not.toMatch(/^###|heading/mi)
  })

  it('8 — foldLegalityMetrics has NO production call site: the metric is unwired, not merely unconsumed', () => {
    const legality = readFileSync(join(process.cwd(), 'src/lib/teaching/questionLegality.ts'), 'utf8')
    expect(legality).toContain('export function foldLegalityMetrics')
    expect(legality).toContain('askViolations')
    // The route never calls it, and nothing persists it.
    expect(ROUTE).not.toContain('foldLegalityMetrics')
    expect(ROUTE).not.toContain('askViolations')
  })
})
