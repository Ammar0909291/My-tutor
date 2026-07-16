/**
 * Educational Package Feedback — ADR 13 Phase 2, per-package view of the
 * evidence loop. For every Educational Package that has lesson evidence,
 * produce a deterministic feedback document: teaching effectiveness,
 * evidence/mastery/failure summaries, and rule-based improvement
 * recommendations.
 *
 * READ-ONLY by design: this module never edits a package (packages are
 * compiled artifacts; only the blueprint→compile path may change them) and
 * never calls packRegistry. Recommendations guide the human authoring loop.
 */
import type { LessonEvidence } from './evidenceReader'
import type { PackageInspector } from './authoringFeedback'

export interface PackageFeedback {
  packageId: string
  conceptId: string
  contentHash: string
  subject: string
  teachingEffectiveness: {
    lessons: number
    learners: number
    probePassRate: number | null   // null when no probe evidence yet
    probeOutcomes: number
    strategiesObserved: string[]
  }
  evidenceSummary: {
    probes: number
    misconceptionDetections: number
    recoveries: number
    mistakes: number
  }
  masterySummary: {
    mastered: number
    progressing: number
    struggling: number
    abandoned: number
    noSignal: number
    avgMasteryPct: number | null
  }
  failureSummary: {
    failedProbes: number
    topMisconceptions: Array<{ id: string; detections: number }>
    topRecoveryStates: Array<{ state: string; count: number }>
  }
  recommendations: string[]
}

function pct(n: number): string {
  return `${(n * 100).toFixed(0)}%`
}

/** One PackageFeedback per package with evidence. Deterministic: sorted by
 *  conceptId; recommendation strings are pure functions of the numbers. */
