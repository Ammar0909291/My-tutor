/**
 * C4 — Brain Compiler barrel.
 *
 * See src/lib/brain-compiler/README.md for the pipeline overview.
 */
export * from './types'
export { parse } from './parser'
export { lowerToAST, emitCompiledPack } from './lowering'
export { compile, compileSingle } from './compile'
export { loadPack, mergePacks, packRegistry } from './registry'
export { canonicalize, canonicalJsonHash, hashSource } from './hash'
export {
  GUARDABLE_FIELDS, isGuardableField, fieldsRead, describeGuard,
  compileGuard, toRuntimeGuard, validateAst,
} from './predicates'
