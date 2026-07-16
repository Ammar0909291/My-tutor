/**
 * Package Runtime barrel — the first Educational Package Runtime (PoC).
 *
 *   Loader   (loader.ts)          — load + fully validate ONE DRAFT artifact
 *   Reader   (reader.ts)          — read-only views per asset kind
 *   Assembler (lessonAssembler.ts) — Student State + Package → Lesson Context
 *
 * `buildLessonContextForConcept` is the single serving-seam entry point:
 * route.ts calls it behind ENABLE_PACKAGE_RUNTIME=1 and falls back to the
 * legacy blueprint path whenever it returns null (missing artifact, any
 * validation failure). Blueprint markdown is never read on this path.
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
