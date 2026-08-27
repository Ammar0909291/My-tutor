/**
 * PHASE H5 — AUTHORITATIVE REMEDIATION GROUNDING.
 *
 * ── WHAT H4 ESTABLISHED, AND WHAT THIS PHASE FOUND ─────────────────────────
 * H4 stopped at a boundary: nothing in this repository can decide whether
 * generated remediation prose is TRUE, and it named `antiAnalogies` as the
 * highest-priority content gap because the field was empty for every concept
 * it measured.
 *
 * H5's investigation found that "empty" was measuring two different things.
 *
 *   897 hand-authored Educational Brain entries
 *   654 carry authored anti-analogy content
 *   472 the loader can actually see
 *   182 AUTHORED BUT UNREACHABLE  ← human-curated content the parser misses
 *
 * `parseEBAntiAnalogies` matches exactly one authored form,
 * `**Anti-analogy…**:`. The curators also wrote, inside the same
 * `## Analogies` section:
 *
 *   111 × `### ANTI-ANALOGIES (do not use)`   — a heading, any case, plural
 *    19 × `- Anti-analogy: …`                  — a plain bullet, no bold
 *    ~50 × `**ANTI-ANALOGIES**:` / `- **ANTI-ANALOGY — "…"**` — plural, or no
 *          trailing colon
 *
 * None of it was reachable. This is not a content gap; it is a reach gap, and
 * closing it invents nothing.
 *
 * ── WHAT IS STILL A REAL CONTENT GAP ───────────────────────────────────────
 * The three concepts whose live failures started this whole line of work —
 * chem.kinet.catalysis, chem.equil.kc-kp, chem.kinet.mechanism — have NO
 * authored anti-analogy in any form. Their `## Analogies` sections contain
 * only positive analogies. Nothing here fabricates one: they resolve to
 * `insufficient_authoritative_grounding`, which is a reportable state, not a
 * silent fallback.
 *
 * ── THE ONE THING THIS FILE REFUSES TO DO ──────────────────────────────────
 * Grounding is not verification. A grounded turn is a turn the tutor was told
 * what not to say; it is not a turn anything checked. H4's boundary is
 * unmoved, and the closing block says so.
 */
import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import {
  buildRemediationGrounding, buildRemediationGroundingBlock,
} from '@/lib/teaching/remediationGrounding'
import { checkRemediationOutput } from '@/lib/teaching/remediationOutputContract'
import { detectLearnerRequest } from '@/lib/teaching/masteryGate'
import { classifyConversation } from '@/lib/teaching/conversationDecision'
import { responseBudget } from '@/lib/teaching/conversationState'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
const EB_ROOT = join(process.cwd(), 'educational-brain', 'concepts')

/** The four measured concepts, and what H5 expects of each. */
const CORPUS = [
  { id: 'chem.kinet.catalysis', grounded: false },
  { id: 'chem.equil.kc-kp', grounded: false },
  { id: 'chem.kinet.mechanism', grounded: false },
  { id: 'phys.therm.phase-transitions', grounded: true },
] as const

// ── 3. ANTI-ANALOGY AUDIT — the reach gap, measured ────────────────────────

