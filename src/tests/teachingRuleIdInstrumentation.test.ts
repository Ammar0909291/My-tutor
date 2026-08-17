/**
 * PHASE 8 — PERSIST THE DECISION ENGINE'S ruleId.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * Phase 1 persisted the DECISION. Measuring against it showed that is the
 * wrong granularity for the question this programme asks.
 *
 * `ESCALATE_TO_LLM` was 11 of the 17 `brain_decision` provider calls in
 * production, and `decisionEngine` reaches it from seven different rules. Two
 * of them want opposite responses:
 *
 *   D4b-ANSWER-STUDENT-FIRST — the learner asked a question, so the reply must
 *     address what THEY said. No authored asset can serve it. Irreducible.
 *   D8-LLM-FLOOR — the explicit catch-all: no deterministic rule fired. Every
 *     turn here is a MISSING RULE, i.e. a candidate.
 *
 * Collapsed into one label they are indistinguishable, and the largest
 * remaining bucket cannot be ranked. The engine already computes the ruleId
 * and already emits it to the in-process BrainEvent sink; it is simply never
 * persisted, and log retention is shorter than the deploy age.
 *
 * Instrumentation only. No decision changes, no provider call is added or
 * removed, no teaching behaviour moves.
 *
 * route.ts needs auth, a database and a live model and cannot be booted here,
 * so its wiring is asserted against the real route source — the same approach
 * the existing signal/evidence route-wiring tests take. `planDispatch` IS
 * pure, so the one behaviour that matters (does the plan preserve the rule?)
 * is executed rather than asserted.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { planDispatch } from '@/lib/understanding/dispatcher'
import type { TeachingDecision, TeachingDecisionType } from '@/lib/understanding/decisionEngine'

const REPO = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')
const ROUTE = REPO('src/app/api/learn/chat/route.ts')
const ENGINE = REPO('src/lib/understanding/decisionEngine.ts')
const SCHEMA = REPO('prisma/schema.prisma')
const HISTORY = REPO('src/app/api/sessions/history/route.ts')
const MIGRATION = REPO('prisma/migrations/20260817190000_message_teaching_rule_id/migration.sql')

/** Every ruleId literal the engine can actually emit, read from the engine. */
const ENGINE_RULE_IDS = [...ENGINE.matchAll(/ruleId: '([^']+)'|, '(D[0-9][^']*)',/g)]
  .map((m) => m[1] ?? m[2])
  .filter(Boolean) as string[]

const decisionWith = (decision: TeachingDecisionType, ruleId: string): TeachingDecision => ({
  version: 1,
  computedAt: new Date().toISOString(),
  shadowOnly: true,
  decision,
  ruleId,
  rationale: [],
  inputsUsed: [],
} as unknown as TeachingDecision)

describe('1 — the engine really does emit distinguishable rules', () => {
  it('the two rules this phase exists to separate both exist', () => {
    expect(ENGINE_RULE_IDS).toContain('D4b-ANSWER-STUDENT-FIRST')
    expect(ENGINE_RULE_IDS).toContain('D8-LLM-FLOOR')
  })

  it('several distinct rules all resolve to the same decision', () => {
    // The premise of the whole phase: if ESCALATE_TO_LLM had one rule, the
    // decision label would already be sufficient and this column would be
    // noise.
    const escalations = ENGINE_RULE_IDS.filter((r) => /^D(0|4b|8|9)/.test(r))
    expect(new Set(escalations).size).toBeGreaterThan(3)
  })

  it('the engine has an honest rule for its own failure', () => {
    // So a broken turn is recorded as a broken turn, not as a floor turn.
    expect(ENGINE_RULE_IDS).toContain('D9-ENGINE-ERROR')
  })
})

describe('2 — the plan preserves the rule (executed, not asserted)', () => {
  it('every decision type carries its rule through planDispatch unchanged', () => {
    const types: TeachingDecisionType[] = [
      'SERVE_EXPLANATION_MEMORY', 'ASK_DIAGNOSTIC_QUESTION', 'DETECT_MISCONCEPTION',
      'REVIEW_PREREQUISITE', 'TEACH_DIRECTLY', 'CONTINUE_LESSON', 'PRACTICE',
      'ADVANCE_DIFFICULTY', 'VISUALIZATION', 'SERVE_LESSON_COMPLETE', 'ESCALATE_TO_LLM',
    ]
    expect(types.length).toBe(11)
    for (const t of types) {
      const plan = planDispatch(decisionWith(t, `RULE-FOR-${t}`), { assembledAvailable: true })
      expect(plan.ruleId).toBe(`RULE-FOR-${t}`)
    }
  })

  it('the memory-without-content fallback still keeps the ORIGINAL rule', () => {
    // This path rewrites the executor to LLM_OPEN. If it also rewrote the
    // rule, the reason the turn was planned would be lost precisely on the
    // turns that pay for a provider.
    const plan = planDispatch(
      decisionWith('SERVE_EXPLANATION_MEMORY', 'D1-MEMORY-HIT'),
      { assembledAvailable: false },
    )
    expect(plan.executor).toBe('LLM_OPEN')
    expect(plan.ruleId).toBe('D1-MEMORY-HIT')
  })

  it("a dispatcher failure DOES overwrite the rule — which is why the route does not read it here", () => {
    // Documents the one real divergence. `DISPATCH-ERROR` is a dispatcher
    // artefact; the engine never produces it. Reading the plan's ruleId would
    // silently replace a real rule with a code answering a different question.
    const plan = planDispatch(null as unknown as TeachingDecision, { assembledAvailable: true })
    expect(plan.ruleId).toBe('DISPATCH-ERROR')
    expect(ENGINE_RULE_IDS).not.toContain('DISPATCH-ERROR')
  })
})

