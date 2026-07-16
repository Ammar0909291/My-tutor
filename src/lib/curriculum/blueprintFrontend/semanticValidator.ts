/**
 * Blueprint Front-End — Semantic Validator.
 *
 * Runs BEFORE lowering (per Phase 1 requirement). Pure function over a
 * BlueprintAST (+ optional cross-file context); no I/O. Diagnostics reuse
 * brain-compiler's Diagnostic shape so both front-ends report uniformly.
 *
 * Checks implemented (mapped to the task's required examples):
 *   BFV01  Invalid concept id (missing, malformed, or filename mismatch)
 *   BFV02  Missing teaching action (zero TAs found)
 *   BFV03  Missing prerequisite (referenced conceptId not in the known universe)
 *   BFV04  Broken reference (TA cites an MC-id absent from the misconception list)
 *   BFV05  Invalid/missing required section (no C0 metadata block parsed)
 *   BFV06  Cyclic dependency (via prerequisiteGraph, DFS with an explicit stack)
 */
import type { BlueprintAST, SemanticValidationContext, Diagnostic } from './types'

const CONCEPT_ID_RE = /^[a-z]+(?:\.[a-z0-9-]+)+$/

export function validateBlueprintAst(
  ast: BlueprintAST,
  ctx: SemanticValidationContext = {},
): Diagnostic[] {
  const diags: Diagnostic[] = []
  const file = ast.sourceFile

  // BFV05 — missing C0 metadata section entirely.
  if (!ast.metadata.name && !ast.metadata.status) {
    diags.push({
      code: 'BFV05', severity: 'E',
      message: `${file}: missing or unparseable Concept Metadata section (C0) — no name/status found`,
    })
  }

  // BFV01 — invalid concept id.
  if (!ast.conceptId) {
    diags.push({ code: 'BFV01', severity: 'E', message: `${file}: missing concept_id` })
  } else if (!CONCEPT_ID_RE.test(ast.conceptId)) {
    diags.push({ code: 'BFV01', severity: 'E', message: `${file}: invalid concept_id "${ast.conceptId}" (expected dotted lowercase form, e.g. "phys.mech.foo")` })
  } else {
    const filenameConceptId = file.split('/').pop()?.replace(/\.md$/, '')
    if (filenameConceptId && filenameConceptId !== ast.conceptId) {
      diags.push({
        code: 'BFV01', severity: 'E',
        message: `${file}: concept_id "${ast.conceptId}" does not match filename-derived id "${filenameConceptId}"`,
      })
    }
  }

  // BFV02 — missing teaching action.
  if (ast.teachingActions.length === 0) {
    diags.push({ code: 'BFV02', severity: 'E', message: `${file}: no teaching actions found (Component/Section "Teaching Action(s)" is required)` })
  }

  // BFV03 — missing prerequisite (only checked when a universe was supplied;
  // otherwise this is silently skipped, never silently "passed" — see W-level
  // note below so callers know the check didn't run).
  if (ctx.knownConceptIds) {
    for (const prereq of ast.metadata.prerequisites) {
      if (!ctx.knownConceptIds.has(prereq)) {
        diags.push({ code: 'BFV03', severity: 'E', message: `${file}: prerequisite "${prereq}" is not a known concept id` })
      }
    }
  } else if (ast.metadata.prerequisites.length > 0) {
    diags.push({ code: 'BFV03', severity: 'I', message: `${file}: prerequisite existence check skipped (no knownConceptIds universe supplied)` })
  }

  // BFV04 — broken reference: a TA cites an MC-id this blueprint never defines.
  const definedMcIds = new Set(ast.misconceptions.map((mc) => mc.id))
  for (const ta of ast.teachingActions) {
    for (const mcId of ta.referencedMisconceptionIds) {
      if (!definedMcIds.has(mcId)) {
        diags.push({
          code: 'BFV04', severity: 'E',
          message: `${file}: teaching action "${ta.id}" references "${mcId}", which is not defined in the Misconception section (defined: ${[...definedMcIds].join(', ') || 'none'})`,
        })
      }
    }
  }

  // BFV06 — cyclic dependency detection over the supplied prerequisite graph.
  if (ctx.prerequisiteGraph) {
    const cycle = findCycleFrom(ast.conceptId, ctx.prerequisiteGraph)
    if (cycle) {
      diags.push({
        code: 'BFV06', severity: 'E',
        message: `${file}: cyclic prerequisite dependency detected: ${cycle.join(' → ')}`,
      })
    }
  }

  return diags
}

/** DFS cycle detection with an explicit path stack (not just a visited set,
 *  so cross-visits through a shared ancestor don't false-positive). */
function findCycleFrom(start: string, graph: Map<string, string[]>): string[] | null {
  const stack: string[] = []
  const onStack = new Set<string>()

  function dfs(node: string): string[] | null {
    if (onStack.has(node)) {
      const cycleStart = stack.indexOf(node)
      return [...stack.slice(cycleStart), node]
    }
    stack.push(node)
    onStack.add(node)
    for (const dep of graph.get(node) ?? []) {
      const found = dfs(dep)
      if (found) return found
    }
    stack.pop()
    onStack.delete(node)
    return null
  }

  return dfs(start)
}
