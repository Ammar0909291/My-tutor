/**
 * TeachingStrategy — Visual Learning Sprint H (Teaching Strategy Engine).
 *
 * Deterministic, rule-based orchestration sitting between concept detection
 * and spec building. No AI reasoning, no LLM call, no prompt changes — plain
 * rules over a DetectedConcept (and, for a couple of rules, the original
 * tutor text), mirroring the existing deterministic style of
 * visualConceptDetector.ts / visualSpecBuilder.ts.
 *
 * Named `VisualTeachingStrategy` (not `TeachingStrategy`) to avoid any
 * confusion with the pre-existing, unrelated
 * src/lib/school/adaptive/teachingStrategy.ts, which decides a *pedagogical*
 * approach (FOUNDATION_REBUILD, MOMENTUM_RECOVERY, ...) for the AI system
 * prompt. That module is untouched by this sprint; the two concepts are
 * orthogonal and live in different files, so there is no naming collision in
 * practice, but the distinct name keeps a stray `import { TeachingStrategy }`
 * from silently grabbing the wrong one.
 */
import { detectVisualConcept, type DetectedConcept } from './visualConceptDetector'
import { buildVisualSpec } from './visualSpecBuilder'
import { parseVisualSpec, type VisualSpec } from './visualSpec'

/** Which existing visual engine (if any) the strategy selects. Never a new engine type. */
export type VisualEngine = 'graph' | 'number_line' | 'geometry' | 'process_flow' | 'quantum_interactive' | 'classical_mechanics_interactive' | 'computer_science_interactive' | null

/** The Sprint H contract. Additive only — nothing here changes VisualSpec's own shape. */
export interface VisualTeachingStrategy {
  /** The tutor's explanation always happens; visuals are additive on top of it. */
  explanation: true
  /** Which engine to render, or null for "explanation only, no visual". */
  visualization: VisualEngine
  /** Whether the rendered visual should be draggable/manipulable. */
  interaction: boolean
  /** Whether the rendered visual should carry a graded `challenge`. */
  assessment: boolean
}

const EXPLANATION_ONLY: VisualTeachingStrategy = {
  explanation: true,
  visualization: null,
  interaction: false,
  assessment: false,
}

// Mirrors GraphRenderer's own LINEAR_RE (src/components/visuals/GraphRenderer.tsx)
// by design: assessment is only meaningful for a graph when GraphRenderer can
// itself derive a live { m, b } model to grade against. Deliberately
// duplicated here (rather than imported) because GraphRenderer is a 'use
// client' component and this module must stay usable from server code
// (the chat API route) with no React/client dependency. If GraphRenderer's
// matcher changes, update this constant to match.
const LINEAR_EQUATION_RE = /^y\s*=\s*[+-]?\d*\.?\d*\s*x\s*(?:[+-]\s*\d+\.?\d*)?$/i

function isLinearEquation(equation: string): boolean {
  return LINEAR_EQUATION_RE.test(equation.trim())
}

// Mirrors visualConceptDetector's own GEOMETRY_TASK_KEYWORDS by design, for
// the same reason: this module independently judges "is this worth grading"
// without reaching into the detector's internals.
const TASK_KEYWORDS = ['area', 'perimeter', 'circumference', 'measure']

function hasTaskSignal(content: string): boolean {
  const lower = content.toLowerCase()
  return TASK_KEYWORDS.some((kw) => lower.includes(kw))
}

/**
 * Deterministic strategy selection. See docs/TEACHING_STRATEGY_AUDIT.md
 * (Task 1) and the Sprint H report's "Selection Rules" section for the
 * rationale behind each rule. No AI reasoning — pure function of the already
 * -detected concept plus a couple of keyword checks on the original text.
 */
