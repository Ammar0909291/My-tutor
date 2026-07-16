/**
 * Blueprint Front-End — Asset Lowering (Phase 1.5: BlueprintAST → AssetAST).
 *
 * The Knowledge-Layer counterpart of `lowering.ts` (the Rule Layer). Where
 * rule lowering answers "what should the engine DO next turn", asset lowering
 * extracts "what the tutor KNOWS about this concept" into structured,
 * deterministic, serializable AssetNodes.
 *
 * Design rules:
 *   - PRESERVE, don't rewrite: asset content is the authored markdown
 *     verbatim (trimmed). Lowering is a structural transform, never an
 *     editorial one — the blueprint stays the canonical authoring format.
 *   - Deterministic ids: `${conceptId}/${kind}/${localKey|ordinal}`. Two runs
 *     over the same source yield byte-identical AssetASTs (test-pinned).
 *   - Format-agnostic: sections are located by title keyword, mirroring
 *     parser.ts — the corpus's three header conventions all route here.
 *   - Asset kinds align with the runtime vocabulary in
 *     src/lib/teaching/assets/assetIdentity.ts (ExplanationKind/ProbeKind)
 *     so future ingestion into AssetIdentity needs no renaming.
 *   - Diagrams / animations / simulations: NOT lowered. Their landing
 *     surface is `PackageExtensionPoints` (types.ts), empty by construction.
 */
import type {
  AssetAST, AssetKind, AssetNode, BlueprintAST, BlueprintSection, BlueprintSourceSpan,
} from './types'

const LANGUAGE_DEFAULT = 'en'

// ── Section routing table (title keyword → asset concern) ───────────────────
// First match wins per section; a section routes to at most one concern.
// Metadata-bearing sections (C0) and rule-owned sections are intentionally
// absent — concept metadata rides the package envelope, and the Teaching
// Action Sequence is consumed structurally via ast.teachingActions.

const TEACHING_NOTE_TITLE_RE =
  /voice teaching|recovery note|anxiety|confidence protocol|sticking point|memory.{0,3}(&|and)?.{0,3}review|spaced retrieval|spaced repetition|scaffolding protocol|transfer map|why beginners fail|mental model|student state matrix|diagnostic battery|prerequisite (check|dependency)|formative assessment/i

function findSections(sections: BlueprintSection[], re: RegExp): BlueprintSection[] {
  return sections.filter((s) => re.test(s.title))
}

function firstSection(sections: BlueprintSection[], re: RegExp): BlueprintSection | null {
  return findSections(sections, re)[0] ?? null
}

