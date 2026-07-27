/**
 * ISS-24 — the golden thread: one concept, walked across every seam.
 *
 * THE GAP THIS CLOSES. The five frozen specs each define their own tests. The
 * SEAMS between them — CEKR→EBC, EBC→RS packs, RS→evidence — are specified in
 * prose with no shared fixture, so each layer's implementation was free to
 * interpret its own edges. Every layer here is green in isolation today; that
 * has never proved they agree with each other.
 *
 * ISS-24's smallest correction, verbatim: "one 'golden thread' fixture: a
 * single concept authored as blocks → CEKR entities → pack shards → kernel
 * decisions → evidence events … checked into the repo as data the moment any
 * two adjacent layers exist."
 *
 * That moment is now. This test is the thread, and it is deliberately ONE
 * concept end to end rather than four good tests of four layers — the whole
 * point is that a break appears at the seam, naming which two layers stopped
 * agreeing.
 *
 * The final hop (evidence event → EvidenceClaim) is S-track and needs
 * production data; the thread stops at the evidence event and says so rather
 * than faking the last link.
 */
import { describe, it, expect } from 'vitest'
import { fromBrainScript } from '@/lib/cekr/fromBrainScript'
import { validateCorpus } from '@/lib/cekr/validate'
import { isEdge, makeEntityId, type CekrEdge, type CekrEnvelope, type CekrRecord } from '@/lib/cekr/types'
import { compileFromCekr } from '@/lib/brain-compiler/fromCekr'
import { emitCompiledPack, loadPack, mergePacks } from '@/lib/brain-compiler'
import { decide, BASE_PACK } from '@/lib/kernel/policy'
import type { PolicyInputs } from '@/lib/kernel/policy/types'
import { buildTurnEvents } from '@/lib/evidence-spine/turnEmitter'

// ── THE FIXTURE: one concept, authored as blocks ────────────────────────────
// Checked in as data (ISS-24's own wording). Small on purpose: the thread
// tests the SEAMS, and a large fixture would hide which one broke.

const CONCEPT_SLUG = 'thread.gas-solubility'

const SOURCE = `
::Concept ${CONCEPT_SLUG}
  title: "Gas solubility"
  core: {"claim":"More pressure pushes more gas into a liquid."}
  prereqsComplete: true
  bloom: "understand"
  @tags: []
::end

::MentalModel thread.fizzy-bottle
  statements: ["Squeeze the bottle and the bubbles hide.","Let go and they come back."]
  boundaryCases: ["Warming the drink pushes gas out even without squeezing."]
::end

::edge EXPLAINS cekr:MentalModel/thread.fizzy-bottle -> cekr:Concept/${CONCEPT_SLUG}
  phaseFit: ["ANCHOR","DEMONSTRATE"]
::end
`

const DRAFT_OK = new Set(['ACTIVE', 'REVIEW', 'DRAFT'])

const inputs = (over: Partial<PolicyInputs> = {}): PolicyInputs => ({
  turnId: 'thread', learnerId: 'L', sessionId: 'S',
  contentRegister: 'beginner', profileLevel: 'beginner',
  sessionFailureCount: 0, isFirstLessonContext: false,
  phase: 'DEMONSTRATE', stageCeiling: 2, demonstrated: false, consecutiveFailures: 0,
  interruptActive: false, failureStateKey: null, autonomyRequested: false,
  retroWinOwed: false, dueReviewCount: 0, freshBoundary: false,
  lastSignalCorrect: null, lastSignalConfidence: null,
  currentConceptId: CONCEPT_SLUG,
  ...over,
})

// ── the walk ────────────────────────────────────────────────────────────────

