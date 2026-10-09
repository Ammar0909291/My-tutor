/**
 * CHEMISTRY VISUAL INVENTORY — Phase 0 of the chemistry visual audit (READ-ONLY).
 *
 *   npx tsx scripts/chemistry/visual-audit/inventory.ts                 # summary to stdout
 *   npx tsx scripts/chemistry/visual-audit/inventory.ts --out <dir>     # also write the artefacts
 *
 * WHAT IT DOES. For EVERY concept in the canonical chemistry Knowledge Graph it
 * calls the REAL synchronous resolver (`resolveVisual`, i.e. Tier -1 retired,
 * Tier 0 authored/kind-default scene, Tier 1 curated/domain card) exactly as
 * the learn/chat route does for a lesson turn, and records what a learner
 * would be shown. It then de-duplicates the answers into UNIQUE VISUAL
 * INSTANCES (many concepts share one card / one scene) and emits a manifest a
 * browser harness can render without importing any app code.
 *
 * WHAT IT DOES NOT DO. No database, no network, no AI provider call. It does
 * not create a second registry or renderer: it only READS the live ones. The
 * two tiers that need infrastructure — Tier 2 "approved" (ACTIVE visual assets
 * in the production database) and Tier 3 "generated" (an LLM call behind a
 * critic) — cannot run offline; they are reported as ELIGIBILITY, never as
 * content. The script writes nothing unless `--out` is given, and then only
 * inside that directory.
 *
 * DETERMINISM. No clock, no randomness, no environment reads in the output;
 * running it twice yields byte-identical files (verified by diffing).
 *
 * Output files (with --out):
 *   chem-manifest.json    array of unique instances (the renderer contract)
 *   chem-concepts.json    one record per chemistry concept (186) + summary
 *   chem-inventory.md     human summary with the count tables
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

import { getKnowledgeGraph, getAllNodes } from '../../../src/lib/curriculum/knowledgeGraph'
import { resolveVisual } from '../../../src/lib/teaching/visual/resolveVisual'
import { figureFingerprint } from '../../../src/lib/teaching/visual/fingerprint'
import { lookupConceptVisualBinding, getConceptSceneGenerator } from '../../../src/lib/teaching/visualRegistry'
import { CONCEPT_SCENE_OVERRIDES } from '../../../src/lib/teaching/visual/conceptSceneParams'
import { isRetiredVisualBinding, retirementReason } from '../../../src/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '../../../src/lib/teaching/visual/scope'
import { validateSceneSpec } from '../../../src/lib/teaching/sceneSpecValidator'
import { PARAMETRIC_SCENES, rebuildScene, variablesFor } from '../../../src/lib/teaching/visual/parametricScenes'
import { checkSceneLayoutAllViewports, frameReport, sceneTextObjects, VIEWPORTS } from '../../../src/lib/teaching/visual/layout'
import type { SceneSpec } from '../../../src/lib/teaching/sceneSpec'

// ───────────────────────────────────────────────────────────────────────────
// Repo access helpers (source scanning is READ-ONLY and only used for evidence
// such as "which builder produced this scene" and "which line registers it").
// ───────────────────────────────────────────────────────────────────────────
const ROOT = resolve(process.cwd())
if (!existsSync(join(ROOT, 'src/lib/teaching/visual/resolveVisual.ts'))) {
  console.error('Run this from the repository root (src/lib/teaching/visual/resolveVisual.ts not found).')
  process.exit(2)
}

const fileCache = new Map<string, string>()
function read(rel: string): string {
  let text = fileCache.get(rel)
  if (text === undefined) {
    text = readFileSync(join(ROOT, rel), 'utf8')
    fileCache.set(rel, text)
  }
  return text
}
/** 1-based line of the first line containing `needle`, or null when the source drifted. */
function findLine(rel: string, needle: string | RegExp): number | null {
  const lines = read(rel).split('\n')
  for (let i = 0; i < lines.length; i++) {
    if (typeof needle === 'string' ? lines[i].includes(needle) : needle.test(lines[i])) return i + 1
  }
  return null
}
function ref(rel: string, needle: string | RegExp): string {
  const line = findLine(rel, needle)
  return line === null ? `${rel}:NOT-FOUND(${String(needle)})` : `${rel}:${line}`
}

const REGISTRY = 'src/lib/teaching/visualRegistry.ts'
const SCENE_PARAMS = 'src/lib/teaching/visual/conceptSceneParams.ts'
const PARAMETRIC = 'src/lib/teaching/visual/parametricScenes.ts'
const GENERATORS = 'src/lib/teaching/sceneGenerators'
const CARD_DIR = 'src/components/school/visuals'

// ───────────────────────────────────────────────────────────────────────────
// Facts parsed from source (so they cannot drift from the code they describe)
// ───────────────────────────────────────────────────────────────────────────

/** `import { a, b as c } from 'x'`  ->  Map(a -> x, c -> x). */
function importedNames(rel: string): Map<string, string> {
  const out = new Map<string, string>()
  for (const m of read(rel).matchAll(/import\s*(?:type\s*)?\{([^}]*)\}\s*from\s*'([^']+)'/g)) {
    for (const raw of m[1].split(',')) {
      const name = raw.trim().split(/\s+as\s+/).pop()!.trim()
      if (name) out.set(name, m[2])
    }
  }
  return out
}
function modulePathToFile(spec: string): string {
  const p = spec.startsWith('@/') ? `src/${spec.slice(2)}` : spec
  for (const ext of ['.ts', '.tsx']) if (existsSync(join(ROOT, p + ext))) return p + ext
  return p
}

/** conceptId -> builder function name, for every `CONCEPT_SCENES` entry. */
function conceptSceneBuilders(): Map<string, string> {
  const src = read(SCENE_PARAMS)
  const from = src.indexOf('const CONCEPT_SCENES')
  const to = src.indexOf('\nconst DANIELL_CELL')
  if (from < 0 || to < from) throw new Error('CONCEPT_SCENES block not found in conceptSceneParams.ts')
  const out = new Map<string, string>()
  for (const m of src.slice(from, to).matchAll(/^\s*'([a-z_]+\.[a-z0-9._-]+)':\s*(?:\(\)\s*=>\s*)?(\w+)/gm)) out.set(m[1], m[2])
  return out
}

