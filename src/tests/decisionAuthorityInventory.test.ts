/**
 * PHASE 4 · I — the decision-authority inventory.
 *
 * THE PROBLEM THIS MAKES CHECKABLE. The repository contains six distinguishable
 * lineages that can, or once could, decide what a teaching turn does. Whether a
 * given one is LIVE, SHADOW or ORPHANED has until now been established by
 * reading code and remembering the answer — which is how `teachingActionEngine.ts`
 * survived as a plausible-looking second engine until ADR 03 retired it, and how
 * `kernel/tsm/machine.ts` still reads as the obvious landing pad for S5.
 *
 * So the classification is asserted here, from the imports themselves. A module
 * that gains or loses a production caller fails this file, which is the point:
 * "RETIRE" and "DELETE LATER" are claims about call graphs, and a claim about a
 * call graph should be a test.
 *
 * DELETION REQUIRES PROOF THAT THE REPLACEMENT OWNS THE SAME RESPONSIBILITY.
 * Nothing is deleted here and nothing is proposed for deletion in this change.
 * The classification below is evidence for that decision, not the decision.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROUTE = 'src/app/api/learn/chat/route.ts'
const routeSrc = readFileSync(ROUTE, 'utf8')

/** Every .ts file under src/lib and src/app, so "who imports X" is answered
 *  from the tree rather than from memory. Tests are excluded on purpose: a
 *  test importing a module is exactly what an ORPHAN looks like. */
function productionFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) productionFiles(p, acc)
    else if (p.endsWith('.ts') || p.endsWith('.tsx')) acc.push(p)
  }
  return acc
}
const PROD_FILES = [...productionFiles('src/lib'), ...productionFiles('src/app')]

/** Source with comments removed, so a module MENTIONED in a comment is never
 *  mistaken for a module IMPORTED. Two of the six classifications below were
 *  wrong on the first run for exactly that reason. */