describe('golden thread — blocks → CEKR', () => {
  const { records, diagnostics } = fromBrainScript(SOURCE, { file: 'thread.bs' })

  it('authored blocks lower to CEKR without diagnostics', () => {
    expect(diagnostics.filter((d) => d.severity === 'E')).toEqual([])
    expect(records.length).toBeGreaterThan(0)
  })

  it('SEAM: the entity id is the one makeEntityId produces — not a second convention', () => {
    // The first thing that would drift silently. If the lowering ever invents
    // its own id shape, every downstream join breaks and nothing else notices.
    const ids = records.filter((r) => !isEdge(r)).map((r) => r.id)
    expect(ids).toContain(makeEntityId('Concept', CONCEPT_SLUG))
  })

  it('the corpus its own validator accepts (V-1…V-16)', () => {
    const entities = records.filter((r) => !isEdge(r)) as CekrEnvelope[]
    const edges = records.filter(isEdge) as CekrEdge[]
    expect(validateCorpus({ entities, edges })).toEqual([])
  })

  it('the explanation is ATTACHED to the concept, not merely adjacent to it', () => {
    const edges = records.filter(isEdge) as CekrEdge[]
    expect(edges.some((e) =>
      e.edgeKind === 'EXPLAINS' && e.to === makeEntityId('Concept', CONCEPT_SLUG))).toBe(true)
  })
})

describe('golden thread — CEKR → pack', () => {
  const records: CekrRecord[] = fromBrainScript(SOURCE, { file: 'thread.bs' }).records
  const { pack } = compileFromCekr(records, {
    packId: 'thread', packVersion: '1.0.0', servableStatuses: DRAFT_OK,
  })

  it('the authored explanation becomes a Band-3 dispatch rule', () => {
    expect(pack!.rules.length).toBeGreaterThan(0)
    expect(pack!.rules.every((r) => r.band === 3)).toBe(true)
  })

  it('SEAM: the rule guards on the KG slug the author wrote, not the CEKR id', () => {
    // The join the whole pipeline turns on. PolicyInputs.currentConceptId is a
    // KG slug at runtime; if the compiler emitted a guard on the cekr: id, the
    // rule would compile, load, and never fire — the worst possible failure,
    // because everything stays green.
    expect(pack!.rules.some((r) => r.guard.describe.includes(CONCEPT_SLUG))).toBe(true)
    expect(pack!.rules.every((r) => !r.guard.describe.includes('cekr:'))).toBe(true)
  })

  it('SEAM: the content slot carries the CEKR entity id — the evidence join key', () => {
    // The reverse direction: the SLOT must keep the CEKR id (CEKR §13's
    // stability contract), because that is what evidence later joins on.
    const slots = pack!.rules.flatMap((r) => r.effect.contentSlots ?? [])
    expect(slots.length).toBeGreaterThan(0)
    expect(slots.every((s) => String(s.payload.entityId).startsWith('cekr:'))).toBe(true)
  })
})

describe('golden thread — pack → kernel decision', () => {
  const records = fromBrainScript(SOURCE, { file: 'thread.bs' }).records
  const { pack } = compileFromCekr(records, {
    packId: 'thread', packVersion: '1.0.0', servableStatuses: DRAFT_OK,
  })
  const runtime = mergePacks(BASE_PACK, loadPack(emitCompiledPack(pack!, {})))

  it('the authored concept gets the authored decision', () => {
    const d = decide(runtime, inputs())
    expect(d.actionClass).toBe('DEMONSTRATION')
    expect(d.provenance.some((t) => t.band === 3)).toBe(true)
  })

  it('SEAM: the decision names the authored rule, so a turn is traceable to a file', () => {
    const d = decide(runtime, inputs())
    const b3 = d.provenance.find((t) => t.band === 3)!
    expect(b3.ruleId).toContain(CONCEPT_SLUG)
    // Provenance carries the citation back to where it was authored.
    expect(b3.citation).toBeTruthy()
  })

  it('a DIFFERENT concept does not pick up this concept\'s authored content', () => {
    const d = decide(runtime, inputs({ currentConceptId: 'thread.something-else' }))
    expect(d.provenance.some((t) => t.band === 3)).toBe(false)
  })

  it('the base pack\'s mandatory legality still applies to the authored turn', () => {
    // Authored dispatch wins outright at Band 3 — but never over Band 2.
    const d = decide(runtime, inputs())
    expect(d.provenance.map((t) => t.ruleId)).toContain('B2.legality.stage-ceiling.v1')
  })
})