export function buildPackageFeedback(
  lessons: LessonEvidence[],
  inspectPackage: PackageInspector,
): PackageFeedback[] {
  const byConcept = new Map<string, LessonEvidence[]>()
  for (const l of lessons) {
    if (!l.packageId) continue // no compiled package → nothing to give feedback ON
    const arr = byConcept.get(l.conceptId) ?? []
    arr.push(l)
    byConcept.set(l.conceptId, arr)
  }

  const out: PackageFeedback[] = []
  for (const [conceptId, conceptLessons] of [...byConcept.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const pkg = inspectPackage(conceptId)
    if (!pkg) continue

    let pass = 0, fail = 0, mcCount = 0, recCount = 0, mistakeCount = 0
    const strategies = new Set<string>()
    const mcById = new Map<string, number>()
    const recByState = new Map<string, number>()
    const outcomes = { mastered: 0, progressing: 0, struggling: 0, abandoned: 0, no_signal: 0 }
    const masteryPcts: number[] = []
    const learners = new Set<string>()

    for (const l of conceptLessons) {
      learners.add(l.userId)
      outcomes[l.outcome]++
      if (l.masteryPct !== null) masteryPcts.push(l.masteryPct)
      for (const p of l.probes) (p.passed ? pass++ : fail++)
      for (const m of l.misconceptions) {
        mcCount++
        const id = m.misconceptionId ?? m.phrase.toLowerCase().slice(0, 60)
        mcById.set(id, (mcById.get(id) ?? 0) + 1)
      }
      for (const r of l.recoveries) {
        recCount++
        recByState.set(r.state, (recByState.get(r.state) ?? 0) + 1)
      }
      mistakeCount += l.mistakes.length
      for (const ta of l.teachingActions) strategies.add(ta.strategy)
    }

    const probeTotal = pass + fail
    const passRate = probeTotal > 0 ? pass / probeTotal : null

    const recommendations: string[] = []
    if (probeTotal === 0) {
      recommendations.push('No probe evidence yet — the package has been taught but never verified. Ensure mastery probes are being asked before drawing any effectiveness conclusion.')
    } else if (passRate !== null && passRate < 0.5) {
      recommendations.push(`Probe pass rate is ${pct(passRate)} — revise the explanation and worked-example progression in the source blueprint before adding new content.`)
    }
    if (outcomes.abandoned > 0 && outcomes.abandoned >= (conceptLessons.length * 0.3)) {
      recommendations.push(`${outcomes.abandoned} of ${conceptLessons.length} lessons ended failure-then-vanish — audit entry difficulty and the first failure experience; this is a churn point.`)
    }
    if (mcCount > 0 && !pkg.assetKinds.has('worked_example')) {
      recommendations.push('Misconceptions are being detected but the package carries no worked examples — author examples that collide with the detected misconceptions.')
    }
    if (recCount > 0 && !pkg.assetKinds.has('session_flow') && !pkg.assetKinds.has('adaptive_rule')) {
      recommendations.push('Learners hit recovery states but the package authors no session flow or adaptive rules — add concept-specific recovery handling.')
    }
    const topMc = [...mcById.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 3)
    if (topMc.length > 0 && !pkg.assetKinds.has('misconception')) {
      recommendations.push('Misconceptions detected in the field but the package has no misconception assets — transcribe the detected phrases into the blueprint misconception register.')
    }
    if (recommendations.length === 0) {
      recommendations.push('No evidence-backed weaknesses at current thresholds — keep collecting evidence.')
    }

    out.push({
      packageId: pkg.packageId,
      conceptId,
      contentHash: pkg.contentHash,
      subject: conceptLessons[0].subject,
      teachingEffectiveness: {
        lessons: conceptLessons.length,
        learners: learners.size,
        probePassRate: passRate,
        probeOutcomes: probeTotal,
        strategiesObserved: [...strategies].sort(),
      },
      evidenceSummary: {
        probes: probeTotal,
        misconceptionDetections: mcCount,
        recoveries: recCount,
        mistakes: mistakeCount,
      },
      masterySummary: {
        mastered: outcomes.mastered,
        progressing: outcomes.progressing,
        struggling: outcomes.struggling,
        abandoned: outcomes.abandoned,
        noSignal: outcomes.no_signal,
        avgMasteryPct: masteryPcts.length > 0
          ? masteryPcts.reduce((a, b) => a + b, 0) / masteryPcts.length
          : null,
      },
      failureSummary: {
        failedProbes: fail,
        topMisconceptions: topMc.map(([id, detections]) => ({ id, detections })),
        topRecoveryStates: [...recByState.entries()]
          .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
          .slice(0, 3)
          .map(([state, count]) => ({ state, count })),
      },
      recommendations,
    })
  }
  return out
}

/** Deterministic markdown for one package's feedback document. */
export function renderPackageFeedbackMarkdown(fb: PackageFeedback): string {
  const te = fb.teachingEffectiveness
  const ms = fb.masterySummary
  const lines: string[] = []
  lines.push(`# Package Feedback — ${fb.conceptId}`)
  lines.push('')
  lines.push(`Package: \`${fb.packageId}\` (\`${fb.contentHash.slice(0, 19)}…\`) — subject: ${fb.subject}`)
  lines.push('')
  lines.push('## Teaching effectiveness')
  lines.push(`- Lessons: ${te.lessons} across ${te.learners} learner(s)`)
  lines.push(`- Probe pass rate: ${te.probePassRate === null ? 'no probe evidence' : pct(te.probePassRate)} (${te.probeOutcomes} outcomes)`)
  lines.push(`- Strategies observed: ${te.strategiesObserved.join(', ') || 'none recorded'}`)
  lines.push('')
  lines.push('## Evidence summary')
  lines.push(`- Probes ${fb.evidenceSummary.probes} · misconception detections ${fb.evidenceSummary.misconceptionDetections} · recoveries ${fb.evidenceSummary.recoveries} · mistakes ${fb.evidenceSummary.mistakes}`)
  lines.push('')
  lines.push('## Mastery summary')
  lines.push(`- mastered ${ms.mastered} · progressing ${ms.progressing} · struggling ${ms.struggling} · abandoned ${ms.abandoned} · no-signal ${ms.noSignal}`)
  lines.push(`- Average mastery: ${ms.avgMasteryPct === null ? 'n/a' : `${ms.avgMasteryPct.toFixed(0)}%`}`)
  lines.push('')
  lines.push('## Failure summary')
  lines.push(`- Failed probes: ${fb.failureSummary.failedProbes}`)
  for (const mc of fb.failureSummary.topMisconceptions) lines.push(`- Misconception: ${mc.id} ×${mc.detections}`)
  for (const r of fb.failureSummary.topRecoveryStates) lines.push(`- Recovery state: ${r.state} ×${r.count}`)
  lines.push('')
  lines.push('## Improvement recommendations')
  for (const r of fb.recommendations) lines.push(`- ${r}`)
  return lines.join('\n') + '\n'
}
