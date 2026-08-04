/**
 * Package Runtime barrel — the first Educational Package Runtime (PoC).
 *
 *   Loader   (loader.ts)          — load + fully validate ONE DRAFT artifact
 *   Reader   (reader.ts)          — read-only views per asset kind
 *   Assembler (lessonAssembler.ts) — Student State + Package → Lesson Context
 *
 * `buildLessonContextForConcept` is the single serving-seam function; it is
 * exported for tests and tools that operate on compiled package artifacts.
 *
 * NOTE: The route.ts call site that previously invoked this behind the
 * ENABLE_PACKAGE_RUNTIME flag was REMOVED (a zero-behavior-change cleanup,
 * since that flag was never on in any environment). The canonical serving path
 * is now AssetIdentity / Explanation Memory (assembleLesson() in
 * src/lib/teaching/assets/pipeline.ts); see servingPathCanonicality.test.ts
 * for the machine-readable proof. This module, its compiler, its tests, and
 * the compiled brain/packages/ artifacts are all retained for tooling use.
 */
export * from './types'
export {
  loadEducationalPackage, validateEducationalPackage,
  packageArtifactPath, hasPackageArtifact, clearPackageCache,
} from './loader'
export * from './reader'
export { assembleLessonContext } from './lessonAssembler'

import type { LessonContext, StudentLessonState } from './types'
import { loadEducationalPackage } from './loader'
import { assembleLessonContext } from './lessonAssembler'

/** Load + assemble in one step. Null on ANY failure — callers fall back to
 *  the legacy path; a bad package never breaks a lesson. */
export function buildLessonContextForConcept(
  conceptId: string,
  state: StudentLessonState = {},
): LessonContext | null {
  const loaded = loadEducationalPackage(conceptId)
  if (!loaded.ok) return null
  return assembleLessonContext(state, loaded.pkg)
}
