/**
 * WIRING AUDIT — the server-owned gate assessment is actually connected.
 *
 * ── WHY THIS FILE EXISTS SEPARATELY ─────────────────────────────────────────
 * `gateAssessmentIsServerOwned.test.ts` proves the MODULE is correct. It would
 * pass green with every route call site deleted — and an unwired fix is a class
 * this audit has already been burnt by: the Educational Brain was found to have
 * 0 of 52 authored layers reachable at runtime, and `src/lib/educationalBrain/*`
 * is a whole pipeline that never executes. A fix for E6 that is not on the turn
 * path is not a fix for E6.
 *
 * ── METHOD, STATED HONESTLY ─────────────────────────────────────────────────
 * A source-order audit of `route.ts`, the same form the repository already uses
 * for route-level invariants (`attemptTagRouteWiring.test.ts`,
 * `degradedModeAudit.test.ts`). It is NOT a booted request: the route needs
 * auth, a database and a model provider, none of which exist here. What it
 * proves is that the selection happens BEFORE the prompt is sent and the
 * attachment AFTER the reply is parsed, and that the five exclusions are on the
 * eligibility test. What it cannot prove is the behaviour of a real HTTP turn —
 * that needs a production replay with real credentials, which this container
 * does not hold.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
const lines = ROUTE.split('\n')
/** Comment lines blanked, never removed, so reported line numbers stay real. */
const codeLines = lines.map((l) => (/^\s*(\/\/|\*|\/\*)/.test(l) ? '' : l))

const lineOf = (re: RegExp): number => {
  const i = codeLines.findIndex((l) => re.test(l))
  return i === -1 ? -1 : i + 1
}
/**
 * First match at or after a 1-based line. Needed because several markers occur
 * in more than one BRANCH of the route — `provider = 'memory'` is set by both
 * the lesson-complete serve and the Explanation Memory serve — and the first
 * draft of this file asserted against the wrong one. Anchoring to the branch
 * opener is what makes the ordering claim mean what it says.
 */
const lineOfAfter = (re: RegExp, after: number): number => {
  const i = codeLines.findIndex((l, idx) => idx + 1 > after && re.test(l))
  return i === -1 ? -1 : i + 1
}

describe('the gate assessment is on the turn path', () => {
  it('imports the module and selects a probe', () => {
    expect(lineOf(/import\('@\/lib\/teaching\/gateAssessment'\)/)).toBeGreaterThan(0)
    expect(lineOf(/const probe = await findBestProbe\(memoryState/)).toBeGreaterThan(0)
  })

  it('selects and injects BEFORE the provider call, or the model never sees it', () => {
    const inject = lineOf(/systemPrompt \+= buildGateAssessmentBlock\(/)
    const call = lineOf(/routed = await routeAI\(/)
    expect(inject).toBeGreaterThan(0)
    expect(call).toBeGreaterThan(0)
    expect(inject).toBeLessThan(call)
  })

  it('attaches AFTER the reply is parsed, and outranks a model-emitted tag', () => {
    const attach = lineOf(/mcqHoisted = gateMcqHoisted \?\? mcqParse\.mcq/)
    expect(attach).toBeGreaterThan(0)
    // `??` and not `||`: an assignment the other way round would let an
    // unreviewed model item sit at the rung where a wrong answer key costs the
    // learner their progress.
    expect(lineOf(/mcqHoisted = mcqParse\.mcq \?\? gateMcqHoisted/)).toBe(-1)
    // Still stripped either way — the tag must never reach the learner.
    expect(lineOf(/text = mcqParse\.cleanText/)).toBeGreaterThan(attach)
  })

  it('carries the assembled probe into the MEMORY serve path too', () => {
    // The memory path had its own instance of E6: a reviewed probe rendered as
    // prose that no grader can read.
    const branch = lineOf(/if \(!serveLessonComplete && assembled && serveFromMemory\) \{/)
    expect(branch).toBeGreaterThan(0)
    const serve = lineOf(/if \(assembled\.probeMcq\) mcqHoisted = assembled\.probeMcq/)
    expect(serve).toBeGreaterThan(branch)
    // Inside THAT branch — before the `provider = 'memory'` it sets, not the
    // one the lesson-complete serve sets further up.
    expect(serve).toBeLessThan(lineOfAfter(/provider = 'memory'/, branch))
  })

  it('the selected MCQ reaches the response and the snapshot, unchanged', () => {
    // Both are pre-existing plumbing keyed on `mcqHoisted`; asserted so a later
    // refactor cannot quietly serve a question it never persists — which would
    // make it ungradeable next turn, recreating E6 by a different route.
    expect(lineOf(/conversationStateUpdate\.pendingMcq = mcqHoisted/)).toBeGreaterThan(0)
    expect(lineOf(/mcq: mcqHoisted \?\? undefined/)).toBeGreaterThan(0)
  })
})

describe('the exclusions are on the eligibility test, not assumed', () => {
  /** The `gateEligible` expression as it appears in the route. */
  const eligibility = (() => {
    const start = codeLines.findIndex((l) => /const gateEligible =/.test(l))
    expect(start).toBeGreaterThan(-1)
    return codeLines.slice(start, start + 8).join('\n')
  })()

  it('fires only at a mastery gate', () => {
    expect(eligibility).toMatch(/isMasteryGatePhase\(phaseBeforeTurn\)/)
  })

  it('never during recovery — no content into a flooded mind', () => {
    expect(eligibility).toMatch(/!recoveryKeyHoisted/)
  })

  it('never in lesson one — a first lesson does not open with a quiz', () => {
    expect(eligibility).toMatch(/!firstLessonActiveHoisted/)
  })

  it('never during an excursion — the lesson ladder is deliberately frozen', () => {
    expect(eligibility).toMatch(/!excursionActiveHoisted/)
  })

  it('needs a resolved learner state to select against', () => {
    expect(eligibility).toMatch(/memoryState !== null/)
  })
})

describe('an exhausted corpus falls back rather than repeating itself', () => {
  it('passes the already-asked exclusion into selection', () => {
    expect(lineOf(/excludeProbeStem: history \? \(stem\) => hasAskedMcq\(history, stem\) : undefined/))
      .toBeGreaterThan(0)
  })

  it('attaches nothing when conversion refuses, leaving the previous behaviour intact', () => {
    // `converted` is the guard, not `probe` — a retrieved probe that cannot be
    // graded honestly must not become the turn's question.
    expect(lineOf(/if \(converted\) \{/)).toBeGreaterThan(0)
    expect(lineOf(/gateMcqHoisted = converted/)).toBeGreaterThan(0)
  })

  it('logs the decision, so a silent no-op is visible in production', () => {
    expect(lineOf(/\[gate-assessment\]/)).toBeGreaterThan(0)
  })

  it('cannot cost the learner their turn — the whole block is guarded', () => {
    const start = codeLines.findIndex((l) => /const \{ isMasteryGatePhase, probeToMcq, buildGateAssessmentBlock \} =/.test(l))
    expect(start).toBeGreaterThan(-1)
    // A `try` opened on the line before the import destructure.
    expect(codeLines.slice(Math.max(0, start - 2), start).join('\n')).toMatch(/try \{/)
  })
})
