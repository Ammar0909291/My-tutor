/**
 * Package Runtime — types (first Educational Package Runtime, PoC phase).
 *
 * The runtime side of the Blueprint Front-End: where blueprintFrontend/
 * COMPILES authoring into DRAFT Educational Packages, this module LOADS a
 * compiled package artifact and serves lessons from it. Blueprint markdown
 * is never read here — packages are compiled ahead of time by
 * `npm run compile:package -- <conceptId>` into `brain/packages/*.package.json`
 * and the loader consumes only those artifacts.
 *
 * All package/asset types are reused from blueprintFrontend (type-only);
 * nothing is redefined.
 */
import type {
  AssetNode, EducationalPackage,
} from '@/lib/curriculum/blueprintFrontend/types'

export type { AssetNode, EducationalPackage }

// ── Loader ───────────────────────────────────────────────────────────────────

/** Compiler ids this runtime knows how to read — the schema-version gate.
 *  A package produced by an unknown compiler is REJECTED, never guessed at. */
export const SUPPORTED_PACKAGE_COMPILERS: readonly string[] = [
  'blueprint-frontend@0.2.0-phase1.5',
]

export type PackageLoadResult =
  | { ok: true; pkg: EducationalPackage }
  | { ok: false; reason: string }

// ── Lesson assembly ──────────────────────────────────────────────────────────

/** The student-state slice the assembler modulates on. Deliberately small —
 *  richer state (full TeachingMemorySnapshot) stays with the Teaching Engine;
 *  the assembler only needs what changes CONTENT SELECTION. */
export interface StudentLessonState {
  /** Content register — depth/verbosity selection. Default 'intermediate'. */
  register?: 'beginner' | 'intermediate' | 'expert'
  /** Misconception ids (authored MC-… keys) the learner has shown signs of —
   *  their repair content is surfaced first. */
  activeMisconceptionIds?: string[]
  /** First exposure to this concept — opens with the core explanation. */
  isFirstExposure?: boolean
}

/** Everything a lesson turn needs, derived ENTIRELY from one Educational
 *  Package. `block` is the system-prompt injection (same seam the legacy
 *  BLUEPRINT CONTEXT block used, so Tutor Max's external behavior is
 *  unchanged); the structured fields serve engines that want data, not prose. */
export interface LessonContext {
  conceptId: string
  /** Provenance: which artifact drove this lesson. */
  source: 'educational-package'
  packageId: string
  packageHash: string
  /** System-prompt context block — fully package-derived. */
  block: string
  /** Structured views for non-prompt consumers. */
  coreExplanation: AssetNode | null
  workedExamples: AssetNode[]
  misconceptions: AssetNode[]
  masteryProbes: AssetNode[]
  sessionFlow: AssetNode | null
  adaptiveRules: AssetNode[]
  learningObjectives: AssetNode[]
  prerequisites: string[]
}
