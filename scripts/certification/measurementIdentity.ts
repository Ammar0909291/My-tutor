/**
 * IMMUTABLE MEASUREMENT IDENTITY, AND THE DIRTY-STATE CONTRACT (I-4, I-2).
 *
 * ── I-4: WHY A RESULT WITHOUT AN IDENTITY IS NOT EVIDENCE ───────────────────
 * `certify.ts` printed results to stdout carrying a conceptId and nothing about
 * WHAT produced them: no repo SHA, no harness version, no answer-source
 * fingerprint, no manifest hash, no worker, no timestamp. Phase 0 found local
 * `main` 98 commits behind origin while the previous audit's conclusions were
 * still being quoted — an anonymous result is exactly how that error survives.
 * Every row now carries the identity of the instrument that produced it.
 *
 * Deliberately NOT a database table: a certification artifact must be readable
 * without the product's own infrastructure (the thing under test), and the
 * campaign's egress budget is a hard constraint. JSONL on disk, one line per
 * concept, appended as the run proceeds so an aborted run still leaves its
 * evidence.
 *
 * ── I-2: WHY THE DIRTY-STATE PREDICATE HAD TO WIDEN ─────────────────────────
 * The old check fired only at turn 1 and only on
 * `verified === true || checkCorrect > 0`. Production semantics make that too
 * narrow, and the semantics are the source of the contract, not invention:
 *   · `/api/sessions` RESUMES any ACTIVE session for the subject from the last
 *     24h (src/app/api/sessions/route.ts) — so a "new" session may be old.
 *   · `mode: 'restart'` does not clear the stored conversation state.
 *   · mastery is `correctAtCheck >= 1 && correctAtPractice >= 2`
 *     (src/lib/teaching/masteryGate.ts) — so a session carrying
 *     practiceCorrect 2 with checkCorrect 0 was INVISIBLE to the old predicate
 *     while sitting one graded answer from a fabricated pass.
 *   · `StudentProgress.activeLessonSlug` is per (userId, subjectCode), so a
 *     concurrent run on the same account can move the lesson pointer mid-run.
 * A contaminated run is stopped and recorded, never cleaned and continued:
 * cleaning would hide the contamination that is itself the finding.
 */

export const PROTOCOL_VERSION = 'full-population-certification-v1'

/**
 * Bumped by hand whenever the harness's MEASUREMENT BEHAVIOUR changes — how it
 * answers, what it fails on, what it records. A comment or a log line does not
 * bump it; anything that could move a verdict does.
 */
export const HARNESS_VERSION = '2.0.0-answer-source'

export type Verdict =
  | 'CERTIFIED'
  | 'FAILED_PRODUCT'
  | 'FAILED_CONTENT'
  | 'FAILED_INFRASTRUCTURE'
  | 'FAILED_INSTRUMENT'
  | 'UNMEASURED'
  | 'DIRTY_STATE'

/** The instrument's own identity — constant for a whole run. */
export interface RunIdentity {
  protocol: string
  harnessVersion: string
  /** Product SHA the runner was built from. */
  repoSha: string
  /** Fingerprint of the authored answer corpus (answerSource). */
  answerSourceFingerprint: string
  /** sha256 of the frozen Tier A manifest. */
  manifestHash: string
  /** Which of the four workers, and which account it owns. */
  workerId: string
  accountLabel: string
  runId: string
  startedAt: string
}

export interface ConceptRecord extends RunIdentity {
  subject: string
  conceptId: string
  language: string
  gradeBand: string | null
  verdict: Verdict
  failed: string[]
  turns: number
  finalPhase: string | null
  checkCorrect: number
  practiceCorrect: number
  verified: boolean
  lessonClosed: boolean
  providersSeen: string[]
  degradedTurns: number
  /** Set when verdict is UNMEASURED, naming exactly why measurement stopped. */
  unmeasuredReason: string | null
  notes: string[]
  finishedAt: string
}

/**
 * The verdict precedence from Protocol v1 §6, in ONE place.
 *
 * Every category above FAILED_PRODUCT is a reason the product was never fairly
 * tested, so FAILED_PRODUCT is last. This ordering is what stops the campaign
 * manufacturing product defects out of the instrument's own faults, and it is
 * a pure function so it can be tested without a run.
 */
export function classifyVerdict(input: {
  instrumentFailed: boolean
  degradedTurns: number
  dirtyState: boolean
  belowContract: boolean
  unmeasuredReason: string | null
  hardFailures: string[]
  verified: boolean
  lessonClosed: boolean
  attempted: boolean
}): Verdict {
  if (input.instrumentFailed) return 'FAILED_INSTRUMENT'
  if (input.degradedTurns > 0) return 'FAILED_INFRASTRUCTURE'
  if (input.dirtyState) return 'DIRTY_STATE'
  if (input.belowContract) return 'FAILED_CONTENT'
  // An honest "I could not measure this" outranks any teaching verdict: the
  // lesson may well have been fine, and we did not answer its questions.
  if (input.unmeasuredReason) return 'UNMEASURED'
  if (input.hardFailures.length > 0) return 'FAILED_PRODUCT'
  if (input.verified && input.lessonClosed) return 'CERTIFIED'
  if (!input.attempted) return 'UNMEASURED'
  return 'FAILED_PRODUCT'
}

