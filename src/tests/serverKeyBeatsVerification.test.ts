/**
 * A GRADE THE SERVER MADE AGAINST ITS OWN ANSWER KEY IS NOT THE MODEL'S TO
 * OVERRULE.
 *
 * ── THE DEFECT, MEASURED AGAINST THE REAL MODULES ───────────────────────────
 * route.ts grades a pending MCQ against the authored probe's stored
 * `correctIndex` and says so in its own comment: the grade "WINS over the tag
 * when it resolves, because ground truth beats self-report."
 *
 * Three lines later it handed that ground truth to `verifySignal`, which
 * cross-checks a correctness claim against the MODEL'S PROSE plus two
 * heuristics — and let `resolveContradiction` overwrite it. All three
 * measured, every one on a learner who picked the RIGHT option on an AUTHORED
 * probe:
 *
 *   prose hedges ("Not quite — remember...")
 *     -> CONTRADICTED, correctness FLIPPED true -> false. The learner answered
 *        correctly and the fold's `failed` branch demotes them for it.
 *   short option text ("Static friction" — 2 words, no digit)
 *     -> SUSPICIOUS (bare-content-at-advanced-phase), verified counter
 *        withheld. An MCQ answer is short BY CONSTRUCTION.
 *   fast correct tap (<2000ms)
 *     -> SUSPICIOUS (implausibly-fast-correct), verified counter withheld.
 *        Answering quickly is what knowing the answer looks like.
 *
 * Every one of those heuristics exists to catch the MODEL fabricating a
 * correctness claim it was never entitled to make. When the SERVER holds the
 * key they are estimating a fact already known — and overruling it.
 *
 * ── SCOPE ───────────────────────────────────────────────────────────────────
 * Verification is skipped ONLY when correctness came from `gradeMcqAnswer`
 * resolving against an AUTHORED probe. A key the MODEL invented is not ground
 * truth: it still runs the full check, still cannot certify. A turn with no
 * resolved MCQ grade — the ordinary prose turn, where these heuristics are the
 * only defence there is — is unchanged.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { verifySignal, resolveContradiction } from '@/lib/teaching/signalVerification'
import { probeKeyIsAuthored } from '@/lib/teaching/mcq'

const SRC = (rel: string) => readFileSync(join(process.cwd(), 'src', rel), 'utf8')
const groundTruth = { correctness: true, confidence: 'high' } as Parameters<typeof verifySignal>[0]

const verify = (assistantText: string, learnerMessage: string, turnLatencyMs = 9000) =>
  verifySignal(groundTruth, {
    assistantText, learnerMessage, phase: 'CHECK', turnLatencyMs,
  } as Parameters<typeof verifySignal>[1])

// ═══════════════════════════════════════════════════════════════════════════
// A. THE THREE MEASURED FAILURES — these are what the scoping prevents
// ═══════════════════════════════════════════════════════════════════════════
describe('A. what verification does to a correct authored grade if it is allowed to run', () => {
  it('flips the server ground truth to WRONG when the prose hedges', () => {
    const v = verify('Not quite — remember the normal force is mg cos(30°).', 'mg cos 30°')
    expect(v.status).toBe('CONTRADICTED')
    const after = resolveContradiction(groundTruth, v)
    // The learner picked the right option; this says they did not.
    expect((after as { correctness?: boolean }).correctness).toBe(false)
  })

  it('withholds verified credit for a SHORT option text', () => {
    const v = verify('Exactly right — static friction adjusts to match the push.', 'Static friction')
    expect(v.status).toBe('SUSPICIOUS')
    expect(v.reasons).toContain('bare-content-at-advanced-phase')
  })

  it('withholds verified credit for a FAST correct tap', () => {
    const v = verify('Exactly right.', '20 N', 1500)
    expect(v.status).toBe('SUSPICIOUS')
    expect(v.reasons).toContain('implausibly-fast-correct')
  })

  it('but a long, slow answer was always fine — so this was never universal', () => {
    const v = verify('Exactly right.', '20 N — static friction matches the push to keep it still')
    expect(v.status).toBe('CLEAN')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// B. THE DISCRIMINATOR — an authored key is the server's, an invented one is not
// ═══════════════════════════════════════════════════════════════════════════
describe('B. probeKeyIsAuthored is what separates the two cases', () => {
  it('an authored probe carries the assetId that makes the key the server\'s', () => {
    expect(probeKeyIsAuthored({
      question: 'q', options: ['a', 'b'], correctIndex: 0,
      assetId: '27a4749c-d745-4c95-af24-b72150e94690',
    } as Parameters<typeof probeKeyIsAuthored>[0])).toBe(true)
  })

  it('a model-written MCQ does not, so it stays fully verified and uncertifiable', () => {
    for (const mcq of [
      { question: 'q', options: ['a', 'b'], correctIndex: 0 },
      { question: 'q', options: ['a', 'b'], correctIndex: 0, assetId: '' },
      { question: 'q', options: ['a', 'b'], correctIndex: 0, assetId: '   ' },
    ]) {
      expect(probeKeyIsAuthored(mcq as Parameters<typeof probeKeyIsAuthored>[0])).toBe(false)
    }
    expect(probeKeyIsAuthored(null)).toBe(false)
    expect(probeKeyIsAuthored(undefined)).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// C. THE WIRING — the route must gate verification on the server-key test
// ═══════════════════════════════════════════════════════════════════════════
describe('C. the route skips verification only for a server-owned key', () => {
  const route = SRC('app/api/learn/chat/route.ts')

  it('computes gradedAgainstServerKey from probeKeyIsAuthored and a resolved grade', () => {
    // Hoisted (Thread 1) so the fold evidence can require it, not just the
    // verification skip.
    expect(route).toContain('gradedAgainstServerKeyHoisted = await')
    const idx = route.indexOf('gradedAgainstServerKeyHoisted = await')
    const block = route.slice(idx, idx + 500)
    expect(block).toContain('probeKeyIsAuthored(pendingMcqHoisted)')
    // A grade that did not resolve is NOT ground truth.
    expect(block).toContain('mcqGradedThisTurn.correct === null')
  })

  it('and guards the verification call with it', () => {
    expect(route).toContain(
      'if (!gradedAgainstServerKeyHoisted && teachingSignal && teachingSignal.correctness !== undefined)',
    )
  })

  it('THREAD 1: threads serverGraded into the fold evidence, so a self-report cannot verify mastery', () => {
    // The positive provenance must reach the fold, not only the verification
    // skip — this is what makes an ungraded prose answer unable to bank a
    // verified mastery credit.
    expect(route).toContain('serverGraded: gradedAgainstServerKeyHoisted')
  })

  it('the unauthored-key downgrade is still reached — it is a separate block', () => {
    // An invented key must still be recorded and still fail to certify; this
    // fix must not have removed that path.
    expect(route).toContain("event: 'unauthored-key-not-certifying'")
    expect(route).toContain('unauthoredKeyGradeHoisted = true')
  })
})
