/**
 * Package Runtime tests (first Educational Package Runtime, PoC):
 * loader validation gates · reader views · lesson assembly · the
 * "tutor teaches" seam (package rule layer drives the K4 engine; package
 * knowledge layer builds the prompt context) · NO blueprint markdown
 * accessed at lesson time · regression (legacy path + flag default-off).
 *
 * Proof concept: phys.mech.angular-momentum via the committed artifact
 * brain/packages/phys.mech.angular-momentum.package.json (compiled ahead
 * of time by `npm run compile:package -- phys.mech.angular-momentum`).
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import fs from 'fs'
import {
  loadEducationalPackage, validateEducationalPackage, hasPackageArtifact,
  clearPackageCache, buildLessonContextForConcept, assembleLessonContext,
  getCoreExplanation, getWorkedExamples, getMisconceptions, getMisconception,
  getTeachingNotes, getTeachingActions, getMasteryProbes, getAdaptiveRules,
  getSessionFlow, getLearningObjectives, getPrerequisites, getConceptMetadata,
  getReferences,
} from '@/lib/curriculum/packageRuntime'
import type { EducationalPackage } from '@/lib/curriculum/packageRuntime'
import { packRegistry } from '@/lib/brain-compiler/registry'
import { decide } from '@/lib/kernel/policy'
import type { PolicyInputs } from '@/lib/kernel/policy/types'

const CONCEPT = 'phys.mech.angular-momentum'

function loadedPkg(): EducationalPackage {
  const r = loadEducationalPackage(CONCEPT)
  if (!r.ok) throw new Error(r.reason)
  return r.pkg
}

function tampered(mutate: (p: EducationalPackage) => void): EducationalPackage {
  const copy = JSON.parse(JSON.stringify(loadedPkg())) as EducationalPackage
  mutate(copy)
  return copy
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

beforeEach(() => { clearPackageCache() })
afterEach(() => { vi.restoreAllMocks() })

// ── Phase 1: Loader ──────────────────────────────────────────────────────────

describe('package loader — load + full validation', () => {
  it('loads and validates the committed DRAFT artifact', () => {
    expect(hasPackageArtifact(CONCEPT)).toBe(true)
    const r = loadEducationalPackage(CONCEPT)
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.pkg.status).toBe('DRAFT')
    expect(r.pkg.manifest.conceptId).toBe(CONCEPT)
    expect(r.pkg.manifest.ruleCount).toBe(7)
    expect(r.pkg.manifest.assetCount).toBe(22)
  })

  it('returns { ok: false } for a concept with no artifact — never throws', () => {
    expect(hasPackageArtifact('phys.mech.no-such-concept')).toBe(false)
    const r = loadEducationalPackage('phys.mech.no-such-concept')
    expect(r.ok).toBe(false)
  })

  it('rejects a tampered asset (whole-package integrity)', () => {
    const bad = tampered((p) => { p.assets[0].content = 'TAMPERED' })
    expect(validateEducationalPackage(CONCEPT, bad)).toMatch(/package integrity failure/)
  })

  it('rejects a tampered rule (rule-layer integrity — same check as the .bs loader)', () => {
    const bad = tampered((p) => { p.rulePack.rules[0].ruleId = 'INJECTED' })
    expect(validateEducationalPackage(CONCEPT, bad)).toMatch(/rule-layer integrity failure/)
  })

  it('rejects a non-DRAFT status (activation is a later, gated phase)', () => {
    const bad = tampered((p) => { (p as { status: string }).status = 'ACTIVE' })
    expect(validateEducationalPackage(CONCEPT, bad)).toMatch(/unexpected package status/)
  })

  it('rejects an unsupported compiler id (schema-version gate)', () => {
    const bad = tampered((p) => { p.manifest.compiler = 'unknown-compiler@9.9.9' })
    expect(validateEducationalPackage(CONCEPT, bad)).toMatch(/unsupported package compiler/)
  })

  it('rejects an invalid packageVersion', () => {
    const bad = tampered((p) => { p.manifest.packageVersion = 'not-semver' })
    expect(validateEducationalPackage(CONCEPT, bad)).toMatch(/invalid packageVersion/)
  })

  it('rejects a conceptId mismatch', () => {
    expect(validateEducationalPackage('phys.mech.other', loadedPkg())).toMatch(/conceptId mismatch/)
  })

  it('never touches packRegistry — no automatic activation', () => {
    packRegistry.clear()
    loadEducationalPackage(CONCEPT)
    buildLessonContextForConcept(CONCEPT)
    expect(packRegistry.list()).toEqual([])
  })
})

// ── Phase 2: Reader ──────────────────────────────────────────────────────────

describe('package reader — read-only views', () => {
  it('serves every asset family of the proof package', () => {
    const pkg = loadedPkg()
    expect(getCoreExplanation(pkg)!.content).toContain('rotational analog of linear momentum')
    expect(getWorkedExamples(pkg)).toHaveLength(3)
    expect(getMisconceptions(pkg)).toHaveLength(2)
    expect(getMisconception(pkg, 'MC-L-IS-OMEGA')!.content).toContain('Trigger signals')
    expect(getMisconception(pkg, 'MC-NOPE')).toBeNull()
    expect(getTeachingNotes(pkg).length).toBe(4)
    expect(getTeachingActions(pkg)).toHaveLength(7)
    expect(getMasteryProbes(pkg).map((p) => p.localKey)).toEqual(['MP-1', 'MP-2', 'MP-3', 'MP-4', 'MP-5'])
    expect(getPrerequisites(pkg)).toEqual(['phys.mech.rotational-dynamics', 'phys.mech.momentum'])
    expect(getConceptMetadata(pkg).masteryThreshold).toBe(0.80)
    // Kinds this blueprint doesn't author — empty, not undefined.
    expect(getAdaptiveRules(pkg)).toEqual([])
    expect(getSessionFlow(pkg)).toBeNull()
    expect(getLearningObjectives(pkg)).toEqual([])
    expect(getReferences(pkg)).toEqual([])
  })

  it('getConceptMetadata returns a copy — callers cannot mutate the package', () => {
    const pkg = loadedPkg()
    const meta = getConceptMetadata(pkg)
    meta.prerequisites.push('injected')
    expect(getPrerequisites(pkg)).toHaveLength(2)
  })
})

// ── Phase 3: Lesson Assembler ────────────────────────────────────────────────

describe('lesson assembler — Student State + Package → Lesson Context', () => {
  it('builds a fully package-derived lesson context', () => {
    const ctx = assembleLessonContext({}, loadedPkg())
    expect(ctx.source).toBe('educational-package')
    expect(ctx.conceptId).toBe(CONCEPT)
    expect(ctx.packageHash).toMatch(/^sha256:/)
    expect(ctx.block).toContain('EDUCATIONAL PACKAGE CONTEXT')
    expect(ctx.block).toContain('rotational analog')          // core explanation
    expect(ctx.block).toContain('KNOWN MISCONCEPTIONS')
    expect(ctx.block).toContain('MC-L-IS-OMEGA')
    expect(ctx.block).toContain('MASTERY PROBES')
    expect(ctx.block).toContain('MP-5')
    expect(ctx.prerequisites).toHaveLength(2)
  })

  it('modulates worked-example budget by register (beginner 1, expert 3)', () => {
    const pkg = loadedPkg()
    expect(assembleLessonContext({ register: 'beginner' }, pkg).workedExamples).toHaveLength(1)
    expect(assembleLessonContext({ register: 'intermediate' }, pkg).workedExamples).toHaveLength(2)
    expect(assembleLessonContext({ register: 'expert' }, pkg).workedExamples).toHaveLength(3)
  })

  it('surfaces active misconceptions first, flagged for repair', () => {
    const ctx = assembleLessonContext({ activeMisconceptionIds: ['MC-TORQUE-CHANGES-SPEED'] }, loadedPkg())
    expect(ctx.misconceptions[0].localKey).toBe('MC-TORQUE-CHANGES-SPEED')
    expect(ctx.block).toContain('MC-TORQUE-CHANGES-SPEED [ACTIVE — repair first]')
  })

  it('is deterministic — same (state, package) → identical block', () => {
    const pkg = loadedPkg()
    const a = assembleLessonContext({ register: 'beginner' }, pkg)
    const b = assembleLessonContext({ register: 'beginner' }, pkg)
    expect(a.block).toBe(b.block)
  })
})

// ── Phase 4: Proof — the tutor teaches from the package ─────────────────────

describe('proof of concept — one lesson driven entirely by the package', () => {
  it('NO blueprint markdown is accessed during load + lesson assembly', () => {
    clearPackageCache()
    const readPaths: string[] = []
    const realRead = fs.readFileSync
    vi.spyOn(fs, 'readFileSync').mockImplementation((...args: Parameters<typeof fs.readFileSync>) => {
      readPaths.push(String(args[0]))
      return realRead(...args)
    })

    const ctx = buildLessonContextForConcept(CONCEPT, { register: 'beginner' })
    expect(ctx).not.toBeNull()
    expect(ctx!.block.length).toBeGreaterThan(500)

    // The ONLY file read is the compiled artifact — never authoring markdown.
    expect(readPaths.some((p) => p.includes('brain/packages'))).toBe(true)
    expect(readPaths.some((p) => p.includes('curriculum/blueprints'))).toBe(false)
    expect(readPaths.some((p) => p.endsWith('.md'))).toBe(false)
  })

  it('the package rule layer drives the existing K4 engine (Rule Layer teaches)', () => {
    packRegistry.clear()
    const pkg = loadedPkg()
    // Explicit, test-only activation — proves the rulePack inside the
    // Educational Package is the SAME CompiledPack shape the runtime loads.
    packRegistry.activate(pkg.rulePack)
    const decision = decide(packRegistry.runtimePack(), policyInputs({ currentConceptId: CONCEPT }))
    expect(decision.actionClass).toBe('CONCRETE_HOOK') // TA-1 (P01/P04/P06)
    expect(decision.provenance.some((t) => t.ruleId.startsWith(`B3.dispatch.${CONCEPT}.`))).toBe(true)
    packRegistry.clear()
  })

  it('the knowledge layer supplies the complete teaching context (Knowledge Layer teaches)', () => {
    const ctx = buildLessonContextForConcept(CONCEPT, { register: 'intermediate', isFirstExposure: true })!
    // Everything a lesson needs, all package-derived:
    expect(ctx.coreExplanation).not.toBeNull()      // explanation ✓
    expect(ctx.workedExamples.length).toBeGreaterThan(0) // examples ✓
    expect(ctx.misconceptions).toHaveLength(2)       // misconception watchlist ✓
    expect(ctx.masteryProbes).toHaveLength(5)        // mastery gating material ✓
    expect(ctx.block).toContain('Use this package context to teach accurately')
  })
})

// ── Regression ───────────────────────────────────────────────────────────────

describe('regression — legacy path intact, flag default-off', () => {
  it('legacy blueprintLoader still serves the same concept (fallback path alive)', async () => {
    const { loadBlueprintContent } = await import('@/lib/curriculum/blueprintLoader')
    const r = loadBlueprintContent(CONCEPT)
    expect(r.found).toBe(true)
  })

  it('ENABLE_PACKAGE_RUNTIME is not set in the test environment (default off)', () => {
    expect(process.env.ENABLE_PACKAGE_RUNTIME).toBeUndefined()
  })
})
