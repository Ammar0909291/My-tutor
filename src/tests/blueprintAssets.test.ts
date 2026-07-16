/**
 * Blueprint Front-End — Phase 1.5 Knowledge Compilation Layer tests:
 * AssetAST generation · per-kind lowering (explanation / worked example /
 * misconception / learning objective / mastery probe / adaptive rule /
 * session flow) · Educational Package assembly · determinism · backward
 * compatibility with Phase 1 · existing-compiler compatibility.
 *
 * Validation corpus (Phase 1.5 spec: one Physics, one Mathematics, one
 * English): physics = phys.mech.angular-momentum.md; mathematics =
 * math.abst.binary-operation.md (the Tier-1 math corpus, 154 files, landed
 * on `main` mid-phase via merge bfc1e22 — it is a fifth structural variant:
 * "## Component N: Title" colon separators, "TA-A01 ·" middot separators,
 * BLUEPRINT_ID/nested-KG_FIELDS metadata, misconception REGISTRY TABLES
 * instead of ### MC- headers); English =
 * eng.phonics.letter-sound-correspondence.md. phys.stat.boltzmann-factor.md
 * and phys.em.amperes-law.md additionally exercise the other corpus variants
 * (YAML identity block, WE-N examples, Adaptive Branching, Session Flow
 * Script) at the asset-lowering layer.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  parseBlueprintMarkdown, lowerBlueprintToAssets, compileBlueprint,
  assembleEducationalPackage, compileBlueprintToPackage,
} from '@/lib/curriculum/blueprintFrontend'
import type { AssetNode, BlueprintAST } from '@/lib/curriculum/blueprintFrontend'
import { compileSingle } from '@/lib/brain-compiler/compile'
import { packRegistry } from '@/lib/brain-compiler/registry'

function readBlueprint(conceptId: string): { file: string; source: string } {
  const file = `docs/curriculum/blueprints/${conceptId}.md`
  const source = readFileSync(resolve(process.cwd(), file), 'utf8')
  return { file, source }
}

function parsedAst(conceptId: string): { ast: BlueprintAST; source: string } {
  const { file, source } = readBlueprint(conceptId)
  const { ast } = parseBlueprintMarkdown(file, source, conceptId)
  expect(ast).not.toBeNull()
  return { ast: ast!, source }
}

function byKind(assets: AssetNode[], kind: AssetNode['kind']): AssetNode[] {
  return assets.filter((a) => a.kind === kind)
}

// ── AssetAST generation ──────────────────────────────────────────────────────

describe('AssetAST generation', () => {
  it('lowers phys.mech.angular-momentum into a non-empty, deterministic AssetAST', () => {
    const { ast } = parsedAst('phys.mech.angular-momentum')
    const a = lowerBlueprintToAssets(ast)
    const b = lowerBlueprintToAssets(ast)
    expect(a.assets.length).toBeGreaterThan(10)
    expect(JSON.stringify(a)).toBe(JSON.stringify(b)) // byte-deterministic
    // Every asset carries the full identity contract.
    for (const asset of a.assets) {
      expect(asset.assetId).toMatch(/^phys\.mech\.angular-momentum\//)
      expect(asset.conceptId).toBe('phys.mech.angular-momentum')
      expect(asset.language).toBe('en')
      expect(asset.content.length).toBeGreaterThan(0)
      expect(asset.span.file).toBe('docs/curriculum/blueprints/phys.mech.angular-momentum.md')
    }
    // assetIds are unique.
    expect(new Set(a.assets.map((x) => x.assetId)).size).toBe(a.assets.length)
  })
})

// ── Per-kind lowering ────────────────────────────────────────────────────────

describe('explanation lowering', () => {
  it('extracts the Concept Spine as core_explanation, cut before worked examples', () => {
    const { ast } = parsedAst('phys.mech.angular-momentum')
    const exps = byKind(lowerBlueprintToAssets(ast).assets, 'core_explanation')
    expect(exps).toHaveLength(1)
    expect(exps[0].content).toContain('rotational analog of linear momentum')
    expect(exps[0].content).not.toContain('Worked Example 1') // cut applied
  })

  it('falls back to the Concept Profile "Core idea" for Protocol-format (English)', () => {
    const { ast } = parsedAst('eng.phonics.letter-sound-correspondence')
    const exps = byKind(lowerBlueprintToAssets(ast).assets, 'core_explanation')
    expect(exps).toHaveLength(1)
    expect(exps[0].content).toContain('phonemes')
  })
})

describe('worked example lowering', () => {
  it('extracts the 3 spine-embedded worked examples (angular-momentum)', () => {
    const { ast } = parsedAst('phys.mech.angular-momentum')
    const wes = byKind(lowerBlueprintToAssets(ast).assets, 'worked_example')
    expect(wes).toHaveLength(3)
    expect(wes.map((w) => w.localKey)).toEqual(['WE-1', 'WE-2', 'WE-3'])
    expect(wes[1].content).toContain('ΔL = τΔt')
  })

  it('extracts WE-N blocks from a dedicated Worked Examples section (amperes-law variant)', () => {
    const { ast } = parsedAst('phys.em.amperes-law')
    const wes = byKind(lowerBlueprintToAssets(ast).assets, 'worked_example')
    expect(wes.length).toBeGreaterThanOrEqual(2)
    expect(wes[0].localKey).toBe('WE-1')
    expect(wes[0].content).toContain('solid copper wire')
  })
})

describe('misconception lowering', () => {
  it('lowers each authored MC block verbatim, keyed by authored id', () => {
    const { ast } = parsedAst('phys.mech.angular-momentum')
    const mcs = byKind(lowerBlueprintToAssets(ast).assets, 'misconception')
    expect(mcs.length).toBeGreaterThanOrEqual(2)
    const lIsOmega = mcs.find((m) => m.localKey === 'MC-L-IS-OMEGA')!
    expect(lIsOmega).toBeDefined()
    expect(lIsOmega.assetId).toBe('phys.mech.angular-momentum/misconception/MC-L-IS-OMEGA')
    expect(lIsOmega.content).toContain('Trigger signals') // full body preserved
    expect(lIsOmega.refs).toContain('MC-L-IS-OMEGA')
  })
})

describe('learning objective lowering', () => {
  it('extracts the Learning Objective section (Protocol-format English)', () => {
    const { ast } = parsedAst('eng.phonics.letter-sound-correspondence')
    const los = byKind(lowerBlueprintToAssets(ast).assets, 'learning_objective')
    expect(los).toHaveLength(1)
    expect(los[0].content).toContain('blends the phonemes')
  })

  it('yields zero learning_objective assets when the section is not authored (angular-momentum)', () => {
    const { ast } = parsedAst('phys.mech.angular-momentum')
    expect(byKind(lowerBlueprintToAssets(ast).assets, 'learning_objective')).toHaveLength(0)
  })
})

describe('mastery probe lowering', () => {
  it('splits the Mastery Probe Bank into 5 MP-keyed probes (angular-momentum)', () => {
    const { ast } = parsedAst('phys.mech.angular-momentum')
    const mps = byKind(lowerBlueprintToAssets(ast).assets, 'mastery_probe')
    expect(mps).toHaveLength(5)
    expect(mps.map((p) => p.localKey)).toEqual(['MP-1', 'MP-2', 'MP-3', 'MP-4', 'MP-5'])
    // MP-1 discriminates MC-L-IS-OMEGA — the cross-reference is captured.
    expect(mps[0].refs).toContain('MC-L-IS-OMEGA')
  })

  it('falls back to one probe-bank asset for Assessment sections without MP-N structure (boltzmann)', () => {
    const { ast } = parsedAst('phys.stat.boltzmann-factor')
    const mps = byKind(lowerBlueprintToAssets(ast).assets, 'mastery_probe')
    expect(mps).toHaveLength(1)
    expect(mps[0].content).toContain('Mastery Gate')
  })
})

describe('adaptive rule lowering', () => {
  it('lowers the Adaptive Branching section (amperes-law variant)', () => {
    const { ast } = parsedAst('phys.em.amperes-law')
    const ars = byKind(lowerBlueprintToAssets(ast).assets, 'adaptive_rule')
    expect(ars).toHaveLength(1)
    expect(ars[0].content).toContain('| Signal | Branch |')
  })

  it('yields zero adaptive_rule assets when not authored (angular-momentum)', () => {
    const { ast } = parsedAst('phys.mech.angular-momentum')
    expect(byKind(lowerBlueprintToAssets(ast).assets, 'adaptive_rule')).toHaveLength(0)
  })
})

describe('session flow lowering', () => {
  it('lowers the Session Flow Script section (amperes-law variant)', () => {
    const { ast } = parsedAst('phys.em.amperes-law')
    const sfs = byKind(lowerBlueprintToAssets(ast).assets, 'session_flow')
    expect(sfs).toHaveLength(1)
    expect(sfs[0].content).toContain('[P01 — Session open]')
  })
})

describe('teaching action metadata lowering', () => {
  it('emits one teaching_action_meta per TA with canonical JSON content, joinable to the rule layer by localKey', () => {
    const { ast } = parsedAst('phys.mech.angular-momentum')
    const tams = byKind(lowerBlueprintToAssets(ast).assets, 'teaching_action_meta')
    expect(tams).toHaveLength(7)
    const ta4 = tams.find((t) => t.localKey === 'TA-4')!
    const parsed = JSON.parse(ta4.content)
    expect(parsed.addresses).toContain('MC-L-IS-OMEGA')
    expect(parsed.primitives).toContain('P28')
  })
})

describe('prerequisite metadata (YAML identity-block variant)', () => {
  it('parses YAML block-list prerequisites (amperes-law)', () => {
    const { ast } = parsedAst('phys.em.amperes-law')
    expect(ast.metadata.prerequisites).toEqual(['phys.em.biot-savart'])
  })
})

// ── Mathematics corpus variant (landed on main mid-phase) ────────────────────

describe('mathematics variant — math.abst.binary-operation', () => {
  it('parses colon-separated components, middot TA headers, and nested KG_FIELDS metadata', () => {
    const { ast } = parsedAst('math.abst.binary-operation')
    expect(ast.conceptId).toBe('math.abst.binary-operation')       // via BLUEPRINT_ID
    expect(ast.metadata.prerequisites).toEqual(['math.found.function-set-theoretic']) // nested requires
    expect(ast.metadata.masteryThreshold).toBe(0.90)               // indented field
    expect(ast.metadata.status).toContain('PACKAGE_READY')         // uppercase STATUS:
    expect(ast.teachingActions.length).toBeGreaterThanOrEqual(4)   // TA-A01..TA-A04 (· separator)
    expect(ast.teachingActions.some((t) => t.id === 'TA-A01')).toBe(true)
  })

  it('extracts misconceptions from the registry TABLE (no ### MC- headers)', () => {
    const { ast } = parsedAst('math.abst.binary-operation')
    expect(ast.misconceptions.map((m) => m.id)).toEqual(['MC-1', 'MC-2', 'MC-3'])
    expect(ast.misconceptions[0].label).toBe('CLOSURE-VIOLATION')
    expect(ast.misconceptions[0].body).toContain('|') // verbatim table row
  })

  it('lowers the Cognitive Map as core_explanation and the registry rows as misconception assets', () => {
    const { ast } = parsedAst('math.abst.binary-operation')
    const assets = lowerBlueprintToAssets(ast).assets
    const exps = byKind(assets, 'core_explanation')
    expect(exps).toHaveLength(1)
    expect(exps[0].content).toContain('binary operation')
    expect(byKind(assets, 'misconception')).toHaveLength(3)
  })
})

// ── Educational Package assembly ─────────────────────────────────────────────

describe('Educational Package assembly', () => {
  const cases = ['phys.mech.angular-momentum', 'math.abst.binary-operation', 'eng.phonics.letter-sound-correspondence'] as const

  for (const id of cases) {
    it(`assembles a DRAFT Educational Package for ${id} (rule layer + knowledge layer)`, () => {
      const { file, source } = readBlueprint(id)
      const result = compileBlueprintToPackage(file, source, id)
      expect(result.diagnostics.filter((d) => d.severity === 'E')).toEqual([])
      expect(result.ok).toBe(true)
      const pkg = result.educationalPackage!
      expect(pkg.status).toBe('DRAFT') // never ACTIVE
      expect(pkg.manifest.conceptId).toBe(id)
      expect(pkg.manifest.packageId).toBe(`${id}-package`)
      expect(pkg.manifest.contentHash).toMatch(/^sha256:[0-9a-f]{64}$/)
      expect(pkg.manifest.ruleCount).toBeGreaterThan(0)     // Rule Layer present
      expect(pkg.manifest.assetCount).toBeGreaterThan(0)    // Knowledge Layer present
      expect(pkg.assets.length).toBe(pkg.manifest.assetCount)
      expect(pkg.rulePack.rules.length).toBe(pkg.manifest.ruleCount)
      // Concept metadata rides the package envelope.
      expect(pkg.concept.prerequisites.length).toBeGreaterThan(0)
      // Extension points exist and are empty by construction.
      expect(pkg.extensionPoints).toEqual({ diagrams: [], animations: [], simulations: [] })
      // Package is fully JSON-serializable (round-trips).
      expect(JSON.parse(JSON.stringify(pkg))).toEqual(pkg)
    })
  }

  it('package assembly is deterministic (same source → same contentHash, twice)', () => {
    const { file, source } = readBlueprint('phys.mech.angular-momentum')
    const a = compileBlueprintToPackage(file, source, 'phys.mech.angular-momentum')
    const b = compileBlueprintToPackage(file, source, 'phys.mech.angular-momentum')
    expect(a.educationalPackage!.manifest.contentHash).toBe(b.educationalPackage!.manifest.contentHash)
  })

  it('semantic errors block package assembly (same gate as Phase 1)', () => {
    const { file } = readBlueprint('phys.mech.angular-momentum')
    // Wrong filename-derived id → BFV01 mismatch → no package.
    const { source } = readBlueprint('phys.mech.angular-momentum')
    const result = compileBlueprintToPackage('docs/curriculum/blueprints/other-name.md', source, 'other-name')
    expect(result.ok).toBe(false)
    expect(result.educationalPackage).toBeNull()
    expect(file).toContain('angular-momentum') // (silence unused warning)
  })

  it('never registers anything — packRegistry stays empty after package assembly', () => {
    packRegistry.clear()
    const { file, source } = readBlueprint('phys.mech.angular-momentum')
    compileBlueprintToPackage(file, source, 'phys.mech.angular-momentum')
    expect(packRegistry.list()).toEqual([])
  })
})

// ── Backward compatibility ───────────────────────────────────────────────────

describe('backward compatibility — Phase 1 rule layer is untouched', () => {
  it('the rulePack inside the package is hash-identical to Phase 1 compileBlueprint output', () => {
    const { file, source } = readBlueprint('phys.mech.angular-momentum')
    const phase1 = compileBlueprint(file, source, 'phys.mech.angular-momentum')
    const { ast } = parsedAst('phys.mech.angular-momentum')
    const phase15 = assembleEducationalPackage(ast, source)
    expect(phase15.educationalPackage!.rulePack.manifest.contentHash)
      .toBe(phase1.draftPack!.pack.manifest.contentHash)
    // CompiledPack shape untouched: same rules, same manifest fields.
    expect(phase15.educationalPackage!.rulePack.rules).toEqual(phase1.draftPack!.pack.rules)
  })

  it('Phase 1 compileBlueprint still works unchanged (regression)', () => {
    const { file, source } = readBlueprint('phys.stat.boltzmann-factor')
    const result = compileBlueprint(file, source, 'phys.stat.boltzmann-factor')
    expect(result.ok).toBe(true)
    expect(result.draftPack!.status).toBe('DRAFT')
    expect(result.draftPack!.pack.rules).toHaveLength(8)
  })
})

// ── Existing-compiler compatibility ─────────────────────────────────────────

describe('compiler compatibility — existing .bs path unaffected by Phase 1.5', () => {
  it('the golden brain/physics-mechanics.bs sample still compiles identically', () => {
    const source = readFileSync(resolve(process.cwd(), 'brain/physics-mechanics.bs'), 'utf8')
    const { ok, pack, diagnostics } = compileSingle('brain/physics-mechanics.bs', source)
    expect(diagnostics.filter((d) => d.severity === 'E')).toEqual([])
    expect(ok).toBe(true)
    expect(pack!.manifest.packId).toBe('physics-mechanics')
  })
})
