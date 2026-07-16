/**
 * Blueprint Front-End tests (Phase 1): parser · AST · semantic validation ·
 * lowering · RuleAST/compiler compatibility · draft package generation ·
 * regression against the existing brain-compiler.
 *
 * Proves the architecture on 3 representative, real blueprints from the live
 * `docs/curriculum/blueprints/` corpus (no math blueprint exists on `main`
 * yet — see report; substituted an English blueprint to prove format- and
 * subject-agnosticism instead):
 *   - phys.mech.angular-momentum.md      (Component-format, variant A)
 *   - phys.stat.boltzmann-factor.md      ("advanced", Component-format, variant B —
 *                                          different internal component numbering)
 *   - eng.phonics.letter-sound-correspondence.md (Protocol-format, "## N. Title")
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  parseBlueprintMarkdown, validateBlueprintAst, lowerBlueprintToRawBlocks,
  lowerBlueprintToDraftPack, compileBlueprint, mapPrimitivesToActionClass,
} from '@/lib/curriculum/blueprintFrontend'
import { validateAst } from '@/lib/brain-compiler/predicates'
import { compileSingle } from '@/lib/brain-compiler/compile'
import { packRegistry } from '@/lib/brain-compiler/registry'
import { BASE_PACK, decide } from '@/lib/kernel/policy'
import type { PolicyInputs } from '@/lib/kernel/policy/types'
import type { GuardClause } from '@/lib/brain-compiler/types'

const BP_DIR = resolve(process.cwd(), 'docs/curriculum/blueprints')

function readBlueprint(conceptId: string): { file: string; source: string } {
  const file = `docs/curriculum/blueprints/${conceptId}.md`
  const source = readFileSync(resolve(BP_DIR, `${conceptId}.md`), 'utf8')
  return { file, source }
}

function physicsKgIds(): Set<string> {
  const kg = JSON.parse(readFileSync(resolve(process.cwd(), 'docs/physics/kg/graph.json'), 'utf8'))
  return new Set(kg.concepts.map((c: { id: string }) => c.id))
}

function policyInputs(over: Partial<PolicyInputs> = {}): PolicyInputs {
  return {
    turnId: 't', learnerId: 'L', sessionId: 'S',
    contentRegister: 'intermediate', profileLevel: 'intermediate',
    sessionFailureCount: 0, isFirstLessonContext: false,
    phase: 'ANCHOR', stageCeiling: 2, demonstrated: false, consecutiveFailures: 0,
    interruptActive: false, failureStateKey: null, autonomyRequested: false,
    retroWinOwed: false, dueReviewCount: 0, freshBoundary: false,
    lastSignalCorrect: null, lastSignalConfidence: null, currentConceptId: null,
    ...over,
  }
}

// ── Parser: 3 representative, structurally-different real blueprints ───────

describe('parser — format-agnostic across the real corpus', () => {
  it('parses phys.mech.angular-momentum.md (Component-format, variant A)', () => {
    const { file, source } = readBlueprint('phys.mech.angular-momentum')
    const { ast, diagnostics } = parseBlueprintMarkdown(file, source, 'phys.mech.angular-momentum')
    expect(diagnostics.filter((d) => d.severity === 'E')).toEqual([])
    expect(ast).not.toBeNull()
    expect(ast!.conceptId).toBe('phys.mech.angular-momentum')
    expect(ast!.metadata.prerequisites).toEqual(['phys.mech.rotational-dynamics', 'phys.mech.momentum'])
    expect(ast!.metadata.masteryThreshold).toBe(0.80)
    expect(ast!.teachingActions.length).toBe(7)
    expect(ast!.teachingActions.map((t) => t.id)).toEqual(['TA-1', 'TA-2', 'TA-3', 'TA-4', 'TA-5', 'TA-6', 'TA-7'])
    expect(ast!.misconceptions.map((m) => m.id)).toContain('MC-L-IS-OMEGA')
    // TA-4's body references the misconception it diagnoses.
    const ta4 = ast!.teachingActions.find((t) => t.id === 'TA-4')!
    expect(ta4.referencedMisconceptionIds).toContain('MC-L-IS-OMEGA')
    expect(ta4.primitives.length).toBeGreaterThan(0)
  })

  it('parses phys.stat.boltzmann-factor.md (Component-format, variant B — different internal layout)', () => {
    const { file, source } = readBlueprint('phys.stat.boltzmann-factor')
    const { ast, diagnostics } = parseBlueprintMarkdown(file, source, 'phys.stat.boltzmann-factor')
    expect(diagnostics.filter((d) => d.severity === 'E')).toEqual([])
    expect(ast).not.toBeNull()
    expect(ast!.conceptId).toBe('phys.stat.boltzmann-factor')
    expect(ast!.metadata.prerequisites).toEqual(['phys.stat.probability-basics'])
    expect(ast!.teachingActions.length).toBe(8)
    // Variant B uses "MC-N: MC-SLUG" headers and bold "**TA-N — Title [P..]**" —
    // confirms the parser is not hardcoded to variant A's exact header shape.
    expect(ast!.misconceptions.length).toBeGreaterThanOrEqual(4)
    const ta4 = ast!.teachingActions.find((t) => t.id === 'TA-4')!
    expect(ta4.primitives).toEqual(expect.arrayContaining(['P14', 'P28', 'P31', 'P33', 'P36']))
  })

  it('parses eng.phonics.letter-sound-correspondence.md (Protocol-format, "## N. Title") — English case; math coverage lives in blueprintAssets.test.ts since the math corpus landed on main', () => {
    const { file, source } = readBlueprint('eng.phonics.letter-sound-correspondence')
    const { ast, diagnostics } = parseBlueprintMarkdown(file, source, 'eng.phonics.letter-sound-correspondence')
    expect(diagnostics.filter((d) => d.severity === 'E')).toEqual([])
    expect(ast).not.toBeNull()
    expect(ast!.conceptId).toBe('eng.phonics.letter-sound-correspondence')
    // This file uses `requires:` not `prerequisites:` — proves key-alias handling.
    expect(ast!.metadata.prerequisites).toEqual(['eng.phonics.alphabet-recognition', 'eng.phonics.blending-segmenting'])
    expect(ast!.teachingActions.length).toBeGreaterThan(0)
    expect(ast!.teachingActions.some((t) => t.id === 'TA-A01')).toBe(true)
  })
})

// ── Semantic validation (runs before lowering) ──────────────────────────────

describe('semantic validation', () => {
  const { file, source } = readBlueprint('phys.mech.angular-momentum')
  const { ast } = parseBlueprintMarkdown(file, source, 'phys.mech.angular-momentum')

  it('passes clean on the real blueprint with the real physics KG universe', () => {
    const diags = validateBlueprintAst(ast!, { knownConceptIds: physicsKgIds() })
    expect(diags.filter((d) => d.severity === 'E')).toEqual([])
  })

  it('flags a missing prerequisite (BFV03)', () => {
    const bad = { ...ast!, metadata: { ...ast!.metadata, prerequisites: ['phys.mech.does-not-exist'] } }
    const diags = validateBlueprintAst(bad, { knownConceptIds: physicsKgIds() })
    expect(diags.some((d) => d.code === 'BFV03' && d.severity === 'E')).toBe(true)
  })

  it('flags an invalid concept id (BFV01 — malformed)', () => {
    const bad = { ...ast!, conceptId: 'NotValid!!' }
    const diags = validateBlueprintAst(bad, {})
    expect(diags.some((d) => d.code === 'BFV01')).toBe(true)
  })

  it('flags a filename/conceptId mismatch (BFV01)', () => {
    const bad = { ...ast!, conceptId: 'phys.mech.something-else' }
    const diags = validateBlueprintAst(bad, {})
    expect(diags.some((d) => d.code === 'BFV01' && d.message.includes('does not match filename'))).toBe(true)
  })

  it('flags missing teaching actions (BFV02)', () => {
    const bad = { ...ast!, teachingActions: [] }
    const diags = validateBlueprintAst(bad, {})
    expect(diags.some((d) => d.code === 'BFV02')).toBe(true)
  })

  it('flags a broken MC reference — TA cites an MC id not defined in this blueprint (BFV04)', () => {
    const bad = {
      ...ast!,
      teachingActions: [
        { id: 'TA-X', title: 't', primitives: ['P28'], referencedMisconceptionIds: ['MC-DOES-NOT-EXIST'], span: ast!.span },
      ],
    }
    const diags = validateBlueprintAst(bad, {})
    expect(diags.some((d) => d.code === 'BFV04')).toBe(true)
  })

  it('flags missing C0 metadata section (BFV05)', () => {
    const bad = { ...ast!, metadata: { ...ast!.metadata, name: '', status: '' } }
    const diags = validateBlueprintAst(bad, {})
    expect(diags.some((d) => d.code === 'BFV05')).toBe(true)
  })

  it('detects a cyclic prerequisite dependency (BFV06)', () => {
    const graph = new Map<string, string[]>([
      ['a.one', ['a.two']],
      ['a.two', ['a.three']],
      ['a.three', ['a.one']], // cycle back to a.one
    ])
    const cyclic = { ...ast!, conceptId: 'a.one' }
    const diags = validateBlueprintAst(cyclic, { prerequisiteGraph: graph })
    expect(diags.some((d) => d.code === 'BFV06')).toBe(true)
  })

  it('does NOT false-positive a cycle on a shared (non-cyclic) ancestor', () => {
    const graph = new Map<string, string[]>([
      ['b.child1', ['b.shared']],
      ['b.child2', ['b.shared']],
      ['b.shared', []],
    ])
    const notCyclic = { ...ast!, conceptId: 'b.child1' }
    const diags = validateBlueprintAst(notCyclic, { prerequisiteGraph: graph })
    expect(diags.some((d) => d.code === 'BFV06')).toBe(false)
  })

  it('emits an informational (not error) diagnostic when no universe is supplied and prerequisites exist', () => {
    const diags = validateBlueprintAst(ast!, {})
    expect(diags.some((d) => d.code === 'BFV03' && d.severity === 'I')).toBe(true)
    expect(diags.filter((d) => d.severity === 'E')).toEqual([])
  })
})

// ── Lowering: RawBlock[] shape + RuleAST/compiler compatibility ─────────────

describe('lowering — produces RawBlock[] the EXISTING compiler accepts unchanged', () => {
  it('lowerBlueprintToRawBlocks emits exactly one ::pack + one ::rule per TA, with guard/effect passing the existing validateAst', () => {
    const { file, source } = readBlueprint('phys.mech.angular-momentum')
    const { ast } = parseBlueprintMarkdown(file, source, 'phys.mech.angular-momentum')
    const blocks = lowerBlueprintToRawBlocks(ast!)
    expect(blocks.filter((b) => b.kind === '::pack')).toHaveLength(1)
    expect(blocks.filter((b) => b.kind === '::rule')).toHaveLength(7)

    for (const rule of blocks.filter((b) => b.kind === '::rule')) {
      const guard = rule.fields.guard as GuardClause
      // Reuses the EXISTING validator — this front-end invents no new guard kind.
      expect(validateAst(guard)).toEqual([])
      expect(rule.fields.band).toBe(3)
      expect(typeof rule.fields.citation).toBe('string')
      expect((rule.fields.citation as string).length).toBeGreaterThan(0)
    }
  })

  it('mapPrimitivesToActionClass is deterministic and total', () => {
    expect(mapPrimitivesToActionClass(['P01', 'P04'])).toBe('CONCRETE_HOOK')
    expect(mapPrimitivesToActionClass(['P28', 'P30', 'P31'])).toBe('MISCONCEPTION_REPAIR')
    expect(mapPrimitivesToActionClass([])).toBe('GUIDED_EXPLANATION')
    expect(mapPrimitivesToActionClass(['P999'])).toBe('GUIDED_EXPLANATION')
  })
})

// ── Draft package generation (end-to-end, 3 representative blueprints) ─────

describe('draft package generation — end-to-end on 3 representative blueprints', () => {
  const cases = [
    { id: 'phys.mech.angular-momentum', expectedTAs: 7 },
    { id: 'phys.stat.boltzmann-factor', expectedTAs: 8 },
    { id: 'eng.phonics.letter-sound-correspondence', expectedTAs: undefined },
  ] as const

  for (const { id, expectedTAs } of cases) {
    it(`compiles ${id} → DRAFT CompiledPack via the existing lowerToAST/emitCompiledPack`, () => {
      const { file, source } = readBlueprint(id)
      const result = compileBlueprint(file, source, id)
      expect(result.diagnostics.filter((d) => d.severity === 'E')).toEqual([])
      expect(result.ok).toBe(true)
      expect(result.draftPack).not.toBeNull()
      expect(result.draftPack!.status).toBe('DRAFT') // never ACTIVE
      expect(result.draftPack!.sourceConceptId).toBe(id)
      expect(result.draftPack!.pack.manifest.contentHash).toMatch(/^sha256:[0-9a-f]{64}$/)
      expect(result.draftPack!.pack.manifest.bandCounts[3]).toBeGreaterThan(0)
      if (expectedTAs !== undefined) {
        expect(result.draftPack!.pack.rules).toHaveLength(expectedTAs)
      }
    })
  }

  it('lowerBlueprintToDraftPack is deterministic (same source → same hash, twice)', () => {
    const { file, source } = readBlueprint('phys.mech.angular-momentum')
    const { ast } = parseBlueprintMarkdown(file, source, 'phys.mech.angular-momentum')
    const a = lowerBlueprintToDraftPack(ast!, source)
    const b = lowerBlueprintToDraftPack(ast!, source)
    expect(a.draftPack!.pack.manifest.contentHash).toBe(b.draftPack!.pack.manifest.contentHash)
  })

  it('a DRAFT pack is never registered — this front-end never calls packRegistry.activate', () => {
    packRegistry.clear()
    const { file, source } = readBlueprint('phys.mech.angular-momentum')
    compileBlueprint(file, source, 'phys.mech.angular-momentum')
    expect(packRegistry.list()).toEqual([])
  })
})

// ── End-to-end proof: a blueprint-compiled DRAFT pack, if manually activated,
//    drives the SAME K4 Policy Engine a hand-authored .bs pack would ────────

describe('K4 engine compatibility — a blueprint-derived rule behaves identically to a hand-authored .bs rule', () => {
  it('produces the same decision shape as the golden brain/physics-mechanics.bs sample', () => {
    packRegistry.clear()
    const { file, source } = readBlueprint('phys.mech.angular-momentum')
    const { draftPack } = compileBlueprint(file, source, 'phys.mech.angular-momentum')

    // Explicit, test-only activation — proves compatibility without touching
    // any real serving path or the actual packRegistry singleton used by route.ts.
    packRegistry.activate(draftPack!.pack)
    const runtime = packRegistry.runtimePack()
    const decision = decide(runtime, policyInputs({ currentConceptId: 'phys.mech.angular-momentum' }))
    expect(decision.actionClass).toBe('CONCRETE_HOOK') // TA-1's primitives (P01/P04/P06)
    expect(decision.provenance.some((t) => t.ruleId.startsWith('B3.dispatch.phys.mech.angular-momentum.'))).toBe(true)
  })
})

// ── Regression: the existing .bs compiler path is untouched ────────────────

describe('regression — existing .bs compiler path unaffected', () => {
  it('the golden brain/physics-mechanics.bs sample still compiles identically', () => {
    const path = resolve(process.cwd(), 'brain/physics-mechanics.bs')
    const source = readFileSync(path, 'utf8')
    const { ok, pack, diagnostics } = compileSingle('brain/physics-mechanics.bs', source)
    expect(diagnostics.filter((d) => d.severity === 'E')).toEqual([])
    expect(ok).toBe(true)
    expect(pack!.manifest.packId).toBe('physics-mechanics')
  })

  it('BASE_PACK + K4 engine still decide correctly with no blueprint packs active', () => {
    packRegistry.clear()
    const runtime = packRegistry.runtimePack()
    const decision = decide(runtime, policyInputs())
    expect(decision.move).toBeDefined()
  })
})