describe('3 — the exact rule reaches persistence, verbatim', () => {
  it('the route persists the DECISION engine value, not the plan copy', () => {
    expect(ROUTE).toContain('teachingRuleId: cueDecisionHoisted?.ruleId ?? null,')
  })

  it('it rides the SAME instrumentation object as the Phase 1 columns', () => {
    // One object, one write, one fail-open retry. A second write path would be
    // a second thing that can disagree.
    const obj = ROUTE.slice(
      ROUTE.indexOf('const dependencyInstrumentation = {'),
      ROUTE.indexOf('llmCallCount,', ROUTE.indexOf('const dependencyInstrumentation = {')) + 20,
    )
    expect(obj).toContain('teachingRuleId:')
    expect(obj).toContain('teachingDecision:')
    expect(obj).toContain('llmCallCount,')
  })

  it('the value is never normalised, remapped or defaulted to a sibling code', () => {
    // The failure mode this column exists to avoid is exactly the one the
    // memoryFallbackReason mapping suffered: a ternary chain that quietly
    // collapses unknown values into a neighbour. There must be no mapping at
    // all — only `?? null`.
    const line = ROUTE.split('\n').find((l) => l.includes('teachingRuleId:'))!
    expect(line).not.toMatch(/ \? .* : /)       // no ternary mapping
    expect(line).not.toMatch(/toUpperCase|toLowerCase|replace|slice|split|trim/)
    expect(line.trim()).toBe('teachingRuleId: cueDecisionHoisted?.ruleId ?? null,')
  })

  it('no rule value is filtered out on the way to the write', () => {
    // e.g. an "only persist D-rules" guard would silently drop D9/engine
    // errors, which are the turns most worth seeing.
    expect(ROUTE).not.toMatch(/ruleId[\s\S]{0,80}startsWith\('D'\)/)
    expect(ROUTE).not.toMatch(/ALLOWED_RULE|RULE_WHITELIST|KNOWN_RULE_IDS/)
  })
})

describe('4 — additive, nullable, no backfill', () => {
  it('the schema column is optional', () => {
    expect(SCHEMA).toMatch(/teachingRuleId\s+String\?/)
  })

  it('the migration only ADDs a nullable column', () => {
    // Comments stripped first: the header legitimately DISCUSSES nullability
    // and the absence of a backfill to explain the choice, and a test that
    // forbade describing the contract would be a bad test.
    const ddl = MIGRATION.replace(/^\s*--.*$/gm, '')
    expect(MIGRATION).toContain('ADD COLUMN "teachingRuleId" TEXT')
    // Scoped to the ALTER: the partial index below legitimately says
    // `WHERE "teachingRuleId" IS NOT NULL`, which is the opposite of a NOT
    // NULL constraint on the column.
    const alter = ddl.split('\n').filter((l) => /ALTER TABLE/.test(l)).join('\n')
    expect(alter).not.toMatch(/NOT NULL|DEFAULT /)
    expect(ddl).not.toMatch(/DROP |ALTER COLUMN/)
  })

  it('no historical row is backfilled', () => {
    // Rows written before this deploy recorded no rule. Inventing one would be
    // a fabricated measurement in the very table used to make decisions.
    expect(MIGRATION.replace(/^\s*--.*$/gm, '')).not.toMatch(/UPDATE |INSERT /i)
    expect(ROUTE).not.toMatch(/updateMany[\s\S]{0,200}teachingRuleId/)
  })
})

describe('5 — fail-open: telemetry never costs a learner their turn', () => {
  it('the retry write drops the instrumentation entirely', () => {
    // The new column rides `...dependencyInstrumentation`, so a deploy whose
    // migration has not landed yet fails the first create and succeeds on the
    // second — unchanged from Phase 1, and the reason no guard is needed here.
    const retry = ROUTE.slice(ROUTE.indexOf('retrying without them'))
    expect(retry).toContain('data: { sessionId, role: MessageRole.ASSISTANT, content: contentForHistory },')
    expect(retry.slice(0, 400)).not.toContain('dependencyInstrumentation')
  })
})

describe('6 — nothing else moved', () => {
  it('the provider call sites are unchanged in number', () => {
    expect((ROUTE.match(/await routeAI\(/g) ?? []).length).toBe(3)
  })

  it('the Phase 1 and Phase 4 telemetry fields are untouched', () => {
    expect(ROUTE).toContain('teachingDecision: dispatchPlanHoisted?.decision ?? null,')
    expect(ROUTE).toContain('dispatchExecutor: dispatchPlanHoisted?.executor ?? null,')
    expect(ROUTE).toContain("memoryFallbackReason: memoryFallbackReasonCode === 'none' ? null : memoryFallbackReasonCode,")
    expect(ROUTE).toContain('servedFromMemory || servedByGateRenderer || servedByLessonComplete')
  })

  it('the Phase 7 fix that made this measurement trustworthy is still in place', () => {
    expect(ROUTE).toContain('if (!assembled && !alreadyServedThisConcept) {')
  })

  it('the rule stays server-side — no learner-facing surface exposes it', () => {
    // There is no reason a learner's client should receive the internal rule
    // that produced their turn.
    expect(HISTORY).not.toContain('teachingRuleId')
    expect(ROUTE).not.toMatch(/success: true[\s\S]{0,600}teachingRuleId/)
  })
})
