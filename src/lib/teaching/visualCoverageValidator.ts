/**
 * Visualization Registry Coverage Validator — developer/CI tooling.
 *
 * NOT a runtime module. Nothing in route.ts, visualRegistry.ts, or any
 * rendering path imports this file. It exists solely to audit
 * visualRegistry.ts's CONCEPT_VISUALS/DOMAIN_VISUALS data against every
 * Knowledge Graph concept and catch regressions BEFORE they ship — the
 * exact class of bug the P0 (Displacement → Force Diagram) and P2
 * (broad phys.mech domain-default misclassification) fixes closed by
 * hand-audit. This tool makes that audit repeatable and automatic as the
 * KG grows, without touching the Registry, the lookup algorithm, the
 * Renderer, or Educational Packages.
 *
 * Design constraint: visualRegistry.ts's CONCEPT_VISUALS/DOMAIN_VISUALS
 * are private module consts (by design — Tier 1/2 are meant to be
 * queried through lookupConceptVisual(), never enumerated by callers).
 * Exporting them for this tool would touch the Registry module. Instead
 * this validator reads visualRegistry.ts's SOURCE TEXT and parses it —
 * zero changes to the Registry file, and it also lets Category G (two
 * literal string keys colliding in the same object) be detected at all:
 * once such a file is imported, JS object-literal semantics silently
 * keep only the last duplicate key with no error, so the runtime object
 * can never reveal a duplicate — only the source text can.
 */

import type { VisualType } from '@/lib/school/visuals/visualTypes'
import type { SceneGeneratorKind } from './sceneGenerators/sceneRouter'

export type CoverageCategory =
  | 'A_EXACT'      // ✅ Exact Mapping
  | 'B_FALLBACK'   // 🟡 Intentional Fallback (domain default)
  | 'C_NULL'       // ⚪ No Visualization (Expected)
  | 'D_INCORRECT'  // 🔴 Incorrect Mapping

export const CATEGORY_LABEL: Record<CoverageCategory, string> = {
  A_EXACT: '✅ Exact Mapping',
  B_FALLBACK: '🟡 Intentional Fallback',
  C_NULL: '⚪ No Visualization (Expected)',
  D_INCORRECT: '🔴 Incorrect Mapping',
}

export interface ParsedConceptEntry {
  key: string
  primary: string
  all: string[]
  sceneGenerator?: string
  /** 1-indexed line in the source file, for report/error messages. */
  line: number
}

export interface ParsedDomainEntry {
  prefix: string
  primary: string
  all: string[]
  line: number
}

export interface ParsedRegistry {
  conceptEntries: ParsedConceptEntry[]
  domainEntries: ParsedDomainEntry[]
}

// ── Parsing visualRegistry.ts's source text ──────────────────────────────────
// Regex-based, not a full TS parser — sufficient because CONCEPT_VISUALS and
// DOMAIN_VISUALS are written in one disciplined literal style throughout the
// file (verified against the current source; a genuinely new formatting
// style would simply fail to match and the entry would show up as missing,
// never as silently wrong).

const CONCEPT_ENTRY_RE =
  /^\s*'([a-z0-9.\-]+)':\s*\{\s*primary:\s*'([a-z0-9_]+)',\s*all:\s*\[([^\]]*)\](?:,\s*sceneGenerator:\s*'([a-z0-9_]+)')?\s*\},?\s*$/gm

const DOMAIN_ENTRY_RE =
  /domainRule\('([a-z0-9.\-]+)',\s*'([a-z0-9_]+)',\s*\[([^\]]*)\]\)/g

function parseStringArray(raw: string): string[] {
  return Array.from(raw.matchAll(/'([a-z0-9_]+)'/g)).map((m) => m[1])
}

function lineOf(source: string, index: number): number {
  return source.slice(0, index).split('\n').length
}

/**
 * Extract every CONCEPT_VISUALS and DOMAIN_VISUALS entry from
 * visualRegistry.ts's raw source text. Captures EVERY match, including
 * duplicate keys — required for Category G (duplicate detection), since a
 * duplicate key in a real JS object literal silently collapses to the last
 * occurrence at import time and is otherwise undetectable at runtime.
 */
export function parseVisualRegistrySource(source: string): ParsedRegistry {
  const conceptEntries: ParsedConceptEntry[] = []
  for (const m of source.matchAll(CONCEPT_ENTRY_RE)) {
    conceptEntries.push({
      key: m[1],
      primary: m[2],
      all: parseStringArray(m[3]),
      sceneGenerator: m[4],
      line: lineOf(source, m.index ?? 0),
    })
  }

  const domainEntries: ParsedDomainEntry[] = []
  for (const m of source.matchAll(DOMAIN_ENTRY_RE)) {
    domainEntries.push({
      prefix: m[1],
      primary: m[2],
      all: parseStringArray(m[3]),
      line: lineOf(source, m.index ?? 0),
    })
  }

  return { conceptEntries, domainEntries }
}