export function selectTeachingStrategy(content: string, concept: DetectedConcept | null): VisualTeachingStrategy {
  if (!concept) return EXPLANATION_ONLY

  switch (concept.kind) {
    case 'graph':
      return {
        explanation: true,
        visualization: 'graph',
        // Pan/zoom is always safe regardless of equation shape (GraphRenderer's
        // existing fail-safe: non-linear equations simply get no drag handles).
        interaction: true,
        // Assessment intent is on for every graph (linear or not) — exploring
        // any equation is worth a "did you find something" check. Whether a
        // *live, numeric* target exists depends on isLinearEquation() (see
        // deriveChallenge() below): non-linear equations get assessment:true
        // at the strategy level but an empty challenge object (no targets),
        // since GraphRenderer's own model extraction is linear-only and is
        // explicitly out of scope to rebuild this sprint.
        assessment: true,
      }

    case 'number_line':
      return {
        explanation: true,
        visualization: 'number_line',
        // Dragging highlighted points is always safe/clamped.
        interaction: true,
        // Deterministic place/compare/order challenges need a specific target
        // value or relation that isn't unambiguously derivable from plain
        // detected highlight numbers alone — kept off by design (see audit
        // Task 5/6 rules) rather than guessed.
        assessment: false,
      }

    case 'triangle':
    case 'rectangle':
    case 'circle':
    case 'angle':
      return {
        explanation: true,
        visualization: 'geometry',
        // Drag handles are always clamped/bounded, so always safe to offer.
        interaction: true,
        // Gradable only when the text actually asked for a computation
        // (area/perimeter/circumference/measure) — a bare shape mention
        // doesn't warrant a "did you get it right" challenge.
        assessment: hasTaskSignal(content),
      }

    case 'process_flow':
      return {
        explanation: true,
        visualization: 'process_flow',
        // Reorder mode is the entire point of showing a process diagram.
        interaction: true,
        // A sequence inherently has a "did you get the order right" check.
        assessment: true,
      }

    default: {
      const _never: never = concept
      return _never
    }
  }
}

/** Derive a `challenge` payload whose targets are the spec's own (correct) values — same precedent as ProcessFlowRenderer's reorder check (target = the spec's own order). See Sprint H report's Failure Modes for the "starts already met" implication of this choice. */
function deriveChallenge(spec: VisualSpec): Record<string, unknown> | null {
  switch (spec.type) {
    case 'graph': {
      const m = isLinearEquation(spec.equation) ? parseLinearCoeffs(spec.equation) : null
      // Non-linear equations: assessment is "on" at the strategy level but
      // there is no live numeric model to grade, so the challenge carries no
      // targets — GraphRenderer renders nothing extra for an empty/targetless
      // challenge (challengeGoalText is falsy), so no renderer change needed.
      return m ? { targetSlope: m.slope, targetIntercept: m.intercept } : {}
    }
    case 'process_flow':
      return {}
    case 'geometry':
      switch (spec.shape) {
        case 'triangle': {
          const area = (spec.base * spec.height) / 2
          const sideLen = Math.sqrt((spec.base / 2) ** 2 + spec.height ** 2)
          const perimeter = spec.base + 2 * sideLen
          return { targetArea: Math.round(area * 100) / 100, targetPerimeter: Math.round(perimeter * 100) / 100 }
        }
        case 'rectangle':
          return { targetArea: spec.width * spec.height, targetPerimeter: 2 * (spec.width + spec.height) }
        case 'circle':
          return { targetRadius: spec.radius }
        case 'angle':
          return { targetAngle: spec.angle }
        default:
          return null
      }
    default:
      return null
  }
}

/** Mirrors GraphRenderer's extractLinearModel for the compact `y=mx+b` form, kept local for the same client/server-boundary reason as LINEAR_EQUATION_RE above. */
function parseLinearCoeffs(equation: string): { slope: number; intercept: number } | null {
  const compact = equation.replace(/\s+/g, '')
  const match = compact.match(/^y=([+-]?\d*\.?\d*)x([+-]\d+\.?\d*)?$/i)
  if (!match) return null
  const [, mStr, bStr] = match
  let m: number
  if (mStr === '' || mStr === '+') m = 1
  else if (mStr === '-') m = -1
  else m = Number(mStr)
  const b = bStr ? Number(bStr) : 0
  if (!Number.isFinite(m) || !Number.isFinite(b)) return null
  return { slope: m, intercept: b }
}

/** The full Task 4 wiring: Concept Detection -> Teaching Strategy -> VisualSpecBuilder, in one call. Fails safe: any unexpected shape yields { strategy, spec: null }, never a thrown error. */
export interface TeachingPlan {
  strategy: VisualTeachingStrategy
  spec: VisualSpec | null
}

export function planVisualTeaching(content: string): TeachingPlan {
  try {
    const concept = detectVisualConcept(content)
    const strategy = selectTeachingStrategy(content, concept)

    if (!strategy.visualization) {
      return { strategy, spec: null }
    }

    const baseSpec = buildVisualSpec(content)
    if (!baseSpec) {
      // Detection/strategy agreed a visual belongs here, but the builder
      // couldn't produce a valid spec (e.g. zod rejected it) — fail safe to
      // explanation-only rather than show a half-built visual.
      return { strategy: { ...strategy, visualization: null }, spec: null }
    }

    const challenge = strategy.assessment ? deriveChallenge(baseSpec) : null
    const merged = {
      ...baseSpec,
      interactive: strategy.interaction,
      ...(challenge ? { challenge } : {}),
    }

    return { strategy, spec: parseVisualSpec(merged) }
  } catch {
    return { strategy: EXPLANATION_ONLY, spec: null }
  }
}