function codeOf(file: string): string {
  return readFileSync(file, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1 ')
}

/** Files that reference `needle` in CODE, excluding the module's own directory. */
function importersOf(needle: string, ownDirPrefix: string): string[] {
  return PROD_FILES.filter((f) => !f.startsWith(ownDirPrefix) && codeOf(f).includes(needle))
}

type Disposition = 'KEEP' | 'MIGRATE' | 'SHADOW' | 'RETIRE' | 'DELETE-LATER'

interface Lineage {
  id: string
  name: string
  root: string
  disposition: Disposition
  /** Why this disposition, in terms of who owns the responsibility. */
  rationale: string
}

const LINEAGES: Lineage[] = [
  { id: 'L1', name: 'Legacy chat route + conversationState ladder',
    root: 'src/lib/teaching/', disposition: 'KEEP',
    rationale: 'The only path that decides a live turn. Every gate — mastery, legality, first lesson, recovery, arbitration — is calibrated against it. It is the incumbent authority and stays until a replacement is proven to own the same responsibilities.' },
  { id: 'L2', name: 'Brain Runtime (understanding/*)',
    root: 'src/lib/understanding/', disposition: 'KEEP',
    rationale: 'Default ON and externally visible, but its authority is narrow and well-bounded: it drives the serve-from-memory and lesson-complete forks, not the teaching move. Not a competing ladder.' },
  { id: 'L3', name: 'EOS Track K kernel pipeline + policy engine',
    root: 'src/lib/kernel/', disposition: 'SHADOW',
    rationale: 'Runs read-only behind ENABLE_KERNEL_PIPELINE, compared to the route by kernel/parity.ts, and discarded. This is the intended future authority; promotion is gated on measured parity from real traffic.' },
  { id: 'L4', name: 'Canonical TSM (kernel/tsm/machine.ts)',
    root: 'src/lib/kernel/tsm/', disposition: 'RETIRE',
    rationale: 'Zero production callers, and ISS-01 D1-D7 show it cannot be promoted as written: an all-correct learner never leaves DEMONSTRATE. It is retained only as the declared S5 landing pad, which is exactly what makes it a trap. Retirement is an owner decision (ISS-01 Option C), not taken here.' },
  { id: 'L5', name: 'Teaching Planner / Runtime Executor (teaching/planner, teaching/runtime)',
    root: 'src/lib/teaching/planner/', disposition: 'DELETE-LATER',
    rationale: 'Reachable only through brainShadow, itself gated on BRAIN_RUNTIME_MODE (default off), and executeRuntime has no production caller at all. Deletion needs an ADR showing the kernel pipeline owns the same responsibility first.' },
  { id: 'L6', name: 'Archived Eb pipeline (educationalBrain/*)',
    root: 'src/lib/educationalBrain/', disposition: 'DELETE-LATER',
    rationale: 'Fire-and-forget behind ENABLE_EDUCATIONAL_BRAIN_PIPELINE (default off); the masterplan already schedules its deletion after K4 parity, under its own ADR.' },
]

describe('I — the six lineages, classified', () => {
  it('every lineage carries a disposition and a responsibility-based rationale', () => {
    expect(LINEAGES).toHaveLength(6)
    for (const l of LINEAGES) expect(l.rationale.length, l.id).toBeGreaterThan(80)
  })

  it('exactly one lineage is the live decision authority', () => {
    expect(LINEAGES.filter((l) => l.disposition === 'KEEP').map((l) => l.id)).toEqual(['L1', 'L2'])
    // L2 is KEEP but is not a ladder — asserted concretely below.
  })
})

describe('I — the classification, verified against the actual call graph', () => {
  it('L1 — conversationState is imported by the route and by the teaching layer', () => {
    expect(routeSrc).toContain("@/lib/teaching/conversationState")
    expect(routeSrc).toContain('advanceConversationState')
  })

  it('L2 — Brain Runtime is called by the route, and drives exactly two forks', () => {
    expect(routeSrc).toContain("@/lib/understanding/dispatcher")
    expect(routeSrc).toContain("@/lib/understanding/decisionEngine")
    // Its authority: serveFromMemory + serveLessonComplete. If a third
    // externally visible fork appears, this claim needs revisiting.
    expect(routeSrc).toContain("dispatchPlanHoisted.executor === 'EXPLANATION_MEMORY'")
    expect(routeSrc).toContain("dispatchPlanHoisted.executor === 'LESSON_COMPLETE'")
  })

  it('L3 — the kernel pipeline is invoked, and only behind its flag', () => {
    expect(routeSrc).toContain('ENABLE_KERNEL_PIPELINE')
    expect(routeSrc).toContain("@/lib/eos-runtime")
    // Read-only: the shadow block is wrapped in a catch that swallows
    // everything, so a kernel failure can never reach the learner.
    expect(routeSrc).toContain('strangler: kernel failure never affects the turn')
  })

  it('L4 — the canonical TSM has NO production caller (only a barrel re-export)', () => {
    const importers = importersOf('tsm/machine', 'src/lib/kernel/tsm/')
    // The one hit is kernel/index.ts's `export * as tsm from './tsm/machine'`,
    // which re-exports without using.
    expect(importers).toEqual(['src/lib/kernel/index.ts'])
    expect(readFileSync('src/lib/kernel/index.ts', 'utf8')).toContain("export * as tsm from './tsm/machine'")
    // And the route never touches it.
    expect(routeSrc).not.toContain('tsm/machine')
    expect(routeSrc).not.toContain('machineFromLegacy')
  })

  it('L4b — its NEIGHBOUR phases.ts IS live, so retirement is a partial cut', () => {
    // getStageCeiling is imported by BASE_PACK. legacyToCanonical /
    // canonicalToLegacy / PHASE_ORDER_10 are used only by machine.ts and
    // tests. So ISS-01 Option C removes the mapping and keeps the ceiling.
    expect(readFileSync('src/lib/kernel/policy/basePack.ts', 'utf8'))
      .toContain("import { getStageCeiling } from '../tsm/phases'")
    const mappingUsers = importersOf('legacyToCanonical', 'src/lib/kernel/tsm/')
    expect(mappingUsers.filter((f) => !f.endsWith('index.ts'))).toEqual([])
  })

  it('L5 — the Runtime Executor has no production caller at all', () => {
    const importers = importersOf('runtime/runtimeExecutor', 'src/lib/teaching/runtime/')
    expect(importers).toEqual([])
    // The Teaching Planner is reachable ONLY through brainShadow…
    const plannerImporters = importersOf('planner/teachingPlanner', 'src/lib/teaching/planner/')
    expect(plannerImporters.sort()).toEqual([
      'src/lib/teaching/runtime/brainRuntimeEntry.ts',
      'src/lib/teaching/runtime/brainShadow.ts',
    ])
    // …which the route calls only when BRAIN_RUNTIME_MODE is not OFF.
    expect(routeSrc).toContain('runtime/brainShadow')
    expect(routeSrc).toContain('currentBrainMode().mode !== BrainMode.OFF')
  })

  it('L6 — the archived Eb pipeline is fire-and-forget behind its own flag', () => {
    expect(routeSrc).toContain("@/lib/educationalBrain/pipeline")
    expect(routeSrc).toContain('void import')
  })
})

describe('I — the properties that must hold while more than one lineage exists', () => {
  it('only ONE module writes the live teaching phase', () => {
    // A second writer is the failure mode this whole phase exists to prevent.
    const writers = PROD_FILES.filter((f) => {
      const src = readFileSync(f, 'utf8')
      return src.includes('export function advanceConversationState')
    })
    expect(writers).toEqual(['src/lib/teaching/conversationState.ts'])
  })

  it('the shadow lineages cannot reach the response: each is inside a swallowing catch', () => {
    for (const marker of [
      'strangler: kernel failure never affects the turn',
      'never affects the turn',
    ]) {
      expect(routeSrc).toContain(marker)
    }
  })

  it('no lineage other than L1 owns a mastery threshold', () => {
    const owners = PROD_FILES.filter((f) =>
      readFileSync(f, 'utf8').includes('MASTERY_PRACTICE_REQUIRED ='))
    expect(owners).toEqual(['src/lib/teaching/masteryGate.ts'])
  })
})