// ── Category G: duplicate exact mappings ──────────────────────────────────────

export interface DuplicateFinding {
  key: string
  lines: number[]
}

/** Two or more CONCEPT_VISUALS entries sharing the same concept-ID key —
 * a real object literal silently keeps only the last one, so every
 * duplicate is a genuine authoring mistake, never intentional. */
export function findDuplicateMappings(parsed: ParsedRegistry): DuplicateFinding[] {
  const byKey = new Map<string, number[]>()
  for (const entry of parsed.conceptEntries) {
    const lines = byKey.get(entry.key) ?? []
    lines.push(entry.line)
    byKey.set(entry.key, lines)
  }
  return Array.from(byKey.entries())
    .filter(([, lines]) => lines.length > 1)
    .map(([key, lines]) => ({ key, lines }))
}

// ── Category E: orphan registry entries ───────────────────────────────────────

export interface OrphanFinding {
  key: string
  line: number
}

/** A CONCEPT_VISUALS key that matches no concept ID in any supplied KG —
 * correctly-authored content sitting under a typo'd/stale key, silently
 * unreachable (the exact defect the P2 pass found and fixed for
 * 'phys.mech.gravitation' / 'phys.mech.satellite-motion'). */
export function findOrphanEntries(parsed: ParsedRegistry, allKgConceptIds: ReadonlySet<string>): OrphanFinding[] {
  const seen = new Set<string>()
  const orphans: OrphanFinding[] = []
  for (const entry of parsed.conceptEntries) {
    if (seen.has(entry.key)) continue // duplicates reported once via Category G, not twice here
    seen.add(entry.key)
    if (!allKgConceptIds.has(entry.key)) orphans.push({ key: entry.key, line: entry.line })
  }
  return orphans
}

// ── Category F: broken visualization/scene-generator references ─────────────

export interface BrokenReferenceFinding {
  key: string
  field: 'primary' | 'all' | 'sceneGenerator' | 'domain.primary' | 'domain.all'
  value: string
  line: number
}

/** A registry entry naming a VisualType or SceneGeneratorKind that doesn't
 * exist — would compile-error in visualRegistry.ts itself today (both are
 * statically typed there), so this mainly guards the SOURCE TEXT staying in
 * sync with the type definitions, and catches the same class of mistake in
 * any future refactor that loosens that typing. */
export function findBrokenReferences(
  parsed: ParsedRegistry,
  validVisualTypes: ReadonlySet<string>,
  validSceneGenerators: ReadonlySet<string>,
): BrokenReferenceFinding[] {
  const findings: BrokenReferenceFinding[] = []

  for (const entry of parsed.conceptEntries) {
    if (!validVisualTypes.has(entry.primary)) {
      findings.push({ key: entry.key, field: 'primary', value: entry.primary, line: entry.line })
    }
    for (const v of entry.all) {
      if (!validVisualTypes.has(v)) {
        findings.push({ key: entry.key, field: 'all', value: v, line: entry.line })
      }
    }
    if (entry.sceneGenerator && !validSceneGenerators.has(entry.sceneGenerator)) {
      findings.push({ key: entry.key, field: 'sceneGenerator', value: entry.sceneGenerator, line: entry.line })
    }
  }

  for (const entry of parsed.domainEntries) {
    if (!validVisualTypes.has(entry.primary)) {
      findings.push({ key: entry.prefix, field: 'domain.primary', value: entry.primary, line: entry.line })
    }
    for (const v of entry.all) {
      if (!validVisualTypes.has(v)) {
        findings.push({ key: entry.prefix, field: 'domain.all', value: v, line: entry.line })
      }
    }
  }

  return findings
}

// ── Category D: incorrect mapping heuristic ───────────────────────────────────
//
// Deliberately narrow and evidence-grounded, not general "is this visual
// semantically right for this concept" AI/NLP judgement (out of scope — this
// is a deterministic dev tool, not an Educational Brain feature). It encodes
// exactly the failure pattern the P0/P2 fixes found and corrected by hand:
// force_diagram assigned to a concept whose name is a PURE kinematics/
// energy/fluid quantity with no dynamics (force-analysis) content at all.
// A concept containing both kinds of words (e.g. "Work Done by a Force") is
// NOT flagged — force_diagram may still be defensible there; the heuristic
// only fires on the unambiguous case that was actually observed as a bug.

const KINEMATICS_ENERGY_FLUID_ONLY_WORDS = [
  'displacement', 'velocity', 'acceleration', 'speed',
  'kinetic energy', 'potential energy', 'power',
  'pressure', 'viscosity', 'buoyancy', "bernoulli", 'surface tension',
  'stress', 'strain', 'capillarity',
]

const DYNAMICS_LEGITIMIZING_WORDS = [
  'force', 'tension', 'normal force', 'friction', 'equilibrium', 'spring',
  'inclined', 'free body', 'newton', 'momentum', 'torque', 'interaction',
]