/** Strips the section's own "## …" heading line from its body. */
function sectionText(s: BlueprintSection): string {
  return s.body.replace(/^##[^\n]*\n/, '').trim()
}

function mcRefs(text: string): string[] {
  return [...new Set([...text.matchAll(/\bMC-[A-Za-z0-9_-]+\b/g)].map((m) => m[0]))]
}

function makeAsset(
  ast: BlueprintAST,
  kind: AssetKind,
  title: string,
  content: string,
  localKey: string | null,
  ordinal: number,
  span: BlueprintSourceSpan,
  refs: string[] = [],
): AssetNode {
  return {
    assetId: `${ast.conceptId}/${kind}/${localKey ?? String(ordinal)}`,
    kind,
    conceptId: ast.conceptId,
    title,
    content,
    localKey,
    language: LANGUAGE_DEFAULT,
    refs,
    span,
  }
}

function sectionSpan(ast: BlueprintAST, s: BlueprintSection): BlueprintSourceSpan {
  const lines = s.body.split('\n').length
  return { file: ast.sourceFile, startLine: s.startLine, endLine: s.startLine + lines - 1 }
}

// ── Per-kind lowering ────────────────────────────────────────────────────────

/** C1: Concept Spine → one core_explanation asset. For Protocol-format files
 *  (no spine section) the "**Core idea:**" paragraph of the Concept Profile
 *  serves as the core explanation — same fallback blueprintLoader.ts uses. */
function lowerCoreExplanation(ast: BlueprintAST): AssetNode[] {
  const spine = firstSection(ast.sections, /concept spine/i)
  if (spine) {
    // Worked examples embedded in the spine are lowered separately; keep the
    // explanation asset focused by cutting at the first Worked Example header.
    const text = sectionText(spine)
    const cut = text.search(/\*\*Worked Example \d+/)
    const content = (cut === -1 ? text : text.slice(0, cut)).trim()
    if (content) {
      return [makeAsset(ast, 'core_explanation', `${ast.metadata.name || ast.conceptId} — core explanation`, content, null, 1, sectionSpan(ast, spine))]
    }
  }
  // Math corpus: the Cognitive Map section carries the target understanding.
  const cognitiveMap = firstSection(ast.sections, /cognitive map/i)
  if (cognitiveMap) {
    return [makeAsset(ast, 'core_explanation', `${ast.metadata.name || ast.conceptId} — cognitive map`, sectionText(cognitiveMap), null, 1, sectionSpan(ast, cognitiveMap))]
  }
  const profile = firstSection(ast.sections, /concept (profile|metadata|identity)/i)
  if (profile) {
    const m = /\*\*Core idea:\*\*\s*([\s\S]+?)(?=\n\*\*|\n---|\n##|$)/.exec(profile.body)
    if (m) {
      return [makeAsset(ast, 'core_explanation', `${ast.metadata.name || ast.conceptId} — core idea`, m[1].trim(), null, 1, sectionSpan(ast, profile))]
    }
  }
  return []
}

/** Worked examples: dedicated "Worked Examples" section ("### Example N — …")
 *  or `**Worked Example N …**` blocks embedded in the Concept Spine. */
function lowerWorkedExamples(ast: BlueprintAST): AssetNode[] {
  const out: AssetNode[] = []

  const dedicated = firstSection(ast.sections, /worked example/i)
  if (dedicated) {
    const text = sectionText(dedicated)
    // Two authored header shapes: "### Example N — Title" and "### WE-N — Title".
    const blocks = text.split(/(?=^### (?:Example |WE-)\d+)/m).filter((b) => /^### (?:Example |WE-)\d+/.test(b))
    for (const block of blocks) {
      const h = /^### (?:Example |WE-)(\d+)\s*(?:—|-)?\s*([^\n]*)/.exec(block)!
      out.push(makeAsset(
        ast, 'worked_example', h[2].trim() || `Worked example ${h[1]}`,
        block.trim(), `WE-${h[1]}`, out.length + 1, sectionSpan(ast, dedicated), mcRefs(block),
      ))
    }
    if (out.length > 0) return out
  }

  const spine = firstSection(ast.sections, /concept spine/i)
  if (spine) {
    const text = sectionText(spine)
    const blocks = text.split(/(?=\*\*Worked Example \d+)/).filter((b) => /^\*\*Worked Example \d+/.test(b))
    for (const block of blocks) {
      const h = /^\*\*Worked Example (\d+)\s*(?:\(([^)]*)\))?/.exec(block)!
      out.push(makeAsset(
        ast, 'worked_example', h[2]?.trim() || `Worked example ${h[1]}`,
        block.trim(), `WE-${h[1]}`, out.length + 1, sectionSpan(ast, spine), mcRefs(block),
      ))
    }
  }
  return out
}

/** C3: one misconception asset per authored MC block — verbatim body,
 *  keyed by the authored MC id (numeric or slug). */
function lowerMisconceptions(ast: BlueprintAST): AssetNode[] {
  return ast.misconceptions.map((mc, i) =>
    makeAsset(ast, 'misconception', mc.label || mc.id, mc.body, mc.id, i + 1, mc.span, [mc.id]),
  )
}

/** Mastery probes: "**MP-N (…):**" blocks (Component-format) or the whole
 *  Assessment / Mastery Gate section as one probe-bank asset when no MP-N
 *  structure exists (Protocol-format keeps probes inside protocols). */
function lowerMasteryProbes(ast: BlueprintAST): AssetNode[] {
  const section =
    firstSection(ast.sections, /mastery probe|mastery-probe/i) ??
    firstSection(ast.sections, /^assessment\b|assessment battery|mastery gate/i)
  if (!section) return []

  const text = sectionText(section)
  const blocks = text.split(/(?=^\*\*MP-\d+)/m).filter((b) => /^\*\*MP-\d+/.test(b))
  if (blocks.length > 0) {
    return blocks.map((block, i) => {
      const h = /^\*\*(MP-\d+)\s*(?:\(([^)]*)\))?/.exec(block)!
      return makeAsset(
        ast, 'mastery_probe', h[2]?.trim() || h[1],
        block.trim(), h[1], i + 1, sectionSpan(ast, section), mcRefs(block),
      )
    })
  }
  return [makeAsset(ast, 'mastery_probe', section.title, text, null, 1, sectionSpan(ast, section), mcRefs(text))]
}

/** C7: Adaptive-Teaching Rules — advisory teaching adaptations (distinct from
 *  the Rule Layer: these are knowledge for composition, not engine guards). */
function lowerAdaptiveRules(ast: BlueprintAST): AssetNode[] {
  const section = firstSection(ast.sections, /adaptive/i)
  if (!section) return []
  return [makeAsset(ast, 'adaptive_rule', section.title, sectionText(section), null, 1, sectionSpan(ast, section), mcRefs(section.body))]
}

/** C8: Session-Flow Template. Deliberately narrow — "Teaching Actions
 *  (Session Plan)" sections are owned by the TA path, not double-routed here. */
function lowerSessionFlow(ast: BlueprintAST): AssetNode[] {
  const section = firstSection(ast.sections, /session[- ]flow/i)
  if (!section) return []
  return [makeAsset(ast, 'session_flow', section.title, sectionText(section), null, 1, sectionSpan(ast, section))]
}

/** Learning objective (Protocol-format has a dedicated section). */
function lowerLearningObjectives(ast: BlueprintAST): AssetNode[] {
  const section = firstSection(ast.sections, /learning objective/i)
  if (!section) return []
  return [makeAsset(ast, 'learning_objective', section.title, sectionText(section), null, 1, sectionSpan(ast, section))]
}

/** References / curriculum-feedback / cross-blueprint-dependency sections. */
function lowerReferences(ast: BlueprintAST): AssetNode[] {
  const section = firstSection(ast.sections, /references|curriculum feedback|cross-blueprint dependencies/i)
  if (!section) return []
  return [makeAsset(ast, 'reference', section.title, sectionText(section), null, 1, sectionSpan(ast, section))]
}

/** Teaching notes: every pedagogical prose section not owned by another kind
 *  (voice teaching, recovery notes, anxiety protocols, retrieval plans …).
 *  One asset per section, title preserved. */
function lowerTeachingNotes(ast: BlueprintAST): AssetNode[] {
  return findSections(ast.sections, TEACHING_NOTE_TITLE_RE).map((s, i) =>
    makeAsset(ast, 'teaching_note', s.title, sectionText(s), null, i + 1, sectionSpan(ast, s), mcRefs(s.body)),
  )
}

/** Structured metadata for each teaching action — the Knowledge-Layer twin of
 *  the Rule Layer's per-TA dispatch rule (same authored TA ids, so the two
 *  layers can be joined on localKey by any consumer). Content is canonical
 *  JSON, not prose. */
function lowerTeachingActionMeta(ast: BlueprintAST): AssetNode[] {
  return ast.teachingActions.map((ta, i) =>
    makeAsset(
      ast, 'teaching_action_meta', ta.title,
      JSON.stringify({ id: ta.id, title: ta.title, primitives: [...ta.primitives].sort(), addresses: [...ta.referencedMisconceptionIds].sort() }),
      ta.id, i + 1, ta.span, ta.referencedMisconceptionIds,
    ),
  )
}

// ── Public entry point ───────────────────────────────────────────────────────

/** BlueprintAST → AssetAST. Pure; deterministic; never throws. */
export function lowerBlueprintToAssets(ast: BlueprintAST): AssetAST {
  const assets: AssetNode[] = [
    ...lowerCoreExplanation(ast),
    ...lowerLearningObjectives(ast),
    ...lowerWorkedExamples(ast),
    ...lowerMisconceptions(ast),
    ...lowerTeachingActionMeta(ast),
    ...lowerMasteryProbes(ast),
    ...lowerAdaptiveRules(ast),
    ...lowerSessionFlow(ast),
    ...lowerTeachingNotes(ast),
    ...lowerReferences(ast),
  ]
  return { conceptId: ast.conceptId, sourceFile: ast.sourceFile, assets }
}