/** The mastery/session facts a turn can report, as the payload exposes them. */
export interface TurnState {
  verified?: boolean
  phase?: string
  checkCorrect?: number
  practiceCorrect?: number
}

export interface DirtyStateFinding {
  dirty: boolean
  reasons: string[]
}

/**
 * Is this session already carrying progress on this concept?
 *
 * Evaluated on the FIRST chat turn, where a clean learner must show nothing:
 * no verified mastery, no check credit, no practice credit, and a phase at or
 * below the ladder's entry. `expectedEntryPhases` is passed in rather than
 * hardcoded so the contract tracks the runtime's own phase names instead of a
 * copy of them going stale here.
 */
export function detectDirtyState(
  first: TurnState | null | undefined,
  opts: {
    expectedEntryPhases: readonly string[]
    /** activeLessonSlug before the run, and after it — a mid-run move is contamination. */
    activeLessonSlugBefore?: string | null
    activeLessonSlugAfter?: string | null
    /** True when /api/sessions reported it handed back an existing session. */
    sessionResumed?: boolean
  },
): DirtyStateFinding {
  const reasons: string[] = []
  const s = first ?? {}
  if (s.verified === true) reasons.push('verified-at-turn-1')
  if ((s.checkCorrect ?? 0) > 0) reasons.push(`checkCorrect=${s.checkCorrect}-at-turn-1`)
  // The gap the old predicate missed: mastery needs practice 2, so practice
  // credit alone is one graded answer away from a fabricated pass.
  if ((s.practiceCorrect ?? 0) > 0) reasons.push(`practiceCorrect=${s.practiceCorrect}-at-turn-1`)
  if (s.phase && !opts.expectedEntryPhases.includes(s.phase)) {
    reasons.push(`phase=${s.phase}-not-an-entry-phase`)
  }
  if (opts.sessionResumed === true) reasons.push('session-resumed-not-fresh')
  if (
    opts.activeLessonSlugBefore !== undefined &&
    opts.activeLessonSlugAfter !== undefined &&
    opts.activeLessonSlugBefore !== opts.activeLessonSlugAfter
  ) {
    reasons.push(
      `activeLessonSlug-moved:${String(opts.activeLessonSlugBefore)}->${String(opts.activeLessonSlugAfter)}`,
    )
  }
  return { dirty: reasons.length > 0, reasons }
}

/**
 * WORKER / ACCOUNT ISOLATION (I-1).
 *
 * Isolation is bought with ACCOUNTS, not threads: `StudentProgress` is unique
 * on (userId, subjectCode) and carries `activeLessonSlug`, and `/api/sessions`
 * resumes by (user, subject) — so two workers sharing an account share a
 * lesson pointer. This resolves the per-worker credential set and REFUSES to
 * run rather than silently sharing one.
 */
export interface WorkerAccount {
  workerId: string
  accountLabel: string
  email: string
  password: string
}

/** Accounts a certification run must never touch, whatever the environment says. */
export const PROTECTED_ACCOUNTS = ['suaibamr@gmail.com'] as const

export function isProtectedAccount(email: string): boolean {
  return PROTECTED_ACCOUNTS.some((p) => p === email.trim().toLowerCase())
}

export type WorkerResolution =
  | { ok: true; workers: WorkerAccount[] }
  | { ok: false; error: string }

/**
 * Read worker credentials from the environment.
 *
 * Expects CERT_WORKER_1_EMAIL / CERT_WORKER_1_PASSWORD … up to `wanted`.
 * Refuses on: a missing pair, a duplicated email across workers (which would
 * silently reunite two workers on one account), or a protected account.
 */
export function resolveWorkers(
  env: Record<string, string | undefined>,
  wanted: number,
): WorkerResolution {
  const workers: WorkerAccount[] = []
  for (let i = 1; i <= wanted; i++) {
    const email = (env[`CERT_WORKER_${i}_EMAIL`] ?? '').trim()
    const password = env[`CERT_WORKER_${i}_PASSWORD`] ?? ''
    if (!email || !password) {
      return { ok: false, error: `worker ${i}: CERT_WORKER_${i}_EMAIL/PASSWORD not set` }
    }
    if (isProtectedAccount(email)) {
      return { ok: false, error: `worker ${i}: refuses to use the protected account ${email}` }
    }
    workers.push({ workerId: `w${i}`, accountLabel: email, email, password })
  }
  const seen = new Set(workers.map((w) => w.email.toLowerCase()))
  if (seen.size !== workers.length) {
    return { ok: false, error: 'two workers share one account — isolation is per ACCOUNT, not per process' }
  }
  return { ok: true, workers }
}