/** VisualType -> React component, read from VisualCard's own switch. */
function cardComponents(): Map<string, string> {
  const out = new Map<string, string>()
  for (const m of read(`${CARD_DIR}/VisualCard.tsx`).matchAll(/case '([a-z_0-9]+)':\s*return <(\w+)/g)) out.set(m[1], m[2])
  return out
}

// ───────────────────────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────────────────────
type Origin = 'authored' | 'kind-default' | 'domain-default' | 'none'
interface Flags {
  graph: boolean; molecular: boolean; reaction: boolean; processFlow: boolean
  threeD: boolean; periodic: boolean; equilibrium: boolean; energyProfile: boolean
}
const NO_FLAGS: Flags = {
  graph: false, molecular: false, reaction: false, processFlow: false,
  threeD: false, periodic: false, equilibrium: false, energyProfile: false,
}

interface ConceptRecord {
  conceptId: string
  title: string
  domain: string
  /** 'figure' = the synchronous tiers serve something; 'none' = no figure from Tier -1/0/1. */
  outcome: 'figure' | 'none'
  /** 0 = Tier 0 scene, 1 = Tier 1 card, -1 = retired and nothing survived, null = no figure at all. */
  tier: 0 | 1 | -1 | null
  tierLabel: string
  origin: Origin
  originCoarse: 'authored' | 'fallback' | 'none'
  provenance: string | null
  scope: 'concept' | 'domain' | null
  bindingScope: 'concept' | 'kind' | 'domain' | null
  visualId: string | null
  instanceId: string | null
  fingerprint: string | null
  representation: string | null
  payloadRenderer: 'card' | 'scene' | null
  rendererComponent: string | null
  sourceFile: string | null
  registrationRef: string | null
  interactive: boolean
  isGraph: boolean
  isMolecular: boolean
  isReaction: boolean
  isProcessFlow: boolean
  is3D: boolean
  retired: boolean
  retiredReason: string | null
  withheldArtifact: string | null
  insufficientForConcept: boolean
  registryBinding: { tier: 'exact' | 'domain'; scope: string; primary: string; all: string[]; sceneGenerator: string | null } | null
  hasConceptSceneOverride: boolean
  allowedCards: string[]
  /** Would Tier 2 (approved, DB) / Tier 3 (generated, LLM) be asked on a real turn? */
  asyncTiersConsulted: 'tier2+tier3' | 'tier2-only-if-index-knows' | 'no'
}

interface Instance {
  instanceId: string
  conceptIds: string[]
  tier: 0 | 1
  scope: 'concept' | 'domain' | 'mixed'
  kind: string
  representation: string | null
  renderer: string
  rendererKind: 'card' | 'scene'
  sourceFile: string
  registrationRef: string
  origin: 'authored' | 'domain-default' | 'kind-default'
  reachability: 'resolver' | 'interactive-variant'
  interactive: boolean
  flags: Flags
  fingerprint: string
  payload: { field: 'visual' | 'sceneSpec'; value: unknown }
  details: Record<string, unknown>
}

// ───────────────────────────────────────────────────────────────────────────
// Flag classification. The tables are keyed by the BUILDER that produced a
// scene (parsed from source, never guessed from the title) or by the card
// type. The per-concept overrides are judgement calls and are labelled as
// such: they route validators, they do not certify anything.
// ───────────────────────────────────────────────────────────────────────────
const CARD_FLAGS: Record<string, Partial<Flags>> = {
  three_atomic_structure: { molecular: true, threeD: true },
  three_electron_shells: { molecular: true, threeD: true },
  three_molecular_shapes: { molecular: true, threeD: true },
  three_bond_formation: { molecular: true, threeD: true },
  three_crystal_lattice: { molecular: true, threeD: true },
}
const BUILDER_FLAGS: Record<string, Partial<Flags>> = {
  buildElectrochemicalCellScene: { reaction: true },
  buildEnergyCycleScene: { energyProfile: true },
  buildCoordinationComplexScene: { molecular: true },
  buildStatisticsBarChartScene: { graph: true },
  buildCellComparisonScene: {},
  buildCellPathwayScene: { processFlow: true },
  buildSystemBoundaryScene: {},
  buildChemFirstLawScene: {},
}
const KIND_FLAGS: Record<string, Partial<Flags>> = {
  electron_shells: { molecular: true },
  molecule: { molecular: true },
  lattice: { molecular: true },
  periodic_trends: { periodic: true },
}
// JUDGEMENT CALLS (HYPOTHESIS until a browser render confirms them).
const CONCEPT_FLAG_OVERRIDES: Record<string, Partial<Flags>> = {
  'chem.thermo.enthalpy': { reaction: true },         // Hess's law cycle: reactions summed
  'chem.thermo.bond-enthalpy': { reaction: true },    // Born-Haber cycle
  'chem.coord.cft': { molecular: false },             // d-orbital energy levels, not a structure
  'chem.period.ionization-energy': { periodic: true },
  'chem.pblock.group16': { periodic: true },
  'chem.dblock.lanthanides': { periodic: true },
  'chem.state.phase-diagram': { graph: true },        // P-T diagram drawn with curves
  'chem.org.pericyclic': { reaction: true },
  'chem.dblock.organometallics': { reaction: true },  // catalytic cycle (also a process flow)
  'chem.bio.nucleic-acids': { molecular: true },
}
// Word forms are case-insensitive; the symbols (Kc, Kf, Q ...) are case-SENSITIVE so that
// Kelvin ("(K)") and heat ("q") are never read as an equilibrium constant / quotient.
const EQUILIBRIUM_WORDS = /equilibri|le chatel|reaction quotient|reversible/i
const EQUILIBRIUM_SYMBOLS = /⇌|⇄|\bK(?:c|p|f|sp|a|b|w)\b|\bQ\b/
const PERIODIC_TEXT = /periodic|across (?:a )?period|down (?:a )?group|\bperiod \d\b|\bgroup \d+\b/i
function mentionsEquilibrium(text: string): boolean {
  return EQUILIBRIUM_WORDS.test(text) || EQUILIBRIUM_SYMBOLS.test(text)
}

function usesDepth(scene: SceneSpec): boolean {
  for (const step of scene.steps ?? []) {
    for (const o of step.objects ?? []) {
      const pts = [o.position, o.from, o.to, ...(o.points ?? [])].filter(Boolean) as [number, number, number][]
      if (pts.some((p) => Math.abs(p[2]) > 1e-6)) return true
    }
  }
  return false
}
function sceneText(scene: SceneSpec): string {
  const texts = sceneTextObjects(scene).map((t) => t.text)
  const narr = (scene.steps ?? []).map((s) => s.narration ?? '')
  return [scene.title, scene.teachingGoal ?? '', ...texts, ...narr].join(' ')
}

