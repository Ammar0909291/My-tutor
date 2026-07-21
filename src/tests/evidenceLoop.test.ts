/**
 * Evidence Loop tests (ADR 13 Phase 2): Evidence Reader normalization,
 * Learning Analytics correctness, Authoring Feedback findings, and
 * per-Educational-Package feedback — all over the pure core with injected
 * rows (no DB, no fs).
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
  readLessonEvidence, parseProbeOutcome, parseRecoveryState, subjectOfConcept,
  classifyLessonOutcome,
  type EvidenceEventRow, type EvidenceCorpus, type LessonEvidence,
} from '@/lib/teaching/evidence/evidenceReader'
import {
  computeLearningAnalytics, mostFailedConcepts, mostCommonMisconceptions,
  teachingActionSuccessRates, recoverySuccessRates, explanationEffectiveness, hintEffectiveness,
  probeEffectiveness, averageMasteryTime, conceptsRequiringRepeatedRemediation, dropOffPoints,
} from '@/lib/teaching/evidence/learningAnalytics'
import {
  buildAuthoringFeedback, renderAuthoringFeedbackMarkdown, DEFAULT_AUTHORING_THRESHOLDS,
  type PackageInspector,
} from '@/lib/teaching/evidence/authoringFeedback'
import { buildPackageFeedback, renderPackageFeedbackMarkdown } from '@/lib/teaching/evidence/packageFeedback'

// ── Fixture builders ─────────────────────────────────────────────────────────

let seq = 0
beforeEach(() => { seq = 0 })
const T0 = new Date('2026-07-01T10:00:00Z').getTime()
const at = (min: number) => new Date(T0 + min * 60_000)

function ev(over: Partial<EvidenceEventRow> & { category: string; outcome: string }): EvidenceEventRow {
  seq++
  return {
    eventId: `e${String(seq).padStart(4, '0')}`,
    occurredAt: at(seq),
    userId: 'u1',
    sessionId: 's1',
    turnId: `t${seq}`,
    conceptId: 'phys.therm.entropy',
    language: 'en',
    misconceptionId: null,
    assetId: null,
    strength: 0,
    rawScore: null,
    ...over,
  }
}

const probe = (passed: boolean, over: Partial<EvidenceEventRow> = {}) =>
  ev({
    category: 'PROBE_OUTCOME',
    outcome: `${passed ? 'pass' : 'fail'}|conf=high|confusion=false`,
    strength: passed ? 1 : 0,
    rawScore: 12,
    ...over,
  })

const mc = (phrase: string, over: Partial<EvidenceEventRow> = {}) =>
  ev({ category: 'MISCONCEPTION_DETECTED', outcome: phrase, strength: 0.5, ...over })

const recovery = (state: string, over: Partial<EvidenceEventRow> = {}) =>
  ev({ category: 'LEARNER_FEEDBACK', outcome: `recovery:${state}`, ...over })

const assetShown = (over: Partial<EvidenceEventRow> = {}) =>
  ev({ category: 'ASSET_SHOWN', outcome: 'shown', strength: 0, ...over })

const hintShown = (over: Partial<EvidenceEventRow> = {}) =>
  ev({ category: 'LEARNER_FEEDBACK', outcome: 'hint:shown', strength: 0, ...over })

const inspectorWith = (kinds: string[]): PackageInspector => (conceptId) => ({
  packageId: `${conceptId}-package`,
  contentHash: 'sha256:feedbeef',
  assetKinds: new Set(kinds),
})

const fullInspector = inspectorWith(['core_explanation', 'worked_example', 'misconception', 'mastery_probe', 'session_flow'])

// ── Reader: outcome-string parsers ───────────────────────────────────────────

describe('evidence reader — parsers (inverse of route.ts writer formats)', () => {
  it('parses the full PROBE_OUTCOME outcome string', () => {
    const p = parseProbeOutcome(probe(true, { outcome: 'pass|conf=low|confusion=true|placement=below', rawScore: 44 }))
    expect(p.passed).toBe(true)
    expect(p.confidence).toBe('low')
    expect(p.confusion).toBe(true)
    expect(p.placement).toBe('below')
    expect(p.latencySec).toBe(44)
  })

  it('maps conf=na to null confidence and missing placement to null', () => {
    const p = parseProbeOutcome(probe(false, { outcome: 'fail|conf=na|confusion=false' }))
    expect(p.passed).toBe(false)
    expect(p.confidence).toBeNull()
    expect(p.placement).toBeNull()
  })

  it('parses recovery states and rejects non-recovery feedback', () => {
    expect(parseRecoveryState('recovery:i_cant_do_this')).toBe('i_cant_do_this')
    expect(parseRecoveryState('thumbs_up')).toBeNull()
  })

  it('derives subject from the concept id prefix, passing unknown prefixes through', () => {
    expect(subjectOfConcept('phys.therm.entropy')).toBe('physics')
    expect(subjectOfConcept('math.arith.fractions')).toBe('mathematics')
    expect(subjectOfConcept('history.ww2')).toBe('history')
  })
})

// ── Reader: aggregation ──────────────────────────────────────────────────────

describe('evidence reader — lesson aggregation', () => {
  it('groups events into one lesson per (user, session, concept) with ordered inner arrays', () => {
    const corpus: EvidenceCorpus = {
      events: [
        probe(false),
        mc('entropy is just disorder'),
        recovery('im_stuck'),
        probe(true),
        // second lesson: different concept, same session
        probe(true, { conceptId: 'phys.therm.first-law' }),
      ],
      strategyEvents: [
        { userId: 'u1', topicSlug: 'thermo', strategy: 'MISCONCEPTION_REPAIR', sessionId: 's1', createdAt: at(1.5) },
      ],
      topicProgress: [{
        userId: 'u1', subjectSlug: 'physics', topicSlug: 'phys.therm.entropy',
        status: 'IN_PROGRESS', masteryPct: 65, attempts: 2, revisionCount: 0,
        createdAt: at(0), completedAt: null, updatedAt: at(10),
      }],
      mistakes: [{ userId: 'u1', subjectSlug: 'physics', topicSlug: 'phys.therm.entropy', category: 'signal_confident_wrong', createdAt: at(1) }],
      packageIndex: (id) => ({ packageId: `${id}-package`, contentHash: 'sha256:abc' }),
    }
    const lessons = readLessonEvidence(corpus)
    expect(lessons).toHaveLength(2)

    const entropy = lessons.find((l) => l.conceptId === 'phys.therm.entropy')!
    expect(entropy.subject).toBe('physics')
    expect(entropy.packageId).toBe('phys.therm.entropy-package')
    expect(entropy.probes.map((p) => p.passed)).toEqual([false, true])
    expect(entropy.misconceptions).toHaveLength(1)
    expect(entropy.misconceptions[0].phrase).toBe('entropy is just disorder')
    expect(entropy.recoveries.map((r) => r.state)).toEqual(['im_stuck'])
    expect(entropy.mistakes.map((m) => m.category)).toEqual(['signal_confident_wrong'])
    expect(entropy.teachingActions.map((t) => t.strategy)).toEqual(['MISCONCEPTION_REPAIR'])
    expect(entropy.masteryPct).toBe(65)
    expect(entropy.outcome).toBe('progressing') // last probe passed after recovery

    const firstLaw = lessons.find((l) => l.conceptId === 'phys.therm.first-law')!
    expect(firstLaw.probes).toHaveLength(1)
    expect(firstLaw.masteryPct).toBeNull()
  })

  it('is deterministic — shuffled input rows produce identical output', () => {
    const events = [probe(false), mc('x'), probe(true), recovery('im_stuck'), probe(true, { conceptId: 'phys.wave.beats' })]
    const a = readLessonEvidence({ events })
    const b = readLessonEvidence({ events: [...events].reverse() })
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
  })
})

describe('evidence reader — lesson outcome classification', () => {
  const P = (passed: boolean, min: number) => ({ occurredAt: at(min), passed, confidence: null, confusion: false, placement: null, latencySec: null })
  const R = (min: number) => ({ occurredAt: at(min), state: 'im_stuck' })

  it('mastered wins on TopicProgress status regardless of probe tail', () => {
    expect(classifyLessonOutcome([P(false, 1)], [], [], 'MASTERED')).toBe('mastered')
  })
  it('progressing when the last probe passed', () => {
    expect(classifyLessonOutcome([P(false, 1), P(true, 2)], [R(1.5)], [], null)).toBe('progressing')
  })
  it('abandoned when the terminal event is a failed probe (failure-then-vanish)', () => {
    expect(classifyLessonOutcome([P(true, 1), P(false, 2)], [], [], null)).toBe('abandoned')
  })
  it('abandoned when the terminal event is a recovery', () => {
    expect(classifyLessonOutcome([P(true, 1)], [R(2)], [], null)).toBe('abandoned')
  })
  it('no_signal with no evidence at all', () => {
    expect(classifyLessonOutcome([], [], [], null)).toBe('no_signal')
  })
})

// ── Analytics ────────────────────────────────────────────────────────────────

function lessonsFrom(events: EvidenceEventRow[], extra: Partial<EvidenceCorpus> = {}): LessonEvidence[] {
  return readLessonEvidence({ events, ...extra })
}

describe('learning analytics', () => {
  it('mostFailedConcepts ranks by pass rate and honors minSample', () => {
    const events = [
      // entropy: 1 pass / 4 fail = 20%
      probe(true), probe(false), probe(false), probe(false), probe(false),
      // beats: 4 pass / 1 fail = 80%
      ...[true, true, true, true, false].map((p) => probe(p, { conceptId: 'phys.wave.beats', sessionId: 's2' })),
      // one lonely failure — below minSample, must NOT appear
      probe(false, { conceptId: 'math.arith.fractions', sessionId: 's3' }),
    ]
    const ranked = mostFailedConcepts(lessonsFrom(events), 5)
    expect(ranked.map((r) => r.id)).toEqual(['phys.therm.entropy', 'phys.wave.beats'])
    expect(ranked[0].stat.rate).toBeCloseTo(0.2)
    expect(ranked[0].subject).toBe('physics')
  })

  it('mostCommonMisconceptions groups by slug when attributed, by phrase otherwise', () => {
    const events = [
      mc('entropy is disorder', { misconceptionId: 'MC-ENTROPY-IS-DISORDER' }),
      mc('entropy means messy', { misconceptionId: 'MC-ENTROPY-IS-DISORDER', userId: 'u2', sessionId: 's9' }),
      mc('heat is a substance', { conceptId: 'phys.therm.heat-transfer' }),
    ]
    const stats = mostCommonMisconceptions(lessonsFrom(events))
    expect(stats[0].id).toBe('MC-ENTROPY-IS-DISORDER')
    expect(stats[0].detections).toBe(2)
    expect(stats[0].learners).toBe(2)
    expect(stats[0].samplePhrases).toContain('entropy is disorder')
    expect(stats[1].id).toMatch(/^phrase:heat is a substance/)
  })

  it('teachingActionSuccessRates joins each strategy to the FIRST following probe (L5)', () => {
    const events = [probe(false), probe(true)]
    const lessons = lessonsFrom(events, {
      strategyEvents: [
        // fires before the failing probe → counted as failure
        { userId: 'u1', topicSlug: 't', strategy: 'DIRECT_EXPLANATION', sessionId: 's1', createdAt: at(0.5) },
        // fires between fail and pass → counted as success
        { userId: 'u1', topicSlug: 't', strategy: 'MISCONCEPTION_REPAIR', sessionId: 's1', createdAt: at(1.5) },
      ],
    })
    const stats = teachingActionSuccessRates(lessons)
    const repair = stats.find((s) => s.id === 'MISCONCEPTION_REPAIR')!
    const direct = stats.find((s) => s.id === 'DIRECT_EXPLANATION')!
    expect(repair.stat).toMatchObject({ successes: 1, failures: 0, rate: 1 })
    expect(direct.stat).toMatchObject({ successes: 0, failures: 1, rate: 0 })
  })

  it('recoverySuccessRates counts a recovery as successful only when a later probe passes', () => {
    const events = [
      recovery('im_stuck'),      // followed by a pass → success
      probe(true),
      recovery('i_cant_do_this'), // nothing after → failure
    ]
    const stats = recoverySuccessRates(lessonsFrom(events))
    expect(stats.find((s) => s.state === 'im_stuck')!.stat.rate).toBe(1)
    expect(stats.find((s) => s.state === 'i_cant_do_this')!.stat.rate).toBe(0)
  })

  it('explanationEffectiveness joins an explanation to the FIRST later probe, keyed by assetId when present', () => {
    const events = [
      // Explanation Memory asset, followed by a pass → success for the asset
      assetShown({ assetId: 'asset-123' }),
      probe(true),
      // LLM-generated explanation (no assetId), followed by a fail → failure for the concept bucket
      assetShown({ sessionId: 's2' }),
      probe(false, { sessionId: 's2' }),
      // shown with nothing after it in the lesson → must NOT count either way
      assetShown({ sessionId: 's3' }),
    ]
    const stats = explanationEffectiveness(lessonsFrom(events))
    const asset = stats.find((s) => s.id === 'asset-123')!
    const llmGenerated = stats.find((s) => s.fromAssetLibrary === false)!
    expect(asset.stat).toMatchObject({ successes: 1, failures: 0, rate: 1 })
    expect(asset.fromAssetLibrary).toBe(true)
    expect(llmGenerated.stat).toMatchObject({ successes: 0, failures: 1, rate: 0 })
    // the un-followed s3 shown event contributes to neither bucket
    const totalCounted = stats.reduce((sum, s) => sum + s.stat.total, 0)
    expect(totalCounted).toBe(2)
  })

  it('hintEffectiveness joins a hint to the FIRST following probe, and ignores recovery/other feedback', () => {
    const events = [
      hintShown(),               // followed by a pass → success
      probe(true),
      hintShown({ sessionId: 's2' }), // followed by a fail → failure
      probe(false, { sessionId: 's2' }),
      hintShown({ sessionId: 's3' }), // nothing after → must not count
      recovery('im_stuck', { sessionId: 's4' }), // a different LEARNER_FEEDBACK outcome — must not be read as a hint
      probe(true, { sessionId: 's4' }),
    ]
    const stats = hintEffectiveness(lessonsFrom(events))
    const entropy = stats.find((s) => s.conceptId === 'phys.therm.entropy')!
    expect(entropy.stat).toMatchObject({ successes: 1, failures: 1, total: 2 })
  })

  it('probeEffectiveness flags non-discriminating probes at sample size', () => {
    const events = [
      // placement probe everyone passes (6/6) → not discriminating
      ...Array.from({ length: 6 }, (_, i) =>
        probe(true, { outcome: 'pass|conf=na|confusion=false|placement=at', userId: `u${i}`, sessionId: `s${i}` })),
      // ordinary probe with mixed outcomes → discriminating
      ...[true, false, true, false, true, false].map((p, i) =>
        probe(p, { conceptId: 'phys.wave.beats', userId: `u${i}`, sessionId: `s${i}` })),
    ]
    const stats = probeEffectiveness(lessonsFrom(events), 5)
    const placement = stats.find((s) => s.probe === 'at')!
    const ordinary = stats.find((s) => s.conceptId === 'phys.wave.beats')!
    expect(placement.discriminates).toBe(false)
    expect(placement.stat.rate).toBe(1)
    expect(ordinary.discriminates).toBe(true)
  })

  it('averageMasteryTime measures first evidence → first successful lesson end', () => {
    const events = [probe(false), probe(true)] // minutes 1 and 2 → progressing
    const stats = averageMasteryTime(lessonsFrom(events))
    expect(stats).toHaveLength(1)
    expect(stats[0].conceptId).toBe('phys.therm.entropy')
    expect(stats[0].learners).toBe(1)
    expect(stats[0].avgMs).toBe(60_000) // one minute between the two events
  })

  it('conceptsRequiringRepeatedRemediation needs the SAME learner in ≥2 lessons', () => {
    const events = [
      mc('a', { sessionId: 's1' }),
      mc('b', { sessionId: 's2' }),                    // same user, second lesson → repeat
      mc('c', { userId: 'u2', sessionId: 's3' }),      // different learner, one lesson → not a repeat
    ]
    const stats = conceptsRequiringRepeatedRemediation(lessonsFrom(events))
    expect(stats).toHaveLength(1)
    expect(stats[0]).toMatchObject({ conceptId: 'phys.therm.entropy', learners: 1, repeatDetections: 2 })
  })

  it('dropOffPoints ranks concepts by abandoned-lesson rate', () => {
    const events = [
      // 3 lessons on entropy, 2 abandoned (terminal fail)
      probe(false, { sessionId: 'sA' }),
      probe(false, { sessionId: 'sB' }),
      probe(true, { sessionId: 'sC' }),
      // 3 lessons on beats, none abandoned
      probe(true, { conceptId: 'phys.wave.beats', sessionId: 'sD' }),
      probe(true, { conceptId: 'phys.wave.beats', sessionId: 'sE' }),
      probe(true, { conceptId: 'phys.wave.beats', sessionId: 'sF' }),
    ]
    const stats = dropOffPoints(lessonsFrom(events), 3)
    expect(stats[0]).toMatchObject({ conceptId: 'phys.therm.entropy', abandonedLessons: 2, totalLessons: 3 })
    expect(stats[1].rate).toBe(0)
  })

  it('computeLearningAnalytics bundles every metric deterministically', () => {
    const events = [probe(false), mc('x'), recovery('im_stuck'), probe(true)]
    const lessons = lessonsFrom(events)
    const a = computeLearningAnalytics(lessons)
    const b = computeLearningAnalytics(lessons)
    expect(a.lessonsAnalyzed).toBe(1)
    expect(a.conceptsSeen).toBe(1)
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
  })
})

// ── Authoring feedback ───────────────────────────────────────────────────────

describe('authoring feedback', () => {
  function failingConceptLessons(): LessonEvidence[] {
    // 6 probes, 1 pass → 17% pass rate, above minSample
    const events = [probe(true), ...Array.from({ length: 5 }, () => probe(false))]
    return lessonsFrom(events)
  }

  it('flags blueprint_needs_revision on sustained probe failure', () => {
    const lessons = failingConceptLessons()
    const report = buildAuthoringFeedback(computeLearningAnalytics(lessons), lessons, fullInspector)
    const finding = report.findings.find((f) => f.kind === 'blueprint_needs_revision')!
    expect(finding.conceptId).toBe('phys.therm.entropy')
    expect(finding.severity).toBe('high') // 17% ≤ half of the 50% threshold
    expect(finding.evidence).toContain('17%')
  })

  it('flags missing_worked_examples only when the package lacks them AND the concept fails', () => {
    const lessons = failingConceptLessons()
    const analytics = computeLearningAnalytics(lessons)
    const withWe = buildAuthoringFeedback(analytics, lessons, fullInspector)
    expect(withWe.findings.some((f) => f.kind === 'missing_worked_examples')).toBe(false)
    const withoutWe = buildAuthoringFeedback(analytics, lessons, inspectorWith(['core_explanation']))
    expect(withoutWe.findings.some((f) => f.kind === 'missing_worked_examples')).toBe(true)
  })

  it('flags missing_recovery_strategy when recoveries fire and the package has no flow/rules', () => {
    const lessons = lessonsFrom([recovery('im_stuck'), probe(true)])
    const report = buildAuthoringFeedback(computeLearningAnalytics(lessons), lessons, inspectorWith(['worked_example']))
    expect(report.findings.some((f) => f.kind === 'missing_recovery_strategy')).toBe(true)
  })

  it('flags weak_misconception on repeat detections and weak_probe on non-discrimination', () => {
    const events = [
      mc('a', { sessionId: 's1' }), mc('b', { sessionId: 's2' }),
      ...Array.from({ length: 6 }, (_, i) =>
        probe(true, { outcome: 'pass|conf=na|confusion=false|placement=at', userId: `u${i}`, sessionId: `p${i}` })),
    ]
    const lessons = lessonsFrom(events)
    const report = buildAuthoringFeedback(computeLearningAnalytics(lessons), lessons, fullInspector)
    expect(report.findings.some((f) => f.kind === 'weak_misconception')).toBe(true)
    expect(report.findings.some((f) => f.kind === 'weak_probe')).toBe(true)
  })

  it('flags weak_package on drop-off rate', () => {
    const events = [
      probe(false, { sessionId: 'sA' }), probe(false, { sessionId: 'sB' }), probe(true, { sessionId: 'sC' }),
    ]
    const lessons = lessonsFrom(events)
    const report = buildAuthoringFeedback(computeLearningAnalytics(lessons), lessons, fullInspector)
    const weak = report.findings.find((f) => f.kind === 'weak_package')!
    expect(weak.evidence).toContain('2 of 3')
  })

  it('produces an empty, well-formed report on an empty evidence base', () => {
    const report = buildAuthoringFeedback(computeLearningAnalytics([]), [], fullInspector)
    expect(report.findings).toEqual([])
    expect(renderAuthoringFeedbackMarkdown(report)).toContain('No findings')
  })

  it('renders deterministic markdown (same input → same bytes) sorted high-severity first', () => {
    const lessons = failingConceptLessons()
    const analytics = computeLearningAnalytics(lessons)
    const md1 = renderAuthoringFeedbackMarkdown(buildAuthoringFeedback(analytics, lessons, inspectorWith([])))
    const md2 = renderAuthoringFeedbackMarkdown(buildAuthoringFeedback(analytics, lessons, inspectorWith([])))
    expect(md1).toBe(md2)
    expect(md1).toContain('| Severity | Finding | Concept |')
    const firstDataRow = md1.split('\n').find((l) => l.startsWith('| high') || l.startsWith('| medium'))
    expect(firstDataRow).toContain('| high |')
    expect(DEFAULT_AUTHORING_THRESHOLDS.failingPassRate).toBe(0.5)
  })
})

// ── Package feedback ─────────────────────────────────────────────────────────

describe('educational package feedback', () => {
  const packageIndex = (id: string) => ({ packageId: `${id}-package`, contentHash: 'sha256:feedbeef' })

  it('produces the full per-package summary from lesson evidence', () => {
    const events = [
      probe(false), mc('entropy is disorder', { misconceptionId: 'MC-ENTROPY-IS-DISORDER' }),
      recovery('im_stuck'), probe(true),
      probe(true, { userId: 'u2', sessionId: 's2' }),
    ]
    const lessons = readLessonEvidence({
      events,
      packageIndex,
      strategyEvents: [{ userId: 'u1', topicSlug: 't', strategy: 'MISCONCEPTION_REPAIR', sessionId: 's1', createdAt: at(2) }],
      topicProgress: [{
        userId: 'u2', subjectSlug: 'physics', topicSlug: 'phys.therm.entropy',
        status: 'MASTERED', masteryPct: 92, attempts: 1, revisionCount: 0,
        createdAt: at(0), completedAt: at(9), updatedAt: at(9),
      }],
    })
    const [fb] = buildPackageFeedback(lessons, fullInspector)
    expect(fb.packageId).toBe('phys.therm.entropy-package')
    expect(fb.subject).toBe('physics')
    expect(fb.teachingEffectiveness).toMatchObject({ lessons: 2, learners: 2, probeOutcomes: 3 })
    expect(fb.teachingEffectiveness.probePassRate).toBeCloseTo(2 / 3)
    expect(fb.teachingEffectiveness.strategiesObserved).toEqual(['MISCONCEPTION_REPAIR'])
    expect(fb.evidenceSummary).toMatchObject({ probes: 3, misconceptionDetections: 1, recoveries: 1 })
    expect(fb.masterySummary.mastered).toBe(1)
    expect(fb.masterySummary.progressing).toBe(1)
    expect(fb.failureSummary.failedProbes).toBe(1)
    expect(fb.failureSummary.topMisconceptions[0]).toEqual({ id: 'MC-ENTROPY-IS-DISORDER', detections: 1 })
    expect(fb.failureSummary.topRecoveryStates[0]).toEqual({ state: 'im_stuck', count: 1 })
  })

  it('skips concepts with no compiled package and recommends without editing anything', () => {
    const lessons = readLessonEvidence({ events: [probe(true)] }) // no packageIndex → packageId null
    expect(buildPackageFeedback(lessons, fullInspector)).toEqual([])
  })

  it('recommends probe coverage when a package taught with zero probe evidence', () => {
    const lessons = readLessonEvidence({ events: [mc('phrase')], packageIndex })
    const [fb] = buildPackageFeedback(lessons, fullInspector)
    expect(fb.recommendations.some((r) => r.includes('never verified'))).toBe(true)
  })

  it('recommends worked examples when misconceptions fire and the package has none', () => {
    const lessons = readLessonEvidence({ events: [mc('phrase'), probe(true)], packageIndex })
    const [fb] = buildPackageFeedback(lessons, inspectorWith(['core_explanation', 'misconception']))
    expect(fb.recommendations.some((r) => r.includes('no worked examples'))).toBe(true)
  })

  it('renders deterministic markdown with every required section', () => {
    const lessons = readLessonEvidence({ events: [probe(false), probe(true)], packageIndex })
    const [fb] = buildPackageFeedback(lessons, fullInspector)
    const md = renderPackageFeedbackMarkdown(fb)
    expect(md).toContain('## Teaching effectiveness')
    expect(md).toContain('## Evidence summary')
    expect(md).toContain('## Mastery summary')
    expect(md).toContain('## Failure summary')
    expect(md).toContain('## Improvement recommendations')
    expect(renderPackageFeedbackMarkdown(fb)).toBe(md)
  })
})

// ── End-to-end determinism over the whole loop ───────────────────────────────

describe('evidence loop — end-to-end determinism', () => {
  it('raw events → reader → analytics → authoring + package reports is stable byte-for-byte', () => {
    const events = [
      probe(false), mc('entropy is disorder'), recovery('im_stuck'), probe(true),
      probe(false, { conceptId: 'phys.wave.beats', sessionId: 's2' }),
      mc('beats are loudness', { conceptId: 'phys.wave.beats', sessionId: 's2' }),
    ]
    const run = () => {
      const lessons = readLessonEvidence({ events, packageIndex: (id) => ({ packageId: `${id}-package`, contentHash: 'sha256:x' }) })
      const analytics = computeLearningAnalytics(lessons)
      const authoring = renderAuthoringFeedbackMarkdown(buildAuthoringFeedback(analytics, lessons, fullInspector))
      const packages = buildPackageFeedback(lessons, fullInspector).map(renderPackageFeedbackMarkdown).join('\n')
      return authoring + packages
    }
    expect(run()).toBe(run())
  })
})