describe('H5-3 — authored anti-analogies the loader could not see', () => {
  it('phys.therm.phase-transitions has one authored, in the heading form', () => {
    const raw = readFileSync(join(EB_ROOT, 'physics', 'phys.therm.phase-transitions.md'), 'utf8')
    expect(raw).toMatch(/^#{2,4}[ \t]*Anti-analogy/mi)
    expect(raw).toContain('Condensation cools things down')
    // …and after the reach fix, the loader returns it.
    expect(loadEBConceptContext('phys.therm.phase-transitions').context.antiAnalogies.length)
      .toBeGreaterThan(0)
  })

  it('the plain-bullet form is reachable too', () => {
    const ctx = loadEBConceptContext('eng.communication.business-writing')
    expect(ctx.found).toBe(true)
    expect(ctx.context.antiAnalogies.length).toBeGreaterThan(0)
    expect(ctx.context.antiAnalogies.join(' ')).toMatch(/front-loading is not/i)
  })

  it('the plural / uppercase heading form is reachable too', () => {
    const ctx = loadEBConceptContext('eng.communication.digital-communication')
    expect(ctx.found).toBe(true)
    expect(ctx.context.antiAnalogies.length).toBeGreaterThan(0)
  })

  it('a POSITIVE analogy that merely mentions the words is NOT captured', () => {
    /**
     * chem.atomic.atomic-spectra authors:
     *   "**The piano string model (anti-analogy worth mentioning)**: A piano
     *    string can vibrate at specific harmonics … Mention the analogy but
     *    flag that the mechanism is not classical waves."
     * The curator's instruction is to USE it with a caveat. Capturing it as
     * "do not use this analogy" would invert authored intent, which is a worse
     * failure than missing it.
     */
    const ctx = loadEBConceptContext('chem.atomic.atomic-spectra')
    expect(ctx.found).toBe(true)
    expect(ctx.context.antiAnalogies.join(' ')).not.toMatch(/piano string/i)
  })

  it('THE REACH GAP IS CLOSED AT SCALE, and the residual is measured not guessed', () => {
    let authored = 0
    let reachable = 0
    for (const s of readdirSync(EB_ROOT, { withFileTypes: true }).filter((d) => d.isDirectory())) {
      for (const f of readdirSync(join(EB_ROOT, s.name)).filter((n) => n.endsWith('.md'))) {
        const raw = readFileSync(join(EB_ROOT, s.name, f), 'utf8')
        if (!/anti-analog/i.test(raw)) continue
        authored += 1
        const ctx = loadEBConceptContext(f.replace(/\.md$/, ''))
        if (ctx.found && ctx.context.antiAnalogies.length > 0) reachable += 1
      }
    }
    // Baseline before this phase: 654 authored, 472 reachable.
    expect(authored).toBeGreaterThanOrEqual(654)
    expect(reachable).toBeGreaterThan(472)
    // The remaining unreachable are prose cross-references and the deliberate
    // positive-analogy exclusion above — not a silently accepted loss.
    expect(authored - reachable).toBeLessThan(60)
  })
})

// ── 2. FOUR-CONCEPT CONTENT AUDIT ──────────────────────────────────────────

describe('H5-2 — the measured corpus, audited concept by concept', () => {
  for (const c of CORPUS) {
    it(`${c.id} — ${c.grounded ? 'grounded' : 'insufficient_authoritative_grounding'}`, () => {
      const g = buildRemediationGrounding(c.id)
      expect(g.conceptId).toBe(c.id)
      if (c.grounded) {
        expect(g.status).toBe('grounded')
        expect(g.mustNotUse.length).toBeGreaterThan(0)
      } else {
        // The three live failures. NOTHING is fabricated for them.
        expect(g.status).toBe('insufficient_authoritative_grounding')
        expect(g.mustNotUse).toEqual([])
      }
      // The canonical idea is the KG description and only ever that.
      expect(g.canonicalIdea).toBe(getKGNode(c.id)?.description?.trim() ?? null)
    })
  }

  it('the three chemistry failures still have no authored anti-analogy — stated, not hidden', () => {
    for (const id of ['chem.kinet.catalysis', 'chem.equil.kc-kp', 'chem.kinet.mechanism']) {
      const raw = readFileSync(join(EB_ROOT, 'chemistry', `${id}.md`), 'utf8')
      expect(/anti-analog/i.test(raw), `${id} authored anti-analogy`).toBe(false)
    }
  })
})

// ── 4. THE GROUNDING OBJECT — what it may and may not carry ────────────────

describe('H5-4 — only learner-safe authoritative material is admitted', () => {
  it('a stub blueprint spine never becomes the canonical idea', () => {
    // "Phase Transitions and Latent Heat is a concept in thermodynamics." is
    // what the Blueprint offers here. It teaches nothing and is excluded by
    // construction: the spine is not a source for this object at all.
    const g = buildRemediationGrounding('phys.therm.phase-transitions')
    expect(g.canonicalIdea).not.toMatch(/is a concept in/i)
  })

  it('the misconception register is NOT admitted — it describes learners, not tutor claims', () => {
    const g = buildRemediationGrounding('chem.equil.kc-kp')
    const all = JSON.stringify(g)
    // kc-kp's register talks about coefficients-as-multipliers. That is a
    // student error, not an instruction to the tutor, and H4 proved a checker
    // built on it would have passed all three live failures.
    expect(all).not.toMatch(/multiplier/i)
  })

  it('an unknown concept degrades to insufficient, never throws, never invents', () => {
    const g = buildRemediationGrounding('does.not.exist')
    expect(g.status).toBe('insufficient_authoritative_grounding')
    expect(g.canonicalIdea).toBeNull()
    expect(g.mustNotUse).toEqual([])
    expect(() => buildRemediationGrounding(null as unknown as string)).not.toThrow()
  })

  it('provenance is preserved: the source is the hand-authored EB tree and the KG', () => {
    const g = buildRemediationGrounding('phys.therm.phase-transitions')
    expect(g.sources.canonicalIdea).toBe('knowledge-graph')
    expect(g.sources.mustNotUse).toBe('educational-brain')
    // No AI_AUTHORED path exists into either — asserted structurally in the
    // module's own source, which reads only those two loaders.
    const mod = readFileSync(join(process.cwd(), 'src/lib/teaching/remediationGrounding.ts'), 'utf8')
    expect(mod).not.toMatch(/routeAI|generateJSON|prisma|assetIdentity/i)
  })
})

// ── 5. DELIVERY — a constraint the model reads, never a template it copies ──

describe('H5-5 — the block reaches the model without becoming scaffolding', () => {
  const grounded = buildRemediationGrounding('phys.therm.phase-transitions')

  it('an ungrounded concept produces NO block at all', () => {
    // The failure H4 warned about: hiding missing content behind fallback
    // prose. An insufficient concept adds nothing, so the turn is exactly what
    // it was before H5.
    expect(buildRemediationGroundingBlock(buildRemediationGrounding('chem.kinet.catalysis'))).toBe('')
    expect(buildRemediationGroundingBlock(buildRemediationGrounding('does.not.exist'))).toBe('')
  })

  it('a grounded concept produces a block carrying the authored words', () => {
    const block = buildRemediationGroundingBlock(grounded)
    expect(block.length).toBeGreaterThan(0)
    expect(block).toContain('Condensation cools things down')
  })

  it('the block is model-facing instruction, not learner-facing content', () => {
    const block = buildRemediationGroundingBlock(grounded)
    // Same register as H3's repair appendix: an instruction the model obeys.
    expect(block).toMatch(/do not|never/i)
    // NO markdown headings and no numbered template steps — the exact shape
    // the EXPLANATION SEQUENCING LAW was copied from in H4.
    expect(block).not.toMatch(/^#{1,6}\s/m)
    expect(block).not.toMatch(/^\s*\d+\.\s/m)
  })

  it('the block never instructs the tutor to recite the authored text', () => {
    const block = buildRemediationGroundingBlock(grounded)
    expect(block).not.toMatch(/verbatim|word[- ]for[- ]word|quote this|copy this/i)
  })

  it('it is bounded, so a long authored library cannot swamp the prompt', () => {
    expect(buildRemediationGroundingBlock(grounded).length).toBeLessThan(1200)
  })
})

// ── WIRING — an unwired grounding layer is not grounding ───────────────────

describe('H5 — the grounding is on the remediation path only', () => {
  it('it is injected, and only for a remediation turn', () => {
    expect(ROUTE).toContain('buildRemediationGroundingBlock')
    const at = ROUTE.indexOf('buildRemediationGroundingBlock')
    const window = ROUTE.slice(Math.max(0, at - 1800), at + 400)
    expect(window).toMatch(/isRemediationTurn/)
  })

  it('it is injected BEFORE the provider call, or the model never sees it', () => {
    expect(ROUTE.indexOf('buildRemediationGroundingBlock'))
      .toBeLessThan(ROUTE.indexOf('routed = await routeAI('))
  })

  it('it adds NO provider call — H3\'s four call sites are unchanged', () => {
    expect((ROUTE.match(/await routeAI\(/g) ?? []).length).toBe(4)
  })

  it('it changes no decision, no arbitration, no mastery, no grading, no ladder', () => {
    const at = ROUTE.indexOf('buildRemediationGroundingBlock')
    const scoped = ROUTE.slice(Math.max(0, at - 1200), at + 600)
    for (const forbidden of [
      /correctAtCheck/, /masteryVerified/, /mcqGradeHoisted\s*=/, /arbitrateTurn\(/,
      /conversationStateHoisted\s*=/, /phaseAfter\s*=/, /findBestProbe/,
    ]) {
      expect(scoped, forbidden.source).not.toMatch(forbidden)
    }
  })
})

// ── The phases below H5 stay closed ────────────────────────────────────────

describe('H5 — H1, H2, H3, D1 and D2 invariants re-pinned', () => {
  it('H1 detector and budget', () => {
    expect(detectLearnerRequest('sir i not understand this')).toBe('explain_differently')
    expect(detectLearnerRequest('teach me about relativity')).toBeNull()
    expect(responseBudget('expert', 1, 0)).toBe(7)
    expect(responseBudget('expert', 2, 0)).toBe(6)
  })

  it('H2 classification — CONFUSION and REPHRASE_REQUEST are still distinct', () => {
    const base = {
      recoveryKey: null, studentIntent: 'requesting_help', lastAssistantAskedQuestion: false,
      lastSignalCorrectness: null, hedged: false, helpRequestKind: 'explain_differently' as string | null,
    }
    expect(classifyConversation('sir i not understand this', base).type).toBe('CONFUSION')
    expect(classifyConversation('explain it another way', base).type).toBe('REPHRASE_REQUEST')
  })

  it('H3 structural floor is untouched and still rejects both shapes', () => {
    expect(checkRemediationOutput({
      remediationTurn: true, text: 'What do you notice about the crowd when someone leaves the room?',
    }).violation).toBe('question-only')
    expect(ROUTE).toContain('[remediation-floor]')
  })

  it('D1 and D2', () => {
    expect(ROUTE).toContain('excludeProbeStem: historyForGate ? (stem) => hasAskedMcq(historyForGate, stripAuthoringLabel(stem)) : undefined')
    expect((ROUTE.match(/offeredMcqOptions: pendingMcqHoisted\?\.options/g) ?? []).length)
      .toBeGreaterThanOrEqual(2)
  })
})

// ── The boundary H5 does NOT move ──────────────────────────────────────────

describe('H5 — grounding is not verification, and this is the record', () => {
  it('a grounded turn can still be false, and nothing here detects it', () => {
    // Even with authored grounding supplied, the H4 false answers still pass
    // every mechanism the system has. Grounding constrains what the tutor is
    // TOLD; it does not check what the tutor WROTE.
    const stillFalse =
      'A catalyst speeds a reaction up without being used up. When you stir sugar into hot tea '
      + 'the sugar dissolves faster, and the sugar is still there to use again later.'
    expect(checkRemediationOutput({ remediationTurn: true, text: stillFalse }).violation).toBeNull()
  })

  it('and for the three concepts that failed, there is no grounding to supply', () => {
    for (const id of ['chem.kinet.catalysis', 'chem.equil.kc-kp', 'chem.kinet.mechanism']) {
      expect(buildRemediationGroundingBlock(buildRemediationGrounding(id)), id).toBe('')
    }
  })
})