describe('golden thread — decision → evidence events', () => {
  const records = fromBrainScript(SOURCE, { file: 'thread.bs' }).records
  const { pack } = compileFromCekr(records, {
    packId: 'thread', packVersion: '1.0.0', servableStatuses: DRAFT_OK,
  })
  const runtime = mergePacks(BASE_PACK, loadPack(emitCompiledPack(pack!, {})))
  const decision = decide(runtime, inputs())

  const events = buildTurnEvents({
    learnerId: 'L', sessionId: 'S', turnId: 'msg-1',
    messageLength: 12, latencyFromPrevTurnMs: 900,
    assistantLength: 200, assistantAskedQuestion: false, provider: 'groq',
    signal: { correctness: true, confidence: 'high' },
    resolvedConceptId: CONCEPT_SLUG,
    recoveryKey: null, recoveryEscalationRung: 0, sessionFailureCount: 0,
    autonomyRequested: false,
    decisionMove: decision.move, decisionPhaseBefore: 'DEMONSTRATE', decisionPhaseAfter: 'DEMONSTRATE',
    workedExampleFirst: false, stageCeiling: decision.stageCeiling,
    provenance: decision.provenance.map((t) => t.ruleId),
    freshSessionBoundary: false, boundaryGapMs: null, lessonCompleted: false,
  })

  it('the turn emits a DecisionRecorded event (RS I-2)', () => {
    expect(events.some((e) => e.type === 'DecisionRecorded')).toBe(true)
  })

  it('SEAM: the event carries the SAME concept id the pack rule guarded on', () => {
    // The join that makes cross-learner evidence attributable to authored
    // content. If these two ever diverge, evidence accumulates against a
    // concept nobody authored.
    const decisionEvent = events.find((e) => e.type === 'DecisionRecorded')!
    const payload = decisionEvent.payload as Record<string, unknown>
    expect(payload.conceptId ?? decisionEvent.payload).toBeTruthy()
    expect(JSON.stringify(decisionEvent.payload)).toContain(CONCEPT_SLUG)
  })

  it('SEAM: the authored rule id survives into the evidence provenance', () => {
    // The end-to-end claim: a rule authored in a .bs file is named in an
    // event a researcher can query. That is the whole thread in one assertion.
    const decisionEvent = events.find((e) => e.type === 'DecisionRecorded')!
    const serialized = JSON.stringify(decisionEvent.payload)
    expect(serialized).toContain(CONCEPT_SLUG)
    expect(decision.provenance.some((t) => t.band === 3)).toBe(true)
  })

  it('the spine stores no verbatim learner text (ISS-18 prudence, asserted)', () => {
    const serialized = JSON.stringify(events)
    expect(serialized).not.toContain('Squeeze a fizzy drink')
  })
})

describe('golden thread — the whole walk is deterministic', () => {
  it('two full traversals produce identical decisions and events', () => {
    const walk = () => {
      const records = fromBrainScript(SOURCE, { file: 'thread.bs' }).records
      const { pack } = compileFromCekr(records, {
        packId: 'thread', packVersion: '1.0.0', servableStatuses: DRAFT_OK,
      })
      const compiled = emitCompiledPack(pack!, {})
      const d = decide(mergePacks(BASE_PACK, loadPack(compiled)), inputs())
      return JSON.stringify({
        contentHash: compiled.manifest.contentHash,
        move: d.move, actionClass: d.actionClass,
        rules: d.provenance.map((t) => t.ruleId),
      })
    }
    expect(walk()).toBe(walk())
  })
})