// ───────────────────────────────────────────────────────────────────────────
// Main
// ───────────────────────────────────────────────────────────────────────────
function main(): void {
  const outDir = (() => {
    const i = process.argv.indexOf('--out')
    return i >= 0 ? resolve(process.argv[i + 1] ?? '') : null
  })()

  const graph = getKnowledgeGraph('chemistry')
  if (!graph) throw new Error('chemistry knowledge graph did not load')
  const nodes = getAllNodes(graph)

  const builders = conceptSceneBuilders()
  const builderImports = importedNames(SCENE_PARAMS)
  const cards = cardComponents()
  const concepts: ConceptRecord[] = []
  const byFingerprint = new Map<string, { inst: Instance; scene: SceneSpec | null; cardType: string | null; bindings: Array<Record<string, unknown>> }>()
  const order: string[] = []

  for (const node of nodes) {
    const id = node.id
    const d = resolveVisual({ message: '', lessonConceptId: id, subject: 'chemistry' })
    const binding = lookupConceptVisualBinding(id)
    const retired = isRetiredVisualBinding(id)
    const hasCS = CONCEPT_SCENE_OVERRIDES.includes(id)
    const generatorKind = getConceptSceneGenerator(id)
    const domain = id.split('.').slice(0, 2).join('.')

    const base = {
      conceptId: id, title: node.title, domain,
      retired, retiredReason: retired ? retirementReason(id) : null,
      insufficientForConcept: INSUFFICIENT_FOR_CONCEPT.has(id),
      registryBinding: binding
        ? { tier: binding.tier, scope: binding.scope, primary: binding.entry.primary, all: [...binding.entry.all], sceneGenerator: binding.entry.sceneGenerator ?? null }
        : null,
      hasConceptSceneOverride: hasCS,
      allowedCards: d.allowed ? [...d.allowed] : [],
    }

    if (!d.graphical || !d.asset || !d.payload) {
      const withheld = retired && binding
        ? `card:${binding.entry.primary}@${figureFingerprint({ renderer: 'card', visualType: binding.entry.primary })}`
        : null
      concepts.push({
        ...base, outcome: 'none', tier: retired ? -1 : null,
        tierLabel: retired ? 'Tier -1: retired — every asset on offer was refused' : 'none: no faithful visual (no binding, no authored scene)',
        origin: 'none', originCoarse: 'none', provenance: d.provenance, scope: null, bindingScope: null,
        visualId: null, instanceId: null, fingerprint: null, representation: null, payloadRenderer: null,
        rendererComponent: null, sourceFile: null, registrationRef: null,
        interactive: false, isGraph: false, isMolecular: false, isReaction: false, isProcessFlow: false, is3D: false,
        withheldArtifact: withheld,
        asyncTiersConsulted: 'tier2+tier3',
      })
      continue
    }

    const asset = d.asset
    const payload = d.payload
    const fp = figureFingerprint(payload)
    const provenance = asset.provenance
    const origin: Origin = provenance === 'domain-default' ? 'domain-default' : provenance === 'generator-default' ? 'kind-default' : 'authored'
    const bindingScope = provenance === 'domain-default' ? 'domain' : provenance === 'generator-default' ? 'kind' : 'concept'
    const tier: 0 | 1 = payload.renderer === 'scene' ? 0 : 1

    let instanceId: string
    let rendererComponent: string
    let sourceFile: string
    let registrationRef: string
    let flags: Flags = { ...NO_FLAGS }
    let scene: SceneSpec | null = null
    let cardType: string | null = null
    let interactive = false
    let kindLabel: string
    const details: Record<string, unknown> = {}

    if (payload.renderer === 'card') {
      cardType = payload.visualType
      instanceId = `card:${cardType}`
      const comp = cards.get(cardType) ?? 'UNKNOWN'
      rendererComponent = `VisualCard>${comp}`
      sourceFile = `${CARD_DIR}/${comp}.tsx`
      registrationRef = binding?.tier === 'exact'
        ? ref(REGISTRY, new RegExp(`'${id.replace(/\./g, '\\.')}':\\s*\\{`))
        : ref(REGISTRY, `domainRule('${binding?.scope}'`)
      flags = { ...flags, ...(CARD_FLAGS[cardType] ?? {}) }
      kindLabel = cardType
      details.component = comp
      details.webgl = 'react-three-fiber Canvas inside ThreeDVisual (needs a WebGL context)'
    } else if (payload.renderer === 'scene') {
      scene = payload.sceneSpec
      const sceneId = scene.id
      instanceId = `scene:${sceneId}`
      rendererComponent = 'SceneSpecFigure>ExplainerFigure>SceneSpecRenderer'
      const builder = builders.get(id) ?? null
      if (provenance === 'generator-default') {
        // The kind's shared canonical instance (parametricScenes defaults).
        sourceFile = `${GENERATORS}/${kindFile(generatorKind)}`
        registrationRef = `${ref(REGISTRY, new RegExp(`'${id.replace(/\./g, '\\.')}':\\s*\\{`))} -> ${ref(PARAMETRIC, new RegExp(`^  ${generatorKind}: \\{`))}`
        flags = { ...flags, ...(KIND_FLAGS[generatorKind ?? ''] ?? {}) }
        kindLabel = `kind-default:${generatorKind}`
        details.generatorKind = generatorKind
      } else {
        if (!builder) throw new Error(`no CONCEPT_SCENES builder parsed for ${id}`)
        const mod = builderImports.get(builder)
        sourceFile = mod ? modulePathToFile(mod) : `${SCENE_PARAMS}`
        registrationRef = ref(SCENE_PARAMS, new RegExp(`^\\s*'${id.replace(/\./g, '\\.')}':`))
        flags = { ...flags, ...(BUILDER_FLAGS[builder] ?? {}) }
        kindLabel = `authored:${builder}`
        details.builder = builder
      }
      interactive = Boolean(scene.parametric?.kind) && variablesFor(scene.parametric?.kind).length > 0
      details.sceneId = sceneId
      details.sceneType = scene.sceneType
      details.parametricKind = scene.parametric?.kind ?? null
      details.webgl = 'react-three-fiber Canvas (SceneSpecRenderer/ThreeDVisual) + HTML SceneLabelLayer'
    } else {
      throw new Error(`unexpected payload renderer for ${id}`)
    }

    const concreteIdAsset = asset.assetId

    // Merge into a unique instance keyed by payload fingerprint.
    let entry = byFingerprint.get(fp)
    if (!entry) {
      const inst: Instance = {
        instanceId, conceptIds: [], tier, scope: asset.scope, kind: kindLabel,
        representation: d.representation, renderer: rendererComponent,
        rendererKind: payload.renderer, sourceFile, registrationRef, origin,
        reachability: 'resolver', interactive, flags, fingerprint: fp,
        payload: payload.renderer === 'card'
          ? { field: 'visual', value: payload.visualType }
          : { field: 'sceneSpec', value: JSON.parse(JSON.stringify(payload.sceneSpec)) },
        details,
      }
      entry = { inst, scene, cardType, bindings: [] }
      byFingerprint.set(fp, entry)
      order.push(fp)
    }
    entry.inst.conceptIds.push(id)
    entry.bindings.push({ conceptId: id, tier, origin, provenance, scope: asset.scope, assetId: concreteIdAsset, registrationRef, representation: d.representation })

    concepts.push({
      ...base, outcome: 'figure', tier,
      tierLabel: tier === 0
        ? (origin === 'kind-default' ? 'Tier 0: generator-kind default scene' : 'Tier 0: concept-authored scene (CONCEPT_SCENES)')
        : (origin === 'domain-default' ? 'Tier 1: domain-prefix default card' : 'Tier 1: curated exact card binding'),
      origin, originCoarse: origin === 'authored' ? 'authored' : 'fallback', provenance,
      scope: asset.scope, bindingScope, visualId: concreteIdAsset, instanceId: entry.inst.instanceId,
      fingerprint: fp, representation: d.representation, payloadRenderer: payload.renderer,
      rendererComponent, sourceFile, registrationRef, interactive,
      isGraph: false, isMolecular: false, isReaction: false, isProcessFlow: false, is3D: false,
      withheldArtifact: null,
      asyncTiersConsulted: origin === 'domain-default' ? 'tier2-only-if-index-knows' : 'no',
    })
  }

  // ── finish instances: scope merge, flags from content, model checks ───────
  const instances: Instance[] = []
  for (const fp of order) {
    const { inst, scene, bindings } = byFingerprint.get(fp)!
    const scopes = new Set(bindings.map((b) => b.scope as string))
    inst.scope = scopes.size === 1 ? ([...scopes][0] as 'concept' | 'domain') : 'mixed'
    const origins = [...new Set(bindings.map((b) => b.origin as string))]
    // Strongest origin wins at the top level; the per-binding list keeps the rest.
    inst.origin = origins.includes('authored') ? 'authored' : origins.includes('kind-default') ? 'kind-default' : 'domain-default'
    if (scene) {
      for (const cid of inst.conceptIds) Object.assign(inst.flags, CONCEPT_FLAG_OVERRIDES[cid] ?? {})
      const text = sceneText(scene)
      inst.flags.graph = inst.flags.graph || scene.sceneType === 'plot'
      inst.flags.equilibrium = inst.flags.equilibrium || mentionsEquilibrium(text)
      inst.flags.periodic = inst.flags.periodic || PERIODIC_TEXT.test(text)
      inst.flags.threeD = usesDepth(scene)
      const sv = validateSceneSpec(scene)
      const layout = checkSceneLayoutAllViewports(scene)
      const frame = frameReport(scene)
      inst.details.stepCount = scene.steps.length
      inst.details.objectCount = scene.steps.reduce((n, s) => n + (s.objects?.length ?? 0), 0)
      inst.details.labelCount = sceneTextObjects(scene).length
      inst.details.clientValidatesSceneSpec = sv.valid
      inst.details.clientValidationErrors = sv.errors.map((e) => `${e.path}: ${e.message}`)
      inst.details.modelLayout = Object.fromEntries(layout.map((l) => [l.viewport, { ok: l.ok, labels: l.labelCount, violations: l.violations.length }]))
      inst.details.modelFrame = { fill: Math.round(frame.fill * 1000) / 1000, areaFill: Math.round(frame.areaFill * 1000) / 1000, ok: frame.ok, cameraDistance: frame.cameraDistance }
      inst.details.ariaLabel = scene.ariaLabel ?? null
    } else {
      // Cards: which concepts may ALSO be shown this card via the model's VISUAL: tag.
      inst.details.offeredAlternatelyFor = concepts
        .filter((c) => c.outcome === 'figure' && c.payloadRenderer === 'card' && c.instanceId !== inst.instanceId && c.allowedCards.includes(String(inst.payload.value)))
        .map((c) => c.conceptId)
    }
    inst.details.bindings = bindings
    instances.push(inst)
  }

  // Concept-level flags mirror their instance.
  const byInstance = new Map(instances.map((i) => [i.instanceId, i]))
  for (const c of concepts) {
    if (!c.instanceId) continue
    const i = byInstance.get(c.instanceId)!
    c.isGraph = i.flags.graph; c.isMolecular = i.flags.molecular; c.isReaction = i.flags.reaction
    c.isProcessFlow = i.flags.processFlow; c.is3D = i.flags.threeD
  }

  // ── interactive variants (client-side rebuilds a learner can reach) ───────
  const variants: Instance[] = []
  const deadControlOptions: Array<{ kind: string; variable: string; option: string }> = []
  const seenKinds = new Set<string>()
  for (const inst of instances) {
    const kind = (inst.details.parametricKind as string | null) ?? null
    if (!kind || seenKinds.has(kind) || !(kind in PARAMETRIC_SCENES)) continue
    seenKinds.add(kind)
    const entry = PARAMETRIC_SCENES[kind]
    const owners = instances.filter((o) => o.details.parametricKind === kind).flatMap((o) => o.conceptIds)
    for (const v of entry.variables) {
      if (v.kind !== 'choice') continue
      for (const opt of v.options) {
        if (opt.value === entry.defaults[v.key]) continue
        const params = { ...entry.defaults, [v.key]: opt.value }
        const built = rebuildScene(kind, params)
        if (!built) {
          // A control the learner is OFFERED that builds no figure (the frame keeps the last good one).
          deadControlOptions.push({ kind, variable: v.key, option: String(opt.value) })
          continue
        }
        const fp = figureFingerprint({ renderer: 'scene', sceneSpec: built })
        const text = sceneText(built)
        const flags: Flags = { ...NO_FLAGS, ...(KIND_FLAGS[kind] ?? {}) }
        flags.threeD = usesDepth(built)
        flags.equilibrium = mentionsEquilibrium(text)
        flags.periodic = flags.periodic || PERIODIC_TEXT.test(text)
        const layout = checkSceneLayoutAllViewports(built)
        variants.push({
          instanceId: `variant:${kind}:${v.key}=${opt.value}`,
          conceptIds: owners, tier: 0, scope: 'domain', kind: `interactive-variant:${kind}`,
          representation: inst.representation, renderer: inst.renderer, rendererKind: 'scene',
          sourceFile: inst.sourceFile, registrationRef: PARAMETRIC, origin: 'kind-default',
          reachability: 'interactive-variant', interactive: true, flags, fingerprint: fp,
          payload: { field: 'sceneSpec', value: JSON.parse(JSON.stringify(built)) },
          details: {
            variantOf: inst.instanceId, variantParams: params, derivedBy: 'client: rebuildScene(kind, params) in ExplainerFigure',
            sceneId: built.id, stepCount: built.steps.length,
            clientValidatesSceneSpec: validateSceneSpec(built).valid,
            modelLayout: Object.fromEntries(layout.map((l) => [l.viewport, { ok: l.ok, labels: l.labelCount, violations: l.violations.length }])),
          },
        })
      }
    }
  }

  // ── counts ─────────────────────────────────────────────────────────────────
  const total = concepts.length
  const withFigure = concepts.filter((c) => c.outcome === 'figure')
  const none = concepts.filter((c) => c.outcome === 'none')
  const retiredNone = none.filter((c) => c.retired)
  const noBinding = none.filter((c) => !c.retired)
  const count = <T,>(xs: T[], f: (x: T) => string) => xs.reduce<Record<string, number>>((m, x) => { const k = f(x); m[k] = (m[k] ?? 0) + 1; return m }, {})
  const bindingOrScene = concepts.filter((c) => c.registryBinding || c.hasConceptSceneOverride)
  const summary = {
    kgConcepts: total,
    withFigure: withFigure.length,
    withoutFigure: none.length,
    withoutFigure_retired: retiredNone.length,
    withoutFigure_noBindingNoScene: noBinding.length,
    byTier: count(withFigure, (c) => `tier${c.tier}`),
    byTierLabel: count(withFigure, (c) => c.tierLabel),
    byOrigin: count(withFigure, (c) => c.origin),
    byScope: count(withFigure, (c) => c.scope ?? 'none'),
    byPayloadRenderer: count(withFigure, (c) => c.payloadRenderer ?? 'none'),
    conceptsWithRegistryRow: concepts.filter((c) => c.registryBinding).length,
    conceptsWithRegistryRow_exact: concepts.filter((c) => c.registryBinding?.tier === 'exact').length,
    conceptsWithRegistryRow_domain: concepts.filter((c) => c.registryBinding?.tier === 'domain').length,
    conceptsWithConceptSceneOverride: concepts.filter((c) => c.hasConceptSceneOverride).length,
    conceptsWithBindingOrScene: bindingOrScene.length,
    uniqueInstances: instances.length,
    uniqueInstances_cards: instances.filter((i) => i.rendererKind === 'card').length,
    uniqueInstances_scenes: instances.filter((i) => i.rendererKind === 'scene').length,
    uniqueInstancesByOrigin: count(instances, (i) => i.origin),
    uniqueInstancesInteractive: instances.filter((i) => i.interactive).length,
    conceptsInteractive: concepts.filter((c) => c.interactive).length,
    conceptsGraph: concepts.filter((c) => c.isGraph).length,
    conceptsMolecular: concepts.filter((c) => c.isMolecular).length,
    conceptsReaction: concepts.filter((c) => c.isReaction).length,
    conceptsProcessFlow: concepts.filter((c) => c.isProcessFlow).length,
    conceptsThreeD: concepts.filter((c) => c.is3D).length,
    instancesGraph: instances.filter((i) => i.flags.graph).length,
    instancesMolecular: instances.filter((i) => i.flags.molecular).length,
    instancesReaction: instances.filter((i) => i.flags.reaction).length,
    instancesProcessFlow: instances.filter((i) => i.flags.processFlow).length,
    instancesThreeD: instances.filter((i) => i.flags.threeD).length,
    instancesPeriodic: instances.filter((i) => i.flags.periodic).length,
    instancesEquilibrium: instances.filter((i) => i.flags.equilibrium).length,
    instancesEnergyProfile: instances.filter((i) => i.flags.energyProfile).length,
    interactiveVariants: variants.length,
    deadControlOptions,
    sceneInstancesFailingClientValidation: instances.filter((i) => i.details.clientValidatesSceneSpec === false).length,
    domainScopedFigures: withFigure.filter((c) => c.scope === 'domain').length,
    insufficientForConceptFlagged: concepts.filter((c) => c.insufficientForConcept).length,
    unreachableOffline: ['Tier 2 approved (ACTIVE VISUAL rows in the production DB)', 'Tier 3 generated figures (LLM + critic; verdict cache)'],
  }

  // Sanity: the instance table must account for every figured concept exactly once.
  const covered = instances.reduce((n, i) => n + i.conceptIds.length, 0)
  if (covered !== withFigure.length) throw new Error(`instance map covers ${covered} concepts, expected ${withFigure.length}`)
  const ids = new Set(instances.map((i) => i.instanceId))
  if (ids.size !== instances.length) throw new Error('instanceId collision between different payloads')

  // ── stdout ─────────────────────────────────────────────────────────────────
  console.log(JSON.stringify(summary, null, 2))
  console.log(`\nviewports modelled by layout.ts: ${VIEWPORTS.map((v) => `${v.name} browser=${v.browserWidth} host=${v.hostWidth}x${v.hostHeight}`).join('; ')}`)

  if (!outDir) {
    console.log('\n(no --out given: nothing written)')
    return
  }
  mkdirSync(outDir, { recursive: true })
  const manifest = [...instances, ...variants]
  writeFileSync(join(outDir, 'chem-manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
  writeFileSync(join(outDir, 'chem-concepts.json'), JSON.stringify({ summary, concepts }, null, 2) + '\n')
  writeFileSync(join(outDir, 'chem-inventory.md'), renderMarkdown(summary, concepts, instances, variants))
  console.log(`\nwrote chem-manifest.json (${manifest.length} entries: ${instances.length} resolver + ${variants.length} interactive variants), chem-concepts.json, chem-inventory.md -> ${outDir}`)
}

/** Source file of a generator kind's pure builder (the file that draws the default instance). */
function kindFile(kind: string | null): string {
  const map: Record<string, string> = {
    molecule: 'moleculeGeometry.pure.ts', lattice: 'crystalLattice.pure.ts',
    electron_shells: 'electronShells.pure.ts', periodic_trends: 'periodicTrends.pure.ts',
  }
  const f = kind ? map[kind] : undefined
  if (!f) throw new Error(`no source file mapped for generator kind ${kind}`)
  return f
}

// ───────────────────────────────────────────────────────────────────────────
// Reachability evidence (learner-reachable but NOT resolved per concept id)
// ───────────────────────────────────────────────────────────────────────────
function countImporters(componentNames: string[]): string[] {
  // Production importers = any src file outside src/app/dev, src/tests and the defining file itself.
  const hits = new Set<string>()
  const walk = (dir: string): void => {
    for (const name of readdirSync(join(ROOT, dir))) {
      const rel = `${dir}/${name}`
      const st = statSync(join(ROOT, rel))
      if (st.isDirectory()) {
        if (rel === 'src/app/dev' || rel === 'src/tests') continue
        walk(rel)
      } else if (/\.(ts|tsx)$/.test(name)) {
        const text = readFileSync(join(ROOT, rel), 'utf8')
        for (const comp of componentNames) {
          if (rel.endsWith(`/${comp}.tsx`)) continue
          if (new RegExp(`from\\s*'[^']*/${comp}'`).test(text)) hits.add(`${comp} <- ${rel}`)
        }
      }
    }
  }
  walk('src')
  return [...hits].sort()
}

function renderMarkdown(s: Record<string, any>, concepts: ConceptRecord[], instances: Instance[], variants: Instance[]): string {
  const L: string[] = []
  const w = (x = '') => L.push(x)
  const pct = (n: number, d: number) => `${((100 * n) / d).toFixed(1)}%`

  w('# Chemistry visual inventory (Phase 0, read-only)')
  w()
  w('Generated by `scripts/chemistry/visual-audit/inventory.ts` against the real synchronous resolver (`resolveVisual`).')
  w('No database, no network, no AI call. Tier 2 (approved, DB) and Tier 3 (generated, LLM) are NOT in these numbers: see section 11.')
  w()
  w('## 1. Headline')
  w()
  w('| measure | value |')
  w('|---|---|')
  w(`| chemistry KG concepts | ${s.kgConcepts} |`)
  w(`| concepts served a figure by Tier 0/1 | **${s.withFigure}** (${pct(s.withFigure, s.kgConcepts)}) |`)
  w(`| concepts with NO figure from Tier -1/0/1 | **${s.withoutFigure}** (${pct(s.withoutFigure, s.kgConcepts)}) |`)
  w(`| — of which retired (Tier -1, everything on offer refused) | ${s.withoutFigure_retired} |`)
  w(`| — of which no binding and no authored scene | ${s.withoutFigure_noBindingNoScene} |`)
  w(`| concepts with a registry row (exact ${s.conceptsWithRegistryRow_exact} + domain ${s.conceptsWithRegistryRow_domain}) | ${s.conceptsWithRegistryRow} |`)
  w(`| concepts with a CONCEPT_SCENES override | ${s.conceptsWithConceptSceneOverride} |`)
  w(`| concepts with a registry row OR a scene override (the "59" statistic's definition) | ${s.conceptsWithBindingOrScene} |`)
  w(`| unique visual instances (resolver-reachable) | **${s.uniqueInstances}** (${s.uniqueInstances_cards} cards + ${s.uniqueInstances_scenes} scenes) |`)
  w(`| interactive-control variants (client rebuilds) | ${s.interactiveVariants} |`)
  w(`| scenes the CLIENT would refuse (validateSceneSpec fails) | ${s.sceneInstancesFailingClientValidation} |`)
  w()
  w('## 2. Concepts by tier / origin / scope')
  w()
  w('| tier label | concepts |')
  w('|---|---|')
  for (const [k, v] of Object.entries(s.byTierLabel)) w(`| ${k} | ${v} |`)
  w(`| none: retired (Tier -1) | ${s.withoutFigure_retired} |`)
  w(`| none: no faithful visual | ${s.withoutFigure_noBindingNoScene} |`)
  w()
  w('| runtime scope claimed to the tutor | concepts |')
  w('|---|---|')
  for (const [k, v] of Object.entries(s.byScope)) w(`| ${k} | ${v} |`)
  w()
  w(`Concepts also listed in scope.ts INSUFFICIENT_FOR_CONCEPT: ${s.insufficientForConceptFlagged}.`)
  w()
  w('## 3. Unique instances')
  w()
  w('| origin | instances |')
  w('|---|---|')
  for (const [k, v] of Object.entries(s.uniqueInstancesByOrigin)) w(`| ${k} | ${v} |`)
  w()
  w('| flag | instances | concepts |')
  w('|---|---|---|')
  w(`| interactive (parametric controls) | ${s.uniqueInstancesInteractive} | ${s.conceptsInteractive} |`)
  w(`| graph | ${s.instancesGraph} | ${s.conceptsGraph} |`)
  w(`| molecular / particle-level | ${s.instancesMolecular} | ${s.conceptsMolecular} |`)
  w(`| reaction | ${s.instancesReaction} | ${s.conceptsReaction} |`)
  w(`| process flow | ${s.instancesProcessFlow} | ${s.conceptsProcessFlow} |`)
  w(`| 3D (cards, or scene geometry with depth) | ${s.instancesThreeD} | ${s.conceptsThreeD} |`)
  w(`| periodic | ${s.instancesPeriodic} | - |`)
  w(`| equilibrium | ${s.instancesEquilibrium} | - |`)
  w(`| energy profile | ${s.instancesEnergyProfile} | - |`)
  w()
  w('All learner-visible chemistry figures draw through a WebGL canvas (react-three-fiber `ThreeDVisual`) with an HTML label layer; `3D` above means the geometry itself has depth or the card is a `three_*` model, not merely that WebGL is used.')
  w()
  w('| instance | concepts | tier | origin | scope | renderer | source |')
  w('|---|---|---|---|---|---|---|')
  for (const i of instances) {
    w(`| \`${i.instanceId}\` | ${i.conceptIds.length} | ${i.tier} | ${i.origin} | ${i.scope} | ${i.renderer} | ${i.sourceFile} |`)
  }
  w()
  w('## 4. Concept -> instance map (figured concepts)')
  w()
  w('| concept | tier | origin | scope | instance |')
  w('|---|---|---|---|---|')
  for (const c of concepts.filter((x) => x.outcome === 'figure')) {
    w(`| ${c.conceptId} | ${c.tier} | ${c.origin} | ${c.scope} | \`${c.instanceId}\` |`)
  }
  w()
  w('## 5. Retired (Tier -1): withheld on purpose')
  w()
  for (const c of concepts.filter((x) => x.tier === -1)) {
    w(`- **${c.conceptId}** — would have been \`${c.withheldArtifact ?? 'n/a'}\`. ${c.retiredReason}`)
  }
  w()
  w('## 6. No figure at all, by domain')
  w()
  w('| domain | concepts | figured | retired | no figure |')
  w('|---|---|---|---|---|')
  const domains = [...new Set(concepts.map((c) => c.domain))]
  for (const dmn of domains) {
    const cs = concepts.filter((c) => c.domain === dmn)
    w(`| ${dmn} | ${cs.length} | ${cs.filter((c) => c.outcome === 'figure').length} | ${cs.filter((c) => c.tier === -1).length} | ${cs.filter((c) => c.outcome === 'none' && c.tier !== -1).length} |`)
  }
  w()
  w('## 7. Learner-reachable visuals that are NOT resolved per concept (evidence)')
  w()
  const evidence: Array<[string, string]> = [
    ['Resolver tiers, in order', `${ref('src/lib/teaching/visual/resolveVisual.ts', '// ── Tier −1: RETIRED ASSETS')} / ${ref('src/lib/teaching/visual/resolveVisual.ts', '// ── Tier 0: registry-named DETERMINISTIC SCENE GENERATOR')} / ${ref('src/lib/teaching/visual/resolveVisual.ts', '// ── Tier 1: curated registry binding')} / ${ref('src/lib/teaching/visual/resolveVisual.ts', '// ── NO TIER 2')}`],
    ['Tier 2 approved + Tier 3 generated (async, production-only)', `${ref('src/lib/teaching/visual/resolveVisual.ts', '// 2. APPROVED — a human already looked')} / ${ref('src/lib/teaching/visual/resolveVisual.ts', '// ── 3. GENERATED')}`],
    ['Route calls the resolver', ref('src/app/api/learn/chat/route.ts', 'const decision = await resolveVisualForTurn({')],
    ['Single writer of the response visual channels', ref('src/app/api/learn/chat/route.ts', '// ── THE authority clamp — the single writer of every visual channel ──')],
    ['Payload -> response field', ref('src/app/api/learn/chat/route.ts', 'switch (decision?.payload?.renderer) {')],
    ['Final JSON response fields', ref('src/app/api/learn/chat/route.ts', 'visual: responseVisual ?? undefined, visualSpec: detectedVisualSpec ?? undefined,')],
    ['dynamicVisualizationCode is always null (LLM-authored code is dead)', ref('src/app/api/learn/chat/route.ts', 'dynamicVisualizationCode = null')],
    ['Opening turn cannot show a figure', ref('src/app/api/learn/lesson-init/route.ts', 'THE OPENING TURN CANNOT SHOW A FIGURE')],
    ['Refresh restore re-derives (no new content)', ref('src/app/api/sessions/route.ts', 'restoreVisualSession(snapshot?.visualSession)')],
    ['Client: card', ref('src/components/learn/LessonScreen.tsx', '!isUser && !msg.streaming && msg.visual && (')],
    ['Client: 2D spec', ref('src/components/learn/LessonScreen.tsx', '!isUser && !msg.streaming && msg.visualSpec && (')],
    ['Client: scene (validated first)', `${ref('src/components/learn/LessonScreen.tsx', 'validateSceneSpec(rawScene)')} / ${ref('src/components/learn/LessonScreen.tsx', '!isUser && !msg.streaming && msg.sceneSpec && (')}`],
    ['Client: VisualCard chemistry cases', `${ref(`${CARD_DIR}/VisualCard.tsx`, "case 'three_atomic_structure':")}`],
    ['Interactive controls come from the scene itself', ref(`${CARD_DIR}/ExplainerFigure.tsx`, 'const allVariables = variablesFor(spec.parametric?.kind)')],
    ['Chemistry parametric kinds', ref(PARAMETRIC, '// ── chemistry: the variable is which case, not how much ──')],
    ['Legacy prose pipelines retired (no runtime callers)', ref('src/app/api/learn/chat/route.ts', 'Four legacy pipelines used to run here')],
    ['Legacy detectVisual chemistry rules (telemetry only)', ref('src/lib/school/visuals/detectVisual.ts', 'CHEMISTRY_3D_RULES')],
  ]
  w('| what | where |')
  w('|---|---|')
  for (const [k, v] of evidence) w(`| ${k} | ${v} |`)
  w()
  const interactiveImporters = countImporters(['AtomicStructureInteractive3D', 'ElectronShellsInteractive3D', 'MolecularShapesInteractive3D', 'BondFormationInteractive3D', 'CrystalLatticeInteractive3D'])
  w(`Chemistry \`*Interactive3D\` components imported by production code (outside src/app/dev, src/tests): **${interactiveImporters.length}** ${interactiveImporters.length ? '-> ' + interactiveImporters.join('; ') : '(built, wired only to the dev demo `src/app/dev/visual-demo/VisualDemo.tsx`; NOT learner-reachable)'}.`)
  w()
  w('Interactive-variant manifest entries (client `rebuildScene`, reachable by pressing a control on the 4 kind-default figures):')
  w()
  const vk = new Map<string, number>()
  for (const v of variants) vk.set(String(v.kind), (vk.get(String(v.kind)) ?? 0) + 1)
  for (const [k, n] of vk) w(`- ${k}: ${n} variants`)
  w()
  w('## 8. Model-layout pre-flags (layout.ts prediction, NOT a browser measurement)')
  w()
  w('`checkSceneLayoutAllViewports` models label boxes against a fixed camera (desktop host 992x520 @1280, tablet 660x495 @768, mobile 282x260 @390). Violations are out-of-bounds labels or label/label collisions. These are leads for the browser pass, not findings.')
  w()
  w('| instance | desktop | tablet | mobile | frame fill |')
  w('|---|---|---|---|---|')
  const flagged = instances.filter((i) => i.rendererKind === 'scene' && Object.values(i.details.modelLayout as Record<string, { ok: boolean }>).some((l) => !l.ok))
  for (const i of flagged) {
    const ml = i.details.modelLayout as Record<string, { ok: boolean; violations: number }>
    const fr = i.details.modelFrame as { fill: number }
    w(`| \`${i.instanceId.slice(0, 70)}\` | ${ml.desktop.violations} | ${ml.tablet.violations} | ${ml.mobile.violations} | ${fr.fill} |`)
  }
  w()
  w(`${flagged.length} of ${instances.filter((i) => i.rendererKind === 'scene').length} scene instances are predicted unsafe at one or more viewports. Cards are not modelled (their labels are drawn inside each \`*3D\` component).`)
  w()
  w('## 9. Reconciliation with the "59/186 curated, 127/186 without" baseline')
  w()
  w('- **59 is "concepts with a registry row OR a CONCEPT_SCENES override"**, measured at commit 901ad5d / 5e53430^ (35 registry rows + 24 scene overrides, no overlap = 59; 127 = 186 - 59). Reproduced 2026-10-07 by extracting those trees into a scratch dir and running the same resolver. It is NOT an Explanation-Memory statistic; `docs/history/physics-visual-gap-campaign.md` calls the 127 "assetless chemistry concepts".')
  w(`- **Today that definition gives ${s.conceptsWithBindingOrScene}/${s.kgConcepts}** (35 registry rows + ${s.conceptsWithConceptSceneOverride} scene overrides - 1 overlap, chem.period.ionization-energy): CHEM-006 and Batch E (5e53430, 440b55c, 2026-10-05) added 5 authored scenes.`)
  w(`- **But "has a binding" is not "is served".** ${s.withoutFigure_retired} of those ${s.conceptsWithBindingOrScene} are RETIRED (Tier -1) and show nothing, so the served figure count is **${s.withFigure}/${s.kgConcepts}** (47 at the 59 baseline). Without a figure from Tier 0/1: **${s.withoutFigure}/${s.kgConcepts}** (${s.withoutFigure_noBindingNoScene} no binding + ${s.withoutFigure_retired} retired).`)
  w(`- Domain-default and kind-default bindings do give extra concepts a figure — ${s.byOrigin['domain-default']} concepts get a domain-prefix card and ${s.byOrigin['kind-default']} a kind-default scene — but ${s.domainScopedFigures} of the ${s.withFigure} served figures are claimed to the tutor only at 'domain' scope (a general illustration, not a figure OF the concept). Concept-scoped figures: ${s.byScope.concept}.`)
  w('- `scripts/qa/visual-census.ts` reports chemistry 35/186 (13 exact + 22 domain) and 151 "NO-VISUAL": it reads registry rows only, so it is blind to the 28 scene-override-only concepts AND to retirement. `src/tests/chemistryVisualCoverageAudit.test.ts` (26 tests, passing) covers only the 25 chem.thermo/coord/elect concepts (20 covered, 5 deferred).')
  w()
  w('## 10. Things worth a look (leads, not verdicts)')
  w()
  const dead = (s.deadControlOptions as Array<{ kind: string; variable: string; option: string }>)
  w(`- **Dead interactive options (${dead.length}):** the periodic-trend figure offers ${[...new Set(dead.filter((d) => d.kind === 'periodic_trends').map((d) => d.option))].join(', ')} in its element pickers, but \`rebuildScene\` returns no figure for them, so pressing them changes nothing (the frame keeps the last good figure). CONFIRMED cause: \`periodicTrends.pure.ts\` ELEMENTS has no Ne/Ar row (PERIODIC_CHOICES in parametricScenes.ts lists them anyway), and Cl/Na are refused because they equal the other picker's default (a comparison needs two different elements). Detail: ${dead.map((d) => `${d.variable}=${d.option}`).join(', ')}.`)
  const sameArtifact = new Map<string, string[]>()
  for (const c of concepts.filter((x) => x.tier === -1 && x.withheldArtifact)) {
    const fp = c.withheldArtifact!.split('@')[1]
    const served = instances.find((i) => i.fingerprint === fp)
    if (served) sameArtifact.set(served.instanceId, [...(sameArtifact.get(served.instanceId) ?? []), c.conceptId])
  }
  w('- **The same artifact is retired for some concepts and still served for others** (retirement is per concept; the card itself is unchanged):')
  for (const [instId, retiredIds] of sameArtifact) {
    const served = instances.find((i) => i.instanceId === instId)!
    w(`  - \`${instId}\`: retired for ${retiredIds.join(', ')}; still served for ${served.conceptIds.join(', ')}`)
  }
  const cardAlts = instances.filter((i) => i.rendererKind === 'card')
  w('- **A model `VISUAL:` tag may swap the card within `allowed`** (route.ts clamp). Cards that can be shown to concepts whose primary card differs: ' + cardAlts.map((i) => `${i.instanceId} (also for ${(i.details.offeredAlternatelyFor as string[]).length})`).join('; ') + '.')
  w('- Two different concepts share one scene payload: ' + instances.filter((i) => i.rendererKind === 'scene' && i.conceptIds.length > 1).map((i) => `\`${i.instanceId}\` -> ${i.conceptIds.join(' + ')}`).join('; ') + '.')
  w()
  w('## 11. Not determinable offline')
  w()
  w('- Which concepts hold an ACTIVE VISUAL row in production (Tier 2). Docs name only `chem.found.stoichiometry:concept_figure:en`; the set is unknown without a DB read.')
  w('- Which generated figures (Tier 3) the critic has promoted per concept, and whether `ENABLE_AI_SCENE_GENERATION` is on in production. Eligible concepts: every concept with no Tier 0/1 figure (counts above) and any retired concept.')
  w('- Which `learnerLevel` a given learner is at (`beginner`/`intermediate`/`advanced` change label budget and controls offered).')
  w()
  w(`Total concepts: ${concepts.length}; manifest entries: ${instances.length + variants.length}.`)
  w()
  return L.join('\n')
}

main()