/**
 * True when a force_diagram assignment for this concept name matches the
 * observed bug pattern: a pure kinematics/energy/fluid term with no
 * dynamics word present at all.
 */
export function looksLikeForceDiagramMisassignment(conceptName: string): boolean {
  const lower = conceptName.toLowerCase()
  const hasKinematicWord = KINEMATICS_ENERGY_FLUID_ONLY_WORDS.some((w) => lower.includes(w))
  const hasDynamicsWord = DYNAMICS_LEGITIMIZING_WORDS.some((w) => lower.includes(w))
  return hasKinematicWord && !hasDynamicsWord
}

// ── Per-concept classification (Categories A/B/C/D) ───────────────────────────

export interface ConceptClassification {
  conceptId: string
  conceptName: string
  category: CoverageCategory
  visual: string | null
  reason: string
}

function longestMatchingDomain(conceptId: string, domainEntries: ParsedDomainEntry[]): ParsedDomainEntry | null {
  let best: ParsedDomainEntry | null = null
  for (const d of domainEntries) {
    if (conceptId.startsWith(d.prefix) && (!best || d.prefix.length > best.prefix.length)) best = d
  }
  return best
}

/**
 * Classify one KG concept exactly the way lookupConceptVisual() resolves it
 * at runtime (Tier 1 exact -> Tier 2 domain -> miss), without calling into
 * visualRegistry.ts at all — driven entirely by the parsed source data, so
 * this validator has no runtime dependency on the Registry module.
 */
export function classifyConcept(
  conceptId: string,
  conceptName: string,
  parsed: ParsedRegistry,
): ConceptClassification {
  const exact = parsed.conceptEntries.find((e) => e.key === conceptId)
  if (exact) {
    if (exact.primary === 'force_diagram' && looksLikeForceDiagramMisassignment(conceptName)) {
      return {
        conceptId, conceptName, category: 'D_INCORRECT', visual: exact.primary,
        reason: `Concept name "${conceptName}" matches a pure kinematics/energy/fluid pattern with no dynamics word present, but resolves to force_diagram`,
      }
    }
    return {
      conceptId, conceptName, category: 'A_EXACT', visual: exact.primary,
      reason: 'Exact CONCEPT_VISUALS entry',
    }
  }

  const domain = longestMatchingDomain(conceptId, parsed.domainEntries)
  if (domain) {
    return {
      conceptId, conceptName, category: 'B_FALLBACK', visual: domain.primary,
      reason: `Resolves via domain default '${domain.prefix}' → ${domain.primary}`,
    }
  }

  return {
    conceptId, conceptName, category: 'C_NULL', visual: null,
    reason: 'No exact or domain mapping — falls through to keyword/text fallback',
  }
}

// ── Full report ────────────────────────────────────────────────────────────────

export interface CoverageReport {
  totalConcepts: number
  classifications: ConceptClassification[]
  counts: Record<CoverageCategory, number>
  duplicates: DuplicateFinding[]
  orphans: OrphanFinding[]
  brokenReferences: BrokenReferenceFinding[]
  /** CI pass/fail per the spec: fails only on Incorrect / Broken References
   * / Duplicates — Expected Null, Intentional Fallback, and Orphan Entries
   * are warnings only, never a failure. */
  passes: boolean
}

export function auditVisualizationCoverage(
  kgConcepts: Array<{ id: string; name: string }>,
  parsed: ParsedRegistry,
  validVisualTypes: ReadonlySet<string>,
  validSceneGenerators: ReadonlySet<string>,
  /** The full universe of known concept IDs across every KG, used ONLY for
   * orphan detection (Category E). Defaults to kgConcepts' own IDs when
   * omitted. Must be passed explicitly whenever kgConcepts has already been
   * filtered to one subject (e.g. the CLI's --subject flag) — otherwise
   * every other subject's registry entries would be misreported as orphans
   * simply because they're absent from the filtered set, not because they
   * are actually orphaned. */
  allKnownConceptIds?: ReadonlySet<string>,
): CoverageReport {
  const classifications = kgConcepts.map((c) => classifyConcept(c.id, c.name, parsed))
  const counts: Record<CoverageCategory, number> = { A_EXACT: 0, B_FALLBACK: 0, C_NULL: 0, D_INCORRECT: 0 }
  for (const c of classifications) counts[c.category]++

  const orphanUniverse = allKnownConceptIds ?? new Set(kgConcepts.map((c) => c.id))
  const duplicates = findDuplicateMappings(parsed)
  const orphans = findOrphanEntries(parsed, orphanUniverse)
  const brokenReferences = findBrokenReferences(parsed, validVisualTypes, validSceneGenerators)

  const passes = counts.D_INCORRECT === 0 && brokenReferences.length === 0 && duplicates.length === 0

  return { totalConcepts: kgConcepts.length, classifications, counts, duplicates, orphans, brokenReferences, passes }
}
