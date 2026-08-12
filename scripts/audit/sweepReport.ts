/**
 * SWEEP REPORTING — the verdict logic, separated so it can be tested.
 *
 * ── WHY THIS FILE EXISTS ────────────────────────────────────────────────────
 * `engine-sweep.ts` printed this, on a run in which every single topic failed
 * to reach the app at all:
 *
 *     ── ENGINE FINDINGS ──
 *       none — every checked engine invariant held
 *
 * Eight topics errored on a proxy denial, zero requests succeeded, and the
 * instrument reported green. The bug is a single implicit inference:
 *
 *     findings.length === 0   ⟹   the invariants held
 *
 * That holds only if the checks RAN. An errored topic produces no findings
 * because it produced no data, and the report could not tell those two states
 * apart. This is the same meta-class the audit has hit repeatedly — a layer
 * judging from an incomplete view of what it is judging.
 *
 * The rule enforced here: **absence of findings is only evidence when
 * something was actually checked.** A run with any errored topic is
 * INCONCLUSIVE and says so, and the process exits non-zero so no caller can
 * read silence as a pass.
 */

export type SweepFinding = { code: string; detail: string }

export type SweepOutcome = {
  conceptId: string
  findings: SweepFinding[]
  reachedVerified: boolean
  /** Set when the topic could not be swept at all (network, auth, parse). */
  error?: string
}

export type SweepSummary = {
  total: number
  /** Topics that actually completed and therefore carry evidence. */
  checked: number
  errored: number
  verified: number
  findingsByCode: Map<string, { conceptId: string; detail: string }[]>
  /** The headline printed under "ENGINE FINDINGS". Never claims a pass it did not earn. */
  findingsLine: string
  /** True when the run proves nothing about the invariants. */
  inconclusive: boolean
  /** Non-zero whenever the run is inconclusive or found a real defect. */
  exitCode: number
}

export function summariseSweep(results: SweepOutcome[]): SweepSummary {
  const total = results.length
  const errored = results.filter((r) => r.error).length
  const checked = total - errored
  const verified = results.filter((r) => !r.error && r.reachedVerified).length

  const findingsByCode = new Map<string, { conceptId: string; detail: string }[]>()
  for (const r of results) {
    for (const f of r.findings) {
      if (!findingsByCode.has(f.code)) findingsByCode.set(f.code, [])
      findingsByCode.get(f.code)!.push({ conceptId: r.conceptId, detail: f.detail })
    }
  }

  // A run is inconclusive if nothing completed, or if some topics never ran.
  // Partial runs are called out rather than averaged away: "no findings in the
  // 3 that ran" is a much weaker claim than "no findings", and reporting the
  // weaker claim as the stronger one is the defect this file exists to prevent.
  const inconclusive = checked === 0 || errored > 0

  let findingsLine: string
  if (checked === 0) {
    findingsLine =
      `NOTHING WAS CHECKED — 0 of ${total} topics completed (${errored} errored). ` +
      `This run proves nothing about the engine invariants.`
  } else if (errored > 0) {
    findingsLine = findingsByCode.size === 0
      ? `no findings in the ${checked} topic(s) that completed — but ${errored} ERRORED and were never checked. INCONCLUSIVE.`
      : `findings below cover only the ${checked} topic(s) that completed; ${errored} ERRORED and were never checked.`
  } else {
    findingsLine = findingsByCode.size === 0
      ? `none — every checked engine invariant held across all ${checked} topic(s)`
      : `see below (${checked} topic(s) checked, 0 errored)`
  }

  return {
    total,
    checked,
    errored,
    verified,
    findingsByCode,
    findingsLine,
    inconclusive,
    exitCode: inconclusive || findingsByCode.size > 0 ? 1 : 0,
  }
}
